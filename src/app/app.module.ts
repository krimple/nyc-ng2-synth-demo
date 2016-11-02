import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { ControlSurfaceService } from './services/control-surface.service';
import { SwitchboardService } from './services/switchboard-service';
import { MidiInputService } from './pipeline/inputs/midi-input.service';
import { AudioOutputService } from './pipeline/outputs/audio-output.service';
import { SynthesisService } from './pipeline/synthesis/synthesis.service';
import { PipelineService } from './pipeline/pipeline.service';

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
    ControlSurfaceService,
    SwitchboardService,
    MidiInputService,
    AudioOutputService,
    SynthesisService,
    PipelineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // force booting the service instance w/o injecting into a component
  constructor(private controlSurfaceService: ControlSurfaceService) { }
}
