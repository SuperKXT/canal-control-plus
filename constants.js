//------------
// VARIABLES AND CONSTANTS TO BE USED THROUGH OUT THE GAME,
// LISTED HERE TO ISOLATE THEM FROM THE GAME CODE.
//------------

//the starting point
var STARTING_X;
    STARTING_Y;

//the ending point
var ENDING_X;
    ENDING_Y;
    

//the selected box when the level starts
var current_x;
    current_y;

// Stores the currently selected box's coordinates, used to id the box.    
var element; 

// Score Counter
var score;

// Level Counter
var level;

// Remaining Pipes Counter
var remaining;

// Time between two water flows.
var time;

// Time before the next flow.
var  remaining_Time;

// The current position of water
var water_x;
    water_y;

// Direction of the water flow
//  1 = left
//  2 = right
//  3 = up
//  4 = down
var direction;
