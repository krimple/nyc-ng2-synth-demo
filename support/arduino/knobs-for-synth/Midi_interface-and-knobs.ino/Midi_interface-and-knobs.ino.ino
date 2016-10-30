/*******************************************************************************

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

MIDIEvent eNote, eMod;

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
  eMod.type = 0x01;
  
  pinMode(LED_BUILTIN, OUTPUT);
  //analogReadResolution(8);
}

void readData() {
  volVal = analogRead(volPin);
  freqVal = analogRead(freqPin);
  waveFormVal = analogRead(waveFormPin);    
}

void computeDelta() {
  volValDelta = abs(volVal - prevVolVal);
  freqDelta = abs(freqVal - prevFreqVal);
  waveFormDelta = abs(waveFormVal - prevWaveFormVal);
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

  computeDelta();
    
  // adjust mod wheel value
  if (freqDelta > 2) {
    Serial.println(freqVal);
    eMod.type = 0x01;
    eMod.m1 = (int) ((freqVal / 1023.0) * 127);
    MIDIUSB.write(eMod);
    MIDIUSB.flush();
    // Serial.println(e.m2);
    prevFreqVal = freqVal;
  }

}



