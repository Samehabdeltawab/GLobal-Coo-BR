import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { AddOrganization } from '../pages/Add_Organization_Page'
import { ApproveOrganization } from '../pages/Approve_Organization_Request_Page'
import { Release_Request } from '../pages/Pull_and_Release_Request_page'


let PullRequest;
let Login;
let NewOrg;
let ReleaseRequest;
//Store the organization request created automatic in this variable
let OrganizationRequestNo = '';
const activity = 'Test Activity'
const phone = '3126987798'
const email = "ssayed2089@gmail.com"
const Streetname = '5456456'
const ZipCode = '64646'
const Additionnumber = '6546'


//Random Fake data 
// Organization Fake name
test.use({ storageState: { cookies: [], origins: [] } })

function OrgName() {
  let outString = '';
  outString = 'Thiqha Organization' + Math.floor(Math.random() * 9) + '';
  return outString;

};

// Organization Fake trade name
test.use({ storageState: { cookies: [], origins: [] } })

function TradeName() {
  let outString = '';
  outString = 'Software' + Math.floor(Math.random() * 9) + '';
  return outString;

};

// Organization Fake ID
test.use({ storageState: { cookies: [], origins: [] } })

function ID() {
  let outString = '';
  outString = '55.555.' + (Math.floor(Math.random() * 899) + 100) + '/5555-20';
  return outString;
};


test.beforeEach(async ({ page }) => {

  await page.goto('/')
})

test.describe('Organization End to End Scenario', () => {

  test('Add Organization', async ({ page }) => {

    Login = new LoginPage(page)
    await Login.login('ssayed335@gmail.com', 'P@ssw0rd', '0000')
    NewOrg = new AddOrganization(page)
    await NewOrg.Addorg(OrgName(), TradeName(), activity, ID(), ID(), phone, email, Streetname, ZipCode, Additionnumber)
    await NewOrg.SuccessMessage()
    OrganizationRequestNo = await NewOrg.GetOrgRequestNo()
    console.log(OrganizationRequestNo)

    // let OrganizationRequestNo = 'O-24-00000293'
  })
  test('Approve Organization', async ({ page }) => {

    await page.setViewportSize({ width: 1920, height: 1080 });
    Login = new LoginPage(page)
    await Login.login('superadmin@coo.sa', 'P@ssw0rd', '0000')
    PullRequest = new ApproveOrganization(page)
    await PullRequest.All_Requests_Page()
    await PullRequest.click_on_pull_Request(OrganizationRequestNo)
    await PullRequest.My_Requests_Page(OrganizationRequestNo)
    ReleaseRequest = new Release_Request(page)
    await ReleaseRequest.Release_request()
    await ReleaseRequest.Assert_Pupup_title_Message()
    await ReleaseRequest.Confirn_Return()
    await page.waitForTimeout(5000)
    await ReleaseRequest.Assert_Pull_Request_Displayed()
  })
})