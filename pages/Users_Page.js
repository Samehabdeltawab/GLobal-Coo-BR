import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import DatabaseHelper from "../dbConfig/databaseHelper";

export class UsersPage {
  constructor(page) {
    this.page = page;
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.usersSection = page.locator('a[href="/admin/users"]');
    this.addUserButton = page.locator("button", { hasText: /Add User|Adicionar Usuário/ });
    this.firstNameTextbox = page.getByPlaceholder(/First Name|Primeiro Nome/);
    this.lastNameTextbox = page.getByPlaceholder(/Last Name|Último Nome/);
    this.userTypeList = page.locator("ng-select[formcontrolname='branchUserTypeId']");
    this.userTypeEmployee = page.getByRole("option", { name: "Employee" });
    this.userTypeAdmin = page.getByRole("option", { name: "Admin" });
    this.userEmailTextbox = page.getByPlaceholder("Email");
    this.userPhoneTextbox = page.locator("//input[@id='phone']");
    this.submitButton = page.getByRole("button", { name: /Add User|Adicionar Usuário/ });
    this.saveChangesButton = page.getByRole("button", { name: /Save Changes|Salvar Alterações/ });
    this.permissionCheckboxes = {
      selectAll: page.locator("//span[normalize-space()='Select All' or normalize-space()='Selecionar Todos']"),
      organizationRequests: page.locator("//span[normalize-space()='Organization Requests' or normalize-space()='Solicitações da Organização']"),
      editOrganizationRequests: page.locator("//span[normalize-space()='Edit Organization Requests' or normalize-space()='Editar solicitações de organização']"),
      certificateRequests: page.locator("//span[normalize-space()='Certificate Requests' or normalize-space()='Solicitações de Certificados']"),
      legalizationRequests: page.locator("//span[normalize-space()='Legalizations Requests' or normalize-space()='Solicitações de Legalização']"),
      searchAllRequests: page.locator("//span[normalize-space()='Search all requests' or normalize-space()='Pesquisar todas as solicitações']"),
    };
    this.searchTextbox = page.getByPlaceholder(/Search|procura/);
    this.searchButton = page.getByRole("button", { name: /Search|procura/ });
    this.actionsMenu = page.locator("//i[@class='fa-solid fa-ellipsis']");
    this.updateOption = page.locator("//a[normalize-space()='Update' or normalize-space()='Atualizar']");
    this.deactivateOption = page.locator("//a[normalize-space()='Deactivate' or normalize-space()='Desativar']");
    this.activateOption = page.locator("//a[normalize-space()='Activate' or normalize-space()='Ativar']");
    this.resendActivationEmailOption = page.locator("//a[normalize-space()='Resend activation email' or normalize-space()='Reenviar E-mail de Ativação']");
    this.confirmationButton = page.locator("//button[normalize-space()='Send']");
    this.deactivateConfirmButton = page.locator("//button[normalize-space()='Deactivate' or normalize-space()='Desativar']");
    this.activateConfirmButton = page.locator("//button[normalize-space()='Activate' or normalize-space()='Ativar']");
    this.activeState = page.locator("//span[normalize-space()='Active' or normalize-space()='Ativa']");
    this.deactivateState = page.locator("//span[normalize-space()='Inactive' or normalize-space()='Inativa']");
    this.resendActivationEmailSuccessMessage = page.locator("//p[@class='abp-toast-message']");
  }

