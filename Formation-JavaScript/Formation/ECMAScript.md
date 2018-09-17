# ECMAScript
## History
The first version was develop in 10 days in 1995 by Brendan Eich. Its syntax was supposed to look like Java.
This is a an [object oriented](https://developer.mozilla.org/en-US/docs/Learn/Drafts/Python/Quickly_Learn_Object_Oriented_Programming) language which execute in a web browser context on client side.

[Javascript overview](https://developer.mozilla.org/en-US/docs/Web/JavaScript/JavaScript_technologies_overview)

- HTML : page structure.
- CSS : design.
- JavaScript : interactivity.

## Evolution
* **ECMAScript 3 (1999 - IE8+)**
* ECMAScript 5 (2009 – IE9+)
    * Strict mode
    * JSON
* ECMAScript 6 (2015 – IE10+)
    * Destructuring
    * Modules standards
    * Arrow function
    * Map/Set/WeakMap/WeakSet
    * Promise
    * Array.prototype.find
* ECMAScript 7 (2016 – IE11+)
    * Array.prototype.includes
* ECMAScript 8 (2017)
    * async/await

## Babeljs
[Babeljs](https://babeljs.io/) is a powerful website which will rewrite your JavaScript code in a lower ECMA script version.
All you need to do is copy/paste your JavaScript code and ask the website to translate it in the lower ECMA Script version you want.

## Polyfills
A Polyfill is a JavaScript code reproducing a standard JavaScript function.
If the function is not implemented in the browser you are using:
- Search if a polyfill exists for the function you need.
- Then Upload this polyfill at the beginning of the code.
- Finally Use the function as if it was implemented by the browser.

Exemple - Polyfill for 'Promises' :
- [code](https://cdn.jsdelivr.net/npm/promise-polyfill@7/dist/polyfill.min.js)
- [documentation](https://www.npmjs.com/package/promise-polyfill)

Polyfill library :
[polyfill.io](https://polyfill.io/v2/docs/)
