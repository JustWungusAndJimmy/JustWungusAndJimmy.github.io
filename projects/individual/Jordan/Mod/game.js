// game.js for Perlenspiel 3.3.x
// The following comment lines are for JSHint. Don't remove them!

/* jshint browser : true, devel : true, esversion : 5, freeze : true */
/* globals PS : true */

// This immediately-invoked function expression (IIFE) encapsulates all game functionality.
// It is called as this file is loaded, and initializes the G variable.
// The object established in G by the IIFE will contain all public constants, variables and functions.

//Jordan Cattelona
//Mods
//Mod1: When the player moves, they leave a fading trail behind them
//Mod2: A sound is played for every space the player moves
//Mod3: The screen flashes every time gold is picked up
//Mod4: Gold has a different appearence
//Mod5: There is less initial gold, and more gold appears as you collect
//Mod6: Upon collecting all the gold in a level, the exit has an opening animation
//Mod7: The player has the option of restarting the game once the exit is reached
//Mod8: Exit location is randomized with every victory
//Mod9: Initial player location is randomized with every victory
//Mod10: Changed Level Layout to include more loops and paths
var G = ( function () {
	"use strict";

	// All internal variable and function names begin with an underscore.
	// Constants are in all upper-case.

	var _WIDTH = 21; // grid width
	var _HEIGHT = 21; // grid height

	var _PLANE_FLOOR = 0; // z-plane of floor
	var _PLANE_ACTOR = 1; // z-plane of actor

	var _COLOR_BG = 0x303030; // background color (Perlenspiel gray)
	var _COLOR_WALL = PS.COLOR_BLACK; // wall color
	var _COLOR_FLOOR = PS.COLOR_GRAY; // floor color
	var _COLOR_ACTOR = PS.COLOR_GREEN; // actor color
	var _COLOR_GOLD = PS.COLOR_YELLOW; // gold color
	var _COLOR_EXIT = PS.COLOR_BLUE; // exit color

	var _SFX_FLOOR = "fx_click"; // touch floor sound
	var _SFX_WALL = "fx_hoot"; // touch wall sound
	var _SFX_GOLD = "fx_coin1"; // take coin sound
	var _SFX_OPEN = "fx_powerup8"; // open exit sound
	var _SFX_WIN = "fx_tada"; // win sound
	var _SFX_ERROR = "fx_uhoh"; // error sound

	var _WALL = 0; // wall
	var _FLOOR = 1; // floor
	var _GOLD = 2; // floor + gold

	// Variables

	var _id_sprite; // actor sprite id
	var _id_path; // pathmap id for pathfinder
	var _id_timer; // timer id

	var _gold_count; // initial number of gold pieces in map
	var _gold_found; // gold pieces collected
	var _won = false; // true on win

	// This handmade imageMap is used for map drawing and pathfinder logic
	// All properties MUST be present!
	// The map.data array controls the layout of the maze,
	// the location of the gold pieces and exit
	// 0 = wall, 1 = floor, 2 = floor + gold
	// To remove a gold piece, replace a 2 with a 1
    // To add a gold piece, replace a 1 with a 2

    //original copy of the map used to reload the level
	var backup = [
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
			0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 2, 1, 1, 1, 1, 1, 0, 0, 1, 0,
			0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
			0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
			0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0,
			0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0,
			0, 1, 0, 0, 1, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0,
			0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0,
			0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0,
			0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	];
	var _map = {
		width: 0, // set by G.init()
		height: 0, // ditto
		pixelSize: 1, // must be present and = 1!
		data: [
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
			0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 2, 1, 1, 1, 1, 1, 0, 0, 1, 0,
			0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
			0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
			0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0,
			0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0,
			0, 1, 0, 0, 1, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0,
			0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0,
			0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0,
			0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
		]
	};

	// These two variables control the initial location of the actor
	// This location MUST correspond to a floor location (1) in the maza.data array
    // or a startup error will occur!

    //list of start locations
	var starts = [
    [1, 1],
    [7, 10],
    [16, 16],
    [10, 1],
    [10, 10]
	];

	var _actor_x = 1; // initial x-pos of actor sprite
	var _actor_y = 1; // initial y-pos of actor sprite


	// These two variables control the location of the exit
	// This location MUST correspond to a floor location (1) in the maza.data array
    // or a startup error will occur!

    //list of exit locations
	var exits = [
        [19, 19],
        [19, 7],
        [16, 19],
        [7, 1],
        [10, 7]
	];
	var _exit_x = 19; // x-pos of exit
	var _exit_y = 19; // y-pos of exit
	var _exit_ready = false; // true when exit is opened
    //width of exit borders, used for opening animation
	var _exit_width = 10;



	// Timer function, called every 1/10th sec
	// This moves the actor along paths

	var _path; // path to follow, null if none
	var _step; // current step on path

    //stack of fader locations
	var fadeStack = [];

    //keydown used to restart level
	PS.keyDown = function (key, shift, ctrl, options) {
	    if (key == 32 && _won == true) {
	        _won = false;
	        _exit_width = 10;
	        var x, y, val, color;

	        _map.width = _WIDTH;
	        _map.height = _HEIGHT;

	        var startchoice = Math.floor(Math.random() * starts.length);
	        _actor_x = starts[startchoice][0];
	        _actor_y = starts[startchoice][1];
	        //_actor_x = 1;
	        //_actor_y = 1;


	        val = _map.data[(_actor_y * _HEIGHT) + _actor_x]; // get map data under actor
	        if (val !== _FLOOR) {
	            PS.debug("ERROR: Actor not on empty floor!", + _actor_x + " " + _actor_y);
	            PS.audioPlay(_SFX_ERROR);
	            return;
	        }

	        val = _map.data[(_exit_y * _HEIGHT) + _exit_x]; // get map data at exit position
	        if (val !== _FLOOR) {
	            PS.debug("ERROR: Exit not on empty floor!");
	            PS.audioPlay(_SFX_ERROR);
	            return;
	        }

	        PS.gridColor(_COLOR_BG); // grid background color
	        PS.border(PS.ALL, PS.ALL, 0); // no bead borders
	        PS.statusColor(PS.COLOR_WHITE);
	        PS.statusText("Click/touch to move");
	        PS.bgAlpha(PS.ALL, PS.ALL, 255);
	        PS.bgColor(PS.ALL, PS.ALL, _COLOR_FLOOR);
	        // Use the map.data array to draw the maze
	        // This also counts the number of gold pieces that have been placed

	        _gold_count = _gold_found = 0;
	        for (y = 0; y < _HEIGHT; y += 1) {
	            for (x = 0; x < _WIDTH; x += 1) {
	                _map.data[(y * _HEIGHT) + x] = backup[(y * _HEIGHT) + x];
	                val = _map.data[(y * _HEIGHT) + x]; // get data
	                if (val === _WALL) {
	                    color = _COLOR_WALL;
	                }
	                else if (val === _FLOOR) {
	                    color = _COLOR_FLOOR;
	                }
	                else if (val === _GOLD) {
	                    PS.radius(x, y, 50);
	                    //PS.bgColor(x, y, _COLOR_FLOOR);
	                    color = _COLOR_GOLD;
	                    _gold_count += 1; // add to count
	                }
	                PS.color(x, y, color);
	            }
	        }
	        PS.color(_exit_x, _exit_y, _COLOR_FLOOR);
	        PS.glyph(_exit_x, _exit_y, "");

	        var exitchoice = Math.floor(Math.random() * exits.length);
	        _exit_x = exits[exitchoice][0];
	        _exit_y = exits[exitchoice][1];

	        _exit_ready = false;
	        // Create 1x1 solid sprite for actor
	        // Place on actor plane in initial actor position
	        PS.spriteShow(_id_sprite, 0);
	        _id_sprite = PS.spriteSolid(1, 1);
	        PS.spriteSolidColor(_id_sprite, _COLOR_ACTOR);
	        PS.spritePlane(_id_sprite, _PLANE_ACTOR);
	        PS.spriteMove(_id_sprite, _actor_x, _actor_y);

	        // Create pathmap from our imageMap
	        // for use by pathfinder

	        _id_path = PS.pathMap(_map);

	        // Start the timer function that moves the actor
	        // Run at 10 frames/sec (every 6 ticks)

	        _path = null; // start with no path
	        _step = 0;
	        //PS.timerStop(_id_timer);
            
	        _id_timer = PS.timerStart(6, _tick);
	    }
	};

    //add gold to the game
	function goldAdd(x, y) {
	    var newspot = (y * _HEIGHT) + x;
	    _map.data[newspot] = _GOLD;
	    PS.color(x, y, _COLOR_GOLD);
	    PS.radius(x, y, 50);
	    _gold_count++;
	}

    //timer for exit open animation
	var timer = null;
	var exitOpen = function () {
	    _exit_width--;
	    PS.border(_exit_x, _exit_y, _exit_width);
	    PS.color(_exit_x, _exit_y, PS.COLOR_BLUE);
	}

	var _tick = function () {
		var p, nx, ny, ptr, val;
		//PS.gridColor(PS.COLOR_YELLOW);
		if ( !_path ) { // path invalid (null)?
			return; // just exit
		}

		// Get next point on path

		p = _path[ _step ];
		nx = p[ 0 ]; // next x-pos
		ny = p[ 1 ]; // next y-pos

		// If actor already at next pos,
		// path is exhausted, so nuke it

		if ( ( _actor_x === nx ) && ( _actor_y === ny ) ) {
			_path = null;
			return;
		}

		// Move sprite to next position
		var funk = function () {
		    PS.fade(fadeStack.shift(), fadeStack.shift(), 0);
		}

		PS.spriteMove(_id_sprite, nx, ny);
		PS.color(_actor_x, _actor_y, PS.COLOR_GREEN);
		fadeStack.push(_actor_x);
		fadeStack.push(_actor_y);
		PS.fade(_actor_x, _actor_y, 15, {onEnd : funk});
		PS.color(_actor_x, _actor_y, PS.COLOR_GRAY);
		_actor_x = nx; // update actor's xpos
		_actor_y = ny; // and ypos
		PS.audioPlay(_SFX_FLOOR);

		// If actor has reached a gold piece, take it

		ptr = ( _actor_y * _HEIGHT ) + _actor_x; // pointer to map data under actor
		val = _map.data[ptr]; // get map data

		var funk2 = function () {
		    PS.gridFade(0);
		}



		if ( val === _GOLD ) {
			_map.data[ ptr ] = _FLOOR; // change gold to floor in map.data
			PS.gridPlane( _PLANE_FLOOR ); // switch to floor plane
			PS.color( _actor_x, _actor_y, _COLOR_FLOOR ); // change visible floor color
			PS.radius(_actor_x, _actor_y, 0);
			// If last gold has been collected, activate the exit

			_gold_found += 1; // update gold count
            
			if (_gold_found == 1) {
			    goldAdd(13, 4);
			    goldAdd(1, 16);
			}
			if (_gold_found == 3) {
			    goldAdd(6, 1);
			    goldAdd(5, 10);
			}
			if (_gold_found == 5){
			    goldAdd(13, 15);
			    goldAdd(12, 1);
			}
			if (_gold_found == 7) {
			    goldAdd(19, 3);
			    goldAdd(19, 13);
			}
            
			if ( _gold_found >= _gold_count ) {
				_exit_ready = true;
				PS.color( _exit_x, _exit_y, _COLOR_EXIT ); // show the exit
				PS.glyphColor( _exit_x, _exit_y, PS.COLOR_WHITE ); // mark with white X
				PS.glyph( _exit_x, _exit_y, "X" );
				PS.statusText( "Found " + _gold_found + " gold! Exit open!" );
				PS.audioPlay(_SFX_OPEN);
				PS.borderColor(_exit_x, _exit_y, _COLOR_FLOOR);
				PS.border(_exit_x, _exit_y, _exit_width);
				timer = PS.timerStart(5, exitOpen);
			}

			// Otherwise just update score

			else {
				PS.statusText( "Found " + _gold_found + " gold!" );
				PS.audioPlay(_SFX_GOLD);
				PS.gridColor(0xb0b000);
				PS.gridFade(60, { onEnd: funk2 });
				PS.gridColor(_COLOR_BG);
			}
		}

		// If exit is ready and actor has reached it, end game

		else if ( _exit_ready && ( _actor_x === _exit_x ) && ( _actor_y === _exit_y ) ) {
		    PS.timerStop(_id_timer); // stop movement timer
		    PS.timerStop(timer);
			PS.statusText( "You escaped with " + _gold_found + " gold! Space to Restart" );
			PS.audioPlay( _SFX_WIN );
			_won = true;
            
			return;
		}

		_step += 1; // point to next step

		// If no more steps, nuke path

		if ( _step >= _path.length ) {
			_path = null;
		}
	};

	// Public functions are exposed in the global G object, which is defined here
	// and returned as the value of the IIFE.
	// Only two functions need to be exposed; all other constants, variables and code are encapsulated.
	// So safe. So elegant.

	return {
		// Initialize the game
		// Called once at startup

		init : function () {
			var x, y, val, color;

			// Establish grid/map dimensions
			// This should always be done FIRST, before any other initialization!

			_map.width = _WIDTH;
			_map.height = _HEIGHT;

			PS.gridSize( _WIDTH, _HEIGHT );
			
			// Check for illegal actor/exit locations

			val = _map.data[ ( _actor_y * _HEIGHT ) + _actor_x ]; // get map data under actor
			if ( val !== _FLOOR ) {
				PS.debug( "ERROR: Actor not on empty floor!" );
				PS.audioPlay( _SFX_ERROR );
				return;
			}

			val = _map.data[ ( _exit_y * _HEIGHT ) + _exit_x ]; // get map data at exit position
			if ( val !== _FLOOR ) {
				PS.debug( "ERROR: Exit not on empty floor!" );
				PS.audioPlay( _SFX_ERROR );
				return;
			}

			PS.gridColor( _COLOR_BG ); // grid background color
			PS.border( PS.ALL, PS.ALL, 0 ); // no bead borders
			PS.statusColor( PS.COLOR_WHITE );
			PS.statusText( "Click/touch to move" );
			PS.bgAlpha(PS.ALL, PS.ALL, 255);
			PS.bgColor(PS.ALL, PS.ALL, _COLOR_FLOOR);
			// Use the map.data array to draw the maze
			// This also counts the number of gold pieces that have been placed

			_gold_count = _gold_found = 0;
			for ( y = 0; y < _HEIGHT; y += 1 ) {
				for ( x = 0; x < _WIDTH; x += 1 ) {
					val = _map.data[ ( y * _HEIGHT ) + x ]; // get data
					if ( val === _WALL ) {
						color = _COLOR_WALL;
					}
					else if ( val === _FLOOR ) {
						color = _COLOR_FLOOR;
					}
					else if (val === _GOLD) {
					    PS.radius(x, y, 50);
					    //PS.bgColor(x, y, _COLOR_FLOOR);
						color = _COLOR_GOLD;
						_gold_count += 1; // add to count
					}
					PS.color( x, y, color );
				}
			}

			// Create 1x1 solid sprite for actor
			// Place on actor plane in initial actor position

			_id_sprite = PS.spriteSolid( 1, 1 );
			PS.spriteSolidColor( _id_sprite, _COLOR_ACTOR );
			PS.spritePlane( _id_sprite, _PLANE_ACTOR );
			PS.spriteMove( _id_sprite, _actor_x, _actor_y );

			// Create pathmap from our imageMap
			// for use by pathfinder

			_id_path = PS.pathMap( _map );

			// Start the timer function that moves the actor
			// Run at 10 frames/sec (every 6 ticks)

			_path = null; // start with no path
			_step = 0;
			_id_timer = PS.timerStart( 6, _tick );
		},

		// move( x, y )
		// Set up new path for the actor to follow

		move : function ( x, y ) {
			var line;

			// Do nothing if game over

			if ( _won ) {
				return;
			}

			// Use pathfinder to calculate a line from current actor position
			// to touched position

			line = PS.pathFind( _id_path, _actor_x, _actor_y, x, y );

			// If line is not empty, it's valid,
			// so make it the new path
			// Otherwise hoot at the player

			if ( line.length > 0 ) {
				_path = line;
				_step = 0; // start at beginning
				PS.audioPlay( _SFX_FLOOR );
			}
			else {
				PS.audioPlay( _SFX_WALL );
			}
		}
	};
} () ); // end of IIFE

// G's two methods are assigned directly to Perlenspiel's event handlers.
// Note that there are no parentheses used in these assignments.
// Including them would CALL the functions and assign their return values to the event handlers.
// That's not what we want! We want the functions THEMSELVES to be assigned to the event handlers.

PS.init = G.init;
PS.touch = G.move;

