function getPrecision(numbers) {
	if (!numbers[2]) {
		//sorry no 3D here
		numbers=numbers.sort(function(a,b){return a-b});
		console.log("Ratio: "+numbers[1]/numbers[0]);
		if (numbers[1]/numbers[0]==Math.round(numbers[1]/numbers[0])) return 0.1;
		else { return 0.01; }
	}
	else {
		return 0.01;
	}
}

var canvas,ctx;
function makeCanvas() {
	if (document) {
		if (document.getElementById('graphCanvas')) {
			document.getElementById('graphCanvas').parentElement.removeChild(document.getElementById('graphCanvas'))
		}
		canvas = document.createElement("canvas");
		canvas.id = "graphCanvas";
		canvas.setAttribute("width", window.innerWidth);
		canvas.setAttribute("height", window.innerHeight);
		canvas.setAttribute("style", "position: absolute; x:0; y:0;");
		document.body.appendChild(canvas);

		ctx = canvas.getContext("2d");
	}
}
makeCanvas();

/* Plan

Make squares
	Go through the Xs. 
	For each X, go through the Ys and make squares.
Make a function for the line
Iterate over all the possible x-points, of course at a specified interval.
	For each point at an interval, check if it's inside any squares.
	Log whatever squares it's in.
return squaresIntersected.length;

*/

function removeDuplicates(arrayName) {
	var newArray=new Array();
	label:for(var i=0; i<arrayName.length;i++ ) {
		for(var j=0; j<newArray.length;j++ ) {
			if(newArray[j]==arrayName[i]) 
				continue label;
			}
		newArray[newArray.length] = arrayName[i];
	}
	return newArray;
}

function calculateSquaresPassedThrough(dimensions, drawCanvas, canvasScale, step) {
	if (!step) {
		var step=getPrecision(dimensions);
		console.log("Step: "+step);
	}
	canvas.width=canvas.width;
	dimensions=dimensions.sort();
	//dimensions are: width (x), length (y), height (z)
	var squares = [];

	for (var x=0; x<dimensions[0]; x++) {
		//go through the Xes

		for (var y=0; y<dimensions[1]; y++) {
			//go through each possible Y for said X
			//squares are in the format bottom left, top right
			if (dimensions.length === 2) {
				squares.push([[x,y],[x+1,y+1]]);
				if (drawCanvas) { 
					drawCanvas.strokeRect(x*canvasScale,y*canvasScale,canvasScale,canvasScale);
				}
			} else {
				for (var z=0; z<dimensions[2]; z++) {
					squares.push([[x,y,z],[x+1,y+1,z+1]]);
				}
			}
		}
	}

	var slope = dimensions[1]/dimensions[0];

	var vslope;

	if (dimensions[2]) {
		vslope=dimensions[2]/dimensions[0];
	}

	var squaresIntersected = [];

	for (var x=0; x<dimensions[0]/step; x++) {
		//console.log(x);
		//yes I know, I recycled, bla bla bla crockford bla bla furnace filter.

		for (var i=0; i<squares.length; i++) {
			if (x*slope*step>squares[i][0][1] && x*slope*step<squares[i][1][1] && x*step>squares[i][0][0] && x*step<squares[i][1][0]) {
				if (!dimensions[2]) {
					if (drawCanvas) {
						drawCanvas.strokeRect(x*step*canvasScale,x*slope*step*canvasScale,1,1);
					}
					squaresIntersected.push(squares[i]);
				} else {
					if (x*step*vslope>squares[i][0][2] && x*step*vslope<squares[i][1][2]) {
						squaresIntersected.push(squares[i]);
					}
				}
				//console.log(x*step+','+x*slope*step);
				//console.log(squares[i][0][1]+','+squares[i][0][0]);
			}
		}
	}
	return removeDuplicates(squaresIntersected).length;
	//return removeDuplicates(squaresIntersected);
}

//console.log(calculateSquaresPassedThrough([20,5],.1,ctx,20));
