import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { Profile } from '../pages/Update_My_Profile_Page';
import { describe } from 'node:test';

let Login;
let userprofile;


test.use({ storageState: { cookies: [], origins: [] } })

function fristName() {
  let outString = '';
  outString = 'Sameh' + Math.floor(Math.random() * 9) + '';
  return outString;

};
test.use({ storageState: { cookies: [], origins: [] } })

function secondName() {
  let outString = '';
  outString = 'Elsayed' + Math.floor(Math.random() * 9) + '';
  return outString;

};

test.beforeEach(async ({ page }) => {

  await page.goto('/')
})

test.describe('Update profile First & Second Name', () => {


  test('Update profile user profile', async ({ page }) => {

    test.slow()
    Login = new LoginPage(page)
    await Login.login('ssayed335@gmail.com', 'P@$$w0rd', '0000')
    userprofile = new Profile(page)
    await userprofile.Update_Profile(fristName(), secondName())
    await page.waitForTimeout(5000)
  })

  test('Update with invalid data', async ({ page }) => {

    test.slow()
    Login = new LoginPage(page)
    await Login.login('ssayed335@gmail.com', 'P@$$w0rd', '0000')
    userprofile = new Profile(page)
    await userprofile.Updat_Invalid()

  })

})


