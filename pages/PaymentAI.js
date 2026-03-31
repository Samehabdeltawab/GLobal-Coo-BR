import { expect } from "playwright/test";

exports.Payment = class Payment {
    constructor(page) {
        this.page = page;

        // Payment method selection
        this.creditCard = page.locator("(//span[@class='andes-list__item-primary'])[2]");
        this.nextBtn = page.locator("(//span[@class='andes-button__content'])[1]");
        this.payBtn = page.locator("(//span[@class='andes-button__content'])[3]");
        this.backBtn = page.locator("(//span[@class='andes-button__content'])[1]");

        // Payment elements
        this.holderName = page.locator('#cardholderName');
        this.cardNumberFrame = page.frameLocator('iframe');  // Correct iframe handling
        this.cardNumberTxt = this.cardNumberFrame.locator('#cardNumber'); // Locate input inside iframe
        this.CPF = page.locator('#cardholderIdentificationNumber');
        this.email = page.locator("#user-email-input");
        this.amount = page.locator("//span[@class='andes-money-amount__fraction']");
    }

    async Payment_Proccess() {
        // Select Credit Card
        await this.creditCard.click();

        // Fill Card Number inside iframe
        await this.cardNumberTxt.fill('5031433215406351');

        // Fill Holder Name
        await this.holderName.fill('APRO APRO');

        // Handle Expiration Date inside iframe
        const expirationFrame = this.page.frameLocator('#iframe-sf-expirationDate');
        await expirationFrame.locator('#expirationDate').fill('12/25');

        // Wait for the page to load
        await this.page.waitForLoadState('domcontentloaded');

        // Handle Security Code inside iframe
        const securityFrame = this.page.frameLocator('#iframe-sf-securityCode');
        await expect(securityFrame.locator('#securityCode')).toBeVisible();
        await securityFrame.locator('#securityCode').fill('123');

        // Validate the payment amount
        await expect(this.amount).toHaveText('R$ 34');

        // Fill CPF
        await this.CPF.fill('19119119100');

        // Proceed to next step
        await this.nextBtn.click();

        // Fill Email
        await this.email.fill('test_user_64585784@testuser.com');

        // Click Pay and Back buttons
        await this.payBtn.click();
        await this.backBtn.click();
    }
};