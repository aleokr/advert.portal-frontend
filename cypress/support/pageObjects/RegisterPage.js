class RegisterPage {

    getNameInput() {
        return cy.get('#nameInput')
    }

    getSurnameInput() {
        return cy.get('#surnameInput')
    }

    getUsernameInput() {
        return cy.get('#usernameInput')
    }

    getEmailInput() {
        return cy.get('#emailInput')
    }

    getPasswordInput() {
        return cy.get('#passwordInput')
    }

    getSubmitButton() {
        return cy.get('.form-button')
    }

    getSelectType() {
        return cy.get('#typeSelect')
    }

    getCompanySelect() {
        return cy.get('#companySelect')
    }

}

export default RegisterPage;