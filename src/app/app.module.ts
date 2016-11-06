import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { MidiInputService } from './pipeline/inputs/midi-input.service';
import { AudioOutputService } from './pipeline/outputs/audio-output.service';
import { SynthesisService } from './pipeline/synthesis/synthesis.service';
import { PipelineService } from './pipeline/pipeline.service';
import { DrumPCMTriggeringService } from './pipeline/synthesis/drum-pcm-triggering.service';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    ControlPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
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
