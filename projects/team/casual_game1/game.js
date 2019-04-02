/*
game.js for Perlenspiel 3.3.x
Last revision: 2018-10-14 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-19 Worcester Polytechnic Institute.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.
*/

//MAPS FOR EACH LEVEL
//map colors
var COLOR_BG = 0xcdc6d6;
var COLOR_STATUS = PS.COLOR_WHITE;
var COLOR_PUZZLE_WALL = 0xb9b9d1;
var COLOR_COLOR_GOAL = 0xbaffc9;
var COLOR_PUZZLE_HOLE = 0xcdc6d6;
var COLOR_COLOR_1 = 0xffffba;
var COLOR_COLOR_2 = 0xffb3ba;
var COLOR_COLOR_3 = 0xffdfba;
var COLOR_EXITS = PS.COLOR_WHITE;
//map values
var PUZZLE_WALL = 0;
var COLOR_GOAL = 1;
var PUZZLE_HOLE = 2;
var COLOR_1 = 3;
var COLOR_2 = 4;
var COLOR_3 = 5;

var level1 = {
    width : 4, height : 3, pixelSize : 1,
    data : [
        0, 1, 0, 0,
        0, 2, 1, 0,
        0, 1, 0, 0
    ],
    //the path that the colored beads must be lined up in to bet the level
    x_path : [1, 1, 1],
    y_path: [0, 1, 2],
    entrance: [1, 0],
    exit: [1, 2],
}

var level2 = {
    width : 5, height : 5, pixelSize : 1,
    data : [
        0, 0, 1, 0, 0,
        0, 3, 1, 1, 0,
        0, 3, 2, 3, 0,
        0, 3, 1, 3, 0,
        0, 0, 1, 0, 0
    ],
    //the path that the colored beads must be lined up in to bet the level
    x_path : [ 2, 2, 2, 2, 2 ],
    y_path: [0, 1, 2, 3, 4],
    entrance: [2, 0],
    exit: [2, 4],
}

var level3 = {
    width : 5, height : 5, pixelSize : 1,
    data : [
        0, 0, 0, 0, 0,
        0, 1, 1, 3, 0,
        1, 3, 2, 3, 0,
        0, 0, 1, 3, 0,
        0, 0, 1, 0, 0
    ],
    //the path that the colored beads must be lined up in to bet the level
    x_path : [ 0, 1, 2, 2, 2 ],
    y_path: [2, 2, 2, 3, 4],
    entrance: [0, 2],
    exit: [2, 4],
}

var level4 = {
    width : 6, height : 5, pixelSize : 1,
    data : [
        0, 1, 0, 0, 0, 0,
        0, 1, 0, 0, 2, 1,
        0, 3, 1, 3, 1, 0,
        0, 1, 1, 3, 1, 0,
        0, 0, 0, 0, 0, 0
    ],
    //the path that the colored beads must be lined up in to bet the level
    x_path : [ 1, 1, 4, 5, 1, 2, 3, 4 ],
    y_path: [0, 1, 1, 1, 2, 2, 2, 2],
    entrance: [1, 0],
    exit: [5, 1],
}

var level5 = {
    width : 5, height : 5, pixelSize : 1,
    data : [
        0, 0, 0, 0, 0,
        1, 3, 4, 2, 0,
        0, 4, 3, 1, 0,
        0, 3, 1, 1, 0,
        0, 1, 0, 0, 0
    ],
    //the path that the colored beads must be lined up in to bet the level
    x_path : [ 0, 1, 1, 1, 1 ],
    y_path: [1, 1, 2, 3, 4],
    entrance: [0, 1],
    exit: [1, 4],
}

var levels = [level1, level2, level3, level4, level5];
var num_levels = levels.length;

//VARIABLES
var level_index = 0;
var x_bead_path = [];
var y_bead_path = [];
var x_hole_bead;
var y_hole_bead;
var x_selected;
var y_selected;
var bead_selected = false;
var touch_enabled = true;

