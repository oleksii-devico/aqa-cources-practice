const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "vixnrq",
  e2e: {
    baseUrl: "http://localhost:3000",
    retries: {
      runMode: 1,
      openMode: 0,
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
