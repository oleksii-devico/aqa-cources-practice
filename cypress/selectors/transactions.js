export const transactions = {
  contacts_list: '[data-test="users-list"]',
  selected_contact_title:
    ".MuiBox-root > .MuiGrid-container > :nth-child(2) > .MuiTypography-root",
  amount_field: "#amount",
  amount_validation_message: "#transaction-create-amount-input-helper-text",
  note_field: "#transaction-create-description-input",
  note_validation_message: "#transaction-create-description-input-helper-text",
  request_button: '[data-test="transaction-create-submit-request"]',
  pay_button: '[data-test="transaction-create-submit-payment"]',
  user_balance: '[data-test="sidenav-user-balance"]',
  transaction_item: '[data-test*="transaction-item"]',
  accept_transaction_request_button:
    '[data-test*="transaction-accept-request"]',
  createPayTransaction(transactionAmount, noteText) {
    cy.wait("@getUsers");
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
    cy.wait("@checkAuth");
  },
  createRequestTransaction(transactionAmount, noteText) {
    cy.wait("@getUsers");
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
    cy.wait("@checkAuth");
  },
};
