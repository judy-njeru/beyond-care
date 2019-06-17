import { AppPage } from "./app.po";
import { browser, logging, element, by, $$ } from "protractor";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display welcome message", () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual("Find A Babysitter");
  });

  it("should verify that find a sitter navigation link routes to the sitters component", () => {
    browser.get("/");
    element(by.id("find-sitter-nav-link")).click();
    let headlineText = element(by.id("sitters-headline")).getText();
    expect(headlineText).toEqual("Our Babysitters");
  });

  // it("should test that admin gets redirected to display sitters component", () => {
  //   browser.get("/login");
  //   page.getByFormControlName("username").sendKeys("admin");
  //   browser.sleep(1000);
  //   page.getByFormControlName("password").sendKeys("sdsAs121!@");
  //   browser.sleep(1000);
  //   element(by.id("btnUserlogin")).click();
  //   browser.sleep(1000);
  //   expect(browser.getCurrentUrl()).toEqual(
  //     browser.baseUrl + "/admin/display-sitters"
  //   );
  //   browser.sleep(1000);
  // });

  //CREATE BABYSITTER FUNCTIONALITY
  it("should create a new sitter", () => {
    browser.get("/login");
    page.getByFormControlName("username").sendKeys("admin");
    page.getByFormControlName("password").sendKeys("sdsAs121!@");
    browser.sleep(1000);
    element(by.id("btnUserlogin")).click();
    
    $$(".mat-row").then((elementsBeforeAdding) => {
      let noOfElemsBefore = elementsBeforeAdding.length;
      // browser.sleep(5000);
      element(by.id("create-sitter-link")).click();
      page.getByFormControlName("name").sendKeys("Patricia");
      page.getByFormControlName("description").sendKeys("A caregiver");
      page.getByFormControlName("age").sendKeys("30");
      page.getByFormControlName("location").sendKeys("Valby");
      page.getByFormControlName("availability").sendKeys("Weekends");
      page.getByFormControlName("min_price").sendKeys("130");
      page.getByFormControlName("quote").sendKeys("selfless");
      // browser.sleep(5000);
      page.getByFormControlName("max_price").sendKeys("100");
      // browser.sleep(5000);
      page.getByFormControlName("reviews").sendKeys("20");
      // browser.sleep(5000);
      page.getByFormControlName("verified").sendKeys(0);
      // browser.sleep(5000);
      page.getByFormControlName("strengths").sendKeys("Caregiver");
      browser.sleep(1000);
      var fileToUpload = "../../src/assets/images/sitter.png";
      var path = require("path");
      var absolutePath = path.resolve(__dirname, fileToUpload);
      browser.sleep(5000);
      browser.ignoreSynchronization = true;
      $$('input[type="file"]').sendKeys(absolutePath);
      browser.sleep(10000);
      element(by.id("btnAddSitter")).click();
      element(by.id("display-sitters-link")).click();
      browser.sleep(2000);

      $$(".mat-row").then((elementsAfterAdding) => {
        // console.log(elementsAfterAdding)
        let noOfElemsAfter = elementsAfterAdding.length;
        expect( noOfElemsAfter - noOfElemsBefore).toEqual(1);
      });
    });
    browser.sleep(1000);
  });

  /*
  //DELETE BABYSITTER FUNCTIONALITY
  it("should delete a sitter", () => {
    browser.get("/login");
    page.getByFormControlName("username").sendKeys("admin");
    page.getByFormControlName("password").sendKeys("sdsAs121!@");
    browser.sleep(1000);
    element(by.id("btnUserlogin")).click();
    
    $$(".mat-row").then((elementsBeforeAdding) => {
      let noOfElemsBefore = elementsBeforeAdding.length;
      // browser.sleep(5000);
      let list = element.all(by.css('.mat-row'));
      list.get(0);
      element(by.css(".btnDeleteSitter")).click();
      element(by.id("btnDeleteWrapper")).click();
      
      browser.sleep(2000);

      $$(".mat-row").then((elementsAfterAdding) => {
        let noOfElemsAfter = elementsAfterAdding.length;
        expect( noOfElemsAfter - noOfElemsBefore).toEqual(-1);
      });
    });
    browser.sleep(1000);
  });
  */

  /*
  //UPDATE BABYSITTER FUNCTIONALITY
  it("should update a sitter", () => {
    browser.get("/login");
    page.getByFormControlName("username").sendKeys("admin");
    page.getByFormControlName("password").sendKeys("sdsAs121!@");
    browser.sleep(1000);
    element(by.id("btnUserlogin")).click();
    
    let list = element.all(by.css('.mat-row'));
    list.get(3);
    //click edit button
    element(by.css(".btnUpdateSitter")).click();
    //clear value
    element(by.id("txtUpdateVefirification")).clear();
    // element.all(by.css('.')).get(0).clear() 
    //change verified value
    element(by.id("txtUpdateVefirification")).sendKeys("0");
    //update the new value
    element(by.id("btnEditSitterWrapper")).click();
    
    browser.sleep(3000);
    const updatedVerification = element.all(by.css('.mat-column-verified')).get(3).getText()
    expect(updatedVerification).toEqual("0");
      
    browser.sleep(2000);
  });
  */

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});

// $$(".mat-row").then(elementsAfterAdding) => {
//   expect(elementsAfterAdding.length - noOfElemsBefore).toEqual(1);
//   // expect(noOfElemsBefore - elementsAfterAdding.length).toEqual(1);
// });
