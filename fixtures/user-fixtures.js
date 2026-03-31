import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { OrganizationPage } from '../pages/Organizations_Page';
import { getTestDataForLogin } from '../utils/Constants';

export const test = base.extend({
    applicantLogin: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        const testData = getTestDataForLogin();
        await page.goto('/');
        await loginPage.login(testData.ApplicantEmail, testData.Password, testData.OTP);
        await use();
    },

    adminLogin: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        const testData = getTestDataForLogin();
        await page.goto('/');
        await loginPage.login(testData.AdminEmail, testData.Password, testData.OTP);
        await use();
    },

    logout: async ({ page }, use) => {
        const orgPage = new OrganizationPage(page);
        await orgPage.clickOnLogout();
        await use();
    }
});