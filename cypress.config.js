const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    watchForFileChanges: true,
    numTestsKeptInMemory: 50,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    retries: {
      runMode: 2,
      openMode: 1,
    },
    setupNodeEvents(on, config) {

    },
  },
});
