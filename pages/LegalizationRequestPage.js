export class LegalizationRequestsPage {
    constructor(page) {
        this.page = page;
        this.legalizationAttachmentsInput = page.locator("input[type='file']");
        this.legalizationPriceAttachmentsInput = page.locator("input[type='file']");
        this.attachmentDescriptionInput = page.locator("#applicantNotes");
        this.addAttachmentButton = page.getByRole("button", { name: /Adicionar anexo|Add Attachment/ });
        this.submitRequestButton = page.getByRole("button", { name: /Enviar pedido|Submit Request/ });
        this.legalizationRequestsLink = page.locator("a[href='/certifications/legalizations/requests']"); // Link to navigate to the legalization requests page
        this.allRequestsButton = page.locator('button:has-text("Todas as solicitações"), button:has-text("All requests")'); // Button to view all requests
        this.confirmPullRequestButton = page.getByRole('button', { name: /Confirmar solicitação de devolução|Confirm Pull Request/ });
        this.approveRequestButton = page.getByRole('button', { name: /Aprovar solicitação|Approve Request/ });
        this.rejectRequestButton = page.getByRole('button', { name: /Rejeitar solicitação|Reject Request/ });
        this.returnToApplicantButton = page.getByRole('button', { name: /Devolver ao requerente|Return to the applicant/ });
        this.reasonInput = page.getByPlaceholder(/anotações |Notes/);
        this.sendButton = page.getByRole('button', { name: /Enviar|Send/ });
        this.yesButton = page.getByRole('button', { name: /Sim|Yes/ });
        this.noButton = page.getByRole('button', { name: /Não|No/ });
        this.legalizationAttachmentCheckbox = page.locator("input[type='checkbox']"); // Checkbox for the legalization attachment
        this.legalizationPriceInput = page.locator('#price'); // Input field for the legalization price

    }

    async uploadLegalizationAttachment(filePath) {
        await this.legalizationAttachmentsInput.setInputFiles(filePath); // Set the file input to the specified file path
    }

    async fillAttachmentDescription(description) {
        await this.attachmentDescriptionInput.fill(description); // Fill in the attachment description input
    }
    async clickAddAttachment() {
        await this.addAttachmentButton.click(); // Click the add attachment button
    }

    async clickSubmitRequest() {
        await this.submitRequestButton.click(); // Click the submit request button
    }

    async uploadAndSubmitLegalizationRequest(filePath, description) {
        await this.uploadLegalizationAttachment(filePath); // Upload the legalization attachment
        await this.fillAttachmentDescription(description); // Fill in the attachment description
        await this.clickAddAttachment(); // Click the add attachment button
        await this.clickSubmitRequest(); // Click the submit request button
    }

    async navigateToLegalizationRequests() {
        await this.legalizationRequestsLink.click(); // Click on the legalization requests link
        await new Promise((f) => setTimeout(f, 10000))
        await this.allRequestsButton.click(); // Click on the All Requests button
    }

    async clickPullRequestButton(legalizationNumber) {
        const row = this.page.locator('tr', { has: this.page.locator(`text=${legalizationNumber}`) }); // Locate the row containing the legalization number
        const button = row.locator('button', { hasText: / Pull request | Solicitação de recebimento / }); // Locate the button within the row
        await button.click(); // Click the button
    }

    async clickViewRequest(legalizationNumber) {
        const row = this.page.locator('tr', { has: this.page.locator(`text=${legalizationNumber}`) }); // Locate the row containing the legalization number
        const actionMenuButton = row.locator("i[class='fa-solid fa-ellipsis']"); // Locate the button within the row
        await actionMenuButton.click(); // Click the button
        const viewRequestButton = this.page.locator("div[class='dropdown'] a:nth-child(1)"); // Locate the button within the row
        await viewRequestButton.click(); // Click the button
    }

    async clickApproveRequest() {
        await this.approveRequestButton.click(); // Click the Approve Request button
        await new Promise((f) => setTimeout(f, 20000))
    }

    async clickRejectRequest() {
        await this.rejectRequestButton.click(); // Click the Reject Request button
        await this.reasonInput.fill('Test rejection reason'); // Fill in the rejection reason
        await this.sendButton.click(); // Click the Send button to submit the rejection reason
        await this.yesButton.click(); // Click the Yes button to confirm the rejection
        await new Promise((f) => setTimeout(f, 20000))
    }

    async clickReturnToApplicant() {
        await this.returnToApplicantButton.click(); // Click the Return to Applicant button
        await this.reasonInput.fill('Test return reason'); // Fill in the return reason
        await this.sendButton.click(); // Click the Send button to submit the return reason
        await this.yesButton.click(); // Click the Yes button to confirm the rejection
        await new Promise((f) => setTimeout(f, 20000))
    }

    async clickConfirmPullRequest() {
        await this.confirmPullRequestButton.click(); // Click the Confirm Pull Request button
    }

    async clickLegalizationAttachmentCheckbox() {
        await this.legalizationAttachmentCheckbox.click(); // Click the checkbox for the legalization attachment
    }

    async fillLegalizationPrice(price) {
        await this.legalizationPriceInput.fill(price); // Fill in the legalization price input
    }

    async uploadLegalizationPriceAttachment(filePath) {
        await this.legalizationPriceAttachmentsInput.setInputFiles(filePath); // Set the file input to the specified file path
    }

    async approveLegalizationRequest(filePath) {
        await this.clickLegalizationAttachmentCheckbox(); // Click the checkbox for the legalization attachment
        await this.fillLegalizationPrice('100'); // Fill in the legalization price input
        await this.uploadLegalizationPriceAttachment(filePath); // Upload the legalization price attachment
        await this.clickApproveRequest(); // Click the submit request button
    }

}