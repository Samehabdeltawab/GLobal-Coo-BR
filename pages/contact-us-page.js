// contact-us-page.js
import { expect } from "@playwright/test";
import path from 'path';
import { solveCaptcha } from '../helper/captcha';

export class Contact_US {
    constructor(page) {
        this.page = page;
        this.contactLink = page.locator("//a[@href='/contact-us']");
        this.orgName = page.locator("//input[@id='organizationName']");
        this.mobNumber = page.locator("//input[@id='phone']");
        this.email = page.locator("//input[@id='requesterEmail']");
        this.subject = page.locator("//input[@id='emailTitle']");
        this.Message = page.locator("//textarea[@formcontrolname='emailBody']");
        this.Name = page.locator("//input[@id='requesterName']");
        this.Idtype = page.locator("//span[@class='ng-arrow-wrapper']");
        this.selectId = page.locator("//span[contains(text(),'CNPJ')]");
        this.Idnumber = page.locator("//input[@formcontrolname='idTypeNumber']");
        this.submit = page.locator("//button[@type='submit']");
        this.captchaInput = page.locator('#captcha-value');
        this.captchaImage = page.locator("//img[@class='img-captcha']");
    }

    async Contact(Name, Mobile, Email, Subject, mesg, reqNam, ID) {
        await this.contactLink.click();
        await this.orgName.fill(Name);
        await this.mobNumber.fill(Mobile);
        await this.email.fill(Email);
        await this.subject.fill(Subject);
        await this.Message.fill(mesg);
        await this.Name.fill(reqNam);
        await this.Idtype.click();
        await this.selectId.click();
        await this.Idnumber.fill(ID);
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
        await this.submit.click();
        //If the page has big time to load you can use the code below
        /*
        await this.captchaImage.waitFor({ state: 'visible', timeout: 5000 });
         const isVisible = await this.captchaImage.isVisible();
        console.log('Captcha image is visible:', isVisible);
        if (!isVisible) {
            throw new Error('CAPTCHA image not visible or not found!');
        }
        try {
            await this.captchaImage.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500);
            const elementHandle = await this.captchaImage.elementHandle();
            if (!elementHandle) throw new Error("Failed to get captcha image element handle");
            await elementHandle.screenshot({ path: captchaPath });
        } catch (error) {
            console.error('Screenshot failed:', error);
            throw error;
        }

        const captchaText = await solveCaptcha(captchaPath);
        console.log('Detected CAPTCHA:', captchaText);

        await this.captchaInput.fill(captchaText);
    }

    async submitform() {
        await this.submit.click();
    }
        */
}
}
