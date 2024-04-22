/* eslint-disable no-undef */
describe("Accessibility Tests", () => {
  it("should pass the axe accessibility tests.", () => {
    /* Access the sites.json list of sites. */
    let violationList = {};
    cy.fixture("sites.json").then((sites) => {
      cy.log(sites);
      sites["sites"].forEach((site) => {
        let endpoint = Cypress.config("baseUrl") + site;
        cy.visit(endpoint);
        cy.injectAxe(); // Inject axe-core into the page
        // Run accessibility tests on the page
        cy.wait(1000);
        cy.checkA11y(
            null,
            null,
            (violations) => violationList[site] = violations, true
          );
        // Assert that no violations were found
      });
    });
    cy.log(violationList);
    console.log(violationList);
  });
});
