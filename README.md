QuarkClinic - Automação E2E com Cypress

Este repositório contém a automação de testes End-to-End (E2E) desenvolvida com Cypress para o portal de agendamento online da QuarkClinic, como parte do processo seletivo para Estágio QA - Automação.

Portal testado:
https://agendamento.quarkclinic.com.br/index/363622206

📌 Objetivo do Projeto

Automatizar os principais fluxos da jornada do paciente no sistema de agendamento da QuarkClinic, validando a navegação e o comportamento do sistema de ponta a ponta.

🧪 Fluxos Automatizados

✅ Fluxo 1 - Cadastro de Novo Usuário
    Acessa a página inicial
    Abre tela de cadastro
    Preenche formulário com e-mail único
    Aceita os termos de uso
    Cria conta
    Valida se retornou para home logada

✅ Fluxo 2 - Login com Usuário Existente
    Realiza login com usuário já cadastrado
    Valida se o login foi realizado com sucesso

✅ Fluxo 3 - Agendamento de Consulta Presencial
    Realiza login
    Seleciona Consulta Presencial
    Escolhe Convênio Particular
    Escolhe Especialidade Cardiologia
    Seleciona clínica disponível
    Seleciona um horário disponível
    Seleciona paciente
    Confirma agendamento
    Valida mensagem de sucesso

🛠 Tecnologias Utilizadas
Node.js
Cypress (versão 15.4.0 recomendada)
JavaScript

📂 Estrutura do Projeto
cypress/e2e/quarkclinic.cy.js → testes automatizados
cypress/support/commands.js → comandos customizados (ex: login)
cypress.config.js → configurações gerais do Cypress

⚙️ Pré-requisitos

Antes de rodar o projeto, é necessário ter instalado:

Node.js (recomendado versão LTS)
NPM (já incluso com Node.js)

📥 Instalação

Clone este repositório:
git clone github.com/wellensb4rros/quarkclinic-cypress

Acesse a pasta do projeto:
cd quarkclinic-cypress

Instale as dependências:
npm install

▶️ Como executar os testes
Abrir o Cypress (modo interface)
npx cypress open
Executar os testes via terminal (modo headless)
npx cypress run

🌐 Interceptações de Requisições

O projeto utiliza cy.intercept() para capturar requisições e auxiliar na sincronização dos testes, evitando waits fixos e melhorando a estabilidade.

Exemplo:

cy.intercept('GET', '**/api/**').as('apiGet');
cy.intercept('POST', '**/api/**').as('apiPost');

📌 Observações Importantes
O fluxo de cadastro utiliza geração de e-mail único a cada execução para evitar duplicidade.
Algumas telas podem apresentar comportamentos dinâmicos dependendo da disponibilidade de horários e clínicas.

📄 Documentação Teórica 

O documento com os Fundamentos de Testes está disponível no repositório em formato PDF e contém:

Plano de Testes
Tipos de Testes (Black Box / White Box / Gray Box)
Casos de Teste manuais para a tela de Login

👩‍💻 Autora

Projeto desenvolvido por Wellen Barros como atividade prática para o processo seletivo da ESIG Group / Quark Tecnologia.


