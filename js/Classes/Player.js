"use strict";

class Player{

	constructor(){

		this.name;
		this.level;
		this.campain;
		this.endless;
		this.spaceships;
		this.tutorial;
	
	}
	
	createPlayer(name){
		this.name       = name;
		this.level      = 0;
		this.campain    = 0;
		this.endless    = 0;
		this.spaceships = "10000";
		this.tutorial   = "00";
		this.setCookie();
	}

	setCookie(){

		document.cookie = this.name + "Level=" 	    + this.level      + ";expires=Thu, 02 Jan 2023 00:00:00 UTC;path=/";
		document.cookie = this.name + "Campain="    + this.campain    + ";expires=Thu, 02 Jan 2023 00:00:00 UTC;path=/";
		document.cookie = this.name + "Endless="    + this.endless    + ";expires=Thu, 02 Jan 2023 00:00:00 UTC;path=/";
		document.cookie = this.name + "Spaceships=" + this.spaceships + ";expires=Thu, 02 Jan 2023 00:00:00 UTC;path=/";
		document.cookie = this.name + "Tutorial="   + this.tutorial   + ";expires=Thu, 02 Jan 2023 00:00:00 UTC;path=/";

	}

	getCookie(){
		var searchLevel 	 = this.name + "Level";
		var searchCampain    = this.name + "Campain";
		var searchEndless    = this.name + "Endless";
		var searchSpaceships = this.name + "Spaceships";
		var searchTutorial   = this.name + "Tutorial";

		var counter = 0;


		var decodedCookies = decodeURIComponent(document.cookie);
		var splitedCookies = decodedCookies.split(';');
		for(let cookie in splitedCookies) {
			var splitedCookie = splitedCookies[cookie].split('=');

			while(splitedCookie[0][0] == ' '){
				splitedCookie[0] = splitedCookie[0].substring(1);
			}

			if(splitedCookie[0].indexOf(this.name) == 0 &&
				(splitedCookie[0].substring(this.name.length) == "Level"      ||
				 splitedCookie[0].substring(this.name.length) == "Campain"    ||
				 splitedCookie[0].substring(this.name.length) == "Endless"    ||
				 splitedCookie[0].substring(this.name.length) == "Spaceships" ||
				 splitedCookie[0].substring(this.name.length) == "Tutorial") ) {
				if (splitedCookie[0].indexOf(searchLevel) == 0) {
					this.level = splitedCookie[1];
				}
				else if (splitedCookie[0].indexOf(searchCampain) == 0) {
					this.campain = splitedCookie[1];
				}
				else if (splitedCookie[0].indexOf(searchEndless) == 0) {
					this.endless = splitedCookie[1];
				}
				else if (splitedCookie[0].indexOf(searchSpaceships) == 0) {
					this.spaceships = splitedCookie[1];
				}
				else if (splitedCookie[0].indexOf(searchTutorial) == 0) {
					this.tutorial = splitedCookie[1];
				}
			}
		}
	}






	updateCoockiesLevel(auxMisc, buttons, level){
	 	if(parseInt(this.level) == level - 1){
	 		this.level = level;
	 		buttons["levelMenu"][this.level].style.display = "block";
	 		this.setCookie();
	 		return level;
	 	}
	 	return -1;
	}

	updateCoockiesCampain(auxMisc, buttons, points){
	 	if(parseInt(this.campain) < points){
	 		this.campain = points
	 		this.setCookie();
	 	}
	}

	updateCoockiesEndless(auxMisc, buttons, points){
	 	if(parseInt(this.endless) < points){
	 		this.endless = points
	 		this.setCookie();
	 	}
	}


	updateCoockiesSpaceships(auxMisc, spaceship){
	 	if(this.spaceships.charAt(spaceship) == "0"){
			this.spaceships = this.spaceships.substring(0, spaceship) + "1" + this.spaceships.substring(spaceship + 1);
			this.setCookie();
	 	}
	}


	updateCoockiesTutorial(auxMisc, valorControlHelp){
		this.tutorial = valorControlHelp
		this.setCookie();
	}

	//to string, can be used for debugging
	toString(){
		return 	"Bulk: CoordefillerTexts (" + this.positionX 	+ "," 			+ this.positionY 	+ ")"
			+ 	" Width: " 				+ this.width 		+ " Heigth: " 	+ this.height
			+ 	" Velocidade -> " 		+ this.speed
			+ 	" Clickable: " 			+ this.clickable 	+ " Dragable: " + this.dragable
			+	" Rotacao: " 			+ this.direction;
	}
}
