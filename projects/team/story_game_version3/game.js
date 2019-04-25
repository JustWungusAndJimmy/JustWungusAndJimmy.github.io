/*
game.js for Perlenspiel 3.3.x
Last revision: 2018-10-14 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-19 Worcester Polytechnic Institute.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.
*/

//COLORS
var COLOR_CHILD_GRAY = 0x4a4e4d;
var COLOR_CHILD_DARK_BLUE = 0x0e9aa7;
var COLOR_CHILD_LIGHT_BLUE = 0x3da4ab;
var COLOR_CHILD_YELLOW = 0xf6cd61;
var COLOR_CHILD_ORANGE = 0xd69d61;
var COLOR_ADULT_DARK_BLUE = 0x061e3e;
var COLOR_ADULT_DARK_PURPLE = 0x251e3e;
var COLOR_ADULT_LIGHT_PURPLE = 0x451e3e;
var COLOR_ADULT_DARK_RED = 0x651e3e;
var COLOR_ADULT_LIGHT_RED = 0x851e3e;
var COLOR_ADULT_HIGHLIGHT = 0xae2952;

var COLOR_CHILD_VEGGIE1 = 0x20f320;
var COLOR_CHILD_VEGGIE2 = 0x20d320;
var COLOR_VOMIT = 0x667c54;

///MENU MAP
var menuMap = {
    width: 32, height: 32, pixelSize: 1,
    data: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
};

///ENDING
//map
var ENDING_BG = 0;

var end_map = {
    width: 32, height: 32, pixelSize: 1,
    data: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
};

//sprites
var kid_adult;
var true_kid;
var adult_kid;
var true_adult;
var switch_button;

//variables
var switch_pos = [];
var won = false;

var loadEnding = function() {
    var gridHeight = end_map.height;
    var gridWidth = end_map.width;
    PS.gridSize(gridWidth, gridHeight);
    PS.touch = endTouchFunc;
    //Initialize beginning values
    //This will alternate between the darkest color in the two schemes depending on which microgame set is being played
    PS.gridColor(COLOR_CHILD_DARK_BLUE);
    PS.statusColor(PS.COLOR_WHITE);
    PS.statusText("");
    PS.border(PS.ALL, PS.ALL, 0);
    PS.gridShadow(true, PS.COLOR_BLACK);

    for (var y = 0; y < gridHeight; y++) {
        for (var x = 0; x < gridWidth; x++) {
            if (end_map.data[y][x] === ENDING_BG)
                PS.color(x, y, COLOR_CHILD_YELLOW);
        }
    }

    spawnAdultKid();
    spawnKidAdult();
    spawnSwitch();
}

var endTouchFunc = function(x, y, data, options){
    "use strict"; // Do not remove this directive!
    if ((x >= switch_pos[0] && x <= switch_pos[0] + 9) && (y >= switch_pos[1] && y <= switch_pos[1] + 6) && !won) {
        PS.spriteDelete(switch_button);
        spawnTrueKid();
        spawnTrueAdult();
        PS.fade(PS.ALL, PS.ALL, 360);
        PS.color(PS.ALL, PS.ALL, PS.COLOR_BLACK);
        PS.statusText("We're not so different.");
        won = true;
    }
}

var spawnKidAdult = function() {
    var loader;

    loader = function ( data ) {
        kid_adult = PS.spriteImage( data );
        PS.spritePlane( kid_adult, sprite_plane);
        PS.spriteMove(kid_adult, -1, 0);
    };
    PS.imageLoad("images/kid_adult.png", loader);
}

var spawnTrueKid = function() {
    var loader;

    PS.spriteDelete(kid_adult);

    loader = function ( data ) {
        true_kid = PS.spriteImage( data );
        PS.spritePlane( true_kid, sprite_plane);
        PS.spriteMove(true_kid, -1, 0);
    };
    PS.imageLoad("images/true_kid.png", loader);
}

var spawnAdultKid = function () {
    var loader;

    loader = function ( data ) {
        adult_kid = PS.spriteImage( data );
        PS.spritePlane( adult_kid, sprite_plane);
        PS.spriteMove(adult_kid, 21, 0);
    };
    PS.imageLoad("images/adult_kid.png", loader);
}

var spawnTrueAdult = function(){
    var loader;

    PS.spriteDelete(adult_kid);

    loader = function ( data ) {
        true_adult = PS.spriteImage( data );
        PS.spritePlane( true_adult, sprite_plane);
        PS.spriteMove(true_adult, 21, 0);
    };
    PS.imageLoad("images/true_adult.png", loader);
}

var spawnSwitch = function () {
    var loader;

    loader = function ( data ) {
        switch_button = PS.spriteImage( data );
        PS.spritePlane( switch_button, sprite_plane);
        switch_pos[0] = 11;
        switch_pos[1] = 15;
        PS.spriteMove(switch_button, switch_pos[0], switch_pos[1]);
    };
    PS.imageLoad("images/switch.png", loader);
}

//GLOBAL VARIABLES
var mg_index = -1;
var bg_plane = 0;
var sprite_plane = 1;
var arrow_plane = 2;

var touch_enabled = true;

var totalGames = 0;
var gameSet = 0;

var gameCompleteTimer = null;
var counter = 0;

