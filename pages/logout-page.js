import { test, expect } from '@playwright/test';

exports.Logout_page = class Logout_page {
    constructor(page) {
        // Logout
        this.profilename = page.locator("(//a[contains(@class, 'dropdown-toggle')])[2]")
        this.logout = page.locator('//a[contains(text(), "Logout")]')
        this.Assertlogout = page.locator('//h1[contains(text(), "COO Advantages")]') 

    }

    async logOut(){

      await this.profilename.click()
      await this.logout.click()
    }

    async Assert_logout(){

       await expect(this.Assertlogout).toHaveText('COO Advantages')

    }



}