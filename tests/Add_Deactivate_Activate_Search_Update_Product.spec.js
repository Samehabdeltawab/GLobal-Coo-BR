import { expect } from '@playwright/test';
import { test } from '../fixtures/user-fixtures';
import { ProductPage } from '../pages/Products_Page';
import { OrganizationPage } from '../pages/Organizations_Page';

/**
 * * @type {ProductPage}
 */
let productPage;
/**
 * @type {OrganizationPage}
 * */
let organizationsPage;

let productName;

test.beforeEach(async ({ page }) => {
  organizationsPage = new OrganizationPage(page);
  productPage = new ProductPage(page);
});

test.describe.serial('Product Page Tests', () => {
  test('The applicant add new product with existing producer to his organization', async ({ applicantLogin: _ }) => {
    await organizationsPage.clickOnManageEntityButton();
    await organizationsPage.clickOnProductLink();
    productName = await productPage.addNewProductWithExistProducer();
    await productPage.assertSuccessMessage();
  });

  test('The applicant add new product with new producer to his organization', async ({ applicantLogin: _ }) => {
    await organizationsPage.clickOnManageEntityButton();
    await organizationsPage.clickOnProductLink();
    await productPage.addNewProductWithNewProducer();
    await productPage.assertSuccessMessage();
  });

  test('The applicant search for product and deactivate the created product', async ({ applicantLogin: _ }) => {
    await organizationsPage.clickOnManageEntityButton();
    await organizationsPage.clickOnProductLink();
    await productPage.searchWithProductName(productName);
    await productPage.deactivateProduct();
    await productPage.assertSuccessMessage("Product deactivated successfully");
  });

  test('The applicant search for product and activate the created product', async ({ applicantLogin: _ }) => {
    await organizationsPage.clickOnManageEntityButton();
    await organizationsPage.clickOnProductLink();
    await productPage.searchWithProductName(productName);
    await productPage.activateProduct();
  });

  test('The applicant search for product and update the created product', async ({ applicantLogin: _ }) => {
    await organizationsPage.clickOnManageEntityButton();
    await organizationsPage.clickOnProductLink();
    await productPage.searchWithProductName(productName);
    await productPage.updateProduct();
  });

});