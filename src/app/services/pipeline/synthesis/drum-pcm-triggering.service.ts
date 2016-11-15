import { Injectable } from '@angular/core';
import { Http, Response, BaseRequestOptions, ResponseContentType } from '@angular/http';
import {Sample} from '../../../models/sample';
import {Subject} from "rxjs";
import {SynthMessage, TriggerSample} from "../../../models/synth-note-message";

@Injectable()
export class DrumPCMTriggeringService {

  public samples: any;
  public synthStream$ = new Subject<SynthMessage>();

  constructor(private http: Http) {
  }

  setup(context: AudioContext, targetNode: AudioNode, synthStream$: Subject<SynthMessage>) {
      let self = this;
      self.synthStream$ = synthStream$;

      self.samples = {
          bass: new Sample('assets/drums/bass-thud.wav'),
          hihat: new Sample('assets/drums/hi-hat-closed.wav'),
          hihatopen: new Sample('assets/drums/hi-hat-open.wav'),
          snare: new Sample('assets/drums/ringing-snare.wav'),
          flam: new Sample('assets/drums/snare-flam.wav'),
          rimshot: new Sample('assets/drums/snare-rimshot.wav'),
          htrimshot: new Sample('assets/drums/hi-tom-rimshot.wav'),
          tom1: new Sample('assets/drums/hi-tom-normal.wav'),
          tom2: new Sample('assets/drums/low-tom.wav'),
          crash: new Sample('assets/drums/crash-trash.wav'),
          ride: new Sample('assets/drums/ride-standard.wav'),
          ping: new Sample('assets/drums/ride-ping.wav')
      };

      self.loadSamples(context).then(() => {
          console.log('samples loaded...  Subscribing to streams');
          this.subscribeTo(context, self.samples, targetNode);
      });
  }

  subscribeTo(context: AudioContext, sample: Sample, targetNode: AudioNode) {
      let self = this;
      // now sip please, get what you want and play it!
      self.synthStream$
          .filter((synthMessage: SynthMessage) => {
              return synthMessage instanceof TriggerSample;
          })
          .subscribe((message: TriggerSample) => {
            let instrument = message.instrument;
            let sample: Sample = self.samples[instrument];
            if (sample) {
                sample.playing = true;
                let source = context.createBufferSource();
                sample.gain = context.createGain();
                sample.gain.gain.value = 1.0;
                source.connect(sample.gain);
                sample.gain.connect(targetNode);
                source.buffer = sample.audioBuffer;
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
        self.loadSample(context, this.samples.bass),
        self.loadSample(context, this.samples.crash),
        self.loadSample(context, this.samples.hihat),
        self.loadSample(context, this.samples.hihatopen),
        self.loadSample(context, this.samples.ride),
        self.loadSample(context, this.samples.snare),
        self.loadSample(context, this.samples.flam),
        self.loadSample(context, this.samples.rimshot),
        self.loadSample(context, this.samples.ping),
        self.loadSample(context, this.samples.htrimshot),
        self.loadSample(context, this.samples.tom1),
        self.loadSample(context, this.samples.tom2)
       ])
      .then(() => {
          console.log('samples loaded...');
          resolve();
      });
    });
  }

  private loadSample(context: AudioContext, sample: Sample): Promise<void> {
     let options = new BaseRequestOptions();
     options.responseType = ResponseContentType.ArrayBuffer;
     return new Promise((resolve, reject) => {
       this.http.get(sample.fileName, options)
         .map((response: Response) => {
           return response.arrayBuffer();
         })
         .subscribe((rawBuffer: ArrayBuffer) => {
             sample.arrayBuffer = rawBuffer;
             context.decodeAudioData(rawBuffer, (buffer: AudioBuffer) => {
               sample.audioBuffer = buffer;
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

