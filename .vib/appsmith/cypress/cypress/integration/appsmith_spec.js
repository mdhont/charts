/// <reference types="cypress" />
import {
  random,
} from '../support/utils';

it('allows to create a new project', () => {
  cy.login();
  cy.get('[class*="templates-tab"]').click();

  cy.get('body').then(($body) => {
    // Close the pop-up if appears
    if ($body.find('[class*="toast-action"]').is(':visible')) {
      cy.get('[class*="toast-action"]').click();
    }
  });
  cy.contains('[data-cy="template-card"]', 'Marketing Portal').within(() => {
    cy.get('[class*="fork-button"]').click();
  })
  cy.contains('FORK TEMPLATE').click();
  cy.visit('/applications');
  cy.contains('Customer Communications portal');
});

it('allows to change admin settings', () => {
  cy.login();
  cy.visit(`/settings/general`);
  cy.fixture('user-settings').then(($us) => {
    cy.get('[name*="INSTANCE_NAME"]')
      .clear()
      .type(`${$us.instanceName}-${random}`, { force: true });
    cy.contains('button', 'Save').should('be.enabled').click();
    cy.contains('Successfully');
  });
});
