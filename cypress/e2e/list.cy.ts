describe('list page spec', () => {
  it('should be able to filter by name', () => {
    cy.visit('https://computer-database.gatling.io/computers')

    const filterField = cy.get("#searchbox")

    filterField.should('be.visible')
    filterField.type('ACE')

    const submitButton = cy.get('#searchsubmit')
    submitButton.click()

    const tableBody = cy.get('tbody')
    tableBody.children().should('have.length', 6)
    for (let index = 1; index <= 6; index++) {
      cy.get(`tbody > tr:nth-child(${index})`).contains('ACE', {
        matchCase: false
      })
    }
  })

  it('should be able to navigate to next page', () => {
    cy.visit('https://computer-database.gatling.io/computers')

    const computerNames = []
    for (let index = 1; index <= 10; index++) {
      computerNames.push(
        cy.get(`tbody > tr:nth-child(${index})`).invoke('text')
      )
    }

    cy.get('.next > a').click()

    const newComputerNames = []
    for (let index = 1; index <= 10; index++) {
      newComputerNames.push(
        cy.get(`tbody > tr:nth-child(${index})`).invoke('text')
      )
    }

    expect(computerNames).not.deep.equal(newComputerNames)
  })

  it('should be able to return to previous page from page one', () => {
    cy.visit('https://computer-database.gatling.io/computers')

    cy.get('.prev').should('have.class', 'disabled')
    expect(cy.get('.prev > a').click).throws()
  })
})