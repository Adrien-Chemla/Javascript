/***************
Game Construtors
****************/
//Reinitialize game environment
function reinitGameEnvironment() {
	try {
		document.getElementsByClassName("game-banner")[0].innerHTML = "";
		document.getElementById("game-container").innerHTML = "";
		if (newMemoryGame.timeUpdate) {
			clearInterval(newMemoryGame.timeUpdate);
		}
		if (newCasseBriqueGame.gameUpdate) {
			clearTimeout(newCasseBriqueGame.gameUpdate);
		}
	} catch (error) {
		console.log("An error occured in  : " + error.msg);
	}
}

//Banner
function bannerTitle(bannerContainer, game, gameClass) {
	try {
		let bannerTitleObject = document.createElement("div");
		let bannerTitleText = document.createTextNode(game);
		bannerTitleObject.setAttribute("id", "banner-title-" + gameClass);
		bannerTitleObject.setAttribute("class", "game-title");
		bannerTitleObject.appendChild(bannerTitleText);
		bannerContainer.appendChild(bannerTitleObject);
	} catch (error) {
		console.log("An error occured in bannerTitle : " + error.msg);
	}
}

function createBanner(game, gameClass) {
	try {
		const bannerContainer = document.getElementsByClassName("game-banner")[0];
		bannerContainer.setAttribute("id", "banner-" + gameClass);
		bannerTitle(bannerContainer, game, gameClass);
	} catch (error) {
		console.log("An error occured in createBanner : " + error.msg);
	}
}

//Game Interface
function setUpGame(game, gameClass, gameEnv) {
	try {
		const gameContainer = document.getElementById("game-container");
		let gameContainerInterface = document.createElement(gameEnv);
		gameContainerInterface.setAttribute("id", "interface-" + gameClass);
		gameContainerInterface.setAttribute("class", "game-interface");
		if (gameEnv === "canvas") {
			gameContainerInterface.setAttribute("width", "1160");
			gameContainerInterface.setAttribute("height", "600");
		}
		gameContainer.appendChild(gameContainerInterface);
		let gameInterfaceInformation = {
			gameCanvas: gameContainerInterface,
			gameInterfaceInfo: gameContainerInterface.getBoundingClientRect()
		}
		return gameInterfaceInformation;
	} catch (error) {
		console.log("An error occured in setUpGame : " + error.msg);
	}
}
let GameObject = function (gameCanvas, gameInfo) {
	this.id = gameCanvas.id;
	this.name = gameCanvas.name;
	this.divWidth = gameInfo.width;
	this.divHeight = gameInfo.height;
	this.width = gameCanvas.width;
	this.height = gameCanvas.height;
	this.top = gameInfo.top;
	this.right = gameInfo.right;
	this.bottom = gameInfo.bottom;
	this.left = gameInfo.left;
	this.gameCanvas = gameCanvas;
	this.score = 0;
	this.life = 1;
	this.time = 0;
	this.timeUpdate = "";
}

/******************
 * CASSE BRIQUE GAME
 *******************/

let GameCasseBrique = function (gameCanvas, gameInfo) {
	//inherit from gameObject
	GameObject.call(this, gameCanvas, gameInfo);
	this.bricks = [];
	this.life = 3;
	this.gameContext = gameCanvas.getContext("2d");
	this.x = this.width / 2;
	this.y = this.height - 30;
	this.paddleWidth = 100;
	this.paddleHeight = 15;
	this.rightPressed = false;
	this.leftPressed = false;
}

//GameCasseBrique.prototype = Object.create(GameObject.prototype);
//GameCasseBrique.prototype.constructor = GameCasseBrique;
let newCasseBriqueGame = "";

