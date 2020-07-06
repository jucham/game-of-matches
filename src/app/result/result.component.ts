import {Component, OnInit} from '@angular/core';
import {GameStateService} from '../services/game-state.service';

/**
 * Component that shows which player won.
 */
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  winningPlayer: string;

  constructor(private gameStateService: GameStateService) {
  }

  ngOnInit(): void {
    this.winningPlayer = this.gameStateService.getCurrentPlayer();
  }

}
