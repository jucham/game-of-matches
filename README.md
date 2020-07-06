# Game Of Matches

This project is an implementation of the "game of matches" in Angular. The game is playable at http://deployed.com

#### Game rules

* This is a two players game.
* Players are in front of a certain count of matches (which can change from one game to another).
* Each turn, current player remove 1, 2 or 3 matches.
* Player taking the last one wins.

#### Technical overview

Technologies used : 

* Angular 10
* Angular Material
* Jasmine/Karma
* Protractor
* Compodoc

The application consists in 3 pages : 

* `/start` : start menu of the game containing rules, settings and a start button. 
* `/play` : the game itself.
* `/result` : result to show which player won at the end of a game.

The flow of the application is the following :

![application flow](https://github.com/jucham/game-of-matches/raw/master/appflow.png)

A more detailed view of the project can be found in the `documentation` directory opening `index.html` file.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
