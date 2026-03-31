import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { Logout_page } from '../pages/logout-page';
import { AddOrganization } from '../pages/Add_Organization_Page';
import { ApproveOrganization } from '../pages/Approve_Organization_Request_Page';
import { Reject_Organization_Request } from '../pages/Reject_Organization_page';
import { Retrun_Org_Request } from '../pages/Return_Organization_Request_Page.js';
import { OrganizationStatus } from '../pages/Check_Organization_Status_Page.js';
import { Organization_Details } from '../pages/Organization_Details_page.js';
import { Contact_US } from '../pages/contact-us-page.js'
import { CertificateInquiry } from '../pages/certificate-page.js';
export { expect } from '@playwright/test';

//Read Login Test Data From Json File
const fs = require('fs');
const path = require('path');
const credentialsPath = path.resolve(__dirname, '../test-data/LoginTestData.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));
const applicant = credentials.applicantUser
const admin = credentials.adminUser;


exports.test = base.test.extend({
  applicantLogin: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(applicant.email, applicant.password, applicant.otp);
    await use();
  },

  adminLogin: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(admin.emailUser, admin.pass, admin.otp);
    await use();
  },

  login_page: async ({ page }, use) => {

    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  logout_Page: async ({ page }, use) => {

    await use(new Logout_page(page));
  },

  add_Org: async ({ page }, use) => {

    await use(new AddOrganization(page));
  },

  approve_Org_Request: async ({ page }, use) => {

    await use(new ApproveOrganization(page));

  },

  reject_Org_Request: async ({ page }, use) => {

    await use(new Reject_Organization_Request(page));
  },

  return_Org_Request: async ({ page }, use) => {

    await use(new Retrun_Org_Request(page));
  },

  org_Status: async ({ page }, use) => {

    await use(new OrganizationStatus(page));
  },

  org_Details: async ({ page }, use) => {

    await use(new Organization_Details(page));
  },
  contact_us: async ({ page }, use) => {

    await use(new Contact_US(page));
  },

  cr_Inquiry: async ({ page }, use) => {

    await use(new CertificateInquiry(page));
  }
});