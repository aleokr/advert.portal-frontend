/// <reference types="Cypress" />
import NewAdvertPage from '../support/pageObjects/NewAdvertPage'

describe('Add new advert Suite', function () {
    const newAdvertPage = new NewAdvertPage();

    before(function () {
        cy.fixture('newAdvert').then(function (data) {
            this.data = data
        })
    })

    it('Add new advert case', function () {
        cy.Login(this.data.login, this.data.password).then(function(){
            cy.visit(Cypress.env('url') + "/addAdvert", {
                onBeforeLoad : function(window) {
                    window.localStorage.setItem('access_token', Cypress.env('token'))
                }
            })
        })
        newAdvertPage.getCategorySelect().select('BIOLOGY')
        newAdvertPage.getTitleInput().type(this.data.advertTitle)
        newAdvertPage.getShortDescriptionInput().type(this.data.advertShortDescription)
        newAdvertPage.getLongDescriptionInput().type(this.data.advertLongDescription)
        newAdvertPage.getSubmitButton().click()
        cy.url().should('eq', Cypress.env('url') + '/userPanel') 
    })

})