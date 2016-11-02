import { MidiInputService } from './inputs/midi-input.service';
import { SynthesisService } from './synthesis/synthesis.service';
import { AudioOutputService } from './outputs/audio-output.service';
import { NoteMessage } from '../services/switchboard-service';
export class PipelineService {


  private audioContext: AudioContext;

  constructor(private midiInputService: MidiInputService, private synthesisService: SynthesisService,
              private audioOutputService: AudioOutputService) {
    try {
      this.audioContext = (window['AudioContext'] || window['webkitAudioContext'])();
    } catch(e) {
      alert('no audio context available.');
      console.error(e);
    }
  }

  begin() {
    let self = this;
    // setup outputs
    this.audioOutputService.configure(this.audioContext);

    // setup inputs
    this.midiInputService.setup()
      .then(
        () => {
          if (this.midiInputService.inputs.length > 0) {
            self.midiInputService.connectDefaultInput();
          } else {
            console.log('no inputs available');
          }
        }
      );
    this.synthesisService.setup(this.audioContext, this.audioOutputService.mainMixCompressor);
  }

  end() {
    // TODO - disconnect
  }

}