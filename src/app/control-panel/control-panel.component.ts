import { Component } from '@angular/core';
import { SynthService } from '../services/synth.service';
import { SynthInputMessage, MESSAGE_TYPE } from '../models/synth-input-message';

@Component({
  selector: 'polysynth-control-panel',
  template: `
  <button (click)="emitSysex()">SYSEX</button>
  `,
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent {

  constructor(private synthService: SynthService) { }
  emitSysex() {
    this.synthService.receiveMessage(new SynthInputMessage(MESSAGE_TYPE.SYSEX, null));
  }

}
