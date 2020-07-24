describe('check the site and input values', () => {
    it('can navigate to the app', () => {
        cy.visit('http://localhost:3000/pizza')
        cy.url().should('include', 'localhost')
    })

    it('get the name input and type a name in it', () => {
        cy.get('input[name="name"]')
        .type('George')
        .should('have.value','George')
    })

    it('can select a size', () => {
        cy.get('select').select('small')
    })

    it('check for pineapple', () => {
        cy.get('input[name="Pineapple"]')
        .check().should('be.checked')
    })

    it('check for Extra Cheese', () => {
        cy.get('input[name="Extra Cheese"]')
        .check().should('be.checked')
    })

    it('check for Jalapenos', () => {
        cy.get('input[name="Jalapenos"]')
        .check().should('be.checked')
    })

    it('check for Pepperoni', () => {
        cy.get('input[name="Pepperoni"]')
        .check().should('be.checked')
    })

    it('check for Mushrooms', () => {
        cy.get('input[name="Mushrooms"]')
        .check().should('be.checked')
    })

    it('can submit the form', () => {
        cy.get('button').click()
    })
})