import{test} from '../fixtures/user-fixtures'
import { AddingNewOrgwithoutdata } from '../pages/NS-adding-organization-without-data-page';
import {AddOrganization} from '../pages/Add_Organization_page'

let AddOrg;
// Read login data from JSON file
const fs = require ('fs')
const path = require('path');
const orgTestDataPath = path.resolve(__dirname, '../test-data/OrganizationTestData.json');
const orgTestData = JSON.parse(fs.readFileSync(orgTestDataPath, 'utf-8'));
const orgData = orgTestData.orgRequest

//Random Fake data 
// Organization Fake name
function OrgName(){
  let outString = '';
  outString = orgData.orgName+ Math.floor(Math.random() * 9) + '';
  return outString;
  };

// Organization trade name
function TradeName(){
    let outString = '';
    outString = orgData.tradeName+ Math.floor(Math.random() * 9) + '';
    return outString; 
    };
//ID TypeNumber
function ID(){
      let outString = '';
      outString = orgData.Id+ (Math.floor(Math.random() * 899) + 100) + orgData.typeNumber;
      return outString;   
    };
// Second ID TypeNumber    
function generateSecondID(){
      let outString = '';
      outString = orgData.secondID+ (Math.floor(Math.random() * 899) + 100) + orgData.secondID;
      return outString;   
    };

test.describe('Add new organization with invalid data', ()=>{ 

    test('Add Organization without entring any data in the reuire fields', async({page, applicantLogin})=>{

        AddOrg = new AddingNewOrgwithoutdata(page)
        await AddOrg.invalidAddOrg()
        //Validate Error message  
        await AddOrg.errorMessage()
    })
    
    test('Add Organization with only one ID', async ({page, applicantLogin})=> {

        AddOrg = new AddOrganization(page)
        await AddOrg.Add_Btn()
        await AddOrg.Addorg(OrgName(), TradeName(), orgData.activity, ID(), generateSecondID(), orgData.phone, orgData.email, orgData.streetname, orgData.zipCode, orgData.additionnumber)
        AddOrg = new AddingNewOrgwithoutdata(page)
        await AddOrg.errorMessage()
        await AddOrg.assert_ID_type_Number_Validation()
    })
})