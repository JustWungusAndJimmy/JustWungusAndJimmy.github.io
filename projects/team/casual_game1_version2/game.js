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
var COLOR_DIAGONAL = 0xffffba;
var COLOR_PUZZLE_HOLE = 0xcdc6d6;
var COLOR_COLOR_2 = 0xffb3ba;
var COLOR_COLOR_3 = 0xffdfba;
var COLOR_EXITS = 0x96cca2;
var COLOR_TUT = 0xdbffe3;
//map values
var PUZZLE_WALL = 0;
var COLOR_GOAL = 1;
var PUZZLE_HOLE = 2;
var COLOR_1 = 3;
var COLOR_2 = 4;
var COLOR_3 = 5;

var SFX_SWAP = "fx_boop";
var SFX_COMPLETE = "fx_jump6";
var SFX_WIN = "fx_tada";
var level1 = {
    width : 4, height : 3, pixelSize : 1,
    data : [
        0, 1, 0, 0,
        0, 2, 1, 0,
        0, 1, 0, 0
    ],
    //the path that the colored beads must be lined up in to beat the level
    x_path : [1, 1, 1],
    y_path: [0, 1, 2],
    entrance: [1, 0],
    exit: [1, 2],
    soundSet: 1,
    //data strictly for the tutorial animation
    bead1 : [2, 1],
    bead2 : [1, 1]
}

var level2 = {
    width : 5, height : 5, pixelSize : 1,
    data : [
        0, 0, 1, 0, 0,
        0, 4, 1, 1, 0,
        0, 4, 2, 4, 0,
        0, 4, 1, 4, 0,
        0, 0, 1, 0, 0
    ],
    //the path that the colored beads must be lined up in to beat the level
    x_path : [ 2, 2, 2, 2, 2 ],
    y_path: [0, 1, 2, 3, 4],
    entrance: [2, 0],
    exit: [2, 4],
    soundSet: 1,
}

var level3 = {
    width : 5, height : 5, pixelSize : 1,
    data : [
        0, 0, 0, 0, 0,
        0, 1, 1, 4, 0,
        1, 4, 2, 4, 0,
        0, 0, 1, 4, 0,
        0, 0, 1, 0, 0
    ],
    //the path that the colored beads must be lined up in to beat the level
    x_path : [ 0, 1, 2, 2, 2 ],
    y_path: [2, 2, 2, 3, 4],
    entrance: [0, 2],
    exit: [2, 4],
    soundSet: 1,
}

var level4 = {
    width : 6, height : 5, pixelSize : 1,
    data : [
        0, 1, 0, 0, 0, 0,
        0, 1, 0, 0, 2, 1,
        0, 4, 1, 4, 1, 0,
        0, 1, 1, 4, 1, 0,
        0, 0, 0, 0, 0, 0
    ],
    //the path that the colored beads must be lined up in to beat the level
    x_path : [ 1, 1, 4, 5, 1, 2, 3, 4 ],
    y_path: [0, 1, 1, 1, 2, 2, 2, 2],
    entrance: [1, 0],
    exit: [5, 1],
    soundSet: 2,
}

var level5 = {
    width : 5, height : 5, pixelSize : 1,
    data : [
        0, 0, 0, 0, 0,
        1, 4, 4, 2, 0,
        0, 4, 4, 1, 0,
        0, 4, 1, 1, 0,
        0, 1, 0, 0, 0
    ],
    //the path that the colored beads must be lined up in to beat the level
    x_path : [ 0, 1, 1, 1, 1 ],
    y_path: [1, 1, 2, 3, 4],
    entrance: [0, 1],
    exit: [1, 4],
    soundSet: 2,
}

var level6 = {
    width : 6, height : 4, pixelSize : 1,
    data : [
        0, 1, 0, 0, 0, 0,
        0, 3, 1, 1, 4, 0,
        2, 0, 4, 1, 4, 0,
        0, 0, 1, 0, 0, 0
    ],
    //the path that the colored beads must be mined up in to beat the level
    x_path : [ 1, 1, 2, 2, 2],
    y_path : [ 0, 1, 1, 2, 3],
    entrance : [1, 0],
    exit: [2, 3],
    soundSet: 3,
    //data strictly for tutorial animation
    bead1 : [1, 1],
    bead2 : [0, 2]
}

var level7 = {
    width : 6, height : 5, pixelSize : 1,
    data : [
        0, 1, 0, 0, 0, 0,
        0, 1, 1, 0, 4, 0,
        0, 4, 1, 0, 2, 0,
        0, 4, 3, 0, 4, 0,
        0, 1, 0, 3, 0, 0
    ],
    //the path that the colored beads must be mined up in to beat the level
    x_path : [ 1, 1, 1, 1, 1 ],
    y_path : [ 0, 1, 2, 3, 4 ],
    entrance : [1, 0],
    exit: [1, 4],
    soundSet: 3,
}

