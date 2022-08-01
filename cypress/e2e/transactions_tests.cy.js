///<reference types="cypress"/>
import { main_page } from "../selectors/main_page";
import { transactions } from "../selectors/transactions";

const transactionAmount = "5";
const noteText = "I'll have two number 9s, number 9 large";

describe("User is able to create transactions", () => {
  const userName = "Allie2";
  const password = "s3cret";
  const searchAttrs = [
    "firstName",
    "lastName",
    "username",
    "email",
    "phoneNumber",
  ];

  const targetUser = {
    firstName: "Edgar",
    lastName: "Johns",
    username: "Katharina_Bernier",
    email: "Norene39@yahoo.com",
    phoneNumber: "625-316-9882",
  };

  beforeEach("signin", () => {
    cy.intercept("GET", "/users").as("getUsers");
    cy.intercept("POST", "/transactions").as("createTransaction");
    cy.intercept("GET", "/checkAuth").as("checkAuth");
    cy.intercept("GET", "/users/search*").as("usersSearch");
    cy.signin_ui(userName, password);
    cy.get(main_page.newTransaction_button).click();
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

  searchAttrs.forEach((attr) => {
    it(`Searching by "${attr}" attribute`, () => {
      cy.wait("@getUsers");
      cy.get(transactions.search_input).type(targetUser[attr]);
      cy.wait("@usersSearch")
        .its("response.body.results")
        .should("have.length.gt", 0)
        .its("length")
        .then((resultsN) => {
          cy.get(transactions.contacts_list_item)
            .should("have.length", resultsN)
            .first()
            .contains(targetUser[attr]);
        });
      cy.focused().clear();
      cy.get(transactions.contacts_list).should("be.empty");
    });
  });
});

context("User is able to receive pay and request transactions", () => {
  const payerUserName = "Allie2";
  const receiverUserName = "Katharina_Bernier";
  const password = "s3cret";

  beforeEach("signin", () => {
    cy.intercept("GET", "/users").as("getUsers");
    cy.intercept("POST", "/transactions").as("createTransaction");
    cy.intercept("GET", "/checkAuth").as("checkAuth");
    cy.intercept("PATCH", "/transactions/*").as("updateTransaction");
  });

  it("submits a transaction payment and verifies the deposit for the receiver", () => {
    let payerStartBalance, receiverStartBalance;

    cy.signin_ui(receiverUserName, password);
    cy.get(transactions.user_balance)
      .invoke("text")
      .then((x) => {
        receiverStartBalance = x;
        expect(receiverStartBalance).to.match(/\$\d/);
      });
    cy.logout_ui();
    cy.signin_ui(payerUserName, password);
    cy.get(transactions.user_balance)
      .invoke("text")
      .then((x) => {
        payerStartBalance = x;
        expect(payerStartBalance).to.match(/\$\d/);
      });
    cy.get(main_page.newTransaction_button).click();
    transactions.createPayTransaction(transactionAmount, noteText);
    cy.get(transactions.user_balance).should(($el) => {
      expect($el.text()).to.not.equal(payerStartBalance);
    });
    cy.logout_ui();
    cy.signin_ui(receiverUserName, password);
    cy.get(transactions.user_balance).should(($el) => {
      expect($el.text()).to.not.equal(receiverStartBalance);
    });
  });

  it("submits a transaction request and accepts the request for the receiver", () => {
    let receiverStartBalance;

    cy.signin_ui(payerUserName, password);
    cy.get(transactions.user_balance)
      .invoke("text")
      .then((x) => {
        receiverStartBalance = x; // something like "$1,484.81"
        expect(receiverStartBalance).to.match(/\$\d/);
      });
    cy.get(main_page.newTransaction_button).click();
    transactions.createRequestTransaction(transactionAmount, noteText);
    cy.logout_ui();
    cy.signin_ui(receiverUserName, password);
    cy.get(main_page.mine_tab).click();
    cy.get(transactions.transaction_item)
      .first()
      .should("contain", noteText)
      .click({ force: true });
    cy.get(transactions.accept_transaction_request_button).click();
    cy.wait("@updateTransaction").its("response.statusCode").should("eq", 204);
    cy.logout_ui();
    cy.signin_ui(payerUserName, password);
    cy.get(transactions.user_balance).should(($el) => {
      expect($el.text()).to.not.equal(receiverStartBalance);
    });
  });
});
