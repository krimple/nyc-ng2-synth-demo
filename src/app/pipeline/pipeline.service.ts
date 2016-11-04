import { MidiInputService } from './inputs/midi-input.service';
import { SynthesisService } from './synthesis/synthesis.service';
import { AudioOutputService } from './outputs/audio-output.service';
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {SynthNoteMessage, SynthNoteOn, SynthNoteOff} from "../models/synth-note-message";

@Injectable()
export class PipelineService {

  private audioContext: AudioContext;

  // allow other objects to hook into the service and send s
  public noteStream$ = new Subject<SynthNoteMessage>();

  constructor(private midiInputService: MidiInputService,
              private synthesisService: SynthesisService,
              private audioOutputService: AudioOutputService) {
      this.audioContext = window['theAudioContext'];
      /*      if ('webkitAudioContext' in window) {
          this.audioContext = new window['webkitAudioContext']();
      } else if ('AudioContext' in window) {
          this.audioContext = new window['AudioContext']();
      } else {
          alert('no audio context available.');
      }
      */
  }

  begin() {
    let self = this;
    // setup outputs
    this.audioOutputService.configure(this.audioContext);

    // setup synth
    this.synthesisService.setup(this.audioContext, this.audioOutputService.mainMixCompressor);

    // setup inputs
    this.midiInputService.setup()
      .then(
        () => {
          if (this.midiInputService.inputs.length > 0) {
            self.midiInputService.connectDefaultInput();
            // forward notes to the note input service
            this.midiInputService.noteStream$.subscribe(
                (message: SynthNoteMessage) => {
                    this.noteStream$.next(message);
                });
          } else {
            console.log('no inputs available');
          }
        },
          () => {
              console.log("MIDI Unavailable");
          }
      );

    // now send all note inputs coming from midi and non-midi sources (web page components, etc)
    this.noteStream$.subscribe(
        (message) => {
            this.synthesisService.receiveMessage(message);
        }
    );
  }

  end() {
    // TODO - disconnect
  }

}