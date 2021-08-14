describe('Guest Denied Access Test', () => {
    beforeEach(() => {
        cy.resetDatabase();
    })

    it('redirects guest to login when viewing task list', () => {
        cy.visit('/tasks');
        
        cy.url().should('include', '/login');
    })

    it('redirects guest to login when add task', () => {
        cy.visit('/tasks/create');
        
        cy.url().should('include', '/login');
    })

    it('redirects guest to login when editing task', () => {
        cy.login('test@email.com', 'password');
        
        cy.addTask('New Task', 'Go to mall');

        cy.logout();

        cy.visit('/tasks/1/edit');
        
        cy.url().should('include', '/login');
    })
})