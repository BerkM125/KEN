 //nrf2401 receiver
#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>
#include <Servo.h>
#define PINBASE 30
#define MOTORRELAY 10
#define MOTORSIGNAL 6
#define ON 1
#define OFF 0
RF24 nrf(9, 8);  // CE, CSN
const byte linkAddress[6] = "mlink";  //address through which two modules communicate.
float data[3];
void controlrelay (int turntype) {
  if(turntype == ON) {
    digitalWrite(MOTORSIGNAL, HIGH);
    digitalWrite(MOTORSIGNAL-1, HIGH);
  }
  else {
    digitalWrite(MOTORSIGNAL, LOW);
    digitalWrite(MOTORSIGNAL-1, LOW);
  }
  
  digitalWrite(MOTORRELAY, HIGH);
  delay(3000);
  digitalWrite(MOTORRELAY, LOW);

  digitalWrite(MOTORSIGNAL, LOW);
  digitalWrite(MOTORSIGNAL-1, LOW);
}
/////////////////////////////////////////////////////////////////////
void setup()
{ 
  Serial.begin(9600); 
  Serial.println("Starting");
  pinMode(MOTORRELAY, OUTPUT);
  pinMode(MOTORSIGNAL, OUTPUT);
  pinMode(MOTORSIGNAL-1, OUTPUT);
  nrf.begin();    
  nrf.openReadingPipe(0, linkAddress);  //set the address 
  nrf.setPALevel(RF24_PA_LOW);
  nrf.startListening();   //Set nrf as receiver

}
///////////////////////////////////////////////////
void loop() { 
   if (nrf.available()) {
     nrf.read(&data, sizeof(data));
     Serial.print(data[0]); Serial.print("  ");
     Serial.print(data[1]); Serial.print("  ");
     Serial.print(data[2]); Serial.println("  ");  
    if(data[1] == 2.00)
      controlrelay (ON);
    else if(data[1] == 3.00)
      controlrelay (OFF);
   }  
}
//////////////////////////////////////////////
