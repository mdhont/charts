/// <reference types="cypress" />
import { random } from '../support/utils';

it('allows user to log in and log out', () => {
  cy.login();
  cy.get('div.alert').should('not.exist');
  cy.get('#logout').scrollIntoView().click();
});

it('allows creating a bucket and file upload', () => {
  cy.login();
  cy.visit('buckets/add-bucket');
  cy.fixture('testdata').then((td) => {
    cy.get('#bucket-name')
      .should('be.visible')
      .type(`${td.bucketTitle}.${random}`);
  });
  cy.contains('button[type="submit"]', 'Create Bucket')
    .should('be.visible')
    .click();
  cy.fixture('testdata').then((td) => {
    cy.url().should('include', `buckets/${td.bucketTitle}`);
  });

  cy.contains('#upload-main', 'Upload').click();
  cy.contains('span', 'Upload File').should('be.visible').click();
  cy.get('div#object-list-wrapper > input[type="file"]')
    .should('not.be.disabled')
    .selectFile('cypress/fixtures/example.json', { force: true });
  cy.reload();
  cy.contains('example.json');
});

