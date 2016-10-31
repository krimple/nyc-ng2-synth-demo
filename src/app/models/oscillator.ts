import { Subject } from 'rxjs';
export class Oscillator {
  private gainNode: GainNode;
  private oscillator: OscillatorNode;

  private noteActions$: Subject<string> = new Subject<string>();
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
      (action: string) => {
        switch(action) {
          case 'play':
            this.doPlay();
            break;
          case 'stop':
            this.doStop();
            break;
        }
      }
    )
  }

  play() {
    this.noteActions$.next("play");
  }

  stop() {
    this.noteActions$.next("stop");
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

  bend(value: number) {
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