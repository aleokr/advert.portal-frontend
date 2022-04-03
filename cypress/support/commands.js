Cypress.Commands.add("Login", (login, password) => {
    cy.request({
        method: "POST",
        url: '/api/v1/auth',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: {
            'username': login,
            'password': password
        }
    }).then(function (response) {
        expect(response.status).to.eq(200)
        Cypress.env('token', response.body.access_token)
    })
})
