class AdvertListPage {

    getTable() {
        return cy.get('.responsive-table')
    }

    getSecondTab() {
        return cy.get(':nth-child(2) > .list-label');
    }
}

export default AdvertListPage;