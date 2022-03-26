/// <reference types="Cypress" />
import AdvertListPage from '../support/pageObjects/AdvertListPage'


const advertListPage = new AdvertListPage();

describe('Load advert list Suite', function () {

    beforeEach(function () {
        cy.fixture('advertList').then(function (data) {
            this.data = data
        })
    })

    it('Check company advert case', function () {
        cy.visit(Cypress.env('url'))
        advertListPage.getTable().contains(this.data.comapanyAdvert1).should('be.visible');
        advertListPage.getTable().contains(this.data.comapanyAdvert2).should('be.visible');
        advertListPage.getTable().contains(this.data.comapanyAdvert3).should('be.visible');
    })

    it('Check company advert case', function () {
        cy.visit(Cypress.env('url'))
        advertListPage.getSecondTab().click()
        advertListPage.getTable().contains(this.data.individualAdvert1).should('be.visible');
        advertListPage.getTable().contains(this.data.individualAdvert2).should('be.visible');
        advertListPage.getTable().contains(this.data.individualAdvert3).should('be.visible');
    })

})