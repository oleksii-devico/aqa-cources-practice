describe('empty spec', () => {
  it('passes', () => {
    cy.visit('example.cypress.io')
    cy.get('.caret').click()
    cy.get('.dropdown-menu > :nth-child(5) > a').click()
    cy.get('h1').should('have.text', 'Viewport')
  })
})
