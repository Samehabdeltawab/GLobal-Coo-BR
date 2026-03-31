export class CertificationsPage {
    constructor(page) {
        this.page = page;
        this.certificationsLink = page.locator("a[href='/certifications/list']");
        this.searchInput = page.getByPlaceholder(/procura|Search/);
        this.searchButton = page.getByRole('button', { name: /procura|Search/ });
        this.checkBoxCertificate = page.locator("//input[@class='form-check-input ng-untouched ng-pristine ng-valid']");
        this.printButton = page.getByRole('button', { name: /Imprima o especificado|Print the specified/ });
    }

    async navigateToCertifications() {
        await this.certificationsLink.click(); // Click on the certifications link
    }

    async searchForCertificate(requestNumber) {
        await this.searchInput.fill(requestNumber); // Fill in the search input with the request number
        await this.searchButton.click(); // Click the search button
    }

    async selectCertificate() {
        await this.checkBoxCertificate.first().click(); // Click the checkbox for the certificate
    }

    async printCertificate() {
        await this.printButton.click(); // Click the print button
    }

    async clickAssignLegalizationRequest(certificateNumber) {
        const row = this.page.locator('tr', { has: this.page.locator(`text=${certificateNumber}`) }); // Locate the row containing the certificate number
        const actionMenuButton = row.locator("i[class='fa-solid fa-ellipsis']"); // Locate the button within the row
        await actionMenuButton.click(); // Click the button
        const assignLegalizationButton = this.page.locator("div[class='dropdown'] a:nth-child(2)"); // Locate the button within the row
        await assignLegalizationButton.click(); // Click the button
    }

}