describe('InternTrack Login', () => {
  it('logs in successfully', () => {

    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 200,
      body: {
        token: 'fake-jwt-token',
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
        },
      },
    }).as('loginRequest')

    cy.intercept('GET', '**/api/applications', {
      statusCode: 200,
      body: [],
    }).as('applicationsRequest')

    cy.visit('/login')

    cy.get('[data-cy="email-input"]')
      .type('test@example.com')

    cy.get('[data-cy="password-input"]')
      .type('password123')

    cy.get('[data-cy="login-button"]')
      .click()

    cy.wait('@loginRequest')
    cy.wait('@applicationsRequest')

    cy.url().should('eq', 'http://localhost:5173/')

    cy.contains('Hi, Test User')
      .should('be.visible')
  })
})