/// <reference types="Cypress" />
import NewCompanyPage from "../support/pageObjects/NewCompany";

describe('Add new company Suite', function () {
    const newCompanyPage = new NewCompanyPage();

    before(function () {
        cy.fixture('newCompany').then(function (data) {
            this.data = data
        })
    })

    after(function () {
        expect(window.localStorage.getItem('company_id')).not.to.eq(null)
    })

    it('Add new company case', function () {
        cy.Login(this.data.login, this.data.password).then(function(){
            cy.visit(Cypress.env('url') + "/addCompany", {
                onBeforeLoad : function(window) {
                    window.localStorage.setItem('access_token', Cypress.env('token'))
                    window.localStorage.setItem('user_type', 'COMPANY_ADMIN')
                }
            })
        })
        newCompanyPage.getNameInput().type(this.data.companyName)
        newCompanyPage.getDescriptionInput().type(this.data.companyDescription)
        newCompanyPage.getSubmitButton().click()

        cy.url().should('eq', Cypress.env('url') + '/') 
    })

})