export class SynthMessage {
  constructor(action) {
    this._action = action
  }
  protected _action: string;

  get action(): string {
    return this._action;
  }}

export class SynthNoteMessage extends SynthMessage {
  protected _note: string;

  constructor(note, action) {
    super(action);
    this._note = note;
  }

  get note(): string {
    return this._note;
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

export class ClockTick extends SynthMessage {
  constructor() {
    super('TICK');
  }
}

export class SynthControlMessage extends SynthMessage { }

export class VolumeChange extends SynthControlMessage {
  public level: number;
  constructor(level: number) {
    super('VOLUME');
    // hack due to arduino stupidity kenny
    this.level = Math.min(level / 127.0);
  }
}

export class WaveformChange extends SynthControlMessage {
  public waveForm: string;
  constructor(public rawValue: number) {
    super('WAVEFORM');
    switch (rawValue) {
      case 0:
        this.waveForm = 'sawtooth';
        break;
      case 1:
        this.waveForm = 'sine';
        break;
      case 2:
        this.waveForm = 'triangle';
        break;
      case 3:
        this.waveForm = 'square';
        break;
      default:
        this.waveForm = 'sawtooth';
    }
  }
}
