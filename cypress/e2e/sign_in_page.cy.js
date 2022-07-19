/// <reference types="cypress" />

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
  it('should show typeable Username field', () => {
    cy.get(sign_in_page.username_field).should('be.visible').type('asdasd').clear()
  })
  it('should show typeable Password field', () => {
    cy.get(sign_in_page.password_field).should('be.visible').type('asdasd').clear()
  })
  it('should show Username and Password placeholders', () => {
    cy.get(sign_in_page.username_title).should('have.text', 'Username')
    cy.get(sign_in_page.password_title).should('have.text', 'Password')
  })
  it("should show 'Username is required' error if user clicks on it and then click outside this field and didn't enter any value", () => {
    cy.reload()
    cy.get(sign_in_page.username_required_msg).should('not.exist')
    cy.get(sign_in_page.username_field).click().blur()
    cy.get(sign_in_page.username_required_msg).should('be.visible')
  })
  it('check "Remember me" checkbox', () => {
    cy.get(sign_in_page.rememberMe_checkbox).should('not.be.checked')
      .check().should('be.checked')
  })
  it('should show disabled by default sign in btn', () => {
    cy.reload()
    cy.get(sign_in_page.signIn_button).should('be.disabled') //this button is enabled by default in the app so test fails :)
  })
  it("should have 'Don't have an account? Sign Up' clickable link under 'Sign in' btn", () => {
    cy.get(sign_in_page.signUp_link).should('have.text', "Don't have an account? Sign Up").and('have.attr', 'href', '/signup')
  })
  it("should show Cypress copyright link that leads to 'https://www.cypress.io/'", () => {
    cy.get(sign_in_page.cypress_copyright).should('have.attr', 'href', 'https://cypress.io')
      .and('have.attr', 'target', '_blank') //check that the link will be opened in a new tab
  })

  it.skip("should open cypress.io link by clicking on cypress copyright", () => {
    cy.get(sign_in_page.cypress_copyright).should('have.attr', 'href', 'https://cypress.io')
      .and('have.attr', 'target', '_blank') //check that the link will be opened in a new tab
      .invoke('removeAttr', 'target').click() //remove the attribute and open the link in the current tab instead of new one
    //this will fail anyway, because cypress don't support redirection between different superdomains
    //"chromeWebSecurity: false" could be added to cypress config as workaround
    cy.url().should('eq', 'https://www.cypress.io/')
  })
})
