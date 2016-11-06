import {Component} from "@angular/core";
import {DrumPCMTriggeringService} from "../pipeline/synthesis/drum-pcm-triggering.service";
@Component({
   selector: 'synth-drumset',
   template: `
<div class="row">
  <div class="col-xs=2">
      <button (touchstart)="play('bass')" class="alert">BASS></button>
      <button (touchstart)="play('snare')" class="alert">SNARE</button>
      <button (touchstart)="play('tom1')" class="btn btn-secondary btn-lg">TOM1</button>
      <button (touchstart)="play('tom2')" class="btn btn-secondary btn-lg">TOM2</button>
      <button (touchstart)="play('hihat')" class="btn btn-secondary btn-lg">HIHAT</button>
      <button (touchstart)="play('crash')" class="btn btn-secondary btn-lg">CRASH</button>
      <button (touchstart)="play('ride')" class="btn btn-secondary btn-lg">RIDE</button>
  </div>
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