//GLOBAL FUNCTIONS
var loadMenu = function () {
    //PS.debug(child_mgs[mg_index].width);
    //get level width and height for variable level sizes
    var gridWidth = menuMap.width;
    var gridHeight = menuMap.height;
    PS.gridSize(gridWidth, gridHeight);

    PS.touch = menuTouchFunc;
    //PS.dbEvent("StoryGamePrototype", "KidGameStart", 0);

    //Initialize beginning values
    //This will alternate between the darkest color in the two schemes depending on which microgame set is being played
    PS.gridColor(COLOR_CHILD_DARK_BLUE);
    PS.statusColor(PS.COLOR_WHITE);
    PS.statusText("Pick Game Set");
    PS.border(PS.ALL, PS.ALL, 0);
    PS.gridShadow(true, PS.COLOR_BLACK);

    for (var y = 0; y < gridHeight; y++) {
        for (var x = 0; x < gridWidth; x++) {
            if (menuMap.data[y][x] === 0)
                PS.color(x, y, COLOR_CHILD_YELLOW);
        }
    }
    spawnAllIcons();
};

//variables
var child_food;
var child_food_pos = [];
var ch_food_check = true;
var child_amusement;
var ch_amusement_pos = [];
var child_amuse_check = true;
var child_sleep;
var child_sleep_pos = [];
var ch_sleep_check = true;
var adult_food;
var adult_food_pos = [];
var ad_food_check = true;
var adult_amusement;
var adult_amusement_pos = [];
var ad_amuse_check = true;
var adult_sleep;
var adult_sleep_pos = [];
var ad_sleep_check = true;

var spawnAllIcons = function() {
    var loader1, loader2, loader3, loader4, loader5, loader6;

    if (ch_food_check) {
        loader1 = function(data) {
            child_food = PS.spriteImage( data );
            PS.spritePlane( child_food, sprite_plane);
            child_food_pos[0] = 4;
            child_food_pos[1] = 2;
            PS.spriteMove(child_food, child_food_pos[0], child_food_pos[1]);
        }
        PS.imageLoad("images/child_food.png", loader1);
    }
    if (ad_food_check) {
        loader2 = function(data) {
            adult_food = PS.spriteImage( data );
            PS.spritePlane( adult_food, sprite_plane);
            adult_food_pos[0] = 20;
            adult_food_pos[1] = 2;
            PS.spriteMove(adult_food, adult_food_pos[0], adult_food_pos[1]);
        }
        PS.imageLoad("images/adult_food.png", loader2);
    }
    if (child_amuse_check) {
        loader3 = function(data) {
            child_amusement = PS.spriteImage( data );
            PS.spritePlane( child_amusement, sprite_plane);
            ch_amusement_pos[0] = 4;
            ch_amusement_pos[1] = 12;
            PS.spriteMove(child_amusement, ch_amusement_pos[0], ch_amusement_pos[1]);
        }
        PS.imageLoad("images/child_amusement.png", loader3);
    }
    if (ad_amuse_check) {
        loader4 = function(data) {
            adult_amusement = PS.spriteImage( data );
            PS.spritePlane( adult_amusement, sprite_plane);
            adult_amusement_pos[0] = 20;
            adult_amusement_pos[1] = 12;
            PS.spriteMove(adult_amusement, adult_amusement_pos[0], adult_amusement_pos[1]);
        }
        PS.imageLoad("images/adult_amusement.png", loader4);
    }
    if (ch_sleep_check) {
        loader5 = function(data) {
            child_sleep = PS.spriteImage( data );
            PS.spritePlane( child_amusement, sprite_plane);
            child_sleep_pos[0] = 4;
            child_sleep_pos[1] = 22;
            PS.spriteMove(child_sleep, child_sleep_pos[0], child_sleep_pos[1]);
        }
        PS.imageLoad("images/child_sleep.png", loader5);
    }
    if (ad_sleep_check) {
        loader6 = function(data) {
            adult_sleep = PS.spriteImage( data );
            PS.spritePlane( adult_sleep, sprite_plane);
            adult_sleep_pos[0] = 20;
            adult_sleep_pos[1] = 22;
            PS.spriteMove(adult_sleep, adult_sleep_pos[0], adult_sleep_pos[1]);
        }
        PS.imageLoad("images/adult_sleep.png", loader6);
    }
}

var deleteAllIcons = function(){
    if (ch_food_check) {
        PS.spriteDelete(child_food);
    }
    if (ad_food_check) {
        PS.spriteDelete(adult_food);
    }
    if (child_amuse_check) {
        PS.spriteDelete(child_amusement);
    }
    if (ad_amuse_check) {
        PS.spriteDelete(adult_amusement);
    }
    if (ch_sleep_check) {
        PS.spriteDelete(child_sleep);
    }
    if (ad_sleep_check) {
        PS.spriteDelete(adult_sleep);
    }
}

var gameCompleteFunction = function () {
    counter++;
    touch_enabled = false;
    if (counter == 120) {
        PS.timerStop(gameCompleteTimer);


        //every game has been completed, put code for activating ending here
        if (totalGames === 5) {
            //ENDING CODE GOES HERE
            //PS.debug("All Games Completed, here's the ending\n");
            loadEnding();
            return;
        }

        counter = 0;
        mg_index = -1;
        loadMenu();
        touch_enabled = true;

    }
};


///MICROGAME CODE


