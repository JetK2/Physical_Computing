//I used the code from week 6 as a template 

let port;
let connectBtn;

function setup() {
  createCanvas(900, 900);
  background(220);
  colorMode(HSB);
//create a Serial connection
  port = createSerial();


//create a Button element to press for connecting Arduino
  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(20, 20); //position of button
  connectBtn.mousePressed(connectBtnClick); //if button is clicked run connectBtnClick function below


}

function draw() {
  

  let val = port.readUntil("\n");

  //if statement to display code
  if (val.length > 0) {
    background(0);

    //I wanted different colour values so I used map to create different ranges. I'm using HSB mode so the highest number is 360
    val1 = map(val,400,500,0,360)
    val2 = map(val,400,500,360,0)
    val3 = map(val,400,500,100,200)
    val4 = map(val,400,500,200,300)
    val5 = map(val,400,500,200,100)
    val6 = map(val,400,500,300,200)
    let C1 = val1;
    let C2 = val2;
    let C3 = val3;
    let C4 = val4;
    let C5 = val5;
    let C6 = val6;

//I used map to also reduce the range for the size as the using the value directly would make the shapes too big

semiCSize = map(val,400,500,0,500)
BConCNum = map(val,400,500,10,20)
SConCNum = map(val,400,500,5,10)
semiASize = map(val,400,500,0,500)

// I used push pop for the rotation of the semi circle so it doesn't affect the other shapes
  push();
  translate(530, -153);
  rotate(45);
  semi_circle(val1, C2, width / 2, height / 2, semiCSize);
  pop();
  
  fill(C5,255,255)
  circle(width/2,height/2,200)

  // big concentric circle
  con_circles_out(C1, BConCNum, width / 2, height / 2, 3);
  con_circles_out(C2, BConCNum-1, width / 2, height / 2, 3);
  con_circles_out(C3, BConCNum-2, width / 2, height / 2, 3);

  // small concentric circle
  con_circles_out(C4, SConCNum, width / 2+100, height / 2+50, 5);
  con_circles_out(C5, SConCNum-1, width / 2+100, height / 2+50, 3);
  con_circles_out(C6, SConCNum-2, width / 2+100, height / 2+50, 3);

  
  semi_arc(C3, C2, width / 2 - 160, height / 2 - 90, semiASize);
  }

  //I made these functions for a Sound and Image Processing module and adapted it for p5js

  function semi_arc(c1, c2, x, y, size) {
    noFill();
    strokeCap(SQUARE);
    strokeWeight(13);
    stroke(c1, 255, 255);
    arc(x, y, size, size, PI, TWO_PI);
    stroke(c2, 255, 255);
    arc(x, y, size, size, 0, PI);
  }
  
  function con_circles_out(c1, num, x, y, spacing) {
    noFill();
    stroke(c1, 255, 255);
    strokeWeight(12);
    for (let i = num; i > 0; i -= spacing) {
      circle(x, y, i * 30);
    }
  }
  
  function semi_circle(c1, c2, x, y, size) {
    fill(c1, 255, 255);
    noStroke();
    arc(x, y, size, size, radians(90), radians(270));
    fill(c2, 255, 255);
    arc(x, y, size, size, radians(-90), radians(90));
  }
  
  // changes button label based on connection status
  if (!port.opened()) {
    connectBtn.html('Connect to Arduino');
  } else {
    connectBtn.html('Disconnect');
  }
}

//this function runs when 'connect' button is clicked
function connectBtnClick() {
  if (!port.opened()) {//if port is not already open/connected
    port.open('Arduino', 9600); //open a connection at baud rate 9600
  } else { //otherwise close port connection 
    port.close();
  }
}