var levels = [level1, level2, level3, level4, level5, level6, level7];
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
var play_tutorial = true;
var pulse_bead1 = true;
var pulse_bead2 = false;
var cur_border_size = 3;
var is_incrementing = true;
var transitionCounter = 0;
var audioChoice = 0;

//TIMERS
var tutorialTimer = null;
var transitionTimer = null;

//FUNCTIONS

//timer function wait for fade to finish
var fadeWait = function () {
    transitionCounter++;
    if (transitionCounter === 30) {
        var index = 0;
        for (var y = 0; y < levels[level_index].height; y++) {
            for (var x = 0; x < levels[level_index].width; x++) {
                if (x === levels[level_index].x_path[index] && y === levels[level_index].y_path[index]) {
                    index++;
                    PS.color(x, y, COLOR_BG);
                    PS.borderColor(x, y, COLOR_BG);
                }
            }
        }
    }
    if (transitionCounter === 100) {
        PS.fade(PS.ALL, PS.ALL, 0);
        PS.borderFade(PS.ALL, PS.ALL, 0);
        transitionCounter = 0;
        PS.timerStop(transitionTimer);
        gameWon();
    }

}
//transition fade between levels
var levelTransition = function () {
    var index = 0;
    for (var y = 0; y < levels[level_index].height; y++) {
        for (var x = 0; x < levels[level_index].width; x++) {
            if (x === levels[level_index].x_path[index] && y === levels[level_index].y_path[index]) {
                index++;
                PS.fade(x, y, 60);
                PS.borderFade(x, y, 60);
            }
            else {
                PS.fade(x, y, 30);
                PS.borderFade(x, y, 30);
                PS.borderColor(x, y, COLOR_BG);
                PS.color(x, y, COLOR_BG);
            }
        }
    }
    transitionTimer = PS.timerStart(1, fadeWait);
    
}

var swapSound = function (set) {
    var choice = audioChoice;
    while (choice === audioChoice)
        choice = Math.floor(Math.random() * 4);
    audioChoice = choice;
    if (set === 1) {
        if (choice === 0)
            PS.audioPlay("1a", { path: "sounds/", fileTypes: ["wav"], lock: true });
        if (choice === 1)
            PS.audioPlay("1b", { path: "sounds/", fileTypes: ["wav"], lock: true });
        if (choice === 2)
            PS.audioPlay("1c", { path: "sounds/", fileTypes: ["wav"], lock: true });
        if (choice === 3)
            PS.audioPlay("1d", { path: "sounds/", fileTypes: ["wav"], lock: true });
    }

    if (set === 2) {
        if (choice === 0)
            PS.audioPlay("2a", { path: "sounds/", fileTypes: ["wav"], lock: true });
        if (choice === 1)
            PS.audioPlay("2b", { path: "sounds/", fileTypes: ["wav"], lock: true });
        if (choice === 2)
            PS.audioPlay("2c", { path: "sounds/", fileTypes: ["wav"], lock: true });
        if (choice === 3)
            PS.audioPlay("2d", { path: "sounds/", fileTypes: ["wav"], lock: true });
    }

    if (set === 3) {
        if (choice === 0)
            PS.audioPlay("3a", { path: "sounds/", fileTypes: ["wav"], lock: true });
        if (choice === 1)
            PS.audioPlay("3b", { path: "sounds/", fileTypes: ["wav"], lock: true });
        if (choice === 2)
            PS.audioPlay("3c", { path: "sounds/", fileTypes: ["wav"], lock: true });
        if (choice === 3)
            PS.audioPlay("3d", { path: "sounds/", fileTypes: ["wav"], lock: true });
    }
}
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
                PS.border(x, y, 0);
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
                PS.color(x, y, COLOR_DIAGONAL);
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

    if (level_index == 5) {
        tutorialTimer = null;
        pulse_bead1 = true;
        pulse_bead2 = false;
        play_tutorial = true;
        tutorialTimer = PS.timerStart(3, tutorialTick);
    }
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
    //SPECIAL BEAD CHECKS
    if (PS.color(x, y) == COLOR_DIAGONAL) {
        //check to see if bead is diagonal from the hole
        if (x == x_hole_bead - 1 && y == y_hole_bead + 1) {
            return true;
        } else if (x == x_hole_bead + 1 && y == y_hole_bead + 1) {
            return true;
        } else if (x == x_hole_bead - 1 && y == y_hole_bead - 1) {
            return true;
        } else if (x == x_hole_bead + 1 && y == y_hole_bead - 1) {
            return true;
        }
    }

    //NONSPECIAL BEAD CHECKS
    //Is the selected bead a wall?
    if (levels[level_index].data[(y * levels[level_index].width) + x] === PUZZLE_WALL) {
        return false;
    }
    //Is the selected bead the entrance bead?
    if (x == levels[level_index].entrance[0] && y == levels[level_index].entrance[1]){
        return false;
    }
    //Is the selected bead the exit bead?
    if (x == levels[level_index].exit[0] && y == levels[level_index].exit[1]){
        return false;
    }
    //Is the selectable, nonspecial bead on the perimeter?
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
    PS.dbEvent("home", "x1", x_selected, "y1", y_selected, "x2", x, "y2", y);
    PS.borderColor(levels[level_index].entrance[0], levels[level_index].entrance[1], COLOR_EXITS);
    PS.borderColor(levels[level_index].exit[0], levels[level_index].exit[1], COLOR_EXITS);
    swapSound(levels[level_index].soundSet);
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
        levelTransition();
        
    }
}

