import { expect } from '@playwright/test';
import { test } from '../fixtures/user-fixtures';
import { LoginPage } from '../pages/LoginPage';
import { UsersPage } from '../pages/Users_Page';
import { OrganizationPage } from '../pages/Organizations_Page';
import { faker } from '@faker-js/faker';

test.describe('Users Page Tests', () => {
    let firstName;
    let lastName;
    let email;
    /**
     * @type {LoginPage}
     */
    let loginPage;
    /**
     * @type {UsersPage}
     */
    let usersPage;
    /**
     * @type {OrganizationPage}
     */
    let organizationPage;

    test.beforeAll(async ({ page }) => {
        loginPage = new LoginPage(page);
        usersPage = new UsersPage(page);
        organizationPage = new OrganizationPage(page);
    });

    // Helper to create a user and assert presence in grid
    async function createAndAssertUser({ userType = 'Admin', permissions = [] } = {}) {
        firstName = faker.person.firstName();
        lastName = faker.person.lastName();
        email = faker.internet.email({ firstName, lastName });
        usersPage.setUserData(firstName, lastName, email);
        await usersPage.navigateToUsersPage();
        await usersPage.addCustomUser(firstName, lastName, email, userType, permissions);
    }

    test('The superadmin add new user with type Admin & Verify the created user can login to the portal', async ({ adminLogin: _ }) => {
        await createAndAssertUser({ userType: 'Admin' });
        await usersPage.assertDisplayUserInfoInGrid(usersPage.getUserData().firstName, usersPage.getUserData().lastName, usersPage.getUserData().email);
        console.log('Email:', usersPage.getUserData().email);
        await organizationPage.clickOnLogout();
        await loginPage.login(usersPage.getUserData().email, 'P@ssw0rd_123456', '0000');
        await usersPage.assertDisplayUserName(usersPage.getUserData().firstName, usersPage.getUserData().lastName);
    });

    test('The superadmin deactivate the user', async ({ adminLogin: _ }) => {
        await usersPage.navigateToUsersPage();
        console.log('Email:', usersPage.getUserData().email);
        await usersPage.searchWithFirstName(usersPage.getUserData().email);
        await usersPage.setUserState('Inactive');
        await usersPage.assertUserState('Inactive');
    });

    test('The superadmin activate the user', async ({ adminLogin: _ }) => {
        await usersPage.navigateToUsersPage();
        await usersPage.searchWithFirstName(usersPage.getUserData().email);
        await usersPage.setUserState('Active');
        await usersPage.assertUserState('Active');
    });

    test('The superadmin add new user with type Employee with All Permission', async ({ adminLogin: _ }) => {
        await createAndAssertUser({ userType: 'Employee', permissions: ['selectAll'] });
        await usersPage.assertDisplayUserInfoInGrid(usersPage.getUserData().firstName, usersPage.getUserData().lastName, usersPage.getUserData().email);
    });

    test('The superadmin add new user with type Employee with Organization Requests Permission', async ({ adminLogin: _ }) => {
        await createAndAssertUser({ userType: 'Employee', permissions: ['organizationRequests'] });
        await usersPage.assertDisplayUserInfoInGrid(usersPage.getUserData().firstName, usersPage.getUserData().lastName, usersPage.getUserData().email);
    });

    test('The superadmin add new user with type Employee with Edit Organization Requests Permission', async ({ adminLogin: _ }) => {
        await createAndAssertUser({ userType: 'Employee', permissions: ['editOrganizationRequests'] });
        await usersPage.assertDisplayUserInfoInGrid(usersPage.getUserData().firstName, usersPage.getUserData().lastName, usersPage.getUserData().email);
    });

    test('The superadmin add new user with type Employee with Search All Requests Permission', async ({ adminLogin: _ }) => {
        await createAndAssertUser({ userType: 'Employee', permissions: ['searchAllRequests'] });
        await usersPage.assertDisplayUserInfoInGrid(usersPage.getUserData().firstName, usersPage.getUserData().lastName, usersPage.getUserData().email);
    });

    test('The superadmin search for the created user', async ({ adminLogin: _ }) => {
        await usersPage.navigateToUsersPage();
        await usersPage.searchWithFirstName(usersPage.getUserData().email);
        await usersPage.assertDisplayUserInfoInGrid(usersPage.getUserData().firstName, usersPage.getUserData().lastName, usersPage.getUserData().email);
    });

    test('The superadmin resend the activation email', async ({ adminLogin: _ }) => {
        await usersPage.navigateToUsersPage();
        await usersPage.searchWithFirstName(usersPage.getUserData().email);
        await usersPage.resendActivationEmail();
        await expect(usersPage.resendActivationEmailSuccessMessage).toBeVisible();
        await expect(usersPage.resendActivationEmailSuccessMessage).toHaveText('Password token sent successfully');
    });

    test('The superadmin update user email before the activation', async ({ adminLogin: _ }) => {
        const newEmail = faker.internet.email();
        await usersPage.navigateToUsersPage();
        await usersPage.searchWithFirstName(usersPage.getUserData().email);
        await usersPage.updateUserDetails({ email: newEmail });
    });
});