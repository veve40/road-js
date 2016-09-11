var canvas = document.querySelector("canvas");
var startTimer = false;

// set canvas size
canvas.height = document.body.clientHeight;
canvas.width = document.body.clientWidth;

// set game origins
var xCenter = canvas.width / 2;
var radius = 100;

var leftXOrigin = xCenter - radius;
var rightXOrigin = xCenter + radius;

var context = canvas.getContext('2d');


window.onload = function() {

	context.beginPath();
	context.lineJoin = "bevel";

	// left origin line
	context.moveTo(leftXOrigin, canvas.height);
	context.lineTo(leftXOrigin, 0);

	// right origin line
	context.moveTo(rightXOrigin, canvas.height);
	context.lineTo(rightXOrigin, 0);

	context.lineWidth = 5;

	// Fill start rectangle
	context.fillStyle = "rgb(0,100,50)";
	context.fillRect(leftXOrigin, canvas.height-(canvas.height/4), radius*2, canvas.height);

	// set line color
	context.strokeStyle = 'white';
	context.stroke();

}

/*
window.onresize = function() {
	canvas.height = document.body.clientHeight;
	canvas.width = document.body.clientWidth;
}
*/

var delay = function (elem, callback) {
    
	var timeout = null;
    elem.onmousemove = function(e) {

        // Set timeout to be a timer which will invoke callback after 1s
		if( e.screenX > leftXOrigin && e.screenX < (leftXOrigin + radius*2) && e.screenY > canvas.height-(canvas.height/4) && !startTimer) {
			startTimer = true;
		    timeout = setTimeout(callback, 100);
		} else if(startTimer) {
			startTimer = false;
			clearTimeout(timeout);
		} 
    };
};

/*
 * On mouse over green area
 */
delay(canvas, function() {
	var game = new Game();
	window.setInterval(function(){
  		game.start();
	}, 50);
});


function Game() {

	this.start = function() {

		// get the current image data
		var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
		
		// set the current image data to -1 y axe
		context.putImageData(imgData, 0, 50);

		// test to get 5 pixels of the head of the road
		var imgHeadData = context.getImageData(0, 0, canvas.width, 50);

		var rand = Math.floor((Math.random() * 2) + 1);

		context.putImageData(imgHeadData, -5, 0);
		if(imgHeadData.data[0] == 255 || rand == 2) context.putImageData(imgHeadData, 5, 0);
		if(imgHeadData.data[imgHeadData.data.length-1] == 255 || rand == 1) context.putImageData(imgHeadData, -5, 0);

		
		
		//road = this.goRight(imgHeadData);

		//road = this.goRight();

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



