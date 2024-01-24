describe("A blank test.", () => {
  /* This is how the test should be laid out. */

  /* To access the url when TESTING use the baseUrl, like this 
    let endpoint = Cypress.config("baseUrl") + "/api/selectAllUsers";  */
  it("This should be a blank test.", () => {
    cy.log("This is a test message from a blank test.");
  });
});
