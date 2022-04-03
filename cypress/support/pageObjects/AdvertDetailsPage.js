class AdvertDetailPage {

    getApplicateButton() {
        return cy.get('#applicateButton')
    }

    getApplicatedButton() {
        return cy.get('#applicatedButton')
    }

    getFirstCompanyAdvert() {
        return cy.get(':nth-child(2) > .col-1');
    }
}

export default AdvertDetailPage;