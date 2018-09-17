# storage
Allow to store data in the browser.
Data will only be available in the page from where you stored it.
data will be stored as strings.

## session storage
Keep data while page is open. Will be removed once you close the page.

```javascript
//store data
sessionStorage.setItem('favorites', [favorite1,favorite2,favorite3]);

//get data
let getFavorites = sessionStorage.getItem("favorites");

//clear data
sessionStorage.removeItem("favorites");
```

## local storage
Keep data with no expiration time.
```javascript
//store data
localStorage.setItem('higherScore', '10000');

//get data
let higherScore = localStorage.getItem("higherScore");

//clear data
localStorage.removeItem("higherScore");
```