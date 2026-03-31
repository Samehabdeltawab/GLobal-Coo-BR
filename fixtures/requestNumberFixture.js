import fs from 'fs';

export const saveRequestNumber = (requestNumber) => {
    fs.writeFileSync('./utils/requestNumber.json', JSON.stringify({ requestNumber }));
};

export const loadRequestNumber = () => {
    const data = fs.readFileSync('./utils/requestNumber.json', 'utf8');
    return JSON.parse(data).requestNumber;
};
/************************************************************************************************* */
export const saveCertificateNumber = (certificateNumber) => {
    fs.writeFileSync('./utils/certificateNumber.json', JSON.stringify({ certificateNumber }));
};

export const loadCertificateNumber = () => {
    const data = fs.readFileSync('./utils/certificateNumber.json', 'utf8');
    return JSON.parse(data).certificateNumber;
};
/************************************************************************************************* */
export const saveLegalizationRequestNumber = (legalizationRequestNumber) => {
    fs.writeFileSync('./utils/legalizationRequestNumber.json', JSON.stringify({ legalizationRequestNumber }));
};

export const loadLegalizationRequestNumber = () => {
    const data = fs.readFileSync('./utils/legalizationRequestNumber.json', 'utf8');
    return JSON.parse(data).legalizationRequestNumber;
};
/************************************************************************************************* */

export const saveUpdateOrganizationRequestNumber = (updateRequestNumber) => {
    fs.writeFileSync('./utils/updateOrganizationRequestNumber.json', JSON.stringify({ updateRequestNumber }));
};

export const loadUpdateOrganizationRequestNumber = () => {
    const data = fs.readFileSync('./utils/updateOrganizationRequestNumber.json', 'utf8');
    return JSON.parse(data).updateRequestNumber;
};