var myCanvas, width, height, xCenter, leftXOrigin, rightXOrigin, context;
var inRectangle, started = false;
var radius = 100;

const START_GAME = 10;
//var socket = io();

var xAccel = 0;

function setup() {

	// THE START SYSTEM IS LAGGING BECAUSE OF ALL THE noLoop() and loop() instances
	//noLoop(); // Do not start the game by default

	width = document.body.clientWidth;
	height = document.body.clientHeight;

	myCanvas = createCanvas(width, height);

	context = myCanvas.canvas.getContext('2d');

	//frameRate(10);


	// set game origins
	/*
	 * Testing without anything
	 * xCenter = width / 2;
	
	leftXOrigin = xCenter - radius;
	rightXOrigin = xCenter + radius;

	var green = color(0, 100, 50);
	fill(green);  
	noStroke();
	rect(leftXOrigin, height-(height/4), radius*2, height);

	// Stroke color and thickness
	stroke(255, 255, 255);
	strokeWeight(5);

	// left origin line
	line(leftXOrigin, height, leftXOrigin, 0);

	// right origin line
	line(rightXOrigin, height, rightXOrigin, 0);
	*/

}


function mouseMoved() {

	// if mouse on hover rectangle
	if(winMouseX > leftXOrigin 
	&& winMouseX < (leftXOrigin + radius*2) 
	&& winMouseY > height-(height/4) 
	&& !started) {
		loop();
		inRectangle = true;
	} else if(!started) {
		inRectangle = false;
		noLoop();
		t= 0;
	}
}


function draw() {

	// Start the game 
	//if(inRectangle && !started && t >= START_GAME) started = true;
    started=true;

	if(started) {
		game.update();
	}
	
	//noLoop();
	
}



// specific point on perlin noise
var inc = 0;
var Game = function() {

	this.speed = 0.02;
	this.range = 0.002;
	this.strength = 500;
	this.size = 200;

	// Try 2 player variable
	// this.twoPlayerX = 100; 

	this.update = function() {

		background(0);
		stroke(255);
		noFill();

		var xoffset = inc;

		beginShape();
		for(var y = 0 ; y < height ; y++) {
			
			// 1 player
			var x = noise(xoffset) * this.strength;
			
			// Start 2 player var
			// var x = sin(xoffset)/3 * this.twoPlayerX + (width/2);


			// Create Road
			// Create points and link them
			vertex(x, y);
			vertex(x + this.size, y);

			// increment for perlin noise dynamic effect
			xoffset += this.range;


		}
		endShape();

		// Create movement
		inc += this.speed;
		
	}


}

var game = new Game();

window.onload = function() {
	var gui = new dat.GUI();
	
	gui.add(game, 'range', 0, 0.005);
	gui.add(game, 'strength', 0, 2000);
	gui.add(game, 'speed', 0, 0.1);
	gui.add(game, 'size', 0, 500);

	// gui.add(game, 'twoPlayerX', -1000, 1000);


}


// send data over the socket for acceleration
window.ondevicemotion = function(e){
	//socket.emit('acceleration', e.accelerationIncludingGravity.x);
}

// Receive acceleration data
/*
socket.on('accelx', function(data) {
	if(data) xAccel = Number((data).toFixed(2))*10;
});
*/

