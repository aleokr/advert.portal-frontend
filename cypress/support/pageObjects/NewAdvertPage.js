class NewAdvertPage {


    getCategorySelect() {
        return cy.get('#categorySelect')
    }
    
    getTagSelect() {
        return cy.get('#tagSelect')
    }

    getTitleInput() {
        return cy.get('#titleInput')
    }

    getShortDescriptionInput() {
        return cy.get('#shortDescriptionInput')
    }

    getLongDescriptionInput() {
        return cy.get('#longDescriptionInput')
    }

    getSubmitButton() {
        return cy.get('.form-button')
    }
}

export default NewAdvertPage;