class NewCompanyPage {

    getNameInput() {
        return cy.get('#nameInput')
    }

    getDescriptionInput() {
        return cy.get('#descriptionInput')
    }

    getSubmitButton() {
        return cy.get('.form-button')
    }
}

export default NewCompanyPage;