/// <reference types="cypress" />
import { random } from '../support/utils';

it('should add a new page', () => {
  cy.login();
  cy.visit('/oc-admin/index.php?page=pages&action=add');
  cy.fixture('pages').then((pages) => {
    cy.get('input[id*="title"]').type(`${pages.newPage.title} ${random}`);
    cy.get('input[id*="internal_name"]').type(`${pages.newPage.internalName}${random}`);
    cy.contains('Insert').click();
    cy.contains('Image').click();
    cy.contains('Upload').click();
    cy.get('input[type="file"]').selectFile('cypress/fixtures/images/test_image.jpeg', {force: true});
    cy.contains('Save').click();
    cy.contains('input', 'Add page').scrollIntoView().click();
    cy.visit('/');
    cy.contains(`${pages.newPage.title} ${random}`).click();
    cy.get('img[src*="test_image"]');
  });
});
