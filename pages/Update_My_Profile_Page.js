import { expect } from "playwright/test";

exports.Profile = 

class Profile{

constructor(page){

    this.page = page
    // Click on profile icon
    this.profileIcone = page.locator("(//a[contains(@class,'dropdown-toggle')])[2]")
    this.editBtn = page.locator("(//a[@role='button'])[2]")
    this.FristName = page.locator("//input[@formcontrolname='firstName']")
    this.SecondName = page.locator("//input[@formcontrolname='lastName']")
    this.saveBtn = page.locator("//button[@type='submit']")
    this.viewpage = page.locator("//button[contains(@class, 'btn-primary')]")
    //Validation messaage for frist name
    this.errorFM = page.locator("//div[@class='invalid-feedback']")
    //Validation message for second name
    this.errorSM = page.locator("(//div[@class='invalid-feedback'])[2]")
} 

async Updat_Invalid(){

    await this.profileIcone.click()
    await this.editBtn.click()
    await this.FristName.click()
    await this.FristName.clear()
    await expect(this.errorFM).toHaveText('This field is required')
    await this.SecondName.click()
    await this.SecondName.clear()
    await expect(this.errorSM).toHaveText('This field is required')
    await this.saveBtn.click()


}


async Update_Profile(fristName, secondName){

    
    await this.profileIcone.click()
    await this.editBtn.click()
    await this.FristName.click()
    await this.FristName.clear()
    await this.FristName.fill(fristName)
    await this.SecondName.click()
    await this.SecondName.clear()
    await this.SecondName.fill(secondName)
    await this.saveBtn.click()
    await expect(this.viewpage).toBeVisible()
 }
}