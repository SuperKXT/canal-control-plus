//Loading constant.js
$.getScript("constants.js", function(){
   // loaded
});

// Storing the path for next five pipes
//  1 = lef tright
//  2 = top bottom
//  3 = square
//  4 = left top
//  5 = left bottom
//  6 = right top
//  7 = right down
var pipe1 = getRandomInt();
var pipe2 = getRandomInt();
var pipe3 = getRandomInt();
var pipe4 = getRandomInt();
var pipe5 = getRandomInt();

generatePipes()
current_x = STARTING_X + 1;
current_y = STARTING_Y;

score = 0;
level = 0;
remaining = 4;
time = 55;
remaining_Time = time;
water_x = STARTING_X;
water_y = STARTING_Y;
direction = 2;

// Level Start Initializer
function initialize()
{
    var pipe1 = getRandomInt();
    var pipe2 = getRandomInt();
    var pipe3 = getRandomInt();
    var pipe4 = getRandomInt();
    var pipe5 = getRandomInt();

    // Generating the pipes, start and end
    generatePipes();

    // Setting the starting box.
    current_x = STARTING_X + 1;
    current_y = STARTING_Y;

    // Updating the level
    level += 1;

    // Updating the remaining pipes.
    remaining += 1;

    // Updating the time between two water flows.
    if(time != 5)
    {
        time -= 5;
    }

    // Initializing time before next flow.
    remaining_Time = time;

    // The current position of water.
    water_x = STARTING_X;
    water_y = STARTING_Y;

    // Initializing the direction.
    //  1 = left
    //  2 = right
    //  3 = up
    //  4 = down
    direction = 2;

    // Setting Level and Score to inital values
    head();

    // Setting the initial selected box.
    element = current_y.toString() + current_x.toString();
    document.getElementById(element).focus();
         
    //-------------
    //Disabling Tabs
    //-------------
    $.prototype.disableTab = function() {
        this.each(function() {
            $(this).attr('tabindex', '-1');
        });
    };
    $('button').disableTab();

    // initializing the right side
    side();

    // putting the starting and ending pipe
    var temp = STARTING_Y.toString() + STARTING_X.toString();
    document.getElementById(temp).innerHTML = "<img src= 'pipe_start.png' width='50'>";
    document.getElementById(temp).setAttribute("data-pipe", "start");

    temp = ENDING_Y.toString() + ENDING_X.toString();
    document.getElementById(temp).innerHTML = "<img src= 'pipe_end.png' width='50'>";
    document.getElementById(temp).setAttribute("data-pipe", "end");
}

// Updating the selected box.
function positionUpdate()
{
    element = current_y.toString() + current_x.toString();
    document.getElementById(element).focus();
}
     
//------------
//Game Loop
//------------
window.setInterval(function () {
    document.getElementById("timer").innerHTML = remaining_Time;
    remaining_Time -= 1;
    if (remaining_Time == 0) 
    {
        checkNext();
        remaining_Time = time;
    }
}, 1000);



