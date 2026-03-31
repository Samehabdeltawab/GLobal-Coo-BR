import {expect} from '@playwright/test'

exports.AddingNewOrgwithoutdata = 

class AddingNewOrgwithoutdata{


    constructor (page){

        this.page = page
        // Add organization without entring required fields
        this.addorgBtn = page.locator(("//button[contains (@class, 'btn-primary')]"))
        this.submitBtn = page.locator("//button[normalize-space()='Submit']")
        this.errormMes = page.locator('.abp-toast-message')
        //Assert ID type number required message
        this.InvalidMess = page.locator("//div[contains(@class,'invalid-feedback')]")
    }
    
    // Add organization without entring required fields
    async invalidAddOrg(){

        await this.addorgBtn.click()
        await this.submitBtn.click()
    }

    //Validate Error message
    async errorMessage(){

        await expect(this.errormMes).toHaveText('Invalid Form')
    }

    async assert_ID_type_Number_Validation(){

        const Invalidmessage = await this.InvalidMess
        const fieldRequired = await Invalidmessage.textContent()
        console.log(fieldRequired)
        await expect(Invalidmessage).toBeVisible()

    }
    
}



