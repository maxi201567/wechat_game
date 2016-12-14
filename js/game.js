// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;
hero.x = canvas.width/2;
hero.y = canvas.height/2;

// Reset the game when the player catches a monster
var reset = function () {

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
	
	if(monster.y > canvas.height-64)monster.y = canvas.height-64;
	if(monster.y < 32)monster.y = 32;
	if(monster.x > canvas.width-64)monster.x = canvas.width-64;
	if(monster.x < 32)monster.x = 32;
};

var deltax = 0;
var deltay = 0;
// Update game objects
var update = function (modifier) {
	document.getElementById("up").onmousedown = function(){deltay = -modifier;};
    document.getElementById("down").onmousedown = function(){deltay = modifier;};
	document.getElementById("left").onmousedown = function(){deltax = -modifier;};
	document.getElementById("right").onmousedown = function(){deltax = modifier;};
	
	document.getElementById("up").onmouseup = function(){deltay = 0;};
    document.getElementById("down").onmouseup = function(){deltay = 0;};
	document.getElementById("left").onmouseup = function(){deltax = 0;};
	document.getElementById("right").onmouseup = function(){deltax = 0;};

    hero.y += hero.speed * deltay;
	hero.x += hero.speed * deltax;
	
	if(hero.y > canvas.height-64)hero.y = canvas.height-64;
	if(hero.y < 32)hero.y = 32;
	if(hero.x > canvas.width-64)hero.x = canvas.width-64;
	if(hero.x < 32)hero.x = 32;
	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
