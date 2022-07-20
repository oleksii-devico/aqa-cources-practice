/// <reference types="cypress" />
import { main_page } from "../selectors/main_page";
import { sign_in_page } from "../selectors/sign_in_page";
import { sign_up_page } from "../selectors/sign_up_page";

describe('Sign-in, sign-up, logout checks', () => {
    before('Visit sign-up page', () => {
        cy.visit('/')
        cy.get(sign_in_page.signUp_link).click()
        cy.url().should('contain', '/signup')
    })
    it('should show validation errors for first name field', () => {
        cy.get(sign_up_page.firstName_validation_message).should('not.exist')
        cy.get(sign_up_page.firstName_field).click().blur()
        cy.get(sign_up_page.firstName_validation_message).should('be.visible').and('have.text', 'First Name is required')
    })
    it('should show validation errors for last name field', () => {
        cy.get(sign_up_page.lastName_validation_message).should('not.exist')
        cy.get(sign_up_page.lastName_field).click().blur()
        cy.get(sign_up_page.lastName_validation_message).should('be.visible').and('have.text', 'Last Name is required')
    })
    it('should show validation errors for username field', () => {
        cy.get(sign_up_page.username_validation_message).should('not.exist')
        cy.get(sign_up_page.username_field).click().blur()
        cy.get(sign_up_page.username_validation_message).should('be.visible').and('have.text', 'Username is required')
    })
    it('should show validation errors for password field', () => {
        cy.get(sign_up_page.password_validation_message).should('not.exist')
        cy.get(sign_up_page.password_field).click().blur()
        cy.get(sign_up_page.password_validation_message).should('be.visible').and('have.text', 'Enter your password')
        cy.get(sign_up_page.password_field).type('123').blur()
        cy.get(sign_up_page.password_validation_message).should('be.visible').and('have.text', 'Password must contain at least 4 characters')
        cy.get(sign_up_page.password_field).clear()
    })
    it('should show validation errors for password confirmation field', () => {
        cy.get(sign_up_page.confirmPassword_validation_message).should('not.exist')
        cy.get(sign_up_page.confirmPassword_field).click().blur()
        cy.get(sign_up_page.confirmPassword_validation_message).should('be.visible').and('have.text', 'Confirm your password')
        cy.get(sign_up_page.confirmPassword_field).type('qweqwe').blur()
        cy.get(sign_up_page.confirmPassword_validation_message).should('be.visible').and('have.text', 'Password does not match')
        cy.get(sign_up_page.confirmPassword_field).clear().blur()
    })
    it('should allow user to sign up', () => {
        const userName = sign_up_page.generateUsername()
        const password = 'RestTest1!'
        cy.intercept("POST", "/users").as("signup")
        cy.get(sign_up_page.firstName_field).type('Oliver').should('have.value', 'Oliver')
        cy.get(sign_up_page.lastName_field).type('Sykes').should('have.value', 'Sykes')
        cy.get(sign_up_page.username_field).type(userName).should('have.value', userName)
        cy.get(sign_up_page.password_field).type(password).should('have.value', password)
        cy.get(sign_up_page.confirmPassword_field).type(password).should('have.value', password)
        cy.get(sign_up_page.confirmPassword_validation_message).should('not.exist')
        cy.get(sign_up_page.signUp_button).should('be.enabled')
            .click().wait('@signup').its('response.statusCode').should('eq', 201)
    })
    it('should allow user to sign in with valid credentials', () => {
        cy.intercept('POST', '/login').as('signin')
        cy.visit('/')
        cy.get(sign_in_page.username_field).type('oliversykes').should('have.value', 'oliversykes')
        cy.get(sign_in_page.password_field).type('RestTest1!').should('have.value', 'RestTest1!')
        cy.get(sign_in_page.signIn_button).should('be.enabled')
            .click().wait('@signin').its('response.statusCode').should('eq', 200)
    })
    it('should allow a visitor to logout', () => {
        cy.intercept('POST', '/logout').as('logout')
        cy.get(main_page.logout_button).click()
        cy.url().should('contain', 'signin')
    })
    it('should display login errors while logging with invalid credentials', () => {
        cy.get(sign_in_page.username_field).type('oliversykes')
        cy.get(sign_in_page.password_field).type('asdasd')
        cy.get(sign_in_page.signIn_button).click()
        cy.get(sign_in_page.signIn_error).should('be.visible').and('have.text', 'Username or password is invalid')
    })
    it('should show error when inputted password is less than 4 symbols', () => {
        cy.get(sign_in_page.username_field).type('oliversykes')
        cy.get(sign_in_page.password_field).type('123').blur()
        cy.get(sign_in_page.password_validation_message).should('be.visible').and('have.text', 'Password must contain at least 4 characters')
        cy.get(sign_in_page.password_field).type('1234').blur()
        cy.get(sign_in_page.password_validation_message).should('not.exist')
    })

})