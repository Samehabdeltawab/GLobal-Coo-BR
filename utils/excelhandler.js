const {  expect } = require('@playwright/test');
const xlsx = require('xlsx');
import {AzureDevOps} from '../utils/azuredevops';
const dotenv = require('dotenv');
dotenv.config({ path: './env.env.testing' }); // Load environment variables from .env for testing

export async function getExcelDataAsKeyValue(filePath, sheet) {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheet];
    const data = xlsx.utils.sheet_to_json(worksheet);

    if (data.length === 0) {
        console.error('Excel file is empty.');
        return;
    }

    const keyValuePairs = [];
    for (const row of data) {
        const keyValuePair = {};
        for (const key in row) {
            keyValuePair[key] = row[key];
        }
        keyValuePairs.push(keyValuePair);
    }
    return keyValuePairs;
}

export async function printAllRowsData(filePath, sheet) {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheet];
    const data = xlsx.utils.sheet_to_json(worksheet);

    expect(data.length).toBeGreaterThan(0);
    for (const row of data) {
        for (const key in row) {
            console.log(`${key} : ` + row[key]);
        }
    }
}

export async function readExcelFile(filePath, sheetName) {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    const headers = data[0];
    const rows = data.slice(1).map(row => {
        const rowData = {};
        headers.forEach((header, index) => {
            rowData[header] = row[index];
        });
        return rowData;
    });
    return rows;
}
    export async function writeTestStatusToExcelFile(testInfo, testSuiteId) {
        if (process.env.UPDATE_TEST_PLAN === 'Yes' && process.env.PIPELINE === 'Yes') {
            const matches = testInfo.title.match(/\[(.*?)\]/);
    
            if (matches) {
                const numbersPart = matches[1];
                const numbersArray = numbersPart.split(',').map(num => parseInt(num.trim(), 10));
    
                numbersArray.forEach(number => {
                    try {
                        const workbook = xlsx.readFile(process.env.TC_STATUS_PATH);
                        const worksheet = workbook.Sheets[process.env.TC_STATUS_SHEET];
    
                        if (!worksheet) {
                            console.error(`Sheet "${process.env.TC_STATUS_SHEET}" not found in the Excel file.`);
                            return;
                        }
    
                        const newRowData = [number, testInfo.status, testSuiteId];
                        const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
                        data.push(newRowData);
    
                        const updatedWorksheet = xlsx.utils.aoa_to_sheet(data);
                        workbook.Sheets[process.env.TC_STATUS_SHEET] = updatedWorksheet;
                        xlsx.writeFile(workbook, process.env.TC_STATUS_PATH);
                    } catch (error) {
                        console.error('Error writing to Excel file:', error);
                    }
                });
            } else {
                console.log('No test case ID found in title...');
            }
        }
    }