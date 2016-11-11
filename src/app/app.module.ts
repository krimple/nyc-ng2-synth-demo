import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
// import barrels
import { MidiInputService, AudioOutputService,
         SynthesisService, PipelineService,
         DrumPCMTriggeringService } from './services';
import { BluesKeyboardComponent,
         DrumSetComponent,
         IonianKeyboardComponent,
         MinorBluesKeyboardComponent,
         PianoKeyboardComponent } from './keyboard';

import { PolysynthRoutingModule } from "./app-routing.module";

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