//Child food game
var c_mg1 = {
    width: 32, height: 32, pixelSize: 1,
    data: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3, 3, 2, 1, 1, 4, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 3, 3, 2, 1, 1, 4, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 4, 3, 3, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 4, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 4, 3, 3, 1, 1, 1, 1, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 4, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 4, 2, 2, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 4, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 4, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 4, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 4, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 4, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 1, 1, 1, 4, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 4, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 4, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 4, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 4, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 4, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 4, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 4, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 4, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 4, 4, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 4, 4, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 4, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 4, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    touchFunc : function(x, y, data, options){
        "use strict"; // Do not remove this directive!
        //child food game
        //else if (mg_index == 1) {
        if (touch_enabled) {
            if (c_mg1.data[y][x] === 1) {
                var rand = Math.floor(Math.random() * 3);
                if (rand === 0) {
                    PS.statusText("Don't play with your food!");
                    PS.audioPlay("fork1", { path: "sounds/", fileTypes: ["wav"]});
                }
                   
                if (rand === 1) {
                    PS.statusText("Quit stalling and eat!");
                    PS.audioPlay("fork2", { path: "sounds/", fileTypes: ["wav"]});
                }
                    
                if (rand === 2) {
                    PS.statusText("Eat, or no dessert!")
                    PS.audioPlay("fork3", { path: "sounds/", fileTypes: ["wav"] });
                }

                PS.dbEvent("StoryGamePrototype", "PlateClick", 0);
            }

            if (c_mg1.data[y][x] === 2 || c_mg1.data[y][x] === 3) {
                PS.statusText("");
                var rand = Math.floor(Math.random() * 3);
                if (rand === 0)
                    PS.audioPlay("crunch1", { path: "sounds/", fileTypes: ["wav"] });
                if (rand === 1)
                    PS.audioPlay("crunch2", { path: "sounds/", fileTypes: ["wav"] });
                if (rand === 2)
                    PS.audioPlay("crunch3", { path: "sounds/", fileTypes: ["wav"] });
                for (var j = y - 1; j < y + 2; j++) {
                    for (var i = x - 1; i < x + 2; i++) {
                        if (c_mg1.data[j][i] === 2 || c_mg1.data[j][i] === 3) {
                            PS.color(i, j, COLOR_CHILD_YELLOW);
                            c_mg1.data[j][i] = 1;
                        }
                    }
                }

                PS.dbEvent("StoryGamePrototype", "FoodClick", 0);

                PS.border(PS.ALL, PS.ALL, 0);
                var gridWidth = c_mg1.width;
                var gridHeight = c_mg1.height;
                for (var y = 0; y < gridHeight; y++) {
                    for (var x = 0; x < gridWidth; x++) {
                        if (c_mg1.data[y][x] === 2 || c_mg1.data[y][x] === 3)
                            return;
                    }
                }
                PS.dbEvent("StoryGamePrototype", "KidGameComplete", 0);
                PS.statusText("You finished your dinner!");
                mg_index--;
                //loadMicroGame();
                totalGames++;
                gameCompleteTimer = PS.timerStart(1, gameCompleteFunction);
            }

        }

	       
    }
}

var loadChildMicroGame1 = function () {
    //PS.debug(child_mgs[mg_index].width);
    //get level width and height for variable level sizes
    var gridWidth = c_mg1.width;
    var gridHeight = c_mg1.height;
    PS.gridSize(gridWidth, gridHeight);
    PS.touch = c_mg1.touchFunc;
    //Initialize beginning values
    //This will alternate between the darkest color in the two schemes depending on which microgame set is being played
    PS.gridColor(COLOR_ADULT_DARK_BLUE);
    PS.statusColor(PS.COLOR_WHITE);
    PS.statusText("");
    PS.border(PS.ALL, PS.ALL, 0);
    PS.gridShadow(true, PS.COLOR_BLACK);

    for (var y = 0; y < gridHeight; y++) {
        for (var x = 0; x < gridWidth; x++) {
            if (c_mg1.data[y][x] === 0)
                PS.color(x, y, COLOR_CHILD_LIGHT_BLUE);
            if (c_mg1.data[y][x] === 1)
                PS.color(x, y, COLOR_CHILD_YELLOW);
            if (c_mg1.data[y][x] === 4)
                PS.color(x, y, COLOR_CHILD_ORANGE);
            if (c_mg1.data[y][x] === 2)
                PS.color(x, y, COLOR_CHILD_VEGGIE1);
            if (c_mg1.data[y][x] === 3)
                PS.color(x, y, COLOR_CHILD_VEGGIE2);
        }
    }
}











///Adult food game
var FRIDGE = 0;
var FRIDGE_BG = 1;

var a_mg1 = {
    width : 32, height : 32, pixelSize : 1,
    data : [
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
    ]
};

//sprites
var cur_sprite;
var left_arrow;
var right_arrow;

//Variables
var spr_pos = [];
var left_arr_pos = [];
var right_arr_pos = [];
var foodMoveTimer;
var move_left = true;
var is_moving = false;
var food_goal = 3;
var food_cnt = 0;
var ag1Audio = "";

//Functions
var spawnLeftArrow = function() {
    var loader;

    loader = function ( data ) {
        left_arrow = PS.spriteImage( data );
        PS.spritePlane( left_arrow, arrow_plane);
        left_arr_pos[0] = 2;
        left_arr_pos[1] = 17;
        PS.spriteMove(left_arrow, left_arr_pos[0], left_arr_pos[1]);
    };
    PS.imageLoad("images/amg_arrow_left.png", loader);
};

var spawnRightArrow = function() {
    var loader;

    loader = function (data) {
        right_arrow = PS.spriteImage( data );
        PS.spritePlane( right_arrow, arrow_plane);
        right_arr_pos[0] = 24;
        right_arr_pos[1] = 17;
        PS.spriteMove(right_arrow, right_arr_pos[0], right_arr_pos[1]);
    };
    PS.imageLoad("images/amg_arrow_right.png", loader);
};

