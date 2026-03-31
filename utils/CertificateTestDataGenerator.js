import testData from '../test-data/CertificateTestData.json';

export class CertificateTestDataGenerator {
    // Generate Importer Name
    static generateImporterName() {
        return testData.Certificate.ImporterName + Math.floor(Math.random() * 1000) + '';
    }

    // Generate Importer Email
    static generateImporterEmail() {
        return testData.Certificate.ImporterEmail + Math.floor(Math.random() * 1000) + '@example.com';
    }

    // Generate Importer Phone
    static getImporterPhone() {
        return testData.Certificate.ImporterPhone;
    }

    // Generate Importer Address
    static getImporterAddress() {
        return testData.Certificate.ImporterAddress;
    }

    static getShippingDetails() {
        return testData.Certificate.ShippingDetails;
    }

    static generateInvoiceNumber() {
        return testData.Certificate.InvoiceNumber + Math.floor(Math.random() * 1000) + '';
    }

    static getInvoiceAmount() {
        return testData.Certificate.InvoiceAmount;
    }

    static getGrossWeight() {
        return testData.Certificate.GrossWeight;
    }

    static getNetWeight() {
        return testData.Certificate.NetWeight;
    }

    static getNoOfPackages() {
        return testData.Certificate.NoOfPackages;
    }

    static getProductPrice() {
        return testData.Certificate.ProductPrice;
    }

    static getSignature() {
        return testData.Certificate.Signature;
    }
}