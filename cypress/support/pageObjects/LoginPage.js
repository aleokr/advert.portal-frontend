class LoginPage {

    getLoginInput() {
        return cy.get('#loginInput')
    }

    getPasswordInput() {
        return cy.get('#passwordInput')
    }

    getSubmitButton() {
        return cy.get('[type="submit"]')
    }

}

export default LoginPage;