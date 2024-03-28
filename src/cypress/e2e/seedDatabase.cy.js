/* eslint-disable no-undef */
describe("This will seed the database.", () => {
    /* This is how the test should be laid out. */
  
    /* To access the url when TESTING use the baseUrl, like this 
      let endpoint = Cypress.config("baseUrl") + "/api/selectAllUsers";  */
    it("This seeds the database with test symptoms and chronic conditions.", () => {
        let endpoint = Cypress.config("baseUrl") + "/api/seedDatabase";
    cy.request({
      url: endpoint,
      method: "POST",
    }).then((response) => {
      expect(response.status).to.eq(200);
      let exampleOutput = JSON.stringify(response.body[0]);
    
      cy.log(exampleOutput);
    });
    });
  });
  