var spawnFood = function() {
    var loader1, loader2, loader3, loader4;

    //define image loading functions
    loader1 = function ( data ) {
        cur_sprite = PS.spriteImage( data );
        PS.spritePlane( cur_sprite, sprite_plane );
        spr_pos[0] = 8;
        spr_pos[1] = 17;
        PS.spriteMove(cur_sprite, spr_pos[0], spr_pos[1]);
    };
    loader2 = function ( data ) {
        cur_sprite = PS.spriteImage( data );
        PS.spritePlane( cur_sprite, sprite_plane );
        spr_pos[0] = 10;
        spr_pos[1] = 10;
        PS.spriteMove(cur_sprite, spr_pos[0], spr_pos[1]);
    };
    loader3 = function ( data ) {
        cur_sprite = PS.spriteImage( data );
        PS.spritePlane( cur_sprite, sprite_plane );
        spr_pos[0] = 11;
        spr_pos[1] = 10;
        PS.spriteMove(cur_sprite, spr_pos[0], spr_pos[1]);
    };
    loader4 = function ( data ) {
        cur_sprite = PS.spriteImage( data );
        PS.spritePlane( cur_sprite, sprite_plane );
        spr_pos[0] = 11;
        spr_pos[1] = 14;
        PS.spriteMove(cur_sprite, spr_pos[0], spr_pos[1]);
    };

    // Load the image
    //Decide where to position sprite
    if (food_cnt == 0) {
        PS.imageLoad( "images/amg_fish.png", loader1 );
        //cur_sprite = spr_food1;
    } else if (food_cnt == 1) {
        PS.imageLoad( "images/amg_milk.png", loader2 );
        //cur_sprite = spr_food2;
    } else if (food_cnt == 2) {
        PS.imageLoad( "images/amg_apple.png", loader3 );
        //cur_sprite = spr_food3;
    } else if (food_cnt == 3) {
        PS.imageLoad( "images/amg_jar.png", loader4 );
        //cur_sprite = spr_food4;
    }
};

var placeFood = function(){
    PS.statusText("");
    if (food_cnt < food_goal) {
        spawnFood();
        if (food_cnt === 0)
            PS.statusText("Yuck, old fish");
        if (food_cnt === 1)
            PS.statusText("Eugh, expired milk");
        if (food_cnt === 2)
            PS.statusText("Why wasn't this thrown out?");
        if (move_left){
            spawnLeftArrow();
        } else {
            spawnRightArrow();
        }
    } if (food_cnt == food_goal){
        PS.statusText("Delicious. That's mine.");
        spawnFood();
    }
};

var loadAdultMicroGame1 = function(){
    //get level width and height for variable level sizes
    var gridWidth = a_mg1.width;
    var gridHeight = a_mg1.height;
    PS.gridSize(gridWidth, gridHeight);

    //Initialize beginning values
    //This will alternate between the darkest color in the two schemes depending on which microgame set is being played
    PS.gridColor(COLOR_ADULT_DARK_BLUE);
    PS.statusColor( PS.COLOR_WHITE );
    PS.statusText("");
    PS.border(PS.ALL, PS.ALL, 0);
    PS.gridShadow(true, PS.COLOR_BLACK);

    var x, y, val;

    //PS.audioPlay("fridge", { path: "sounds/", fileTypes: ["wav"], repeat: true });
    //PS.debug(ag1Audio + "\n");
    PS.touch = ag1_TouchFunc;
    PS.dbEvent("StoryGamePrototype", "AdultGameStart", 0);

    PS.gridPlane(bg_plane);
    for ( y = 0; y < a_mg1.height; y += 1 ) {
        for (x = 0; x < a_mg1.width; x += 1) {
            val = a_mg1.data[(y * a_mg1.width) + x]; // get map data
            if (val === FRIDGE) {
                PS.color(x, y, COLOR_ADULT_DARK_PURPLE);
            }
            else if (val === FRIDGE_BG) {
                PS.color(x, y, COLOR_ADULT_LIGHT_PURPLE);
            }
        }
    }
    placeFood();
};

var swipeTick = function (){
    if (spr_pos[0] < -32) {
        move_left = !move_left;
        is_moving = false;
        placeFood();
        PS.timerStop(foodMoveTimer);
        foodMoveTimer = null;
    }
    if (spr_pos[0] > 45) {
        move_left = !move_left;
        is_moving = false;
        placeFood();
        PS.timerStop(foodMoveTimer);
    }
    if (move_left) {
        spr_pos[0] -= 1;
        PS.spriteMove(cur_sprite, spr_pos[0], spr_pos[1]);
    } else {
        spr_pos[0] += 1;
        PS.spriteMove(cur_sprite, spr_pos[0], spr_pos[1]);
    }
};


var ag1_TouchFunc = function (x, y, data, options) {
    "use strict"; // Do not remove this directive!
    if (touch_enabled) {
        if (!is_moving && food_cnt < food_goal) {
            if (((x >= left_arr_pos[0] && x <= left_arr_pos[0] + 6) && (y >= left_arr_pos[1] && y <= left_arr_pos[1] + 6)) && move_left) {
                is_moving = true;
                foodMoveTimer = PS.timerStart(1, swipeTick);
                PS.spriteDelete(left_arrow);
                food_cnt++;
            } else if (((x >= right_arr_pos[0] && x <= right_arr_pos[0] + 6) && (y >= right_arr_pos[1] && y <= right_arr_pos[1] + 6)) && !move_left) {
                is_moving = true;
                foodMoveTimer = PS.timerStart(1, swipeTick);
                PS.spriteDelete(right_arrow);
                food_cnt++;
            }
        }
        if (food_cnt == food_goal) {
            if ((x >= spr_pos[0] && x <= spr_pos[0] + 16) && (y >= spr_pos[1] && y <= spr_pos[1] + 16)) {
                PS.statusText("Someone ate it already...");
                //PS.audioStop(ag1Audio);
                totalGames++;
                gameCompleteTimer = PS.timerStart(1, gameCompleteFunction);

            }
        }
    }
}







//Adult amusement park game
var COASTER_BG = 1;
var COASTER_RAIL = 0;
var COASTER_BOARD = 2;
var CAR_OUTLINE = 4;
var CAR_FILL = 5;
var PER_OUTLINE = 3;

