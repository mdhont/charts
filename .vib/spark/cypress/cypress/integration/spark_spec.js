/// <reference types="cypress" />

it('checks the status', () => {
  cy.visit('/');
  cy.contains('Status: ALIVE');
});

it('checks if the amount of workers is correct', () => {
  const expectedWorkers = 2;
  cy.visit('http://localhost');
  cy.contains(`Alive Workers: ${expectedWorkers}`);
});
