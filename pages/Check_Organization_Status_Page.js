import { expect } from "@playwright/test";

exports.OrganizationStatus = 

class OrganizationStatus{

    constructor(page){

        this.page = page

        this.AllRequestspage = page.locator('//span[contains(text(), "All requests")]')
        this.OrganizationRequests = page.locator('//button[contains(text(), "Registration requests")]') 
        this.RequestNosearch = page.locator("//input[@placeholder = 'Request Number']") 
        this.searchBtn = page.locator('//button[contains(text(), "Search")]')
    }


    async Search_For_Org_Req(reqId){


        await this.AllRequestspage.click()
        await this.OrganizationRequests.click()
        await this.RequestNosearch.fill(reqId)
        await this.searchBtn.click()
    }

    async Get_Request_Approve_Status(reqId){

        await expect(this.page.locator(`//td[contains(text(),'${reqId}')]/following-sibling::td[4]`)).toHaveText('Accepted')
    }


    async Get_Request_Reject_Status(reqId){

        await expect(this.page.locator(`//td[contains(text(),'${reqId}')]/following-sibling::td[4]`)).toHaveText('Rejected')
    }

    async Get_Returned_Request_status(reqId){

        await expect(this.page.locator(`//td[contains(text(),'${reqId}')]/following-sibling::td[4]`)).toHaveText('Returned to the applicant')

    }
}