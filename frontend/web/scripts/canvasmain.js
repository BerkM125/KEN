let canvas = document.getElementById("plantcanvas");
let ctx = canvas.getContext("2d");
let inc = 0;
let incstate = true;
let levelreqglobal = 0;
let tempreqglobal = 0;
let waterratingcolor = "#03bafc";
let tempratingcolor = "#03fca9";

let watermapping = new Map();
let tempmapping = new Map();

//Map the ratings to different colors
watermapping.set("Dangerous", "#f21f1f");
watermapping.set("Dry", "#f2a81f");
watermapping.set("Okay", "#1fcbf2");
watermapping.set("Good", "#1f81f2");
watermapping.set("Excellent", "#1f31f2");

tempmapping.set("dangerouslyhot", "#f21f1f");
tempmapping.set("warm", "#f2a81f");
tempmapping.set("neutral", "#03fca9");
tempmapping.set("cold", "#1fcbf2");
tempmapping.set("dangerouslycold", "#005eff");
ctx.strokeStyle = "#999999";
ctx.lineWidth = 6;

//Totally didnt steal this shit
function roundRect(x, y, w, h, radius) {
  var r = x + w;
  var b = y + h;
  ctx.beginPath();

  ctx.moveTo(x+radius, y);
  ctx.lineTo(r-radius, y);
  ctx.quadraticCurveTo(r, y, r, y+radius);
  ctx.lineTo(r, y+h-radius);
  ctx.quadraticCurveTo(r, b, r-radius, b);
  ctx.lineTo(x+radius, b);
  ctx.quadraticCurveTo(x, b, x, b-radius);
  ctx.lineTo(x, y+radius);
  ctx.quadraticCurveTo(x, y, x+radius, y);
  ctx.stroke();
}


setInterval(scaling, 34);
function scaling() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  //Growth/scaling animation
  ctx.scale(1+inc, 1+inc);
  if(inc == 0.01) incstate = false;
  if(inc == -0.01) incstate = true;

  if(incstate) inc += 0.002;
  else inc -= 0.002;

  //Draw the meters and rectangles and such
  ctx.fillStyle = tempratingcolor;
  ctx.fillRect(140, 10, 75, tempreqglobal);
  roundRect(140, 10, 75, tempreqglobal, 10);
  ctx.drawImage(thermometer, 150, tempreqglobal + 23, 60, 60 * thermometer.height / thermometer.width);

  ctx.fillStyle = waterratingcolor;
  ctx.fillRect(10, 10, 75, levelreqglobal);
  roundRect(10, 10, 75, levelreqglobal, 10);
  ctx.drawImage(droplet, 18, levelreqglobal + 2, 63, 63 * droplet.height / droplet.width);

  //Text handling, gets weirdly complicated when we're trying to rotate and transform and such
  ctx.font = "bolder 23px 'Indie Flower', cursive";
  //When going on the bottom, change the color to fit the contrast
  ctx.fillStyle = ((levelreqglobal/2) > 50) ? "#ffffff" : "#666666";
  ctx.textAlign = "center";
  //Get it cuz pi/2 = 90 degrees XDXDXD
  ctx.rotate(Math.PI/2);
  ctx.fillText(document.getElementById("waterrating").innerHTML.toString().split(":")[1].toUpperCase(), 
  ((levelreqglobal/2) > 50) ? levelreqglobal/2 : levelreqglobal/2 + 170, -40); 
  //When going on the bottom, change the color to fit the contrast
  ctx.fillStyle = ((tempreqglobal/2) > 50) ? "#ffffff" : "#666666";
  ctx.font = "bolder 23px 'Indie Flower', cursive";
  ctx.fillText(document.getElementById("temprating").innerHTML.toString().split(":")[1].toUpperCase(), 
  ((tempreqglobal/2)+7 > 50) ? tempreqglobal/2 : tempreqglobal/2 + 190, -170); 
  ctx.rotate(-Math.PI/2);
}
