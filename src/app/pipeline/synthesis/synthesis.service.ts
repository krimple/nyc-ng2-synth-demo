import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SynthNote } from '../../models/synth-note';
import {SynthNoteMessage, SynthNoteOff, SynthNoteOn} from "../../models/synth-note-message";

@Injectable()
export class SynthesisService {

  // send a message to the synth upon receipt from outside world
  public receiveMessage(message: SynthNoteMessage) {
    this.noteStream$.next(message);
  }

  // TODO - figure out how to modify on the fly (event?)
  private currentWaveForm = 'sawtooth';

  // object literal
  private notes: any;

  // central switchboard observable / observer
  public noteStream$: Subject<SynthNoteOn| SynthNoteOff>;

  constructor() { } 
  
  public setup(audioContext: AudioContext, targetNode: AudioNode) {
    this.noteStream$ = new Subject<SynthNoteOn| SynthNoteOff>();
    this.setupNotes(audioContext, targetNode);
    this.setupSubscriptions();
  }

  private setupNotes(audioContext: AudioContext, targetNode: AudioNode) {
    // configure note mappings
    this.notes = {
      'C2': new SynthNote('C2', audioContext, targetNode),
      'D2': new SynthNote('D2', audioContext, targetNode),
      'E2': new SynthNote('E2', audioContext, targetNode),
      'F2': new SynthNote('F2', audioContext, targetNode),
      'G2': new SynthNote('G2', audioContext, targetNode),
      'A2': new SynthNote('A2', audioContext, targetNode),
      'B2': new SynthNote('B2', audioContext, targetNode),
      'C#2': new SynthNote('C#2', audioContext, targetNode),
      'D#2': new SynthNote('D#2', audioContext, targetNode),
      'F#2': new SynthNote('F#2', audioContext, targetNode),
      'G#2': new SynthNote('G#2', audioContext, targetNode),
      'A#2': new SynthNote('A#2', audioContext, targetNode),
      'C3': new SynthNote('C3', audioContext, targetNode),
      'D3': new SynthNote('D3', audioContext, targetNode),
      'E3': new SynthNote('E3', audioContext, targetNode),
      'F3': new SynthNote('F3', audioContext, targetNode),
      'G3': new SynthNote('G3', audioContext, targetNode),
      'A3': new SynthNote('A3', audioContext, targetNode),
      'B3': new SynthNote('B3', audioContext, targetNode),
      'C#3': new SynthNote('C#3', audioContext, targetNode),
      'D#3': new SynthNote('D#3', audioContext, targetNode),
      'F#3': new SynthNote('F#3', audioContext, targetNode),
      'G#3': new SynthNote('G#3', audioContext, targetNode),
      'A#3': new SynthNote('A#3', audioContext, targetNode),
      'C4': new SynthNote('C4', audioContext, targetNode),
      'D4': new SynthNote('D4', audioContext, targetNode),
      'E4': new SynthNote('E4', audioContext, targetNode),
      'F4': new SynthNote('F4', audioContext, targetNode),
      'G4': new SynthNote('G4', audioContext, targetNode),
      'A4': new SynthNote('A4', audioContext, targetNode),
      'B4': new SynthNote('B4', audioContext, targetNode),
      'C#4': new SynthNote('C#4', audioContext, targetNode),
      'D#4': new SynthNote('D#4', audioContext, targetNode),
      'F#4': new SynthNote('F#4', audioContext, targetNode),
      'G#4': new SynthNote('G#4', audioContext, targetNode),
      'A#4': new SynthNote('A#4', audioContext, targetNode),
      'C5': new SynthNote('C5', audioContext, targetNode),
      'D5': new SynthNote('D5', audioContext, targetNode),
      'E5': new SynthNote('E5', audioContext, targetNode),
      'F5': new SynthNote('F5', audioContext, targetNode),
      'G5': new SynthNote('G5', audioContext, targetNode),
      'A5': new SynthNote('A5', audioContext, targetNode),
      'B5': new SynthNote('B5', audioContext, targetNode),
      'C#5': new SynthNote('C#5', audioContext, targetNode),
      'D#5': new SynthNote('D#5', audioContext, targetNode),
      'F#5': new SynthNote('F#5', audioContext, targetNode),
      'G#5': new SynthNote('G#5', audioContext, targetNode),
      'A#5': new SynthNote('A#5', audioContext, targetNode)
    };
  }

  private setupSubscriptions() {
    var self = this;
    this.noteStream$
      .subscribe(
        (message: SynthNoteMessage) => {
          let synthNote: SynthNote = self.notes[message.note];
          if (message.action === "OFF")  {
              synthNote.stop();
          } else if (message.action === "ON") {
              synthNote.play();
          } else {
              console.log(JSON.stringify(message));
          }
        }
      );
  }
}
