/// <reference types="cypress" />

it('visits the Moodle start page', () => {
  cy.visit('/');
  cy.contains('New Site');
});

