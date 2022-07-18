const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'vixnrq',
  e2e: {
    baseUrl: 'http://localhost:3000',
    retries: {
      runMode: 2,
      openMode: 1,
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {

    },
  },
});
