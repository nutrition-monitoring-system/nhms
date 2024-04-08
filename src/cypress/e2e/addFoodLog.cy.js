/* eslint-disable no-undef */
describe("This should make a request to the log endpoint. ", () => {
    let endpoint = Cypress.config("baseUrl") + "/api/log/addLogEntry";
    it("This should automatically fail, due to the wrong HTTP method.", () => {
      cy.request({
        url: endpoint,
        method: "GET",
        failOnStatusCode: false,
      }).then((response) => {
        cy.log(response);
        expect(response.status).to.eq(501);
      });
    });
    it("This should automatically fail, due to no body being attached.", () => {
      cy.request({
        url: endpoint,
        method: "POST",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
        let exampleOutput = JSON.stringify(response.body[0]);
        cy.log(exampleOutput);
      });
    });
  
    it.skip("This should fail, due to an invalid userID.", () => {
      let data = {
        userID: "wrongID"
      };
      cy.request({
        url: endpoint,
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.body.ok == null) {
          cy.log(response.body.error);
        } else {
          cy.log(response.body);
        }
      });
    });
  });
  