import { time } from "console";
import { expect } from "playwright/test";

exports.Payment = 

class Payment {

    constructor (page){

        this.page = page;
        this.cridetCard = page.locator("(//span[@class='andes-list__item-primary'])[2]")
        //Payment Elements
        this.holderName = page.locator('#cardholderName')
        //Handle Card Number Iframe
        this.cardNumberFrame = this.page.frameLocator('#iframe-sf-cardNumber')
        this.cardNumberInput = this.cardNumberFrame.locator('#cardNumber')
        // //Handle Expiration Date Iframe
        this.expirationDateFrame = this.page.frameLocator('#iframe-sf-expirationDate')
        this.expirationDateInput = this.expirationDateFrame.locator('#expirationDate')
        ////Handle Security Code Iframe
        //this.securityCodeFrame = page.waitForSelector('#iframe-sf-securityCode')
        this.securityCodeFrame = this.page.frameLocator('#iframe-sf-securityCode');  
        this.securityCodeInput = this.securityCodeFrame.locator('#securityCode');
        this.CPF = page.locator('#cardholderIdentificationNumber')
        this.email = page.locator("#user-email-input")
        this.nextBtn = page.locator("//button[contains(@class,'continue_button')]")
        this.payBtn = page.locator("(//span[@class='andes-button__content'])[3]")
        this.backBtn = page.locator("(//span[@class='andes-button__content'])[1]")

    }

    async Payment_Proccess(){

        await this.cridetCard.click()
        //const cardNumber = await this.cardNumberFrame
        // Get the content frame of the iframe
        //const card = await cardNumber.contentFrame();
        // Fill the input field inside the iframe
        await this.cardNumberInput.fill('5031433215406351')
        //Fill Holder name
        await this.holderName.fill('APRO APRO')
        //const epirationDat = await this.expirationDateFrame
        // Get the content frame of the iframe
       // const expireDate = await epirationDat.contentFrame();
        await this.expirationDateInput.fill('12/25')
        await this.page.waitForTimeout(3000);
        //const securityCode = await this.securityCodeFrame;
        // Get the content frame of the iframe
        //const code = await securityCode.contentFrame();
        await this.securityCodeInput.fill('123')
       //await this.page.waitForLoadState('networkidle')
       //await this.page.waitForLoadState('domcontentloaded')
        await this.CPF.fill('19119119100')
        await this.page.waitForTimeout(3000);
        //await expect(this.nextBtn).toBeEnabled()
        await this.nextBtn.click()
        //await this.page.waitForTimeout(20000);
        await expect(this.email).toBeEnabled()
        await this.email.fill('test_user_64585784@testuser.com')
        await this.payBtn.click()
        //await expect(this.backBtn).toBeEnabled()
        //await this.backBtn.click()
        //await this.page.waitForTimeout(3000)

    }
}