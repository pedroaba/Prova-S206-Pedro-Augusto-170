describe('template spec', () => {
  it('should be able to create a computer', () => {
    cy.visit('https://computer-database.gatling.io/computers')

    cy.get('#add').should('be.visible').click()

    cy.get('#name').should('be.visible').type('COMPUTER')
    cy.get('.primary').click()

    cy.get('.alert-message').should('be.visible').should('contain.text', 'Done !  Computer COMPUTER has been created')
  })

  it('should not be able to create without a name', () => {
    cy.visit('https://computer-database.gatling.io/computers')

    cy.get('#add').should('be.visible').click()
    cy.get('.primary').click()

    cy.get('.error > .input > .help-inline').should('be.visible').should('contain.text', 'Failed to refine type : Predicate isEmpty() did not fail.')
    cy.get('.error').should('be.visible')
  })
})