var a_mg2 = {
    width : 32, height : 32, pixelSize : 1,
    data : [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 3, 0, 0, 3, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 5, 5, 4, 1, 3, 0, 0, 0, 0, 3, 1, 4, 5, 5, 4, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 5, 5, 4, 1, 3, 0, 0, 0, 0, 3, 1, 4, 5, 5, 5, 4, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 5, 5, 4, 1, 3, 0, 0, 0, 0, 3, 4, 5, 5, 5, 5, 4, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 4, 1, 1, 1, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0,
        2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 0, 2, 2, 2, 2, 0, 2, 2,
        0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ]
};

//sprites
var leg_sprite;
var cur_facebutton;
var vomit;

//variables
var legTimer = null;
var vomitTimer = null;
var leg_pos = [];
var face_pos = [];
var vomit_pos = [];
var click_cnt = 0;
var ag2Audio;
//Functions
var loadAdultMicroGame2 = function(){
    //get level width and height for variable level sizes
    var gridWidth = a_mg2.width;
    var gridHeight = a_mg2.height;
    PS.gridSize(gridWidth, gridHeight);

    //Initialize beginning values
    //This will alternate between the darkest color in the two schemes depending on which microgame set is being played
    PS.gridColor(COLOR_ADULT_DARK_BLUE);
    PS.statusColor( PS.COLOR_WHITE );
    PS.statusText("");
    PS.border(PS.ALL, PS.ALL, 0);
    PS.gridShadow(true, PS.COLOR_BLACK);

    var x, y, val;

    PS.dbEvent("StoryGamePrototype", "AdultGameStart", 0);
    PS.touch = ag2_TouchFunc;
    PS.gridPlane(bg_plane);
    for ( y = 0; y < a_mg2.height; y += 1 ) {
        for (x = 0; x < a_mg2.width; x += 1) {
            val = a_mg2.data[(y * a_mg2.width) + x]; // get map data
            if (val === COASTER_BG) {
                PS.color(x, y, COLOR_ADULT_LIGHT_RED);
            }
            else if (val === COASTER_RAIL) {
                PS.color(x, y, COLOR_ADULT_LIGHT_PURPLE);
            } else if (val === COASTER_BOARD) {
                PS.color(x, y, COLOR_ADULT_DARK_RED);
            } else if (val === CAR_OUTLINE) {
                PS.color(x, y, COLOR_ADULT_HIGHLIGHT);
            } else if (val === CAR_FILL) {
                PS.color(x, y, COLOR_ADULT_DARK_BLUE);
            } else if (val === PER_OUTLINE) {
                PS.color(x, y, COLOR_ADULT_DARK_PURPLE);
            }
        }
    }
    spawnLegs();
    spawnFace1();
};

var legTick = function () {
    leg_pos[0] -= 1;
    PS.spriteMove(leg_sprite, leg_pos[0], leg_pos[1]);
    if (leg_pos[0] < -8){
        PS.timerStop(legTimer);
        PS.spriteDelete(leg_sprite);
        spawnLegs();
    }
}

var spawnLegs = function() {
    var loader;

    loader = function (data) {
        leg_sprite = PS.spriteImage( data );
        PS.spritePlane( leg_sprite, sprite_plane);
        leg_pos[0] = 33;
        leg_pos[1] = 20;
        PS.spriteMove(leg_sprite, leg_pos[0], leg_pos[1]);
        legTimer = PS.timerStart(1, legTick);
    };
    PS.imageLoad("images/amg_coaster_legs.png", loader);
};

var spawnFace1 = function() {
    var loader;

    loader = function (data) {
        cur_facebutton = PS.spriteImage( data );
        PS.spritePlane( cur_facebutton, arrow_plane);
        face_pos[0] = 11;
        face_pos[1] = 21;
        PS.spriteMove(cur_facebutton, face_pos[0], face_pos[1]);
    };
    PS.imageLoad("images/amg_face1.png", loader);
    PS.statusText("I don't feel so good...");
};

var spawnFace2 = function() {
    var loader;

    loader = function (data) {
        cur_facebutton = PS.spriteImage( data );
        PS.spritePlane( cur_facebutton, arrow_plane);
        face_pos[0] = 11;
        face_pos[1] = 21;
        PS.spriteMove(cur_facebutton, face_pos[0], face_pos[1]);
    };
    PS.imageLoad("images/amg_face2.png", loader);
    PS.statusText("I'm gonna be sick...");
};

var spawnFace3 = function() {
    var loader;

    loader = function (data) {
        cur_facebutton = PS.spriteImage( data );
        PS.spritePlane( cur_facebutton, arrow_plane);
        face_pos[0] = 11;
        face_pos[1] = 21;
        PS.spriteMove(cur_facebutton, face_pos[0], face_pos[1]);
    };
    PS.imageLoad("images/amg_face3.png", loader);
    PS.statusText(" ");
};

var spawnVomit = function () {
    vomit = PS.spriteSolid(6, 2);
    PS.spriteSolidColor(vomit, COLOR_VOMIT);
    PS.spritePlane(vomit, sprite_plane);
    vomit_pos[0] = 19;
    vomit_pos[1] = 7;
    PS.spriteMove(vomit, vomit_pos[0], vomit_pos[1]);
    vomitTimer = PS.timerStart(1, vomitTick);

}

var vomitTick = function() {
    vomit_pos[0] += 1;
    PS.spriteMove(vomit, vomit_pos[0], vomit_pos[1]);
    if (vomit_pos[0] > 32){
        PS.spriteDelete(vomit);
        PS.timerStop(vomitTimer);
    }
}

