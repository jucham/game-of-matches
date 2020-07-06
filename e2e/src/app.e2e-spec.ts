import {AppPage} from './app.po';
import {browser, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should play a game then restart another game', () => {

    page.navigateTo();

    page.getPlayButton().click();
    page.is('/play');

    // sequence of different take to have player 1 wins
    let button3 = page.getTakeButton(3);
    button3.click();
    button3.click();
    button3.click();
    button3.click();
    button3.click();

    // game is won
    page.is('/result');
    expect(page.getWinner()).toEqual('1');

    // play again
    page.getRestartButton().click();
    page.is('/play');

    const button1 = page.getTakeButton(1);
    const button2 = page.getTakeButton(2);
    button3 = page.getTakeButton(3);
    button3.click();
    button3.click();
    button3.click();
    button3.click();
    button2.click();
    button1.click();

    // game is won
    page.is('/result');
    expect(page.getWinner()).toEqual('2');

  });

  it('should play a game then go back to start menu', () => {
    page.navigateToRoute('/start');

    page.getPlayButton().click();
    page.is('/play');

    // sequence of different take to have player 1 wins
    const button3 = page.getTakeButton(3);
    button3.click();
    button3.click();
    button3.click();
    button3.click();
    button3.click();

    // game is won
    page.is('/result');
    expect(page.getWinner()).toEqual('1');

    page.getGoToStartMenuButton().click();
    page.is('/start');

    // must keep state of configuration
    expect(page.getNumberOfMatchesChangeBetweenPlaysCheckbox().isSelected()).toEqual(false);

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

