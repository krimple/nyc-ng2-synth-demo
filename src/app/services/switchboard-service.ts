import { Subject } from 'rxjs';
import { SynthInputMessage, MESSAGE_TYPE } from '../models/synth-input-message';
export class NoteMessage {
  constructor(public note) { }
}

export class NoteOnMessage extends NoteMessage {
}

export class NoteOffMessage extends NoteOnMessage {
}

export class SwitchboardService {
/*
  private noteStream$ : Subject<NoteMessage>;

  constructor(private synthInputStream: Subject<SynthInputMessage>) {
    this.noteStream$ = new Subject<NoteMessage>();

    this.noteStream$.subscribe(
      (message) => {
        if (message instanceof NoteOnMessage) {
          this.synthInputStream.next(new SynthInputMessage(MESSAGE_TYPE.KEYDOWN, null, message.note));
        } else if (message instanceof NoteOffMessage) {
          this.synthInputStream.next(new SynthInputMessage(MESSAGE_TYPE.KEYUP, null, message.note));
        }
      }
    );
  }

  sendNoteOn(onMessage: NoteOnMessage) {
    this.noteStream$.next(onMessage);
  }

  sendNoteOff(offMessage: NoteOnMessage) {
    this.noteStream$.next(offMessage);
  }
  */
}