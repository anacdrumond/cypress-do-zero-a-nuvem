describe('template spec', () => {
  beforeEach(() => {
    cy.visit('./src/privacy.html')
  })
  it('passes', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
  })

  it('mudar id white-background', () => {
    cy.get('#white-background')
      .invoke('removeAttr', 'id')
  })
})