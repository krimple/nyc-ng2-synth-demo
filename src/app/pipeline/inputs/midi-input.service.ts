import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {SynthNoteMessage, SynthNoteOff, SynthNoteOn} from "../../models/synth-note-message";

@Injectable()
export class MidiInputService {

    inputs: any[] = []; // TODO - stronger typing

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

    private _noteOutputStream: Subject<SynthNoteMessage>;

    get noteStream$() {
        return this._noteOutputStream;
    }

    setup(): Promise<void> {
        // will emit notes to target
        this._noteOutputStream = new Subject<SynthNoteMessage>();

        return new Promise((resolve, reject) => {
            if ("navigator" in window && "requestMIDIAccess" in window['navigator']) {
                let service = this;   // async callbacks from other objects like navigator don't fix 'this'
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
                                service.inputs.push({key: result.value, value: access.inputs.get(result.value)});
                            }
                            resolve();
                        });
                } catch (e) {
                    console.log('MIDI Access denied, no stairway :(');
                    reject();
                }
            } else {
                reject();
            }
        });
    }

    public connectDefaultInput(): Promise<void> {
        if (this.inputs && this.inputs.length > 0) {
            return this.connect(this.inputs[0]);
        } else {
            alert('no inputs');
        }
    }

    connect(input): Promise<void> {
        let service = this;
        return new Promise<void>((resolve, reject) => {
            input.value.open()
                .then(
                    (channelInputStream$: any) => {
                        channelInputStream$.onmidimessage = (message) => {
                            let noteMessage = this.decode(message);
                        };
                        resolve();
                    },
                    (error) => {
                        console.error('Failure opening MIDI channel', error);
                        reject();
                    });
        });
    }

    decode(message): void {
        switch (message.data[0]) {
            case 145:
                if (message.data[1] === 1) {
                    console.log('mod level set to to', message.data[2]);
                } else if (message.data[1] === 2) {
                    console.log('waveform set to', message.data[2]);
                } else if (message.data[1] === 3) {
                    console.log('volume set to', message.data[2]);
                } else {
                    console.log('hell only knows the data you are sending...');
                }
                break;
            case 144:
                // note on for midi message with proper number
                this._noteOutputStream.next(
                    new SynthNoteOn(this.noteTransforms[message.data[1]]));
                break;
            case 128:
                this._noteOutputStream.next(
                    new SynthNoteOff(this.noteTransforms[message.data[1]]));
                break;
            default:
                // TODO not sure
                console.log("invalid message?", message);
                return null;
        }
    }
}
