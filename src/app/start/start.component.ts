import {Component, OnInit} from '@angular/core';
import {GameStateService} from '../services/game-state.service';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {Router} from '@angular/router';

/**
 * Component of start menu.
 */
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  static readonly DEFAULT_NUMBER_OF_MATCHES = 15;

  numberOfMatchesChangeBetweenPlays = false;

  constructor(private gameStateService: GameStateService, private router: Router) {
  }

  ngOnInit(): void {
    const gameSettingsOfPreviousGame = this.gameStateService.getGameSettings();
    if (gameSettingsOfPreviousGame === undefined) {
      this.numberOfMatchesChangeBetweenPlays = false;
    } else {
      this.numberOfMatchesChangeBetweenPlays = gameSettingsOfPreviousGame.numberOfMatchesChangeBetweenPlays;
    }
  }

  /**
   * Prepares a game and launches it (navigate to the play route).
   */
  play(): void {
    this.gameStateService.initGameSettings({
      numberOfMatches: StartComponent.DEFAULT_NUMBER_OF_MATCHES,
      numberOfMatchesChangeBetweenPlays: this.numberOfMatchesChangeBetweenPlays
    });

    this.router.navigate(['/play']);
  }

  toggleNumberOfMatchesChangeBetweenPlays($event: MatCheckboxChange): void {
    this.numberOfMatchesChangeBetweenPlays = $event.checked;
  }
}
