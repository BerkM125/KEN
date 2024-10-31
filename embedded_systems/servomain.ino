 //nrf2401 receiver
#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>
#include <Servo.h>
#define PINBASE 30
#define ON 1
#define OFF 0
RF24 nrf(9, 8);  // CE, CSN
const byte linkAddress[6] = "mlink";  //address through which two modules communicate.
float data[3];
Servo mainmotor;
Servo secondarymotor;

void controlservo (int turntype, Servo servo) {
    int pos = 0;
    //this turns axle UPWARDS
    if(turntype == ON) {
        for (pos = 180; pos >= 0; pos -= 1) {
            servo.write(pos);
            delay(5);
        }
        for (pos = 0; pos <= 180; pos += 1) {
            servo.write(pos);
            delay(5);
        }
    }
    //turns axle DOWNWARDS
    else if(turntype == OFF) {
        for (pos = 85; pos <= 180; pos += 1) {
            servo.write(pos);
            delay(5);
        }
        for (pos = 180; pos >= 85; pos -= 1) {
            servo.write(pos);
            delay(5);
        }
    }
}
/////////////////////////////////////////////////////////////////////
void setup()
{ 
  Serial.begin(9600); 
  Serial.println("Starting");
  mainmotor.write(180);
  mainmotor.attach(6);
  secondarymotor.attach(7);
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
     // In this case, FIRST data value is the pin number, second data value is intensity
     // Ignore first number if it coincides with another designated value (e.g 5 is for INFRARED TRANSMISSION)
     if(data[0] != 0) {
       if(data[1] == 1)
          digitalWrite(data[0]+PINBASE, HIGH);
       else
          digitalWrite(data[0]+PINBASE, LOW);
     }
     else {
       if(data[1] == 1)
          controlservo (ON, mainmotor);
       else if(data[1] == 0)
          controlservo (OFF, secondarymotor);
     }
   }  
}
//////////////////////////////////////////////