//------------
//Key Handlers
//------------
function keyUpHandler(event)
{
   var keyPressed = event.which || event.keyCode;
    if (keyPressed == 38)   //up key
    {	
        if(current_y>0)
        {
            current_y--;
        }
        else
        {
            current_y = 9;
            
        }
        positionUpdate();
    }
    else if (keyPressed == 40)  //down key
    {	
        if(current_y<9)
        {
            current_y++;
        }
        else
        {
            current_y = 0;
        }
        positionUpdate();
    }
    else if (keyPressed == 39)  //right key
    {	
        if(current_x<9)
        {
            current_x++;
        }
        else
        {
            current_x = 0;
        }
        positionUpdate();
    }
    else if (keyPressed == 37)  //left key
    {	
        if(current_x>0)
        {
            current_x--;
        }
        else
        {
            current_x = 9;
        }
        positionUpdate();
    }
    else if (keyPressed == 13) // enter key
    {
        if(document.activeElement.hasChildNodes())
        {
            // do nothing if the box already has a pipe.
        }
        else
        {
            document.activeElement.innerHTML = "<img src= 'pipe_"+pipe1+".png' width='50'>";
            document.activeElement.setAttribute("data-pipe", pipe1.toString());
            updatePipes();
            side();
        }
    }
    else
    {
        // Do nothing for other keys.
    }
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt() {
  return Math.floor(Math.random() * (10 - 1)) + 1;
}


// add a new value to the last pipe 
function updatePipes() {
    pipe1 = pipe2;
    pipe2 = pipe3;
    pipe3 = pipe4;
    pipe4 = pipe5;
    pipe5 = getRandomInt();
}


// Function to update the head
function head() 
{
    document.getElementById("level").innerHTML = "Level: " + level.toString();
    document.getElementById("score").innerHTML = "Score: " + score.toString();
    document.getElementById("remaining").innerHTML =  remaining.toString() + " More";
}

// Function to upate the right hand side.
function side() {
    document.getElementById("pipe5").innerHTML = "<img src= 'pipe_"+pipe5+".png' width='80'>"
    document.getElementById("pipe4").innerHTML = "<img src= 'pipe_"+pipe4+".png' width='80'>"
    document.getElementById("pipe3").innerHTML = "<br><img src= 'pipe_"+pipe3+".png' width='80'>"
    document.getElementById("pipe2").innerHTML = "<br><img src= 'pipe_"+pipe2+".png' width='80'>"
    document.getElementById("pipe1").innerHTML = "<br><img src= 'pipe_"+pipe1+".png' width='80'>";
    document.getElementById("logo").innerHTML = "<br><img src= 'logo.png' width='60'>";
}

// Check the next Box to see if there is a connected pipe.
function checkNext()
{
    if(direction == 1)
    {
        water_x = (water_x==0) ? 9 : water_x-1;
        var temp = parseInt(document.getElementById((water_y).toString() + water_x.toString()).getAttribute("data-pipe"));
        if(temp == 1)
        {
            direction = 1;
            fillCurrent(1);
        }
        else if(temp == 3)
        {
            direction = 1;
            fillCurrent(3);
        }
        else if(temp == 6)
        {
            direction = 3;
            fillCurrent(6);
        }
        else if(temp == 7)
        {
            direction = 4;
            fillCurrent(7);
        }
        else if(temp == 8)
        {
            direction = 1;
            fillCurrent(8);
        }
        else
        {
            gameOver();
        }
    }
    else if(direction == 2)
    {
        // Filling the first pipe
        if(water_x == STARTING_X && water_y == STARTING_Y)
        {
            document.getElementById((STARTING_Y).toString() + STARTING_X.toString()).innerHTML = "<img src= 'f_pipe_start.png' width='50'>";
        }

        water_x = (water_x == 9) ? 0 : water_x + 1;
        var temp = document.getElementById((water_y).toString() + water_x.toString()).getAttribute("data-pipe");

        if(temp == 1)
        {
            direction = 2;
            fillCurrent(1);
            winCheck();
        }
        else if(temp == 3)
        {
            direction = 2;
            fillCurrent(3);
            winCheck();
        }
        else if(temp == 4)
        {
            direction = 3;
            fillCurrent(4);
        }
        else if(temp == 5)
        {
            direction = 4;
            fillCurrent(5);
        }
        else if(temp == 8)
        {
            direction = 2;
            fillCurrent(8);
            winCheck();
        }
        else
        {
            gameOver();
        }
    }
    else if(direction == 3)
    {
        water_y = (water_y==0) ? 9 : water_y-1;
        var temp = document.getElementById(water_y.toString() + (water_x).toString()).getAttribute("data-pipe");
        if(temp == 2)
        {
            direction = 3;
            fillCurrent(2);
        }
        else if(temp == 3)
        {
            direction = 3;
            fillCurrent(3);
        }
        else if(temp == 5)
        {
            direction = 1;
            fillCurrent(5);
        }
        else if(temp == 7)
        {
            direction = 2;
            fillCurrent(7);
            winCheck();
        }
        else if(temp == 9)
        {
            direction = 3;
            fillCurrent(9);
        }
        else
        {
            gameOver();
        }    
    }
    else if(direction == 4)
    {
        water_y = (water_y==9) ? 0 : water_y+1;
        var temp = document.getElementById(water_y.toString() + (water_x).toString()).getAttribute("data-pipe");
        if(temp == 2)
        {
            direction = 4;
            fillCurrent(2);
        }
        else if(temp == 3)
        {
            direction = 4;
            fillCurrent(3);
        }
        else if(temp == 4)
        {
            direction = 1;
            fillCurrent(4);
        }
        else if(temp == 6)
        {
            direction = 2;
            fillCurrent(6);
            winCheck();
        }
        else if(temp == 9)
        {
            direction = 4;
            fillCurrent(9);
        }
        else
        {
            gameOver();
        }           
    }
}

// Fill the current pipe with water by changing the image to filled pipe
function fillCurrent(curr_pipe)
{
     document.getElementById((water_y).toString() + water_x.toString()).innerHTML = "<img src= 'f_pipe_" + curr_pipe + ".png' width='50'>";
     score += 40;
     remaining = (remaining > 0) ? remaining - 1 : remaining;
     head();
}

// Game Over!
function gameOver() 
{
    alert("You just lost the game, Way to go!");
}

// Check if the next pipe is end pipe
function winCheck()
{
    var temp = document.getElementById((water_y).toString() + (water_x+1).toString()).getAttribute("data-pipe");
    if (temp == "end")
    {
        if (remaining == 0) 
        {
            gameWon();
        }
        else
        {
            gameOver();
        }
    }
}

// Game Won
function gameWon()
{
    alert("You win!(absolutely nothing)");
    initialize();
}

// Generate the starting and ending pipe
function generatePipes()
{
    STARTING_X = Math.floor(Math.random() * (9));
    STARTING_Y = Math.floor(Math.random() * (10)) ;

    ENDING_Y = Math.floor(Math.random() * (10)) ;

    var temp = Math.floor(Math.random() * (10 - 1)) + 1;
    while((STARTING_Y == ENDING_Y) && ((temp == STARTING_X) || (temp == STARTING_X+1) || (temp == STARTING_X+2)))
    {
        temp = Math.floor(Math.random() * (10 - 1)) + 1;
    }
    ENDING_X = temp;
}