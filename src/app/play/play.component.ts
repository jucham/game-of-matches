import {Component, OnInit} from '@angular/core';
import {GameStateService} from '../services/game-state.service';
import {Router} from '@angular/router';

/**
 * Component that runs the game
 */
@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  private static readonly INITIAL_TAKE_BUTTON_IDS = [1, 2, 3];

  currentPlayer: string;
  matches: Array<any>;
  takeButtonIds: Array<number>;

  constructor(private gameStateService: GameStateService, private router: Router) {
  }

  /**
   * inits the game
   */
  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.gameStateService.initGameState();
    this.currentPlayer = this.gameStateService.getGameState().currentPlayer;
    this.matches = Array(this.gameStateService.getGameState().matchesCount);
    this.takeButtonIds = PlayComponent.INITIAL_TAKE_BUTTON_IDS;
  }

  /**
   * Plays a turn of the game taking a certain count of matches.
   *
   * @param matchesToTake the number of matches taken by the player
   */
  play(matchesToTake: number): void {
    this.gameStateService.play(matchesToTake);
    this.currentPlayer = this.gameStateService.getGameState().currentPlayer;
    this.matches.length = this.gameStateService.getGameState().matchesCount;
    this.updateTakeButtonIds();

    if (this.gameStateService.gameIsWon()) {
      this.router.navigateByUrl('/result');
    }
  }

  private updateTakeButtonIds(): void {
    this.takeButtonIds = PlayComponent.INITIAL_TAKE_BUTTON_IDS
      .filter(tbId => tbId < this.gameStateService.getGameState().matchesCount + 1);
  }

  /**
   * Plays a new game with keeping the same game settings.
   */
  restart(): void {
    this.init();
  }
}
