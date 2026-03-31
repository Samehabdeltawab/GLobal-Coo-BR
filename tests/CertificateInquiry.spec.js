import dotenv from 'dotenv';
dotenv.config({ path: './env.env.testing' }); // Load environment variables from .env for testing
import { test, expect } from '../fixtures/env-configurations';

let CertificateNum = '';
let requestdate = '';

// Load test data from loginTestData.json
import fs from 'fs';
import path from 'path';
const credentialsPath = path.resolve(__dirname, '../test-data/LoginTestData.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));
const applicant = credentials.applicantUser;


// Open Website URL
test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

// Call Test Cases
test.describe('check Certificate Inquiry', () => {

    test('Get certificate number and date', async ({ applicantLogin, logout_Page, cr_Inquiry }) => {
        // await login_page.login(applicant.email, applicant.password, applicant.otp);
        const result = await cr_Inquiry.getCertificateDetails();
        CertificateNum = result.CertificateNum;
        requestdate = result.requestdate;

        await logout_Page.logOut();
    });

    test('Access certificates inquiry page and validate certificate number', async ({ cr_Inquiry }) => {
        if (!CertificateNum || !requestdate) {
            throw new Error('CertificateNum or requestdate is not set. Make sure to run the previous test first.');
        }

        await cr_Inquiry.remove_readonlyAttribute();
        await cr_Inquiry.cer_Inqiry(CertificateNum, requestdate);
        await cr_Inquiry.captcha_Handle();
        await cr_Inquiry.assertCertificateNum(CertificateNum);
    });
});