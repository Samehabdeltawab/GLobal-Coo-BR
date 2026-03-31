import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.goTOLoginFromButton = page.locator("(//button[contains(@class,'action-btn')])[2]");
    this.usernameTextbox = page.locator('#LoginInput_UserNameOrEmailAddress');
    this.passwordTextbox = page.locator('#LoginInput_Password');
    this.loginButton = page.locator('#btnSubmit');
    this.otpTextbox = page.locator('#OtpValue');
    this.verfiyOTPButton = page.locator('//button[@id="verifyOtp"]');
    this.assert = page.locator('//button[@class="btn btn-primary w-auto"]');
    this.language = page.locator("//button[contains(@class,'dropdown-toggle')]")
    this.selectLanguage = page.locator("(//span[contains(@class,'dropdown-item')])[2]")
    //Validate confirm password
    this.validationMes = page.locator("(//div[contains(@class,'alert')])[1]")
  }

  async login(userEmail, password, otp) {

    await this.language.click()
    await this.selectLanguage.click()
    await this.goTOLoginFromButton.click();
    if (userEmail) {
      await this.usernameTextbox.fill(userEmail);
    }

    if (password) {
      await this.passwordTextbox.fill(password);
    }
    await this.loginButton.click();
    await new Promise((f) => setTimeout(f, 2000));
    if (otp) {
      await this.otpTextbox.fill(otp);
      await this.verfiyOTPButton.click();
    }
  }

  async Asserttitle() {

    await expect(this.assert).toBeVisible();
  }

  //Validat Error Message For Invald Login
  async errorMessage() {

    await expect(this.validationMes).toHaveText('Incorrect email or password. please try again')
  }
}
