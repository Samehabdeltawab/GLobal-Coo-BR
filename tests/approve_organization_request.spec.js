import { test } from '../fixtures/env-configurations'

//Store the organization request created automatic in this variable
let OrganizationRequestNo = '';
// Read login data from JSON file
const fs = require('fs')
const path = require('path');
const orgTestDataPath = path.resolve(__dirname, '../test-data/OrganizationTestData.json');
const orgTestData = JSON.parse(fs.readFileSync(orgTestDataPath, 'utf-8'));
const orgData = orgTestData.orgRequest

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
  test('Add Organization @TC005', async ({add_Org }) => {

    await add_Org.Add_Btn()
    await add_Org.Addorg(orgDynamicData)
    await add_Org.SuccessMessage()
    OrganizationRequestNo = await add_Org.GetOrgRequestNo()
    console.log("ccccc" + OrganizationRequestNo)
  })

  test('Approve Organization @TC006', async ({adminLogin,approve_Org_Request, org_Status }) => {
    await approve_Org_Request.All_Requests_Page()
    await approve_Org_Request.Search_For_Request(OrganizationRequestNo)
    //await page.waitForTimeout(5000)
    await approve_Org_Request.click_on_pull_Request()
    await approve_Org_Request.My_Requests_Page(OrganizationRequestNo)
    await approve_Org_Request.Approve_Request()
    //Check the Organization Request Status
    await org_Status.Search_For_Org_Req(OrganizationRequestNo)
    await org_Status.Get_Request_Approve_Status(OrganizationRequestNo)
  })

  test('Check Organization Details @TC007', async ({ adminLogin: _, org_Details }) => {

    await org_Details.Open_Organization_Details_Page(OrganizationRequestNo)
    await org_Details.Check_Page_Details(OrganizationRequestNo)
  })
})
