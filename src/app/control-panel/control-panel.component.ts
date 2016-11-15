import { Component, OnInit } from '@angular/core';
import { MidiInputService } from '../services/pipeline/inputs/midi-input.service';
import {SequencerService} from "../services/sequencer.service";

// TODO - REALLY REFACTOR
@Component({
  selector: 'polysynth-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
  providers: [
    SequencerService
  ]
})
export class ControlPanelComponent {

  constructor(private sequencer: SequencerService) { }

  record() {
    this.sequencer.record();
  }

  stop() {
    this.sequencer.stop();
  }

  playback() {
    this.sequencer.playback();
  }

  emitSysex() {
    // TODO
    // this.synthService.receiveMessage(new SynthInputMessage(MESSAGE_TYPE.SYSEX, null));
  }

  bendNote(event) {
    // TODO
    // let value = event.target.value;
    // this.synthService.receiveMessage(new SynthInputMessage(MESSAGE_TYPE.BEND, value));
  }

}
