import { test } from '../fixtures/env-configurations'

//Store the organization request created automatic in this variable
let OrganizationRequestNo = '';
// Read login data from JSON file
const fs = require('fs')
const path = require('path');
const orgTestDataPath = path.resolve(__dirname, '../test-data/OrganizationTestData.json');
const orgTestData = JSON.parse(fs.readFileSync(orgTestDataPath, 'utf-8'));
const orgData = orgTestData.orgRequest
const returnNote = orgTestData.returnNotes

//Call The applicaion URL
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

//Random Fake data 
//Organization Name
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

//Tests
test.describe('Organization End to End Scenario', () => {
  test.slow();
  test('Add Organization @TC005', async ({ applicantLogin, add_Org }) => {

    await add_Org.Add_Btn()
    await add_Org.Addorg(OrgName(), TradeName(), orgData.activity, ID(), ID(), orgData.phone, orgData.email, orgData.streetname, orgData.zipCode, orgData.additionnumber)
    await add_Org.SuccessMessage()
    OrganizationRequestNo = await add_Org.GetOrgRequestNo()
    console.log("ccccc" + OrganizationRequestNo)
  })

  test('Return the request to the applicant @TC010', async ({ adminLogin, approve_Org_Request,
    return_Org_Request, org_Status }) => {
    await approve_Org_Request.All_Requests_Page()
    await approve_Org_Request.Search_For_Request(OrganizationRequestNo)
    await approve_Org_Request.click_on_pull_Request()
    await approve_Org_Request.My_Requests_Page(OrganizationRequestNo)
    await return_Org_Request.Retrun_Request_To_applicant(returnNote.notes)
    await return_Org_Request.Assert_Popup_And_Confirmation()
    // Check the organization status
    await org_Status.Search_For_Org_Req(OrganizationRequestNo)
    await org_Status.Get_Returned_Request_status(OrganizationRequestNo)
  })
})
