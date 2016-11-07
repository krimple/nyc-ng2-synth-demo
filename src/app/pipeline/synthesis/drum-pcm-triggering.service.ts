import { Injectable } from '@angular/core';
import { Http, Response, BaseRequestOptions, ResponseContentType } from '@angular/http';
import {Trigger} from "../../models/trigger";

@Injectable()
export class DrumPCMTriggeringService {

  public triggers: any;

  constructor(private http: Http) {
  }

  setup(context: AudioContext, targetNode: AudioNode) {
      let self = this;
      this.triggers = {
          bass: new Trigger('assets/drums/bass-thud-stereo.mp3'),
          hihat: new Trigger('assets/drums/hi-hat-closed.mp3'),
          hihatopen: new Trigger('assets/drums/hi-hat-open.mp3'),
          snare: new Trigger('assets/drums/ringing-snare.mp3'),
          flam: new Trigger('assets/drums/snare-flam.mp3'),
          rimshot: new Trigger('assets/drums/snare-rimshot.mp3'),
          htrimshot: new Trigger('assets/drums/hi-tom-rimshot.mp3'),
          tom1: new Trigger('assets/drums/hi-tom-normal.mp3'),
          tom2: new Trigger('assets/drums/low-tom.mp3'),
          crash: new Trigger('assets/drums/crash-trash.mp3'),
          ride: new Trigger('assets/drums/ride-standard.mp3'),
          ping: new Trigger('assets/drums/ride-ping.mp3')
      };

      this.loadSamples(context).then(() => {
          console.log('samples loaded...  Subscribing to streams');
          this.subscribeTo(context, self.triggers.bass, targetNode);
          this.subscribeTo(context, self.triggers.snare, targetNode);
          this.subscribeTo(context, self.triggers.flam, targetNode);
          this.subscribeTo(context, self.triggers.rimshot, targetNode);
          this.subscribeTo(context, self.triggers.htrimshot, targetNode);
          this.subscribeTo(context, self.triggers.tom1, targetNode);
          this.subscribeTo(context, self.triggers.tom2, targetNode);
          this.subscribeTo(context, self.triggers.hihat, targetNode);
          this.subscribeTo(context, self.triggers.hihatopen, targetNode);
          this.subscribeTo(context, self.triggers.crash, targetNode);
          this.subscribeTo(context, self.triggers.ride, targetNode);
          this.subscribeTo(context, self.triggers.ping, targetNode);
      });
  }

  subscribeTo(context: AudioContext, trigger: Trigger, targetNode: AudioNode) {
      trigger.noteStream$.subscribe(
          (value: string) => {
            if (value === 'stop') {
                if (trigger.playing) {
                    trigger.gain.disconnect(targetNode);
                }
                trigger.playing = false;
            } else {
                trigger.playing = true;
                let source = context.createBufferSource();
                trigger.gain = context.createGain();
                trigger.gain.gain.value = 1.0;
                source.connect(trigger.gain);
                trigger.gain.connect(targetNode);
                source.buffer = trigger.audioBuffer;
                source.start(0);
            }
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
        self.loadSample(context, this.triggers.hihatopen),
        self.loadSample(context, this.triggers.ride),
        self.loadSample(context, this.triggers.snare),
        self.loadSample(context, this.triggers.flam),
        self.loadSample(context, this.triggers.rimshot),
        self.loadSample(context, this.triggers.ping),
        self.loadSample(context, this.triggers.htrimshot),
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

