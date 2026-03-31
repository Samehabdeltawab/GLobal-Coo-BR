export class OrganizationEditRequestsPage {

    constructor(page) {
        this.page = page;
        this.registrationEditRequestsSection = page.locator("//span[normalize-space()='Registration Edit requests' or normalize-space()='Solicitudes de modificación de registro']");
        this.allRequestsTab = page.locator("//button[@id='ngb-nav-1']");
        this.confirmPullRequestButton = page.locator("//button[normalize-space()='Confirm Pull Request' or normalize-space()='Confirmar solicitação de devolução']");
        this.approveRequestButton = page.locator("//button[normalize-space()='Approve Request' or normalize-space()='prosseguir a solicitação']");
        this.rejectRequestButton = page.locator("//button[normalize-space()='Reject Request' or normalize-space()='Rejeitar solicitação']");
        this.returnToApplicantButton = page.locator("//button[normalize-space()='Return to the applicant' or normalize-space()='Solicitação de liberação']");
        this.reasonInput = page.getByPlaceholder(/anotações|Notes/);
        this.sendButton = page.getByRole('button', { name: /Enviar|Send/ });
        this.yesButton = page.getByRole('button', { name: /Sim|Yes/ });
        this.noButton = page.getByRole('button', { name: /Não|No/ });
    }

    async navigateToAllRequestsTab() {
        await this.allRequestsTab.waitFor({ state: 'visible' });
        await this.allRequestsTab.click();
    }

    async navigateToRegistrationEditRequestsPage() {
        await this.registrationEditRequestsSection.waitFor({ state: 'visible' });
        await this.registrationEditRequestsSection.click();
        await this.navigateToAllRequestsTab();
    }

    async clickPullRequestButton(reqId) {
        const row = this.page.locator('tr', { has: this.page.locator(`text=${reqId}`) });
        await row.waitFor({ state: 'visible', timeout: 10000 });
        const button = row.locator('button', { hasText: /Pull request|Solicitação de recebimento/ });
        if (await button.count() === 0) {
            throw new Error(`Pull request button not found for request ID: ${reqId}`);
        }
        await button.click();
        await this.confirmPullRequestButton.waitFor({ state: 'visible' });
        await this.confirmPullRequestButton.click();
    }

    async clickActionsMenu(reqId) {
        const row = this.page.locator('tr', { has: this.page.locator(`text=${reqId}`) });
        await row.waitFor({ state: 'visible' });
        const actionMenuButton = row.locator("i.fa-solid.fa-ellipsis");
        if (await actionMenuButton.count() === 0) {
            throw new Error(`Actions menu not found for request ID: ${reqId}`);
        }
        await actionMenuButton.click();
    }

    async clickViewRequest(reqId) {
        await this.clickActionsMenu(reqId);
        const viewRequestButton = this.page.locator("div[class='dropdown'] a:nth-child(1)");
        await viewRequestButton.click();
    }

    async clickApprovedRequestButton() {
        await this.approveRequestButton.waitFor({ state: 'visible' });
        await this.approveRequestButton.click();
        await this.yesButton.waitFor({ state: 'visible' });
        await this.yesButton.click();
    }

    async handleRequestWithReason(button, reason) {
        await button.waitFor({ state: 'visible' });
        await button.click();
        await this.reasonInput.waitFor({ state: 'visible' });
        await this.reasonInput.fill(reason);
        await this.sendButton.waitFor({ state: 'visible' });
        await this.sendButton.click();
        await this.yesButton.waitFor({ state: 'visible' });
        await this.yesButton.click();
    }

    async clickRejectRequestButton() {
        await this.handleRequestWithReason(this.rejectRequestButton, 'Test rejection reason');
    }

    async clickReturnToApplicantButton() {
        await this.handleRequestWithReason(this.returnToApplicantButton, 'Test return reason');
    }

    async approveEditOrganizationRequest(reqId) {
        await this.clickPullRequestButton(reqId);
        await this.clickActionsMenu(reqId);
        await this.clickApprovedRequestButton();
    }
}