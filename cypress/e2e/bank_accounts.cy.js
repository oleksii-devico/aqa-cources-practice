/// <reference types="cypress" />
import { functions } from "../helpers/functions";
import { bank_accounts_page } from "../selectors/bank_accounts_page";
import { main_page } from "../selectors/main_page";

describe("Create and delete bank accounts tests", () => {
  const userName = functions.generateUsername();
  const password = "RestTest1!";
  const bankName = "number nine bank";

  before("Prepare account", () => {
    cy.task("db:seed");
    cy.signup_ui(userName, password);
    cy.signin_ui(userName, password);
    cy.onboarding_ui();
    cy.logout_ui();
  });

  beforeEach(
    "Intercept graphql requests and proceed to bank accounts page",
    () => {
      cy.signin_ui(userName, password);
      cy.get(main_page.bankAccounts_tab).click();
      cy.url().should("contain", "bankaccounts");
      cy.intercept("POST", "/graphql", (req) => {
        const { body } = req;

        if (
          body.hasOwnProperty("operationName") &&
          body.operationName === "ListBankAccount"
        ) {
          req.alias = "gqlListBankAccountQuery";
        }

        if (
          body.hasOwnProperty("operationName") &&
          body.operationName === "CreateBankAccount"
        ) {
          req.alias = "gqlCreateBankAccountMutation";
        }

        if (
          body.hasOwnProperty("operationName") &&
          body.operationName === "DeleteBankAccount"
        ) {
          req.alias = "gqlDeleteBankAccountMutation";
        }
      });
    }
  );

  it("should display Create Bank Account form", () => {
    cy.get(bank_accounts_page.createBankAccount_button).click();
    cy.get(bank_accounts_page.createBankAccountForm_title)
      .should("be.visible")
      .and("have.text", "Create Bank Account");
    cy.get(bank_accounts_page.bankName_field)
      .should("be.visible")
      .and("have.attr", "placeholder", "Bank Name");
    cy.get(bank_accounts_page.routingNumber_field)
      .should("be.visible")
      .and("have.attr", "placeholder", "Routing Number");
    cy.get(bank_accounts_page.accountNumber_field)
      .should("be.visible")
      .and("have.attr", "placeholder", "Account Number");
    cy.get(bank_accounts_page.submit_button).should("be.visible");
  });

  it("should display validation errors for Bank Name field", () => {
    cy.get(bank_accounts_page.createBankAccount_button).click();
    cy.get(bank_accounts_page.bankName_field).clear().blur();
    cy.get(bank_accounts_page.bankName_validation_message)
      .should("be.visible")
      .and("have.text", "Enter a bank name");
    cy.get(bank_accounts_page.bankName_field).type("1234").blur();
    cy.get(bank_accounts_page.bankName_validation_message)
      .should("be.visible")
      .and("have.text", "Must contain at least 5 characters");
  });

  it("should display validation errors for Routing Number field", () => {
    cy.get(bank_accounts_page.createBankAccount_button).click();
    cy.get(bank_accounts_page.routingNumber_field).click().blur();
    cy.get(bank_accounts_page.routingNumber_validation_message)
      .should("be.visible")
      .and("have.text", "Enter a valid bank routing number");
    cy.get(bank_accounts_page.routingNumber_field)
      .clear()
      .type("12345678")
      .blur();
    cy.get(bank_accounts_page.routingNumber_validation_message)
      .should("be.visible")
      .and("have.text", "Must contain a valid routing number");
    cy.get(bank_accounts_page.routingNumber_field)
      .clear()
      .type("1234567890")
      .blur();
    cy.get(bank_accounts_page.routingNumber_validation_message)
      .should("be.visible")
      .and("have.text", "Must contain a valid routing number");
  });

  it("should display validation errors for Account Number field", () => {
    cy.get(bank_accounts_page.createBankAccount_button).click();
    cy.get(bank_accounts_page.accountNumber_field).clear().blur();
    cy.get(bank_accounts_page.accountNumber_validation_message)
      .should("be.visible")
      .and("have.text", "Enter a valid bank account number");
    cy.get(bank_accounts_page.accountNumber_field).clear().type("12345678");
    cy.get(bank_accounts_page.accountNumber_validation_message)
      .should("be.visible")
      .and("have.text", "Must contain at least 9 digits");
    cy.get(bank_accounts_page.accountNumber_field)
      .clear()
      .type("1234567890123");
    cy.get(bank_accounts_page.accountNumber_validation_message)
      .should("be.visible")
      .and("have.text", "Must contain no more than 12 digits");
  });

  it("allows user to create new bank account", () => {
    cy.get(bank_accounts_page.createBankAccount_button).click();
    cy.get(bank_accounts_page.bankName_field).clear().type(bankName);
    cy.get(bank_accounts_page.routingNumber_field).clear().type("123123123");
    cy.get(bank_accounts_page.accountNumber_field).clear().type("1231231232");
    cy.get(bank_accounts_page.submit_button).should("be.enabled").click();
    cy.wait("@gqlCreateBankAccountMutation")
      .its("response.statusCode")
      .should("eq", 200);
    cy.get(bank_accounts_page.bankAccount_list).should("contain", bankName);
  });

  it("allows user to delete bank account", () => {
    cy.get(bank_accounts_page.deleteBankAccount_button).first().click();
    cy.wait("@gqlDeleteBankAccountMutation")
      .its("response.statusCode")
      .should("eq", 200);
    cy.get(bank_accounts_page.bankAccount_list).children().contains("Deleted");
  });
});
