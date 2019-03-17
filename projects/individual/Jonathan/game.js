// Jonathan Shiery
// Team None of is are coders
// Mod 1: Added a tracker for the number of clicks.
// Mod 2: Changed the sounds of picking up gold to piano notes that progressively get higher the more gold you collect.
// Mod 3: Added a fading trail to the movable bead.
// Mod 4: Changed the layout of some of the beads.
// Mod 5: Made the goal glyph disappear when touched.
// Mod 6: Changed the color of the player bead.
// Mod 7: Added a timer to tell the player to tell the player to play the game again when they beat it.
// Mod 8: Screen fades to white when game is beaten.
// Mod 9: When the last gold is collected, the game continuously plays a bongo note until the goal is reached.
// Mod 10: Added a border to the goal bead.
// Mod 11: Change the color of the status bar to yellow when collecting gold, and to white for the other text messages.



// game.js for Perlenspiel 3.3.x
// The following comment lines are for JSHint. Don't remove them!

/* jshint browser : true, devel : true, esversion : 5, freeze : true */
/* globals PS : true */

// This immediately-invoked function expression (IIFE) encapsulates all game functionality.
// It is called as this file is loaded, and initializes the G variable.
// The object established in G by the IIFE will contain all public constants, variables and functions.

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
	var _COLOR_ACTOR = (0x19FF98); // actor color
	var _COLOR_GOLD = PS.COLOR_YELLOW; // gold color
	var _COLOR_EXIT = PS.COLOR_BLUE; // exit color

	var _SFX_FLOOR = "fx_click"; // touch floor sound
	var _SFX_WALL = "fx_hoot"; // touch wall sound
	var _SFX_GOLD1 = "piano_c5"; // gold piece 1 collected sound
	var _SFX_GOLD2 = "piano_d5"; // gold piece 2 collected sound
	var _SFX_GOLD3 = "piano_e5"; // gold piece 3 collected sound
	var _SFX_GOLD4 = "piano_f5"; // gold piece 4 collected sound
	var _SFX_GOLD5 = "piano_g5"; // gold piece 5 collected sound
	var _SFX_GOLD6 = "piano_a5"; // gold piece 6 collected sound
	var _SFX_GOLD7 = "piano_b5"; // gold piece 7 collected sound
	var _SFX_GOLD8 = "piano_c6"; // gold piece 8 collected sound
	var _SFX_GOLD9 = "piano_d6"; // gold piece 9 collected sound


	var _SFX_OPEN = "fx_powerup8"; // open exit sound
	var _SFX_WIN = "fx_tada"; // win sound
	var _SFX_ERROR = "fx_uhoh"; // error sound

	var _WALL = 0; // wall
	var _FLOOR = 1; // floor
	var _GOLD = 2; // floor + gold
	var _CLICKS = 0; // number of clicks

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

	var _map = {
		width: 0, // set by G.init()
		height: 0, // ditto
		pixelSize: 1, // must be present and = 1!
		data: [
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 1, 1, 1, 1, 1, 2, 1, 0, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 0,
			0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0,
			0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0,
			0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0,
			0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 2, 1, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
			0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
			0, 1, 1, 1, 1, 2, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0,
			0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
			0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
			0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 2, 0,
			0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0,
			0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0,
			0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
			0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
			0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
		]
	};

	// These two variables control the initial location of the actor
	// This location MUST correspond to a floor location (1) in the maza.data array
	// or a startup error will occur!

	var _actor_x = 1; // initial x-pos of actor sprite
	var _actor_y = 1; // initial y-pos of actor sprite

	// These two variables control the location of the exit
	// This location MUST correspond to a floor location (1) in the maza.data array
	// or a startup error will occur!

	var _exit_x = 16; // x-pos of exit
	var _exit_y = 18; // y-pos of exit
	var _exit_ready = false; // true when exit is opened

	// Timer function, called every 1/10th sec
	// This moves the actor along paths

	var _path; // path to follow, null if none
	var _step; // current step on path

	// After the game is beaten, tells the player how to play again.
	var _endTimer = function () {
		PS.statusText( "To play again, press the page refresh button." );
	};

	// Plays a sound when the exit is open, and continues to play that sound.
	var _goalOpen = function () {
		PS.audioPlay("perc_bongo_low");
	};

	var _startGoalOpenTimer;


	var _tick = function () {
		var p, nx, ny, ptr, val;

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

		PS.spriteMove( _id_sprite, nx, ny );
		PS.fade ( nx, ny, 10);
		_actor_x = nx; // update actor's xpos
		_actor_y = ny; // and ypos


		// If actor has reached a gold piece, take it

		ptr = ( _actor_y * _HEIGHT ) + _actor_x; // pointer to map data under actor
		val = _map.data[ ptr ]; // get map data
		if ( val === _GOLD ) {
			_map.data[ ptr ] = _FLOOR; // change gold to floor in map.data
			PS.gridPlane( _PLANE_FLOOR ); // switch to floor plane
			PS.color( _actor_x, _actor_y, _COLOR_FLOOR ); // change visible floor color

			// If last gold has been collected, activate the exit

			_gold_found += 1; // update gold count
			if ( _gold_found >= _gold_count ) {
				_exit_ready = true;
				PS.color( _exit_x, _exit_y, _COLOR_EXIT ); // show the exit
				PS.glyphColor( _exit_x, _exit_y, PS.COLOR_WHITE ); // mark with white X
				PS.border ( _exit_x, _exit_y, 2 )
				PS.borderColor ( _exit_x, _exit_y, 0x4CE3FF );
				PS.glyph( _exit_x, _exit_y, "X" );
				PS.statusText( "Found " + _gold_found + " gold! Exit open!" );
				PS.statusColor ( PS.COLOR_YELLOW );
				PS.audioPlay( _SFX_OPEN );
				_startGoalOpenTimer = PS.timerStart(120, _goalOpen);

			}

			// Otherwise just update score

			else {
				PS.statusText( "Found " + _gold_found + " gold!" );
				PS.statusColor ( PS.COLOR_YELLOW );

				// Play note according to gold amount
				if (_gold_found == 1) { PS.audioPlay(_SFX_GOLD1)};
				if (_gold_found == 2) { PS.audioPlay(_SFX_GOLD2)};
				if (_gold_found == 3) { PS.audioPlay(_SFX_GOLD3)};
				if (_gold_found == 4) { PS.audioPlay(_SFX_GOLD4)};
				if (_gold_found == 5) { PS.audioPlay(_SFX_GOLD5)};
				if (_gold_found == 6) { PS.audioPlay(_SFX_GOLD6)};
				if (_gold_found == 7) { PS.audioPlay(_SFX_GOLD7)};
				if (_gold_found == 8) { PS.audioPlay(_SFX_GOLD8)};
				if (_gold_found == 9) { PS.audioPlay(_SFX_GOLD9)};

			}
		}

		// If exit is ready and actor has reached it, end game

		else if ( _exit_ready && ( _actor_x === _exit_x ) && ( _actor_y === _exit_y ) ) {
			PS.timerStop( _id_timer ); // stop movement timer
			PS.statusColor ( PS.COLOR_WHITE );
			PS.statusText( "You escaped with " + _gold_found + " gold!" );
			PS.glyph( _exit_x, _exit_y, "" );
			PS.border( _exit_x, _exit_y, 0 );
			PS.audioPlay( _SFX_WIN );
			var endLine = PS.timerStart( 300, _endTimer );
			PS.gridFade( 60 );
			PS.fade( PS.ALL, PS.ALL, 60 );
			PS.timerStop( _startGoalOpenTimer );
			_won = true;
			PS.color( PS.ALL, PS.ALL, PS.COLOR_WHITE);
			PS.spriteSolidColor( _id_sprite, PS.COLOR_WHITE );

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
					else if ( val === _GOLD ) {
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

			// Keeps track of number of clicks, as long as game is not beaten
			if (_won == false) {
				_CLICKS += 1;
				PS.statusText("Number of clicks: " + _CLICKS);
				PS.statusColor ( PS.COLOR_WHITE );
			}

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
				PS.fade ( PS.ALL, PS.ALL, 0 );
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
