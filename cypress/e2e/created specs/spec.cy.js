describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://google.com')

    const letMeGoogle4u = (request) =>{
      request += '{enter}'
      cy.get('.gLFyf').type(request)
    }
    letMeGoogle4u('Do a barrel roll')
  })
})
