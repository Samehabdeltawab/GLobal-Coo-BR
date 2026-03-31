/**
 * Page object representing the Edit Organization page
 */
export class EditOrganizationPage {
    OrganizationRequestNo = '';

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.activityTextBox = page.locator("//input[@placeholder='Activity' or @placeholder='Atividade']");
        this.tradeNameTextBox = page.locator("//input[@placeholder='Trade name' or @placeholder='Nome comercial']");
        this.emailTextBox = page.locator("//input[@placeholder='Email' or @placeholder='E-mail']");
        this.submitButton = page.locator("//button[normalize-space()='Submit' or normalize-space()='Enviar']");
        this.editRequestNumber = page.locator("//p[@class='success-message_sub-title']");
    }

    /**
     * Fill the activity text box with the provided value
     * @param {string} activity - The activity to fill
     */
    async fillActivityTextBox(activity = "Updated Activity") {
        try {
            await this.activityTextBox.waitFor({ state: 'visible' });
            await this.activityTextBox.click();
            await this.activityTextBox.clear();
            await this.activityTextBox.fill(activity);
        } catch (error) {
            console.error(`Failed to fill activity: ${error.message}`);
            throw error;
        }
    }

    /**
     * Fill the trade name text box with the provided value
     * @param {string} tradeName - The trade name to fill
     */
    async fillTradeNameTextBox(tradeName = "Updated Trade Name") {
        try {
            await this.tradeNameTextBox.waitFor({ state: 'visible' });
            await this.tradeNameTextBox.click();
            await this.tradeNameTextBox.clear();
            await this.tradeNameTextBox.fill(tradeName);
        } catch (error) {
            console.error(`Failed to fill trade name: ${error.message}`);
            throw error;
        }
    }

    /**
     * Click the submit button and wait for navigation
     */
    async clickOnSubmitButton() {
        try {
            await this.submitButton.waitFor({ state: 'visible' });
            await this.submitButton.click();
        } catch (error) {
            console.error(`Failed to click submit button: ${error.message}`);
            throw error;
        }
    }

    /**
     * Update organization with provided details
     * @param {Object} options
     * @param {string} [options.activity] - The activity
     * @param {string} [options.tradeName] - The trade name
     */
    async updateOrganization({ activity, tradeName } = {}) {
        try {
            await this.fillActivityTextBox(activity);
            await this.fillTradeNameTextBox(tradeName);
            await this.clickOnSubmitButton();

            // Wait for success message instead of arbitrary timeout
            await this.editRequestNumber.waitFor({ state: 'visible' });
        } catch (error) {
            console.error(`Failed to update organization: ${error.message}`);
            throw error;
        }
    }
}