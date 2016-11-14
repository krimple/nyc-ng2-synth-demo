import { Injectable } from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {StreamEvent} from "../models/stream-event";
import {ClockTick} from "../models/synth-note-message";

@Injectable()
export class QuantizerService {

  private dataStream$: any;
  private outStream$: Subject<any> = new Subject<any>();
  private streamBuffer: StreamEvent[] = [];
  private subscription: Subscription;
  private bpm: number;

  setDataStream(dataStream) {
    this.dataStream$ = dataStream;
  }

  setBPM(bpm: number) {
    this.bpm = bpm;
  }

  record() {
    let self = this;
    // guard, guard, guard
    if (!this.dataStream$) {
      throw new Error("Must provide a data stream with setDataStream");
    }

    let startTime = Date.now();
    this.subscription = this.dataStream$
      .debounceTime(Math.min((self.bpm / 60) * 1000))

      .do(() => {
        
        console.log('sending a tick!');
        self.dataStream$.next(new ClockTick());
      })
      .subscribe(
      (eventPayload: any) => {
        this.streamBuffer.push(new StreamEvent(eventPayload, Date.now() - startTime));
      }
    );
  }

  stop() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
      this.subscription = null;
      console.log('stopped recorder');
      console.log('events');
      console.dir(this.streamBuffer);
    } else {
      console.log('doing nothing - not recording...');
    }
  }

  playback() {
    if (!this.streamBuffer || this.streamBuffer.length === 0) {
      console.log("no events!");
      return;
    }

    let self = this;

    this.streamBuffer.forEach((event: StreamEvent) => {
      setTimeout(() => {
        self.dataStream$.next(event.payload);
      }, event.timeOffset);
    });
  }
}
