import { expect } from '@playwright/test'

exports.Retrun_Org_Request =

    class Retrun_Org_Request {

        constructor(page) {

            this.page = page

            // Actions from the admin user
            this.RetrunBtn = page.locator("//button[contains(@class,'btn-resend')]")
            this.NotesTxt = page.locator("//textarea[@placeholder='Notes']")
            this.confirmBtn = page.locator("//button[@type='submit']")
            this.popupMess = page.locator("//p[@class='confirmation-popup_message']")
            this.yesBtn = page.locator("//button[contains(text(),'Yes')]")
        }

        async Retrun_Request_To_applicant(note) {

            await this.RetrunBtn.click()
            await this.NotesTxt.fill(note)
            await this.confirmBtn.click()
        }

        async Assert_Popup_And_Confirmation() {

            await expect(this.popupMess).toHaveText('Are you sure to return the request to the applicant?')
            await this.yesBtn.click()
        }
    }