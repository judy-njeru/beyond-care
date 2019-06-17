import { browser, by, element } from "protractor";

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getByFormControlName(name: string) {
    return element(by.css("[formControlName=" + name + "]"));
  }

  getTitleText() {
    return element(by.css("app-root h1")).getText() as Promise<string>;
  }
}