//FUNCTIONS
//Loads the next level
var loadBoard = function() {
    var x, y, val;
    //get level width and height for variable level sizes
    var gridWidth = levels[level_index].width;
    var gridHeight = levels[level_index].height;
    PS.gridSize(gridWidth, gridHeight);

    initializeValues();

    for ( y = 0; y < levels[level_index].height; y += 1 ) {
        for (x = 0; x < levels[level_index].width; x += 1) {
            val = levels[level_index].data[(y * levels[level_index].width) + x]; // get map data
            if (val === PUZZLE_WALL) {
                PS.color(x, y, COLOR_PUZZLE_WALL);
            }
            else if (val === COLOR_GOAL) {
                PS.color(x, y, COLOR_COLOR_GOAL);
            }
            else if (val === PUZZLE_HOLE){
                PS.color(x, y, COLOR_PUZZLE_HOLE);
                x_hole_bead = x;
                y_hole_bead = y;
            }
            else if (val === COLOR_1) {
                PS.color(x, y, COLOR_COLOR_1);
            }
            else if (val === COLOR_2){
                PS.color(x, y, COLOR_COLOR_2);
            }
            else if (val === COLOR_3) {
                PS.color(x, y, COLOR_COLOR_3);
            }
        }
    }

    x_bead_path = levels[level_index].x_path;
    y_bead_path = levels[level_index].y_path;

    PS.borderColor(levels[level_index].entrance[0], levels[level_index].entrance[1], COLOR_EXITS);
    PS.borderColor(levels[level_index].exit[0], levels[level_index].exit[1], COLOR_EXITS);
}

var initializeValues = function() {
    //Initialize beginning values
    PS.bgColor(PS.ALL, PS.ALL, COLOR_BG);
    PS.gridColor(COLOR_BG);
    PS.statusColor( COLOR_STATUS );
    PS.statusText("");
    PS.border(PS.ALL, PS.ALL, {
        top : 3,
        left : 3,
        bottom : 3,
        right : 3,
    });
    PS.borderColor(PS.ALL, PS.ALL, COLOR_BG);
}

