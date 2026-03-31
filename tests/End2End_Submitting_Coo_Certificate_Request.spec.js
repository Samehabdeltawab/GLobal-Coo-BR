import { expect } from '@playwright/test';
import { test } from '../fixtures/user-fixtures';
import { Add_Certificate_Request } from '../pages/Add_Certificate_Request_Page'
import { CertificationsRequestsPage } from '../pages/CertificationsRequestsPage'
import { CertificationsPage } from '../pages/CertificationsPage'
import { saveCertificateNumber, saveRequestNumber, loadRequestNumber, loadCertificateNumber, saveLegalizationRequestNumber, loadLegalizationRequestNumber } from '../fixtures/requestNumberFixture'
import { OrganizationPage } from '../pages/Organizations_Page';
import { LegalizationRequestsPage } from '../pages/LegalizationRequestPage'
import { handleDownloadAndSave } from '../utils/downloadHelper'
import { FILES } from '../utils/files'
import { PageUtils } from '../utils/pageUtils'


/**
     * @type {Add_Certificate_Request}
     */
let CR;

/**
 * @type {CertificationsRequestsPage}
 */
let certificationsRequestsPage

/** 
 * @type {CertificationsPage}
*/
let certificationsPage

/**
 * @type {OrganizationPage}
 */
let organizationPage

/**
 * * @type {LegalizationRequestsPage}
 */
let legalizationRequestsPage

// Function to submit a certificate request and save the request number
/**
 * @param {import('@playwright/test').Page} page - The Playwright page object
 */
async function submitCertificateRequest(page) {
  await CR.Add_New_Certificate_Request()
  await CR.stepOneRequestInfo()
  await CR.stepTwoShippingInfo()
  await CR.stepThreeInvoiceandProductsInfo()
  await CR.stepFourAgreeTerms()
  await new Promise((f) => setTimeout(f, 20000))
  const requestNumber = await PageUtils.getRequestNumber(page)
  saveRequestNumber(requestNumber)
}

// Function to handle the certificate request based on the action (approve, reject, return)
/**
 * @param {string} action - The action to perform (approve, reject, return)
 */
async function handleCertificateRequest(action) {
  const requestNumber = loadRequestNumber();
  await certificationsRequestsPage.navigateToCertificationsRequests()
  await certificationsRequestsPage.clickPullRequestButton(requestNumber)
  await certificationsRequestsPage.clickConfirmPullRequest()
  await certificationsRequestsPage.clickViewRequest(requestNumber)
  if (action === 'approve') {
    await certificationsRequestsPage.clickApproveRequest()
  } else if (action === 'reject') {
    await certificationsRequestsPage.clickRejectRequest()
  } else if (action === 'return') {
    await certificationsRequestsPage.clickReturnToApplicant()
  } else {
    throw new Error(`Invalid action specified: ${action} . Use "approve", "reject", or "return".`);
  }
}

// Function to print the certificate
/**
 * @param {import('@playwright/test').Page} page - The Playwright page object
 */
async function printCertificate(page) {
  const requestNumber = loadRequestNumber();
  await organizationPage.clickOnManageEntityButton();
  await certificationsPage.navigateToCertifications();
  await certificationsPage.searchForCertificate(requestNumber);
  await certificationsPage.selectCertificate();
  await handleDownloadAndSave(page, () => certificationsPage.printCertificate());
  const certificateNumber = await PageUtils.getCertificateNumber(page)
  saveCertificateNumber(certificateNumber)
}
/*==============================================================================================================*/
test.beforeEach(async ({ page }) => {
  CR = new Add_Certificate_Request(page)
  certificationsRequestsPage = new CertificationsRequestsPage(page)
  organizationPage = new OrganizationPage(page)
  certificationsPage = new CertificationsPage(page)
  legalizationRequestsPage = new LegalizationRequestsPage(page)
});


test.describe('End to End Scenario: Applicant creates certificate request => Admin approves the request => Applicant prints the certificate => Applicant submit legalization request', () => {
  test('Applicant Create COO Certificate Request', async ({ page, applicantLogin: _ }) => {
    await submitCertificateRequest(page);
  });

  test('Admin Approve COO Certificate Request', async ({ adminLogin: _ }) => {
    await handleCertificateRequest('approve');
  });

  test('The Applicant Print COO Certificate', async ({ page, applicantLogin: _ }) => {
    await printCertificate(page);
  });

  test('The Applicant Submit Legalization Request', async ({ page, applicantLogin: _ }) => {
    const certificateNumber = loadCertificateNumber()
    await organizationPage.clickOnManageEntityButton();
    await certificationsPage.navigateToCertifications();
    await certificationsPage.searchForCertificate(certificateNumber);
    await certificationsPage.clickAssignLegalizationRequest(certificateNumber);
    await legalizationRequestsPage.uploadAndSubmitLegalizationRequest(PageUtils.getUploadFilePath(FILES.LEGALIZATION_ATTACHMENT), 'Legalization Request Attachment')
    const legalizationRequestNumber = await PageUtils.getLegalizationRequestNumber(page, certificateNumber)
    saveLegalizationRequestNumber(legalizationRequestNumber);
  });
  test('Admin Approve Legalization Request', async ({ adminLogin: _ }) => {
    const legalizationRequestNumber = loadLegalizationRequestNumber()
    await legalizationRequestsPage.navigateToLegalizationRequests()
    await legalizationRequestsPage.clickPullRequestButton(legalizationRequestNumber)
    await legalizationRequestsPage.clickConfirmPullRequest()
    await legalizationRequestsPage.clickViewRequest(legalizationRequestNumber)
    await legalizationRequestsPage.approveLegalizationRequest(PageUtils.getUploadFilePath(FILES.LEGALIZATION_ATTACHMENT))
  });
});

test.describe('End to End Scenario: Applicant creates certificate request => Admin rejects the request', () => {
  test('Applicant Create COO Certificate Request', async ({ page, applicantLogin: _ }) => {
    await submitCertificateRequest(page);
  });

  test('Admin Reject COO Certificate Request', async ({ adminLogin: _ }) => {
    await handleCertificateRequest('reject');
  });

  test('The Applicant verify the COO Certificate Request was rejected', async ({ applicantLogin: _ }) => {
    const requestNumber = loadRequestNumber();
    await CR.clickOnManageEntityButton();
    const status = await CR.getRequestStatus(requestNumber)
    expect(status).toMatch(/Rejeitado|Rejected/)
  });
});

test.describe('End to End Scenario: Applicant creates certificate request => Admin returns the request to the applicant', () => {
  test('Applicant Create COO Certificate Request', async ({ page, applicantLogin: _ }) => {
    await submitCertificateRequest(page);
  })

  test('Admin Return COO Certificate Request To Applicant', async ({ adminLogin: _ }) => {
    await handleCertificateRequest('return');
  });

  test('The Applicant Resubmit the request to admin', async ({ applicantLogin: _ }) => {
    const requestNumber = loadRequestNumber();
    await CR.clickOnManageEntityButton();
    await CR.navigateToIncompleteRequests();
    await CR.clickOnCompleteRequest(requestNumber);
    await CR.resubmitRequest();
  });

  test('Admin Approve COO Certificate Request', async ({ adminLogin: _ }) => {
    await handleCertificateRequest('approve');
  });

  test('The Applicant Print COO Certificate', async ({ page, applicantLogin: _ }) => {
    await printCertificate(page);
  });
});