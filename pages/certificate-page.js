import { test, expect } from '@playwright/test';
import path from 'path';
import { solveCaptcha } from '../helper/captcha';
let CertificateNum = '';
let requestdate = '';

exports.CertificateInquiry = class CertificateInquiry {
  constructor(page) {
    this.page = page;

    // Access organization
    this.manageEntity = page.getByRole('button', { name: 'Manage entity' }).nth(0);
    // Access Certificate page
    this.certificatePage = page.getByRole('link', { name: 'Certifications' }).nth(1);
    // Store certificate numbers
    this.certificatesNu = page.locator('td:nth-child(2)');
    // Store request date
    this.requestdate = page.locator('td:nth-child(6)');
    // Access certificate inquiry page
    this.inquiryLink = page.locator('a[href="/certificate-enquiry"]');
    this.crfTxt = page.locator("#certficaiteNumber");
    this.dateTxt = page.locator("[name='dpDate']");
    this.captchaInput = page.locator('#captcha-value');
    this.captchaImage = page.locator("//img[@class='img-captcha']");
    this.submitBtn = page.locator("[type='submit']");
    // Change the language to English 
    this.language = page.locator("//button[contains(@class,'dropdown-toggle')]");
    this.selectLanguage = page.locator("(//span[contains(@class,'dropdown-item')])[2]");
    //Assert the ceriticate number
    this.assertCertificateNumber = page.locator('.certificate-details__header--value').nth(0);

  }

  // Get Certificate number and request date
  async getCertificateDetails() {
    await this.manageEntity.click();
    await this.certificatePage.click();

    const requestNumberElement = this.certificatesNu.first();
    const dateElement = this.requestdate.first();

    if (requestNumberElement) {
      const textContent = await requestNumberElement.textContent();
      CertificateNum = textContent?.trim() || 'No certificate found';
    }
    console.log('Certificate Number:', CertificateNum);

    if (dateElement) {
      const dateContent = await dateElement.textContent();
      const rawDate = dateContent?.trim() || 'No date found';

      // Convert "Jul 10, 2024" to "2024-07-10" using local time
      const parsedDate = new Date(rawDate);
      if (!isNaN(parsedDate)) {
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // 0-indexed
        const day = String(parsedDate.getDate()).padStart(2, '0');
        requestdate = `${year}-${month}-${day}`;
      } else {
        throw new Error(`Invalid date format received: ${rawDate}`);
      }
    }

    console.log('Request Date (ISO):', requestdate);
    return { CertificateNum, requestdate };
  }

  async remove_readonlyAttribute() {
    await this.language.click();
    await this.selectLanguage.click();
    await this.inquiryLink.click();
    const elementHandle = await this.dateTxt.elementHandle();
    await this.page.evaluate((el) => {
      el.removeAttribute('readonly');
    }, elementHandle);
  }

  async cer_Inqiry() {
    await this.crfTxt.fill(CertificateNum);
    await this.dateTxt.fill(requestdate);
  }

  async captcha_Handle() {
    const captchaPath = path.resolve(__dirname, '../tmp/captcha.png');
    await this.captchaImage.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
    const elementHandle = await this.captchaImage.elementHandle();
    await elementHandle.screenshot({ path: captchaPath });
    const captchaText = await solveCaptcha(captchaPath);
    console.log('Detected CAPTCHA:', captchaText);
    await this.captchaInput.fill(captchaText);
    await this.submitBtn.click();
  }

  async assertCertificateNum(CertificateNum) {
    const actualText = await this.assertCertificateNumber.textContent();
    expect(actualText?.trim()).toBe(CertificateNum);
    //print the actual certificate number 
    console.log('Actual certificate number text:', actualText?.trim());  
  }
}