import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Http, Response, BaseRequestOptions, ResponseContentType } from '@angular/http';

@Injectable()
export class DrumPCMTriggeringService {

  public triggers: any;

  constructor(private http: Http) {
  }

  setup(context: AudioContext) {
    let self = this;
    this.triggers = {
      bass: {
        trigger$: new Subject<void>(),
        sourceFile: 'assets/drums/bass-thud-stereo.mp3',
      },
      hihat: {
        trigger$: new Subject<void>(),
        sourceFile: 'assets/drums/hi-hat-closed.mp3',
      },
      snare: {
        trigger$: new Subject<void>(),
        sourceFile: 'assets/drums/ringing-snare.mp3',
      },
      tom1: {
        trigger$: new Subject<void>(),
        sourceFile: 'assets/drums/hi-tom-normal.mp3',
      },
      tom2: {
        trigger$: new Subject<void>(),
        sourceFile: 'assets/drums/low-tom.mp3',
      },
      crash: {
        trigger$: new Subject<void>(),
        sourceFile: 'assets/drums/crash-trash.mp3',
      },
      ride: {
        trigger$: new Subject<void>(),
        sourceFile: 'assets/drums/ride-standard.mp3',
      }
    };
    this.loadSamples(context).then(
      () => {
        self.triggers.bass.trigger$.subscribe(
          () => {
            debugger;
            let source = context.createBufferSource();
            source.buffer = self.triggers.bass.audioBuffer;
            source.connect(context.destination);
            source.start(0);
          });
      });
  }

  loadSamples(context: AudioContext): Promise<void> {
    var self = this;
    return new Promise((resolve, reject) => {
     Promise.all([
      self.loadSample(context, this.triggers.bass),
      /*self.loadSample(context, this.triggers.crash),
      self.loadSample(context, this.triggers.hihat),
      self.loadSample(context, this.triggers.ride),
      self.loadSample(context, this.triggers.snare),
      self.loadSample(context, this.triggers.tom1),
      self.loadSample(context, this.triggers.tom2)*/
     ])
      .then(() => {
        console.log('samples loaded...')
      });
    });
  }
  private loadSample(context: AudioContext, trigger: any): Promise<void> {
     let options = new BaseRequestOptions();
     options.responseType = ResponseContentType.ArrayBuffer;
     return new Promise((resolve, reject) => {
       this.http.get(trigger.sourceFile, options)
         .map((response: Response) => {
           return response.arrayBuffer();
         })
         .subscribe((rawBuffer: ArrayBuffer) => {
             trigger.rawBuffer = rawBuffer;
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

