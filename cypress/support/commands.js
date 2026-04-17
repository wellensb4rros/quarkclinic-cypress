Cypress.Commands.add('login', (usuario, senha) => {
  cy.contains("Login", { timeout: 10000 })
    .should("be.visible")
    .click();

  cy.get('[data-cy="campo-usuario-input"]')
    .filter(":visible")
    .first()
    .type(usuario);

  cy.get('[data-cy="campo-senha-input"]')
    .filter(":visible")
    .first()
    .type(senha);

  cy.get('[data-cy="btn-submit-login"]')
    .filter(":visible")
    .first()
    .click();

  cy.get("body").then(($body) => {
    if ($body.text().includes("Política de Privacidade")) {
      cy.contains("Eu concordo com a Política de Privacidade")
        .should("be.visible")
        .click();

      cy.get('[data-cy="btn-submit-login"]')
        .filter(":visible")
        .first()
        .click();
    }
  });

  cy.contains("Consulta Presencial", { timeout: 15000 })
    .should("be.visible");
});