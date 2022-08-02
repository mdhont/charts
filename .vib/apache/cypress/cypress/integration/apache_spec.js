/// <reference types="cypress" />
import { random } from '../support/utils';

it('visits the apache start page', () => {
  cy.visit('/');
  cy.contains('It works!');
});

