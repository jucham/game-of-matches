import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StartComponent} from './start.component';
import {GameStateService} from '../services/game-state.service';
import {By} from '@angular/platform-browser';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {RouterTestingModule} from '@angular/router/testing';
import {PlayComponent} from '../play/play.component';

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;
  let gameStateService: GameStateService;

  beforeEach(async(() => {
    gameStateService = new GameStateService();
    TestBed.configureTestingModule({
      declarations: [StartComponent],
      imports: [
        MatCheckboxModule, RouterTestingModule.withRoutes([{path: 'play', component: PlayComponent}])
      ],
      providers: [
        {provide: GameStateService, useValue: gameStateService}
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component['router'], 'navigate').and.stub();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should apply game settings that randomize match count when play button is hit', () => {

    // GIVEN
    const gameStateServiceInitMethod = spyOn(gameStateService, 'initGameSettings').and.stub();
    const checkBoxElement: HTMLElement = fixture.debugElement.query(By.css('#randomMatchCount label')).nativeElement;
    checkBoxElement.click();
    fixture.detectChanges();

    // WHEN
    component.play();

    // THEN
    expect(gameStateServiceInitMethod).toHaveBeenCalledWith({
      numberOfMatches: StartComponent.DEFAULT_NUMBER_OF_MATCHES,
      numberOfMatchesChangeBetweenPlays: true
    });

  });

  it('should apply game settings that does not randomizes match count when play button is hit', () => {

    // GIVEN
    const gameStateServiceInitMethod = spyOn(gameStateService, 'initGameSettings').and.stub();

    // WHEN
    component.play();

    // THEN
    expect(gameStateServiceInitMethod).toHaveBeenCalledWith({
      numberOfMatches: StartComponent.DEFAULT_NUMBER_OF_MATCHES,
      numberOfMatchesChangeBetweenPlays: false
    });

  });

  it('should have default game settings', () => {

    expect(component.numberOfMatchesChangeBetweenPlays).toBe(false);
  });

  it('should keep game settings of previous game', () => {

    // GIVEN
    gameStateService.initGameSettings({
      numberOfMatches: StartComponent.DEFAULT_NUMBER_OF_MATCHES,
      numberOfMatchesChangeBetweenPlays: true
    });

    // WHEN
    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // THEN
    expect(component.numberOfMatchesChangeBetweenPlays).toBe(true);
  });

});
