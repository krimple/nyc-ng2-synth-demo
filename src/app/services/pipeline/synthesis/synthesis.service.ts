import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SynthNote } from '../../../models/synth-note';
import {
  SynthNoteMessage, SynthNoteOff, SynthNoteOn, ClockTick, SynthMessage,
  WaveformChange
} from "../../../models/synth-note-message";

@Injectable()
export class SynthesisService {

  private audioContext: AudioContext;
  private targetNode: AudioNode;

  // send a message to the synth upon receipt from outside world
  public receiveMessage(message: SynthMessage) {
    this.noteStream$.next(message);
  }

  // TODO - figure out how to modify on the fly (event?)
  private currentWaveForm = 'sawtooth';

  // object literal
  private notes: any;

  // central switchboard observable / observer
  public noteStream$: Subject<SynthMessage>;

  constructor() { }

  public setup(audioContext: AudioContext, targetNode: AudioNode) {
    this.audioContext = audioContext;
    this.targetNode = targetNode;
    this.noteStream$ = new Subject<SynthMessage>();
    //this.setupNotes(audioContext, targetNode);
    this.setupSubscriptions();
  }

  private setupSubscriptions() {
    var self = this;
    this.noteStream$
      .subscribe(
        (message: SynthMessage) => {
          if (message instanceof SynthNoteOn) {
              console.log('playing message', message, 'with waveform', self.currentWaveForm);
              let synthNote: SynthNote = new SynthNote(message.note, self.currentWaveForm, self.audioContext, self.targetNode);
              synthNote.play();
          } else if (message instanceof ClockTick) {
            console.log('pulse!');
            self.clockTick();
          } else if (message instanceof SynthNoteOff) {
            console.log('synthnote off sent. Ignoring...');
          } else if (message instanceof WaveformChange) {
            console.log('new waveform value is ', message.waveForm);
            self.currentWaveForm = message.waveForm;
          } else {
             console.log('unknown message');
              console.dir(message);
          }
        }
      );
  }

  private clockTick() {
   let oscillator = this.audioContext.createOscillator();
   let gain = this.audioContext.createGain();
    gain.gain.value = 0.2;
    oscillator.connect(gain);
    gain.connect(this.targetNode);
    oscillator.type = "square";
    oscillator.frequency.value = 1000;
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 100);
  }
}
