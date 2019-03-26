// game.js for Perlenspiel 3.3.x
// The following comment lines are for JSHint. Don't remove them!

/* jshint browser : true, devel : true, esversion : 5, freeze : true */
/* globals PS : true */

// The G variable encapsulates all app constants, variables and functions, public and private.
// It is initialized on file load with an immediately-invoked function expression (IIFE).

var G = ( function () {
	"use strict";

    //MODIFY THIS VAR TO CHANGE WHEN YOU ARE SUPPOSED TO CLICK
    //false means you only should click on the first beat of the measure, when it plays the hoot sound effect
    //true means you can click on any beat, whether it plays the hoot or the click sound effect
	var anyBeat = true;


	// Private constants are all upper-case, with underscore prefix

	var _PLANE_FLOOR = 0; // z-plane of floor
	var _PLANE_ACTOR = 1; // z-plane of actor

	var _COLOR_BG = [0, 0, 0]; // background color - black
	var _COLOR_WALL = [255, 3, 188]; // wall color - neon pink
	var _COLOR_FLOOR = [0, 0, 0]; // floor color - black
	var _COLOR_GOLD = [217, 255, 3]; // gold color - neon yellow
	var _COLOR_ACTOR = [74, 255, 3]; // actor color - neon green
	var _COLOR_EXIT = [74, 255, 3]; // exit color - neon green
	var _COLOR_SHRINK = [0, 255, 255];

	var _SOUND_FLOOR = "fx_click"; // touch floor sound
	var _SOUND_WALL = "fx_hoot"; // touch wall sound
	var _SOUND_GOLD = "fx_coin1"; // take coin sound
	var _SOUND_OPEN = "fx_powerup8"; // open exit sound
	var _SOUND_WIN = "fx_tada"; // win sound
	var _SOUND_ERROR = "fx_uhoh"; // error sound

	var _SFX_DRUM = "perc_drum_tom3";
	var _SFX_HI = "perc_hihat_closed";

	var _MAP_WALL = 0; // wall
	var _MAP_FLOOR = 1; // floor
	var _MAP_ACTOR = 2; // floor + actor
	var _MAP_EXIT = 3; // floor + exit
	//This is so that we can establish a collection order without hard coding
    var _MAP_GOLD1 = 4; // floor + gold
    var _MAP_GOLD2 = 5; // floor + gold
    var _MAP_GOLD3 = 6; // floor + gold
    var _MAP_GOLD4 = 7; // floor + gold
    var _MAP_GOLD5 = 8; // floor + gold
    var _MAP_GOLD6 = 9; // floor + gold
    var _MAP_GOLD7 = 10; // floor + gold
    var _MAP_GOLD8 = 11; // floor + gold
    var _MAP_GOLD9 = 12; // floor + gold
    var _MAP_GOLD10 = 13; // floor + gold

	var _GOLD_MAX = 10; // maximum gold

	// This imageMap is used for map drawing and pathfinder logic
	// All properties MUST be present!
	// The map.data array controls the layout of the maze,
	// the location of the gold pieces, the actor and the exit
	// 0 = wall, 1 = floor, 2 = floor + gold, 3 = floor + actor, 4 = floor + exit
	// To move a gold piece, swap a 2 with a 1
	// To move the actor's initial position, swap the 3 and a 1
	// To move the exit's position, swap the 4 and a 1
	// You cannot have more than one actor/exit, or more than _GOLD_MAX (10) gold pieces!

	var _MAP = {
		width : 23, height : 23, pixelSize : 1,
		data : [
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 5, 0, 1, 1, 1, 1, 1, 1, 1, 0,
			0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0,
			0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0,
			0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0,
			0, 1, 1, 1, 1, 1, 0, 6, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0,
			0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0,
			0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 0,
			0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
			0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0,
			0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0,
			0, 1, 1, 1, 0, 1, 1, 1, 1, 10, 1, 1, 0, 1, 1, 11, 1, 1, 0, 1, 1, 1, 0,
			0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
			0, 1, 1, 7, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0,
			0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0,
			0, 1, 0, 1, 0, 1, 1, 9, 0, 1, 1, 1, 1, 12, 0, 1, 1, 1, 0, 1, 1, 1, 0,
			0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
			0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 13, 1, 1, 0,
			0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0,
			0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0,
			0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0,
			0, 1, 1, 1, 1, 8, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 3, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
		]
	};

	// Private constants are all lower-case, with underscore prefix
	// Many JS programmers prefer camelCase for variables, but I think underscores are more readable
	// The compiler doesn't care. Use whatever works for you ... or what your employer demands.

	var _id_sprite; // actor sprite id
	var _id_path; // pathmap id for pathfinder
	var _id_timer; // timer id

	var _gold_count = 0; // initial number of gold pieces in map
	var _gold_found = 0; // gold pieces collected
	var _won = false; // true on win

	// These two variables control the initial location of the actor

	var _actor_x; // initial x-pos of actor sprite
	var _actor_y; // initial y-pos of actor sprite

	// These two variables control the location of the exit

	var _exit_x; // x-pos of exit
	var _exit_y; // y-pos of exit

	var _exit_ready = false; // true when exit is opened

	// Timer function, called every 1/10th sec
	// This moves the actor along paths

	var _path; // path to follow, null if none
	var _step; // current step on path

    //Everything needed to keep track of time
    //clicktimes is array that stores what frame number the player clicked the board
	var clickTimes = [];
	var frameCount = 0;
	var frameTimer = null;
	var beatCount = 0;
	var frameTick = function () {
	    frameCount++;

	    if (beatCount == 120) beatCount = 0;

	    //if (beatCount == 0) PS.audioPlay(_SOUND_OPEN);
	    //if (beatCount % 30 == 0) PS.audioPlay(_SOUND_FLOOR);

	    if (beatCount == 0) 
	        PS.audioPlay(_SFX_DRUM);

	    if (beatCount == 15)
	        PS.audioPlay(_SFX_DRUM);

	    if (beatCount == 30)
	        PS.audioPlay(_SFX_DRUM);

	    if (beatCount == 39)
	        PS.audioPlay(_SFX_DRUM);

	    if (beatCount == 60)
	        PS.audioPlay(_SFX_DRUM);


	    if (beatCount == 85)
	        PS.audioPlay(_SFX_DRUM);

	    if (beatCount == 100)
	        PS.audioPlay(_SFX_DRUM);


	    if ((beatCount % 30) == 15)
	        PS.audioPlay(_SFX_HI);
	    beatCount++;
	}

	var bgFade = function () {
	    PS.gridFade(0);
	}

	//Everything needed to keep track of gold collection order & gold shrink
	var x_gold_pos = [];
	var y_gold_pos = [];
	var cur_gold = 0;
	var cur_scale = 100;
	var shrinkTimer = null;
	var shrinkTick = function () {
	    //Check to see if this bead is properly scaled down

		if (cur_scale == 50) {
			cur_gold++;
			cur_scale = 100;
		}

		var spot = (y_gold_pos[cur_gold] * _MAP.height) + x_gold_pos[cur_gold];
		var mapSpot = _MAP.data[spot];
		if (mapSpot < 4) {
		    cur_gold++;
		    cur_scale = 100;
		}
        //Check to see if we're out of the gold range
        if (cur_gold == 10) {
            PS.timerStop(shrinkTimer);
            return;
        }
        
        PS.scale(x_gold_pos[cur_gold], y_gold_pos[cur_gold], cur_scale)
        PS.color(x_gold_pos[cur_gold], y_gold_pos[cur_gold], _COLOR_SHRINK);
		cur_scale--;
	}


	//Everythnig needed to keep track of gold collection order
	var goldOrder = [];

	//Everything needed to keep track of total game time
	var secondsPassed = 0;
	var gameTimer = null;
	var gameTick = function () {
		secondsPassed++;
	}


	// This timer function moves the actor

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

		// If actor has reached a gold piece, take it

		ptr = ( _actor_y * _MAP.height ) + _actor_x; // pointer to map data under actor
		val = _MAP.data[ ptr ]; // get map data
		if ( val === _MAP_GOLD1 || val === _MAP_GOLD2 || val === _MAP_GOLD3 || val === _MAP_GOLD4 || val === _MAP_GOLD5 ||  val === _MAP_GOLD6 || val === _MAP_GOLD7 || val === _MAP_GOLD8 || val === _MAP_GOLD9 || val === _MAP_GOLD10) {
			PS.dbEvent("SampleGameJWJ", "GoldCollected", "("+_actor_x+"-"+_actor_y+")");
			goldOrder.push("("+_actor_x+","+_actor_y+")"); //Don't think we need this
			_MAP.data[ ptr ] = _MAP_FLOOR; // change gold to floor in map.data
			PS.gridPlane( _PLANE_FLOOR ); // switch to floor plane
			PS.color(_actor_x, _actor_y, _COLOR_FLOOR); // change visible floor color

            /*
			if (_actor_x == x_gold_pos[cur_gold] && _actor_y == y_gold_pos[cur_gold]) {
			    cur_gold++;
			    cur_scale = 100;
			}
            */
			PS.radius(_actor_x, _actor_y, 0); //reset radius
			PS.scale(_actor_x, _actor_y, 100); //reset scale

			// If last gold has been collected, activate the exit

			_gold_found += 1; // update gold count
			if ( _gold_found >= _gold_count ) {
				_exit_ready = true;
				PS.color( _exit_x, _exit_y, _COLOR_EXIT ); // show the exit
				PS.glyphColor( _exit_x, _exit_y, PS.COLOR_WHITE ); // mark with white X
				PS.glyph( _exit_x, _exit_y, "X" );
				PS.statusText( "Found " + _gold_found + " gold! Exit open!" );
				PS.audioPlay( _SOUND_OPEN );
			}

			// Otherwise just update score

			else {
				PS.statusText( "Found " + _gold_found + " gold!" );
				PS.audioPlay( _SOUND_GOLD );
			}
		}

		// If exit is ready and actor has reached it, end game

		else if ( _exit_ready && ( _actor_x === _exit_x ) && ( _actor_y === _exit_y ) ) {
			PS.timerStop( _id_timer ); // stop movement timer
			PS.statusText( "You escaped with " + _gold_found + " gold!" );
			PS.audioPlay( _SOUND_WIN );
            //report data
            PS.timerStop(gameTimer);
            PS.dbEvent("SampleGameJWJ","CompletionTime", secondsPassed);
            PS.dbSend("SampleGameJWJ", "jacattelona");
			_won = true;
			return;
		}

		_step += 1; // point to next step

		// If no more steps, nuke path

		if ( _step >= _path.length ) {
			_path = null;
		}
	};

	// Public functions are exposed in the global G object, which is returned here.
	// Only two functions need to be exposed; everything else is encapsulated!
	// So safe. So elegant.

	return {
		// Initialize the game
		// Called once at startup

		init : function () {
			var x, y, val;

			// Establish grid size
			// This should always be done FIRST, before any other initialization!

			PS.gridSize( _MAP.width, _MAP.height );
			PS.gridColor( _COLOR_BG ); // grid background color
			PS.border( PS.ALL, PS.ALL, 0 ); // no bead borders

			// Locate positions of actor and exit, count gold pieces, draw map

			_gold_count = 0;
			_actor_x = _exit_x = -1; // mark as not found
			for ( y = 0; y < _MAP.height; y += 1 ) {
				for ( x = 0; x < _MAP.width; x += 1 ) {
					val = _MAP.data[ ( y * _MAP.height ) + x ]; // get map data
					if ( val === _MAP_WALL ) {
						PS.color( x, y, _COLOR_WALL );
					}
					else if ( val === _MAP_FLOOR ) {
						PS.color( x, y, _COLOR_FLOOR );
					}
                    else if ( val === _MAP_GOLD1 ) {
                        _gold_count += 1;
                        if ( _gold_count > _GOLD_MAX ) {
                            PS.debug( "WARNING: More than " + _GOLD_MAX + " gold!\n" );
                            PS.audioPlay( _SOUND_ERROR );
                            return;
                        }
                        PS.color( x, y, _COLOR_GOLD );
                        PS.radius(x, y, 50);
                        x_gold_pos[0] = x;
                        y_gold_pos[0] = y;
                    }
                    else if ( val === _MAP_GOLD2 ) {
                        _gold_count += 1;
                        if ( _gold_count > _GOLD_MAX ) {
                            PS.debug( "WARNING: More than " + _GOLD_MAX + " gold!\n" );
                            PS.audioPlay( _SOUND_ERROR );
                            return;
                        }
                        PS.color( x, y, _COLOR_GOLD );
                        PS.radius(x, y, 50);
                        x_gold_pos[1] = x;
                        y_gold_pos[1] = y;
                    }
                    else if ( val === _MAP_GOLD3 ) {
                        _gold_count += 1;
                        if ( _gold_count > _GOLD_MAX ) {
                            PS.debug( "WARNING: More than " + _GOLD_MAX + " gold!\n" );
                            PS.audioPlay( _SOUND_ERROR );
                            return;
                        }
                        PS.color( x, y, _COLOR_GOLD );
                        PS.radius(x, y, 50);
                        x_gold_pos[2] = x;
                        y_gold_pos[2] = y;
                    }
                    else if ( val === _MAP_GOLD4 ) {
                        _gold_count += 1;
                        if ( _gold_count > _GOLD_MAX ) {
                            PS.debug( "WARNING: More than " + _GOLD_MAX + " gold!\n" );
                            PS.audioPlay( _SOUND_ERROR );
                            return;
                        }
                        PS.color( x, y, _COLOR_GOLD );
                        PS.radius(x, y, 50);
                        x_gold_pos[3] = x;
                        y_gold_pos[3] = y;
                    }
                    else if ( val === _MAP_GOLD5 ) {
                        _gold_count += 1;
                        if ( _gold_count > _GOLD_MAX ) {
                            PS.debug( "WARNING: More than " + _GOLD_MAX + " gold!\n" );
                            PS.audioPlay( _SOUND_ERROR );
                            return;
                        }
                        PS.color( x, y, _COLOR_GOLD );
                        PS.radius(x, y, 50);
                        x_gold_pos[4] = x;
                        y_gold_pos[4] = y;
                    }
                    else if ( val === _MAP_GOLD6 ) {
                        _gold_count += 1;
                        if ( _gold_count > _GOLD_MAX ) {
                            PS.debug( "WARNING: More than " + _GOLD_MAX + " gold!\n" );
                            PS.audioPlay( _SOUND_ERROR );
                            return;
                        }
                        PS.color( x, y, _COLOR_GOLD );
                        PS.radius(x, y, 50);
                        x_gold_pos[5] = x;
                        y_gold_pos[5] = y;
                    }
                    else if ( val === _MAP_GOLD7 ) {
                        _gold_count += 1;
                        if ( _gold_count > _GOLD_MAX ) {
                            PS.debug( "WARNING: More than " + _GOLD_MAX + " gold!\n" );
                            PS.audioPlay( _SOUND_ERROR );
                            return;
                        }
                        PS.color( x, y, _COLOR_GOLD );
                        PS.radius(x, y, 50);
                        x_gold_pos[6] = x;
                        y_gold_pos[6] = y;
                    }
                    else if ( val === _MAP_GOLD8 ) {
                        _gold_count += 1;
                        if ( _gold_count > _GOLD_MAX ) {
                            PS.debug( "WARNING: More than " + _GOLD_MAX + " gold!\n" );
                            PS.audioPlay( _SOUND_ERROR );
                            return;
                        }
                        PS.color( x, y, _COLOR_GOLD );
                        PS.radius(x, y, 50);
                        x_gold_pos[7] = x;
                        y_gold_pos[7] = y;
                    }
                    else if ( val === _MAP_GOLD9 ) {
                        _gold_count += 1;
                        if ( _gold_count > _GOLD_MAX ) {
                            PS.debug( "WARNING: More than " + _GOLD_MAX + " gold!\n" );
                            PS.audioPlay( _SOUND_ERROR );
                            return;
                        }
                        PS.color( x, y, _COLOR_GOLD );
                        PS.radius(x, y, 50);
                        x_gold_pos[8] = x;
                        y_gold_pos[8] = y;
                    }
                    else if ( val === _MAP_GOLD10 ) {
                        _gold_count += 1;
                        if ( _gold_count > _GOLD_MAX ) {
                            PS.debug( "WARNING: More than " + _GOLD_MAX + " gold!\n" );
                            PS.audioPlay( _SOUND_ERROR );
                            return;
                        }
                        PS.color( x, y, _COLOR_GOLD );
                        PS.radius(x, y, 50);
                        x_gold_pos[9] = x;
                        y_gold_pos[9] = y;
                    }
					else if ( val === _MAP_ACTOR ) {
						if ( _actor_x >= 0 ) {
							PS.debug( "WARNING: More than one actor!\n" );
							PS.audioPlay( _SOUND_ERROR );
							return;
						}
						_actor_x = x;
						_actor_y = y;
						_MAP.data[ ( y * _MAP.height ) + x ] = _MAP_FLOOR; // change actor to floor
						PS.color( x, y, _COLOR_FLOOR );
					}
					else if ( val === _MAP_EXIT ) {
						if ( _exit_x >= 0 ) {
							PS.debug( "WARNING: More than one exit!\n" );
							PS.audioPlay( _SOUND_ERROR );
							return;
						}
						_exit_x = x;
						_exit_y = y;
						_MAP.data[ ( y * _MAP.height ) + x ] = _MAP_FLOOR; // change exit to floor
						PS.color( x, y, _COLOR_FLOOR );
					}
				}
			}

			PS.statusColor( PS.COLOR_WHITE );
			PS.statusText( "Click to the Beat to Move Fast!" );

			// Create 1x1 solid sprite for actor
			// Place on actor plane in initial actor position

			_id_sprite = PS.spriteSolid( 1, 1 );
			PS.spriteSolidColor( _id_sprite, _COLOR_ACTOR );
			PS.spritePlane( _id_sprite, _PLANE_ACTOR );
			PS.spriteMove( _id_sprite, _actor_x, _actor_y );

			// Create pathmap from our imageMap
			// for use by pathfinder

			_id_path = PS.pathMap( _MAP );

			// Start the timer function that moves the actor
			// Run at 10 frames/sec (every 6 ticks)

			_path = null; // start with no path
			_step = 0;
			_id_timer = PS.timerStart(6, _tick);
			frameTimer = PS.timerStart(1, frameTick);
			shrinkTimer = PS.timerStart(6, shrinkTick);
			gameTimer = PS.timerStart(60, gameTick);

			//Create analytics database
			PS.dbInit("SampleGameJWJ");
		},

		// move( x, y )
		// Set up new path for the actor to follow

		move : function ( x, y ) {
			var line;

			
			//clickTimes.push(frameCount); //Don't think we need this
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
				PS.audioPlay( _SOUND_FLOOR );
			}
			else {
				PS.audioPlay( _SOUND_WALL );
			}

			var clickTime = frameCount % 120;
			clickTime = clickTime % 30;

			PS.dbEvent("SampleGameJWJ", "ClickTime", clickTime);
		    if (clickTime < 4 || clickTime > 26) {
		        PS.gridColor(_COLOR_GOLD);
		        PS.gridFade(20, { onEnd: bgFade });
		        PS.gridColor(_COLOR_BG);
		    }
		    else {
		        PS.statusText("Click to the Beat to Move Fast!");
		        var newpath = [];
		        if (line.length > 0) {
		            newpath.push(line[0]);
		            _path = newpath;
		            _step = 0;
		        }
		    }
		}
	};
} () ); // end of IIFE

// The G event handlers take the same parameters as Perlenspiel's event handlers,
// so they can be assigned to those handlers directly.
// Note the LACK of parentheses after G.init and G.move!
// We want to assign the functions themselves, NOT the values returned by calling them!

PS.init = G.init;
PS.touch = G.move;

