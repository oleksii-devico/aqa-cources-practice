const { default: axios } = require("axios");
const { defineConfig } = require("cypress");

testDataApiEndpoint = "http://localhost:3001/testData";

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
      on("task", {
        async "db:seed"() {
          // seed database with test data
          const { data } = await axios.post(`${testDataApiEndpoint}/seed`);
          return data;
        },
      });
    },
  },
});
