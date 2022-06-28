describe('lmgfy', () => {
  it('Googles it for you', () => {
    cy.visit('https://google.com')

    const letMeGoogle4u = (request) =>{
      request += '{enter}'
      cy.get('.gLFyf').type(request)
    }
    letMeGoogle4u('Do a barrel roll')
  })
})
