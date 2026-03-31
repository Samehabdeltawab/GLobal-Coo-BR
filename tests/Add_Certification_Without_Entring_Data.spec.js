import { test, expect } from '@playwright/test'
import { addingCertificate } from '../pages/NS_adding_certificate_without_entering_the_required_fields-dev-page'
import { LoginPage } from '../pages/LoginPage'


let CR;
let Login;

test.beforeEach(async ({ page }) => {

    await page.goto('/')
})

test.describe('Add New certificate without entering the required fields', () => {

    test('Add Certificate', async ({ page }) => {

        Login = new LoginPage(page)
        await Login.login('amadbouly2@techopsco.com', 'P@ssw0rd', '0000')
        CR = new addingCertificate(page)
        await CR.addCertification()
        await page.waitForTimeout(5000)
        await CR.Assert_Error_Mess()

    })
})