x = new Array(0); // x is rows
// y is columns

function printGame(){
	/*
	-----NON TABLE PRINT-----
	document.getElementById("game").innerHTML = "";
	//document.write("<br>");
		for(var i = 0; i < x.length; i++){
			
			//loop populating sub array
				for(var j = 0; j < x.length; j++){
					//document.write(x[i][j]);
					document.getElementById("game").innerHTML =  document.getElementById("game").innerHTML + x[i][j];
				}
				//document.write("<br>");
				document.getElementById("game").innerHTML =  document.getElementById("game").innerHTML + "<br>";	
		}
		*/
		
	var result = "<table border=1>";
		for(var i = 0; i < x.length; i++){
			result += "<tr>" 
			//loop populating sub array
				for(var j = 0; j < x[0].length; j++){
					var colourString;
					if(x[i][j] === 1){
						colourString =  "bgcolor=\"#0099ff\""
					}else{
						colourString = "bgcolor=\"#66ff66\""
					}
					result += "<td "+ colourString + " width= 10 height = 10> </td>";
					colourString = "";
				}

				result += "</tr>" 
			
		}
	result += "</table>";
	document.getElementById("game").innerHTML = result;
}

function setupGame(a,b){
	x = new Array();
		for(var i = 0; i < a; i++){
			
			y = new Array();
			//loop populating sub array
			
				for(var j = 0; j < b; j++){
					//starting value 
					if(Math.floor((Math.random() * 10) + 1) < 3){
						y.push(1);
					}else{
						y.push(0);
					}
				}
				
				
			x.push(y);	
		}
}

function setupPredefined(){
	
	//x = [[1,1],[1,1]];
	/*
	x = [
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,1,0,1,0,0,0],
	[0,0,0,0,1,0,0,0,0],
	[0,0,0,0,1,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0]
		];
		
	*/
	///*
		
		var cols = 37;
		var rows = 15;
		
	x = new Array();
	
		for(var y = 0; y < rows; y++){
			x.push(new Array());
			
				for(var m = 0; m < cols; m++){
					//useless code
					x[y].push(0);
				}
				
		}
	//*/	
		
		///*
		x[6][5] = 1;
		x[6][7] = 1;
		x[7][6] = 1;
		x[8][6] = 1;
		//*/
		
		
		///*
		x[6][17] = 1;
		x[6][19] = 1;
		x[7][18] = 1;
		x[8][18] = 1;
		///*
		
		///*
		x[6][29] = 1;
		x[6][31] = 1;
		x[7][30] = 1;
		x[8][30] = 1;
		//*/
		
		//*/
}

function progressGame(){					//-ERROR FOUND SLICE IS NOT MAKING A DEEP COPY IT'S SHALLOW CHANGES MADE TO ONE OBJECT AFFECT THE ORIGINAL - fixed

	var xClone = new Array();
	
	for(var y = 0; y < x.length; y++){
		xClone.push(new Array());
		for(var m = 0; m < x[0].length; m++){
			xClone[y].push(0);
		}
	}

		
	var temp;
		for(var a = 0; a < x.length; a++){
				for(var b = 0; b < x[0].length; b++){
	
					temp = neighbourCount(a,b);

					if(temp < 2){
						//node dies
						xClone[a][b] = 0;
						
					}else if(temp === 2 ){
						//no change
						xClone[a][b] = x[a][b];
						
					}else if(temp === 3){
						//ressurect
						xClone[a][b] = 1;
						
					}else if (temp > 3){
						//more than three neighbours kill
						xClone[a][b] = 0;
					}
				}
		}

		x = xClone;	
		printGame();
}

//tested works correclty 
function neighbourCount(i,j){


	var count = 0;
	//top left
	if((i != 0 ) && (j != 0)){
;
		if(x[i-1][j-1] === 1){
			count++;
		}
	}
	//left middle
	if(j != 0){
		if(x[i][j-1] === 1){
			count++;
		}
	}
	//bottom left
	if((i != x.length - 1) && (j != 0)){
		if(x[i+1][j-1] === 1){
			count++;
		}
	}
	//middle top
	if(i != 0){
		if(x[i-1][j] === 1){
			count++;
		}
	}
	
	//middle bottom
	if(i != x.length - 1){
		if(x[i+1][j] === 1){
			count++;
		}
	}
	
	//top right
	if((i != 0) && (j != x[0].length -1)){
		if(x[i-1][j+1] === 1){
			count++;
		}
	}
	//middle right
	if(j != x[0].length -1){
			if(x[i][j+1] === 1){
			count++;
		}
	}
	//bottom right 
	if((i != x.length -1 ) && (j != x[0].length -1)){
			if(x[i+1][j+1] === 1){
			count++;
		}
	}

	return count;
}


function resetFunction() {
	
	setupPredefined();
	printGame();
	
}

function randomFunction() {
	//clearly on setup x is the wrong size lol
	setupGame(x.length, x[0].length);
	printGame();
	
}



function start(){
	
	document.getElementById("resetButton").onclick = function(){resetFunction();};
	document.getElementById("randomButton").onclick = function(){randomFunction();};
	setupPredefined();
	//setupGame(20);
	printGame();
	//progressGame();
	setInterval(progressGame, 1000);

}

window.onload = start();





///----BODY END







