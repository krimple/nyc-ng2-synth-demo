import { Injectable } from '@angular/core';
import { Http, Response, BaseRequestOptions, ResponseContentType } from '@angular/http';
import {Trigger} from "../../models/trigger";

@Injectable()
export class DrumPCMTriggeringService {

  public triggers: any;

  constructor(private http: Http) {
  }

  setup(context: AudioContext) {
      let self = this;
      this.triggers = {
          bass: new Trigger('assets/drums/bass-thud-stereo.mp3'),
          hihat: new Trigger('assets/drums/hi-hat-closed.mp3'),
          snare: new Trigger('assets/drums/ringing-snare.mp3'),
          tom1: new Trigger('assets/drums/hi-tom-normal.mp3'),
          tom2: new Trigger('assets/drums/low-tom.mp3'),
          crash: new Trigger('assets/drums/crash-trash.mp3'),
          ride: new Trigger('assets/drums/ride-standard.mp3')
      };

      this.loadSamples(context).then(() => {
          console.log('samples loaded...  Subscribing to streams');
          this.subscribeTo(context, self.triggers.bass);
          this.subscribeTo(context, self.triggers.snare);
          this.subscribeTo(context, self.triggers.tom1);
          this.subscribeTo(context, self.triggers.tom2);
          this.subscribeTo(context, self.triggers.hihat);
          this.subscribeTo(context, self.triggers.crash);
          this.subscribeTo(context, self.triggers.ride);

      });
  }

  subscribeTo(context: AudioContext, trigger: Trigger) {
      trigger.noteStream$.subscribe(
          () => {
              let source = context.createBufferSource();
              source.buffer = trigger.audioBuffer;
              source.connect(context.destination);
              source.start(0);
          },
          (error) => {
              console.error('error in subscription', error);
          },
          () => {
              console.log("stream closed.");
          });
  }

    loadSamples(context: AudioContext): Promise<void> {
      var self = this;
      return new Promise((resolve, reject) => {
       Promise.all([
        self.loadSample(context, this.triggers.bass),
        self.loadSample(context, this.triggers.crash),
        self.loadSample(context, this.triggers.hihat),
        self.loadSample(context, this.triggers.ride),
        self.loadSample(context, this.triggers.snare),
        self.loadSample(context, this.triggers.tom1),
        self.loadSample(context, this.triggers.tom2)
       ])
      .then(() => {
          console.log('samples loaded...')
          resolve();
      });
    });
  }

  private loadSample(context: AudioContext, trigger: Trigger): Promise<void> {
     let options = new BaseRequestOptions();
     options.responseType = ResponseContentType.ArrayBuffer;
     return new Promise((resolve, reject) => {
       this.http.get(trigger.fileName, options)
         .map((response: Response) => {
           return response.arrayBuffer();
         })
         .subscribe((rawBuffer: ArrayBuffer) => {
             trigger.arrayBuffer = rawBuffer;
             context.decodeAudioData(rawBuffer, (buffer: AudioBuffer) => {
               trigger.audioBuffer = buffer;
               resolve();
             });
         },
         (error) => {
            console.dir(error);
            reject();
         });
     });
  }
}

