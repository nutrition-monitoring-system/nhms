/* eslint-disable no-undef */
describe("A check to see if the project builds correctly.", () => {
    /* This is how the test should be laid out. */
  
    /* To access the url when TESTING use the baseUrl, like this 
      let endpoint = Cypress.config("baseUrl") + "/api/selectAllUsers";  */
    it.skip("This should build.", () => {
        cy.exec("npm run build");
    });
  });
  