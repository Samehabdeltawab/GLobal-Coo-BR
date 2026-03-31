import { expect} from "@playwright/test";

exports.Organization_Details = 

class Organization_Details {

    constructor (page) {

        this.page = page
        this.AllRequestspage = page.locator('//span[contains(text(), "All requests")]')
        this.OrganizationRequests = page.locator('//button[contains(text(), "Registration requests")]') 
        this.RequestNosearch = page.locator("//input[@placeholder = 'Request Number']") 
        this.searchBtn = page.locator('//button[contains(text(), "Search")]')
        this.Searchbtn = page.locator("//button[@type= 'submit']")
        this.dots = page.locator("(//a[contains(@class,'dropdown-toggle')])[3]")
        this.viewrequestBtn = page.locator ('//a[contains(text(), "View request")]')
        this.backBtn = page.locator("//button[contains(text(), 'Back')]")
        this.PageHeader = page.locator("//div[@class ='request-details_header']")
        this.editOrganizationButton = page.locator("//button[normalize-space()='Edit Organization' or normalize-space()='Editar Organização']")
        this.status = page.locator()
    }


    async Open_Organization_Details_Page (reqId){

        await this.AllRequestspage.click()
        await this.OrganizationRequests.click()
        await this.RequestNosearch.fill(reqId)
        await this.searchBtn.click()
        await this.dots.click()
        await this.viewrequestBtn.click()
    }

    async Check_Page_Details(reqId){

        await expect(this.backBtn).toBeVisible()
        const pageHeaderText = await this.PageHeader.textContent();
        console.log('All text In the Header:', pageHeaderText)
        await expect(pageHeaderText).toContain(String(reqId));
        console.log(reqId)
    }

    async clickOnEditOrganizationButton() {
        await this.editOrganizationButton.click();
    }
}