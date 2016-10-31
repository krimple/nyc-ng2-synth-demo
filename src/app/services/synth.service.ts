import { Injectable } from '@angular/core';
import { SynthInputMessage, MESSAGE_TYPE } from '../models/synth-input-message';
import { Subject } from 'rxjs';
import { SynthNote } from '../models/synth-note';
import { NoteTranslationService } from './note-translation.service';
import { SwitchboardService } from './switchboard-service';

@Injectable()
export class SynthService {
  // send a message to the synth upon receipt from outside world
  public receiveMessage(message: SynthInputMessage) {
    console.dir(message);
    this.messageQueue$.next(message);
  }

  private currentWaveForm = 'sawtooth';

  // take that, I WANT MY JAVASCRIPT TO BE SIMPLE PEOPLE!!! :)
  private audioContext: AudioContext =
    new (window['AudioContext'] || window['webkitAudioContext'])();

  private notes;

  private destination: AudioDestinationNode = this.audioContext.destination;

  private compressor: DynamicsCompressorNode = this.audioContext.createDynamicsCompressor();

  // central switchboard observable / observer
  private messageQueue$: Subject<SynthInputMessage>;

  constructor(noteTranslationService: NoteTranslationService) {
    
  this.messageQueue$ = new Subject<SynthInputMessage>();
  this.compressor.connect(this.destination);
    
    // configure note mappings
    this.notes = {
       'C2': new SynthNote('C2', this.currentWaveForm, noteTranslationService.getFrequency('C2'), this.audioContext, this.compressor),
       'D2': new SynthNote('D2', this.currentWaveForm, noteTranslationService.getFrequency('D2'), this.audioContext, this.compressor),
       'E2': new SynthNote('E2', this.currentWaveForm, noteTranslationService.getFrequency('E2'), this.audioContext, this.compressor),
       'F2': new SynthNote('F2', this.currentWaveForm, noteTranslationService.getFrequency('F2'), this.audioContext, this.compressor),
       'G2': new SynthNote('G2', this.currentWaveForm, noteTranslationService.getFrequency('G2'), this.audioContext, this.compressor),
       'A2': new SynthNote('A2', this.currentWaveForm, noteTranslationService.getFrequency('A2'), this.audioContext, this.compressor),
       'B2': new SynthNote('B2', this.currentWaveForm, noteTranslationService.getFrequency('B2'), this.audioContext, this.compressor),
       'C#2': new SynthNote('C#2', this.currentWaveForm, noteTranslationService.getFrequency('C#2'), this.audioContext, this.compressor),
       'D#2': new SynthNote('D#2', this.currentWaveForm, noteTranslationService.getFrequency('D#2'), this.audioContext, this.compressor),
       'F#2': new SynthNote('F#2', this.currentWaveForm, noteTranslationService.getFrequency('F#2'), this.audioContext, this.compressor),
       'G#2': new SynthNote('G#2', this.currentWaveForm, noteTranslationService.getFrequency('G#2'), this.audioContext, this.compressor),
       'A#2': new SynthNote('A#2', this.currentWaveForm, noteTranslationService.getFrequency('A#2'), this.audioContext, this.compressor),
       'C3': new SynthNote('C3', this.currentWaveForm, noteTranslationService.getFrequency('C3'), this.audioContext, this.compressor),
       'D3': new SynthNote('D3', this.currentWaveForm, noteTranslationService.getFrequency('D3'), this.audioContext, this.compressor),
       'E3': new SynthNote('E3', this.currentWaveForm, noteTranslationService.getFrequency('E3'), this.audioContext, this.compressor),
       'F3': new SynthNote('F3', this.currentWaveForm, noteTranslationService.getFrequency('F3'), this.audioContext, this.compressor),
       'G3': new SynthNote('G3', this.currentWaveForm, noteTranslationService.getFrequency('G3'), this.audioContext, this.compressor),
       'A3': new SynthNote('A3', this.currentWaveForm, noteTranslationService.getFrequency('A3'), this.audioContext, this.compressor),
       'B3': new SynthNote('B3', this.currentWaveForm, noteTranslationService.getFrequency('B3'), this.audioContext, this.compressor),
       'C#3': new SynthNote('C#3', this.currentWaveForm, noteTranslationService.getFrequency('C#3'), this.audioContext, this.compressor),
       'D#3': new SynthNote('D#3', this.currentWaveForm, noteTranslationService.getFrequency('D#3'), this.audioContext, this.compressor),
       'F#3': new SynthNote('F#3', this.currentWaveForm, noteTranslationService.getFrequency('F#3'), this.audioContext, this.compressor),
       'G#3': new SynthNote('G#3', this.currentWaveForm, noteTranslationService.getFrequency('G#3'), this.audioContext, this.compressor),
       'A#3': new SynthNote('A#3', this.currentWaveForm, noteTranslationService.getFrequency('A#3'), this.audioContext, this.compressor),
       'C4': new SynthNote('C4', this.currentWaveForm, noteTranslationService.getFrequency('C4'), this.audioContext, this.compressor),
       'D4': new SynthNote('D4', this.currentWaveForm, noteTranslationService.getFrequency('D4'), this.audioContext, this.compressor),
       'E4': new SynthNote('E4', this.currentWaveForm, noteTranslationService.getFrequency('E4'), this.audioContext, this.compressor),
       'F4': new SynthNote('F4', this.currentWaveForm, noteTranslationService.getFrequency('F4'), this.audioContext, this.compressor),
       'G4': new SynthNote('G4', this.currentWaveForm, noteTranslationService.getFrequency('G4'), this.audioContext, this.compressor),
       'A4': new SynthNote('A4', this.currentWaveForm, noteTranslationService.getFrequency('A4'), this.audioContext, this.compressor),
       'B4': new SynthNote('B4', this.currentWaveForm, noteTranslationService.getFrequency('B4'), this.audioContext, this.compressor),
       'C#4': new SynthNote('C#4', this.currentWaveForm, noteTranslationService.getFrequency('C#4'), this.audioContext, this.compressor),
       'D#4': new SynthNote('D#4', this.currentWaveForm, noteTranslationService.getFrequency('D#4'), this.audioContext, this.compressor),
       'F#4': new SynthNote('F#4', this.currentWaveForm, noteTranslationService.getFrequency('F#4'), this.audioContext, this.compressor),
       'G#4': new SynthNote('G#4', this.currentWaveForm, noteTranslationService.getFrequency('G#4'), this.audioContext, this.compressor),
       'A#4': new SynthNote('A#4', this.currentWaveForm, noteTranslationService.getFrequency('A#4'), this.audioContext, this.compressor),
       'C5': new SynthNote('C5', this.currentWaveForm, noteTranslationService.getFrequency('C5'), this.audioContext, this.compressor),
       'D5': new SynthNote('D5', this.currentWaveForm, noteTranslationService.getFrequency('D5'), this.audioContext, this.compressor),
       'E5': new SynthNote('E5', this.currentWaveForm, noteTranslationService.getFrequency('E5'), this.audioContext, this.compressor),
       'F5': new SynthNote('F5', this.currentWaveForm, noteTranslationService.getFrequency('F5'), this.audioContext, this.compressor),
       'G5': new SynthNote('G5', this.currentWaveForm, noteTranslationService.getFrequency('G5'), this.audioContext, this.compressor),
       'A5': new SynthNote('A5', this.currentWaveForm, noteTranslationService.getFrequency('A5'), this.audioContext, this.compressor),
       'B5': new SynthNote('B5', this.currentWaveForm, noteTranslationService.getFrequency('B5'), this.audioContext, this.compressor),
       'C#5': new SynthNote('C#5', this.currentWaveForm, noteTranslationService.getFrequency('C#5'), this.audioContext, this.compressor),
       'D#5': new SynthNote('D#5', this.currentWaveForm, noteTranslationService.getFrequency('D#5'), this.audioContext, this.compressor),
       'F#5': new SynthNote('F#5', this.currentWaveForm, noteTranslationService.getFrequency('F#5'), this.audioContext, this.compressor),
       'G#5': new SynthNote('G#5', this.currentWaveForm, noteTranslationService.getFrequency('G#5'), this.audioContext, this.compressor),
       'A#5': new SynthNote('A#5', this.currentWaveForm, noteTranslationService.getFrequency('A#5'), this.audioContext, this.compressor)
    };

    this.setupSubscriptions();
  }


  private setupSubscriptions() {
    var self = this;
    // play notes when key is down
    this.messageQueue$
      .filter((message: SynthInputMessage) => message.messageType === MESSAGE_TYPE.KEYDOWN)
      .subscribe(
        (noteDownMessage: SynthInputMessage) => {
          let synthNote: SynthNote = self.notes[noteDownMessage.note];
          synthNote.play();
        }
      );
    // stop notes when key is up
    this.messageQueue$
      .filter((message: SynthInputMessage) => message.messageType === MESSAGE_TYPE.KEYUP)
      .subscribe(
        (noteDownMessage: SynthInputMessage) => {
          let synthNote: SynthNote = self.notes[noteDownMessage.note];
          synthNote.stop();
        }
      );
  }
}
