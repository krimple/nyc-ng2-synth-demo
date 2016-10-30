import { Component } from '@angular/core';
import { SynthService } from './services/synth.service';
import { SynthInputMessage, MESSAGE_TYPE } from './models/synth-input-message';
import { TouchBoardMidiService } from './services/touch-board-midi.service';
import { SwitchboardService } from './services/switchboard-service';

@Component({
  selector: 'polysynth-root',
  // templateUrl: './app.component.html',
  template: `
    <polysynth-control-panel (onsettingchange)="sendMessage($event)"></polysynth-control-panel>
    <polysynth-keyboard (onnote)="sendMessage($event)"></polysynth-keyboard>
  `
})
export class AppComponent {
  constructor(private synth: SynthService, private midi: TouchBoardMidiService) {

    let self = this;
    // hook midi device into synth stream, IF exists
    midi.setup()
      .then(
        () => {
          midi.midiNotes$.subscribe((noteMessage) => {
            self.synth.receiveMessage(noteMessage);
          })
        },
        () => {
          console.log('no midi for you.');
        }
    );
  }
  sendMessage(event: SynthInputMessage) {
    this.synth.receiveMessage(event);
  }
}
