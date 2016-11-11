import { Injectable } from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {SubjectSubscription} from "rxjs/SubjectSubscription";

class StreamEvent {
  constructor(public payload: any, public timeOffset: number) { }
}

@Injectable()
export class SequencerService {

  private dataStream$: any;
  private outStream$: Subject<any> = new Subject<any>();
  private streamBuffer: StreamEvent[] = [];
  private subscription: Subscription;

  setDataStream(dataStream) {
    this.dataStream$ = dataStream;
  }

  record() {
    // guard, guard, guard
    if (!this.dataStream$) {
      throw new Error("Must provide a data stream with setDataStream");
    }

    let startTime = Date.now();
    this.subscription = this.dataStream$.subscribe(
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
