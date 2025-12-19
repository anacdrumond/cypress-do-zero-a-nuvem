/*describe('template spec', () => {
  it('Acessando Site', () => {
    cy.visit('./src/index.html')
  })
})*/

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche o campo nome do formulário', () => {
    cy.get('#firstName').type('Ana Carolina').should('have.value', 'Ana Carolina')
  })
 it('preenche os campos obrigatórios e envia o formulário', () => {
  cy.clock()  
  cy.get('#firstName').as('Nome')
    cy.get('@Nome').type('Ana Carolina')
    cy.get('#lastName').type('Costa Drumond')
    cy.get('#email').type('anacdreads@gmail.com')
    cy.get('#phone').type('27992231429')
    //cy.get('#product').select('Blog')
    //cy.get('#support-type > nth-child(2) > input').check('ajuda')
    //cy.get('#check > nth-child(1) > input').check('email')
    cy.get('#open-text-area').type('Teste de escrita no campo de texto.', {delay: 50})
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  cy.tick(3000)
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()
    cy.get('#firstName').as('Nome')
    cy.get('@Nome').type('Ana Carolina')
    cy.get('#lastName').type('Costa Drumond')
    cy.get('#email').type('anacd.com')
    cy.get('#phone').type('27992231429')
    cy.get('#open-text-area').type('Teste de escrita no campo de texto.', {delay: 0})
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
    cy.tick(5000)
  })

  it('validar que o valor no campo de telefone continua vazio se a entrada não for valor numérico', () => {
    cy.get('#phone')
      .type('abdcsd')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    //ação:
    cy.get('#firstName').as('Nome')
    cy.get('@Nome').type('Ana Carolina')
    cy.get('#lastName').type('Costa Drumond')
    cy.get('#email').type('anacd@gmail.com')
    cy.get('#phone-checkbox').check('phone')
    cy.get('#open-text-area').type('Teste de escrita no campo de texto.', {delay: 0})
    cy.get('button[type="submit"]').click()
    //verificação:
    cy.get('.error').should('be.visible')
    cy.tick(3000)
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').as('Nome')
      cy.get('@Nome').type('Ana Carolina')
        .should('have.value','Ana Carolina')
        .clear().should('have.value', '')

    cy.get('#lastName').type('Costa Drumond')
      .should('have.value','Costa Drumond')
      .clear().should('have.value', '')

    cy.get('#email').type('anacd@gmail.com')
      .should('have.value','anacd@gmail.com')
      .clear().should('have.value', '')

    cy.get('#phone').type('27992231429')
      .should('have.value','27992231429')
      .clear().should('have.value', '')
  })  

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()
    //ação:
    cy.get('button[type="submit"]').click()
    //verificação:
    cy.get('.error').should('be.visible')
    cy.tick(3000)
  })

  it("Testando comando customizado", () => {
    cy.testeComandosCuston()
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  //exercício - Módulo 03
  it("selecionando por texto", () => {
    cy.get('select')
      .select('YouTube')
      .should('have.value','youtube')
  })

  //exercício extra 1 - Módulo 03
  it("selecionando por value", () => {
    cy.get('select')
      .select('mentoria')
      .should('have.value','mentoria')
  })

  //exercício extra 2 - Módulo 03
  it("selecionando por índice", () => {
    cy.get('select')
      .select(1)
      .should('have.value','blog')
  })

  //exercício - Módulo 04
  it("marca o tipo de atendimento Feedback", () => {
    cy.get('input[type="radio"]')
      .check('feedback')
      .should('be.checked')
  })

  //exercício extra 1 - Módulo 04
  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').each((typeofService) => {
        cy.wrap(typeofService)
          .check()
          .should('be.checked')
    })
  })

  //exercício - Módulo 05
  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]').each((typeofService) => {
        cy.wrap(typeofService)
          .check()
          .should('be.checked')
    })
    cy.get('input[type="checkbox"]')
      .last()
      .uncheck()
      .should('not.be.checked')
    })

    //exercício - Módulo 06
  it("seleciona um arquivo externo", () => {
    cy.get('input[type="file"]')
      .selectFile("C:/Users/Adm/Pictures/Screenshots/Captura de tela 2025-11-11 102749.png")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("Captura de tela 2025-11-11 102749.png")
      })
  })

    //exercício extra 1 - Módulo 06
  it("seleciona um arquivo simulando drag-drop", () => {
    cy.get('input[type="file"]')
      .selectFile('C:/Users/Adm/Pictures/Screenshots/Captura de tela 2025-11-11 102749.png', {action: 'drag-drop'})
      .should((input) => {
        expect(input[0].files[0].name).to.equal("Captura de tela 2025-11-11 102749.png")
      })
  })

    //exercício extra 2 - Módulo 06
  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
      cy.fixture('example.json').as('myFile')
      cy.get('input[type="file"]')
      .selectFile('@myFile')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

    //exercício - Módulo 07
  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
      cy.get('a[href="privacy.html"]')
        .should('have.attr', 'target', '_blank')
        .and('have.attr', 'href', 'privacy.html')
  })

    //exercício extra 1 - Módulo 07
  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
      cy.get('#privacy')
        .invoke('removeAttr', 'target')
  })

    //exercício extra 1 - Módulo 12
    Cypress._.times(3, () => {
  it("marca o tipo de atendimento Feedback repetidas vezes", () => {
    cy.get('input[type="radio"]')
      .check('feedback')
      .should('be.checked')
    })
  })

    //exercício extra 2 - Módulo 12
  it("exibe e oculta as mensagens de sucesso e erro usando .invoke()", () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
   })

    //exercício extra 3 - Módulo 12
  it("preenche o campo da área de texto usando o comando invoke", () => {
    cy.get('#firstName').invoke()
    cy.get('@Nome').type('Ana Carolina')
    cy.get('#lastName').type('Costa Drumond')
    cy.get('#email').type('anacdreads@gmail.com')
    cy.get('#phone').type('27992231429')
    cy.get('#open-text-area').type('Teste de escrita no campo de texto.')
    //cy.get('button[type="submit"]').click()
  })
})
        