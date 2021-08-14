# QA Automation using CYPRESS

This is a sample End to End Testing project using CYPRESS

## Requirements

You should have Nodejs installed, PHP and Composer for our demo website.


## Setup

Go to the project's root then install Cypress dependencies

```
npm install
```

Go inside the demo_website directory

```
cd demo_website
```

Install PHP and JS dependencies

```
composer install
```

``` 
npm install
```

Create a .env file for our demo website. For simplicity, you can create a sqlite database for our tests

```
touch database/database.sqlite
```

then add this to your .env file

```
DB_CONNECTION=sqlite
DB_DATABASE=/absolute-path-to-your-project/demo_website/database/database.sqlite
```

Go back to the root of our project

```
cd ..
```

Run our demo website server

```
php demo_website/artisan serve
```

Open cypress then run our tests

```
npx cypress open
```

Run tests on mobile by changing viewport in cypress.json

```
{
    "viewportWidth": 375,
    "viewportHeight": 667
}
```

Get more viewports example [here](https://docs.cypress.io/api/commands/viewport)

## Running cypress tests on different browsers

Cypress automatically detect valid browsers installed in your system.
Open cypress Test Runner

```
npx cypress open
```

Then choose on the dropdown the browser you want.

You can also run tests using 'cypress run'. By default it will run headlessly. 

```
npx cypress run --browser chrome
```

To visually see tests on browser, add --headed

```
npx cypress run --browser firefox --headed
```

## Test Coverage

- Login Feature Test
    - login form require fields
    - valid user should be able to log in
    - Test Video Recording: cypress/videos/auth/login_test.js.mp4
- Register Feature Test
    - registration form require fields
    - password and password confirmation should match
    - a valid form should be able to register a user
    - Test Video Recording: cypress/videos/auth/register_test.js.mp4
- Task Feature Test
    - Task Access Test
        - Guest user cant view the task list
        - Guest user cant add a task
        - Guest user cant edit a task
        - Guest user cant delete a task
        - Test Video Recording: cypress/videos/auth/manage_task_test.js.mp4
    - Manage Task Test
        - Task form require fields
        - Valid add task form should create a task
        - Valid edit task form should update a task
        - Test Video Recording: cypress/videos/auth/guest_denied_access_test.js.mp4


## Final Thoughts

Follow the best practises in End to End testing like run each tests independently from one another. 

Avoid using class or id selectors when writing tests. Tell your devs to use data-testid, data-cypress, or data-test so you can isolate your tests from css or js changes.

```
<input type="text" id="email" class="input-controll" data-testid="email">
```

You can add a helper command under cypress/support/commands.js

```
Cypress.Commands.add('getByTestId', (selector, ...args) => {
    return cy.get(`[data-testid=${selector}]`, ...args)
})
```

Then you can select that input element

```
cy.getByTestId("email").type("test@email.com");
```

You can also add commonly use actions like login, logout and more on your commands.js

```
Cypress.Commands.add('resetDatabase', () => { 
    cy.exec('php demo_website/artisan migrate:fresh --seed')
})

Cypress.Commands.add('login', (email, password) => { 
    return cy.request('POST', 'http://localhost:8000/login', {
        email: email,
        password: password
    })
})

Cypress.Commands.add('logout', (email, password) => { 
    return cy.request('POST', 'http://localhost:8000/logout')
})
```


Always reset database each tests. 
***Make sure you are on your tests environment** to avoid accidentally deleting your dev/prod database.

```
describe('Example Spec Test', () => {
    beforeEach(() => {
        cy.resetDatabase();
    })

    it('can do something', () => {
        // do some tests here
    })
})
```

