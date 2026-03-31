import { expect } from '@playwright/test';
export class CertificationsRequestsPage {
    constructor(page) {
        this.page = page;
        this.certificationsRequestsLink = page.locator("a[href='/certifications/requests']");
        this.allRequestsButton = page.locator('button:has-text("Todas as solicitações"), button:has-text("All requests")');
        this.confirmPullRequestButton = page.getByRole('button', { name: /Confirmar solicitação de devolução|Confirm Pull Request/ });
        this.approveRequestButton = page.getByRole('button', { name: /prosseguir a solicitação|Approve Request/ });
        this.rejectRequestButton = page.getByRole('button', { name: /Rejeitar solicitação|Reject Request/ });
        this.returnToApplicantButton = page.getByRole('button', { name: /Devolver ao requerente|Return to the applicant/ });
        this.reasonInput = page.getByPlaceholder(/anotações |Notes/);
        this.sendButton = page.getByRole('button', { name: /Enviar|Send/ });
        this.yesButton = page.getByRole('button', { name: /Sim|Yes/ });
        this.noButton = page.getByRole('button', { name: /Não|No/ });
    }

    async navigateToCertificationsRequests() {
        await this.certificationsRequestsLink.click(); // Click on the certifications requests link
        await new Promise((f) => setTimeout(f, 10000))
        await this.allRequestsButton.click(); // Click on the All Requests button
    }

    async clickPullRequestButton(requestNumber) {
        const row = this.page.locator('tr', { has: this.page.locator(`text=${requestNumber}`) }); // Locate the row containing the request number
        await row.waitFor(); // Wait for the row to be present in the DOM
        await expect(row).toBeVisible({ timeout: 5000 }); // Wait for the row to be visible
        const button = row.locator('button', { hasText: / Pull request | Solicitação de recebimento / }); // Locate the button within the row
        await button.click(); // Click the button
    }

    async clickConfirmPullRequest() {
        await this.confirmPullRequestButton.click(); // Click the Confirm Pull Request button
    }

    async clickViewRequest(requestNumber) {
        const row = this.page.locator('tr', { has: this.page.locator(`text=${requestNumber}`) }); // Locate the row containing the request number
        await row.waitFor(); // Wait for the row to be present in the DOM
        await expect(row).toBeVisible({ timeout: 5000 }); // Wait for the row to be visible
        const actionMenuButton = row.locator("i[class='fa-solid fa-ellipsis']"); // Locate the button within the row
        await actionMenuButton.click(); // Click the button
        const viewRequestButton = this.page.locator("div[class='dropdown'] a:nth-child(1)"); // Locate the button within the row
        await viewRequestButton.click(); // Click the button
    }

    async clickApproveRequest() {
        await this.approveRequestButton.click(); // Click the Approve Request button
        await this.yesButton.click(); // Click the Yes button to confirm the approval
        await new Promise((f) => setTimeout(f, 20000))
    }

    async handleRequestWithReason(button, reason) {
        await expect(button).toBeVisible({ timeout: 5000 });
        await button.click();
        await expect(this.reasonInput).toBeVisible({ timeout: 5000 });
        await this.reasonInput.fill(reason);
        await expect(this.sendButton).toBeVisible({ timeout: 5000 });
        await this.sendButton.click();
        await expect(this.yesButton).toBeVisible({ timeout: 5000 });
        await this.yesButton.click();
        //await expect(this.page.locator('.success-message')).toBeVisible({ timeout: 20000 });
    }

    async clickRejectRequest() {
        await this.handleRequestWithReason(this.rejectRequestButton, 'Test rejection reason');
    }

    async clickReturnToApplicant() {
        await this.handleRequestWithReason(this.returnToApplicantButton, 'Test return reason');
    }
}