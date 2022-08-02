/// <reference types="cypress" />
import { functions } from "../helpers/functions";
import { main_page } from "../selectors/main_page";
import { sign_in_page } from "../selectors/sign_in_page";
import { sign_up_page } from "../selectors/sign_up_page";

describe("UI tests for sign in page", () => {
  before("visiting sign in page", () => {
    cy.task("db:seed");
    cy.visit("/");
  });

  it('should show "Real World App logo"', () => {
    cy.get(sign_in_page.logo_image)
      .should("be.visible")
      .and("have.attr", "xmlns", "http://www.w3.org/2000/svg");
  });

  it('should show "Sign in" title', () => {
    cy.get(sign_in_page.title_text)
      .should("be.visible")
      .and("have.text", "Sign in");
  });

  it("should show typeable Username field", () => {
    cy.get(sign_in_page.username_field)
      .should("be.visible")
      .type("asdasd")
      .clear();
  });

  it("should show typeable Password field", () => {
    cy.get(sign_in_page.password_field)
      .should("be.visible")
      .type("asdasd")
      .clear();
  });

  it("should show Username and Password placeholders", () => {
    cy.get(sign_in_page.username_title).should("have.text", "Username");
    cy.get(sign_in_page.password_title).should("have.text", "Password");
  });

  it("should show 'Username is required' error if user clicks on it and then click outside this field and didn't enter any value", () => {
    cy.reload();
    cy.get(sign_in_page.username_validation_message).should("not.exist");
    cy.get(sign_in_page.username_field).click().blur();
    cy.get(sign_in_page.username_validation_message).should("be.visible");
  });

  it('check "Remember me" checkbox', () => {
    cy.get(sign_in_page.rememberMe_checkbox)
      .should("not.be.checked")
      .check()
      .should("be.checked");
  });

  it("should show disabled by default sign in btn", () => {
    cy.reload();
    cy.get(sign_in_page.signIn_button).should("be.disabled"); //this button is enabled by default in the app so test fails :)
  });

  it("should have 'Don't have an account? Sign Up' clickable link under 'Sign in' btn", () => {
    cy.get(sign_in_page.signUp_link)
      .should("have.text", "Don't have an account? Sign Up")
      .and("have.attr", "href", "/signup");
  });

  it("should show Cypress copyright link that leads to 'https://www.cypress.io/'", () => {
    cy.get(sign_in_page.cypress_copyright)
      .should("have.attr", "href", "https://cypress.io")
      .and("have.attr", "target", "_blank"); //check that the link will be opened in a new tab
  });

  it.skip("should open cypress.io link by clicking on cypress copyright", () => {
    cy.get(sign_in_page.cypress_copyright)
      .should("have.attr", "href", "https://cypress.io")
      .and("have.attr", "target", "_blank") //check that the link will be opened in a new tab
      .invoke("removeAttr", "target")
      .click(); //remove the attribute and open the link in the current tab instead of new one
    //this will fail anyway, because cypress don't support redirection between different superdomains
    //"chromeWebSecurity: false" could be added to cypress config as workaround
    cy.url().should("eq", "https://www.cypress.io/");
  });
});

describe("Sign-in, sign-up, logout checks", () => {
  const userName = functions.generateUsername();
  const password = "RestTest1!";

  before("Visit sign-up page", () => {
    cy.visit("/");
    cy.get(sign_in_page.signUp_link).click();
    cy.url().should("contain", "/signup");
  });

  it("should show validation errors for first name field", () => {
    cy.get(sign_up_page.firstName_validation_message).should("not.exist");
    cy.get(sign_up_page.firstName_field).click().blur();
    cy.get(sign_up_page.firstName_validation_message)
      .should("be.visible")
      .and("have.text", "First Name is required");
  });

  it("should show validation errors for last name field", () => {
    cy.get(sign_up_page.lastName_validation_message).should("not.exist");
    cy.get(sign_up_page.lastName_field).click().blur();
    cy.get(sign_up_page.lastName_validation_message)
      .should("be.visible")
      .and("have.text", "Last Name is required");
  });

  it("should show validation errors for username field", () => {
    cy.get(sign_up_page.username_validation_message).should("not.exist");
    cy.get(sign_up_page.username_field).click().blur();
    cy.get(sign_up_page.username_validation_message)
      .should("be.visible")
      .and("have.text", "Username is required");
  });

  it("should show validation errors for password field", () => {
    cy.get(sign_up_page.password_validation_message).should("not.exist");
    cy.get(sign_up_page.password_field).click().blur();
    cy.get(sign_up_page.password_validation_message)
      .should("be.visible")
      .and("have.text", "Enter your password");
    cy.get(sign_up_page.password_field).type("123").blur();
    cy.get(sign_up_page.password_validation_message)
      .should("be.visible")
      .and("have.text", "Password must contain at least 4 characters");
    cy.get(sign_up_page.password_field).clear();
  });

  it("should show validation errors for password confirmation field", () => {
    cy.get(sign_up_page.confirmPassword_validation_message).should("not.exist");
    cy.get(sign_up_page.confirmPassword_field).click().blur();
    cy.get(sign_up_page.confirmPassword_validation_message)
      .should("be.visible")
      .and("have.text", "Confirm your password");
    cy.get(sign_up_page.confirmPassword_field).type("qweqwe").blur();
    cy.get(sign_up_page.confirmPassword_validation_message)
      .should("be.visible")
      .and("have.text", "Password does not match");
    cy.get(sign_up_page.confirmPassword_field).clear();
  });

  it("should allow user to sign up", () => {
    cy.signup_ui(userName, password);
  });

  it("should allow user to sign in to newly created account with valid credentials", () => {
    cy.signin_ui(userName, password);
    cy.get(main_page.getStarted_window)
      .should("be.visible")
      .and("contain.text", "Get Started with Real World App");
  });

  it("should allow user to complete onboarding flow", () => {
    cy.onboarding_ui();
  });

  it("should allow a visitor to logout", () => {
    cy.logout_ui();
  });

  it("should display login errors while logging with invalid credentials", () => {
    cy.get(sign_in_page.username_field).type("oliversykes");
    cy.get(sign_in_page.password_field).type("asdasd");
    cy.get(sign_in_page.signIn_button).click();
    cy.get(sign_in_page.signIn_error)
      .should("be.visible")
      .and("have.text", "Username or password is invalid");
  });

  it("should show error when inputted password is less than 4 symbols", () => {
    cy.get(sign_in_page.username_field).type("oliversykes");
    cy.get(sign_in_page.password_field).type("123").blur();
    cy.get(sign_in_page.password_validation_message)
      .should("be.visible")
      .and("have.text", "Password must contain at least 4 characters");
    cy.get(sign_in_page.password_field).type("1234").blur();
    cy.get(sign_in_page.password_validation_message).should("not.exist");
  });
});
