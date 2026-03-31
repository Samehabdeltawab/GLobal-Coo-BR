const { request, expect } = require('@playwright/test');
import { readExcelFile } from '../utils/excelhandler';
import dotenv from 'dotenv';
dotenv.config({ path: './env.env.testing' }); // Load environment variables from .env for testing
import fetch from 'node-fetch'; // Use ES Module import for node-fetch

const credentials = Buffer.from(`${process.env.AZURE_DEVOPS_USER}:${process.env.AZURE_DEVOPS_PASS}`).toString('base64');

class AzureDevOps {
    constructor() {
        this.apiRequest = null;
    }

    async initialize() {
        this.apiRequest = await request.newContext();
    }

    async updateTestCaseStatus(filePath, sheetName, testSuiteId) {

        try {

            if (!testSuiteId) {
                throw new Error('❌ testSuiteId is undefined — make sure it is passed correctly from the test script.');
            }
            if (!this.apiRequest) {
                await this.initialize();
            }

            const data = await readExcelFile(filePath, sheetName);

            if (data.length > 0) {
                console.log('First row column headers:', Object.keys(data[0]));
            } else {
                console.error('No data found.');
                return;
            }

            const testPlanId = process.env.TEST_PLAN_ID;
            //const testSuiteId = process.env.TEST_SUITE_ID;

            for (let i = 0; i < data.length; i++) {
                let row = data[i];
                const testCaseId = row['Test_Case_Id'];
                const testCaseStatus = row['Test_Case_Status'];
                const testPointId = await this.getTestPoint(testPlanId, testSuiteId, testCaseId);
                await this.updateTestPointStatus(testPlanId, testSuiteId, testPointId, testCaseStatus.charAt(0).toUpperCase() + testCaseStatus.slice(1));
            }
            console.log(`Completed updating test case status for : ${data.length}`);
        } catch (error) {
            console.error('Error in updating test case status:', error);
            throw error; // Rethrow to indicate failure
        }
    }


    async getTestPoint(testPlanId, testSuiteId, testCaseId) {
        if (!this.apiRequest) {
            await this.initialize();
        }
        const values = [testPlanId, testSuiteId, testCaseId];
        const URL = process.env.TEST_PLAN_GET_API.replace(/{(\d+)}/g, (match, number) => values[number] || match);
        console.log(`Fetching test point from: ${URL}`);

        try {
            let getTestPointResponse = await this.apiRequest.get(URL, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${credentials}`
                },
            });


            // Ensure response is valid JSON before parsing
            const responseBody = await getTestPointResponse.text();
            if (!responseBody) {
                throw new Error("Empty response from API");
            }

            const jsonResponse = JSON.parse(responseBody); // Parse manually after checking
            expect(getTestPointResponse.ok()).toBeTruthy();
            expect(getTestPointResponse.status()).toBe(200);

            if (!jsonResponse.value || jsonResponse.value.length === 0) {
                throw new Error("No test point data found in API response.");
            }

            return jsonResponse.value[0].id;
        } catch (error) {
            console.error("Error in getTestPoint:", error);
            throw error;
        }
    }

    async updateTestPointStatus(testPlanId, testSuiteId, testPointId, testCaseStatus) {
        if (!this.apiRequest) {
            await this.initialize();
        }
        const values = [testPlanId, testSuiteId, testPointId];
        const URL = process.env.TEST_PLAN_PATCH_API.replace(/{(\d+)}/g, (match, number) => values[number] || match);
        const patchAPIResponse = await this.apiRequest.patch(URL, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Basic ${credentials}`
            },
            data: {
                "outcome": testCaseStatus,
            },
        });

        expect(patchAPIResponse.ok()).toBeTruthy();
        expect(patchAPIResponse.status()).toBe(200);
    }

}

export default AzureDevOps;