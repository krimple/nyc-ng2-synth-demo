import { Injectable } from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {SubjectSubscription} from "rxjs/SubjectSubscription";
import {StreamEvent} from "../models/stream-event";
import {PipelineService} from "./pipeline/pipeline.service";
import {SynthMessage} from "../models/synth-note-message";

export enum SequencerStates {STOPPED, RECORDING, PLAYING};

@Injectable()
export class SequencerService {

  // will hold reference to synth message observable
  private synthStream$: Subject<SynthMessage>;

  constructor(pipelineService: PipelineService) {
    this.synthStream$ = pipelineService.synthStream$;
  }
  private streamBuffer: StreamEvent[] = [];
  private subscription: Subscription;

  // start out idle
  private state = SequencerStates.STOPPED;

  record() {
    // guard, guard, guard
    if (!this.synthStream$) {
      throw new Error("Pipeline must provide a valid data stream.");
    }

    // guard, guard
    if (this.state !== SequencerStates.STOPPED) {
      // do nothing
      return;
    } else {
      this.state = SequencerStates.RECORDING;
    }

    // record!
    let startTime = Date.now();
    this.subscription = this.synthStream$.subscribe(
      (eventPayload: any) => {
        this.streamBuffer.push(new StreamEvent(eventPayload, Date.now() - startTime));
      }
    );
  }

  stop() {
    // guard, guard, guard
    if (this.state !== SequencerStates.RECORDING) {
      // do nothing
      return;
    } else {
      this.state = SequencerStates.STOPPED;
    }

    // stop it!
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
    // Oh, arrow functions, you don't always give me `this`
    let self = this;

    // guard, guard, guard
    if (this.state === SequencerStates.RECORDING) {
      // first, stop it!!!
      this.stop();
    }

    if (this.state === SequencerStates.PLAYING) {
      // we shouldn't try playing while already playing, ignore
      return;
    }

    this.state = SequencerStates.PLAYING;

    // check - do we have notes???
    if (!this.streamBuffer || this.streamBuffer.length === 0) {
      console.log("no events!");
      return;
    }

    // ok, we do, set up events for each note and play 'em in time
    this.streamBuffer.forEach((event: StreamEvent) => {
      setTimeout(() => {
       self.synthStream$.next(event.payload);
      }, event.timeOffset);
    });

    // I know, it isn't technically stopped yet, but it will be.
    this.state = SequencerStates.STOPPED;
    this.streamBuffer.length = 0;

  }
}
