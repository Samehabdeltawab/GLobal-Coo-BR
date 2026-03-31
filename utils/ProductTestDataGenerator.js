import testData from '../test-data/ProductTestData.json';

export class ProductTestDataGenerator {

    static portuguesProductName = null;

    // Producer
    static getProducerName() {
        return testData.producerName + Math.floor(Math.random() * 10000) + '';
    }

    static getProducerIDNumber() {
        return testData.producerIDNumber + (Math.floor(Math.random() * 899) + 100) + testData.producerTypeNumber;
    }

    static getProducerLandline() {
        return testData.producerLandline;
    }

    static getProducerAddress() {
        return testData.producerAddress;
    }

    // Product
    static getPortuguesProductName() {
        this.portuguesProductName = testData.portuguesProductName + Math.floor(Math.random() * 10000) + '';
        return this.portuguesProductName;
    }

    static getEnglishProductName() {
        return testData.englishProductName + Math.floor(Math.random() * 10000) + '';
    }

    static getProductIDNumber() {
        return testData.productIDNumber + (Math.floor(Math.random() * 899) + 100) + testData.productTypeNumber;
    }

    static getPortuguesDescription() {
        return testData.portuguesDescription + Math.floor(Math.random() * 10000) + '';
    }

    static getEnglishDescription() {
        return testData.englishDescription + Math.floor(Math.random() * 10000) + '';
    }

    static getProductHSCode() {
        return testData.productHSCode;
    }
}