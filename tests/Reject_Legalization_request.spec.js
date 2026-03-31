import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { Add_Legalization_Page } from '../pages/Add_Legalization_Page'
import { Approve_request } from '../pages/Approve_Legalization_Request_Page';
import { Legalization_Status } from '../pages/Check_Legalization_Request_Status_Page'
import { Reject_Request } from '../pages/Reject_Legalization_Request_Page.js'

let Login;
let addrequest;
let Reject;
let LegalizationRequestNo = '';
let Notes = 'Attachments is uploaded'
let note = 'Request is Rejected'

test.beforeEach(async ({ page }) => {

    await page.goto('/')
})

test.describe('Legalization Request', () => {

    test('Add Legalization Request', async ({ page }) => {

        await page.setViewportSize({ width: 1920, height: 1080 });
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

        await page.setViewportSize({ width: 1920, height: 1080 });
        Login = new LoginPage(page)
        await Login.login('superadmin@coo.sa', 'P@ssw0rd', '0000')
        Reject = new Approve_request(page)
        await Reject.All_Requests_Tab()
        await Reject.click_on_pull_Request(LegalizationRequestNo)
        await Reject.My_Requests_Tab(LegalizationRequestNo)
        //Reject Request
        Reject = new Reject_Request(page)
        await Reject.Reject_Legalization_Request(note)
        // Check the egaliation request Status
        Reject = new Legalization_Status(page)
        await Reject.Search_For_Org_Req(LegalizationRequestNo)
        await Reject.Get_Request_Reject_Status(LegalizationRequestNo)

    })
})
