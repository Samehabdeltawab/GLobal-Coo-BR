import { test } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { Add_Legalization_Page } from '../pages/Add_Legalization_Page'
import { Approve_request } from '../pages/Approve_Legalization_Request_Page';
import { Legalization_Status } from '../pages/Check_Legalization_Request_Status_Page'
import { Legalization_Details } from '../pages/Check_Legalization_Page_details_Page.js'
import { Logout_page } from '../pages/logout-page.js'
let Login;
let addrequest;
let approve;
let LegalizationRequestNo = ''
let Notes = 'File Is Uploaded'
let price = '55'
let approvalnotes = 'Attachments are approved'
let Logout;


test.beforeEach(async ({ page }) => {

    await page.goto('/')
})

test.describe('Legalization Request', () => {

    test.slow();
    test('Add Legalization Request', async ({ page }) => {

        Login = new LoginPage(page)
        await Login.login('ssayed335@gmail.com', 'P@ssw0rd', '0000')
        addrequest = new Add_Legalization_Page(page)
        await addrequest.Call_Certificate_approved()
        await addrequest.Insert_legalization_Data(Notes)
        await addrequest.assertsuccessMessage()
        LegalizationRequestNo = await addrequest.GetRequestNo()
        console.log(LegalizationRequestNo)
    })

    test('Approve Legalization Request', async ({ page }) => {

        Login = new LoginPage(page)
        await Login.login('superadmin@coo.sa', 'P@ssw0rd', '0000')
        approve = new Approve_request(page)
        await approve.All_Requests_Tab()
        await approve.Search_For_Request(LegalizationRequestNo)
        await approve.click_on_pull_Request()
        await approve.My_Requests_Tab(LegalizationRequestNo)
        await approve.Approve_Request(price, approvalnotes)
        // Check the egaliation request Status
        approve = new Legalization_Status(page)
        await approve.Search_For_Org_Req(LegalizationRequestNo)
        await approve.Get_Request_Approve_Status(LegalizationRequestNo)
        //Check the legalization page details
        approve = new Legalization_Details(page)
        await approve.Check_Page_Details(LegalizationRequestNo)
    })
})
