/* eslint-disable no-undef */
describe("Add 10 items to the food part of the database.", () => {
    /* This is how the test should be laid out. */
  
    /* To access the url when TESTING use the baseUrl, like this 
        */
    let endpoint = Cypress.config("baseUrl") + "/api/getNutrition";
    it("This should be a blank test.", () => {
      cy.log("This is a test message from a blank test.");
      cy.request({
        url: endpoint,
        method: "GET",
        failOnStatusCode: false,
      }).then((response) => {
        cy.log(response);
        expect(response.status).to.eq(200);
      });
    });
  });
  