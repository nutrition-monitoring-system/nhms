/* eslint-disable no-undef */
/* This API test should add a new symptom to the database. */
describe("This should make a request to the addSymptom endpoint. ", () => {
  it("This should automatically fail, due to the wrong HTTP method.", () => {
    let endpoint = Cypress.config("baseUrl") + "/api/addSymptom";
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
    let endpoint = Cypress.config("baseUrl") + "/api/addSymptom";
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

  it("This should pass, due to correct items in the fields.", () => {
    let endpoint = Cypress.config("baseUrl") + "/api/addSymptom";
    let data = {
      conditionName: "IBS",
      symptomName: "Bloating"
    };
    cy.request({
      url: endpoint,
      method: "POST",
      body:data,
    }).then((response) => {
        if (response.body.ok == null){
            cy.log(response.body.error);
        }
        else{
            cy.log(response.body);
        }
    });
  });
});
