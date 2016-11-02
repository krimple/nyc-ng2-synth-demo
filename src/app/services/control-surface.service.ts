import { Injectable } from '@angular/core';
import { SynthInputMessage, MESSAGE_TYPE } from '../models/synth-input-message';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';

@Injectable()
export class ControlSurfaceService {
  /*private waveforms: Array<string> = ['sawtooth', 'sine', 'square', 'triangle'];

  surfaceWSSubject: WebSocketSubject<any>;

  constructor(private synthService: SynthService) {

  }

  setup(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        this.surfaceWSSubject = Observable.webSocket('ws://' + window.location.hostname + ':8080/data');
      } catch (e) {
        console.error(e);
        reject(false);
      }
      try {
        this.subscribe();
      } catch (e) {
        console.log('subscribing failed.');
        console.dir(e);
        reject(false);
      }
      resolve(true);
    });
  }

  subscribe() {
    this.surfaceWSSubject.subscribe((obj: any) => {
      console.dir(obj);
      let waveform;
      switch (true) {
        case obj[1] >= 0 && obj[1] < 255:
          waveform = this.waveforms[0];
          break;
        case obj[1] >= 255 && obj[1] < 512:
          waveform = this.waveforms[1];
          break;
        case obj[1] >= 512 && obj[1] < 768:
          waveform = this.waveforms[2];
          break;
        case obj[1] >= 768 && obj[1] <= 1023:
          waveform = this.waveforms[3];
          break;
        default:
          waveform = this.waveforms[0];
      }
      this.synthService.receiveMessage(new SynthInputMessage(MESSAGE_TYPE.SET_VOLUME, (obj[0] / 1023.0) + ''));
      this.synthService.receiveMessage(new SynthInputMessage(MESSAGE_TYPE.SET_WAVEFORM, waveform));
      this.synthService.receiveMessage(new SynthInputMessage(MESSAGE_TYPE.BEND, ((obj[2] - 511) / 10.0) + ''));
    });
  }
  */

}
