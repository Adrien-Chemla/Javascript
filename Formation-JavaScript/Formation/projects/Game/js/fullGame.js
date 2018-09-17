/***
MENU
****/
/*
CREATE MENU
- new menu item constructor
	> class
	> id
	> title
	> onclick event listener
- function to generate menu
- function call
*/

/***************
Game Construtors
****************/
/*
REINIT GAME INTERFACE
- remove banner
- remove game interface
- eventually clear timeout
- eventually clear interval
*/

/*
CRATE GAME BANNER
- game banner constructor
	> background
	> title
- function to generate banner

/*
CREATE GAME INTERFACE
- constructor for canvas game interface
	> only canvas board
- constructors for div game interface
	> div header
	> div board

- create game object constructor with games common properties and no methods
*/

/**********
MEMORY GAME
***********/
/*
MEMORY GAME OBJECT
- create memory game object
	> header
	> board
	> timer
	> score
	> cards list
	> pair number
	> cards number
	> flip time

- method draw header
- method draw score
- property timer
	> method draw
	> method start
	> method update
	> method stop

- method draw board
- property cards
	> method create
	> method draw
	> method select
	> method win
*/

/*
DRAW MEMORY GAME
- draw header
- draw score
- draw timer
- draw board
- draw cards
*/

/*
INIT MEMORY GAME
- reinit game environment
- draw banner
- create memory game object
- launch game
*/

/************
BREAKOUT GAME
*************/
/*
BREAKOUT GAME OBJECT
- create breakout game object
	> bricks
	> paddle
	> canvas canvasContext
	> life

- ball property
	> radius
	> move
	> ball methods :
		> draw

- paddle property
	> position
	> paddle methods :
		> draw
- add event listener on mouse
	> when mouse move, update paddle position

- bricks property
	> width
	> height
	> bricks methods :
		> init level
		> draw level
		> detect collisions

- method draw score
- method draw life
*/

/*
DRAW BREAKOUT GAME
- redraw canvas on a loop :
	> clear canvas
	> drawLevel
	> draw ball
	> draw paddle
	> draw score
	> draw life
	> detect bricks collision
	> detect wall collision
	> detect paddle collision
	> detect life losing or game over
	> update ball position
*/

/*
INIT BREAKOUT GAME
- reinit game environment
- draw banner
- create breakout game object
- init level
- launch canvas creation loop
*/

"use strict";
/*
const equipe = {
	alek : {
		name : "Alek",
		age : 30,

	},

	adrien : {
		name : "Adrien",
		age : 25
	},

	alexis : {
		name : "Alexis",
		age : 18
	}

};

let tabName = [equipe.alek.name, equipe.adrien.name, equipe.alexis.name]
let tabAge = [equipe.alek.age, equipe.adrien.age, equipe.alexis.age]

for (let key in equipe.adrien) {
	if (equipe.adrien.hasOwnProperty(key)) {
		console.log(key + " : " + equipe.adrien[key]);
	}
}

for (let a=0; a<tabName.length; a++) {
	console.log(tabName[a]);
}

function MembreEquipe(name, age, attaque, defense, vie) {
	this.name = name,
	this.age = age,
	this.attaque = attaque,
	this.defense = defense,
	this.vie = vie

	this.taper = function(target){
		while (target.vie > 0) {
			if(Math.random() > 0.5){
				if (this.attaque > target.defense) {
					target.vie = target.vie - this.attaque;
					alert("Il reste " + target.vie + " points de vie à " + target.name);
					if (target.vie <= this.attaque){
						target.vie = 0;
						alert("Il reste " + target.vie + " points de vie à " + target.name);
						alert(target.name + " GAME OVER, " + this.name + " WIN !");
					}
				}
			} else {
				alert(this.name + " a raté son attaque !")
			}
		} 
	}
}

let adrien = new MembreEquipe("adrien", 25, 1500, 1000, 5000);
let alek = new MembreEquipe("alek", 30, 2000, 500, 2000);
let alexis = new MembreEquipe("alexis", 18, 3000, 500, 2500);

function membreEquipe (parentElement, children1Text){
	//construct child
	let children1 = document.createElement("li");
	let textMembre = document.createTextNode(children1Text);
	children1.appendChild(textMembre);
	children1.setAttribute("id", "idText");
	children1.setAttribute("class", "classText");

	//insert into parent element
	parentElement.appendChild(children1);

}

let tabName = [equipe.alek.name, equipe.adrien.name, equipe.alexis.name]

for (let boucle = 0; boucle < tabName.length; boucle++) {
		membreEquipe(document.getElementById("menu-game"), tabName[boucle]);
}
*/

const canvas = document.getElementById("myCanvas");
const canvasContext = canvas.getContext("2d");

	//attributs de la plateforme
	let barWidth = 10;
	let barHeight = 150;
	let barX = (canvas.width-barHeight)/2;
	let barY = canvas.height - 20;
	let rightPress = false;
	let leftPress = false;
	/**/

	// attributs de la balle
	let ballX = 550;
	let ballY = 400;
	let ballRadius = 2 * Math.PI;
	let ballWidth = 10;
	let directX = 2;
	let directY = -2;

	let interval = setInterval(move, 5);
	//event clavier
	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);

function fillCircle(ballX, ballY) {

	canvasContext.beginPath();
	canvasContext.arc(ballX, ballY, ballWidth, 0, ballRadius);
	canvasContext.fillStyle="#FF0000"
	canvasContext.fill();
	canvasContext.closePath();

}

function fillRect(barX, barY) {

	canvasContext.beginPath();
	canvasContext.rect(barX, barY, barHeight, barWidth);
	canvasContext.fillStyle="#000000";
	canvasContext.fill();
	canvasContext.closePath();

}

function updatePos(){

	ballX = directX + ballX;
	ballY = directY + ballY;

	if(ballX + directX > canvas.width-ballRadius || ballX + directX < ballRadius){
		directX = -directX;
	}
	if(ballY - ballRadius < 0){
		directY = -directY;
	}
	if(ballY + ballRadius >= barY && ballX-ballRadius > barX && ballX + ballRadius < barX + barHeight) {
		directY = -directY;
	}
	if(ballY + ballRadius > canvas.height) {
		clearInterval(interval);
		alert("GAME OVER !")
	}
	
	if(rightPress && barX < canvas.width-barHeight) {
		barX += 7;
	}
	else if(leftPress && barX > 0) {
		barX-= 7;
	}
}

function move() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	fillCircle(ballX, ballY);
	fillRect(barX, barY);
	updatePos();
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPress = true;
    }
    else if(e.keyCode == 37) {
        leftPress = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPress = false;
    }
    else if(e.keyCode == 37) {
        leftPress = false;
    }
}


