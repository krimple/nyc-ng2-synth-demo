import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {
  SynthNoteOff, SynthNoteOn, VolumeChange, SynthMessage, WaveformChange
} from "../../../models/synth-note-message";

@Injectable()
export class MidiInputService {

  inputs: any[] = []; // TODO - stronger typing

  // reference to pipeline's synth service stream
  private synthStream$: Subject<SynthMessage>;

  noteTransforms = {
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

  setup(synthStream$: Subject<SynthMessage>) {
    let self = this;

    // hold ref to synth note and control stream
    self.synthStream$ = synthStream$;

    // request MIDI access
    if ("navigator" in window && "requestMIDIAccess" in window['navigator']) {
      try {
        window.navigator['requestMIDIAccess']().then(
          (access) => {
            let loopCondition = access.inputs.keys();
            while (true) {
              let result = loopCondition.next();
              if (result.done === true) {
                break;
              }
              // otherwise let's add the input we found
              self.inputs.push({key: result.value, value: access.inputs.get(result.value)});
            }
            // TODO - for now, use only first input, later add dropdown to control panel
            // and connect the one selected on demand
            self.connectDefaultInput();
          });
      } catch (e) {
        console.log('MIDI Access denied, no stairway :(');
      }
    }
  }

  private connectDefaultInput() {
    if (this.inputs && this.inputs.length > 0) {
      return this.connect(this.inputs[0]);
    } else {
      console.log('no midi inputs');
    }
  }

  // does the heavy lifting
  private connect(input) {
    let self = this;
      input.value.open()
        .then(
          (channelInputStream$: any) => {
            channelInputStream$.onmidimessage = (midiChannelData) => {
              let parsedMessage: SynthMessage = self.decode(midiChannelData);
              // some notes don't map to a message, ignore those
              if (parsedMessage) {
                self.synthStream$.next(parsedMessage);
              }
            };
          },
          (error) => {
            console.error('Failure opening MIDI channel', error);
          });
  }

  private decode(midiChannelMessage): SynthMessage {
    let response: SynthMessage = null;
    switch (midiChannelMessage.data[0]) {
      case 145:
        if (midiChannelMessage.data[1] === 1) {
          console.log('mod level set to to', midiChannelMessage.data[2]);
          // no response
        } else if (midiChannelMessage.data[1] === 2) {
          response = new WaveformChange(midiChannelMessage.data[2]);
        } else if (midiChannelMessage.data[1] === 3) {
          response = new VolumeChange(midiChannelMessage.data[2]);
        } else {
          // TODO WTH?
        }
        break;
      case 144:
        // note on for midi midiChannelMessage with proper number
        response = new SynthNoteOn(this.noteTransforms[midiChannelMessage.data[1]]);
        break;
      case 128:
        response = new SynthNoteOff(this.noteTransforms[midiChannelMessage.data[1]]);
        break;
      default:
        // TODO not sure, nothing returned
        console.log("invalid midiChannelMessage?", midiChannelMessage);
    }
    return response;
  }
}
