import { Component, EventEmitter, Output } from '@angular/core';
import {SynthNoteOn, SynthNoteOff} from "../../models/synth-note-message";
import {PipelineService} from "../../services/pipeline/pipeline.service";
import { DrumPCMTriggeringService } from '../../services/pipeline/synthesis/drum-pcm-triggering.service';

@Component({
  templateUrl: 'minor-blues-keyboard.component.html',
  styles: [
     ` svg { position: relative; top: 0px; left: 0px; }
     `
  ]
  //styleUrls: ['minor-ionian-keyboard.component.css']
})
export class MinorBluesKeyboardComponent {

  keyboardType: string = 'ionian';
  constructor(private pipelineService: PipelineService) { }

  playNote(noteValue) {
    this.pipelineService.noteStream$.next(new SynthNoteOn(noteValue));
  }
  stopNote(noteValue) {
    this.pipelineService.noteStream$.next(new SynthNoteOff(noteValue));
  }
}
