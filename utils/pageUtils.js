import path from 'path';

export class PageUtils {
    constructor(page) {
        this.page = page;
    }
    static async getRequestNumber(page) {
        const requestNumber = await page.locator('tbody').locator('tr').locator('td').first().textContent();
        return requestNumber;
    }

    static async getCertificateNumber(page) {
        const certificateNumber = await page.locator('tbody').locator('tr').locator('td').nth(1).textContent();
        return certificateNumber;
    }

    static async getLegalizationRequestNumber(page, certificateNumber) {
        const row = page.locator('tr', { has: page.locator(`text=${certificateNumber}`) });
        const legalizationNumber = await row.locator('td').first().textContent();
        return legalizationNumber;
    }

    static getUploadFilePath(fileName) {
        return path.resolve('uploads', fileName);
    }

    static async getUpdateOrganizationRequestNumber(page) {
        try {
            const editRequestNumber = page.locator("//p[@class='success-message_sub-title']");
            await editRequestNumber.waitFor({ state: 'visible' });
            const textContent = await editRequestNumber.textContent();

            if (!textContent) {
                throw new Error('Request number text content is empty');
            }

            const regex = /(?:Request number|Número da solicitação):\s*(EO\d{4}-\d{6})/;
            const requestNumberMatch = textContent.match(regex);

            if (!requestNumberMatch) {
                throw new Error('Request number pattern not found in text content');
            }

            const OrganizationRequestNo = requestNumberMatch[1];
            console.log(`Organization request number: ${OrganizationRequestNo}`);
            return OrganizationRequestNo;
        } catch (error) {
            console.error(`Failed to get organization request number: ${error.message}`);
            throw error;
        }
    }
}