function createGameCasseBriqueObject(casseBriqueCanvas, casseBriqueInfos) {
	newCasseBriqueGame = new GameCasseBrique(casseBriqueCanvas, casseBriqueInfos);

	newCasseBriqueGame.ball = {
		radius: 10,
		moveX: 5,
		moveY: -5,
		draw: function () {
			newCasseBriqueGame.gameContext.beginPath();
			let ballImage = new Image();
			ballImage.src = "images/breakout-ball.png";
			newCasseBriqueGame.gameContext.drawImage(ballImage, newCasseBriqueGame.x, newCasseBriqueGame.y, newCasseBriqueGame.ball.radius * 2, newCasseBriqueGame.ball.radius * 2);
			//newCasseBriqueGame.gameContext.arc(newCasseBriqueGame.x, newCasseBriqueGame.y, newCasseBriqueGame.ball.radius, 0, Math.PI * 2);
			//newCasseBriqueGame.gameContext.fillStyle = "#ff0000";
			//newCasseBriqueGame.gameContext.fill();
			newCasseBriqueGame.gameContext.closePath();
		}
	};

	newCasseBriqueGame.paddle = {
		x: (newCasseBriqueGame.width - newCasseBriqueGame.paddleWidth) / 2,
		draw: function () {
			newCasseBriqueGame.gameContext.beginPath();
			newCasseBriqueGame.gameContext.rect(newCasseBriqueGame.paddle.x, newCasseBriqueGame.height - (newCasseBriqueGame.paddleHeight * 3), newCasseBriqueGame.paddleWidth, newCasseBriqueGame.paddleHeight);
			newCasseBriqueGame.gameContext.fillStyle = "#00a2ff";
			newCasseBriqueGame.gameContext.fill();
			newCasseBriqueGame.gameContext.closePath();
		}
	};

	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
	document.addEventListener("mousemove", mouseMoveHandler, false);

	function keyDownHandler(e) {
		if (e.keyCode == 39) {
			newCasseBriqueGame.rightPressed = true;
		} else if (e.keyCode == 37) {
			newCasseBriqueGame.leftPressed = true;
		}
	}

	function keyUpHandler(e) {
		if (e.keyCode == 39) {
			newCasseBriqueGame.rightPressed = false;
		} else if (e.keyCode == 37) {
			newCasseBriqueGame.leftPressed = false;
		}
	}

	function mouseMoveHandler(e) {
		var relativeX = e.clientX - newCasseBriqueGame.left;
		if (relativeX > 0 && relativeX < newCasseBriqueGame.width) {
			newCasseBriqueGame.paddle.x = relativeX - newCasseBriqueGame.paddleWidth / 2;
		}
	}

	newCasseBriqueGame.brick = {
		width: 100,
		height: 40,
		initLevel: function (brickRowNumber, brickColNumber) {
			for (var c = 0; c < brickColNumber; c++) {
				newCasseBriqueGame.bricks[c] = [];
				for (var r = 0; r < brickRowNumber; r++) {
					newCasseBriqueGame.bricks[c][r] = {
						x: 0,
						y: 0,
						status: 1
					};
				}
			}
		},
		drawLevel: function (brickRowNumber, brickColNumber) {
			for (var c = 0; c < brickColNumber; c++) {
				for (var r = 0; r < brickRowNumber; r++) {
					if (newCasseBriqueGame.bricks[c][r].status == 1) {
						let brickX = (r * newCasseBriqueGame.brick.width) + (newCasseBriqueGame.brick.width * 2);
						let brickY = (c * newCasseBriqueGame.brick.height) + newCasseBriqueGame.brick.height;
						newCasseBriqueGame.bricks[c][r].x = brickX;
						newCasseBriqueGame.bricks[c][r].y = brickY;
						newCasseBriqueGame.gameContext.beginPath();
						newCasseBriqueGame.gameContext.rect(brickX, brickY, newCasseBriqueGame.brick.width, newCasseBriqueGame.brick.height);
						newCasseBriqueGame.gameContext.lineWidth = "1";
						newCasseBriqueGame.gameContext.fillStyle = "#236a8c";
						newCasseBriqueGame.gameContext.fill();
						newCasseBriqueGame.gameContext.strokeStyle = "#1a536f";
						newCasseBriqueGame.gameContext.stroke();
						newCasseBriqueGame.gameContext.closePath();
					}
				}
			}
		},
		collisionDetection: function (brickRowNumber, brickColNumber) {
			let levelFinish = true;
			for (var c = 0; c < brickColNumber; c++) {
				for (var r = 0; r < brickRowNumber; r++) {
					let b = newCasseBriqueGame.bricks[c][r];
					if (b.status == 1) {
						levelFinish = false;
						//Ball
						let ballSize = newCasseBriqueGame.ball.radius * 2;
						let ballCenter = newCasseBriqueGame.ball.radius;
						let ballLeftX = newCasseBriqueGame.x;
						let ballRightX = newCasseBriqueGame.x + ballSize;
						let ballTopY = newCasseBriqueGame.y;
						let ballBottomY = newCasseBriqueGame.y + ballSize;

						//Brick
						let brickLeftX = b.x;
						let brickRightX = b.x + newCasseBriqueGame.brick.width;
						let brickTopY = b.y;
						let brickBottomY = b.y + newCasseBriqueGame.brick.height;

						if (ballRightX > brickLeftX && ballLeftX < brickRightX && ballBottomY > brickTopY && ballTopY < brickBottomY) {
							console.log("collision");
							if (newCasseBriqueGame.ball.moveY < 0) {
								if ((ballTopY + ballCenter) < brickBottomY) {
									newCasseBriqueGame.ball.moveX = -(newCasseBriqueGame.ball.moveX);
								} else {
									newCasseBriqueGame.ball.moveY = -(newCasseBriqueGame.ball.moveY);
								}
							} else {
								if ((ballTopY + ballCenter) > brickTopY) {
									newCasseBriqueGame.ball.moveX = -(newCasseBriqueGame.ball.moveX);
								} else {
									newCasseBriqueGame.ball.moveY = -(newCasseBriqueGame.ball.moveY);
								}
							}
							b.status = 0;
							newCasseBriqueGame.score += 100;
						}
					}
				}
			}
			if (levelFinish === true) {
				alert("YOU WIN, CONGRATS!");
				//document.location.reload();
			}
		}
	};

	newCasseBriqueGame.drawScore = function () {
		newCasseBriqueGame.gameContext.font = "16px Arial";
		newCasseBriqueGame.gameContext.fillStyle = "#0095DD";
		newCasseBriqueGame.gameContext.fillText("Score: " + newCasseBriqueGame.score, 8, 20);
	};

	newCasseBriqueGame.drawLife = function () {
		newCasseBriqueGame.gameContext.font = "16px Arial";
		newCasseBriqueGame.gameContext.fillStyle = "#0095DD";
		newCasseBriqueGame.gameContext.fillText("Lives: " + newCasseBriqueGame.life, newCasseBriqueGame.width - 65, 20);
	};

	return newCasseBriqueGame;
}

