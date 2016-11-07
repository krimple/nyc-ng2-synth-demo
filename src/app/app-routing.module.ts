import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DrumSetComponent} from "./keyboard/drumset/drum-set.component";
import {PianoKeyboardComponent} from "./keyboard/piano/piano-keyboard.component";
import {MinorBluesKeyboardComponent} from "./keyboard/minorblues/minor-blues-keyboard.component";
import {BluesKeyboardComponent} from "./keyboard/blues/blues-keyboard.component";

const routes = [
    {path: '', redirectTo: 'drums', pathMatch: 'full'},
    {path: 'piano', component: PianoKeyboardComponent},
    {path: 'blues', component: BluesKeyboardComponent},
    {path: 'minorblues', component: MinorBluesKeyboardComponent},
    {path: 'drums', component: DrumSetComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class PolysynthRoutingModule { }
