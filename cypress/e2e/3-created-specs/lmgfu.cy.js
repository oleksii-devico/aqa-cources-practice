describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://google.com')
    const addEnterToString = (string) => {
      return string += `{enter}`
    }
    cy.get('.gLFyf').type(addEnterToString('Аниме онлайн без регистрации и смс'))
  })
})
