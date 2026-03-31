import { expect } from "@playwright/test"


exports.ApproveOrganization =
  class ApproveOrganization {

    constructor(page) {

      this.page = page

      // Actions from admin user
      this.OrganizationRequests = page.locator('//span[contains(text(), "Registration requests")]')
      this.AllRequests = page.locator("(//button[contains(@class, 'nav-tab-button')])[2]")
      this.pullRequestBtn = page.locator('//button[contains(text(), "Pull request")]')
      this.pullconfirmBtn = page.locator("//button[contains(text(), 'Confirm Pull Request')]")
      this.MyRequests = page.locator('//button[contains(text(), "My requests")]')
      this.SearchTxtfield = page.locator("//input[@placeholder = 'Search']")
      this.Searchbtn = page.locator("//button[@type= 'submit']")
      this.dots = page.locator("(//a[contains(@class,'dropdown-toggle')])[3]")
      this.viewrequestBtn = page.locator("//a[contains(text(),' View request ')]")
      this.approveBtn = page.locator('//button[contains(text(), " Approve Request ")]')
      this.confirmBtn = page.locator('//button[contains(text(), "Yes")]')
      this.loader = page.locator('//*[@class="loader"]')
    }

    async All_Requests_Page() {


      await this.OrganizationRequests.click()
      await this.AllRequests.click()
      await this.page.waitForLoadState('networkidle')

    }

    async Search_For_Request(reqId) {

      await this.SearchTxtfield.fill(reqId)
      await this.Searchbtn.click()
      await expect(this.loader).toBeHidden()

    }

    async click_on_pull_Request() {
      await this.pullRequestBtn.click()
      await this.pullconfirmBtn.click()
    }

    async My_Requests_Page(reqId) {

      await this.MyRequests.click()
      await this.SearchTxtfield.fill(reqId)
      await this.Searchbtn.click()
      await this.dots.click()
      // await this.page.waitForLoadState('domcontentloaded')
      //await expect(this.page.locator(`//td[contains(text(),'${reqId}')]/following-sibling::td[5]`)).toBeVisible
      //await this.page.locator(`//td[contains(text(),'$eqId}')]/following-sibling::td[5]`).click()
      console.log("request id value:" + reqId)
      await this.viewrequestBtn.click()
      await this.page.waitForLoadState('networkidle')
    }

    async Approve_Request() {

      await this.approveBtn.click()
      await this.confirmBtn.click()
      // await this.page.locator(`//td[contains(text(),'${reqId}')]/..//a[contains(.,'View request')]`).click()

    }
  }
