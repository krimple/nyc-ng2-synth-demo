import { Subject } from 'rxjs';

class OscillatorInstruction {
  constructor(public command: string, public value: number = 0) {}
}

export class Oscillator {
  private gainNode: GainNode;
  private oscillator: OscillatorNode;

  private noteActions$: Subject<OscillatorInstruction> = new Subject<OscillatorInstruction>();
  private baseFrequency: number;
  private playing: boolean = false;

  private decay: number = 1;
  private volume: number = 0.5;

  constructor(private frequency: number,
              private waveForm: string,
              private audioContext: AudioContext,
              private compressor: DynamicsCompressorNode) {

    // establish base
    this.baseFrequency = frequency;
    this.gainNode = audioContext.createGain();
    this.gainNode.gain.value = 0;
    this.oscillator = audioContext.createOscillator();
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(compressor);
    this.oscillator.type = waveForm;
    this.oscillator.frequency.value = this.baseFrequency;
    this.oscillator.start();

    this.noteActions$.subscribe(
      (action: OscillatorInstruction) => {
        switch(action.command) {
          case 'play':
            this.doPlay();
            break;
          case 'stop':
            this.doStop();
            break;
          case 'bend':
            this.doBend(action.value);
            break;
        }
      }
    )
  }

  play() {
    this.noteActions$.next(new OscillatorInstruction('play'));
  }

  stop() {
    this.noteActions$.next(new OscillatorInstruction('stop'));
  }

  bend(value: number) {
    this.noteActions$.next(new OscillatorInstruction('bend', value));
  }

  private doPlay() {
    if (this.playing) {
      return;
    }
    this.playing = true;
    this.gainNode.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + 0.2);
  }

  private doStop() {
    if (!this.playing) {
      return;
    }
    this.playing = false;
    this.gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + this.decay);
  }

  isPlaying() {
    return this.playing;
  }

  doBend(value: number) {
    this.oscillator.frequency.value = this.baseFrequency + value;
  }

  adjustVolume(value: number) {
     if (this.playing) {
       console.log('setting volume to', value);
       this.gainNode.gain.value = value;
     }
     //set for next time...
     this.volume = value;
  }

  setWaveForm(value: string) {
    this.oscillator.type = value;
  }
}