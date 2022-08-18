const COMMAND_DELAY = 2000;
const BASE_URL = 'http://localhost';

for (const command of ['click']) {
  Cypress.Commands.overwrite(command, (originalFn, ...args) => {
    const origVal = originalFn(...args);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(origVal);
      }, COMMAND_DELAY);
    });
  });
}

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  return originalFn(`${BASE_URL}${url}`, options);
});

Cypress.Commands.add(
  'login',
  (username = Cypress.env('username'), password = Cypress.env('password')) => {
    cy.visit('/login/index.php');
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.contains('button', 'Log in').click();
  }
);

