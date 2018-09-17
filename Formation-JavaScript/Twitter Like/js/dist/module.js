export function testFunc(x) {
	return x;
}
console.log("console");

import testFunc from '/js/modules/01-module-export';
console.log(testFunc(3)); // 3
function addMenuElement(name, gameInitFunction) {
	const menuContainer = document.getElementById("game-nav-id");
	try {
		let menuObject = document.createElement("li");
		let menuObjectText = document.createTextNode(name);
		menuObject.appendChild(menuObjectText);
		menuObject.setAttribute("id", name);
		menuObject.setAttribute("onclick", gameInitFunction);
		menuContainer.appendChild(menuObject);
	} catch (error) {
		console.log("An error occured : " + error.msg);
	}
}

export function createMenu() {
	console.log("createMenu");
	try {
		addMenuElement("Casse-Brique", "casseBriqueInit()");
	} catch (error) {
		console.log("An error occured : " + error.msg);
	}
}
//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}
//------ main.js ------
import { square, diag } from 'lib';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
