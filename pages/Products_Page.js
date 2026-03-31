import { faker } from '@faker-js/faker';
import { FILES } from '../utils/files'
import { PageUtils } from '../utils/pageUtils'
import { expect } from '@playwright/test';
import { ProductTestDataGenerator } from '../utils/ProductTestDataGenerator';


export class ProductPage {

  constructor(page) {
    this.page = page;
    this.addProduct_btn = page.getByRole('button', { name: /Add|Adicionar/ });
    this.isSameProducerCheckbox = page.locator('//label[@class="switch"]');
    //this.isSameProducerCheckbox = page.locator('input[formcontrolname="isSameProducer"]');
    // Producer Locators:
    this.producerDropDown = page.locator("ng-select[formcontrolname='id']")
    this.selectedProducer = page.getByRole('option', { name: "Organization For Test Automation" })
    this.producerNameInput = page.getByPlaceholder(/Producer Name|Nome do Produtor/);
    this.IDNumberInput = page.getByPlaceholder('CNPJ: xx.xxx.xxx/xxxx-xx');
    this.landlineInput = page.locator('#phone');
    this.producerUploaderInput = page.locator("#Uploader_file-upload-120");
    this.producerAddressInput = page.getByPlaceholder(/Producer Address|Endereço do Produtor/);
    /***********************************************************************************************/
    // Product Locators:
    this.productNameLanguagePortugues = page.getByPlaceholder(/Product Name in language Portugues|Nome do produto no idioma Português/);
    this.productNameLanguageEnglish = page.getByPlaceholder(/Product Name in language English|Nome do produto no idioma inglês/);
    this.HSCodeCategoryList = page.locator("ng-select[formcontrolname='hsCodeCategoryId']");
    this.HSCodeCategoryOption = page.getByRole('option', { name: '02' });
    this.hsCodeInput = page.getByPlaceholder(/HS Code|Código HS/);
    this.descriptionLanguagePortugues = page.getByPlaceholder(/Description in language Portugues|Descrição no idioma Português/);
    this.descriptionLanguageEnglish = page.getByPlaceholder(/Description in language English|Descrição no idioma inglês/);
    this.productUploaderInput = page.locator('#Uploader_file-upload-130');
    this.sendButton = page.getByRole('button', { name: /Send|Enviar/ });
    this.cancelButton = page.getByRole('button', { name: /Cancel|Cancelar/ });
    /***********************************************************************************/
    this.actionsMenu = page.locator("i[class='fa-solid fa-ellipsis']").first();
    this.deactivateOption = page.locator("//a[normalize-space()='Deactivate' or normalize-space()='Desativar']");
    this.confirmButton = page.locator("//button[@id='confirm']");
    this.activateOption = page.locator("//a[normalize-space()='Activate' or normalize-space()='Ativar']");
    this.updateOption = page.locator("//a[normalize-space()='Update' or normalize-space()='Atualizar']");
    this.searchTextbox = page.getByPlaceholder(/Search|procura/);
    this.searchButton = page.locator("//button[@type = 'submit']");
    /***********************************************************************************/
    this.portuguesProductName = ProductTestDataGenerator.getPortuguesProductName();
    /*     this.portuguesProductName = faker.lorem.words(3);
        this.englishProductName = faker.lorem.words(3);
        this.portuguesDescription = faker.lorem.sentence();
        this.englishDescription = faker.lorem.sentence();
        this.producerName = faker.company.name();
        this.producerIDNumber = '11.222.333/4444-55';
        this.producerLandline = '5123456789';
        this.producerAddress = faker.location.streetAddress();
        this.hsCode = '1234567890'; */
  }

  async clickAddButton() {
    await this.addProduct_btn.click();
  }

  async checkIsSameProducer() {
    await this.isSameProducerCheckbox.check();
  }

  async selectExistProducer() {
    await this.producerDropDown.click();
    await this.selectedProducer.click();
  }

  async fillProducerName() {
    await this.producerNameInput.fill(ProductTestDataGenerator.getProducerName());
  }

  async fillProducerIDNumber() {
    await this.IDNumberInput.fill(ProductTestDataGenerator.getProducerIDNumber());
  }

  async fillProducerLandline() {
    await this.landlineInput.fill(ProductTestDataGenerator.getProducerLandline());
  }

  async fillProducerAddress() {
    await this.producerAddressInput.fill(ProductTestDataGenerator.getProducerAddress());
  }

