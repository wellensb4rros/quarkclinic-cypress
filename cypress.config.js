const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    slowMo: 800,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
