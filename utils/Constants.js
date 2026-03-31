import { faker } from '@faker-js/faker';

export function getTestDataForLogin() {
    return {
        ApplicantEmail: 'automation.user@gmail.com',
        AdminEmail: 'superadmin@coo.sa',
        Password: 'P@ssw0rd',
        OTP: '0000',
    };
}