  async fillProductPortuguesName() {
    await this.productNameLanguagePortugues.fill(this.portuguesProductName);
  }

  async fillProductEnglishName() {
    await this.productNameLanguageEnglish.fill(ProductTestDataGenerator.getEnglishProductName());
  }

  async selectHSCodeCategoryList() {
    await this.HSCodeCategoryList.click();
    await this.HSCodeCategoryOption.click();
  }

  async fillHsCode() {
    await this.hsCodeInput.fill(ProductTestDataGenerator.getProductHSCode());
  }

  async fillPortuguesDescription() {
    await this.descriptionLanguagePortugues.fill(ProductTestDataGenerator.getPortuguesDescription());
  }

  async fillEnglishDescription() {
    await this.descriptionLanguageEnglish.fill(ProductTestDataGenerator.getEnglishDescription());
  }

  async uploadProducerFileInput(filePath) {
    await this.producerUploaderInput.setInputFiles(filePath);
  }

  async uploadProductFileInput(filePath) {
    await this.productUploaderInput.setInputFiles(filePath);
  }

  async clickSendButton() {
    await this.sendButton.click();
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }

  async clickOnActionsMenu() {
    await this.actionsMenu.click();
  }

  async clickOnDeactivateOption() {
    await this.deactivateOption.click();
  }

  async clickOnActivateOption() {
    await this.activateOption.click();
  }

  async clickOnUpdateOption() {
    await this.updateOption.click();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }

  async clickOnSearchButton() {
    await this.searchButton.click();
  }

  async fillSearchTextboxWithProductName(productName) {
    await this.searchTextbox.fill(productName);
  }

  async addNewProductWithExistProducer() {
    await this.clickAddButton();
    await this.checkIsSameProducer();
    await this.fillProductPortuguesName();
    await this.fillProductEnglishName();
    await this.selectHSCodeCategoryList();
    await this.fillHsCode();
    await this.fillPortuguesDescription();
    await this.fillEnglishDescription();
    await this.uploadProductFileInput(PageUtils.getUploadFilePath(FILES.PRODUCTSUPPORTDOCUMENT_ATTACHMENT));
    await this.clickSendButton();
    await new Promise((f) => setTimeout(f, 5000));
    return this.portuguesProductName;
  }

  async addNewProductWithNewProducer() {
    await this.clickAddButton();
    await this.fillProducerName();
    await this.fillProducerIDNumber();
    await this.fillProducerLandline();
    await this.fillProducerAddress();
    await this.uploadProducerFileInput(PageUtils.getUploadFilePath(FILES.DECLARATIONOFORIGIN_ATTACHMENT));
    await this.fillProductPortuguesName();
    await this.fillProductEnglishName();
    await this.selectHSCodeCategoryList();
    await this.fillHsCode();
    await this.fillPortuguesDescription();
    await this.fillEnglishDescription();
    await this.uploadProductFileInput(PageUtils.getUploadFilePath(FILES.PRODUCTSUPPORTDOCUMENT_ATTACHMENT));
    await this.clickSendButton();
    //await new Promise((f) => setTimeout(f, 10000));
  }

  async deactivateProduct() {
    await this.clickOnActionsMenu();
    await this.clickOnDeactivateOption();
    await this.clickOnConfirmButton();
    await new Promise((f) => setTimeout(f, 5000));
  }

  async activateProduct() {
    await this.clickOnActionsMenu();
    await this.clickOnActivateOption();
    await this.clickOnConfirmButton();
    await new Promise((f) => setTimeout(f, 5000));
  }

  async searchWithProductName(productName) {
    await this.fillSearchTextboxWithProductName(productName);
    await this.clickOnSearchButton();
  }

  async updateProduct() {
    await this.clickOnActionsMenu();
    await this.clickOnUpdateOption();
    await this.descriptionLanguagePortugues.click();
    await this.descriptionLanguagePortugues.clear();
    await this.fillPortuguesDescription();
    await this.descriptionLanguageEnglish.click();
    await this.descriptionLanguageEnglish.clear();
    await this.fillEnglishDescription();
    await this.clickSendButton();
    await this.clickOnConfirmButton();
  }

  async assertSuccessMessage(message = 'Saved Successfully') {
    const successMsg = this.page.locator('.abp-toast-message', { hasText: message });
    await expect(successMsg).toBeVisible({ timeout: 5000 });
  }
}