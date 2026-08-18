describe('InternTrack Applications', () => {
    //testing adds
    it('adds a new application', () => {
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
    }).as('getApplications')

    cy.intercept('POST', '**/api/applications', {
      statusCode: 201,
      body: {
        id: 1,
        company: 'Google',
        position: 'Software Engineer Intern',
        status: 'Applied',
      },
    }).as('createApplication')

    cy.visit('/login')

    cy.get('[data-cy="email-input"]')
      .type('test@example.com')

    cy.get('[data-cy="password-input"]')
      .type('password123')

    cy.get('[data-cy="login-button"]')
      .click()

    cy.wait('@loginRequest')
    cy.wait('@getApplications')

    cy.get('[data-cy="company-input"]')
      .type('Google')

    cy.get('[data-cy="position-input"]')
      .type('Software Engineer Intern')

    cy.get('[data-cy="status-select"]')
      .select('Applied')

    cy.get('[data-cy="application-submit"]')
      .click()

    cy.wait('@createApplication')

    cy.contains('Google')
      .should('be.visible')

    cy.contains('Software Engineer Intern')
      .should('be.visible')

    cy.contains('Applied')
      .should('be.visible')
  })

  //testing edit
  it('edits an existing application', () => {
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
    body: [
      {
        id: 1,
        company: 'Google',
        position: 'Software Engineer Intern',
        status: 'Applied',
      },
    ],
  }).as('getApplications')

  cy.intercept('PUT', '**/api/applications/1', {
    statusCode: 200,
    body: {
      id: 1,
      company: 'Google',
      position: 'Software Engineer Intern',
      status: 'Interview',
    },
  }).as('updateApplication')

  cy.visit('/login')

  cy.get('[data-cy="email-input"]')
    .type('test@example.com')

  cy.get('[data-cy="password-input"]')
    .type('password123')

  cy.get('[data-cy="login-button"]')
    .click()

  cy.wait('@loginRequest')
  cy.wait('@getApplications')

  cy.contains('Google')
    .should('be.visible')

  cy.get('[data-cy="edit-application"]')
    .click()

  cy.get('[data-cy="status-select"]')
    .select('Interview')

  cy.get('[data-cy="application-submit"]')
    .click()

  cy.wait('@updateApplication')

  cy.contains('Interview')
    .should('be.visible')
})

//testing delete
it('deletes an existing application', () => {
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
    body: [
      {
        id: 1,
        company: 'Google',
        position: 'Software Engineer Intern',
        status: 'Applied',
      },
    ],
  }).as('getApplications')

  cy.intercept('DELETE', '**/api/applications/1', {
    statusCode: 200,
    body: {
      message: 'Application deleted',
    },
  }).as('deleteApplication')

  cy.visit('/login')

  cy.get('[data-cy="email-input"]')
    .type('test@example.com')

  cy.get('[data-cy="password-input"]')
    .type('password123')

  cy.get('[data-cy="login-button"]')
    .click()

  cy.wait('@loginRequest')
  cy.wait('@getApplications')

  cy.contains('Google')
    .should('be.visible')

  cy.get('[data-cy="delete-application"]')
    .click()

  cy.wait('@deleteApplication')

  cy.contains('Google')
    .should('not.exist')
})
})