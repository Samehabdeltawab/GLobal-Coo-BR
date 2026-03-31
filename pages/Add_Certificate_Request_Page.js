
import { expect } from '@playwright/test';
import { getTestDataForCertificate } from '../utils/Constants'
import { CertificateTestDataGenerator } from '../utils/CertificateTestDataGenerator.js';

exports.Add_Certificate_Request =

    class Add_Certificate_Request {
        constructor(page) {

            this.page = page
            // Certification 
            this.manageEntityBtn = page.locator(
                "//h2[@class='organization-card_titleSection-title' and @title='Organization For Test Automation']/ancestor::div[contains(@class,'organization-card')]//button[contains(@class,'organization-card_actions-enter-not-current')]"
            )
            this.certificateRequestsSideMenuLink = page.locator("//a[@href='/certifications/my-requests']")
            this.addCertificationBtn = page.getByRole('button', { name: /Solicitar Certificação|Request Certification/ })
            this.certificateCOOChoice = page.locator("#coo")
            this.startRequestBtn = page.getByRole('button', { name: /Iniciar solicitação|Start Request/ })
            // Select producer
            this.producerDropDown = page.locator("ng-select[formcontrolname='producerId']")
            this.selectedProducer = page.getByRole('option', { name: "Organization For Test Automation" })
            // Insert importer
            this.Importername = page.getByPlaceholder(/Importer Name|Nome do importador/)
            this.phoneTxt = page.locator('div[formgroupname="importer"] input[type="tel"][placeholder^="ex:"]')
            this.EmailTxt = page.getByPlaceholder(/E-mail|Importer Email/)
            this.Address = page.getByPlaceholder(/Importer Address|Endereço do importador/)
            this.NextBtn = page.getByText(/Next|Próximo/)
            //Shipping Info
            this.transporterdroplist = page.locator("ng-select[formcontrolname='meansOfTransportId']")
            this.SelectTransporterValue = page.locator('div.ng-option span.ng-option-label', { hasText: /Air|Ar/ })
            this.Shippingdetails = page.getByPlaceholder(/Shipping details|Detalhes de envio/)
            //Invoice Details
            this.invoiceNumber = page.getByPlaceholder(/Invoice Number|Número da fatura/)
            this.invoicTotalAmount = page.getByPlaceholder(/Invoice Total Amount|Valor total da fatura/)
            this.currencyList = page.locator("ng-select[formcontrolname='currencyId']")
            this.selectedCurrency = page.locator("div.ng-option span.ng-option-label", { hasText: /USD/ })
            this.datePicker = page.locator("input[name='dpDate']")
            this.invoiceDate = page.locator(".ngb-dp-today")
            // Add product
            this.addProductButton = page.locator('button', { hasText: /Add from existing products|Adicionar de produtos existentes/ })
            this.ProductNamePR = page.locator("//input[@name='name']")
            this.ProductNameEN = page.locator("//input[@name='nameOther']")
            this.sendButton = page.getByRole('button', { name: /Send|Enviar/ })
            //Add existing product
            this.productsList = page.locator("ng-select[formcontrolname='productId']")
            this.selectedProduct = page.locator("div.ng-option span.ng-option-label", { hasText: /Product X|Produto X/ })
            this.Grossweight = page.getByPlaceholder(/Gross Weight|Peso bruto/)
            this.Netweight = page.getByPlaceholder(/Net Weight|Peso líquido/)
            this.volumeList = page.locator("ng-select[formcontrolname= 'volumeId']")
            // Select volum value
            this.SelectValue = page.locator("div.ng-option span.ng-option-label", { hasText: /kg/ })
            this.packages = page.getByPlaceholder(/No of Packages|N. º de embalagens/)
            this.packagetype = page.locator("ng-select[formcontrolname= 'packageTypeId']")
            this.selecttype = page.locator("div.ng-option span.ng-option-label", { hasText: /Bag|Bolsa/ })
            this.price = page.getByPlaceholder(/Product Price|Preço do produto/)
            this.productionDatePicker = page.locator("input[name='dpProductionDate']")
            this.expiryDatePicker = page.locator("input[name='dpExpiryDate']")
            this.firstDayOfMonth = page.locator('div[role="gridcell"]').filter({ hasText: '1' }).filter({ has: page.locator(':not(.text-muted)') }).first()
            this.lastDayOfMonth = page.locator('div[role="gridcell"]').filter({ hasText: /28|29|30|31/ }).filter({ has: page.locator(':not(.text-muted)') }).last()
            this.signs = page.getByPlaceholder(/Signs|Sinais/)
            // Agree terms and condition
            this.Agreecheckbox = page.locator("input[formcontrolname='isTermsAgreed']")

            this.incompleteRequestsButton = page.locator('button:has-text("Solicitações incompletas"), button:has-text("Incomplete Requests")');
            // proceed payment button
            this.proccedToPaymentButton = page.getByText(/Procced to payment|Prossiga para o pagamento/)
            //Payment Tab
            this.Credittype = page.locator("(//div[@class='group-media-object'])[2]")
            this.CardNumber = page.locator("//*[@id='card_number']")
            this.OwnerName = page.locator("(//div[@class='andes-form-control__control'])[2]")
            this.ExpireDate = page.locator("//div[@id='expiration_date']")
            this.securityCode = page.locator("//div[@id='cvv']")
            this.ContinueBtn = page.locator("(//span[@class='andes-button__content'])[1]")
            this.CPF = page.locator("//input[@id='number']")
            this.email = page.locator("//input[@aria-describedby='email-message']")
            this.payBtn = page.locator("//span[@class='andes-button__content']")
            this.back_to_website_Btn = page.locator("//div[@id='group_button_back_congrats']")

        }

        async Add_New_Certificate_Request() {

            await this.clickOnManageEntityButton()
            await this.clickCertificateRequestsSideMenuLink()
            await this.addCertificationBtn.click()
            await this.certificateCOOChoice.click()
            await this.startRequestBtn.click({ force: true })
        }

        async stepOneRequestInfo() {
            await this.selectProducer()
            await this.fillImporterInfo()
            await this.Next_Button()
        }

        async stepTwoShippingInfo() {
            await this.selectShippingInfo()
            await this.Next_Button()
        }

        async stepThreeInvoiceandProductsInfo() {
            await this.fillInvoiceInfo()
            await this.addExistingProducts()
            await this.Next_Button()
        }

        async stepFourAgreeTerms() {
            await this.AgreeTerms_and_Condition()
            await this.proccedToPaymentButton.click()
        }

        async resubmitRequest() {
            await this.Next_Button()
            await this.Next_Button()
            await new Promise((f) => setTimeout(f, 20000))
            await this.Next_Button()
            await this.AgreeTerms_and_Condition()
            await this.sendButton.click()
        }

        async selectProducer() {

            await this.producerDropDown.click()
            await this.selectedProducer.click({ force: true })
        }

        async clickOnManageEntityButton() {
            await this.manageEntityBtn.click()
        }

        async clickCertificateRequestsSideMenuLink() {
            await this.certificateRequestsSideMenuLink.click()
        }

        async fillImporterInfo() {

            await this.Importername.fill(CertificateTestDataGenerator.generateImporterName())
            await this.EmailTxt.fill(CertificateTestDataGenerator.generateImporterEmail())
            await this.phoneTxt.fill(CertificateTestDataGenerator.getImporterPhone())
            await this.Address.fill(CertificateTestDataGenerator.getImporterAddress())
        }

        async Next_Button() {

            await this.NextBtn.click()
        }


        async selectShippingInfo() {

            await this.transporterdroplist.click()
            await this.SelectTransporterValue.click()
            await this.Shippingdetails.fill(CertificateTestDataGenerator.getShippingDetails())
        }

        async fillInvoiceInfo() {

            await this.invoiceNumber.fill(CertificateTestDataGenerator.generateInvoiceNumber())
            await this.invoicTotalAmount.fill(CertificateTestDataGenerator.getInvoiceAmount())
            await this.currencyList.click()
            await this.selectedCurrency.click()
            await this.datePicker.click()
            await this.invoiceDate.click()
        }

        async addExistingProducts() {

            await this.addProductButton.click()
            await this.productsList.click()
            await this.selectedProduct.click()
            await this.Grossweight.fill(CertificateTestDataGenerator.getGrossWeight())
            await this.Netweight.fill(CertificateTestDataGenerator.getNetWeight())
            await this.volumeList.click()
            await this.SelectValue.click()
            await this.packages.fill(CertificateTestDataGenerator.getNoOfPackages())
            await this.packagetype.click()
            await this.selecttype.click()
            await this.price.fill(CertificateTestDataGenerator.getProductPrice())
            await this.productionDatePicker.click()
            await this.firstDayOfMonth.click()
            await this.expiryDatePicker.click()
            await this.lastDayOfMonth.click()
            await this.signs.fill(CertificateTestDataGenerator.getSignature())
            await this.sendButton.click()
        }

        async AgreeTerms_and_Condition() {
            await this.Agreecheckbox.click()
        }

        async proccedToPayment() {
            //Payment Tab
            await this.Credittype.click()
            await this.CardNumber.click()
            await this.CardNumber.type('5031 4332 1540 6351')
            //await this.OwnerName.type('APRO APRO')
            //await this.ExpireDate.type('12/25')
            //await this.securityCode.type('123')
            //await this.ContinueBtn.click()
            //await this.CPF.fill('19119119100')
            //await this.ContinueBtn.click()
            //await this.email.fill('test_user_64585784@testuser.com')
            //await this.payBtn.click()
            //await this.back_to_website_Btn.click()
        }

        //function to get the request number
        async getRequestNumber() {
            const requestNumber = await this.page.locator('tbody').locator('tr').locator('td').first().textContent();
            return requestNumber;
        }

        async getRequestStatus(requestNumber) {
            const row = this.page.locator('tr', { has: this.page.locator(`text=${requestNumber}`) }); // Locate the row containing the request number
            await row.waitFor(); // Wait for the row to be present in the DOM
            await expect(row).toBeVisible({ timeout: 5000 }); // Wait for the row to be visible
            const status = row.locator('td').locator("span.rejected").innerText(); // Locate the status cell within the row
            return status; // Return the status text
        }

        async navigateToIncompleteRequests() {
            await this.incompleteRequestsButton.click(); // Click on the Incomplete Requests button
        }

        // function clickoncompleteRequest for the request has status "Returned to the applicant"
        async clickOnCompleteRequest(requestNumber) {
            const row = this.page.locator('tr', { has: this.page.locator(`text=${requestNumber}`) }); // Locate the row containing the request number
            await row.waitFor(); // Wait for the row to be present in the DOM
            await expect(row).toBeVisible({ timeout: 5000 }); // Wait for the row to be visible
            const actionMenuButton = row.locator("i[class='fa-solid fa-ellipsis']"); // Locate the button within the row
            await actionMenuButton.click(); // Click the button
            const completeRequestButton = this.page.locator("div[class='dropdown'] a:nth-child(2)"); // Locate the button within the row
            await completeRequestButton.click(); // Click the button
        }
    }
