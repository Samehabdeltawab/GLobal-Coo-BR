import { test, expect } from '@playwright/test'
import { OrganizationTestDataGenerator } from '../utils/OrganizationTestDataGenerator'
let OrganizationRequestNo = ''
exports.AddOrganization =

  class AddOrganization {

    constructor(page) {

      this.page = page
      //Click on Add organization button
      this.Addbtn = page.locator("//button[contains(@class, 'btn-primary')]")
      //Insert Entity Name
      this.EntityName = page.locator("//input[@placeholder='Entity Name']")
      //Insert Trade Name
      this.TradeName = page.locator("//input[@placeholder='Trade name']")
      //Open sector field dropdownlist to select value
      this.sector = page.locator("(//div[@class='ng-value-container'])[1]")
      //Select sector value by text
      this.Selectsector = page.locator('//span[contains(text(), "Food and Beverage Industry")]')
      // Open producer field to select value
      this.type = page.locator("(//div[@class='ng-value-container'])[2]")
      // Select producer value
      this.Selecttype = page.locator('//span[contains(text(), "Producer")]')
      // Insert Activity 
      this.ActivityText = page.locator("//input[@name='activity']")
      // Select ID type
      this.IDtype = page.locator("(//div[@class='ng-value-container'])[3]")
      this.SelectID = page.locator('(//span[contains(text(), "CNPJ")])[1]')
      // Insert ID Number
      this.IDNoText = page.locator("(//input[@name='idTypeNumber'])[1]")
      // Select ID type
      this.IDtypetwo = page.locator("(//div[@class='ng-value-container'])[4]")
      this.SelectIDtwo = page.locator('(//span[contains(text(), "CNPJ")])[2]')
      // Insert ID Number
      this.IDNotwoText = page.locator("(//input[@name='idTypeNumber'])[2]")
      // Insert Landline number
      this.phonNo = page.locator("//input[@placeholder='Landline']")
      //Insert Email
      this.email = page.locator("//input[@name='email']")
      //Select City
      this.city = page.locator("(//div[@class='ng-value-container'])[6]")
      this.SelectCity = page.locator('//span[contains(text(), "Rondônia")]')
      //Select District name
      this.districtname = page.locator("(//div[@class='ng-value-container'])[7]")
      this.Selectdistrict = page.locator('//span[contains(text(), "Alto Alegre")]')
      //Insert Street name
      this.street = page.locator("//input[@name='streetName']")
      // Insert zipcode
      this.zipcode = page.locator("//input[@name='zipCode']")
      //Insert addition number
      this.additionnumber = page.locator("//input[@name='additionalNumber']")
      //Select Job Title
      this.JobTitle = page.locator("(//div[@class='ng-value-container'])[8]")
      this.SelectJob = page.locator('//span[contains(text(), "CEO (Chief Executive Officer)")]')
      //Clcik on the submit button
      this.submitbtn = page.locator('//button[contains(text(), "Submit")]')
      // Verify the success message
      this.successMes = page.locator('//h4[contains(text(), "Registration completed successfully")]')
      this.RequestNumber = page.locator("(//p[@class='success-message_sub-title'])[1]")



    }

    async Add_Btn() {

      await this.Addbtn.click()
    }

    // Add organization method
    async Addorg(orgData) {

    await this.EntityName.fill(orgData.entityname)
    await this.TradeName.fill(orgData.tradename)
    await this.sector.click()
    await this.Selectsector.click()
    await this.type.click()
    await this.Selecttype.click()
    await this.ActivityText.fill(orgData.activity)
    await this.IDtype.click()
    await this.SelectID.click()
    await this.IDNoText.fill(orgData.ID)
    await this.IDtypetwo.click()
    await this.SelectIDtwo.click()
    await this.IDNotwoText.fill(orgData.SecondID)
    await this.phonNo.fill(orgData.phone)
    await this.email.fill(orgData.email)
    await this.city.click()
    await this.SelectCity.click()
    await this.districtname.click()
    await this.Selectdistrict.click()
    await this.street.fill(orgData.Streetname)
    await this.zipcode.fill(orgData.ZipCode)
    await this.additionnumber.fill(orgData.Additionnumber)
    await this.JobTitle.click()
    await this.SelectJob.click()
    await this.submitbtn.click()
  }
    //Validate Error message
    async SuccessMessage() {
      await expect(this.successMes).toHaveText('Registration completed successfully')
    }
    //Store the organization request in avariable
    async GetOrgRequestNo() {
      const requestNumberElement = await this.RequestNumber;
      if (requestNumberElement) {
        const textContent = await requestNumberElement.textContent();
        if (textContent) {
          const regex = /(?<=Request number: )\S+/;
          const requestNumber = textContent.match(regex);
          OrganizationRequestNo = requestNumber
          let OrganizationRequestNumber = (requestNumber ? requestNumber[0] : 'No match found')
          // console.log(requestNumber ? requestNumber[0] : 'No match found');
          return OrganizationRequestNumber;
        }
      }
      return 'Request number not found'; // Explicit return for cases where element is missing 
    }
  }

