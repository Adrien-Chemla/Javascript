# DOM

## selectors
let elementUnique = document.getElementById("elementHTMLid"); //unique HTML element on which we can directly act

let elementsHTMLtag = document.getElementsByTagName("span"); //array of all HTML specified tags. Need a for...loop, forEach or [index] to act on the element

let elementsClass = document.getElementsByClassName("elementsHTMLclass"); //array of all HTML elements which gets this class. Need a for...loop, forEach or [index] to act on the element

let elementCSSunique = document.querySelector(#sectionid); //unique HTML elements targeted like in CSS

let elementsCSS = document.querySelectorAll(div.className a); //Array of links inside the div class="className" target like in CSS.Need a for...loop, forEach or [index] to act on the elements

## naviagte in the DOM

let parentElement = document.getElementById("#parent");

parentElement.children; //will return an array with all children elements (not the text nodes)

parentElement.childNodes; //will return an array with all children NODES (INCLUDING text nodes)

let childElement = document.getElementById("elementId");

childElement.parentNode; //will go up 1 lvl in the DOM

## create elements
Follow these steps :
- define the parent Element
- create a new element
- define the new element properties
- insert the new elements inside the parent

To create an new HTML element, use document.createElement("htmltag");
To specify HTML attributes, use element.setAttribute("attribute", "value");
To insert the elements, use parent.appendChild(child);

//Define parent
const parentElement = document.getElementById("menuParent");
//Create new list element
let children1 = document.createElement("li");
//Add properties
let children1text = document.createTextNode("menu element 1");
children1.appendChild(children1text); //insert text
children1.setAttribute("id", "menuElement1");
children1.setAttribute("class", "menu-element"); //add attributes
//Insert new element inside parent
parentElement.appendChild(children1);

Le résultat sera :
<ul id="menuParent">
	<li id="menuElement1" class="menu-element">
		menu element 1
	</li>
</ul>

## attributes
element.setAttribute("id", "menuElement1");
element.getAttribute("id"); //return "menuElement1"
element.removeAttribute("id"); //will delete the attribute