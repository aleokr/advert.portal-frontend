/// <reference types="Cypress" />

describe('Register User Suite', function () {
    it('Register individual user case', function () {
        cy.visit(Cypress.env('url') + "/register")

    })

})
