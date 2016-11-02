import {Subject} from 'rxjs';
import {SynthInputMessage, MESSAGE_TYPE} from './synth-input-message';
import {Oscillator} from './oscillator';
import 'rxjs/add/operator/filter';

export class SynthNoteMessage {
  protected _note: string;

  constructor(note) {
    this._note = note;
  }

  get note(): string {
    return this._note;
  }
}

export class SynthNoteOn extends SynthNoteMessage {
  constructor(note: string) {
    super(note);
  }
}

export class SynthNoteOff extends SynthNoteMessage {
  constructor(note: string) {
    super(note);
  }
}