function gameCasseBriqueLaunch(go) {
	go.gameContext.clearRect(0, 0, go.width, go.height);
	go.brick.drawLevel(8, 5);
	go.ball.draw();
	go.paddle.draw();
	go.drawScore();
	go.drawLife();
	go.brick.collisionDetection(8, 5);

	if (go.x + go.ball.moveX > go.width - go.ball.radius || go.x + go.ball.moveX < go.ball.radius) {
		go.ball.moveX = -(go.ball.moveX);
	}
	if (go.y + go.ball.moveY < go.ball.radius) {
		go.ball.moveY = -(go.ball.moveY);
	}
	if ((go.x > go.paddle.x && go.x < go.paddle.x + go.paddleWidth) && (go.y + go.ball.moveY > go.height - go.ball.radius - (go.paddleHeight * 3))) {
		go.ball.moveY = -(go.ball.moveY);
	} else if (go.y + go.ball.moveY > go.height - go.ball.radius) {
		go.life--;
		if (!go.life) {
			alert("GAME OVER");
			document.location.reload();
		} else {
			go.x = go.width / 2;
			go.y = go.height - (go.paddleHeight * 3);
			go.ball.moveX = 5;
			go.ball.moveY = -5;
			go.paddle.x = (go.width - go.paddleWidth) / 2;
		}
	}

	if (go.rightPressed && go.paddle.x < go.width - go.paddle.width) {
		go.paddle.x += 7;
	} else if (go.leftPressed && go.paddle.x > 0) {
		go.paddle.x -= 7;
	}

	go.x += go.ball.moveX;
	go.y += go.ball.moveY;
	//requestAnimationFrame(gameCasseBriqueLaunch(go));
	go.gameUpdate = setTimeout(function () {
		gameCasseBriqueLaunch(go)
	}, 10);
}

function casseBriqueInit() {
	//try {
	reinitGameEnvironment();
	let banner = createBanner("Casse Brique", "casse-brique");
	let gameSetUpInfo = setUpGame("Casse Brique", "casse-brique", "canvas");
	let gameCasseBriqueObject = createGameCasseBriqueObject(gameSetUpInfo.gameCanvas, gameSetUpInfo.gameInterfaceInfo);
	gameCasseBriqueObject.brick.initLevel(8, 5);
	gameCasseBriqueLaunch(gameCasseBriqueObject);
	//} catch (error) {
	//	console.log("An error occured in casseBriqueInit : " + error.msg);
	//}
}

/******************
 * MEMORY GAME
 *******************/
