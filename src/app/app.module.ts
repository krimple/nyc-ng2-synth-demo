import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PianoKeyboardComponent } from './keyboard/piano/piano-keyboard.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { MidiInputService } from './pipeline/inputs/midi-input.service';
import { AudioOutputService } from './pipeline/outputs/audio-output.service';
import { SynthesisService } from './pipeline/synthesis/synthesis.service';
import { PipelineService } from './pipeline/pipeline.service';
import { DrumPCMTriggeringService } from './pipeline/synthesis/drum-pcm-triggering.service';
import {DrumSetComponent} from "./keyboard/drumset/drum-set.component";
import {BluesKeyboardComponent} from "./keyboard/blues/blues-keyboard.component";
import {MinorBluesKeyboardComponent} from "./keyboard/minorblues/minor-blues-keyboard.component";
import {PolysynthRoutingModule} from "./app-routing.module";
import {IonianKeyboardComponent} from "./keyboard/ionian/ionian-keyboard.component";

@NgModule({
  declarations: [
    AppComponent,
    DrumSetComponent,
    PianoKeyboardComponent,
    BluesKeyboardComponent,
    MinorBluesKeyboardComponent,
    IonianKeyboardComponent,
    ControlPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PolysynthRoutingModule
  ],
  providers: [
    MidiInputService,
    AudioOutputService,
    SynthesisService,
    PipelineService,
    DrumPCMTriggeringService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // force booting the service instance w/o injecting into a component
  constructor() { }
}
