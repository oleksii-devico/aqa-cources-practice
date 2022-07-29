///<reference types="cypress"/>
import { main_page } from "../selectors/main_page";
import { transactions } from "../selectors/transactions";

const transactionAmount = "5";
const noteText = "I'll have two number 9s, number 9 large";

describe("User is able to create transactions", () => {
  const userName = "Allie2";
  const password = "s3cret";

  beforeEach("signin", () => {
    cy.intercept("GET", "/users").as("getUsers");
    cy.intercept("POST", "/transactions").as("createTransaction");
    cy.intercept("GET", "/checkAuth").as("checkAuth");
    cy.signin_ui(userName, password);
    cy.get(main_page.newTransaction_button).click();
  });

  after("logout", () => {
    cy.logout_ui();
  });

  it("navigates to the new transaction form, selects a user and submits a transaction payment", () => {
    transactions.createPayTransaction(transactionAmount, noteText);
  });

  it("navigates to the new transaction form, selects a user and submits a transaction request", () => {
    transactions.createRequestTransaction(transactionAmount, noteText);
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

describe("User is able to receive pay and request transactions", () => {
  const payerUserName = "Allie2";
  const receiverUserName = "Katharina_Bernier";
  const password = "s3cret";

  beforeEach("signin", () => {
    cy.intercept("GET", "/users").as("getUsers");
    cy.intercept("POST", "/transactions").as("createTransaction");
    cy.intercept("GET", "/checkAuth").as("checkAuth");
  });

  /*afterEach("logout", () => {
    cy.logout_ui();
  });*/

  it("submits a transaction payment and verifies the deposit for the receiver", () => {
    let payerStartBalance, receiverStartBalance;

    cy.signin_ui(receiverUserName, password);
    cy.get(transactions.user_balance)
      .invoke("text")
      .then((x) => {
        receiverStartBalance = x; // something like "$1,484.81"
        expect(receiverStartBalance).to.match(/\$\d/);
      });
    cy.logout_ui();
    cy.signin_ui(payerUserName, password);
    cy.get(transactions.user_balance)
      .invoke("text")
      .then((x) => {
        payerStartBalance = x; // something like "$1,484.81"
        expect(payerStartBalance).to.match(/\$\d/);
      });
    cy.get(main_page.newTransaction_button).click();
    transactions.createPayTransaction(transactionAmount, noteText);
    cy.get(transactions.user_balance).should(($el) => {
      expect($el.text()).to.not.equal(payerStartBalance);
    });
    cy.logout_ui();
    cy.signin_ui(receiverUserName, password);
    cy.url().should("not.contain", "/signin");
    cy.get(transactions.user_balance).should(($el) => {
      expect($el.text()).to.not.equal(receiverStartBalance);
    });
  });
});
