/// <reference types="Cypress" />
import LoginPage from '../support/pageObjects/LoginPage'

describe('Login User Suite', function () {
    const loginPage = new LoginPage();

    beforeEach(function () {
        cy.fixture('login').then(function (data) {
            this.data = data
        })
    })

    it('Login user case', function () {
        cy.visit(Cypress.env('url') + "/login")
        loginPage.getLoginInput().type(this.data.login)
        loginPage.getPasswordInput().type(this.data.password)
        loginPage.getSubmitButton().click()
        cy.url().should('eq', Cypress.env('url') + '/') 
    })

})