import {Component, OnInit} from "@angular/core";
import {DrumPCMTriggeringService} from "../../services/pipeline/synthesis/drum-pcm-triggering.service";
import {SequencerService} from "../../services/sequencer.service";
import {Observable} from "rxjs";
import {PipelineService} from "../../services/pipeline/pipeline.service";
import {TriggerSample} from "../../models/synth-note-message";
@Component({
   selector: 'synth-drumset',
   styles: [
      `.trigger-blocks {
         display: flex;
         flex-direction: row;
         flex-wrap: wrap;
      }`,
      `.trigger-block {
         padding: 5px;
         margin: 5px;
         min-width: 175px !important;
         max-height: 100px !important;
         color: yellow;
         font-size: 1.7em;
         text-align: center;
         vertical-align: middle;
         background-color: darkblue;
      }`
   ],
   providers: [
     SequencerService
   ],
   template: `
<div class="trigger-blocks">
  <div class="trigger-block" (touchstart)="play('bass')">Bass</div>
  <div class="trigger-block" (touchstart)="play('snare')">Snare</div>
  <div class="trigger-block" (touchstart)="play('flam')">Flam</div>
  <div class="trigger-block" (touchstart)="play('rimshot')">Rimshot</div>
  <div class="trigger-block" (touchstart)="play('htrimshot')">T1 Rim</div>
  <div class="trigger-block" (touchstart)="play('tom1')">Tom1</div>
  <div class="trigger-block" (touchstart)="play('tom2')">Tom2</div>
  <div class="trigger-block" (touchstart)="play('hihat')">Closed-Hat</div>
  <div class="trigger-block" (touchstart)="play('hihatopen')">Open-Hat</div>
  <div class="trigger-block" (touchstart)="play('crash')">Crash</div>
  <div class="trigger-block" (touchstart)="play('ride')">Ride</div>
  <div class="trigger-block" (touchstart)="play('ping')">Ping</div>
  </div>
   `
})
export class DrumSetComponent {

   constructor(private pipelineService: PipelineService) { }

  play(instrument: string) {
     this.pipelineService.synthStream$.next(new TriggerSample(instrument));
  }
}
