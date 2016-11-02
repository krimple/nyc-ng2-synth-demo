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

    // wire up compressor before volume fader
    this.mainMixCompressor = new DynamicsCompressorNode();
    this.mainMixCompressor.connect(this.mainMixFinalGain);

    // wire up volume fader
    this.mainMixFinalGain = new GainNode();
    this.mainMixFinalGain.gain.value = 1.0;
    this.mainMixFinalGain.connect(this.mainMixOutput);
  }

  public setVolume(gain: number) {
    this.mainMixFinalGain.gain.value = gain;
  }
}