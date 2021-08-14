// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getByTestId', (selector, ...args) => {
    return cy.get(`[data-testid=${selector}]`, ...args)
})
  
Cypress.Commands.add('resetDatabase', () => { 
    cy.exec('php demo_website/artisan migrate:fresh --seed')
})

Cypress.Commands.add('login', (email, password) => { 
    return cy.request('POST', '/login', {
        email: email,
        password: password
    })
})

Cypress.Commands.add('logout', (email, password) => { 
    return cy.request('POST', '/logout')
})

Cypress.Commands.add('addTask', (name, description) => { 
    return cy.request('POST', '/tasks', {
        name: name,
        description: description
    })
 })