describe("TEST UAT", () => {
    var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "_");
    var country = ["CA", "US"];
    console.log(utc);
    it("SIGN UP", () => {
      cy.visit("https://uat.paveinspect.com/");
      cy.get("#Contact_name").type("Đào Ngọc Tú");
      cy.wait(1000);
      cy.get("#Email").type("tu.dao@discoveryloft.com");
      cy.wait(1000);
      cy.get("#Business_name").type(`${utc}`);
      cy.wait(1000);
      cy.get("#Business_street").type("TEST STREET");
      cy.wait(1000);
      cy.get("#Business_unit").type("123");
      cy.wait(1000);
      cy.get("#Business_city").type("TEST CITY");
      cy.wait(1000);
      cy.get("#Business_country").select(Math.floor(Math.random() * 2));
      cy.wait(1000);
      cy.get("#Business_state > option").each((element,i,list)=>{
          console.log(element)
      });
      cy.wait(1000);
      cy.get("#Business_postal").type("E1X 1G5");
      cy.wait(1000);
      cy.get("#Signup > .justify-between > .justify-center > .px-6").as("SubBtn");
    });
  });
  