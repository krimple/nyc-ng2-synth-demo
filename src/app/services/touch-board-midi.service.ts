import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SynthInputMessage, MESSAGE_TYPE } from '../models/synth-input-message';

@Injectable()

export class TouchBoardMidiService {

  private noteTransforms = {
    36: 'C0', 37: 'D#0', 38: 'F0', 39: 'F#0', 40: 'G0', 41: 'A#0',
    42: 'C1', 43: 'D#1', 44: 'F1', 45: 'F#1', 46: 'G1', 47: 'A#1',
    48: 'C2', 49: 'D#2', 50: 'F2', 51: 'F#2', 52: 'G2', 53: 'A#2',
    54: 'C3', 55: 'D#3', 56: 'F3', 57: 'F#3', 58: 'G3', 59: 'A#3',
    60: 'C4', 61: 'D#4', 62: 'F4', 63: 'F#4', 64: 'G4', 65: 'A#4',
    66: 'C5', 67: 'D#5', 68: 'F5', 69: 'F#5', 70: 'G5', 71: 'A#5',
    72: 'C6', 73: 'D#6', 74: 'F6', 75: 'F#6', 76: 'G6', 77: 'A#6',
    78: 'C7', 79: 'D#7', 80: 'F7', 81: 'F#7', 82: 'G7', 83: 'A#7',
    84: 'C8', 85: 'D#8', 86: 'F8', 87: 'F#8', 88: 'G8', 89: 'A#8',
  };

  initialized: boolean = false;
  input: any;
  waveforms = ['sawtooth', 'sine', 'square', 'triangle'];
  currentWaveForm = 0;
  midiNotes$: Subject<SynthInputMessage> = new Subject<SynthInputMessage>();

  constructor() {
  }

  setup(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (window.navigator['requestMIDIAccess']) {
        let service = this;   // async callbacks from other objects like navigator don't fix 'this'
        window.navigator['requestMIDIAccess']().then(
          (access) => {
            // TODO - export list of inputs for UI control panel assignment
            let input1key = access.inputs.keys().next();
            service.input = access.inputs.get(input1key.value);

            // set up listener
            service.input.open()
              .then((channelInputStream$: any) => {
                window['channelInputStream$'] = channelInputStream$;
                channelInputStream$.onmidimessage = (message) => {
                  let note = this.noteTransforms[message.data[1]];
                  console.log('note', note);
                  if (message.data[1] === 59 && message.data[0] === 144) {
                    this.currentWaveForm = this.currentWaveForm > 3 ? 0 : this.currentWaveForm + 1;
                    console.log('current waveform is', this.currentWaveForm, this.waveforms[this.currentWaveForm]);
                    this.midiNotes$.next(new SynthInputMessage(MESSAGE_TYPE.SET_WAVEFORM,
                      this.waveforms[this.currentWaveForm]));
                  } else {
                    switch (message.data[0]) {
                      case 144:
                        this.midiNotes$.next(new SynthInputMessage(MESSAGE_TYPE.KEYDOWN, null, note));
                        break;
                      case 128:
                        this.midiNotes$.next(new SynthInputMessage(MESSAGE_TYPE.KEYUP, null, note));
                        break;
                      default:
                        console.error('invalid message, ignoring.');
                    }
                  }
                };
              });
          });
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
}
