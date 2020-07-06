import {Injectable} from '@angular/core';

import {GameSettings} from './game-settings.model';
import {GameState} from './game-state.model';
import {MathUtils} from '../utils/math-utils';

/**
 * GameStateService lets to run the game applying rules and provides a state of the game.
 */
@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  private readonly DEFAULT_GAME_SETTINGS: GameSettings = {numberOfMatches: 15, numberOfMatchesChangeBetweenPlays: false};

  private gameState: GameState = {matchesCount: 0, currentPlayer: '1'};
  private gameSettings: GameSettings;
  private previousInitialMatchCount = -1;

  /**
   * Initializes the game settings.
   *
   * @param newGameSettings the game settings to apply
   */
  public initGameSettings(newGameSettings: GameSettings): void {
    if (newGameSettings === undefined) {
      this.gameSettings = this.DEFAULT_GAME_SETTINGS;
    } else {
      this.gameSettings = newGameSettings;
    }
  }

  /**
   * Initializes the game state.
   */
  public initGameState(): void {
    this.gameState.matchesCount = this.gameSettings.numberOfMatches;
    if (this.gameSettings.numberOfMatchesChangeBetweenPlays) {
      this.initMatchCountWithRandomValue();
    }
    this.gameState.currentPlayer = '1';
  }

  private initMatchCountWithRandomValue(): void {
    this.gameState.matchesCount = this.getRandomMatchCount();
    while (this.newMatchCountIsSameThanPrevious()) {
      this.gameState.matchesCount = this.getRandomMatchCount();
    }
    this.previousInitialMatchCount = this.gameState.matchesCount;
  }

  private newMatchCountIsSameThanPrevious(): boolean {
    return this.gameState.matchesCount.toString(10) === this.previousInitialMatchCount.toString(10);
  }

  private getRandomMatchCount(): number {
    return MathUtils.randInRange(this.gameSettings.numberOfMatches - 5, this.gameSettings.numberOfMatches + 5);
  }

  /**
   * Plays a turn of the game.
   * @param matchesToTake the number of matches to take
   */
  play(matchesToTake: number): void {
    this.gameState.matchesCount -= matchesToTake;
    if (this.gameIsWon()) {
      return;
    }
    this.selectNextPlayer();
  }

  private selectNextPlayer(): void {
    this.gameState.currentPlayer = (this.gameState.currentPlayer === '1') ? '2' : '1';
  }

  /**
   * Gets the game state.
   */
  getGameState(): GameState {
    return {
      matchesCount: this.gameState.matchesCount,
      currentPlayer: this.gameState.currentPlayer
    };
  }

  gameIsWon(): boolean {
    return this.gameState.matchesCount < 1;
  }

  getCurrentPlayer(): string {
    return this.gameState.currentPlayer;
  }

  getGameSettings(): GameSettings {
    return this.gameSettings;
  }
}
