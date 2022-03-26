/// <reference types="Cypress" />
import AdvertDetailPage from "../support/pageObjects/AdvertDetailsPage";

describe('Applicate for advert Suite', function () {
    const advertDetailPage = new AdvertDetailPage();

    before(function () {
        cy.fixture('applicateAdvert').then(function (data) {
            this.data = data
        })
    })

    it('Applicate for advert case', function () {
        cy.Login(this.data.login, this.data.password).then(function(){
            cy.visit(Cypress.env('url') + "/", {
                onBeforeLoad : function(window) {
                    window.localStorage.setItem('access_token', Cypress.env('token'))
                }
            })
        })

        advertDetailPage.getFirstCompanyAdvert().click()
        advertDetailPage.getApplicateButton().click()
        advertDetailPage.getApplicatedButton().should("exist")
    })

})