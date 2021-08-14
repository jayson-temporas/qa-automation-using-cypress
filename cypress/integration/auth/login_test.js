describe('Login Feature Test', () => {
    beforeEach(() => {
        cy.resetDatabase();
        cy.visit('/login')
        cy.getByTestId('submit').as('loginButton')
    })

    it('requires email and password', () => {
        cy.get('@loginButton').click()

        cy.url().should('include', '/login')

        cy.get('form').should('contain', 'The email field is required.')
        cy.get('form').should('contain', 'The password field is required.')
    })

    it('can log in the user', () => {
        cy.getByTestId('email')
        .type('test@email.com')
        .should('have.value', 'test@email.com')

        cy.getByTestId('password')
        .type('password')
        .should('have.value', 'password')

        cy.get('@loginButton').click()

        cy.url().should('include', '/home')
    })
})