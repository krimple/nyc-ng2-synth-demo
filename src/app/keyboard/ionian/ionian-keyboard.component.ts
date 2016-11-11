import { Component, EventEmitter, Output } from '@angular/core';
import {SynthNoteOn, SynthNoteOff} from "../../models/synth-note-message";
import {PipelineService} from "../../services/pipeline/pipeline.service";
import { DrumPCMTriggeringService } from '../../services/pipeline/synthesis/drum-pcm-triggering.service';

@Component({
  templateUrl: 'ionian-keyboard.component.html',
  styleUrls: ['ionian-keyboard.component.css']
})
export class IonianKeyboardComponent {

  keyboardType: string = 'ionian';
  constructor(private pipelineService: PipelineService) { }

  playNote(noteValue) {
    this.pipelineService.noteStream$.next(new SynthNoteOn(noteValue));
  }
  stopNote(noteValue) {
    this.pipelineService.noteStream$.next(new SynthNoteOff(noteValue));
  }
}
