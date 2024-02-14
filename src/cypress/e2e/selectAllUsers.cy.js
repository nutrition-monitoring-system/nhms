/* eslint-disable no-undef */
/* This API test should print out all the users. */
describe("This should make a request to the selectAllUsers endpoint. ", () => {
  it("This should select all users.", () => {
    let endpoint = Cypress.config("baseUrl") + "/api/selectAllUsers";
    cy.request({
      url: endpoint,
      method: "GET",
    }).then((response) => {
      expect(response.status).to.eq(200);
      let exampleOutput = JSON.stringify(response.body[0]);
    
      cy.log(exampleOutput);
    });
  });
});
