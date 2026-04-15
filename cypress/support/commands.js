Cypress.Commands.add("login", (email, senha) => {
  cy.visit("https://agendamento.quarkclinic.com.br/index/363622206");

  cy.contains("Login", { timeout: 10000 })
    .should("be.visible")
    .click();

  cy.get('[data-cy="campo-usuario-input"]', { timeout: 10000 })
    .should("be.visible")
    .type(email);

  cy.get('[data-cy="campo-senha-input"]')
    .should("be.visible")
    .type(senha);

  cy.get('[data-cy="btn-submit-login"]')
    .should("be.visible")
    .click();

  cy.contains("Consulta Presencial", { timeout: 10000 })
    .should("be.visible");
});