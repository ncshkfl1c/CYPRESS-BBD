class PaveInspect {
  element = {
    login: (title) => {
      if (title == "INTRO PAGE") {
        return cy.get(".justify-end > .text-sm");
      } else {
        return cy.get(".mt-8 > .relative");
      }
    },
    userNameField: () => cy.get('input[name="username"]'),
    passWordField: () => cy.get('input[name="password"]'),
    //DashBoar
  };

  headerElement = {
    header: () => cy.get("#header"),
    navigation: () => cy.get(".navigation li"),
    logoPave: () => cy.get(".logo > img"),
    account: () => cy.get(".account"),
    alert: () => cy.get(".alertbox"),
  };

  purchaseElement = {
    purchaseField: () => cy.get("#purchase"),
    toPhone: () => cy.get("#to"),
    fromPhone: () => cy.get("#from"),
    numberInpection: () => cy.get("#number"),
    locale: () => cy.get('select[name="locale"]'),
    lauchBtn: () => cy.get(".launch-button"),
    inValidFeeBack: () => cy.get(".invalid-feedback"),
  };

  searchElement = {
    searchField: () => cy.get(".search-bar"),
    filter: () => cy.get("#dashboard .search-bar .filter > li"),
    nameFilter: () => cy.get("#dashboard .search-bar .filter > li > h5"),
    selectFilter: () => cy.get("#dashboard .search-bar .filter > li > select"),
  };

  tableElement = {
    sessionTable: () => cy.get("#Session_table"),
    sessionField: () => cy.get(".border-bottom"),
    sessionKey: () => cy.get(".sessiontag.idle > span"),
    status: () => cy.get(".border-bottom > td:nth-child(3) > div:nth-child(1)"),
    vAuto: () => cy.get(".border-bottom"),
  };

  modalPopup = {
    confirmBtn: () => cy.get("#confirm"),
  };

  manageUser = {
    createUserBtn: () => cy.get(".modal-open > .btn"),
    searchBox: () => cy.get("#dash_search_box"),
    searchBtn: () => cy.get(".btn-secondary"),
  };

  createUserBox = {
    title: (type) => cy.get(`.title > ${type}`),
    firstName: () => cy.get("#first_name"),
    lastName: () => cy.get("#last_name"),
    email: () => cy.get("#email"),
    phone: () => cy.get("#phone"),
    userName: () => cy.get("#username"),
    role: () => cy.get('[name="role"]'),
    password: () => cy.get("#password"),
    passwordConfirm: () => cy.get("#password_confirmation"),
    submitBtn: () => cy.get("form > .button"),
  };

  checkValidCreateUser(field, nameField) {
    switch (nameField) {
      case "phone":
      case "passwordconfirm":
        field.siblings().should("not.exist");
        break;
      case "role":
        field
          .parent()
          .siblings()
          .should("have.class", "invalid-feedback")
          .and("have.text", `The ${nameField} field is required.`);
        break;
      default:
        field
          .should(
            "have.css",
            "background-image",
            `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23e3342f'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23e3342f' stroke='none'/%3E%3C/svg%3E")`
          )
          .siblings()
          .should("have.class", "invalid-feedback")
          .and("have.text", `The ${nameField} field is required.`);
    }
  }

  createUser(r, uN, passWord, email, fname, lname) {
    cy.get("#first_name").type(fname);
    cy.get("#last_name").type(lname);
    cy.get("#email").type(email);
    cy.get("#username").type(uN);
    cy.get('[name="role"]').select(r);
    cy.get("#password").type(passWord);
    cy.get("#password_confirmation").type(passWord);
  }

  sendSession(toNumber, fromNumber, numberInpection, locale) {
    this.purchaseElement.toPhone().type(toNumber);
  }
  login(userName, passWord) {
    cy.session(userName, () => {
      cy.visit("https://paveinspect.com/login");
      this.typeUserName(userName);
      this.typePassWord(passWord);
      this.clickLogin("login");
    });
  }

  clickLogin(url) {
    return this.element.login(url).click();
  }

  typeUserName(username) {
    return this.element.userNameField().type(username);
  }

  typePassWord(password) {
    return this.element.passWordField().type(password);
  }
  validateUserLogin(userName, passWord) {
    cy.clearCookies();
    cy.visit("https://paveinspect.com/login");
    this.typeUserName(userName);
    this.typePassWord(passWord);
    cy.get(".mt-8 > .relative").click();
    cy.url().should("eq", "https://paveinspect.com/business/dashboard");
  }
}

module.exports = new PaveInspect();
