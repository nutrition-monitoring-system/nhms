/* eslint-disable no-undef */

beforeEach(() => {
  cy.visit("/login");
  // Logs in with the registered user credentials
  cy.log("Login to the test profile.");
  cy.get('input[name="email"]').type("testaccount@gmail.com");
  cy.get('input[name="password"]').type("password12345");
  cy.get("#handleLogin").click();
  cy.wait(3000);
});
describe("This test should check that the name is in the corresponding button once the user has logged in.", () => {
  /* This is how the test should be laid out. */

  const userName = "John Smith";
  const email = "testaccount@gmail.com";
  const dob = "31/12/2023";
  it.skip("This should check if the data has been received. ", () => {
    cy.wait(3000);
    /* Wait for session to work. */
    cy.visit("/");
    cy.visit("/home");
    cy.log("Check if the data has been received.");
    cy.wait(3000);
    // cy.get("#usercontent").as("userButton").click();
    cy.get("#Profile").contains(userName);
    cy.wait(3000);
    cy.visit("/home");
    // cy.get("a").contains("NHMS").click();
    // Takes you to home page.
    cy.get("#usercontent").as("userButton").click();
    cy.get("@userButton").contains(userName);
    // cy.get("@userButton").click();
    // cy.wait(1000);
    // cy.get("#usercontent").get("#profile").click({ force: true });
    /* Redirection to profile. */
    cy.visit('/user');
    cy.log("Go to the user profile.");
    cy.wait(1000);
    cy.get("#user-name").contains(userName);
    cy.get("#user-email").contains(email);
    cy.get("#user-dob").contains(dob);

    /* Log out of profile. */
    cy.log("Log out of the profile.");
    cy.get("button").contains("Logout").click();
    cy.wait(1000);
    cy.url("/login");
  });
});

