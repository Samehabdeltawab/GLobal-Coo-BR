import testData from '../test-data/OrganizationTestData.json';

export class OrganizationTestDataGenerator {
    // Generate Organization Name
    static generateOrganizationName() {
        return testData.orgRequest.orgName + Math.floor(Math.random() * 1000) + '';
    }

    // Generate Organization Trade Name
    static generateTradeName() {
        return testData.orgRequest.tradeName + Math.floor(Math.random() * 1000) + '';
    }

    // Generate Organization ID
    static generateOrganizationID() {
        return testData.orgRequest.Id + (Math.floor(Math.random() * 899) + 100) + testData.orgRequest.typeNumber;
    }

    static getOrganizationActivity() {
        return testData.orgRequest.activity;
    }

    static getOrganizationPhone() {
        return testData.orgRequest.phone;
    }

    static getOrganizationEmail() {
        return testData.orgRequest.email;
    }

    static getOrganizationStreetName() {
        return testData.orgRequest.streetname;
    }

    static getOrganizationZipCode() {
        return testData.orgRequest.zipCode;
    }

    static getOrganizationAdditionNumber() {
        return testData.orgRequest.additionnumber;
    }

    static getOrganizationSecondID() {
        return testData.orgRequest.secondID + (Math.floor(Math.random() * 899) + 100) + testData.orgRequest.typeNumber;
    }

    // Reject Request
    static getOrganizationRejectNotes() {
        return testData.rejectRequest.notes;
    }

    // Return Notes
    static getOrganizationReturnNotes() {
        return testData.returnNotes.notes;
    }

}