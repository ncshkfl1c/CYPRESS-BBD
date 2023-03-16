import UATFlow, {
  element,
} from "../../PageObjectModel/PAVEINSPECT DASHBOARD/UATFlow";
const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "_");

Given("I open {string}", (url) => {
  cy.visit(url);
});

Then("I Fill information in signUp", () => {
  element.ContactName().type("Đào Ngọc Tú");
  cy.wait(1000);

  element.Email().type("tu.dao@discoveryloft.com");
  cy.wait(1000);

  element.BusinessName().type(`${utc}`);
  cy.wait(1000);

  element.BusinessStreet().type("TEST STREET");
  cy.wait(1000);

  element.BusinessUnit().type("123");
  cy.wait(1000);

  element.BusinessCity().type("TEST CITY");
  cy.wait(1000);

  element.BusinessCountry().select(Math.floor(Math.random() * 2) + 1);
  cy.wait(1000);

  let Lenghthh;

  element
    .BusinessState()
    .children()
    .its("length")
    .then((count) => {
      element.BusinessState().select(Math.floor(Math.random() * count) + 1);
    });

  cy.wait(1000);

  element.BusinessPostalCode().type("E1X 1G5");
  cy.wait(1000);

  element.SubmitBtn().click();
});
