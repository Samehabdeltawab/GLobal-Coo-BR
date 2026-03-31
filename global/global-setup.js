const XLSX = require('xlsx');
const fs = require('fs').promises;
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env.testing' }); // Load environment variables from .env for testing
//const handleTestFailure = require('./testFailureHandler');


async function globalSetup() {
    const filePath = process.env.TC_STATUS_PATH
    
    if (process.env.UPDATE_TEST_PLAN == 'Yes' && process.env.PIPELINE == 'Yes') {
        try {
            try {
                await fs.access(filePath);
                await deleteFile(filePath);
            } catch (err) {
                if (err.code === 'ENOENT') {
                    console.log(`File does not exist at ${filePath}`);
                } else {
                    throw err;
                }
            }

            await createTCStatusFile(filePath);
        } catch (err) {
            console.error('An error occurred:', err);
        }
    } else {

    }
}

async function createTCStatusFile(filePath) {
    const workbook = XLSX.utils.book_new();
    const headers = ['Test_Case_Id', 'Test_Case_Status', 'TC_Outcome_Updated'];
    const worksheet = XLSX.utils.aoa_to_sheet([headers]);
    XLSX.utils.book_append_sheet(workbook, worksheet, process.env.TC_STATUS_SHEET);
    XLSX.writeFile(workbook, filePath);
    console.log(`Generated new test case status file : ${filePath}`);
}

async function deleteFile(filePath) {
    try {
        await fs.unlink(filePath);
        console.log(`File successfully deleted at ${filePath}`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log(`File does not exist at ${filePath}`);
        } else {
            console.error(`Error deleting file at ${filePath}:`, err);
        }
    }
    console.log('Global setup is starting...');
}
export default globalSetup;