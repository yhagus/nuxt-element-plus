describe('sign-in feature', () => {
  it('submits credentials and redirects', () => {
    const email = Cypress.env('E2E_EMAIL') ?? 'user@example.com';
    const password = Cypress.env('E2E_PASSWORD') ?? 'password123';

    cy.intercept('POST', '/v1/auth/login', {
      access_token: 'test-access-token',
      refresh_token: 'test-refresh-token',
    }).as('login');

    cy.visit('/sign-in?redirect=/');

    cy.get("#sign-in-email").type(email);
    cy.get("#sign-in-password").type(password, { log: false });
    cy.get("#sign-in-submit").click();

    cy.wait('@login');
    cy.location('pathname').should('eq', '/');
  });
});
