/// <reference types="Cypress" />
import RegisterPage from '../support/pageObjects/RegisterPage'

describe('Register User Suite', function () {
    const registerPage = new RegisterPage();

    beforeEach(function () {
        cy.fixture('register').then(function (data) {
            this.data = data
        })
    })

    it('Register individual user case', function () {
        cy.visit(Cypress.env('url') + "/register")
        registerPage.getNameInput().type(this.data.individualName)
        registerPage.getSurnameInput().type(this.data.individualSurname)
        registerPage.getUsernameInput().type(this.data.individualUsername)
        registerPage.getEmailInput().type(this.data.individualEmail)
        registerPage.getPasswordInput().type(this.data.password)
        registerPage.getSubmitButton().click()
        cy.url().should('include','login')
    })

    it('Register company admin user case', function () {
        cy.visit(Cypress.env('url') + "/register")
        registerPage.getNameInput().type(this.data.adminName)
        registerPage.getSurnameInput().type(this.data.adminSurname)
        registerPage.getUsernameInput().type(this.data.adminUsername)
        registerPage.getEmailInput().type(this.data.adminEmail)
        registerPage.getPasswordInput().type(this.data.password)
        registerPage.getSelectType().select('COMPANY_ADMIN')
        registerPage.getSubmitButton().click()
        cy.url().should('include','login')
    })

    it('Register company user case', function () {
        cy.visit(Cypress.env('url') + "/register")
        registerPage.getNameInput().type(this.data.companyUserName)
        registerPage.getSurnameInput().type(this.data.companyUserSurname)
        registerPage.getUsernameInput().type(this.data.companyUserUsername)
        registerPage.getEmailInput().type(this.data.companyUserEmail)
        registerPage.getPasswordInput().type(this.data.password)
        registerPage.getSelectType().select('COMPANY_USER')
        registerPage.getCompanySelect().select('Cypress company')
        registerPage.getSubmitButton().click()
        cy.url().should('include','login')
    })

})
