import { test, expect } from '@playwright/test';
import DatabaseHelper from '../dbConfig/databaseHelper';

export class ForgetPasswordPage {
    constructor(page) {
        this.page = page;
        this.StartServiceButton = page.locator('//button[@class="action-btn hide-in-mobile"]');
        this.forgetPasswordButton = page.locator('//*[@id="forget-password"]');
        this.emailTextBox = page.locator('#Email');
        this.forgetPasswordCaptchaTextBox = page.locator('#CaptchaModel_CaptchaValue');
        this.submitButton = page.locator('#submitBtn');
        this.loginButtonLocator = page.getByRole('button', { name: /Login|Entrar/ });
        this.passwordTextBox = page.getByPlaceholder(/Password|Senha/);
        this.confirmPasswordTextBox = page.getByPlaceholder(/Confirm the password|Confirme a senha/);
        this.submitChangePasswordButton = page.getByRole('button', { name: /Submit|Enviar/ });
        this.goToApplicationButton = page.getByRole('button', { name: /Go to the application|Vá para o aplicativo/ });
    }

    async clickStartServiceButton() {
        await this.StartServiceButton.click();
    }

    async clickForgetPasswordButton() {
        await this.forgetPasswordButton.click();
    }

    async fillEmailTextBox(email) {
        await this.emailTextBox.fill(email);
    }

    async fillForgetPasswordCaptchaTextBox(captcha) {
        await this.forgetPasswordCaptchaTextBox.fill(captcha);
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }

    // I want function name instead of ForgetPasswordfn
    /**
     * Function to handle the forget password process
     * @param {string} email - The email address for password reset
     * @param {string} Captcha - The captcha value for verification
     */
    async handleForgetPassword(email, Captcha) {
        await this.clickStartServiceButton();
        await this.clickForgetPasswordButton();
        await this.fillEmailTextBox(email);
        await this.fillForgetPasswordCaptchaTextBox(Captcha);
        await this.clickSubmitButton();
        // Wait for the reset link to be sent
        await this.page.waitForTimeout(2000); // Adjust the timeout as needed
        // Navigate to the reset password link
        const Url = await DatabaseHelper.getLatestResetLinkByRecipient(email);
        await this.page.goto(Url);
    }

    async handleResetPassword(password, confirmPassword) {
        await this.passwordTextBox.fill(password);
        await this.confirmPasswordTextBox.fill(confirmPassword);
        await this.submitChangePasswordButton.click();
        await this.goToApplicationButton.click();
    }

    generatePassword() {
        const prefix = "P@ssw0rd_";
        const randomNumbers = Math.floor(100000 + Math.random() * 900000);
        return prefix + randomNumbers;
    }


    async assertBackToLoginPage() {
        await expect(this.loginButtonLocator).toBeVisible();
    }

    async assertUserNavigatedToOrganizationsList() {
        await this.page.waitForURL('https://global-coo-frontend.aks.thiqah.sa/organizations/list', { timeout: 10000 });
        await expect(this.page).toHaveURL('https://global-coo-frontend.aks.thiqah.sa/organizations/list');
    }


}