let GameMemory = function (gameCanvas, gameInfo) {
	//inherit from gameObject
	GameObject.call(this, gameCanvas, gameInfo);
	this.header = "";
	this.board = "";
	this.timerBox = "";
	this.scoreBox = "";
	this.cards = [
		"card_amaterasu",
		"card_anima",
		"card_bahamut",
		"card_hashmal",
		"card_ifrit",
		"card_mateus",
		"card_nosferatu",
		"card_phoenix"
	];
	this.pairCount = 8;
	this.cardCount = this.pairCount * 2;
	this.flipTime = 1000;
	this.scoreIncrease = 100;
}

let newMemoryGame = "";

function createGameMemoryObject(memoryCanvas, memoryInfos) {
	newMemoryGame = new GameMemory(memoryCanvas, memoryInfos);

	newMemoryGame.drawHeader = function () {
		let memoryHeader = document.createElement("div");
		memoryHeader.setAttribute("class", "game-header");
		memoryHeader.setAttribute("id", "memory-header");
		newMemoryGame.gameCanvas.appendChild(memoryHeader);
		newMemoryGame.header = memoryHeader;
	};

	newMemoryGame.drawScore = function () {
		let memoryScore = document.createElement("div");
		memoryScore.setAttribute("class", "game-score");
		memoryScore.setAttribute("id", "memory-score");

		let memoryScoreLabel = document.createElement("span");
		memoryScoreLabel.setAttribute("class", "score-label");
		memoryScoreLabel.innerHTML = "Score : ";
		memoryScore.appendChild(memoryScoreLabel);

		let memoryScoreCounter = document.createElement("span");
		memoryScoreCounter.setAttribute("class", "score-counter");
		memoryScoreCounter.innerHTML = newMemoryGame.score;
		memoryScore.appendChild(memoryScoreCounter);

		newMemoryGame.header.appendChild(memoryScore);
		newMemoryGame.scoreBox = memoryScoreCounter;
	};

	newMemoryGame.timer = {
		count: 100,
		draw: function () {
			let memoryTimer = document.createElement("div");
			memoryTimer.setAttribute("class", "game-timer");
			memoryTimer.setAttribute("id", "memory-timer");

			let memoryTimerLabel = document.createElement("span");
			memoryTimerLabel.setAttribute("class", "timer-label");
			memoryTimerLabel.innerHTML = "Time : ";
			memoryTimer.appendChild(memoryTimerLabel);

			let memoryTimerCounter = document.createElement("span");
			memoryTimerCounter.setAttribute("class", "timer-counter");
			memoryTimerCounter.innerHTML = newMemoryGame.time;
			memoryTimer.appendChild(memoryTimerCounter);

			newMemoryGame.header.appendChild(memoryTimer);
			newMemoryGame.timerBox = memoryTimerCounter;
		},
		start: function () {
			newMemoryGame.timeUpdate = setInterval(newMemoryGame.timer.update, newMemoryGame.timer.count);
		},
		update: function () {
			if (newMemoryGame.time === 0) {
				newMemoryGame.time = new Date(newMemoryGame.time);
			}
			newMemoryGame.time.setTime(newMemoryGame.time.getTime() + newMemoryGame.timer.count);
			newMemoryGame.timerBox.innerHTML = newMemoryGame.time.getMinutes() + ":" + newMemoryGame.time.getSeconds() + ":" + newMemoryGame.time.getMilliseconds();
		},
		stop: function () {
			clearInterval(newMemoryGame.timeUpdate);
		}
	};

	newMemoryGame.drawBoard = function () {
		let memoryBoard = document.createElement("div");
		memoryBoard.setAttribute("class", "game-board");
		memoryBoard.setAttribute("id", "memory-board");
		newMemoryGame.gameCanvas.appendChild(memoryBoard);
		newMemoryGame.board = memoryBoard;
	};

	newMemoryGame.card = {
		selectedCard: "",
		selectedCardName: "",
		create: function (cardName) {
			let cardImageSrc = "./images/" + cardName + ".jpg";

			let memoryCard = document.createElement("div");
			memoryCard.setAttribute("class", "memory-card");

			let memoryCardImg = document.createElement("img");
			memoryCardImg.setAttribute("name", cardName);
			memoryCardImg.setAttribute("class", "unflip");
			memoryCardImg.dataset.src = cardImageSrc;
			memoryCardImg.src = "./images/card_back.jpg";
			memoryCardImg.dataset.click = "newMemoryGame.card.selected(this)";
			memoryCardImg.setAttribute("onclick", "newMemoryGame.card.selected(this)");
			memoryCard.appendChild(memoryCardImg);

			newMemoryGame.board.appendChild(memoryCard);
		},
		draw: function () {
			let cardsArray = newMemoryGame.cards.splice(0, newMemoryGame.pairCount);
			let pairArray = cardsArray.concat(cardsArray);
			let sortArray = pairArray.sort(function () {
				return 0.5 - Math.random();
			});

			for (c = 0; c < sortArray.length; c++) {
				newMemoryGame.card.create(sortArray[c]);
			}
		},
		winCondition: function () {
			let allCards = document.getElementsByClassName("memory-card");
			for (c = 0; c < allCards.length; c++) {
				let allCardsImg = allCards[c].getElementsByTagName("img")[0];
				if (allCardsImg.className === "unflip") {
					return false;
				}
			}
			return true;
		},
		selected: function (flippedCard) {
			if (newMemoryGame.time === 0) {
				newMemoryGame.timer.start();
			}
			flippedCard.setAttribute("onclick", "");
			flippedCard.src = flippedCard.dataset.src;
			flippedCard.setAttribute("class", "flip");
			if (newMemoryGame.card.selectedCardName === "") {
				newMemoryGame.card.selectedCard = flippedCard;
				newMemoryGame.card.selectedCardName = flippedCard.name;
			} else {
				if (newMemoryGame.card.selectedCardName === flippedCard.name) {
					newMemoryGame.score += newMemoryGame.scoreIncrease;
					newMemoryGame.scoreBox.innerHTML = newMemoryGame.score;

					let win = newMemoryGame.card.winCondition();
					if (win === true) {
						newMemoryGame.timer.stop();
						alert("Congratulation !");
					}

				} else {
					let thisCard = flippedCard;
					let firstCard = newMemoryGame.card.selectedCard;
					setTimeout(function () {
						thisCard.setAttribute("class", "unflip");
						thisCard.setAttribute("onclick", thisCard.dataset.click);
						thisCard.src = "./images/card_back.jpg";
						firstCard.setAttribute("class", "unflip");
						firstCard.setAttribute("onclick", firstCard.dataset.click);
						firstCard.src = "./images/card_back.jpg";
					}, newMemoryGame.flipTime);
				}
				newMemoryGame.card.selectedCardName = "";
				newMemoryGame.card.selectedCard = "";
				flippedCard = "";
			}
		}
	};


	return newMemoryGame;
}

