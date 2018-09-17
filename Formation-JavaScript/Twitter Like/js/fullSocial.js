/***************
social Construtors
****************/
//Reinitialize social environment
function reinitsocialEnvironment() {
	try {
		document.getElementsByClassName("social-banner")[0].innerHTML = "";
		document.getElementById("social-container").innerHTML = "";
	} catch (error) {
		console.log("An error occured in  : " + error.msg);
	}
}

//Banner
function bannerTitle(bannerContainer, social, socialClass) {
	try {
		let bannerTitleObject = document.createElement("div");
		let bannerTitleText = document.createTextNode(social);
		bannerTitleObject.setAttribute("id", "banner-title-" + socialClass);
		bannerTitleObject.setAttribute("class", "social-title");
		bannerTitleObject.appendChild(bannerTitleText);
		bannerContainer.appendChild(bannerTitleObject);
	} catch (error) {
		console.log("An error occured in bannerTitle : " + error.msg);
	}
}

function createBanner(social, socialClass) {
	try {
		const bannerContainer = document.getElementsByClassName("social-banner")[0];
		bannerContainer.setAttribute("id", "banner-" + socialClass);
		bannerTitle(bannerContainer, social, socialClass);
	} catch (error) {
		console.log("An error occured in createBanner : " + error.msg);
	}
}

function socialInit() {
	//try {
	let banner = createBanner("Réseau social", "social");
	//} catch (error) {
	//	console.log("An error occured in casseBriqueInit : " + error.msg);
	//}
}

/***********
 * get tweets
 ************/
"use strict";

