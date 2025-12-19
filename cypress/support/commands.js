// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//criando comandos:
Cypress.Commands.add('testeComandosCuston', () => {
    cy.get('#firstName').as('Nome')
    cy.get('@Nome').type('Ana Carolina')
    cy.get('#lastName').type('Costa Drumond')
    cy.get('#email').type('anacdreads@gmail.com')
    cy.get('#phone').type('27992231429')
    cy.get('#open-text-area').type('Teste de escrita no campo de texto.')
    //cy.get('button[type="submit"]').click()
})