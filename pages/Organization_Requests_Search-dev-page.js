"use strict";

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({headless: false});
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://global-coo-frontend.aks.thiqah.sa");
  await page.click(".hide-in-mobile");
  await page.click("#LoginInput_UserNameOrEmailAddress");
  await page.type("#LoginInput_UserNameOrEmailAddress", 'superadmin@coo.sa');
  await page.click("#LoginInput_Password");
  await page.type("#LoginInput_Password", 'P@ssw0rd');
  await page.click("#btnSubmit");
  await page.click("#OtpValue");
  await page.type("#OtpValue", '0000');
  await page.click("#verifyOtp");
  await page.click("#ngb-nav-1");
  await page.click(".btn-filter");
  await page.click("[autocomplete='ac4193fe7607']");
  await page.click("#ac4193fe7607-0");
  await page.click("[type='submit']");
  await browser.close();
})();
