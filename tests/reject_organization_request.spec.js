import { test } from '../fixtures/env-configurations'

//Store the organization request created automatic in this variable
let OrganizationRequestNo = '';
// Read login data from JSON file
const fs = require('fs')
const path = require('path');
const orgTestDataPath = path.resolve(__dirname, '../test-data/OrganizationTestData.json');
const orgTestData = JSON.parse(fs.readFileSync(orgTestDataPath, 'utf-8'));
const orgData = orgTestData.orgRequest
const rejectNote = orgTestData.rejectRequest

//Call The applicaion URL
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

//Random Fake data 
// Organization Name
function OrgName() {
  let outString = '';
  outString = orgData.orgName + Math.floor(Math.random() * 9) + '';
  return outString;
};

// Organization trade name
function TradeName() {
  let outString = '';
  outString = orgData.tradeName + Math.floor(Math.random() * 9) + '';
  return outString;
};

//ID Type Number
function ID() {
  let outString = '';
  outString = orgData.Id + (Math.floor(Math.random() * 899) + 100) + orgData.typeNumber;
  return outString;
};

//Store the organization data in a variable
const orgDynamicData = {
  entityname: OrgName(),
  tradename: TradeName(),
  activity: orgData.activity,
  ID: ID(),
  SecondID: ID(),
  phone: orgData.phone,
  email: orgData.email,
  Streetname: orgData.streetname,
  ZipCode: orgData.zipCode,
  Additionnumber: orgData.additionnumber
};

//Tests
test.describe('Organization End to End Scenario', () => {
  test.slow();
  test('Add Organization @TC005', async ({ applicantLogin, add_Org }) => {

    await add_Org.Add_Btn()
    await add_Org.Addorg(orgDynamicData)
    await add_Org.SuccessMessage()
    OrganizationRequestNo = await add_Org.GetOrgRequestNo()
    console.log("ccccc" + OrganizationRequestNo)
  })

  test('Reject Organization @TC009', async ({ page, adminLogin, approve_Org_Request, reject_Org_Request, org_Status }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    //Call pull request from add & approve organization page
    await approve_Org_Request.All_Requests_Page()
    await approve_Org_Request.Search_For_Request(OrganizationRequestNo)
    await approve_Org_Request.click_on_pull_Request()
    await approve_Org_Request.My_Requests_Page(OrganizationRequestNo)
    //Reject the request
    await reject_Org_Request.Organization_Request_Reject(rejectNote.notes)
    await page.waitForTimeout(10000)
    // Check the Organization Request Status
    await org_Status.Search_For_Org_Req(OrganizationRequestNo)
    await org_Status.Get_Request_Reject_Status(OrganizationRequestNo)
  })
})
