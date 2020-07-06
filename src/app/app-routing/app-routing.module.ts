import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StartComponent} from '../start/start.component';
import {PlayComponent} from '../play/play.component';
import {ResultComponent} from '../result/result.component';

const routes: Routes = [
  {path: 'start', component: StartComponent},
  {path: 'play', component: PlayComponent},
  {path: 'result', component: ResultComponent},
  {path: '', redirectTo: 'start', pathMatch: 'full'},
  {path: '**', component: StartComponent}
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