var gameWon = function () {
    level_index += 1;
    PS.dbEvent("home", "LevelCompleted", level_index);
    if (level_index == num_levels) {
        PS.statusText("You found your way home.");
        touch_enabled = false;
        return;
    } else {
        PS.audioPlay(SFX_COMPLETE);
        loadBoard();
    }
}

var resetTutorialAnimValues = function() {
    if (play_tutorial) {
        cur_border_size = 3;
        PS.border(levels[level_index].bead1[0], levels[level_index].bead1[1], cur_border_size);
        PS.borderColor(levels[level_index].bead1[0], levels[level_index].bead1[1], COLOR_BG);
        is_incrementing = true;
    } else {
        PS.borderColor(levels[level_index].bead2[0], levels[level_index].bead2[1], COLOR_BG);
        cur_border_size = 3;
        PS.border(levels[level_index].bead2[0], levels[level_index].bead2[1], cur_border_size);
        is_incrementing = false;
    }
}

var tutorialTick = function() {
    if (pulse_bead1) {
        PS.borderColor(levels[level_index].bead1[0], levels[level_index].bead1[1], COLOR_TUT);
        PS.border(levels[level_index].bead1[0], levels[level_index].bead1[1], cur_border_size);
        if (cur_border_size == 20) {
            is_incrementing = false;
            cur_border_size--;
        } else if (cur_border_size == 3){
            is_incrementing = true;
            cur_border_size += 1;
        } else if (is_incrementing) {
            cur_border_size += 1;
        } else if (!is_incrementing) {
            cur_border_size -= 1;
        }
    } else if (pulse_bead2) {
        PS.borderColor(levels[level_index].bead2[0], levels[level_index].bead2[1], COLOR_TUT);
        PS.border(levels[level_index].bead2[0], levels[level_index].bead2[1], cur_border_size);
        if (cur_border_size == 20) {
            is_incrementing = false;
            cur_border_size--;
        } else if (cur_border_size == 3){
            is_incrementing = true;
            cur_border_size += 1;
        } else if (is_incrementing) {
            cur_border_size += 1;
        } else if (!is_incrementing) {
            cur_border_size -= 1;
        }
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
    //load sounds
    PS.audioLoad("1a", { path: "sounds/", fileTypes: ["wav"], lock: true });
    PS.audioLoad("1b", { path: "sounds/", fileTypes: ["wav"], lock: true });
    PS.audioLoad("1c", { path: "sounds/", fileTypes: ["wav"], lock: true });
    PS.audioLoad("1d", { path: "sounds/", fileTypes: ["wav"], lock: true });

    PS.audioLoad("2a", { path: "sounds/", fileTypes: ["wav"], lock: true });
    PS.audioLoad("2b", { path: "sounds/", fileTypes: ["wav"], lock: true });
    PS.audioLoad("2c", { path: "sounds/", fileTypes: ["wav"], lock: true });
    PS.audioLoad("2d", { path: "sounds/", fileTypes: ["wav"], lock: true });

    PS.audioLoad("3a", { path: "sounds/", fileTypes: ["wav"], lock: true });
    PS.audioLoad("3b", { path: "sounds/", fileTypes: ["wav"], lock: true });
    PS.audioLoad("3c", { path: "sounds/", fileTypes: ["wav"], lock: true });
    PS.audioLoad("3d", { path: "sounds/", fileTypes: ["wav"], lock: true });
    //Load current level
	loadBoard();
	touch_enabled= false;
	var gotname = function (id, name){
	    PS.statusText("hello, " + name + "!");
	    touch_enabled = true;
	    //start tutorial animation only after name has been entered
        tutorialTimer = PS.timerStart(3, tutorialTick);
	}
	PS.dbInit("home", { login: gotname });
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
        if (play_tutorial) {
            if (pulse_bead1) {
                if (x == levels[level_index].bead1[0] && y == levels[level_index].bead1[1]) {
                    pulse_bead1 = false;
                    pulse_bead2 = true;
                    resetTutorialAnimValues();
                }
            } else {
                PS.timerStop(tutorialTimer);
                play_tutorial = false;
                pulse_bead2 = false;
                resetTutorialAnimValues();
            }
        }
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
PS.shutdown ( options )
Called when the browser window running Perlenspiel is about to close.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: This event is generally needed only by applications utilizing networked telemetry.
*/
PS.shutdown = function( options ) {
	"use strict"; // Do not remove this directive!
	PS.dbSend("home", "jacattelona", { discard: true });
};


