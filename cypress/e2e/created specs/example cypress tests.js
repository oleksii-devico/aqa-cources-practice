/// <reference types="Cypress" />

describe('My First Test', () => {
  it('Gets, types and asserts', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('get').click();
    cy.get('h1').should('be.visible').should('have.text', 'Querying');
    cy.get('#query-btn').should('contain', 'Button').click()
    cy.get('[data-cy="submit"]').click()
  })
})