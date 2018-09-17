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
SOCIAL INTERFACE
****************/
/*
REINIT SOCIAL INTERFACE
- remove banner
- remove social interface
- eventually clear timeout
- eventually clear interval
*/

/*
CRATE SOCIAL BANNER
- social banner constructor
	> background
	> title
- function to generate banner


/*****
TWEETS
******/
/*
GET TWEETS
fetch('js/json/test.json')
	.then(function (resp) {
		return resp.json()
	})
	.then(function (tweets) {

	});
*/

/*
DISPLAY TWEETS
- first tweet :
	> create a div and display it inside

- constructor for ol element
- constructor for li element
- constructor for tweet text
- constructor for tweet user
- constructor for tweet date
- for each tweet :
	> create a new li with different tweet components
*/

/*
SORT TWEETS
- constructor for a button "sort tweet"
- add a listener on this button click
	> if tweetAll : display all tweets
	> if tweetFr : display fr tweets
*/

/*
FAVORITES TWEETS
- constructor for favorite button
- add a listener on favorite button click event
	> use local storage to store favorite tweets
	> update tweet style to highlight favorite tweets
	> transform button into "remove favorite"
	- constructor for favorite button
- add a listener on "remove favorite" button click event
	> remove it from local storage
	> bring back initial tweet style
	> transform button into "favorite"
- update tweets display onload to highlight favorites tweets
*/

/****
TIMER
*****/
/*
- constructor for a timer button
- add events listener on :
	> mousedown
	> click
	> double click
- for each listeners, display time in milliseconds