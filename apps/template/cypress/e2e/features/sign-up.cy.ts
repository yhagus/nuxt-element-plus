describe('sign-up feature', () => {
  it('registers a user and opens verification flow', () => {
    const firstName = Cypress.env('E2E_FIRST_NAME') ?? 'Taylor';
    const lastName = Cypress.env('E2E_LAST_NAME') ?? 'Rider';
    const dateOfBirth = Cypress.env('E2E_DOB') ?? '2000-01-01';
    const genderLabel = Cypress.env('E2E_GENDER') ?? 'Male';
    const mobile = Cypress.env('E2E_MOBILE') ?? '081234567890';
    const email = Cypress.env('E2E_EMAIL') ?? 'user@example.com';
    const password = Cypress.env('E2E_PASSWORD') ?? 'password123';

    cy.visit('/sign-up');

    cy.get('#sign-up-first-name').type(firstName);
    cy.get('#sign-up-last-name').type(lastName);
    const [dobYear, dobMonth, dobDay] = dateOfBirth.split('-');
    const monthIndex = Number(dobMonth);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const monthName = monthNames[monthIndex - 1];

    cy.get('#sign-up-dob input').click();
    cy.get('.el-picker-panel').should('be.visible').within(() => {
      cy.get('.el-date-picker__header-label').first().click();
      cy.get(`.el-year-table td[aria-label="${dobYear}"]`).click();
      cy.get(`.el-month-table td[aria-label="${monthName}"]`).click();
      cy.get('.el-date-table td.available:not(.prev-month):not(.next-month)')
        .contains('.el-date-table-cell__text', new RegExp(`^${Number(dobDay)}$`))
        .click();
    });
    cy.get('#form-item-sign-up-gender .el-select__wrapper').click();
    cy.get('.el-select-dropdown__item').contains(genderLabel).click();
    cy.get('#sign-up-mobile').type(mobile);
    cy.get('#sign-up-email').type(email);
    cy.get('#sign-up-password').type(password, { log: false });
    cy.get('#sign-up-password-confirmation').type(password, { log: false });

    cy.get('body').then(($body) => {
      if ($body.find('#sign-up-business-type').length) {
        cy.get('#form-item-sign-up-business-type .el-select__wrapper').click();
        cy.get('.el-select-dropdown__item').contains('Corporate').click();
      }
    });

    cy.get('#sign-up-submit').click();
    // cy.wait('@validateRegistration');

    cy.get('.el-dialog').should('be.visible').within(() => {
      cy.get('.el-scrollbar__wrap').scrollTo('bottom');
      cy.get('.el-checkbox').click();
      cy.get('#submit-tnc').click();
    });

    // cy.wait('@register');
    cy.location('pathname').should('eq', '/verify-email');
  });
});
