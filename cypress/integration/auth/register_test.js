describe('Register Feature Test', () => {
    beforeEach(() => {
        cy.resetDatabase();
        cy.visit('/register')
        cy.getByTestId('submit').as('registerButton')
    })

    it('requires name ,email and password', () => {
        cy.get('@registerButton').click()

        cy.url().should('include', '/register')

        cy.get('form').should('contain', 'The name field is required.')
        cy.get('form').should('contain', 'The email field is required.')
        cy.get('form').should('contain', 'The password field is required.')
    })

    it('validates password and password confirmation', () => {
        cy.url().should('include', '/register')

        cy.getByTestId('password')
            .type('password')
            .should('have.value', 'password')
        cy.getByTestId('password-confirm')
            .type('wrongpassword')
            .should('have.value', 'wrongpassword')

        cy.get('@registerButton').click()
        
        cy.get('form').should('contain', 'The password confirmation does not match.')
    })
    
    it('requires password to be atleast 8 chars', () => {
        cy.url().should('include', '/register')

        cy.getByTestId('password')
            .type('1234')
            .should('have.value', '1234')

        cy.get('@registerButton').click()
        
        cy.get('form').should('contain', 'The password must be at least 8 characters.')
    })

    it('can register a user', () => {

        cy.getByTestId('name')
            .type('Jay Temp')
            .should('have.value', 'Jay Temp')
        
        cy.getByTestId('email')
            .type('test2@email.com')
            .should('have.value', 'test2@email.com')
        
        cy.getByTestId('password')
            .type('password')
            .should('have.value', 'password')
        
        cy.getByTestId('password-confirm')
            .type('password')
            .should('have.value', 'password')
  
        cy.get('@registerButton').click()
  
        cy.url().should('include', '/home')
      })
  })