class EditUserPage {

    getSurnameLabel() {
        return cy.get('#surnameLabel')
    }

    getSurnameInput() {
        return cy.get('#surnameInput')
    }

    getSubmitButton() {
        return cy.get('#submitButton')
    }

    getEditModeButton() {
        return cy.get('#editModeButton')
    }

}

export default EditUserPage;