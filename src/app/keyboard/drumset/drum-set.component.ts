import {Component} from "@angular/core";
import {DrumPCMTriggeringService} from "../../pipeline/synthesis/drum-pcm-triggering.service";
@Component({
   selector: 'synth-drumset',
   template: `
<div class="row">
  <div class="col-xs-3 ma-3 bg-primary" (touchstart)="play('bass')">Bass<br/><br/></div>
  <div class="col-xs-3 ma-3 bg-primary" (touchstart)="play('snare')">Snare<br/><br/></div>
  <div class="col-xs-3 bg-primary" (touchstart)="play('tom1')">Tom1<br/><br/></div>
  <div class="col-xs-3 bg-primary" (touchstart)="play('tom2')">Tom2<br/><br/></div>
</div>
<div class="row">
  <div class="col-xs-2 bg-primary" (touchstart)="play('hihat')">Hi-Hat<br/><br/></div>
  <div class="col-xs-2 bg-primary" (touchstart)="play('crash')">Crash<br/><br/></div>
  <div class="col-xs-2 bg-primary" (touchstart)="play('ride')">Ride<br/><br/></div>
</div>
   `
})
export class DrumSetComponent {
   constructor(private drumService: DrumPCMTriggeringService) {

   }
    play(instrument: string) {
        console.log(`playing ${instrument}`);
        switch (instrument) {
            case 'bass':
                this.drumService.triggers.bass.noteStream$.next('bass');
                break;
            case 'snare':
                this.drumService.triggers.snare.noteStream$.next('snare');
                break;
            case 'tom1':
                this.drumService.triggers.tom1.noteStream$.next('tom1');
                break;
            case 'tom2':
                this.drumService.triggers.tom2.noteStream$.next('tom2');
                break;
            case 'hihat':
                this.drumService.triggers.hihat.noteStream$.next('hihat');
                break;
            case 'crash':
                this.drumService.triggers.crash.noteStream$.next('crash');
                break;
            case 'ride':
                this.drumService.triggers.ride.noteStream$.next('ride');
                break;
            default:
                console.error(`I don't know this note`);
        }
    }
}
