import { test } from "playwright/test";
import{Payment} from '../pages/Access_Payment'

let pay;

test.beforeEach(async({page})=> {

    await page.goto('https://www.mercadopago.com.br/checkout/v1/payment/redirect/688526cd-7301-483c-a2a4-3022c4e65c57/payment-option-form-v2/?preference-id=1487436216-23929828-a576-4051-b709-69a403d19ffc&router-request-id=89873c17-5ec6-4a7e-9ead-6295ee121db6&p=a9080027f8239fb96a738e42cf0be7a0')

}) 

    test ('Payment', async({page})=> {

        test.slow()
        pay = new Payment (page)
        await pay.Payment_Proccess()
    })



