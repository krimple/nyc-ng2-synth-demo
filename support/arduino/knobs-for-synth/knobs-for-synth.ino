int volPin = 2;
int freqPin = 1;
int waveFormPin = 0;
int volVal = 0;
int freqVal = 0;
int waveFormVal = 0;
int prevVolVal = 0;
int prevFreqVal = 0;
int prevWaveFormVal = 0;

void setup() {
  Serial.begin(115200);
}

void loop() {
  prevVolVal = volVal;
  prevFreqVal = freqVal;
  prevWaveFormVal = waveFormVal;
  
  volVal = analogRead(volPin);
  freqVal = analogRead(freqPin);
  waveFormVal = analogRead(waveFormPin);
  
  if (prevVolVal != volVal | prevFreqVal != freqVal | prevWaveFormVal != waveFormVal) {
    Serial.print(volVal);
    Serial.print(",");
    Serial.print(freqVal);
    Serial.print(",");
    Serial.println(waveFormVal);
  }

  delay(50);      // stop the program for some time  
}
