import { expect } from '@playwright/test';
import { test } from '../fixtures/user-fixtures';
import { LoginPage } from '../pages/LoginPage';
import { OrganizationPage } from '../pages/Organizations_Page';
import { EditOrganizationPage } from '../pages/Edit_Organization_Page';
import { Organization_Details } from '../pages/Organization_Details_page';
import { OrganizationEditRequestsPage } from '../pages/Admin_Organization_Edit_Requests_Page';
import { PageUtils } from '../utils/pageUtils'
import { saveUpdateOrganizationRequestNumber, loadUpdateOrganizationRequestNumber } from '../fixtures/requestNumberFixture';

/**
 * @type {LoginPage}
 */
let loginPage;
/**
 * @type {OrganizationPage}
 */
let organizationsPage;
/**
 * @type {EditOrganizationPage}
 */
let editOrganizationPage;
/**
 * @type {Organization_Details}
 */
let organizationDetailsPage;
/**
 * @type {OrganizationEditRequestsPage}
 */
let organizationEditRequestsPage;

// Function to submit an edit organization request and save the request number
/**
 * @param {import('@playwright/test').Page} page - The Playwright page object
 */
async function submitEditOrganizationRequest(page) {
    await organizationsPage.clickOnVeiwDetailsButton();
    await organizationDetailsPage.clickOnEditOrganizationButton();
    await editOrganizationPage.updateOrganization();
    const updateOrganizationRequestNumber = await PageUtils.getUpdateOrganizationRequestNumber(page);
    saveUpdateOrganizationRequestNumber(updateOrganizationRequestNumber);
}

// Function to handle the edit request based on the action (approve, reject, return)
/**
 * @param {string} action - The action to perform (approve, reject, return)
 */
async function handleEditRequest(action) {
    const requestNumber = loadUpdateOrganizationRequestNumber();
    await organizationEditRequestsPage.navigateToRegistrationEditRequestsPage();
    await organizationEditRequestsPage.clickPullRequestButton(requestNumber);
    await organizationEditRequestsPage.clickViewRequest(requestNumber);

    if (action === 'approve') {
        await organizationEditRequestsPage.clickApprovedRequestButton();
    } else if (action === 'reject') {
        await organizationEditRequestsPage.clickRejectRequestButton();
    } else if (action === 'return') {
        await organizationEditRequestsPage.clickReturnToApplicantButton();
    } else {
        throw new Error(`Invalid action specified: ${action} . Use "approve", "reject", or "return".`);
    }
}

// Function to resubmit the edit organization request
async function resubmitEditOrganizationRequest() {
    await organizationsPage.clickOnReturnedOrganizationButton();
    await organizationsPage.clickOnCorrectDataButton();
    await editOrganizationPage.updateOrganization();
}

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    organizationsPage = new OrganizationPage(page);
    editOrganizationPage = new EditOrganizationPage(page);
    organizationDetailsPage = new Organization_Details(page);
    organizationEditRequestsPage = new OrganizationEditRequestsPage(page);

});

test.describe('Applicant Submits update Organization Request and Th Admin Approves it', () => {
    test('The applicant send edit organization request', async ({ page, applicantLogin: _ }) => {
        await submitEditOrganizationRequest(page);
    });

    test('The admin approve the edit organization request', async ({ adminLogin: _ }) => {
        await handleEditRequest('approve');
    });
});

test.describe('Admin Rejects the Edit Organization Request', () => {
    test('The applicant send edit organization request', async ({ page, applicantLogin: _ }) => {
        await submitEditOrganizationRequest(page);
    });
    test('The admin reject the edit organization request', async ({ adminLogin: _ }) => {
        await handleEditRequest('reject');
    });
});

test.describe('Admin Return the Edit Organization Request', () => {
    test('The applicant send edit organization request', async ({ page, applicantLogin: _ }) => {
        await submitEditOrganizationRequest(page);
    });
    test('The admin return the edit organization request', async ({ adminLogin: _ }) => {
        await handleEditRequest('return');
    });

    test('The applicant resubmit the edit organization request', async ({ applicantLogin: _ }) => {
        await resubmitEditOrganizationRequest();
    });

    test('The admin approve the edit organization request', async ({ adminLogin: _ }) => {
        await handleEditRequest('approve');
    });
});