document.addEventListener('DOMContentLoaded', function (e) {

	// charger et afficher les tweets de 
	fetch('js/json/test.json')
		.then(function (resp) {
			return resp.json()
		})
		.then(function (tweets) {

			/*******************
			 * DECLARE FUNCTIONS
			 *******************/
			/*** Functions Create Tweet Li ***/
			function createTweetLi(tweet) {
				const comTweet = document.createElement("li");
				const tweetClass = tweet.lang;
				const newTweetId = "tweet" + tweet.id;
				comTweet.setAttribute("id", newTweetId);
				comTweet.setAttribute("class", tweetClass);

				//informations Box
				const comTweetInfoSpan = document.createElement("span");
				comTweetInfoSpan.setAttribute("class", "tweetInfoBox");

				//Content Box
				const comTweetTextSpan = document.createElement("span");
				comTweetTextSpan.setAttribute("class", "tweetTextBox");

				//Action Box
				const comTweetActionSpan = document.createElement("span");
				comTweetActionSpan.setAttribute("class", "tweetActionBox");
				const comTweetActionSpanContainer = document.createElement("span");
				comTweetActionSpan.appendChild(comTweetActionSpanContainer);

				//Construct li
				//Box
				comTweet.appendChild(comTweetInfoSpan);
				comTweet.appendChild(comTweetTextSpan);
				comTweet.appendChild(comTweetActionSpan);

				//Components
				const comTweetUserBox = componentTweetUser(tweet.user.name);
				if (comTweetUserBox !== null) {
					comTweetInfoSpan.appendChild(comTweetUserBox);
				}

				const comTweetDateBox = componentTweetDate(tweet.created_at);
				if (comTweetDateBox !== null) {
					comTweetInfoSpan.appendChild(comTweetDateBox);
				}

				const comTweetTextBox = componentTweetText(tweet.text);
				if (comTweetTextBox !== null) {
					comTweetTextSpan.appendChild(comTweetTextBox);
				}

				const comTweetFavBox = componentTweetFav(newTweetId);
				if (comTweetFavBox !== null) {
					comTweetActionSpanContainer.appendChild(comTweetFavBox);
					comTweetFavBox.addEventListener("click", function () {
						saveFavoriteTweet(newTweetId);
					});
				}

				const comTweetFavRemoveBox = componentTweetFavRemove(newTweetId);
				if (comTweetFavRemoveBox !== null) {
					comTweetActionSpanContainer.appendChild(comTweetFavRemoveBox);
					comTweetFavRemoveBox.addEventListener("click", function () {
						removeFavoriteTweet(newTweetId);
					});
				}

				return comTweet;
			}

			function componentTweetDate(tweetDate) {
				if (tweetDate !== "") {
					const comTweetDate = document.createElement("span");
					const comTweetDateText = document.createTextNode(tweetDate);
					comTweetDate.setAttribute("class", "tweetDate");
					comTweetDate.appendChild(comTweetDateText);
					return comTweetDate;
				} else {
					return null;
				}
			}

			function componentTweetText(tweetText) {
				if (tweetText !== "") {
					const comTweetText = document.createElement("span");
					const comTweetTextString = document.createTextNode(tweetText);
					comTweetText.setAttribute("class", "tweetText");
					comTweetText.appendChild(comTweetTextString);
					return comTweetText;
				} else {
					return null;
				}
			}

			function componentTweetUser(tweetUser) {
				if (tweetUser !== "") {
					const comTweetUser = document.createElement("span");
					const comTweetUserText = document.createTextNode(tweetUser);
					comTweetUser.setAttribute("class", "tweetUser");
					comTweetUser.appendChild(comTweetUserText);
					return comTweetUser;
				} else {
					return null;
				}
			}

			function componentTweetFav(tweetId) {
				if (tweetId !== "") {
					const comTweetFavButton = document.createElement("button");
					comTweetFavButton.append("Favorite");
					comTweetFavButton.setAttribute("class", "tweetFav");
					return comTweetFavButton;
				} else {
					return null;
				}
			}

			function componentTweetFavRemove(tweetId) {
				if (tweetId !== "") {
					const comTweetFavRemoveButton = document.createElement("button");
					comTweetFavRemoveButton.append("Unpick");
					comTweetFavRemoveButton.setAttribute("class", "tweetFavRemove");
					return comTweetFavRemoveButton;
				} else {
					return null;
				}
			}

			let storageFavoriteTweets = [];

			function saveFavoriteTweet(tweetId) {
				//Test if TweetId already exist
				let newTweetId = true;
				if (storageFavoriteTweets.length > 0) {
					storageFavoriteTweets.forEach(function (e) {
						if (tweetId === e) {
							newTweetId = false;
						}
					});
				}

				//Stock all tweet ID in an array
				if (newTweetId === true) {
					storageFavoriteTweets.push(tweetId);
					document.getElementById(tweetId).classList.add("fav");
				}

				//Serialise favorite tweets ID and stock them
				localStorage.setItem("favoritesTweet", JSON.stringify(storageFavoriteTweets));
			}

			function removeFavoriteTweet(tweetId) {
				//Test if TweetId already exist
				let removeTweetId = false;
				if (storageFavoriteTweets.length > 0) {
					storageFavoriteTweets.forEach(function (e) {
						if (tweetId === e) {
							removeTweetId = true;
						}
					});
				}

				//Stock all tweet ID in an array
				if (removeTweetId === true) {
					storageFavoriteTweets.splice(tweetId);
					document.getElementById(tweetId).classList.remove("fav");
				}

				//Serialise favorite tweets ID and stock them
				localStorage.setItem("favoritesTweet", JSON.stringify(storageFavoriteTweets));
			}

			function getFavoriteTweet() {
				const getFavoriteTweets = localStorage.getItem("favoritesTweet");
				JSON.parse(getFavoriteTweets).forEach(function (e) {
					document.getElementById(e).classList.add("fav");
				});
				storageFavoriteTweets = JSON.parse(getFavoriteTweets);
			}

			/*** Function display tweets button ***/

			function displayTweetFunction(f) {
				const clickBtn = f.target.className === "tweetAll" ? f.target.className = "tweetFr" :
					f.target.className =
					"tweetAll";

				//empty tweet list ol
				const tweetList = document.getElementById("listTweets");
				tweetList.innerHTML = "";

				const tweetArray = clickBtn === "tweetFr" ? arrTweetFr : tweets;
				//recreate li
				tweetArray.forEach(function (t) {
					createTweetLi(t);
					const tweetLi = createTweetLi(t);
					listTweets.appendChild(tweetLi);
				})
				getFavoriteTweet();

			}

			/*** Functions create Timer ***/
			function createTimer(lblName, timerID) {
				const timerBox = document.createElement("span");
				timerBox.setAttribute("class", "timerBox");

				const timerBoxlbl = document.createElement("span");
				timerBoxlbl.append(lblName);

				const timerBoxTimer = document.createElement("span");
				timerBoxTimer.append("0000");
				timerBoxTimer.setAttribute("id", timerID);

				const timerBoxUnity = document.createElement("span");
				timerBoxUnity.append("ms");

				timerBox.appendChild(timerBoxlbl);
				timerBox.appendChild(timerBoxTimer);
				timerBox.appendChild(timerBoxUnity);

				return timerBox;
			}

			let mouseDownTimer = 0;
			let mouseDownCount = 0;
			let clicTimer = 0;
			let dblClicTimer = 0;

			function displayMouseDownFunction(e) {
				if (mouseDownCount === 0) {
					mouseDownCount++;
					mouseDownTimer = Math.floor(e.timeStamp);
				}
			};

			function displayClickFunction(e) {
				const clicNumber = clicTimer === 0 ?
					document.getElementById("clic1") : document.getElementById(
						"clic2");
				clicTimer = Math.floor(e.timeStamp - mouseDownTimer);
				clicNumber.innerText = clicTimer;
			};

			function displayDoubleClickFunction(e) {
				dblClicTimer = Math.floor(e.timeStamp - mouseDownTimer);
				document.getElementById("dblclic").innerText = dblClicTimer;
				//Empty Values
				mouseDownTimer = 0;
				mouseDownCount = 0;
				clicTimer = 0;
				dblClicTimer = 0;
			};

			//Create Header
			var tweetsHeader = document.getElementsByClassName("social-banner")[0];

			//Create main container
			var tweetsContainer = document.getElementById("social-container");

			//Create div for 1st tweet
			var divTweet = document.createElement("div");
			var tweetText = document.createTextNode(tweets[0].text);
			divTweet.appendChild(tweetText);
			divTweet.setAttribute("id", "firstTweet");
			divTweet.setAttribute("class", "tweets");
			tweetsContainer.appendChild(divTweet);

			// afficher dans la console les text de tous les tweets du tableau en utilisant .forEach
			/*
			tweets.forEach(function (t) {
				console.log(t.text);
			})
			*/

			// créer un tableau avec seulement tous les textes des tweets
			const arrTweetText = tweets.map(function (t) {
				return t.text;
			});

			// créer un tableau avec seulement les dates de publication (created_at)
			const arrTweetDate = tweets.map(function (t) {
				return t.created_at;
			});

			// créer un tableau avec seulement les tweets en français
			const arrTweetFr = tweets.filter(function (t) {
				//console.log(t.lang);
				return t.lang === "fr";
			});

			//Afficher tous les tweets dans un ol
			const listTweets = document.createElement("ol");
			listTweets.setAttribute("id", "listTweets");
			listTweets.setAttribute("class", "tweets");
			tweetsContainer.appendChild(listTweets);
			tweets.forEach(function (t) {
				createTweetLi(t);
				const tweetLi = createTweetLi(t);
				listTweets.appendChild(tweetLi);
			})

			// (pause)
			// Créer et ajouter un <button> qui quand on clique dessus affiche 'click' dans la console.
			const displayTweetBtn = document.createElement("button");
			const tweetBtnTxt = document.createTextNode("Sort Tweets");
			displayTweetBtn.appendChild(tweetBtnTxt);
			displayTweetBtn.setAttribute("id", "displayTweet");
			displayTweetBtn.setAttribute("class", "tweetAll");
			displayTweetBtn.addEventListener("click", function (e) {
				console.log("click !");
				displayTweetFunction(e);
			});
			tweetsHeader.appendChild(displayTweetBtn);

			// (pause)

			// Faites un bouton (un peu gros) qui écoute mousedown/click/dblclick et mesure le temps de click et de doubleclick 
			// et affiche tempsClic1, tempsClic2, tempsDoubleClic
			const displayTimeBtn = document.createElement("button");
			const timeBtnTxt = document.createTextNode("Time");
			displayTimeBtn.appendChild(timeBtnTxt);
			displayTimeBtn.setAttribute("id", "displayTime");
			displayTimeBtn.setAttribute("class", "timer");
			displayTimeBtn.addEventListener("mousedown", displayMouseDownFunction);
			displayTimeBtn.addEventListener("click", displayClickFunction);
			displayTimeBtn.addEventListener("dblclick", displayDoubleClickFunction);
			tweetsHeader.appendChild(displayTimeBtn);

			const tempsClic1 = createTimer("temps clic 1 : ", "clic1");
			tweetsHeader.appendChild(tempsClic1);
			const tempsClic2 = createTimer("temps clic 2 : ", "clic2");
			tweetsHeader.appendChild(tempsClic2);
			const tempsDblClic = createTimer("temps double clic : ", "dblclic");
			tweetsHeader.appendChild(tempsDblClic);

			// Créer plusieurs fichiers avec du code
			// * createTweetLi.js
			// * createTweetsOl.js
			// * createClickTimeButton.js
			// * main.js

			// charger tout ça via des <script defer src="..."> dans le <head>
		})
		.catch(function (e) {
			console.error(e)
		});


})

/**********************
Set up social Environment
***********************/
function addMenuElement(name, socialInitFunction) {
	try {
		const menuContainer = document.getElementById("social-nav-id").getElementsByTagName("ul")[0];
		let menuClass = name.replace(/ /g, "-").toLowerCase();
		let menuObject = document.createElement("li");
		let menuObjectText = document.createTextNode(name);
		menuObject.appendChild(menuObjectText);
		menuObject.setAttribute("id", menuClass);
		menuObject.setAttribute("onclick", socialInitFunction);
		menuContainer.appendChild(menuObject);
	} catch (error) {
		console.log("An error occured in addMenuElement : " + error.msg);
	}
}

function createMenu() {
	try {
		addMenuElement("Réseau Social", "socialInit()");
	} catch (error) {
		console.log("An error occured in createMenu : " + error.msg);
	}
}

function setUpsocialEnvironment() {
	try {
		createMenu();
	} catch (error) {
		console.log("An error occured in setUpsocialEnvironment : " + error.msg);
	}
}

//launch javascript when page is ready
$(document).ready(function () {
	setUpsocialEnvironment();
});