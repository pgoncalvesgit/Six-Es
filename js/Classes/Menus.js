"use strict";

class Menus{

	constructor(document, menusArray){

		this.domElements = {}

		menusArray.forEach(menu => this.domElements[menu] = document.getElementById(menu));
	}
}