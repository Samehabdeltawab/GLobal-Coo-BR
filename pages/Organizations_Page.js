export class OrganizationPage {

    constructor(page) {
        this.page = page;
        this.manageEntity_btn = page.locator(
            "//h2[@class='organization-card_titleSection-title' and @title='Organization For Test Automation']/ancestor::div[contains(@class,'organization-card')]//button[contains(@class,'organization-card_actions-enter-not-current')]"
        );
        this.productsLink = page.locator("//a[@href='/management/products/list']");
        this.logoutList = page.locator("//a[@class='dropdown-toggle nav-link mt-3 chevron-toggler']");
        this.logoutOption = page.locator("//a[normalize-space()='Logout' or normalize-space()='Sair']");
        this.viewDetailsButton = page.locator(
            "//h2[@class='organization-card_titleSection-title' and @title='Organization For Test Automation']/ancestor::div[contains(@class,'organization-card')]//button[contains(@class,'organization-card_actions-view')]"
        );
        this.returnedOrganizationButton = page.locator('button:has-text("Organizações devolvidas"), button:has-text("Returned organizations")');
        this.correctDataButton = page.getByRole('button', { name: /Dados corretos|Correct data/ });
    }

    async clickOnManageEntityButton() {
        await this.manageEntity_btn.click();
    }

    async clickOnVeiwDetailsButton() {
        await this.viewDetailsButton.click();
    }

    async clickOnProductLink() {
        await this.productsLink.click();
        await new Promise((f) => setTimeout(f, 5000));
    }

    async clickOnReturnedOrganizationButton() {
        // await this.returnedOrganizationButton.waitFor({ state: 'visible' });
        await this.returnedOrganizationButton.click();
    }

    async clickOnCorrectDataButton() {
        // await this.correctDataButton.waitFor({ state: 'visible' });
        await this.correctDataButton.click();
    }

    async clickOnLogout() {
        await this.logoutList.click();
        await this.logoutOption.click();
    }
}