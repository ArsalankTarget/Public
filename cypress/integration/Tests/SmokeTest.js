/// <reference types="cypress" />

import LoginPage from '../PageObjects/LoginPageObjects'
import HomePagePOs from '../PageObjects/HomePagePOs'
import LeftMenuPOs from '../PageObjects/LeftMenuPOs'
import SetupScreenPOs from '../PageObjects/SetupScreenPOs'
import EntityCreationPOs from '../PageObjects/EntityCreationPOs'
import EntityAttributesPOs from '../PageObjects/EntityAttributesPOs'
import CommonFunctions from '../PageObjects/CommonFunctions'



    before(function() {
      
   cy.fixture('Login.json').then(function(data) {
      this.data = data
     

     

    })
 
    })


describe('Login', function() {

    
    beforeEach(function() {

        Cypress.Cookies.preserveOnce('SrmWebjamCookie', 'remember_token')
        Cypress.Cookies.preserveOnce('ASP.NET_SessionId', 'remember_token')
        Cypress.Cookies.preserveOnce('AWSALB', 'remember_token')
        Cypress.Cookies.preserveOnce('AWSALBCORS', 'remember_token')
         //setup timestamp
        cy.GenerateNumber().then(($text) => {
          // myResult
         var  timestamp = $text
           console.log(timestamp);
     })
        
  
        
      })



it.only('Logs the user into the Application', function() {
    const LoginPageObject=new LoginPage()

    cy.visit('https://ui.oomi.co.uk/')

    cy.get('body').then(($body) => {
        // synchronously ask for the body's text
        // and do something based on whether it includes
        // another string
        if ($body.text().includes('Sign in to continue to oomi')) {
          // yup found it
          LoginPageObject.getUserNameField().type(this.data.username)
          LoginPageObject.getPasswordField().type(this.data.password)
          LoginPageObject.getLoginBtn().click()
        } else {
          // nope not here
         console.log('user is already logged in')
                 }
      })
  
  
   
})

it('Verify user is logged in', function () {
    
    const HomePageObject=new HomePagePOs()
    HomePageObject.getHeaderTitle().should('be.visible')
   
})


it('Create an Entity', function()  {

  
    const LeftMenuObject= new LeftMenuPOs ()
    const SetupScreenObject= new SetupScreenPOs ()
    const EntityCreationObject = new EntityCreationPOs ()

    LeftMenuObject.clickSetupLink().click()
    SetupScreenObject.getSetupSearch().type('custom entity')
    SetupScreenObject.getCustomLink('Custom Entity').click()
    EntityCreationObject.getLabelField().type(this.data.EntityName)        
    EntityCreationObject.getRecordName().type(this.data.EntityName)
    EntityCreationObject.getRecordName().type('Description')
    EntityCreationObject.getStartingNumberField().type('1')
    EntityCreationObject.getAllowActivitiesCB().check()
    EntityCreationObject.getTrackingFieldHistoryCB().check()
    EntityCreationObject.getDeployedRB().check()
    EntityCreationObject.getSaveButton().click()
    EntityCreationObject.getShowInMenuCB().click()
    EntityCreationObject.getTreeHome().dblclick()
    EntityCreationObject.getCRMNode().dblclick()
    EntityCreationObject.getFinalSaveBtn().click()
    
    })
it.only('set Entity Attributes', function()  {

  
      const LeftMenuObject= new LeftMenuPOs ()
      const SetupScreenObject= new SetupScreenPOs ()
      const EntityCreationObject = new EntityCreationPOs ()
      const EntityAttributeObject = new EntityAttributesPOs ()
      const common= new CommonFunctions ()
  
      cy.visit('https://ui.oomi.co.uk/Home/GetPageBuilderDetailView/e0-n0')
      SetupScreenObject.getSetupSearch().type(this.data.EntityName)
      cy.get('a[aria-expanded="false"]').contains(this.data.EntityName).click()
     // cy.contains('a[aria-expanded="false', this.data.EntityName)
     // cy.get('li .list-group-item').should('contain', this.data.EntityName)
     //cy.get('a[aria-expanded="true"]').contains(this.data.EntityName).find('a')
     cy.get('a[aria-expanded="true"]').contains(this.data.EntityName).parent().find('li').within(() => {
        cy.get('a').contains('Attributes').click()

     })

         
  //    SetupScreenObject.getCustomLink('Attributes').click()
      SetupScreenObject.getById('#AddNewAttribute-link').click()
      common.getbyId('#rdb_Date').check()
     // EntityAttributeObject.getRadioBox('Date').check()
      EntityAttributeObject.getCustomLink('Next').click()
      EntityAttributeObject.getAttributeField().type('DateField')
      EntityAttributeObject.getCustomLink('Save & New').click()
      common.getbyId('#rdb_Number').check()
      //EntityAttributeObject.getRadioBox('Number').check()
      EntityAttributeObject.getCustomLink('Save').click()
      cy.pause()





      // EntityCreationObject.getLabelField().type(this.data.EntityName)        
      // EntityCreationObject.getRecordName().type(this.data.EntityName)
      // EntityCreationObject.getRecordName().type('Description')
      // EntityCreationObject.getStartingNumberField().type('1')
      // EntityCreationObject.getAllowActivitiesCB().check()
      // EntityCreationObject.getTrackingFieldHistoryCB().check()
      // EntityCreationObject.getDeployedRB().check()
      // EntityCreationObject.getSaveButton().click()
      // EntityCreationObject.getShowInMenuCB().click()
      // EntityCreationObject.getTreeHome().dblclick()
      // EntityCreationObject.getCRMNode().dblclick()
      // cy.pause()
      // EntityCreationObject.getFinalSaveBtn().click()
      
      })

})