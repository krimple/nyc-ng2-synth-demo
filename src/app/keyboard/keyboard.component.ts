import { Component, EventEmitter, Output } from '@angular/core';
import {SynthNoteOn, SynthNoteOff} from "../models/synth-note-message";
import {PipelineService} from "../pipeline/pipeline.service";

@Component({
  selector: 'polysynth-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent {

  keyboardType: string = 'ionic';
  constructor(private pipelineService: PipelineService) { }

  playNote(noteValue) {
    //console.log('note value is', noteValue);
    this.pipelineService.noteStream$.next(new SynthNoteOn(noteValue));
  }
  stopNote(noteValue) {
      this.pipelineService.noteStream$.next(new SynthNoteOff(noteValue));
  }
}
