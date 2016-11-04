export class SynthNoteMessage {
  protected _note: string;
  protected _action: string;

  constructor(note, action) {
    this._note = note;
    this._action = action;
  }

  get note(): string {
    return this._note;
  }

  get action(): string {
    return this._action;
  }
}

export class SynthNoteOn extends SynthNoteMessage {
  constructor(note: string) {
    super(note, "ON");
  }
}

export class SynthNoteOff extends SynthNoteMessage {
  constructor(note: string) {
    super(note, "OFF");
  }
}
