import {Subject} from 'rxjs';
import {SynthInputMessage, MESSAGE_TYPE} from './synth-input-message';
import {NoteTranslationService} from '../services/note-translation.service';
import {Oscillator} from './oscillator';
import 'rxjs/add/operator/filter';

export class SynthNote {
  oscillator: Oscillator;

  constructor(private note: string,
              private waveForm: string,
              private noteFreq: number,
              private audioContext: AudioContext,
              private compressor: DynamicsCompressorNode) {
    this.oscillator = new Oscillator(noteFreq, waveForm, audioContext, compressor);
  }

  public play() {
    this.oscillator.play();
  }

  public stop() {
    this.oscillator.stop();
  }
}