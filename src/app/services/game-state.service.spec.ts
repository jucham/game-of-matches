import {TestBed} from '@angular/core/testing';

import {GameStateService} from './game-state.service';
import {GameState} from './game-state.model';
import {MathUtils} from '../utils/math-utils';

describe('GameStateService', () => {

  it('should be initialized with 17 matches', () => {
    // GIVEN
    const gameStateService = new GameStateService();

    // WHEN
    gameStateService.initGameSettings({numberOfMatches: 17, numberOfMatchesChangeBetweenPlays: false});
    gameStateService.initGameState();

    // THEN
    const gameState: GameState = gameStateService.getGameState();
    expect(gameState.matchesCount).toEqual(17);
  });

  it('should be initialized with a random value', () => {
    // GIVEN
    const gameStateService = new GameStateService();
    spyOn(MathUtils, 'randInRange').and.returnValue(23);

    // WHEN
    gameStateService.initGameSettings({numberOfMatches: 20, numberOfMatchesChangeBetweenPlays: true});
    gameStateService.initGameState();

    // THEN
    expect(gameStateService.getGameState().matchesCount).toEqual(23);
  });

  it('should have different number of matches each game', () => {

    // GIVEN
    const gameStateService = new GameStateService();
    spyOn(MathUtils, 'randInRange').and.returnValues(18, 18, 24);

    // WHEN
    gameStateService.initGameSettings({numberOfMatches: 20, numberOfMatchesChangeBetweenPlays: true});
    gameStateService.initGameState();
    const firstGameMatchCount = gameStateService.getGameState().matchesCount;
    for (let i = 0; i < 6; i++) {
      gameStateService.play(3);
    }

    gameStateService.initGameState();
    const secondGameMatchCount = gameStateService.getGameState().matchesCount;

    // THEN
    expect(secondGameMatchCount).not.toEqual(firstGameMatchCount);
    expect(gameStateService.getGameState().matchesCount).toEqual(24);
  });

  it('should have player 1 as current player after init', () => {
    // GIVEN
    const gameStateService = new GameStateService();

    // WHEN
    gameStateService.initGameSettings({numberOfMatches: 17, numberOfMatchesChangeBetweenPlays: false});
    gameStateService.initGameState();

    // THEN
    expect(gameStateService.getCurrentPlayer()).toEqual('1');
  });

  it('game state should be mutable only by game state service', () => {
    // GIVEN
    const gameStateService = new GameStateService();

    // WHEN
    gameStateService.initGameSettings({numberOfMatches: 10, numberOfMatchesChangeBetweenPlays: false});
    gameStateService.initGameState();
    gameStateService.getGameState().matchesCount = 5;

    // THEN
    expect(gameStateService.getGameState().matchesCount).toEqual(10);
  });

  it('should take 1 match', () => {
    // GIVEN
    const gameStateService = new GameStateService();
    gameStateService.initGameSettings({numberOfMatches: 10, numberOfMatchesChangeBetweenPlays: false});
    gameStateService.initGameState();

    // WHEN
    gameStateService.play(1);

    // THEN
    expect(gameStateService.getGameState().matchesCount).toEqual(9);
  });

  it('should take 2 matches', () => {
    // GIVEN
    const gameStateService = new GameStateService();
    gameStateService.initGameSettings({numberOfMatches: 10, numberOfMatchesChangeBetweenPlays: false});
    gameStateService.initGameState();

    // WHEN
    gameStateService.play(2);

    // THEN
    expect(gameStateService.getGameState().matchesCount).toEqual(8);
  });

  it('should take 3 matches', () => {
    // GIVEN
    const gameStateService = new GameStateService();
    gameStateService.initGameSettings({numberOfMatches: 10, numberOfMatchesChangeBetweenPlays: false});
    gameStateService.initGameState();

    // WHEN
    gameStateService.play(3);

    // THEN
    expect(gameStateService.getGameState().matchesCount).toEqual(7);
  });

  it('should have player 2 as current player after one turn', () => {
    // GIVEN
    const gameStateService = new GameStateService();
    gameStateService.initGameSettings({numberOfMatches: 10, numberOfMatchesChangeBetweenPlays: false});
    gameStateService.initGameState();

    // WHEN
    gameStateService.play(3);

    // THEN
    expect(gameStateService.getCurrentPlayer()).toEqual('2');
  });

  it('should have player 1 as current player after two turns', () => {
    // GIVEN
    const gameStateService = new GameStateService();
    gameStateService.initGameSettings({numberOfMatches: 10, numberOfMatchesChangeBetweenPlays: false});
    gameStateService.initGameState();

    // WHEN
    gameStateService.play(3);
    gameStateService.play(2);

    // THEN
    expect(gameStateService.getCurrentPlayer()).toEqual('1');
  });

  it('should be in won state when there is no more matches', () => {
    // GIVEN
    const gameStateService = new GameStateService();
    gameStateService.initGameSettings({numberOfMatches: 10, numberOfMatchesChangeBetweenPlays: false});
    gameStateService.initGameState();

    // WHEN
    gameStateService.play(3);
    gameStateService.play(3);
    gameStateService.play(3);
    gameStateService.play(1);

    // THEN
    expect(gameStateService.gameIsWon()).toBeTruthy();
    expect(gameStateService.getGameState().matchesCount).toEqual(0);
    expect(gameStateService.getCurrentPlayer()).toEqual('2');
  });

  it('should have player 2 as winner even if play is called but the game is already won', () => {
    // GIVEN
    const gameStateService = new GameStateService();

    // WHEN
    gameStateService.initGameSettings({numberOfMatches: 5, numberOfMatchesChangeBetweenPlays: false});
    gameStateService.initGameState();
    gameStateService.play(3);
    gameStateService.play(2);
    gameStateService.play(1);

    // THEN
    expect(gameStateService.gameIsWon()).toBeTruthy();
    expect(gameStateService.getCurrentPlayer()).toEqual('2');
  });

  it('should have the same game settings when we init a second play changing nothing', () => {
    // GIVEN
    const gameStateService = new GameStateService();

    // WHEN
    gameStateService.initGameSettings({numberOfMatches: 5, numberOfMatchesChangeBetweenPlays: false});
    gameStateService.initGameState();
    gameStateService.play(3);
    gameStateService.play(2);
    gameStateService.initGameState();

    // THEN
    expect(gameStateService.getGameState().matchesCount).toEqual(5);
  });

  it('should have the default game settings when not specified at the first game', () => {
    // GIVEN
    const gameStateService = new GameStateService();

    // WHEN
    gameStateService.initGameSettings(undefined);

    // THEN
    expect(gameStateService['gameSettings']).toEqual(gameStateService['DEFAULT_GAME_SETTINGS']);

  });

  it('should have the default match count when game settings not specified at the first game', () => {
    // GIVEN
    const gameStateService = new GameStateService();

    // WHEN
    gameStateService.initGameSettings(undefined);
    gameStateService.initGameState();

    // THEN
    expect(gameStateService.getGameState().matchesCount).toEqual(gameStateService['DEFAULT_GAME_SETTINGS'].numberOfMatches);
  });


  it('should have the game playable when we init for a second play', () => {
    // GIVEN
    const gameStateService = new GameStateService();

    // WHEN
    gameStateService.initGameSettings({numberOfMatches: 5, numberOfMatchesChangeBetweenPlays: false});
    gameStateService.initGameState();
    gameStateService.play(3);
    gameStateService.play(2);
    gameStateService.initGameSettings({numberOfMatches: 4, numberOfMatchesChangeBetweenPlays: false});
    gameStateService.initGameState();

    // THEN
    expect(gameStateService.getGameState().matchesCount).toEqual(4);
    expect(gameStateService.gameIsWon()).toBeFalse();
    expect(gameStateService.getCurrentPlayer()).toEqual('1');
  });


})
;
