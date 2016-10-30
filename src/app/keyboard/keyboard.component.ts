import { Component, EventEmitter, Output } from '@angular/core';
import { SynthInputMessage, MESSAGE_TYPE } from '../models/synth-input-message';

@Component({
  selector: 'polysynth-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent {
  @Output() onnote = new EventEmitter<SynthInputMessage>();

  playNote(noteValue) {
    console.log('note value is', noteValue);
    this.onnote.emit( new SynthInputMessage(MESSAGE_TYPE.KEYDOWN, null, noteValue));
  }
  stopNote(noteValue) {
    this.onnote.emit( new SynthInputMessage(MESSAGE_TYPE.KEYUP, null, noteValue));
  }
}