//Check to see if the bead that has been touched is along the cardinal perimeter of the hole bead
var isSelectable = function(x, y) {
    //Is the selected bead a wall?
    if (levels[level_index].data[(y * levels[level_index].width) + x] == COLOR_PUZZLE_WALL) {
        return false;
    }
    //Is the selectable bead on the perimeter?
    if ((x_hole_bead - 1) <= x && x <= (x_hole_bead + 1)){
        if ((y_hole_bead - 1) <= y && y <= (y_hole_bead + 1)) {
            //If it's the hole bead, don't select it
            if (x == x_hole_bead && y == y_hole_bead){
                return false;
            //If it's a diagonal, don't select it
            } else if (x == x_hole_bead - 1 && y == y_hole_bead + 1) {
                return false;
            } else if (x == x_hole_bead + 1 && y == y_hole_bead + 1) {
                return false;
            } else if (x == x_hole_bead - 1 && y == y_hole_bead - 1) {
                return false;
            } else if (x == x_hole_bead + 1 && y == y_hole_bead - 1) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

var resetSelected = function() {
    x_selected = null;
    y_selected = null;
    bead_selected = false;
}

var swapBeads = function(x, y) {
    var bx, by, val;
    var cur_x_bead_path = [];
    var cur_y_bead_path = [];
    var clickedColor = PS.color(x,y);
    PS.borderColor(x_selected, y_selected, COLOR_BG);
    PS.color(x, y, PS.color(x_selected, y_selected));
    PS.color(x_selected, y_selected, clickedColor);
    x_hole_bead = x_selected;
    y_hole_bead = y_selected;

    PS.borderColor(levels[level_index].entrance[0], levels[level_index].entrance[1], COLOR_EXITS);
    PS.borderColor(levels[level_index].exit[0], levels[level_index].exit[1], COLOR_EXITS);
    //Check to see if the path has been formed
    for ( by = 0; by < levels[level_index].height; by += 1 ) {
        for (bx = 0; bx < levels[level_index].width; bx += 1) {
            val = PS.color(bx, by); // get map data
            if (val == COLOR_COLOR_GOAL) {
                cur_x_bead_path.push(bx);
                cur_y_bead_path.push(by);
            }
        }
    }

    if (JSON.stringify(cur_x_bead_path) === JSON.stringify(x_bead_path) && JSON.stringify(cur_y_bead_path) === JSON.stringify(y_bead_path)) {
        //level is won!
        gameWon();
    }
}

var gameWon = function() {
    level_index += 1;
    if (level_index == num_levels) {
        PS.statusText("You beat the game!");
        touch_enabled = false;
        return;
    } else {
        loadBoard();
    }
}


/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.init = function( system, options ) {
	"use strict"; // Do not remove this directive!
    //Load current level
    loadBoard();
};

/*
PS.touch ( x, y, data, options )
Called when the left mouse button is clicked over bead(x, y), or when bead(x, y) is touched.
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.touch = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!
    if (touch_enabled) {
        if (bead_selected) {
            if (x_hole_bead == x && y_hole_bead == y) {
                swapBeads(x, y);
                resetSelected();
                return;
            } else {
                PS.borderColor(x_selected, y_selected, COLOR_BG);
                PS.borderColor(levels[level_index].entrance[0], levels[level_index].entrance[1], COLOR_EXITS);
                PS.borderColor(levels[level_index].exit[0], levels[level_index].exit[1], COLOR_EXITS);
                resetSelected();
                return;
            }
        }
        if (isSelectable(x, y)){
            if (bead_selected){
                PS.borderColor(x_selected, y_selected, COLOR_BG);
                PS.borderColor(levels[level_index].entrance[0], levels[level_index].entrance[1], COLOR_EXITS);
                PS.borderColor(levels[level_index].exit[0], levels[level_index].exit[1], COLOR_EXITS);
            }
            PS.borderColor(x, y, PS.COLOR_WHITE);
            x_selected = x;
            y_selected = y;
            bead_selected = true;
        } else {
            if (bead_selected) {
                PS.borderColor(x_selected, y_selected, COLOR_BG);
                PS.borderColor(levels[level_index].entrance[0], levels[level_index].entrance[1], COLOR_EXITS);
                PS.borderColor(levels[level_index].exit[0], levels[level_index].exit[1], COLOR_EXITS);
                resetSelected();
            }
        }
    } else {
        return;
    }
};

/*
PS.release ( x, y, data, options )
Called when the left mouse button is released, or when a touch is lifted, over bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.release() event handler:

/*

PS.release = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead.
};

*/

/*
PS.enter ( x, y, button, data, options )
Called when the mouse cursor/touch enters bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.enter() event handler:

/*

PS.enter = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead.
};

*/

/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.exit() event handler:

/*

PS.exit = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead.
};

*/

/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.exitGrid() event handler:

/*

PS.exitGrid = function( options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.
};

*/

/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.keyDown() event handler:

/*

PS.keyDown = function( key, shift, ctrl, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is pressed.
};

*/

/*
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.keyUp() event handler:

/*

PS.keyUp = function( key, shift, ctrl, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.
};

*/

/*
PS.input ( sensors, options )
Called when a supported input device event (other than those above) is detected.
This function doesn't have to do anything. Any value returned is ignored.
[sensors : Object] = A JavaScript object with properties indicating sensor status; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: Currently, only mouse wheel events are reported, and only when the mouse cursor is positioned directly over the grid.
*/

// UNCOMMENT the following code BLOCK to expose the PS.input() event handler:

/*

PS.input = function( sensors, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code lines to inspect first parameter:

//	 var device = sensors.wheel; // check for scroll wheel
//
//	 if ( device ) {
//	   PS.debug( "PS.input(): " + device + "\n" );
//	 }

	// Add code here for when an input event is detected.
};

*/

/*
PS.shutdown ( options )
Called when the browser window running Perlenspiel is about to close.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: This event is generally needed only by applications utilizing networked telemetry.
*/

// UNCOMMENT the following code BLOCK to expose the PS.shutdown() event handler:

/*

PS.shutdown = function( options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to verify operation:

	// PS.debug( "“Dave. My mind is going. I can feel it.”\n" );

	// Add code here to tidy up when Perlenspiel is about to close.
};

*/
