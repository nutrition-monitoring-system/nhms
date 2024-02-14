/* eslint-disable no-undef */
// Test case for user login and interaction with the home page
let url = Cypress.config("baseUrl");
it("home", () => {
    cy.visit(url + "/login");
    // Logs in with the registered user credentials
    cy.get('input[name="email"]').type("testaccount@gmail.com");
    cy.get('input[name="password"]').type("password12345");
    cy.get("#handleLogin").click();
    cy.wait(3000);
  });