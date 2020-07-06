import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResultComponent} from './result.component';
import {GameStateService} from '../services/game-state.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  const gameStateService = new GameStateService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultComponent],
      imports: [RouterTestingModule],
      providers: [
        {provide: GameStateService, useValue: gameStateService}
      ]
    })
      .compileComponents();
  }));

  it('should render the right player who won the game', () => {
    // GIVEN
    gameStateService['gameState'].currentPlayer = '2';

    // WHEN
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // THEN
    expect(component.winningPlayer).toEqual(gameStateService.getCurrentPlayer());
  });

});