var ag2_TouchFunc = function (x, y, data, options) {
    "use strict"; // Do not remove this directive!
    if (touch_enabled) {
        if ((x >= face_pos[0] && x <= face_pos[0] + 10) && (y >= face_pos[1] && y <= face_pos[1] + 10)) {
            if (click_cnt == 5) {
                PS.spriteDelete(cur_facebutton);
                spawnFace2();
            } else if (click_cnt == 10) {
                PS.spriteDelete(cur_facebutton);
                spawnFace3();
                spawnVomit();
                //this minigame is won - jordan do your thing
                //PS.debug("Blech");
                PS.timerStop(legTimer);
                totalGames++;
                gameCompleteTimer = PS.timerStart(1, gameCompleteFunction);


            }
            click_cnt++;
        }
    }
}


///ADULT SLEEPING GAME
var SLEEP_BG = 0;
var BED_FRAME = 1;
var BLANKET_OUTLINE = 2;
var MATTRESS = 3;
var BLANKET = 4;

var a_mg3 = {
    width : 32, height : 32, pixelSize : 1,
    data : [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 2, 2, 2, 3, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 2, 2, 2, 3, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 2, 3, 3, 3, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 2, 1, 1, 1, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 2, 3, 3, 3, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 2, 3, 3, 3, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 2, 3, 3, 3, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 2, 1, 1, 1, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]
};

//sprites
var phone;
var arr_down;

//variables
var phone_up = false;
var phone_tick = 0;
var tot_time;
var phone_pos = [];
var phone_arr_pos = [];
var phoneTimer = null;
var respawnTimer = null;
var ignores = 0;
var annoyed_lines = ["Who is texting me!", "God, go away!", "I just want to sleep!"];
var line_count = 0;

//functions
var loadAdultMicroGame3 = function(){
    //get level width and height for variable level sizes
    var gridWidth = a_mg3.width;
    var gridHeight = a_mg3.height;
    PS.gridSize(gridWidth, gridHeight);

    //Initialize beginning values
    //This will alternate between the darkest color in the two schemes depending on which microgame set is being played
    PS.gridColor(COLOR_ADULT_DARK_BLUE);
    PS.statusColor( PS.COLOR_WHITE );
    PS.statusText("");
    PS.border(PS.ALL, PS.ALL, 0);
    PS.gridShadow(true, PS.COLOR_BLACK);

    var x, y, val;

    PS.dbEvent("StoryGamePrototype", "AdultGameStart", 0);
    PS.touch = ag3_TouchFunc;
    PS.gridPlane(bg_plane);
    for ( y = 0; y < a_mg3.height; y += 1 ) {
        for (x = 0; x < a_mg3.width; x += 1) {
            val = a_mg3.data[(y * a_mg3.width) + x]; // get map data
            if (val === SLEEP_BG) {
                PS.color(x, y, COLOR_ADULT_DARK_BLUE);
            }
            else if (val === BED_FRAME) {
                PS.color(x, y, COLOR_ADULT_DARK_PURPLE);
            } else if (val === BLANKET_OUTLINE) {
                PS.color(x, y, COLOR_ADULT_LIGHT_PURPLE);
            } else if (val === MATTRESS) {
                PS.color(x, y, COLOR_ADULT_DARK_RED);
            } else if (val === BLANKET) {
                PS.color(x, y, COLOR_ADULT_LIGHT_RED);
            }
        }
    }
    PS.statusText("Time for bed.");
    spawnPhone();
};

var ag3_TouchFunc = function(x, y, data, options) {
    "use strict"; // Do not remove this directive!
    if (phone_up) {
        if ((x >= phone_arr_pos[0] && x <= phone_arr_pos[0] + 6) && (y >= phone_arr_pos[1] && y <= phone_arr_pos[1] + 6)) {
            PS.spriteDelete(arr_down);
            phoneTimer = PS.timerStart(1, phoneTick);
        }
    }

}

var spawnPhone = function() {
    var loader;

    loader = function (data) {
        phone = PS.spriteImage( data );
        PS.spritePlane( phone, sprite_plane);
        phone_pos[0] = 10;
        phone_pos[1] = 33;
        PS.spriteMove(phone, phone_pos[0], phone_pos[1]);
        phoneTimer = PS.timerStart(1, phoneTick);
    };
    PS.imageLoad("images/amg_phone.png", loader);
};


var calculateTime = function() {
    var min = 2;
    var max = 4;
    tot_time = Math.floor(Math.random() * (max-min+1)) + min;
}

var phoneTick = function() {
    if (!phone_up){
        phone_pos[1] -= 1;
        if (phone_pos[1] == 7) {
            printNextGripe();
            phone_up = true;
            spawnPhoneArrow();
            PS.timerStop(phoneTimer);
        } else {
            PS.spriteMove(phone, phone_pos[0], phone_pos[1]);
        }
    } else {
        phone_pos[1] += 1;
        if (phone_pos[1] == 33) {
            ignores += 1;
            if (ignores == 3) {
                PS.statusText("Will I ever get rest?");
                totalGames++;
                gameCompleteTimer = PS.timerStart(1, gameCompleteFunction);
            } else {
                PS.statusText("Time for bed... Again.");
                phone_up = false;
                PS.timerStop(phoneTimer);
                calculateTime();
                respawnTimer = PS.timerStart(60, notifyTick);
            }
        } else {
            PS.spriteMove(phone, phone_pos[0], phone_pos[1]);
        }
    }
}

var notifyTick = function () {
    phone_tick++;
    if (phone_tick == (tot_time)){
        PS.timerStop(respawnTimer);
        phone_tick = 0;
        phoneTimer = PS.timerStart(1, phoneTick);
    }
}

