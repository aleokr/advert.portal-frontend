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
        registerPage.getInputName().type(this.data.individualName)
        registerPage.getInputSurname().type(this.data.individualSurname)
        registerPage.getInputUsername().type(this.data.individualUsername)
        registerPage.getInputEmail().type(this.data.individualEmail)
        registerPage.getInputPassword().type(this.data.password)
        registerPage.getSubmitButton().click()
        cy.url().should('include','login')
    })

    it('Register company admin user case', function () {
        cy.visit(Cypress.env('url') + "/register")
        registerPage.getInputName().type(this.data.adminName)
        registerPage.getInputSurname().type(this.data.adminSurname)
        registerPage.getInputUsername().type(this.data.adminUsername)
        registerPage.getInputEmail().type(this.data.adminEmail)
        registerPage.getInputPassword().type(this.data.password)
        registerPage.getSelectType().select('COMPANY_ADMIN')
        registerPage.getSubmitButton().click()
        cy.url().should('include','login')
    })

    it('Register company user case', function () {
        cy.visit(Cypress.env('url') + "/register")
        registerPage.getInputName().type(this.data.companyUserName)
        registerPage.getInputSurname().type(this.data.companyUserSurname)
        registerPage.getInputUsername().type(this.data.companyUserUsername)
        registerPage.getInputEmail().type(this.data.companyUserEmail)
        registerPage.getInputPassword().type(this.data.password)
        registerPage.getSelectType().select('COMPANY_USER')
        registerPage.getSelectCompany().select('Cypress company')
        registerPage.getSubmitButton().click()
        cy.url().should('include','login')
    })

})
