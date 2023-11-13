describe("Nutrition Sytem FrontEnd Testing", () => {
  const url = "http://localhost:3000";

  it("passes", () => {
    cy.visit(url + "");
    cy.scrollTo("center");
    cy.scrollTo("bottom", { duration: 1000 });
  });
  it("validates the Login Page", () => {
    cy.visit(url + "/login");
    cy.get('input[name="email"]').type("john.doe@email.com");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/home");
  });

  it("validates the Register Page", () => {
    cy.visit(url + "/register");
    {
      cy.get('input[name="fname"]').type("John");
      cy.get('input[name="lname"]').type("Doe");

      cy.get('input[name="email"]').type("john.doe@email.com");
      cy.get('input[name="password"]').type("password");
      cy.get(".btn-two").click();
    }
    {
      cy.get(".btn-three").click();
    }
    {
      cy.get(".btn-four").click();
    }
    {
      cy.get(".btn-five").click();
    }
    {
      cy.get(".btn-six").click();
    }
    {
      cy.get("button").contains("done");
    }
  });

  // it();
  // it();
});
