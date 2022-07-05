describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://google.com')
    cy.get('.gLFyf').type('Аниме онлайн без регистрации и смс {enter}')
  })
})