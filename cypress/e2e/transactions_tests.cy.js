///<reference types="cypress"/>
import { main_page } from "../selectors/main_page";
import { transactions } from "../selectors/transactions";

describe("transactions tests", () => {
  const userName = "Allie2";
  const password = "s3cret";
  const transactionAmount = "5";
  const noteText = "I'll have two number 9s, number 9 large";

  beforeEach("signin", () => {
    cy.intercept("GET", "/users").as("getUsers");
    cy.intercept("POST", "/transactions").as("createTransaction");
    cy.signin_ui(userName, password);
    cy.get(main_page.newTransaction_button).click();
    cy.wait("@getUsers");
  });

  it("navigates to the new transaction form, selects a user and submits a transaction payment", () => {
    cy.get(transactions.contacts_list)
      .should("be.visible")
      .contains("Edgar Johns")
      .click();
    cy.get(transactions.selected_contact_title).should(
      "have.text",
      "Edgar Johns"
    );
    cy.get(transactions.amount_field)
      .type(transactionAmount)
      .should("contain.value", transactionAmount);
    cy.get(transactions.note_field)
      .type(noteText)
      .should("contain.value", noteText);
    cy.get(transactions.pay_button).click();
    cy.wait("@createTransaction").its("response.statusCode").should("eq", 200);
  });

  it("navigates to the new transaction form, selects a user and submits a transaction request", () => {
    cy.get(transactions.contacts_list)
      .should("be.visible")
      .contains("Edgar Johns")
      .click();
    cy.get(transactions.selected_contact_title).should(
      "have.text",
      "Edgar Johns"
    );
    cy.get(transactions.amount_field)
      .type(transactionAmount)
      .should("contain.value", transactionAmount);
    cy.get(transactions.note_field)
      .type(noteText)
      .should("contain.value", noteText);
    cy.get(transactions.request_button).click();
    cy.wait("@createTransaction").its("response.statusCode").should("eq", 200);
  });

  it("displays new transaction errors", () => {
    cy.get(transactions.contacts_list)
      .should("be.visible")
      .contains("Edgar Johns")
      .click();
    cy.get(transactions.amount_field).clear().blur();
    cy.get(transactions.note_field).clear().blur();
    cy.get(transactions.amount_validation_message)
      .should("be.visible")
      .and("have.text", "Please enter a valid amount");
    cy.get(transactions.note_validation_message)
      .should("be.visible")
      .and("have.text", "Please enter a note");
    cy.get(transactions.pay_button).should("be.disabled");
    cy.get(transactions.request_button).should("be.disabled");
  });
});
