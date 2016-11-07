import {Component} from "@angular/core";
import {DrumPCMTriggeringService} from "../../pipeline/synthesis/drum-pcm-triggering.service";
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
   constructor(private drumService: DrumPCMTriggeringService) { }

   play(instrument: string) {
        console.log(`playing ${instrument}`);
        switch (instrument) {
            case 'bass':
                this.drumService.triggers.bass.noteStream$.next();
                break;
            case 'snare':
                this.drumService.triggers.snare.noteStream$.next();
                break;
            case 'rimshot':
                this.drumService.triggers.rimshot.noteStream$.next();
                break;
            case 'flam':
                this.drumService.triggers.flam.noteStream$.next();
                break;
            case 'htrimshot':
                this.drumService.triggers.htrimshot.noteStream$.next();
                break;
               case 'tom1':
                this.drumService.triggers.tom1.noteStream$.next();
                break;
            case 'tom2':
                this.drumService.triggers.tom2.noteStream$.next();
                break;
            case 'hihat':
                this.drumService.triggers.hihat.noteStream$.next();
                this.drumService.triggers.hihatopen.noteStream$.next('stop');
                break;
            case 'hihatopen':
                this.drumService.triggers.hihatopen.noteStream$.next();
                break;
             case 'crash':
                this.drumService.triggers.crash.noteStream$.next();
                break;
            case 'ride':
                this.drumService.triggers.ride.noteStream$.next();
                break;
            case 'ping':
                this.drumService.triggers.ping.noteStream$.next();
                break;
             default:
                console.error(`I don't know this note`);
        }
    }
}
