import {test, expect} from '@playwright/test'

exports.Release_Request = class Release_Request {


  constructor(page){

    // Release the Request
    this.Releasebtn = page.locator('//a[contains(text(), "Release request")]')
    //Confirm Button
    this.confirmBtn = page.locator('//button[contains(text(), "Confirm Return Request")]')
    //Popup title
    this.popupTitle = page.locator("//h1[@class='confirmation-popup_title']")
    //Popup Alert message
    this.alertMess = page.locator("//p[@class='confirmation-popup_message']")
    //Pull Request
    this.PullBtn = page.locator("//a[contains(@class, 'btn-accept')]") 
  }

  async Release_request(){

    await this.Releasebtn.click()
  
  }

  async Assert_Pupup_title_Message(){

    await expect(this.popupTitle).toHaveText('Confirm Return Request')
    await expect(this.alertMess).toHaveText('Are you sure you want to return request?')
  
  }

  async Confirn_Return(){

    await this.confirmBtn.click()
  }


  async Assert_Pull_Request_Displayed(){

    const PullButton = await this.PullBtn
    const button = await PullButton.textContent()
    console.log(button)
    await expect(PullButton).toBeVisible()
    
  }
}