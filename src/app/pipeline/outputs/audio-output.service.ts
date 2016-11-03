export class AudioOutputService {

  // the final mix elements
  public mainMixCompressor: DynamicsCompressorNode;
  private mainMixFinalGain: GainNode;
  private mainMixOutput: AudioDestinationNode;

  constructor() {
  }

  configure(audioContext: AudioContext) {
    // wire up audio
    this.mainMixOutput = audioContext.destination;
    this.mainMixCompressor = audioContext.createDynamicsCompressor();
    this.mainMixFinalGain = audioContext.createGain();
    this.mainMixFinalGain.gain.value = 1.0;
    this.mainMixCompressor.connect(this.mainMixFinalGain);
    this.mainMixFinalGain.connect(this.mainMixOutput);
  }

  public setVolume(gain: number) {
    this.mainMixFinalGain.gain.value = gain;
  }
}