var spawnPhoneArrow = function() {
    var loader;

    loader = function (data) {
        arr_down = PS.spriteImage( data );
        PS.spritePlane( arr_down, arrow_plane);
        phone_arr_pos[0] = 13;
        phone_arr_pos[1] = 25;
        PS.spriteMove(arr_down, phone_arr_pos[0], phone_arr_pos[1]);
    };
    PS.imageLoad("images/amg_arrow_down.png", loader);
}

var printNextGripe = function() {
    PS.statusText(annoyed_lines[line_count]);
    line_count++;
}





//CHILD AMUSEMENT PARK GAME

var c_mg2 = {
    width: 32, height: 32, pixelSize: 1,
    data: [
        2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 3, 1, 1, 1, 1, 3, 0, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 0, 3, 3, 3, 3, 3, 3, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 1, 0, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4,
        4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 0, 1, 0, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 0, 1, 0, 1, 1, 1, 1, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2,
        4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 0, 1, 0, 1, 0, 4, 4, 2, 4, 4, 4, 2, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 0, 1, 0, 1, 0, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 2, 4,
        4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2,
        4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 0, 0, 1, 1, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 0, 1, 0, 4, 4, 2, 4, 4, 4, 4, 4, 2, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 0, 1, 1, 1, 1, 0, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4,
        2, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 0, 1, 1, 0, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 0, 4, 4, 4, 4, 2, 4, 4, 4, 4, 2, 4, 4,
        2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 2, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4,
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4
    ],
    data2: [
        [2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 3, 1, 1, 1, 1, 3, 1, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 1, 3, 3, 3, 3, 3, 3, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4],
        [4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 9, 1, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 0, 1, 9, 1, 1, 1, 1, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2],
        [4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 9, 1, 9, 1, 0, 4, 4, 2, 4, 4, 4, 2, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 0, 1, 9, 1, 9, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 9, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 2, 4],
        [4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2],
        [4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 9, 9, 1, 1, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 9, 1, 0, 4, 4, 2, 4, 4, 4, 4, 4, 2, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 9, 1, 1, 1, 1, 0, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4],
        [2, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 0, 1, 1, 9, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 0, 4, 4, 4, 4, 2, 4, 4, 4, 4, 2, 4, 4],
        [2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 2, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 10, 1, 1, 0, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4]
    ]

};

var id_path;
var path;
var line;
var childx = 16;
var childy = 30;
var step = 0;
var cmg2Timer;
var endx = 15;
var endy = 3;
var cg2Audio;

var tickFunc = function () {
    if (!path)
        return;
    var p = path[step];
    var x2 = p[0];
    var y2 = p[1];

    
    if (childy === endy && (childx === endx || childx === endx + 1)) {
        path = null;
        PS.timerStop(cmg2Timer);
        PS.statusText("Sorry, but you're too short!");
        totalGames++;
        gameCompleteTimer = PS.timerStart(1, gameCompleteFunction);
        return;
    }
    if (childx === x2 && childy === y2) {
        path = null;
        return;
    }
    PS.color(childx, childy, COLOR_CHILD_GRAY);
    PS.color(x2, y2, COLOR_CHILD_YELLOW);
    childx = x2;
    childy = y2;

    //excuse me text
    if (childx === 14 && childy === 17)
        PS.statusText("Excuse me");
    if (childx === 17 && childy === 13)
        PS.statusText("Just trying to get through");
    if (childx === 15 && childy === 8)
        PS.statusText("Scuse me");
    if (childx === 16 && childy === 7)
        PS.statusText("Pardon me");
    if (childx === 17 && childy === 6)
        PS.statusText("Lemme just squeeze through here...");
    if (childx === 14 && childy === 4)
        PS.statusText("Lemme just squeeze through here...");

    step++;
    if (step >= path.length) {
        path = null;
        return;
    }
}
var cg2_TouchFunc = function (x, y, data, options) {
    "use strict"; // Do not remove this directive!

    /*
    if (c_mg2.data2[y][x] === 1) {
        PS.debug("win");
        totalGames++;
        gameCompleteTimer = PS.timerStart(1, gameCompleteFunction);
    }
    */
    if (touch_enabled) {
        line = PS.pathFind(id_path, childx, childy, x, y);
        if (line.length > 0) {
            //childx = x;
            //childy = y;
            //PS.debug(x + " " + y + "\n");
            path = line;
            step = 0;
        }
    }

    /*
    for (var z = 0; z < line.length; z++) {
        var p = line[z];
        PS.color(p[0], p[1], COLOR_ADULT_DARK_RED);
    }
    */
    

};


