import { test, expect } from '@playwright/test';
import { RegisterDevPage } from '../pages/register-dev-page.js';

let registerPage;
let firstname = 'Automation';
let lastname = 'User';
// let email = 'automationuser@test.com';
let password = 'P@ssw0rd';

// this line to not use the saved logged in state
test.use({ storageState: { cookies: [], origins: [] } })

function makeString(){
    let outString = '';
      outString = 'automationuser6'+ Math.floor(Math.random() * 9999) + '@test.com';
    return outString;
   
  };

// The test suite
test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('Register', () => {
    // The test case
    test('should register successfully', async ({ page }) => {
        registerPage = new RegisterDevPage(page);
        await registerPage.register(firstname, lastname, makeString(), password);
        await registerPage.assertconfirmregister();
    });
});
