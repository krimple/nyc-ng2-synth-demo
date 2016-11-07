import {Subject} from "rxjs";
export class Trigger {
      public noteStream$: Subject<string>;
      public arrayBuffer: ArrayBuffer;
      public audioBuffer: AudioBuffer;
      public gain: GainNode;
      public playing: boolean = false;

     constructor(public fileName: string) {
         this.noteStream$ = new Subject<string>();
     }
}