var loadChildMicroGame2 = function () {
    var gridWidth = c_mg2.width;
    var gridHeight = c_mg2.height;
    PS.gridSize(gridWidth, gridHeight);

    id_path = PS.pathMap(c_mg2);
    //Initialize beginning values
    //This will alternate between the darkest color in the two schemes depending on which microgame set is being played
    PS.gridColor(COLOR_ADULT_DARK_BLUE);
    PS.statusColor(PS.COLOR_WHITE);
    PS.statusText("");
    PS.border(PS.ALL, PS.ALL, 0);
    PS.gridShadow(true, PS.COLOR_BLACK);



    //console.log("go");
    for (var y = 0; y < c_mg2.height; y++) {
        for (var x = 0; x < c_mg2.width; x++) {
            if (c_mg2.data2[y][x] === 4)
                PS.color(x, y, COLOR_CHILD_VEGGIE1);
            if (c_mg2.data2[y][x] === 2)
                PS.color(x, y, COLOR_CHILD_VEGGIE2);
            if (c_mg2.data2[y][x] === 1)
                PS.color(x, y, COLOR_CHILD_GRAY);
            if (c_mg2.data2[y][x] === 3)
                PS.color(x, y, COLOR_CHILD_DARK_BLUE);
            if (c_mg2.data2[y][x] === 0)
                PS.color(x, y, 0x000000);
            if (c_mg2.data2[y][x] === 10)
                PS.color(x, y, COLOR_CHILD_YELLOW);
            if (c_mg2.data2[y][x] === 9)
                PS.color(x, y, COLOR_CHILD_ORANGE);
        }
    }
    PS.touch = cg2_TouchFunc;
    cmg2Timer = PS.timerStart(15, tickFunc);
};



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
    var a1Load = function ( testing ) {
        ag1Audio = testing.channel;
        //PS.debug(testing.name + "\n");
    }
    var a2Load = function (data) {
        ag2Audio = data.channel;
    }
    var c2Load = function (data) {
        cg2Audio = data.channel;
    }
    PS.dbInit("StoryGamePrototype");
    PS.audioLoad("crunch1", { path: "sounds/", fileTypes: ["wav"], lock: true });
    PS.audioLoad("crunch2", { path: "sounds/", fileTypes: ["wav"], lock: true });
    PS.audioLoad("crunch3", { path: "sounds/", fileTypes: ["wav"], lock: true });
    PS.audioLoad("fork1", { path: "sounds/", fileTypes: ["wav"], lock: true });
    PS.audioLoad("fork2", { path: "sounds/", fileTypes: ["wav"], lock: true });
    PS.audioLoad("fork3", { path: "sounds/", fileTypes: ["wav"], lock: true });

    PS.audioLoad("fridge", { path: "sounds/", fileTypes: ["wav"], lock: true, onload : a1Load });

    PS.audioLoad("crowd", { path: "sounds/", fileTypes: ["wav"], lock: true, onLoad : c2Load});

    PS.audioLoad("rollerCoaster", { path: "sounds/", fileTypes: ["wav"], lock: true, onLoad : a2Load });
    loadMenu();
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

// UNCOMMENT the following code BLOCK to expose the PS.touch() event handler:

var menuTouchFunc = function (x, y, data, options) {
    "use strict"; // Do not remove this directive!

    if (ch_food_check){
        if ((y < child_food_pos[1] + 8 && y > child_food_pos[1]) && (x < child_food_pos[0] + 8 && x > child_food_pos[0])) {
            ch_food_check = false;
            mg_index++;
            loadChildMicroGame1();
        }
    }
    if (child_amuse_check){
        if ((y < ch_amusement_pos[1] + 8 && y > ch_amusement_pos[1]) && (x < ch_amusement_pos[0] + 8 && x > ch_amusement_pos[0])) {
            child_amuse_check = false;
            mg_index++;
            loadChildMicroGame2()
        }
    }
    if (ch_sleep_check) {
        if ((y < child_sleep_pos[1] + 8 && y > child_sleep_pos[1]) && (x < child_sleep_pos[0] + 8 && x > child_sleep_pos[0])) {
            ch_sleep_check = false;
            //mg_index++;
            //load the game, boyo
        }
    }
    if (ad_food_check){
        if ((y < adult_food_pos[1] + 8 && y > adult_food_pos[1]) && (x < adult_food_pos[0] + 8 && x > adult_food_pos[0])) {
            ad_food_check = false;
            mg_index++;
            loadAdultMicroGame1();
        }
    }
    if (ad_amuse_check) {
        if ((y < adult_amusement_pos[1] + 8 && y > adult_amusement_pos[1]) && (x < adult_amusement_pos[0] + 8 && x > adult_amusement_pos[0])) {
            ad_amuse_check = false;
            mg_index++;
            loadAdultMicroGame2();
        }
    }
    if (ad_sleep_check) {
        if ((y < adult_sleep_pos[1] + 8 && y > adult_sleep_pos[1]) && (x < adult_sleep_pos[0] + 8 && x > adult_sleep_pos[0])) {
            ad_sleep_check = false;
            mg_index++;
            loadAdultMicroGame3();
        }
    }
}



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



PS.enter = function( x, y, data, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect x/y parameters:

    // PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );
	if (mg_index === -1) {
        if (ch_food_check){
            if ((y < child_food_pos[1] + 8 && y > child_food_pos[1]) && (x < child_food_pos[0] + 8 && x > child_food_pos[0])) {
                PS.statusText("Food Problems");
            }
        }
        if (child_amuse_check){
            if ((y < ch_amusement_pos[1] + 8 && y > ch_amusement_pos[1]) && (x < ch_amusement_pos[0] + 8 && x > ch_amusement_pos[0])) {
                PS.statusText("Not-So-Amusing Amusement Parks");
            }
        }
        if (ch_sleep_check) {
            if ((y < child_sleep_pos[1] + 8 && y > child_sleep_pos[1]) && (x < child_sleep_pos[0] + 8 && x > child_sleep_pos[0])) {
                PS.statusText("Sleeping is Hard");
            }
        }
        if (ad_food_check){
            if ((y < adult_food_pos[1] + 8 && y > adult_food_pos[1]) && (x < adult_food_pos[0] + 8 && x > adult_food_pos[0])) {
                PS.statusText("Food Problems");
            }
        }
        if (ad_amuse_check) {
            if ((y < adult_amusement_pos[1] + 8 && y > adult_amusement_pos[1]) && (x < adult_amusement_pos[0] + 8 && x > adult_amusement_pos[0])) {
                PS.statusText("Not-So-Amusing Amusement Parks");
            }
        }
        if (ad_sleep_check) {
            if ((y < adult_sleep_pos[1] + 8 && y > adult_sleep_pos[1]) && (x < adult_sleep_pos[0] + 8 && x > adult_sleep_pos[0])) {
                PS.statusText("Sleeping is Hard");
            }
        }
	}
};



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

	//PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

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


	PS.dbSend("StoryGamePrototype", "jacattelona");


    // Add code here to tidy up when Perlenspiel is about to close.
};
*/


