var myCanvas, width, height, xCenter, leftXOrigin, rightXOrigin, context;
var inRectangle, started = false;
var radius = 100;
var t = 0;
const START_GAME = 10;


function setup() {

	// THE START SYSTEM IS LAGGING BECAUSE OF ALL THE noLoop() and loop() instances
	//noLoop(); // Do not start the game by default

	width = document.body.clientWidth;
	height = document.body.clientHeight;

	myCanvas = createCanvas(width, height);

	context = myCanvas.canvas.getContext('2d');

	// set game origins
	xCenter = width / 2;
	
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

	//var gui = new dat.GUI();
	//gui.add(game, 'start1', -100, 100);


	//var context = canvas.canvas.getContext('2d');

	//context.beginPath();
	//context.lineJoin = "bevel";
	// left origin line
	//context.moveTo(leftXOrigin, height);
	//context.lineTo(leftXOrigin, 0);
	
	// right origin line
	//context.moveTo(rightXOrigin, height);
	//context.lineTo(rightXOrigin, 0);

	//context.lineWidth = 5;

	// Fill start rectangle
	//context.fillStyle = "rgb(0,100,50)";
	//context.fillRect(leftXOrigin, height-(height/4), radius*2, height);

	// set line color
	//context.strokeStyle = 'white';
	//context.stroke();

	/*
	 * On mouse over green area
	 *

	delay(p5Canvas.canvas, function() {
		var game = new Game();
		window.setInterval(function(){
			game.start();
			t += 1;
		}, 50);
	});
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

	t += 1;
	
	
//	var game = new Game();
//	game.start();
}



var Game = function() {

	this.start1 = -1;
	this.stop1 = 2;
	this.start2 = 0;
	this.stop2 = 0;

	this.speed = 70;

	this.update = function() {

		// get the current image data

		var imgData = context.getImageData(0, 0, width*2, height*2);
		
		// set the current image data to -1 y axe
		// Make the game "going forward"
		context.putImageData(imgData, 0, this.speed);

		// test to get 5 pixels of the head of the road
		var imgHeadData = context.getImageData(0, 0, width*2, this.speed);

		/*
		var rand = Math.floor((Math.random() * 2) + 1);
		if(imgHeadData.data[0] == 255 || rand == 2) context.putImageData(imgHeadData, 5, 0);
		if(imgHeadData.data[imgHeadData.data.length-1] == 255 || rand == 1) context.putImageData(imgHeadData, -5, 0);
		*/

		// Try to add t var in this
		var x = map(noise(t), this.start1, this.stop1, this.start2, this.stop2);
		context.putImageData(imgHeadData, x, 0);
		
	}

	this.updateRoad = function(imgData) {

		var pixels = imgData.data;
		var roadLength = pixels.length;

		var r=0, g=1, b=2, a=3;
		for(var p = 0; p < pixels.length; p+=4) {
		  if (pixels[p+r] == 255 && pixels[p+g] == 255 && pixels[p+b] == 255) {

			  // Remove the current pixels
			  pixels[p+r] = 0;
			  pixels[p+g] = 0;
			  pixels[p+b] = 0;


		  }
		}

	}

	this.goRight = function(road) {
		context.putImageData(road, 5, 10);
	}

}

var game = new Game();
window.onload = function() {
	var gui = new dat.GUI();
	gui.add(game, 'start1', -10, 10);
	gui.add(game, 'stop1', -10, 10);
	gui.add(game, 'start2', -100, 100);
	gui.add(game, 'stop2', -100, 100);
	gui.add(game, 'speed', 1, 100);




}


