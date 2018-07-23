
import { browser, element, by } from "protractor";

describe('Beanie component', () => {

  it('1.0: Create beanie successfully => add the new beanie to the list', () => {
    //refreshes the page in the browser
    browser.get('/beanies');


    // elemsBefore shows how many elements there were before.
    element.all(by.css('.beanie-e2e')).then(function (elemsBefore) {

      //redirect to create a beanie
      element.all(by.css('.nav-beanie-create')).click();

      //login
      element.all(by.css('.btn-login')).click();

      browser.waitForAngular()
      element(by.id('create-beanie-e2e')).click();
      browser.waitForAngular()
      element(by.id('color')).sendKeys('Green');
      browser.waitForAngular()
      element(by.id('size')).sendKeys('3');
      browser.waitForAngular()
      element(by.id('fabric')).sendKeys('Cotton');
      browser.waitForAngular()

      element(by.id('submit-e2e')).click().then(function () {
        browser.waitForAngular()
        element.all(by.css('.beanie-e2e')).then(function (elemsAfter) {

          browser.sleep(1000);
          expect(elemsAfter.length - elemsBefore.length).toBe(1);
        });
      });
    });
  });

  it('1.1: Shows error message, when creating invalid beanie => not navigate', () => {
    browser.sleep(1000);

    //Redirect to the create beanie page
    element(by.css('[routerlink="/beanie"]')).click();

    //login
    element.all(by.css('.btn-login')).click();

    element(by.id('color')).clear();
    element(by.id('size')).clear();
    element(by.id('fabric')).clear();

    element(by.id('color')).sendKeys('Green');
    element(by.id('size')).sendKeys('');
    element(by.id('fabric')).sendKeys('Wooden');

    element(by.id('submit-e2e')).click().then(function () {

      element.all(by.css('.beanie-e2e')).then(function () {
        browser.sleep(1000);
        expect(element(by.css('.danger-alert')).isPresent()).toBeTruthy();
      });
    });
  });

  it('2.0: Edit beanie successfully => add edited beanie to list', () => {
    // http://www.protractortest.org/#/api?view=ElementArrayFinder.prototype.get
    //refreshes the page in the browser
    browser.get('/beanies');
    // elemsBefore shows how many elements there were before.
    //Load conent of beanie-e2e class
    element.all(by.css('.beanie-e2e')).then(function (elemsBefore) {

      //Create a placeholder for items list
      let listBefore = element.all(by.css('.beanie-e2e'));
      //Click on the first beanie in the list
      listBefore.get(0).click();

      //login
      element.all(by.css('.btn-login')).click();

      //Update the text to a new value
      element(by.id('color')).clear();
      element(by.id('color')).sendKeys('Orange');

      //Update the text to a new value
      element(by.id('size')).clear();
      element(by.id('size')).sendKeys('XS');

      //Update the text to a new value
      element(by.id('fabric')).clear();
      element(by.id('fabric')).sendKeys('Wool');

      //Submit the new form
      element(by.id('submit-e2e')).click().then(function () {
        browser.waitForAngular();

        //Click on the first beanie in the list        
        let listAfter = element.all(by.css('.beanie-e2e'));

        //Compare the strings before and after the update
        expect(listAfter.get(0).getText()).toBe('Orange - XS - Wool');
      });
    });
  });

  it('3.0: Delete beanie successfully => remove beanie from list list', () => {
    // elemsBefore shows how many elements there were before.
    element.all(by.css('.beanie-e2e')).then(function (elemsBefore) {

      //Create a placeholder for items list
      let listBefore = element.all(by.css('.beanie-e2e'));
      //Click on the first beanie in the list
      listBefore.get(0).click();

      //login
      element.all(by.css('.btn-login')).click();

      browser.waitForAngular()

      element.all(by.css('.btn-danger')).click().then(function () {
        browser.waitForAngular()
        element.all(by.css('.beanie-e2e')).then(function (elemsAfter) {

          browser.sleep(1000);
          expect(elemsAfter.length - elemsBefore.length).toBe(-1);
        });
      });
    });
  });
});