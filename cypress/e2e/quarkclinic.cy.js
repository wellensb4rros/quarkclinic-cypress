function gerarEmailUnico() {
  const numero = Date.now();
  return `teste${numero}@email.com`;
}

describe("QuarkClinic - Testes E2E", () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("Fluxo 1 - Cadastro de Novo Usuário", () => {
    cy.visit("https://agendamento.quarkclinic.com.br/index/363622206");

    cy.contains("Login", { timeout: 10000 }).click();
    cy.contains("Cadastre-se", { timeout: 10000 }).click();

    const email = gerarEmailUnico();
    const cpf = "01124457488";

    cy.get('[data-cy="campo-nome-input"]').filter(":visible").first().type("Teste Cypress");

    cy.get('[data-cy="campo-telefone-input"]').filter(":visible").first().type("84999999999");

    cy.get('[data-cy="campo-sexo-select"]').filter(":visible").first().select("FEMININO");

    cy.get('[data-cy="campo-data-nascimento-input"]').filter(":visible").first().type("10/10/2000");

    cy.get('[data-cy="campo-email-input"]').filter(":visible").first().type(email);

    cy.get('[data-cy="campo-tipo-documento-select"]').filter(":visible").first().select("CPF");

    cy.get('[data-cy="campo-numero-documento-input"]').filter(":visible").first().type(cpf);

    cy.get('[data-cy="campo-senha-input"]').filter(":visible").first().type("violet01");

    cy.get('[data-cy="campo-confirmar-senha-input"]').filter(":visible").first().type("violet01");

    cy.get("#cb-cadastro").check({ force: true });

    cy.get('[data-cy="btn-criar-conta"]').filter(":visible").first().click();

    cy.contains("Consulta Presencial", { timeout: 15000 }).should("be.visible");
  });

  it("Fluxo 2 - Login com usuário existente", () => {
    cy.visit("https://agendamento.quarkclinic.com.br/index/363622206");

    cy.login("violet_s@gmail.com", "violet01");
  });

  it("Fluxo 3 - Agendamento de Consulta Presencial", () => {
    cy.visit("https://agendamento.quarkclinic.com.br/index/363622206");

    cy.login("violet_s@gmail.com", "violet01");

    cy.contains("Consulta Presencial", { timeout: 15000 })
      .should("be.visible")
      .click();

    cy.contains("PARTICULAR", { timeout: 15000 }).click();

    cy.contains("CARDIOLOGIA", { timeout: 15000 }).click();

    cy.get("label").contains("CLINICA").click();

    cy.get('[data-cy^="agenda-item-horario-texto"]')
      .filter(":visible")
      .first()
      .invoke("text")
      .then((horarioSelecionado) => {
        cy.wrap(horarioSelecionado.trim()).as("horarioSelecionado");
      });

    cy.get('[data-cy^="agenda-item-horario-texto"]')
      .filter(":visible")
      .first()
      .click();

    cy.contains("Paciente", { timeout: 15000 }).should("be.visible");

    cy.get("label").filter(":visible").first().click();

    cy.contains("Confirmação", { timeout: 15000 }).should("be.visible");

    cy.contains("CARDIOLOGIA", { timeout: 15000 }).should("be.visible");

    cy.get("@horarioSelecionado").then((horario) => {
      cy.contains(horario).should("be.visible");
    });

    cy.contains("Confirmar Agendamento").click();

    cy.contains(/Agendamento efetuado com sucesso!/i, { timeout: 20000 })
      .should("be.visible");
  });

});