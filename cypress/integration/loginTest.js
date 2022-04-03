/// <reference types="Cypress" />
import LoginPage from '../support/pageObjects/LoginPage'

describe('Login User Suite', function () {
    const loginPage = new LoginPage();

    before(function () {
        cy.fixture('login').then(function (data) {
            this.data = data
        })
    })

    after(function () {
        expect(window.localStorage.getItem('access_token')).not.to.be.null
        expect(window.localStorage.getItem('refresh_token')).not.to.be.null
    })
    
    it('Login user case', function () {
        cy.visit(Cypress.env('url') + "/login")
        loginPage.getLoginInput().type(this.data.login, {force: true})
        loginPage.getPasswordInput().type(this.data.password, {force: true})
        loginPage.getSubmitButton().click({force: true})
        cy.url().should('eq', Cypress.env('url') + '/') 
        
    })


})