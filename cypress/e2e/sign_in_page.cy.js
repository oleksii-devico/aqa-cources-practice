import { sign_in_page } from "../selectors/sign_in_page";

describe('UI tests for sign in page', () => {

  before('visiting sign in page', () => {
    cy.visit('/')
  })

  it('should show "Real World App logo"', () => {
    cy.get(sign_in_page.logo_image).should('be.visible').and('have.attr', 'xmlns', 'http://www.w3.org/2000/svg')
  })

  it('should show "Sign in" title', () => {
    cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
  })
})


// todo: automate foloowing test cases:
  // 1. should show typeable Username field
  // 2. should show typeable Password field
  // 3. should show Username and Password placeholders
  // 4. should show 'Username is required' error if user clicks on it and then click outside this field and didn't enter any value
  // 5. check "Remember me" checkbox
  // 6. should show disabled by default sign in btn
  // 7. should have 'Don't have an account? Sign Up' clickable link under 'Sign in' btn
  // 8. should show Cypress copyright link that leads to 'https://www.cypress.io/'