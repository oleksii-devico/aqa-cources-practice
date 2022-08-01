import { main_page } from "../selectors/main_page";
import { sign_in_page } from "../selectors/sign_in_page";
import { sign_up_page } from "../selectors/sign_up_page";

Cypress.Commands.add("signup_ui", (userName, password) => {
  cy.clearCookies();
  cy.intercept("POST", "/users").as("signup");
  cy.visit("/");
  cy.get(sign_in_page.signUp_link).click();
  cy.url().should("contain", "/signup");
  cy.get(sign_up_page.firstName_field)
    .type("Oliver")
    .should("have.value", "Oliver");
  cy.get(sign_up_page.lastName_field)
    .type("Sykes")
    .should("have.value", "Sykes");
  cy.get(sign_up_page.username_field)
    .type(userName)
    .should("have.value", userName);
  cy.get(sign_up_page.password_field)
    .type(password)
    .should("have.value", password);
  cy.get(sign_up_page.confirmPassword_field)
    .type(password)
    .should("have.value", password);
  cy.get(sign_up_page.confirmPassword_validation_message).should("not.exist");
  cy.get(sign_up_page.signUp_button)
    .should("be.enabled")
    .click()
    .wait("@signup")
    .its("response.statusCode")
    .should("eq", 201);
});

Cypress.Commands.add("signin_ui", (userName, password) => {
  cy.clearCookies();
  cy.intercept("POST", "/login").as("signin");
  cy.visit("/");
  cy.get(sign_in_page.username_field)
    .type(userName)
    .should("have.value", userName);
  cy.get(sign_in_page.password_field)
    .type(password)
    .should("have.value", password);
  cy.get(sign_in_page.signIn_button)
    .should("be.enabled")
    .click()
    .wait("@signin")
    .its("response.statusCode")
    .should("eq", 200);
  cy.url().should("not.contain", "/signin");
});

Cypress.Commands.add("onboarding_ui", () => {
  cy.get(main_page.getStarted_window)
    .should("be.visible")
    .and("contain.text", "Get Started with Real World App");
  cy.get(main_page.getStartedNext_button).click();
  cy.get(main_page.onboarding_bankName_field)
    .type("Big Bank")
    .should("have.value", "Big Bank");
  cy.get(main_page.onboarding_routingNumber_field)
    .type("123123123")
    .should("have.value", "123123123");
  cy.get(main_page.onboarding_accountNumber_field)
    .type("123123123")
    .should("have.value", "123123123");
  cy.get(main_page.onboarding_submit_button).click();
  cy.get(main_page.onboarding_success_window)
    .should("be.visible")
    .and("contain.text", "Finished");
  cy.get(main_page.getStartedNext_button).click();
  cy.get(main_page.getStarted_window).should("not.exist");
});

Cypress.Commands.add("logout_ui", () => {
  cy.intercept("POST", "/logout").as("logout");
  cy.get(main_page.logout_button).click();
  cy.url().should("contain", "signin");
});
