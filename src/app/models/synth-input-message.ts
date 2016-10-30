import { Injectable } from '@angular/core';

export enum MESSAGE_TYPE { KEYDOWN, KEYUP, SYSEX, SET_WAVEFORM, BEND, SET_VOLUME };
@Injectable()
export class SynthInputMessage {
  constructor(public messageType: MESSAGE_TYPE, public value: string, public note?: string) { }
}
