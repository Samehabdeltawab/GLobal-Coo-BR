import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { Add_Legalization_Page } from '../pages/Add_Legalization_Page'


let Login;
let Legalization;
let Notes = 'File uploaded'

test.beforeEach(async ({ page }) => {

    await page.goto('/')
})

test.describe('Legalization Request', () => {

    test('Add Legalization Request', async ({ page }) => {

        Login = new LoginPage(page)
        await Login.login('ssayed335@gmail.com', 'P@ssw0rd', '0000')
        Legalization = new Add_Legalization_Page(page)
        await Legalization.Call_Certificate_approved()
        await Legalization.Insert_legalization_Data(Notes)
        await Legalization.assertsuccessMessage()
        let Request_Number = await Legalization.GetRequestNo()
        console.log(Request_Number)

    })
})
