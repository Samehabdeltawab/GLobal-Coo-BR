import { test } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { Add_Legalization_Page } from '../pages/Add_Legalization_Page'
import { Approve_request } from '../pages/Approve_Legalization_Request_Page';
import { Legalization_Status } from '../pages/Check_Legalization_Request_Status_Page'
import { Return_Request } from '../pages/Return_Legaliz_Request_To_Applicant'
import { Edit_Request } from '../pages/Edit_Legalization_Request'

let Login;
let addrequest;
let ReturnRequest;
let LegalizationRequestNo = ''
let note = 'The request need to be updated'
let Edit;
let text = 'The new file is uploaded'
let Notes = 'The file is Upladed'

test.beforeEach(async ({ page }) => {

    await page.goto('/')
})

test.afterEach(async ({ page }) => {

    await page.close()
})

test.describe('Legalization Request', () => {

    test('Add Legalization Request', async ({ page }) => {
        test.slow()
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

    test('Return the legalization request to the applicant', async ({ page }) => {

        test.slow()
        await page.setViewportSize({ width: 1920, height: 1080 });
        Login = new LoginPage(page)
        await Login.login('superadmin@coo.sa', 'P@ssw0rd', '0000')
        ReturnRequest = new Approve_request(page)
        await ReturnRequest.All_Requests_Tab()
        await ReturnRequest.click_on_pull_Request(LegalizationRequestNo)
        await ReturnRequest.My_Requests_Tab(LegalizationRequestNo)
        ReturnRequest = new Return_Request(page)
        await ReturnRequest.Retrun_Request_To_applicant(note)
        await ReturnRequest.Assert_Popup_And_Confirmation()
        // Check the egaliation request Status
        ReturnRequest = new Legalization_Status(page)
        await ReturnRequest.Search_For_Org_Req(LegalizationRequestNo)
        await ReturnRequest.Get_Returned_Request_status(LegalizationRequestNo)
    })

    test('Edit Request', async ({ page }) => {

        test.slow()
        await page.setViewportSize({ width: 1920, height: 1080 });
        Login = new LoginPage(page)
        await Login.login('ssayed335@gmail.com', 'P@ssw0rd', '0000')
        Edit = new Edit_Request(page)
        await Edit.Open_Legalization_Page()
        await Edit.Search_For_request(LegalizationRequestNo)
        await Edit.Edit_Request(LegalizationRequestNo)
        await Edit.Remove_Attachemnts()
        await Edit.Upload_New_Attachments(text)
        //Check the request status after updating
        await Edit.Search_For_request(LegalizationRequestNo)
        Edit = new Legalization_Status(page)
        await Edit.Request_Status_After_Editing(LegalizationRequestNo)


    })



})