import { expect } from '@playwright/test'

exports.Reject_Organization_Request =

  class Reject_Organization_Request {

    constructor(page) {

      this.page = page
      this.RejectBtn = page.locator("//button[contains(@class,'btn-modal-reject')]")
      this.RejectNotes = page.locator("//textarea[@placeholder ='Notes']")
      this.confirmBtn = page.locator("//button[@type ='submit']")
      this.confirmationmessage = page.locator("//p[@class ='confirmation-popup_message']")
      this.yesBtn = page.locator('//button[contains(text(), "Yes")]')
    }


    async Organization_Request_Reject(Notes) {

      await this.RejectBtn.click()
      await this.RejectNotes.fill(Notes)
      await this.confirmBtn.click()
      await expect(this.confirmationmessage).toHaveText('Are you sure that the request will be rejected?')
      await this.yesBtn.click()
    }
  }