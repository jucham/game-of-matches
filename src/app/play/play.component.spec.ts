import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayComponent} from './play.component';
import {GameStateService} from '../services/game-state.service';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';


describe('PlayComponent', () => {
  let component: PlayComponent;
  let fixture: ComponentFixture<PlayComponent>;
  let gameStateService: GameStateService;
  let initGameStateMethod;

  beforeEach(async(() => {
    gameStateService = new GameStateService();
    TestBed.configureTestingModule({
      declarations: [PlayComponent],
      imports: [RouterTestingModule],
      providers: [
        {provide: GameStateService, useValue: gameStateService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayComponent);
    gameStateService.initGameSettings({numberOfMatches: 10, numberOfMatchesChangeBetweenPlays: false});
    initGameStateMethod = spyOn(gameStateService, 'initGameState').and.callThrough();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should have init the game state when component is created', () => {
    expect(initGameStateMethod).toHaveBeenCalled();
  });

  it('should have player 1 highlighted at turn 1', () => {

    const playerElement: HTMLElement = getCurrentPlayerElement();
    expect(playerElement.innerText).toEqual('Player 1');

  });

  it('should have player 2 highlighted at turn 2', () => {
    // GIVEN

    // WHEN
    component.play(2);
    fixture.detectChanges();

    // THEN
    const playerElement: HTMLElement = getCurrentPlayerElement();
    expect(playerElement.innerText).toEqual('Player 2');
  });

  it('should have player 1 highlighted at turn 3', () => {
    // GIVEN

    // WHEN
    component.play(2);
    fixture.detectChanges();

    component.play(1);
    fixture.detectChanges();

    // THEN
    const playerElement: HTMLElement = getCurrentPlayerElement();
    expect(playerElement.innerText).toEqual('Player 1');
  });

  it('should render the right number of match at turn 1', () => {
    const matchElements = getMatchElements();
    expect(matchElements.length).toEqual(gameStateService.getGameState().matchesCount);
  });

  it('should render the right number of match at turn 2', () => {
    // GIVEN

    // WHEN
    component.play(3);
    fixture.detectChanges();

    // THEN
    const matchElements = getMatchElements();
    expect(matchElements.length).toEqual(gameStateService.getGameState().matchesCount);
  });

  it('should play 1 take when 1 take button is clicked', () => {
    shouldPlayTheRightTakeWhenClickTheTakeButton(1);
  });

  it('should play 2 takes when 2 takes button is clicked', () => {
    shouldPlayTheRightTakeWhenClickTheTakeButton(2);
  });

  it('should play 3 takes when 3 takes button is clicked', () => {
    shouldPlayTheRightTakeWhenClickTheTakeButton(3);
  });

  function shouldPlayTheRightTakeWhenClickTheTakeButton(takeButtonId: number): void {
    // GIVEN
    const playMethod = spyOn(component, 'play').and.callThrough();

    // WHEN
    const takeButton1 = fixture.debugElement.query(By.css('#takeButton' + takeButtonId)).nativeElement;
    takeButton1.click();
    fixture.detectChanges();

    // THEN
    expect(playMethod).toHaveBeenCalledWith(takeButtonId);
  }

  it('should render 2 take buttons when it remains 2 matches', () => {
    // GIVEN

    // WHEN
    component.play(3);
    fixture.detectChanges();

    component.play(3);
    fixture.detectChanges();

    component.play(2);
    fixture.detectChanges();

    // THEN
    const takeButtons = fixture.debugElement.queryAll(By.css('#takeButtons button')).map(b => b.nativeElement);
    expect(takeButtons.length).toEqual(2);
    expect(takeButtons[0].id).toEqual('takeButton1');
    expect(takeButtons[1].id).toEqual('takeButton2');

  });

  it('should render 1 take button when it remains 1 match', () => {
    // GIVEN

    // WHEN
    component.play(3);
    fixture.detectChanges();

    component.play(3);
    fixture.detectChanges();

    component.play(3);
    fixture.detectChanges();

    // THEN
    const takeButtons = fixture.debugElement.queryAll(By.css('#takeButtons button')).map(b => b.nativeElement);
    expect(takeButtons.length).toEqual(1);
    expect(takeButtons[0].id).toEqual('takeButton1');
  });

  function getCurrentPlayerElement(): HTMLElement {
    return fixture.debugElement.query(By.css('#currentPlayer')).nativeElement;
  }

  function getMatchElements(): object[] {
    return fixture.debugElement.queryAll(By.css('.match'));
  }

});
