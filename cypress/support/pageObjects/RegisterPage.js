class RegisterPage {

    getInputName() {
        return cy.get('#nameInput')
    }

    getInputSurname() {
        return cy.get('#surnameInput')

    }
    getInputUsername() {
        return cy.get('#usernameInput')
    }

    getInputEmail() {
        return cy.get('#emailInput')
    }

    getInputPassword() {
        return cy.get('#passwordInput')
    }

    getSubmitButton() {
        return cy.get('.form-button')
    }

    getSelectType() {
        return cy.get('#typeSelect')
    }

    getSelectCompany() {
        return cy.get('#companySelect')
    }

}

export default RegisterPage;