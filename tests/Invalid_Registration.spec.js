import {test, expect} from '@playwright/test'
import { InvalidRegistration } from '../pages/NS_registeration_with_invalid_email_format-dev-page'
import { Regist_With_Invalis_Pass } from '../pages/NS_registeration_with_invalid_password_criteria-dev-page'
import { EmptyFields } from '../pages/NS_registeration_without_entering_any_required_field-dev-page'
import { TermsCondition } from '../pages/NS_registration_without_terms_&_conditions-dev-page'

let Regist;
const FirstName = 'Automation';
const SecondName = 'User';


test.beforeEach(async({page})=> {

    await page.goto('/')
})

function makeString(){
    let outString = '';
      outString = 'automationuser6'+ Math.floor(Math.random() * 9999) + '@test.com';
    return outString;
   
  };

test.describe('Register with Invalid Credentials', ()=>{ 

    test('Register Without Entring Data In Mandatory Fields', async({page})=>{

        Regist = new EmptyFields(page)
        await Regist.goToLoginPage()
        await Regist.Mandatory_Fields_Empty()
    })

    test('Register With Invalid Email', async({page})=>{

        Regist = new InvalidRegistration (page)
        await Regist.goToLoginPage()
        await Regist.registrationPage(FirstName, SecondName, 'test.test','P@ssw0rd', 'P@ssw0rd' )
        await Regist.validateInvalidEmail()
    })


    test('Register With Invalid Password', async({page})=>{

        Regist = new Regist_With_Invalis_Pass (page)
        await Regist.goToLoginPage()
        await Regist.registrationPage(FirstName, SecondName, 'testthiqha2040@test5040.com', 'test', 'test')
        await Regist.validateInvalidPassword()
    })
    

    
    test('Register With Invalid Confirm Password', async({page})=>{

        Regist = new Regist_With_Invalis_Pass (page)
        await Regist.goToLoginPage()
        await Regist.registrationPage(FirstName, SecondName, 'testthiqha2040@test5040.com', 'P@ssw0rd', 'test')
        await Regist.validateInvalidConfirmPass()
    })


    test('Register Without Check Terms And Conditions', async({page})=>{

        Regist = new InvalidRegistration (page)
        await Regist.goToLoginPage()
        await Regist.registrationPage(FirstName, SecondName, makeString(), 'P@ssw0rd', 'P@ssw0rd')
        Regist = new TermsCondition (page)
        await Regist.validateTerms()
    })
    

})