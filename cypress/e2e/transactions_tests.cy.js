///<reference types="cypress"/>
import { main_page } from "../selectors/main_page";
import { transactions } from "../selectors/transactions";

describe("transactions tests", () => {
  const userName = "Giovanna74";
  const password = "s3cret";
  const transactionAmount = "123";
  const noteText = "I'll have two number 9s, number 9 large";

  beforeEach("signin", () => {
    cy.intercept("GET", "/users").as("getUsers");
    cy.intercept("POST", "/transactions").as("createTransaction");
    cy.signin_ui(userName, password);
    cy.get(main_page.newTransaction_button).click();
  });

  it("navigates to the new transaction form, selects a user and submits a transaction payment", () => {
    cy.wait("@getUsers").its("response.statusCode").should("eq", 200);
    cy.get(transactions.contacts_list)
      .should("be.visible")
      .contains("Edgar Johns")
      .click();
    cy.get(transactions.selected_contact_title).should(
      "have.text",
      "Edgar Johns"
    );
    cy.get(transactions.amount_field)
      .type("123")
      .should("contain.value", transactionAmount);
    cy.get(transactions.note_field)
      .type(noteText)
      .should("contain.value", noteText);
    cy.get(transactions.pay_button).click();
    cy.wait("@createTransaction").its("response.statusCode").should("eq", 200);
    cy.get(transactions.transaction_success_message)
      .should("be.visible")
      .and("contain.text", transactionAmount)
      .and("contain.text", noteText);
  });
});
