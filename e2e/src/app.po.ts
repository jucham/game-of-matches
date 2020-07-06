import {browser, by, element, ElementFinder, protractor} from 'protractor';
import {promise} from 'selenium-webdriver';

export class AppPage {

  EC = protractor.ExpectedConditions;

  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  navigateToRoute(route: string): Promise<unknown> {
    return browser.get(browser.baseUrl + route) as Promise<unknown>;
  }

  getTakeButton(id: number): ElementFinder {
    return element(by.id('takeButton' + id));
  }

  getPlayButton(): ElementFinder {
    return element(by.id('playButton'));
  }

  getNumberOfMatchesChangeBetweenPlaysCheckbox(): ElementFinder {
    return element(by.css('mat-checkbox'));
  }

  getRestartButton(): ElementFinder {
    return element(by.id('restartButton'));
  }

  getWinner(): promise.Promise<string> {
    return element(by.id('winner')).getText();
  }

  is(route: string): void {
    browser.wait(this.EC.urlContains(route), 1000);

  }

  getGoToStartMenuButton() {
    return element(by.id('goToStartMenuButton'));
  }
}
