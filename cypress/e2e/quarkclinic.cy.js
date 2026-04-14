describe("QuarkClinic - Teste Inicial", () => {
  it("Deve abrir a página inicial e carregar opções de agendamento", () => {
    cy.visit("https://agendamento.quarkclinic.com.br/index/363622206");

    cy.contains("Consulta Presencial", { timeout: 10000 })
      .should("be.visible");
  });
});