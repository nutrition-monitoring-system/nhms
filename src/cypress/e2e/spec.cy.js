// This describes a test suite for checking new user registration and login
describe("Testing if a new user can log into the database.", () => {
  const url = "nhms.onrender.com"; // sets the base URL for the tests
  // Test case for navigating to the base URL and scrolling the view
  it("passes", () => {
    cy.visit(url + ""); // Visits the base URL
    cy.scrollTo("center"); // Scrolls to the center of the page
    cy.scrollTo("bottom", { duration: 1000 }); // Scrolls to the bottom over 1 second
  });

  // Test case for registering a new account
  it("registers a new account.", () => {
    cy.visit(url + "/register"); // Visits the registration page
    // Fills out the registration form with new user details
    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("John");
    cy.get('select[name="gender"]').select("male");
    cy.get('input[name="date"]').type("2023-12-31");
    cy.get('input[name="email"]').type("testaccount@gmail.com");
    cy.get('input[name="password"]').type("password12345");
    cy.get('input[name="confirmPassword"]').type("password12345");
    // Simulates clicking through a multi-step form
    // and applies visual changes to indicate progress
    cy.get("#RestrictionsNext")
      .click()
      .then(() => {
        cy.get("#chageTranslte").invoke(
          "attr",
          "style",
          "transform: translateX(-100%)"
        );
        cy.get(".Restrictions").eq(0).invoke("addClass", "bg-secondary");
        cy.get(".Restrictions").eq(3).invoke("addClass", "bg-secondary");
        cy.get(".Restrictions").eq(5).invoke("addClass", "bg-secondary");
      });

    cy.get("#AllergiesNext")
      .click()
      .then(() => {
        cy.get("#chageTranslte").invoke(
          "attr",
          "style",
          "transform: translateX(-200%)"
        );
        cy.get(".Allergies").eq(0).invoke("addClass", "bg-secondary");
        cy.get(".Allergies").eq(4).invoke("addClass", "bg-secondary");
        cy.get(".Allergies").eq(6).invoke("addClass", "bg-secondary");
      });
    cy.get("#conditionsNext")
      .click()
      .then(() => {
        cy.get("#chageTranslte").invoke(
          "attr",
          "style",
          "transform: translateX(-300%)"
        );
        cy.get(".conditions").eq(0).invoke("addClass", "bg-secondary");
        cy.get(".conditions").eq(4).invoke("addClass", "bg-secondary");
        cy.get(".conditions").eq(2).invoke("addClass", "bg-secondary");
        cy.get(".conditions").eq(6).invoke("addClass", "bg-secondary");
      });
    cy.get("#SettingsNext")
      .click()
      .then(() => {
        cy.get("#chageTranslte").invoke(
          "attr",
          "style",
          "transform: translateX(-400%)"
        );
        cy.get(".Settings").eq(0).invoke("addClass", "bg-secondary");
        cy.get(".Settings").eq(4).invoke("addClass", "bg-secondary");
        cy.get(".Settings").eq(2).invoke("addClass", "bg-secondary");
      });
    // Fills in breakfast food details
    cy.get("#addBreakFast")
      .click()
      .then(() => {
        cy.get('input[name="Foodname"]').type("milk");
        cy.get('input[name="Fooddescription"]').type(
          "Milk is a white liquid produced by cows, goats, and sheep"
        );
        // Finalizes registration and redirects to login page
        cy.get('input[name="Fooddewater"]').type("water");
        cy.get("#addNext").click();
      });
    cy.get("#DoneNext")
      .click()
      .then(() => {
        cy.visit(url + "/login");
      });
  });
  // Test case for user login and interaction with the home page
  it("home", () => {
    cy.visit(url + "/login");
    // Logs in with the registered user credentials
    cy.get('input[name="email"]').type("testaccount@gmail.com");
    cy.get('input[name="password"]').type("password12345");
    cy.get("#handleLogin").click();
    cy.wait(3000);
    cy.visit(url + "/home");

    // Interactions with the home page, searching and navigating tabs
    cy.get("#search").click();
    // User logout process
    cy.get("#usercontent").click();
    cy.get("#Logout").click();
    cy.url().should("include", "");
  });
});
