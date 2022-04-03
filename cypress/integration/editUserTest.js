/// <reference types="Cypress" />
import EditUserPage from "../support/pageObjects/EditUserPage";

describe('Edit user Suite', function () {
    const editUserPage = new EditUserPage();

    before(function () {
        cy.fixture('editUser').then(function (data) {
            this.data = data
        })
    })

    it('Edit user  case', function () {
        cy.Login(this.data.login, this.data.password).then(function(){
            cy.visit(Cypress.env('url') + "/settings", {
                onBeforeLoad : function(window) {
                    window.localStorage.setItem('access_token', Cypress.env('token'))
                    window.localStorage.setItem('user_type', 'COMPANY_ADMIN')
                }
            })
        })
        editUserPage.getSurnameLabel().should('have.text', this.data.userOldSurname)
        editUserPage.getEditModeButton().click({force :true})
        editUserPage.getSurnameInput().clear()
        editUserPage.getSurnameInput().type(this.data.userNewSurname)
        editUserPage.getSubmitButton().click({force :true})
        editUserPage.getSurnameLabel().should('have.text',this.data.userNewSurname)

    })

})