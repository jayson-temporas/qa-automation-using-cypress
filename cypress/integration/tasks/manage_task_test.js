describe('Manage Task Feature with Signed In User', () => {
    beforeEach(() => {
        cy.resetDatabase();
        cy.login('test@email.com', 'password');
    })

    it('shows tasks to user', () => {
        cy.visit('/tasks');
        cy.getByTestId('card').should('contain', 'My Task')
    })

    it('requires name and description', () => {
        cy.visit('/tasks/create');

        cy.getByTestId('submit').click();

        var container = cy.getByTestId('card');
        container.should('contain', 'The name field is required.')
        container.should('contain', 'The description field is required.')
    })

    it('can add a task', () => {
        cy.visit('/tasks/create');
        cy.getByTestId("name")
            .type("Task 1")
            .should('have.value', 'Task 1');
        
        cy.getByTestId("description")
            .type("Task Description")
            .should('have.value', 'Task Description');

        cy.getByTestId('submit').click();

        cy.url().should('include', '/tasks')

        var container = cy.getByTestId('card');

        container.should('contain', 'Task 1')
        container.should('contain', 'Task Description')
    });

    it('can edit a task', () => {
        cy.addTask('New Task', 'Go to mall')
        cy.visit('/tasks');
        
        cy.getByTestId('edit-task').first().click();

        cy.url().should('include', '/tasks/1/edit');

        cy.getByTestId("name")
            .clear()
            .type("Task Updated")
            .should('have.value', 'Task Updated');
        
        cy.getByTestId("description")
            .clear()
            .type("Task Description Updated")
            .should('have.value', 'Task Description Updated');

        cy.getByTestId('submit').click(); 

        cy.url().should('include', '/tasks')

        var container = cy.getByTestId('card');

        container.should('contain', 'Task Updated')
        container.should('contain', 'Task Description Updated')
    });
})