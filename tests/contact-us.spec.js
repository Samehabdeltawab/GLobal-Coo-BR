import { test } from '../fixtures/env-configurations';

// Read login data from JSON file
const fs = require('fs')
const path = require('path');
const contactPath = path.resolve(__dirname, '../test-data/Contact-Us-Test-Data.json');
const TestData = JSON.parse(fs.readFileSync(contactPath, 'utf-8'));
const contact = TestData.contactData

// Generate random data for the contact form
function Name(){
    let outString = '';
      outString = contact.orgName+ Math.floor(Math.random() * 9) + '';
    return outString;
   
  };
  function Mobile(){
      let outString = '';
      let randomNumber = '';
        //outString = '312'+ (Math.floor(Math.random() * 899) + 100) + '5000010';
        randomNumber = contact.mobileNumber + Math.floor(1000000 + Math.random() * 9000000);
      return randomNumber;
     
    };
    
  function Email(){
    let outString = '';
      outString = contact.email+ Math.floor(Math.random() * 9) + '@gmail.com';
    return outString;
   
  };
  
  function Subject(){
    let outString = '';
      outString = contact.subject + Math.floor(Math.random() * 9) + '';
    return outString;
   
  };

  function mesg(){
    let outString = '';
      outString = contact.message + Math.floor(Math.random() * 9) + '';
    return outString;
   
  };

  function reqName(){
    let outString = '';
      outString = contact.name + Math.floor(Math.random() * 9) + '';
    return outString;
   
  };
  
  function ID(){
    let outString = '';
      outString = contact.id + (Math.floor(Math.random() * 899) + 100) + contact.Id;
    return outString;   
  };

    test.beforeEach(async({page})=> {

      await page.goto('/')
  })
    test.describe('Contact Us', ()=>{


        test('Send Message from Contact Us', async({page, contact_us})=>{

            test.slow()
            await contact_us.Contact(Name(), Mobile(), Email(), Subject(), mesg(), reqName(), ID())
            //await page.waitForTimeout(10000)
            await contact_us.captcha_Handle()
            //await contact_us.submitform()
            //await page.waitForTimeout(10000)
        })
    })