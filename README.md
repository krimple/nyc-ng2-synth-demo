# Polysynth

[Demo](https://krimple.github.io/ng2-synth/piano)

This is an example of a synthesizer and drum machine written using the WebAudio API, 
WebMidi, the Angular 2.0 framework and RxJS Observables.

To get this to work, you'll need to run it on a touch-based device,
such as a Microsoft Surface, an iPad, iPhone or Android device, etc... You 
could also use a Chrome browser with the device simulation mode, and enable
touch events (though I'm a bit shaky about how to do that while I'm writing this).

The synth has a control panel, which enables a system-wide recorder and playback
service and component. Lots of other features can be hung off of this system, such
as a quantizer (I have a basic service written but I'm not too sure of it),
visualization of notes as they scroll across the page once triggered, etc.

I also delivered a set of samples of drums. Those are my drums, a simple Gretch
drum set and Zildjain cymbals. Have at 'em, use as you like. The sample is really
an excuse to stretch a bit with the RxJS and Angular 2 APIs.

## Setup

Download the repo content and CD into the directory.  Make sure you've installed 
`angular-cli` (at least version 1.0.0-beta.17) and are running NodeJS 6.0 or higher.
Then run

```bash
npm install
```

and finally, run the app with

```bash
ng serve
```

Enjoy!

Ken Rimple
November 2016

