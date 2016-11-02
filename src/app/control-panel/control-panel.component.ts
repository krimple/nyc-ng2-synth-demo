import { Component, OnInit } from '@angular/core';
import { MidiInputService } from '../pipeline/inputs/midi-input.service';

// TODO - REALLY REFACTOR
@Component({
  selector: 'polysynth-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  constructor(private midiInputService: MidiInputService) { }

  ngOnInit() {
    let self = this;
    this.midiInputService.setup()
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
