import AzureDevOps from '../utils/azuredevops';
import { getSuiteId } from '../utils/test-context';
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env.testing' }); // Load environment variables from .env for testing

async function globalTeardown() {
  console.log('Global teardown is running...');
  const azureDevOps = new AzureDevOps();
  const filePath = process.env.TC_STATUS_PATH;
  const sheetName = process.env.TC_STATUS_SHEET;
  const testSuiteId = getSuiteId();
  if (!testSuiteId) {
    throw new Error('❌ testSuiteId is undefined — make sure it is passed correctly from the test script.');
  }
  if (process.env.UPDATE_TEST_PLAN == 'Yes' && process.env.PIPELINE == 'Yes') {
    await azureDevOps.updateTestCaseStatus(filePath, sheetName, testSuiteId);
  } else {

  }
  console.log('Global setup is starting...');
}
module.exports = globalTeardown;