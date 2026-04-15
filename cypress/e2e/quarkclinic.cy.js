function gerarEmailUnico() {
  const numero = Date.now();
  return `teste${numero}@email.com`;
}

describe("QuarkClinic - Testes E2E", () => {
  it("Fluxo 1 - Cadastro de Novo Usuário", () => {
    cy.visit("https://agendamento.quarkclinic.com.br/index/363622206");

    cy.contains("Login", { timeout: 10000 }).should("be.visible").click();

    cy.contains("Cadastre-se", { timeout: 10000 }).should("be.visible").click();

    const email = gerarEmailUnico();
    const cpf = "01124457488";

    cy.get('[data-cy="campo-nome-input"]')
      .filter(":visible")
      .first()
      .type("Teste Cypress");

    cy.get('[data-cy="campo-telefone-input"]')
      .filter(":visible")
      .first()
      .type("84999999999");

    cy.get('[data-cy="campo-sexo-select"]')
      .filter(":visible")
      .first()
      .select("FEMININO");

    cy.get('[data-cy="campo-data-nascimento-input"]')
      .filter(":visible")
      .first()
      .type("10/10/2000");

    cy.get('[data-cy="campo-email-input"]')
      .filter(":visible")
      .first()
      .type(email);

    cy.get('[data-cy="campo-tipo-documento-select"]')
      .filter(":visible")
      .first()
      .select("CPF");

    cy.get('[data-cy="campo-numero-documento-input"]')
      .filter(":visible")
      .first()
      .type(cpf);

    cy.get('[data-cy="campo-senha-input"]')
      .filter(":visible")
      .first()
      .type("violet01");

    cy.get('[data-cy="campo-confirmar-senha-input"]')
      .filter(":visible")
      .first()
      .type("violet01");

    cy.get("#cb-cadastro").check({ force: true });

    cy.get('[data-cy="btn-criar-conta"]')
      .filter(":visible")
      .first()
      .click();

    cy.contains("Consulta Presencial", { timeout: 15000 }).should("be.visible");
  });

  it("Fluxo 2 - Login com usuário existente", () => {
    cy.visit("https://agendamento.quarkclinic.com.br/index/363622206");

    cy.contains("Login", { timeout: 10000 }).should("be.visible").click();

    cy.get('[data-cy="campo-usuario-input"]')
      .filter(":visible")
      .first()
      .type("violet_s@gmail.com");

    cy.get('[data-cy="campo-senha-input"]')
      .filter(":visible")
      .first()
      .type("violet01");

    cy.get('[data-cy="btn-submit-login"]')
      .filter(":visible")
      .first()
      .click();

    cy.contains("Consulta Presencial", { timeout: 10000 }).should("be.visible");
  });

  it("Fluxo 3 - Agendamento de Consulta Presencial", () => {
    cy.visit("https://agendamento.quarkclinic.com.br/index/363622206");

    cy.contains("Login", { timeout: 10000 }).should("be.visible").click();

    cy.get('[data-cy="campo-usuario-input"]')
      .filter(":visible")
      .first()
      .type("violet_s@gmail.com");

    cy.get('[data-cy="campo-senha-input"]')
      .filter(":visible")
      .first()
      .type("violet01");

    cy.get('[data-cy="btn-submit-login"]')
      .filter(":visible")
      .first()
      .click();

  // Fecha modal inicial se aparecer
    cy.get("body").then(($body) => {
      if ($body.find('[data-cy="modal-login-btn-fechar"]').length > 0) {
        cy.get('[data-cy="modal-login-btn-fechar"]').click();
      }
    });

    cy.contains("Consulta Presencial", { timeout: 15000 })
      .should("be.visible")
      .click();

    cy.contains("PARTICULAR", { timeout: 15000 })
      .should("be.visible")
      .click();

    cy.contains("CARDIOLOGIA", { timeout: 15000 })
      .should("be.visible")
      .click();

    cy.get("label", { timeout: 15000 })
      .contains("CLINICA")
      .should("be.visible")
      .click();

  // Captura horário antes de clicar
    cy.get('[data-cy^="agenda-item-horario-texto"]', { timeout: 15000 })
      .filter(":visible")
      .first()
      .invoke("text")
      .then((horarioSelecionado) => {
        cy.wrap(horarioSelecionado.trim()).as("horarioSelecionado");
      });

  // Clica no primeiro horário disponível
    cy.get('[data-cy^="agenda-item-horario-texto"]', { timeout: 15000 })
      .filter(":visible")
      .first()
      .click();

  // Se aparecer popup de login, faz login corretamente nele
    cy.get("body", { timeout: 15000 }).then(($body) => {
      if ($body.text().includes("Identifique-se")) {

        cy.get('[data-cy="campo-usuario-input"]', { timeout: 15000 })
          .filter(":visible")
          .first()
          .clear()
          .type("violet_s@gmail.com");

        cy.get('[data-cy="campo-senha-input"]', { timeout: 15000 })
          .filter(":visible")
          .first()
          .clear()
          .type("violet01");

      // Clica no checkbox pelo TEXTO (mais seguro)
        cy.contains("Eu concordo com a Política de Privacidade", { timeout: 15000 })
          .should("be.visible")
          .click();

        cy.get('[data-cy="btn-submit-login"]', { timeout: 15000 })
          .filter(":visible")
          .first()
          .click();
        
        cy.url({ timeout: 15000 }).should("include", "/paciente");
        cy.contains("Selecione o paciente", { timeout: 15000 }).should("be.visible");

      }
    });

  // Agora deve carregar etapa paciente
    cy.contains("Paciente", { timeout: 15000 }).should("be.visible");

  // Seleciona paciente clicando no label (mais seguro que input radio)
    cy.get("label", { timeout: 15000 })
      .filter(":visible")
      .first()
      .click();

  // Agora valida confirmação
    cy.contains("Confirmação", { timeout: 15000 }).should("be.visible");

    cy.contains("CARDIOLOGIA", { timeout: 15000 }).should("be.visible");

    cy.get("@horarioSelecionado").then((horario) => {
      cy.contains(horario, { timeout: 15000 }).should("be.visible");
    });

    cy.contains("Confirmar Agendamento", { timeout: 15000 })
      .should("be.visible")
      .click();

    cy.contains(/Agendamento efetuado com sucesso!/i, { timeout: 20000 })
      .should("be.visible");
  });
});