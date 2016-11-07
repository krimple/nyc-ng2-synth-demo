import { Component, EventEmitter, Output } from '@angular/core';
import {SynthNoteOn, SynthNoteOff} from "../../models/synth-note-message";
import {PipelineService} from "../../pipeline/pipeline.service";
import { DrumPCMTriggeringService } from '../../pipeline/synthesis/drum-pcm-triggering.service';

@Component({
  selector: 'polysynth-keyboard',
  templateUrl: 'piano-keyboard.component.html',
  styleUrls: ['piano-keyboard.component.css']
})
export class PianoKeyboardComponent {

  keyboardType: string = 'ionian';
  constructor(private pipelineService: PipelineService) { }

  playNote(noteValue) {
    this.pipelineService.noteStream$.next(new SynthNoteOn(noteValue));
  }
  stopNote(noteValue) {
    this.pipelineService.noteStream$.next(new SynthNoteOff(noteValue));
  }
}
