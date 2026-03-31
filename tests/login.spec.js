import dotenv from 'dotenv';
dotenv.config({ path: './env.env.testing' }); // Load environment variables from .env for testing
import { setSuiteId } from '../utils/test-context';
import { test, expect } from '../fixtures/env-configurations';
import fs from 'fs';
import path from 'path';
import { writeTestStatusToExcelFile } from '../utils/excelhandler';
const testCases = require('../azure-suites/login-suite.json');
const extractTestCaseId = require('../utils/extracttestcaseId'); // Update the path if the file name is different

// Define test suite IDs as an array
const TEST_SUITE_IDS = '506365';
setSuiteId(TEST_SUITE_IDS);

// Export the Test_Case_ID in the Excel file
test.afterEach('Running after each test...', async ({ page }, testInfo) => {
    if (process.env.UPDATE_TEST_PLAN == 'Yes' && process.env.PIPELINE == 'Yes') {
        await writeTestStatusToExcelFile(testInfo, TEST_SUITE_IDS[0]);
    }
});


// Load test data from loginTestData.json
const credentialsPath = path.resolve(__dirname, '../test-data/LoginTestData.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));
const applicant = credentials.applicantUser;

// Open Website URL
test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

// Test Cases
test.describe('Login Page Tests', () => {
    test(`[${testCases["TC-001"].id}] ${testCases["TC-001"].description}`, async ({ login_page }) => {
        await login_page.login(applicant.email, applicant.password, applicant.otp);
        await login_page.Asserttitle();
    });

    // Second method to run read the test cases
    /*
        test(`[${testCases["TC-005"].id}], Verify Access to Login Page`, async ({ login_page }) => {
            await login_page.login(applicant.email, applicant.password, applicant.otp);
            await login_page.Asserttitle();
        });
        */
    // Third method to run read the test cases
    /*
     test('[402938], Verify Access to Login Page', async ({ login_page }) => {
         await login_page.login(applicant.email, applicant.password, applicant.otp);
         await login_page.Asserttitle();
     });
     */

    test(`[${testCases["TC-002"].id}] ${testCases["TC-002"].description}`, async ({ login_page }) => {
        await login_page.login(applicant.email, applicant.invalidPass);
        // Validate Error Message For Invalid Login
        await login_page.errorMessage();
    })

    test(`[${testCases["TC-003"].id}] ${testCases["TC-003"].description}`, async ({ login_page }) => {
        await login_page.login(applicant.invalideEmail, applicant.password);
        // Validate Error Message For Invalid Login
        await login_page.errorMessage();
    });

    test(`[${testCases["TC-004"].id}] ${testCases["TC-004"].description}`, async ({ login_page }) => {
        await login_page.login(applicant.invalideEmail, applicant.invalidPass)
        //Validat Error Message For Invald Login
        await login_page.errorMessage()

    })
});



