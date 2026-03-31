import { test, expect } from '@playwright/test';
import { ForgetPasswordPage } from '../pages/ForgetPasswordPage';
import { LoginPage } from '../pages/LoginPage';


/**
 * @type {ForgetPasswordPage} 
*/
let forgetPassword;
let loginPage;
let generatedPassword;
let Email = 'ahmedmohamed2@gmail.com';
const Captcha = '0000';


// this line to not use the saved logged in state
test.use({ storageState: { cookies: [], origins: [] } })

// The test suite
test.beforeEach(async ({ page }) => {
    forgetPassword = new ForgetPasswordPage(page);
    loginPage = new LoginPage(page);
    await page.goto('/');
});


test.describe('ForgetPassword', () => {

    // test case to check the forget password functionality
    test('should be able to navigate to forget password page', async ({ }) => {
        await forgetPassword.clickStartServiceButton();
        await forgetPassword.clickForgetPasswordButton();
        // Assert that the user is on the forget password page
        await expect(forgetPassword.emailTextBox).toBeVisible();
    });

    test('should be able to submit reset password', async ({ }) => {
        generatedPassword = forgetPassword.generatePassword();
        console.log('Generated Password:', generatedPassword);
        await forgetPassword.handleForgetPassword(Email, Captcha);
        await forgetPassword.handleResetPassword(generatedPassword, generatedPassword);
        // Assert that the user is redirected to the login page
        await forgetPassword.assertBackToLoginPage();
    });

    // test case to check the user logged in with the new password
    test('should be able to login with the new password', async ({ page }) => {
        await loginPage.login(Email, generatedPassword, '0000');
        // Assert that the user is logged in successfully
        await forgetPassword.assertUserNavigatedToOrganizationsList();
    });

    test('should show error for invalid email format', async () => {
        await forgetPassword.clickStartServiceButton();
        await forgetPassword.clickForgetPasswordButton();
        await forgetPassword.fillEmailTextBox('invalid-email');
        await forgetPassword.fillForgetPasswordCaptchaTextBox(Captcha);
        await forgetPassword.clickSubmitButton();
        await expect(forgetPassword.page.locator('text=/O formato do e-mail está incorreto\\.|The format of the E-mail is incorrect/')).toBeVisible();
    });

    test('should show error when email is missing', async () => {
        await forgetPassword.clickStartServiceButton();
        await forgetPassword.clickForgetPasswordButton();
        await forgetPassword.fillForgetPasswordCaptchaTextBox(Captcha);
        await forgetPassword.clickSubmitButton();
        await expect(forgetPassword.page.locator('text=/O Campo E-mail é obrigatório\\.|The Email field is required\\./')).toBeVisible();
    });

    test('should show error when captcha is missing', async () => {
        await forgetPassword.clickStartServiceButton();
        await forgetPassword.clickForgetPasswordButton();
        await forgetPassword.fillEmailTextBox(Email);
        await forgetPassword.clickSubmitButton();
        await expect(forgetPassword.page.locator('text=This field is required.')).toBeVisible();
    });

    test('should show error for weak password', async () => {
        await forgetPassword.handleForgetPassword(Email, Captcha);
        await forgetPassword.handleResetPassword('123', '123');
        const errorMessage = await forgetPassword.page.locator('span[id="Password-error"]').textContent();
        console.log('Error Message:', errorMessage);
        await expect(errorMessage).toContainText(/The format of the Password is incorrect\\.|O formato da senha está incorreto\\./);
        //await expect(errorMessage).toHaveText('O formato da senha está incorreto.');
        //await expect(errorMessage).toContainText('The format of the Password is incorrect.');
    });

});