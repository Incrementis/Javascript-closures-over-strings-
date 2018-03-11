/*
	====================================================================================================
	
	NOTE:
	
	This mini project`s code is in comparison with previous mini projects a bit more abstract.
	
	Also global variables serve here only for demonstartion purposes. They should be avoided!
	
	Some of the "+" signs are needed to convert a string type into a number type.
	
	Due to much lines of code, the code is commented a lot to guarantee understanding. 
	Depending on the developers javascript experience and improving naming(functions, variables),
	the amount of comments could be reduced.
	
	
	TIP:
	
	Mark a word with the mouse/keyboard to highlite every same word within the whole document(Notepad++)
	
	====================================================================================================
	
*/


//Purpose: Gives access to user given inputs and globaly needed variables
var Variables =
{
	inSteps: document.getElementsByClassName('user-input')[0],	//For getting steps in pixel
	inIteration: document.getElementsByClassName('user-input')[1],	//For getting number of iteration
	inTime: document.getElementsByClassName('user-input')[2],	//For getting time in milliseconds
	stringResults: document.getElementById('result-string'),	//For showing the result in web browser
	functionResults: document.getElementById('result-function'),	//For showing the result in web browser
	Square: 0,							//For getting pixel attributes
	Animation: 0,							//For starting and stopping animation
	Counter: 0							//For checking number of iteration
}


//Purpose: Stops and Resets animation
function Stop()
{
	//Stops the animation
	clearTimeout(Variables.Animation);
	
	
	Variables.Counter 	= 0;
	Variables.Square.width 	= "1px";
	Variables.Square.height = "1px";
}


//Purpose: Shows the calculated time of the benchmark in web browser
function Show_Results(timeStart, timeEnd, tag)
{

	//Outputing the first element only once or innerHTML will be overwritten
	tag.innerHTML = "<br>Duration: " + ((timeEnd[0] - timeStart[0])/1000) + " sec<br>";

	//Reseting global Arrays
	timeStart.length = 0;
	timeEnd.length = 0;
	
}


//Purpose: Increases over time a squares`s size and color
function Rise_of_Square(num, start, end)
{
	//Start Time
	if(Variables.Counter === 0)
	{
		start.push(Date.now());
	}
	

	var square 		= document.getElementById('testarea-' + num).style;
	
	//It is the inner width of the whole browser window 
	var container  	= window.innerWidth;
	
	//This is needed to define the maximum width area in which the pixel/rectangle/square is allowed to grow
	var border		= ((+container)/2)-20;
	
	//Random color values
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	
	
	//Changing the color of the rectangle/pixel/square
	square.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
	
	
	
	/*
		a variable declared without keyword var within a function 
		turns automatically into a global variable.
	*/
	//Converting to number and increasing height and width
	height 	= parseInt(square.height, 10) + (+Variables.inSteps.value);
	width 	= parseInt(square.height, 10) + (+Variables.inSteps.value);
	
	
	//Doesn`t get larger than its main div container
	if( height  <= border )
	{
		square.width  = "" + width + "px";
	}
	
	//Converting to string
	square.height = "" + height + "px";
	

	//Recursive Call
	Variables.Animation = setTimeout(function()
	{
		Rise_of_Square(num, start, end) 
	}
	, +Variables.inTime.value);
	
	Variables.Counter++;
	
	
	//Stop, Reset and
	if(Variables.Counter >= Variables.inIteration.value)
	{
		Stop();
		
		end.push(Date.now());
		
		
		if(num === "one")
		{
			Show_Results(start, end, Variables.stringResults);
		}
		else if(num === "two")
		{
			Show_Results(start, end, Variables.functionResults);
		}
		
	}

	//Getting square values to make them usable in function "Stop()"
	Variables.Square = square;
	

}




/*
	==========
	BENCHMARKS
	==========
*/

//Global variables for "Ugly_Benchmark"
var uglyStart = [];
var uglyEnd = [];


//Purpose: Takes a code as a string and executes it
function StringCode(execute)
{
	eval(execute);
}


//Purpose: Sets and stops time to check how long a function took processing 
function Ugly_Benchmark()
{	
	
	StringCode("Rise_of_Square( 'one', uglyStart, uglyEnd )");

}



//Purpose: Sets and stops time to check how long a function took processing 
function Bad_Benchmark()
{

	var badStart 	= [];
	var badEnd 	= [];

	Variables.stringResults.innerHTML = "Please press [F12] in google chrome to see the error in the console.";
	
	
	/*
		ATTENTION:
		Calling an Array object`s method should not work,
		unless it is called directly with eval(). You can test it by commenting the next line and
		decomment the eval method.
	*/
	StringCode("Rise_of_Square('one', badStart, badEnd);");
	//eval("Rise_of_Square('one', badStart, badEnd);");
	
}



//Purpose: Sets and stops time to check how long a function took processing 
function Good_Benchmark(num)
{
	
	var goodStart 	= [];
	var goodEnd 	= [];
	
	Rise_of_Square(num, goodStart, goodEnd);
	
}
