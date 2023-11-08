describe("Nutrition Sytem FrontEnd Testing", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
  });
  it("Verifies the Login Page", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="email"]').type("john.doe@email.com");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/home");
  });
  // it();
  // it();
});
