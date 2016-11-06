import {Subject} from "rxjs";
export class Trigger {
      public noteStream$: Subject<string>;
      public arrayBuffer: ArrayBuffer;
      public audioBuffer: AudioBuffer;

     constructor(public fileName: string) {
         this.noteStream$ = new Subject<string>();
     }
}