  setUserData(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  getUserData() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };
  }

  // Dynamic locators for user grid
  firstNameLocator(firstName) {
    return this.page.locator(`//td[normalize-space()='${firstName}']`);
  }
  lastNameLocator(lastName) {
    return this.page.locator(`//td[normalize-space()='${lastName}']`);
  }

  emailLocator(email) {
    return this.page.locator(`//td[normalize-space()='${email}']`);
  }

  userNameLocator(firstName, lastName) {
    return this.page.locator(`//span[normalize-space()='${firstName} ${lastName}']`);
  }

  async getResendEmailSuccessMessage() {
    return await this.resendActivationEmailSuccessMessage.textContent();
  }

  async navigateToUsersPage() {
    await this.usersSection.click();
    await this.addUserButton.waitFor({ state: "visible" });
  }

  async clickOnAddUserButton() {
    await this.addUserButton.click();
  }

  async fillUserForm({ firstName, lastName, email, userType, phoneNumber, permissions = [] }) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.openUserTypeList();
    if (userType === "Admin") {
      await this.userTypeAdmin.click();
    } else {
      await this.userTypeEmployee.click();
    }
    await this.fillPhoneNumber(phoneNumber);
    await this.fillEmail(email);
    for (const perm of permissions) {
      await this.permissionCheckboxes[perm].click();
    }
  }

  async fillFirstName(firstName) {
    await this.firstNameTextbox.fill(firstName);
  }
  async fillLastName(lastName) {
    await this.lastNameTextbox.fill(lastName);
  }
  async fillEmail(email) {
    await this.userEmailTextbox.fill(email);
  }
  async openUserTypeList() {
    await this.userTypeList.click();
  }
  async fillPhoneNumber(phoneNumber) {
    await this.userPhoneTextbox.fill(phoneNumber);
  }

  async clickOnSubmitButton() {
    await this.submitButton.click();
  }

  async clickOnSaveChangesButton() {
    await this.saveChangesButton.click();
  }

  async assertDisplayUserInfoInGrid(firstName, lastName, email) {
    await this.firstNameLocator(firstName).waitFor({ state: "visible" });
    await expect(this.firstNameLocator(firstName)).toBeVisible({ timeout: 10000 });
    await this.lastNameLocator(lastName).waitFor({ state: "visible" });
    await expect(this.lastNameLocator(lastName)).toBeVisible({ timeout: 10000 });
    await this.emailLocator(email).waitFor({ state: "visible" });
    await expect(this.emailLocator(email)).toBeVisible({ timeout: 10000 });
  }

  async assertDisplayUserName(firstName, lastName) {
    await this.userNameLocator(firstName, lastName).waitFor({ state: "visible" });
    await expect(this.userNameLocator(firstName, lastName)).toBeVisible({ timeout: 10000 });
  }

  async fillSearchTextbox(firstName) {
    await this.searchTextbox.fill(firstName);
  }

  async clickOnSearchButton() {
    await this.searchButton.click();
  }

  async searchWithFirstName(firstName) {
    await this.fillSearchTextbox(firstName);
    await this.clickOnSearchButton();
    await new Promise(f => setTimeout(f, 7000));
  }

  async clickOnActionsMenu() {
    await this.actionsMenu.click();
  }

  async clickOnUpdateOption() {
    await this.updateOption.click();
  }

  async clickOnDeactivateOption() {
    await this.deactivateOption.click();
  }

  async clickOnActivateOption() {
    await this.activateOption.click();
  }

  async clickOnResendActivationEmailOption() {
    await this.resendActivationEmailOption.click();
  }

  async clickOnConfirmationButton() {
    await this.confirmationButton.click();
  }

  async clickOnDeactivateConfirmButton() {
    await this.deactivateConfirmButton.click();
  }

  async clickOnActivateConfirmButton() {
    await this.activateConfirmButton.click();
  }

  async assertUserState(expectedState) {
    if (expectedState === "Active") {
      await this.activeState.waitFor({ state: "visible" });
      await expect(this.activeState).toBeVisible({ timeout: 10000 });
    } else {
      await this.deactivateState.waitFor({ state: "visible" });
      await expect(this.deactivateState).toBeVisible({ timeout: 10000 });
    }
  }

  /**
   * Add a user with flexible type and permissions.
   * @param {Object} options
   * @param {string} options.firstName
   * @param {string} options.lastName
   * @param {string} options.email
   * @param {string} [options.userType='Employee']
   * @param {Array<string>} [options.permissions=[]]
   */
  async addCustomUser(firstName, lastName, email, userType = "Employee", permissions = []) {
    const phoneNumber = `519${faker.number.int({ min: 10000000, max: 99999999 })}`;
    await this.clickOnAddUserButton();
    await this.fillUserForm({ firstName, lastName, email, userType, phoneNumber, permissions });
    await this.clickOnSubmitButton();
    await expect(this.resendActivationEmailSuccessMessage)
      .not.toBeVisible({ timeout: 7000 })
      .catch(() => {});
    if (userType === "Admin" || userType === "Employee") {
      await DatabaseHelper.updateUserPassword(email, "AQAAAAIAAYagAAAAEGNIRJ0E098WEYVIzOFbbVQSaWf428ugY+g0TejhGssKbIFKkPhi6dWMN7M4J8Pstg==");
      await DatabaseHelper.close();
    }
  }

  async updateUserDetails({ email, firstName, lastName } = {}) {
    await this.clickOnActionsMenu();
    await this.clickOnUpdateOption();
    if (email) {
      await this.userEmailTextbox.click();
      await this.userEmailTextbox.clear();
      await this.fillEmail(email);
    }
    if (firstName) {
      await this.firstNameTextbox.click();
      await this.firstNameTextbox.clear();
      await this.fillFirstName(firstName);
    }
    if (lastName) {
      await this.lastNameTextbox.click();
      await this.lastNameTextbox.clear();
      await this.fillLastName(lastName);
    }
    await this.clickOnSaveChangesButton();
    await expect(this.resendActivationEmailSuccessMessage)
      .not.toBeVisible({ timeout: 5000 })
      .catch(() => {});
  }

  async resendActivationEmail() {
    await this.clickOnActionsMenu();
    await this.clickOnResendActivationEmailOption();
    await this.clickOnConfirmationButton();
    await expect(this.resendActivationEmailSuccessMessage).toBeVisible({ timeout: 10000 });
  }

  async setUserState(state) {
    await this.clickOnActionsMenu();
    if (state === "Inactive") {
      await this.clickOnDeactivateOption();
      await this.clickOnDeactivateConfirmButton();
    } else if (state === "Active") {
      await this.clickOnActivateOption();
      await this.clickOnActivateConfirmButton();
    } else {
      throw new Error(`Invalid state: ${state}`);
    }
    await this.assertUserState(state);
  }
}
