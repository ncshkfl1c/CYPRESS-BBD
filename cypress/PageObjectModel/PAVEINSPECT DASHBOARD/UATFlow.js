class UATFlow {
  element = {
    ContactName: () => cy.get("#Contact_name"),
    Email: () => cy.get("#Email"),
    BusinessName: () => cy.get("#Business_name"),
    BusinessStreet: () => cy.get("#Business_street"),
    BusinessUnit: () => cy.get("#Business_unit"),
    BusinessCity: () => cy.get("#Business_city"),
    BusinessCountry: () => cy.get("#Business_country"),
    BusinessState: () => cy.get("#Business_state"),
    BusinessPostalCode: () => cy.get("#Business_postal"),
    SubmitBtn: () =>
      cy.get("#Signup > .justify-between > .justify-center > .px-6"),
  };
}

module.exports = new UATFlow();
