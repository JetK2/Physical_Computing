// Defines which analog input is being used
#define EMG A0

//sets value to 0 
int val = 0;

void setup()
{
  // Connect to serial
  Serial.begin(9600); //9600 refers to the speed of communication 
  // Tells the computer that the EMG sensor is an input
  pinMode(EMG, INPUT);

}

void loop() {
	//create a variable called val that stores the incoming analog vaues
  int val = analogRead(EMG); 
   
  //sends values to p5js though Serial communication
  Serial.println(val); 

  // Slows down the rate the readings are printed to 10 readings per second
  delay(100);
}