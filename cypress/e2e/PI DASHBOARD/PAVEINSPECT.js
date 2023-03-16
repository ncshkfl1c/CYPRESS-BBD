const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
import PaveInspect, {
  validateUserLogin,
  createUser,
  checkValidCreateUser,
  createUserBox,
  manageUser,
  modalPopup,
  element,
  searchElement,
  headerElement,
  purchaseElement,
  tableElement,
} from "../../PageObjectModel/PAVEINSPECT DASHBOARD/PaveInspect.js";

//    Scenario: Login

var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "_");

Given("I open intro Page {string}", (url) => {
  cy.clearCookies();
  cy.visit(url);
  cy.url().should("eq", url);
});

Given(
  "I open Page {string} with UserName: {string} and PassWord {string}",
  (url, userName, passWord) => {
    PaveInspect.login(userName, passWord);
    cy.visit(url);
  }
);

When("I clicks Login at {string}", (title) => {
  PaveInspect.clickLogin(title);
  cy.url().should("include", "/login");
});

Then("I'm redirected to {string}", (url) => {
  cy.url().should("eq", url);
});

When(
  "I type UserName: {string}, PassWord {string} and click login",
  (userName, passWord) => {
    PaveInspect.typeUserName(userName);
    PaveInspect.typePassWord(passWord);
    PaveInspect.clickLogin("login");
  }
);

Then("I should be redirected to {string}", (url) => {
  cy.url().should("eq", url);
});

Then("I Check UI in Header", () => {
  let navigationList = headerElement.navigation();
  navigationList.each((element, index, list) => {
    cy.log(index);
    // let href = cy
    //   .wrap(element)
    //   .parent()
    //   .then((element1) => element1.attr("href"));
    // console.log(href);
    if (index == list.length - 1) {
      cy.wrap(element).should("have.css", "color", "rgb(227, 52, 47)");
    } else {
      cy.wrap(element).should("have.css", "color", "rgb(13, 42, 118)");
      cy.wrap(element)
        .parent()
        .invoke("attr", "class")
        .then(($class) => {
          if (!$class.includes("active")) {
            cy.wrap(element).parent().should("have.css", "opacity", "0.7");
          }
        });
    }
  });
  headerElement
    .logoPave()
    .should(
      "have.attr",
      "src",
      "https://paveinspect.com/__g2/img/logo_pave_blue.png"
    );
});

Then("I Check UI and function in Filter and Toast", () => {
  let filter = searchElement.filter();

  // check color
  filter.each(($ele, $in, $list) => {
    if ($in % 2 == 0) {
      cy.wrap($ele).should("have.css", "color", "rgb(33, 37, 41)");
      cy.wrap($ele).should("have.css", "background-color", "rgb(10, 34, 95)");
    } else {
      cy.wrap($ele).should("have.css", "color", "rgb(33, 37, 41)");
    }
  });
  headerElement.account().click();
  headerElement.alert().should("have.class", "alertbox-success");

  purchaseElement.lauchBtn().click();
  modalPopup.confirmBtn().click();
  headerElement.alert().should("have.class", `alertbox-error`);

  // Check ID if have value then do something
  purchaseElement.inValidFeeBack().each(($invalid) => {
    let invalidNeghbor = cy.wrap($invalid).siblings().invoke("attr", "id");
    invalidNeghbor.then(($id) => {
      if ($id == "from") {
        cy.wrap($invalid).should(
          "have.text",
          "Please provide a valid phone number."
        );
      } else if ($id == "to") {
        cy.wrap($invalid).should(
          "have.text",
          "Please provide a valid phone number."
        );
      }
    });
  });
  //check function
  // FILLTER USER
});

Then("I check Validate in BulkLink", () => {
  purchaseElement.lauchBtn().click();
  modalPopup.confirmBtn().click();
  headerElement.alert().should("have.class", "alertbox-error");
  purchaseElement
    .fromPhone()
    .siblings()
    .should("have.text", "Please provide a valid phone number.");
});
// PaveInspect DashBoard

Then("I check Validate when I create new user", () => {
  manageUser.createUserBtn().click();

  createUserBox
    .title("h2")
    .should("have.text", "Add New User")
    .and("have.css", "color", "rgb(13, 42, 118)");

  createUserBox
    .title("h5")
    .should("have.text", "Create New Account")
    .and("have.css", "color", "rgb(143, 143, 143)");

  createUserBox
    .submitBtn()
    .should("have.text", "CREATE ACCOUNT")
    .and("have.css", "color", "rgb(255, 255, 255)")
    .and("have.css", "background-color", "rgb(31, 102, 240)")
    .click();

  checkValidCreateUser(createUserBox.firstName(), "first name");
  checkValidCreateUser(createUserBox.lastName(), "last name");
  checkValidCreateUser(createUserBox.email(), "email");
  checkValidCreateUser(createUserBox.userName(), "username");
  checkValidCreateUser(createUserBox.role(), "role");
  checkValidCreateUser(createUserBox.password(), "password");
  checkValidCreateUser(createUserBox.phone(), "phone");
  checkValidCreateUser(createUserBox.passwordConfirm(), "passwordconfirm");
});

When("I create account", (account) => {
  let accoutArr = account.hashes();
  cy.log(accoutArr);
  accoutArr.forEach((acc, index) => {
    cy.visit("https://paveinspect.com/business/users");
    manageUser.createUserBtn().click();
    createUser(
      acc.role,
      acc.userName,
      acc.password,
      acc.email,
      acc.fName,
      acc.lName
    );
    createUserBox.submitBtn().click();
    if (index === 0) {
      cy.get(".invalid-feedback").should(
        "have.text",
        "The username has already been taken."
      );
    } else if (index === 1) {
      cy.get(".invalid-feedback").should(
        "have.text",
        "The email must be a valid email address."
      );
    }
  });
});

Then("I can login successfully", (account) => {
  account.hashes().forEach((acc) => {
    PaveInspect.validateUserLogin(acc.userName, acc.passWord);
  });
});