function gameMemoryLaunch(go) {
	go.drawHeader();
	go.drawScore();
	go.timer.draw();
	go.drawBoard();
	go.card.draw();
}

function memoryInit() {
	//try {
	reinitGameEnvironment();
	let banner = createBanner("Memory", "memory");
	let gameSetUpInfo = setUpGame("Memory", "memory", "div");
	let gameMemoryObject = createGameMemoryObject(gameSetUpInfo.gameCanvas, gameSetUpInfo.gameInterfaceInfo);
	gameMemoryLaunch(gameMemoryObject);
	//} catch (error) {
	//	console.log("An error occured in casseBriqueInit : " + error.msg);
	//}
}

/**********************
Set up Game Environment
***********************/
function addMenuElement(name, gameInitFunction) {
	try {
		const menuContainer = document.getElementById("game-nav-id").getElementsByTagName("ul")[0];
		let menuClass = name.replace(/ /g, "-").toLowerCase();
		let menuObject = document.createElement("li");
		let menuObjectText = document.createTextNode(name);
		menuObject.appendChild(menuObjectText);
		menuObject.setAttribute("id", menuClass);
		menuObject.setAttribute("onclick", gameInitFunction);
		menuContainer.appendChild(menuObject);
	} catch (error) {
		console.log("An error occured in addMenuElement : " + error.msg);
	}
}

function createMenu() {
	try {
		addMenuElement("Casse Brique", "casseBriqueInit()");
		addMenuElement("Memory", "memoryInit()");
	} catch (error) {
		console.log("An error occured in createMenu : " + error.msg);
	}
}

function setUpGameEnvironment() {
	try {
		createMenu();
	} catch (error) {
		console.log("An error occured in setUpGameEnvironment : " + error.msg);
	}
}

//launch javascript when page is ready
$(document).ready(function () {
	setUpGameEnvironment();
});