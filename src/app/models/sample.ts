import {Subject} from "rxjs";
export class Sample {
     public arrayBuffer: ArrayBuffer;
     public audioBuffer: AudioBuffer;
     public gain: GainNode;
     public playing: boolean = false;

     constructor(public fileName: string) {
     }
}
