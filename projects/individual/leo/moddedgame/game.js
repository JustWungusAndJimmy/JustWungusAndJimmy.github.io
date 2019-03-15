// game.js for Perlenspiel 3.3.x
// Leo Bunyea
// Team Just Wungus and Jimmy
// Mod 1: Changed colors of game elements, including wall, floor, actor, exit and other objects.
// Mod 2: Changed size of the grid.
// Mod 3: Changed the layout of the grid.
// Mod 4: Added "person bead"
// Mod 5: Changed initial status line text.
// Mod 6: Added a grid shadow.
// Mod 7: Changed exit glyph.
// Mod 8: Changed end game status lines.
// Mod 9: Changed status line for picking up "gold" (changed to food).
// Mod 10: Changed status line for interacting with other people in the store.
// Mod 11: Changed status line text color.
// Mod 11: Changed SFX for most actions (didn't change the "click" SFX).
// Mod 12: Added background music.
// Mod 13: Faded out grid at the end of the game.

// CREDITS:
// Background music made by Freesound.org user Jay_You https://freesound.org/people/Jay_You/sounds/460432/
// "Chaching" sound effect made by Freesound.org user creek23 https://freesound.org/people/creek23/sounds/75235/
// "Hm" sound effect made by Freesound.org user esperar https://freesound.org/people/esperar/sounds/170778/


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

	var _WIDTH = 16; // grid width
	var _HEIGHT = 16; // grid height

	var _PLANE_FLOOR = 0; // z-plane of floor
	var _PLANE_ACTOR = 1; // z-plane of actor

	var _COLOR_BG = [210,212,220]; // background color - pale blue
	var _COLOR_WALL = [175,175,175]; // wall color - dark grey
	var _COLOR_FLOOR = [229,230,235]; // floor color - light grey
	var _COLOR_ACTOR = [248,248,250]; // actor color - white
	var _COLOR_FOOD = [203,218,219]; // food color - pale teal
	var _COLOR_PERSON = [227,201,201]; // person color - beige
	var _COLOR_EXIT = [238,240,179]; // exit color - pale yellow
	var _COLOR_SHADOW = [99,99,99]; // grid shadow color - darker grey

	var _SFX_FLOOR = "fx_click"; // touch floor sound
	var _SFX_WALL = "fx_hoot"; // touch wall sound
	var _SFX_FOOD = "chaching"; // take food sound
	var _SFX_PERSON = "hm"; // interact with person sound
	var _SFX_OPEN = "fx_boop"; // open exit sound
	var _SFX_WIN = "fx_bloink"; // win sound
	var _SFX_ERROR = "fx_uhoh"; // error sound
	var _SFX_MUSIC = "background"

	var _WALL = 0; // wall
	var _FLOOR = 2; //floor
	var _FOOD = 3; //floor + food
	var _PERSON = 4; //person

	// Variables

	var _id_sprite; // actor sprite id
	var _id_path; // pathmap id for pathfinder
	var _id_timer; // timer id
	//Strings to be printed to the status line when the actor picks up food
	var _food_prices = ["Bananas - $0.59 per lb",
						"Chocolate Graham Crackers - $2.99",
						"Tomato Sauce - $1.50",
						"Chicken Breast - $8.99. Time to check out."];
	var _food_price_index = 0; //To keep track of which line should be played next
	//Strings to be printed to the status line when the actor interacts with a person
	var _person_dialogue = ["Let's see... What's on sale?",
							"I should have gone to Market Basket.",
							"$5.99 for a cup of soup?!",
							"Harold, get the coupons from the car.",
							"What's the expiration date on this?",
							"Who actually likes Raisin Bran?"];
	var _person_dialogue_index = 0; //To keep track of which line should be played next
	var _food_count; // initial number of gold pieces in map
	var _food_found; // gold pieces collected
	var _won = false; // true on win

	// This handmade imageMap is used for map drawing and pathfinder logic
	// All properties MUST be present!
	// The map.data array controls the layout of the maze,
	// the location of the gold pieces and exit
	// 0 = wall, 1 = aisle  2 = floor, 3 = floor + food, 4 = floor + person
	// To remove food, replace a 3 with a 2
	// To add food piece, replace a 2 with a 3

	var _map = {
		width: 0, // set by G.init()
		height: 0, // ditto
		pixelSize: 1, // must be present and = 1!
		data: [
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
			0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
			0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0,
			0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 3, 2, 0,
			0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0,
			0, 2, 3, 0, 0, 2, 2, 0, 0, 2, 4, 0, 0, 2, 2, 0,
			0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0,
			0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0,
			0, 2, 2, 0, 0, 2, 2, 0, 0, 3, 2, 0, 0, 2, 2, 0,
			0, 2, 2, 0, 0, 3, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0,
			0, 4, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0,
			0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 2, 0,
			0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 0,
			0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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

	var _exit_x = 14; // x-pos of exit
	var _exit_y = 14; // y-pos of exit
	var _exit_ready = false; // true when exit is opened

	// Timer function, called every 1/10th sec
	// This moves the actor along paths

	var _path; // path to follow, null if none
	var _step; // current step on path

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
		_actor_x = nx; // update actor's xpos
		_actor_y = ny; // and ypos

		// If actor has reached a food, take it

		ptr = ( _actor_y * _HEIGHT ) + _actor_x; // pointer to map data under actor
		val = _map.data[ ptr ]; // get map data
		if ( val === _FOOD ) {
			_map.data[ ptr ] = _FLOOR; // change gold to floor in map.data
			PS.gridPlane( _PLANE_FLOOR ); // switch to floor plane
			PS.color( _actor_x, _actor_y, _COLOR_FLOOR ); // change visible floor color

			// If last gold has been collected, activate the exit

			_food_found += 1; // update gold count
			if ( _food_found >= _food_count ) {
				_exit_ready = true;
				PS.color( _exit_x, _exit_y, _COLOR_EXIT ); // show the exit
				PS.glyphColor( _exit_x, _exit_y, PS.COLOR_WHITE ); // mark with white X
				PS.glyph( _exit_x, _exit_y, "$" );
				PS.statusText(_food_prices[_food_price_index]);
				PS.audioPlay(_SFX_FOOD, {
                    path : "music/",
                    fileTypes : ["wav"]
                });
				PS.audioPlay( _SFX_OPEN);
			}

			// Otherwise just update score

			else {
				PS.statusText(_food_prices[_food_price_index]);
				_food_price_index += 1;
				PS.audioPlay( _SFX_FOOD, {
					path : "music/",
					fileTypes : ["wav"]
				});
			}
		}

		//If actor interacts with a person
		else if (val == _PERSON) {
			PS.statusText(_person_dialogue[_person_dialogue_index]);
			_person_dialogue_index += 1;
			PS.audioPlay (_SFX_PERSON, {
				path : "music/",
				fileTypes : ["wav"]
			} );
			//If the index is outside of the array, reset it to the beginning
			if (_person_dialogue_index === _person_dialogue.length) {
				_person_dialogue_index = 0;
			}
		}

		// If exit is ready and actor has reached it, end game

		else if ( _exit_ready && ( _actor_x === _exit_x ) && ( _actor_y === _exit_y ) ) {
			PS.timerStop( _id_timer ); // stop movement timer
			PS.statusText( "I'm sorry. Your card was declined." );
			PS.audioPlay( _SFX_WIN );
			_won = true;
			//Fade out entire grid
			PS.fade (PS.ALL, PS.ALL, 120);
			PS.color(PS.ALL, PS.ALL, _COLOR_SHADOW);
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
			PS.gridShadow(true, _COLOR_SHADOW);
			PS.statusColor( _COLOR_SHADOW ); // Have the status text color match the shadow color
			PS.statusText( "Click to go grocery shopping." );

			//Play background music
			PS.audioPlay(_SFX_MUSIC, {
				path : "music/",
				fileTypes : ["wav"],
				loop : true
			});

			// Use the map.data array to draw the maze
			// This also counts the number of gold pieces that have been placed

			_food_count = _food_found = 0;
			for ( y = 0; y < _HEIGHT; y += 1 ) {
				for ( x = 0; x < _WIDTH; x += 1 ) {
					val = _map.data[ ( y * _HEIGHT ) + x ]; // get data
					if ( val === _WALL ) {
						color = _COLOR_WALL;
					}
					else if ( val === _FLOOR ) {
						color = _COLOR_FLOOR;
					}
					else if ( val === _FOOD ) {
						color = _COLOR_FOOD;
						_food_count += 1; // add to count
					}
					else if (val === _PERSON){
						color = _COLOR_PERSON;
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
