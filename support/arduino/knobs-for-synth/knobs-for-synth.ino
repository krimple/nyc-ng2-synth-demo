/*******************************************************************************
 
 Ken Rimple modified this sample to support reading additional analog inputs
 for pins 0-2, hooked to potentiometers.
 
 ... the original notice follows
 Bare Conductive Touch USB MIDI instrument
 -----------------------------------------
 
 Midi_interface.ino - USB MIDI touch instrument - based on a piano
 
 Remember to select Bare Conductive Touch Board (USB MIDI, iPad compatible) 
 in the Tools -> Board menu
 
 Bare Conductive code written by Stefan Dzisiewski-Smith and Peter Krige.
 
 This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 
 Unported License (CC BY-SA 3.0) http://creativecommons.org/licenses/by-sa/3.0/
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

*******************************************************************************/

// compiler error handling
#include "Compiler_Errors.h"

#include <MPR121.h>
#include <Wire.h>

MIDIEvent eNote;
MIDIEvent eMod;

#define numElectrodes 12

int volPin = 2;
int freqPin = 1;
int waveFormPin = 0;
int volVal = 0;
int freqVal = 0;
int waveFormVal = 0;
int prevVolVal = -100;
int prevFreqVal = -100;
int prevWaveFormVal = -100;
int volValDelta = 0;
int freqDelta = 0;
int waveFormDelta = 0;

void setup() {
  MPR121.begin(0x5C);
  MPR121.setInterruptPin(4);
  MPR121.updateTouchData();
  Serial.begin(115200);
 
  eNote.type = 0x08;
  eNote.m3 = 127;  // maximum volume
  
  pinMode(LED_BUILTIN, OUTPUT);
  //analogReadResolution(8);
}

void readData() {
  volVal = analogRead(volPin);
  freqVal = analogRead(freqPin);
  waveFormVal = analogRead(waveFormPin);    
}

void updateTouchElectrodes(){
  MPR121.updateTouchData();
  for(int i=0; i<numElectrodes; i++){
    
    // MIDI note mapping from electrode number to MIDI note
    eNote.m2 = 60 + numElectrodes - 1 - i;
    
    if(MPR121.isNewTouch(i)){
      // if we have a new touch, turn on the onboard LED and
      // send a "note on" message
      digitalWrite(LED_BUILTIN, HIGH);
      eNote.m1 = 0x90; 
    } else if(MPR121.isNewRelease(i)){
      // if we have a new release, turn off the onboard LED and
      // send a "note off" message
      digitalWrite(LED_BUILTIN, LOW);
      eNote.m1 = 0x80;
    } else {
      // else set a flag to do nothing...
      eNote.m1 = 0x00;  
    }

    // only send a USB MIDI message if we need to
    if(eNote.m1 != 0x00){
      MIDIUSB.write(eNote);
    }
  }
  // flush USB buffer to ensure all notes are sent
  MIDIUSB.flush();   
}

void loop() {
  if(MPR121.touchStatusChanged()){
    updateTouchElectrodes();
  }
  
  readData();

  // adjust waveform value
  byte sampleWaveFormVal = (byte)(waveFormVal / 341);
  if (sampleWaveFormVal != prevWaveFormVal) {
    Serial.println(sampleWaveFormVal);
    eMod.type = 0x08;
    eMod.m1 = 0x91;
    eMod.m2 = 0x02;
    eMod.m3 = sampleWaveFormVal;
    MIDIUSB.write(eMod);
    MIDIUSB.flush();
    prevWaveFormVal = sampleWaveFormVal;
  }

  byte sampleFreqVal = (byte) ((freqVal / 1023.0) * 127);
  // adjust mod wheel value (LFO modulating frequency)
  if (sampleFreqVal != prevFreqVal) {
    Serial.println(sampleFreqVal);
    eMod.type = 0x08;
    eMod.m1 = 0x91;
    eMod.m2 = 0x01;
    eMod.m3 = sampleFreqVal;
    MIDIUSB.write(eMod);
    MIDIUSB.flush();
    prevFreqVal = sampleFreqVal;
  }

  byte sampleVolVal = (byte) ((volVal / 1023.0) * 127);
  // adjust volume value
  if (sampleVolVal != prevVolVal) {
    Serial.println(sampleVolVal);
    eMod.type = 0x08;
    eMod.m1 = 0x91;
    eMod.m2 = 0x03;
    eMod.m3 = sampleVolVal;
    MIDIUSB.write(eMod);
    MIDIUSB.flush();
    prevVolVal = sampleVolVal;
  }

}


