"use strict";


(function()
{	
	window.addEventListener("load", main);
}());

function main(){



	//player.setCookie("Henrique", 3, 100, 999,"11111","00");
	//player.setCookie("Carlos", 3, 99, 1000,"11000","00");
	//player.setCookie("Paulo", 2, 10, 20,"11000","00");


	//this way we can pass by reference
	//currentMenu used to remove liseners from the page where the menu appears
	var auxMisc = new GlobalVariables();



	//extra references to the DOM
	var domAux = new DomElements(
		document.getElementById("textPop"),
		document.getElementById("playerCredits"),
		document.getElementById("name"),
		document.getElementById("playerLevel"),
		document.getElementById("playerMain"),
		document.getElementById("playerLeaderBoard")
	)




	//load of the spaceships in the beggining to get the natural width and height
	var nToLoad  = {"spaceship0": 5 , "spaceship1": 5 };
	var nLoaded  = {"spaceship0": 0 , "spaceship1": 0 };
	var imgsMenu = {"spaceship0": [], "spaceship1": []};
	var imgs;
	var sounds;
	var musics;
	var player = new Player();



	//saves buttons reference to the DOM
	//this way we can add/remove listeners freely
	var buttons = {"pauseMenu": [], "startMenu" : [], "loginRegMenu": [], "popUpMenu" : [], "mainMenu" : [],"levelMenu": [], "chooseSpaceshipMenu": [], "leaderBoard" : [], "controlsMenu":[], "creditsMenu":[], "helpMenu":[] };


	//saves buttons reference to the DOM
	//this way we can do style.block and style.none to display and hide menus
	var menus = new Menus(document, auxMisc["menusArray"]);


	//used to change background colour
	var body = document.getElementsByTagName("body")[0];



    loadEndingHandlers(auxMisc, menus, buttons, imgs, sounds, musics, body, domAux, player, domSpaceships);
	initMenu(nLoaded, nToLoad, imgsMenu);



	//pause
	var muteM = document.getElementById("pauseMenu_0");
	buttons["pauseMenu"].push(muteM);
	var volumeLowM = document.getElementById("pauseMenu_1");
	buttons["pauseMenu"].push(volumeLowM);
	var volumeHighM   = document.getElementById("pauseMenu_2");
	buttons["pauseMenu"].push(volumeHighM);
	
	var muteS = document.getElementById("pauseMenu_3");
	buttons["pauseMenu"].push(muteS);
	var volumeLowS = document.getElementById("pauseMenu_4");
	buttons["pauseMenu"].push(volumeLowS);
	var volumeHighS   = document.getElementById("pauseMenu_5");
	buttons["pauseMenu"].push(volumeHighS);

	var back = document.getElementById("pauseMenu_6");
	buttons["pauseMenu"].push(back);

	//startMenu
	var startButon = document.getElementById("startMenu_0");
	buttons["startMenu"].push(startButon);


	//loginRegMenu
	var signUpButon = document.getElementById("loginRegMenu_0");
	buttons["loginRegMenu"].push(signUpButon);
	var loginButon = document.getElementById("loginRegMenu_1");
	buttons["loginRegMenu"].push(loginButon);

	//popUpMenu
	var yesButon = document.getElementById("popUpMenu_0");
	buttons["popUpMenu"].push(yesButon);
	var okButon = document.getElementById("popUpMenu_1");
	buttons["popUpMenu"].push(okButon);
	var noButon = document.getElementById("popUpMenu_2");
	buttons["popUpMenu"].push(noButon);

	//mainMenu
	var campain = document.getElementById("mainMenu_0");
	buttons["mainMenu"].push(campain);
	var endless = document.getElementById("mainMenu_1");
	buttons["mainMenu"].push(endless);
	var editor   = document.getElementById("mainMenu_2");
	buttons["mainMenu"].push(editor);

	var leave   = document.getElementById("mainMenu_3");
	buttons["mainMenu"].push(leave);
	var help   = document.getElementById("mainMenu_4");
	buttons["mainMenu"].push(help);
	var credits = document.getElementById("mainMenu_5");
	buttons["mainMenu"].push(credits);
	var leaderBoard = document.getElementById("mainMenu_6");
	buttons["mainMenu"].push(leaderBoard);
	var controls = document.getElementById("mainMenu_7");
	buttons["mainMenu"].push(controls);

	//levelMenu
	var level1 = document.getElementById("levelMenu_0");
	buttons["levelMenu"].push(level1);
	var level2 = document.getElementById("levelMenu_1");
	buttons["levelMenu"].push(level2);
	var level3   = document.getElementById("levelMenu_2");
	buttons["levelMenu"].push(level3);
	var speedrun   = document.getElementById("levelMenu_3");
	buttons["levelMenu"].push(speedrun);
	var back   = document.getElementById("levelMenu_4");
	buttons["levelMenu"].push(back);

	//chooseSpaceshipMenu
	var left = document.getElementById("chooseSpaceshipMenu_0");
	buttons["chooseSpaceshipMenu"].push(left);
	var right = document.getElementById("chooseSpaceshipMenu_1");
	buttons["chooseSpaceshipMenu"].push(right);
	var go   = document.getElementById("chooseSpaceshipMenu_2");
	buttons["chooseSpaceshipMenu"].push(go);
	var backChooseSpaceship   = document.getElementById("chooseSpaceshipMenu_3");
	buttons["chooseSpaceshipMenu"].push(backChooseSpaceship);


	//creditsMenu
	var backCredits = document.getElementById("creditsMenu_0");
	buttons["creditsMenu"].push(backCredits);

	//helpMenu
	var backHelp = document.getElementById("helpMenu_0");
	buttons["helpMenu"].push(backHelp);
	var nextHelp = document.getElementById("helpMenu_1");
	buttons["helpMenu"].push(nextHelp);

	//controlsMenu
	var backControl = document.getElementById("controlsMenu_0");
	buttons["controlsMenu"].push(backControl);
	var nextControl = document.getElementById("controlsMenu_1");
	buttons["controlsMenu"].push(nextControl);
	var playControl = document.getElementById("controlsMenu_2");
	buttons["controlsMenu"].push(playControl);

	//leaderBoard
	var leaderBoardBack = document.getElementById("leaderBoard_0");
	buttons["leaderBoard"].push(leaderBoardBack);

}








function initMenu(nLoaded, nToLoad, imgsMenu){
	var numToLoad = 0;

	//Images load handler
	function imgMenuLoad(ev){
		var img = ev.target;

		let key   = img.id.split("_")[0];
		nLoaded[key] += 1;

		if (allLoaded(nLoaded, numToLoad) == true){
			var evInitMenuEnd = new Event("initMenuEnd");
			window.dispatchEvent(evInitMenuEnd);
		}
	}

	for (let toLoad in nToLoad){
		numToLoad += nToLoad[toLoad];
	}

	for (let key in imgsMenu){
		for (var i = 0; i < nToLoad[key]; i++ ){

			imgsMenu[key][i] 		= new Image(); 
			imgsMenu[key][i].addEventListener("load", imgMenuLoad);

			imgsMenu[key][i].id 	= [key]+"_" + i;
			imgsMenu[key][i].src 	= "resources/menu/"+[key]+"_" + i + ".png";  //dá ordem de loadmento da imagem

		}
	}
}


function initImages(nLoaded, nToLoad, imgs, imgsMenu){
	var numToLoad = 0;

	//Images load handler
	function imgLoad(ev){
		var img = ev.target;

		let key   = img.id.split("_")[0];
		nLoaded[key] += 1;

		if (allLoaded(nLoaded, numToLoad) == true){
			var evInitImagesEnd = new Event("initImagesEnd");
			imgs["imgsMenus"] = imgsMenu;
			window.dispatchEvent(evInitImagesEnd);
		}
	}

	for (let toLoad in nToLoad){
		numToLoad += nToLoad[toLoad];
	}

	for (let key in imgs){
		for (var i = 0; i < nToLoad[key]; i++ ){

			imgs[key][i] 		= new Image(); 
			imgs[key][i].addEventListener("load", imgLoad);

			imgs[key][i].id 	= [key]+"_" + i;
			imgs[key][i].src 	= "resources/game/"+[key]+"_" + i + ".png";  //dá ordem de loadmento da imagem

		}
	}

}

function initMusics(nToLoad, musics){

	for (let key in musics){
		for (var i = 0; i < nToLoad[key]; i++ ){

			musics[key][i] 	 = new Audio();

			musics[key][i].id 	 = [key]+"_" + i;
			musics[key][i].src  = "resources/musics/"+[key]+"_" + i + ".mp3";  //dá ordem de loadmento da imagem

		}
	}


	var evInitEnd = new Event("initMusicsEnd");
	window.dispatchEvent(evInitEnd);
}

function initSounds(nToLoad, sounds){

	for (let key in sounds){
		for (var i = 0; i < nToLoad[key]; i++ ){

			sounds[key][i] 		= new Audio();

			sounds[key][i].id 	= [key]+"_" + i;
			sounds[key][i].src 	= "resources/sounds/"+[key]+"_" + i + ".mp3";  //dá ordem de loadmento da imagem

		}
	}


	var evInitEnd = new Event("initSoundsEnd");
	window.dispatchEvent(evInitEnd);
}

function calculateMonitorRefreshRate(auxMisc){
	var i = 0;
	var totalTime = 0;
	var oldtime = 0;
	var refreshRate;
	var oldRefreshRate = 0;
	var requestId;

	function aux(time){
		if(oldtime > 0){
			oldRefreshRate  = refreshRate;
			refreshRate 	= Math.round(1000/(time - oldtime));
			if(refreshRate == oldRefreshRate){
				auxMisc["fps"]  = refreshRate;
				window.cancelAnimationFrame(requestId);
				var evInitEnd   = new Event("initEnd");
				window.dispatchEvent(evInitEnd);
				return;
			}
		}
		/*if(i > 0){
			totalTime += time - oldtime;
			

			if(i >= 5){
				auxMisc["fps"] = Math.round(1000/(totalTime/5));

				window.cancelAnimationFrame(requestId);
				var evInitEnd = new Event("initEnd");
				window.dispatchEvent(evInitEnd);
				return;
			}
		}

		i++;*/
		oldtime = time;
		requestId = window.requestAnimationFrame(aux);
	}
	requestId = window.requestAnimationFrame(aux);
}


function allLoaded(nLoaded,numToLoad){
	var sumLoaded = 0;

	for(let lo in nLoaded){
		sumLoaded += nLoaded[lo];
	}

	if(sumLoaded == numToLoad){
		return true;
	}else{
		return false;
	}
}








function menuListeners(auxMisc, menus, buttons, imgs, sounds, musics, body, spaceships, domAux, player){

	var auxKeyDownHandler = function(ev){
		KeyDownHandler(ev, buttons, menus, auxMisc, sounds, musics, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux, player);
	}

	var auxClickHandler = function(ev){

		sounds["buttons"][1].load();
		sounds["buttons"][1].play().catch(function(){});
		
		//which button?
		switch(ev.target.id){

			//PAUSA--------------
			//mute
			case("pauseMenu_0"): 
				muteClickHandlerM(musics, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;

			case("pauseMenu_1"): 
				somLowClickHandlerM(musics, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;

			case("pauseMenu_2"):
				somHighClickHandlerM(musics, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;
			case("pauseMenu_3"): 
				muteClickHandlerS(sounds, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;
			case("pauseMenu_4"): 
				somLowClickHandlerS(sounds, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;
			case("pauseMenu_5"):
				somHighClickHandlerS(sounds, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;
			case("pauseMenu_6"):
				leaveDoGameClickHandler(auxMisc, menus, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux);
				break;




			//START------------
			case("startMenu_0"):
				startClickHandler(ev, menus, auxMisc);
				break;





			//LOGIN REG------------
			//signUp
			case("loginRegMenu_0"):
				signUpClickHandler(ev, menus, auxMisc, musics, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux, player);
				break;

			//login
			case("loginRegMenu_1"):
				loginClickHandler(menus, auxMisc, musics, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux, player);
				break;


			//POP UP------------
			//yes
			case("popUpMenu_0"):
				yesClickHandler(ev, menus, auxMisc, musics, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux, player);
				break;
			//ok
			case("popUpMenu_1"):
				okClickHandler(ev, menus, auxMisc, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;
			//no
			case("popUpMenu_2"):
				noClickHandler(ev, menus, auxMisc, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;



			//MAIN MENU------------
			//campain
			case("mainMenu_0"): 
				campainClickHandler(ev, auxMisc, menus, domAux);
				break;

			//endless
			case("mainMenu_1"):
				endlessClickHandler(ev, auxMisc, menus, buttons, body, spaceships,imgs);
				break;

			case("mainMenu_2"):
				console.log("editor");
				break;

			//closes game
			case("mainMenu_3"): 
				closesGameClickHandler(ev, auxMisc, sounds, musics, menus, body); 
				break;

			//help
			case("mainMenu_4"):
				helpClickHandler(ev, menus, auxMisc, body);
				break;

			//credits
			case("mainMenu_5"): 
				creditsClickHandler(ev, menus, auxMisc, domAux);
				break;
			
			//leaderBoard
			case("mainMenu_6"): 
				leaderBoardClickHandler(ev, menus, auxMisc, body, domAux);
				break;						
			
			//controls
			case("mainMenu_7"): 
				controlsClickHandler(ev, menus, auxMisc, body);
				break;		


			//LEVEL MENU------------
			//level 1
			case("levelMenu_0"): 
				levelClickHandler(ev, auxMisc, menus, buttons, body, 1, spaceships, imgs);
				break;
			case("levelMenu_1"): 
				levelClickHandler(ev, auxMisc, menus, buttons, body, 2, spaceships, imgs);
				break;

			case("levelMenu_2"):
				levelClickHandler(ev, auxMisc, menus, buttons, body, 3, spaceships, imgs);
				break;

			case("levelMenu_3"):
				speedrunClickHandler(ev, auxMisc, menus, buttons, body, spaceships, imgs);
				break;
			//back
			case("levelMenu_4"):
				levelMenuBack(ev, menus, auxMisc);
				break;





			//CHOOSE SPACESHIP MENU------------
			//left
			case("chooseSpaceshipMenu_1"): 
				leftClickHandler(ev, auxMisc, menus, buttons, spaceships, imgs);
				break;

			//right
			case("chooseSpaceshipMenu_0"): 
				rightClickHandler(ev, auxMisc, menus, buttons, spaceships, imgs);
				break;

			//play
			case("chooseSpaceshipMenu_2"):
				playClickHandler(ev, auxMisc, menus, buttons, imgs, sounds, musics, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux, player);
				break;
			//back
			case("chooseSpaceshipMenu_3"):
				chooseSpaceshipsMenuBack(ev, menus, auxMisc, body);
				break;




			//LEADERBOARD------------
			//back
			case("leaderBoard_0"):
				leaderBoardBackClickHandler(ev, menus, auxMisc, body);
				break;


			//CREDITS MENU------------
			//back
			case("creditsMenu_0"):
				creditsBackClickHandler(ev, menus, auxMisc);
				break;

			//CONTROLS MENU------------
			//back
			case("controlsMenu_0"):
				controlsBackClickHandler(ev, menus, auxMisc, body, buttons, player);
				break;

			case("controlsMenu_1"):
				controlsNextClickHandler(ev, menus, auxMisc, body, buttons, player);
				break;	
			case("controlsMenu_2"):
				controlsPlayClickHandler(ev, auxMisc, menus, buttons, imgs, sounds, musics, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux, player);
				break;

			//HELP MENU------------
			//back
			case("helpMenu_0"):
				helpBackClickHandler(ev, menus, auxMisc, body, player);
				break;
			//next
			case("helpMenu_1"):
				helpPlayClickHandler(ev, auxMisc, menus, buttons, imgs, sounds, musics, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux, player);
				break;
		}
	}



	var auxMouseInHandler = function(ev){

			let key = ev.target.id.split("_")[0];
			let index = ev.target.id.split("_")[1];

			buttons[key][index].style.opacity = 0.7;
			buttons[key][index].style.cursor = "pointer";

			sounds["buttons"][0].load();
			sounds["buttons"][0].play().catch(function(){});
	}

	var auxMouseOutHandler = function(ev){

			let key = ev.target.id.split("_")[0];
			let index = ev.target.id.split("_")[1];

			buttons[key][index].style.opacity = 1;
			buttons[key][index].style.cursor = "default";

	}





	//LISTENERS vvvvv
	window.addEventListener("keydown",auxKeyDownHandler);	


	//if he is coming from the game and he didnt unlock fillerText Henrique
	if (auxMisc["oldMenu"] == "chooseSpaceshipMenu" && menus["popUpMenu"].style.display == ""){

		for(let key in buttons){
			if(key != "pauseMenu"){
				for ( var i = 0; i < Object.keys(buttons[key]).length; i++){
					addEVLButtons(buttons, key, i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				}
			}
		}

	//beggining
	}else if(auxMisc["oldMenu"] == "fillerText"){

		for(let key in buttons){
			for ( var i = 0; i < Object.keys(buttons[key]).length; i++){
				addEVLButtons(buttons, key, i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
			}
		}

	//if he is coming from a game and he unlocked a spaceship
	}else if(auxMisc["oldMenu"] == "chooseSpaceshipMenu" && menus["popUpMenu"].style.display == "block"){
		for(let key in buttons){
			if(key == "popUpMenu"){
				for ( var i = 0; i < Object.keys(buttons[key]).length; i++){
					addEVLButtons(buttons, key, i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				}
			}
		}

	}


	//LISTENERS ^^^^^^
}






















function EnterPress( menus, auxMisc, musics, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux){
	if(auxMisc["currentMenu"] == "loginRegMenu"){
		loginClickHandler( menus, auxMisc, musics, buttons, auxClickHandler,auxMouseInHandler,auxMouseOutHandler, body, domAux)
	}
}



//Handlers vvvvvv

function KeyDownHandler(ev, buttons, menus, auxMisc, sounds, musics, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux, player){


	switch(ev.code) {
		case "Escape": togglePauseMenu(buttons, menus, auxMisc, sounds, musics, auxClickHandler, auxMouseInHandler, auxMouseOutHandler); break;
		case "Enter":  EnterPress(menus, auxMisc, musics, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux); break;
		case "KeyP":
			auxMisc["secretProgress"] += "P";
			if(auxMisc["secretPress"].indexOf(auxMisc["secretProgress"]) != 0){
				auxMisc["secretProgress"] = "P";
			}
			else if(auxMisc["secretPress"] == auxMisc["secretProgress"]){
				var unlockingSpaceship = 4;
				unlockSpaceship(unlockingSpaceship, auxMisc, menus, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux, player);
			}
			break;
		default: secret(ev, auxMisc, menus, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux, player);break;
		

	}
}


// PAUSE -------

function muteClickHandlerM(musics, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	for(let key in musics){
		for ( let i = 0; i < Object.keys(musics[key]).length; i++){
			musics[key][i].volume = 0;
		}
	}
	
	buttons["pauseMenu"][0].style.opacity = 0.3;
	buttons["pauseMenu"][0].style.cursor = "default";
	removeEVLButtons(buttons, "pauseMenu", 0, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	
	buttons["pauseMenu"][1].style.opacity = 0.3;
	buttons["pauseMenu"][1].style.cursor = "default";
	removeEVLButtons(buttons, "pauseMenu", 1, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

	//sound goes from 1 to 0
	buttons["pauseMenu"][2].style.opacity = 1;
	addEVLButtons(buttons, "pauseMenu", 2, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
}

function somLowClickHandlerM(musics, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	console.log("-M");		
	
	//place volume up button again
	if (musics["music"][0].volume + 0.2 > 1){
		buttons["pauseMenu"][2].style.opacity = 1;
		addEVLButtons(buttons, "pauseMenu", 2, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}


	for(let key in musics){
		for ( let i = 0; i < Object.keys(musics[key]).length; i++){
			musics[key][i].volume -= 0.2;
		}
	}


	//turn of mute and volume down buttons
	if (musics["music"][0].volume - 0.2 < 0 ){
		buttons["pauseMenu"][0].style.opacity = 0.3;
		buttons["pauseMenu"][0].style.cursor = "default";
		removeEVLButtons(buttons, "pauseMenu", 0, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

		buttons["pauseMenu"][1].style.opacity = 0.3;
		buttons["pauseMenu"][1].style.cursor = "default";
		removeEVLButtons(buttons, "pauseMenu", 1, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}

}

function somHighClickHandlerM(musics, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	console.log("+M");		

	//place volume down and mute buttons again
	if (musics["music"][0].volume - 0.2 < 0 ){
		buttons["pauseMenu"][0].style.opacity = 1;
		addEVLButtons(buttons, "pauseMenu", 0, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

		buttons["pauseMenu"][1].style.opacity = 1;
		addEVLButtons(buttons, "pauseMenu", 1, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}

	for(let key in musics){
		for ( let i = 0; i < Object.keys(musics[key]).length; i++){
			musics[key][i].volume += 0.2;
		}
	}


	//turn off volume up button
	if (musics["music"][0].volume + 0.2 > 1){
		buttons["pauseMenu"][2].style.opacity = 0.3;
		buttons["pauseMenu"][2].style.cursor = "default";
		removeEVLButtons(buttons, "pauseMenu", 2, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}

}



function muteClickHandlerS(sounds, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){	
	for(let key in sounds){
		for ( let i = 0; i < Object.keys(sounds[key]).length; i++){
			sounds[key][i].volume = 0;
		}
	}

	buttons["pauseMenu"][3].style.opacity = 0.3;
	buttons["pauseMenu"][3].style.cursor = "default";
	removeEVLButtons(buttons, "pauseMenu", 3, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

	buttons["pauseMenu"][4].style.opacity = 0.3;
	buttons["pauseMenu"][4].style.cursor = "default";
	removeEVLButtons(buttons, "pauseMenu", 4, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);


	//sound goes from 1 to 0
	buttons["pauseMenu"][5].style.opacity = 1;
	addEVLButtons(buttons, "pauseMenu", 5, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
}

function somLowClickHandlerS(sounds, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	console.log("-S");		
	
	//place volume up button again
	if (sounds["buttons"][0].volume + 0.2 > 1){
		buttons["pauseMenu"][5].style.opacity = 1;
		addEVLButtons(buttons, "pauseMenu", 5, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}


	for(let key in sounds){
		for ( let i = 0; i < Object.keys(sounds[key]).length; i++){
			sounds[key][i].volume -= 0.2;
		}
	}

	//turn of mute and volume down buttons
	if (sounds["buttons"][0].volume - 0.2 < 0 ){
		buttons["pauseMenu"][4].style.opacity = 0.3;
		buttons["pauseMenu"][4].style.cursor = "default";
		removeEVLButtons(buttons, "pauseMenu", 4, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

		buttons["pauseMenu"][3].style.opacity = 0.3;
		buttons["pauseMenu"][3].style.cursor = "default";
		removeEVLButtons(buttons, "pauseMenu", 3, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}

}



function somHighClickHandlerS(sounds, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){

	//place mute and volume down buttons again
	if (sounds["buttons"][0].volume - 0.2 < 0 ){
		buttons["pauseMenu"][3].style.opacity = 1;
		addEVLButtons(buttons, "pauseMenu", 3, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

		buttons["pauseMenu"][4].style.opacity = 1;
		addEVLButtons(buttons, "pauseMenu", 4, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}


	for(let key in sounds){
		for ( let i = 0; i < Object.keys(sounds[key]).length; i++){
			sounds[key][i].volume += 0.2;
		}
	}

	//turn off volume up button
	if (sounds["buttons"][0].volume + 0.2 > 1){
		buttons["pauseMenu"][5].style.opacity = 0.3;
		buttons["pauseMenu"][5].style.cursor = "default";
		removeEVLButtons(buttons, "pauseMenu", 5, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}

}
function leaveDoGameClickHandler(auxMisc, menus, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux){

 	//var text = document.getElementById("textPop");
 	var text = domAux["textPop"];

	text.innerHTML = "Quere voltar ao menu principal??"

	buttons["popUpMenu"][0].style.display = "block";
	buttons["popUpMenu"][1].style.display = "none";
	buttons["popUpMenu"][2].style.display = "block";
	
	menus["popUpMenu"].style.display = "block";
	
	menus["popUpMenu"].style.zIndex = 4;


	//add listeners
	/*for (var i = 0 ; i < buttons["popUpMenu"].length; i++){
		addEVLButtons(buttons, "popUpMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);	
		buttons["popUpMenu"][i].style.opacity = 1;
	}*/

	//REMOVE BUTTONS EVENTLISTENNERS
	//remove button ev listener that were left
	//doesn't change opacity so we know which have to get the ev listeners back
	for (var i = 0 ; i < buttons["pauseMenu"].length; i++){
		if (buttons["pauseMenu"][i].style.opacity == 1 || i == 6){
			removeEVLButtons(buttons, "pauseMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
		}
	}
	buttons["pauseMenu"][6].style.opacity = 0.3;
}


//START------
function startClickHandler(ev, menus, auxMisc){
	menus["startMenu"].style.display = "";
	menus["loginRegMenu"].style.display = "block";

	auxMisc["currentMenu"] = "loginRegMenu";
	auxMisc["oldMenu"] = "startMenu";
}



//LOGIN REG------
function loginClickHandler(menus, auxMisc, musics, buttons, auxClickHandler,auxMouseInHandler,auxMouseOutHandler, body, domAux, player){

	//var name = document.getElementById("name").value;
	var name = domAux["name"].value;

	//name doesn't exist -> PopUp
	if(checkCookie(name) == false){
		
		//var text = document.getElementById("textPop");
		var text = domAux["textPop"];

		text.innerHTML = "There isn't an account with that username."

		buttons["popUpMenu"][0].style.display = "none";
		buttons["popUpMenu"][1].style.display = "block";
		buttons["popUpMenu"][2].style.display = "none";
		
		menus["popUpMenu"].style.display = "block";

		//REMOVE BUTTONS EVENTLISTENNERS
		for (var i = 0 ; i < buttons["loginRegMenu"].length; i++){
			removeEVLButtons(buttons, "loginRegMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
			buttons["loginRegMenu"][i].style.opacity = 1;
		}


	}else{
		player.name = name;
		player.getCookie();
		login(name, menus, auxMisc, musics, body, buttons, domAux, player);
	}
	
}

function signUpClickHandler(ev, menus, auxMisc, musics, buttons, auxClickHandler,auxMouseInHandler,auxMouseOutHandler, body, domAux, player){
	
	//var name = document.getElementById("name").value;
	var name = domAux["name"].value;

	//invalid name
	if( name.indexOf("Level")      != -1 ||
	    name.indexOf("Campain")    != -1 ||
	    name.indexOf("Endless")    != -1 ||
	    name.indexOf("Spaceships") != -1 ||
	    name.indexOf("Tutorial")   != -1 ||
	    name.indexOf(" ")          != -1 ||
	    name == ""){
		//var text = document.getElementById("textPop");
		var text = domAux["textPop"];

		text.innerHTML = "Invalid Username. Keep in mind your name can't be empty, contain spaces or the words: \"Level\", \"Campain\", \"Endless\", \"Spaceships\" and \"Tutorial\"";

		buttons["popUpMenu"][0].style.display = "none";
		buttons["popUpMenu"][1].style.display = "block";
		buttons["popUpMenu"][2].style.display = "none";
		
		menus["popUpMenu"].style.display = "block";

		//REMOVE BUTTONS EVENTLISTENNERS
		for (var i = 0 ; i < buttons["loginRegMenu"].length; i++){
			removeEVLButtons(buttons, "loginRegMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

			buttons["loginRegMenu"][i].style.opacity = 1;
		}


	//username already exists -> PopUp
	}else if(checkCookie(name) == true){

		//var text = document.getElementById("textPop");
		var text = domAux["textPop"];

		text.innerHTML = "This username has saved progress. Are you sure you want to erase it?"

		buttons["popUpMenu"][0].style.display = "block";
		buttons["popUpMenu"][1].style.display = "none";
		buttons["popUpMenu"][2].style.display = "block";
		
		menus["popUpMenu"].style.display = "block";


		//REMOVE BUTTONS EVENTLISTENNERS
		for (var i = 0 ; i < buttons["loginRegMenu"].length; i++){
			removeEVLButtons(buttons, "loginRegMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
			buttons["loginRegMenu"][i].style.opacity = 1;
		}


	}else{
	 	player.createPlayer(name);
	 	login(name, menus, auxMisc, musics, body, buttons, domAux, player);
	}


}



//POP UP------
function yesClickHandler(ev, menus, auxMisc, musics, buttons, auxClickHandler,auxMouseInHandler,auxMouseOutHandler, body, domAux, player){

	menus["popUpMenu"].style.display = "";
	menus["popUpMenu"].style.zIndex  = 1;


	//if the popup is on Log Reg Menu
	if (auxMisc["currentMenu"] == "loginRegMenu"){

		
		//var name = document.getElementById("name").value;
		var name = domAux["name"].value;

		player.createPlayer(name);
		login(name, menus, auxMisc, musics, body, buttons, domAux, player);

		//Reset Listeners
		for (var i = 0 ; i < buttons["loginRegMenu"].length; i++){
			addEVLButtons(buttons, "loginRegMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

		}
	}
	//if the popup appears during a game
	else{
		/*buttons["pauseMenu"][6].style.opacity = 1;

		for (var i = 0 ; i < buttons["pauseMenu"].length; i++){
			if (buttons["pauseMenu"][i].style.opacity == 1 ){
				addEVLButtons(buttons, "pauseMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
			}
		}

		//Code to get back to the menu (Henrique)
		
		*/

	}

}

function okClickHandler(ev, menus, auxMisc, buttons, auxClickHandler,auxMouseInHandler,auxMouseOutHandler){
	menus["popUpMenu"].style.display = "";			
	menus["popUpMenu"].style.zIndex  = 1;

	//if the PopUpMenu has style.display = "block" and the user came from a game
	//this means he unlocked something ingame.
	if(auxMisc["oldMenu"] == "algumGame;_;"){
		for(let key in buttons){
			if(key != "pauseMenu" || key != "popUpMenu" ){
				for (var i = 0; i < Object.keys(buttons[key]).length; i++){
					addEVLButtons(buttons, key, i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				}
			}
		}

	//else if (auxMisc["currentMenu"] == "loginRegMenu" || auxMisc["currentMenu"] == "mainMenu"){
	}//if the PopUpMemu is on the Log Reg Menu or MainMenu
	else{
		//Reset Listeners
		for (var i = 0 ; i < buttons[auxMisc["currentMenu"]].length; i++){
			addEVLButtons(buttons, auxMisc["currentMenu"], i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
		}
	}
}

function noClickHandler(ev, menus, auxMisc,buttons, auxClickHandler,auxMouseInHandler,auxMouseOutHandler){
	menus["popUpMenu"].style.display = "";			
	menus["popUpMenu"].style.zIndex  = 1;

	//if the PopUpMemu is on the Log Reg Menu
	if (auxMisc["currentMenu"] == "loginRegMenu"){
		//Reset listeners
		for (var i = 0 ; i < buttons["loginRegMenu"].length; i++){
				addEVLButtons(buttons, "loginRegMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
		}

	//if the PopUpMemu appears while ingame (Henrique)
	}else{
		/*buttons["pauseMenu"][6].style.opacity = 1;

		for (var i = 0 ; i < buttons["pauseMenu"].length; i++){
			if (buttons["pauseMenu"][i].style.opacity == 1 ){
				addEVLButtons(buttons, "pauseMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
			}
		}*/
	}
}


//MAIN MENU------
function campainClickHandler(ev, auxMisc, menus, domAux){
	menus["mainMenu"].style.display  = "";
	menus["levelMenu"].style.display = "block";

	auxMisc["currentMenu"] = "levelMenu";
	auxMisc["oldMenu"] = "mainMenu";


 	var name = auxMisc["playerAtual"];
 	console.log(name);
	//document.getElementById("playerLevel").innerHTML = name;
	domAux["playerLevel"].innerHTM = name;
}

function endlessClickHandler(ev, auxMisc, menus, buttons, body, spaceships,imgs){
	body.bgColor = "#0a131f";
	menus["mainMenu"].style.display = "";
	menus["chooseSpaceshipMenu"].style.display = "block";

	auxMisc["currentMenu"] = "chooseSpaceshipMenu";
	auxMisc["oldMenu"] = "mainMenu";
	auxMisc["gamemode"] = "endless";

	putCorrectSpaceships(auxMisc, menus, buttons, spaceships,imgs);
}

function playEndlessClickHandler(ev, auxMisc, menus, buttons, imgs, sounds, musics, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux, player){
	body.bgColor = "black";

	menus["chooseSpaceshipMenu"].style.display    = "";
	menus["canvasFigure"].style.display = "block";
	

	auxMisc["currentMenu"] = "endless";
	auxMisc["oldMenu"] = "chooseSpaceshipMenu";


	removeEventListeners(buttons, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	new Game(auxMisc, menus, buttons, imgs, sounds, musics, body, domAux,  auxClickHandler, auxMouseInHandler, auxMouseOutHandler, -1, player);
}

function closesGameClickHandler(ev, auxMisc, sounds, musics, menus, body){
	menus["mainMenu"].style.display  = "";
	firstMenu(menus, auxMisc, musics, body);
}

function creditsClickHandler(ev, menus, auxMisc, domAux){
	menus["mainMenu"].style.display = "";
	menus["creditsMenu"].style.display = "block";
	auxMisc["currentMenu"] = "creditsMenu";
	auxMisc["oldMenu"] = "mainMenu";


 	var name = auxMisc["playerAtual"];
	//document.getElementById("playerCredits").innerHTML = name;
	domAux["playerCredits"].innerHTML = name;
}

function helpClickHandler(ev, menus, auxMisc, body){
	body.bgColor = "#0a131f";
	menus["mainMenu"].style.display = "";
	menus["helpMenu"].style.display = "block";
	auxMisc["currentMenu"] = "helpMenu";
	auxMisc["oldMenu"] = "mainMenu";

}

function leaderBoardClickHandler(ev, menus, auxMisc, body, domAux){
	body.bgColor = "#0a131f";
	menus["mainMenu"].style.display = "";
	menus["leaderBoard"].style.display = "block";
	auxMisc["currentMenu"] = "leaderBoard";
	auxMisc["oldMenu"] = "mainMenu";


 	var name = auxMisc["playerAtual"];
	//document.getElementById("playerLeaderBoard").innerHTML = name;
	domAux["playerLeaderBoard"].innerHTML = name;
}

function controlsClickHandler(ev, menus, auxMisc, body){
	body.bgColor = "#0a131f";
	menus["mainMenu"].style.display = "";
	menus["controlsMenu"].style.display = "block";
	auxMisc["currentMenu"] = "controlsMenu";
	auxMisc["oldMenu"] = "mainMenu";

}







//NIVEL MENU-------
function levelClickHandler(ev, auxMisc, menus, buttons, body, level, spaceships, imgs){
	body.bgColor = "#0a131f";
	menus["levelMenu"].style.display = "";
	menus["chooseSpaceshipMenu"].style.display = "block";

	auxMisc["currentMenu"] = "chooseSpaceshipMenu";
	auxMisc["oldMenu"] = "levelMenu";
	auxMisc["gamemode"] = "level_" + level;

	putCorrectSpaceships(auxMisc, menus, buttons, spaceships, imgs);
}

function speedrunClickHandler(ev, auxMisc, menus, buttons, body, spaceships, imgs){
	body.bgColor = "#0a131f";
	menus["levelMenu"].style.display = "";
	menus["chooseSpaceshipMenu"].style.display = "block";

	auxMisc["currentMenu"] = "chooseSpaceshipMenu";
	auxMisc["oldMenu"] = "levelMenu";
	auxMisc["gamemode"] = "speedrun";

	putCorrectSpaceships(auxMisc, menus, buttons, spaceships, imgs);
}

function levelMenuBack(ev,menus,auxMisc){
	menus["levelMenu"].style.display = "";
	menus["mainMenu"].style.display = "block";

	auxMisc["currentMenu"] = "mainMenu";
	auxMisc["oldMenu"] = "levelMenu";
}





//CHOOSE SPACESHIP MENU-------
function playClickHandler(ev, auxMisc, menus, buttons, imgs, sounds, musics, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux, player){

	//hasn't seen the controls menu
	if(auxMisc["cookieStore"]["Tutorial"][0] == "0"){

		//appears Controls
		body.bgColor = "#0a131f";

		menus["chooseSpaceshipMenu"].style.display    = "";
		menus["controlsMenu"].style.display = "block";
		
		auxMisc["currentMenu"] = "controlsMenu";
		auxMisc["oldMenu"] = "chooseSpaceshipMenu";

		//checks if the user knows the Help menu
		if(auxMisc["cookieStore"]["Tutorial"][1] == "0" ){
			//buttonNext
			buttons["controlsMenu"][1].style.display = "block";
		}else{
			//buttonPlay
			buttons["controlsMenu"][2].style.display = "block";
		}

	//hasn't seen the help menu <=> Tutorial[1] == "0"
	}else if (auxMisc["cookieStore"]["Tutorial"] == "10"){
		
		//appears Help
		body.bgColor = "#0a131f";

		menus["chooseSpaceshipMenu"].style.display    = "";
		menus["helpMenu"].style.display = "block";
		

		auxMisc["oldMenu"] = "chooseSpaceshipMenu";
		auxMisc["currentMenu"] = "helpMenu";

		//appears buttons 
		buttons["helpMenu"][1].style.display = "block";
	
	//user knows controls and help menus
	}else if (auxMisc["cookieStore"]["Tutorial"] == "11"){
		var gamemode = auxMisc["gamemode"].split("_")[0]; 

		buttons["helpMenu"][1].style.display = "";
		buttons["controlsMenu"][1].style.display = "";
		buttons["controlsMenu"][2].style.display = "";



		if ( gamemode== "level"){
			playLevelClickHandler(ev, auxMisc, menus, buttons, imgs, sounds,musics, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, parseInt(auxMisc["gamemode"].split("_")[1]), domAux, player);
		}
		else if (gamemode == "speedrun"){
			playSpeedrunClickHandler(ev, auxMisc, menus, buttons, imgs, sounds,musics, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler,  body, domAux, player);
		}
		else if (gamemode == "endless"){
			playEndlessClickHandler(ev, auxMisc, menus, buttons, imgs, sounds,musics, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux, player);
		}
	}
}

function playLevelClickHandler(ev, auxMisc, menus, buttons, imgs, sounds, musics, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, level, domAux, player){
	body.bgColor = "black";

	menus["chooseSpaceshipMenu"].style.display    = "";
	menus["canvasFigure"].style.display = "block";
	

	auxMisc["currentMenu"] = "level" + level + "Menu";
	auxMisc["oldMenu"] = "chooseSpaceshipMenu";


	removeEventListeners(buttons, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	new Game(auxMisc, menus, buttons, imgs, sounds, musics, body, domAux,  auxClickHandler, auxMouseInHandler, auxMouseOutHandler, level, player);
}

function playSpeedrunClickHandler(ev, auxMisc, menus, buttons, imgs, sounds, musics, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux, player){
	body.bgColor = "black";

	menus["chooseSpaceshipMenu"].style.display    = "";
	menus["canvasFigure"].style.display = "block";
	

	auxMisc["currentMenu"] = "speedrun";
	auxMisc["oldMenu"] = "chooseSpaceshipMenu";


	removeEventListeners(buttons, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	new Game(auxMisc, menus, buttons, imgs, sounds, musics, body, domAux,  auxClickHandler, auxMouseInHandler, auxMouseOutHandler, 0, player);
}

function rightClickHandler(ev, auxMisc, menus, buttons, spaceships, imgs){

	//var data = player.getCookie(auxMisc["playerAtual"]);
	var spaceshipsUser = auxMisc["cookieStore"]["Spaceships"];
	var spaceshipAntiga = auxMisc["currentSpaceship"];
	auxMisc["currentSpaceship"] = myMod(auxMisc["currentSpaceship"] -1, spaceshipsUser.length); 


	var appears_left = myMod(auxMisc["currentSpaceship"] - 1,spaceshipsUser.length);
	var right = spaceshipAntiga;
	var leave_right = myMod(auxMisc["currentSpaceship"] + 2, spaceshipsUser.length);

	auxChangeSpaceships(menus, buttons,spaceships,imgs, spaceshipsUser, spaceshipAntiga, appears_left, auxMisc["currentSpaceship"], right, leave_right);
}

function leftClickHandler(ev, auxMisc, menus, buttons, spaceships, imgs){

	//var data = player.getCookie(auxMisc["playerAtual"]);
	var spaceshipsUser = auxMisc["cookieStore"]["Spaceships"];
	
	var spaceshipAntiga = auxMisc["currentSpaceship"];
	auxMisc["currentSpaceship"] = myMod(auxMisc["currentSpaceship"] + 1, spaceshipsUser.length); 


	var leave_left = myMod(auxMisc["currentSpaceship"] - 2,spaceshipsUser.length);
	var left = spaceshipAntiga;
	var appears_right = myMod(auxMisc["currentSpaceship"] + 1, spaceshipsUser.length);

	auxChangeSpaceships(menus, buttons,spaceships,imgs, spaceshipsUser, spaceshipAntiga, left, auxMisc["currentSpaceship"], appears_right, leave_left);

}

function chooseSpaceshipsMenuBack(ev, menus, auxMisc, body){
	menus["chooseSpaceshipMenu"].style.display = "";

	body.bgColor = "#00081d";
	if( auxMisc["gamemode"] != "endless" ){

		menus["levelMenu"].style.display = "block";

		auxMisc["currentMenu"] = "levelMenu";

	}else{

		menus["mainMenu"].style.display = "block";
		
		auxMisc["currentMenu"] = "mainMenu";
	}

	auxMisc["oldMenu"] = "chooseSpaceshipMenu";
}




//LEADERBOARD------
function leaderBoardBackClickHandler(ev, menus, auxMisc, body){
	body.bgColor = "#00081d";
	menus["leaderBoard"].style.display = "";
	menus["mainMenu"].style.display = "block";

	auxMisc["currentMenu"] = "mainMenu";
	auxMisc["oldMenu"] = "leaderBoard";

}




//CREDITOS MENU------
function creditsBackClickHandler(ev, menus, auxMisc){
	menus["creditsMenu"].style.display = "";
	menus["mainMenu"].style.display = "block";
	
	auxMisc["currentMenu"] = "mainMenu";
	auxMisc["oldMenu"] = "creditsMenu";

}



//CONTROLOS MENU -----
function controlsBackClickHandler(ev, menus, auxMisc,body, buttons, player){
	
	menus["controlsMenu"].style.display = "";

	buttons["controlsMenu"][1].style.display = "";
	buttons["controlsMenu"][2].style.display = "";

	//user already saw the Controls menu
	auxMisc["cookieStore"]["Tutorial"] = "1"+auxMisc["cookieStore"]["Tutorial"][1];
	player.updateCoockiesTutorial(auxMisc,"1"+auxMisc["cookieStore"]["Tutorial"][1]);


	if(auxMisc["oldMenu"] == "mainMenu"){
		body.bgColor = "#00081d";
		menus["mainMenu"].style.display = "block";
		auxMisc["currentMenu"] = "mainMenu";
		auxMisc["oldMenu"] = "controlsMenu";
	}else{
		body.bgColor = "#0a131f";
		menus["chooseSpaceshipMenu"].style.display = "block";
		auxMisc["currentMenu"] = "chooseSpaceshipMenu";

		auxMisc["oldMenu"] = "controlsMenu";
		
		buttons["helpMenu"][1].style.display = "";
	}
}

function controlsNextClickHandler(ev, menus, auxMisc, body, buttons, player){
	body.bgColor = "#0a131f";
	menus["controlsMenu"].style.display = "";
	menus["helpMenu"].style.display = "block";
	auxMisc["currentMenu"] = "helpMenu";
	auxMisc["oldMenu"] = "controlsMenu";

	auxMisc["cookieStore"]["Tutorial"] = "1"+auxMisc["cookieStore"]["Tutorial"][1] ;
	player.updateCoockiesTutorial(auxMisc,"1"+auxMisc["cookieStore"]["Tutorial"][1]);

	buttons["helpMenu"][1].style.display = "block";
}

function controlsPlayClickHandler(ev, auxMisc, menus, buttons, imgs, sounds, musics, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux, player){
	menus["controlsMenu"].style.display = "";
	
	//user already saw the Controls menu
	auxMisc["cookieStore"]["Tutorial"] = "1"+auxMisc["cookieStore"]["Tutorial"][1] ;
	player.updateCoockiesTutorial(auxMisc,"1"+auxMisc["cookieStore"]["Tutorial"][1]);

	playClickHandler(ev, auxMisc, menus, buttons, imgs, sounds, musics, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux, player);
}

//HELP MENU------
function helpBackClickHandler(ev, menus, auxMisc, body, player){
	//goes to the old menu
	//if Tutorial[1] == 1 goes to mainMenu;
	//if Tutorial[1] == 0 goes to controls or chooseSpaceshipsMenu
	if(auxMisc["oldMenu"] == "mainMenu"){
		body.bgColor = "#00081d";
	}else{
		body.bgColor = "#0a131f";
	}

	menus["helpMenu"].style.display = "";
	menus[auxMisc["oldMenu"]].style.display = "block";

	auxMisc["currentMenu"] = auxMisc["oldMenu"];
	auxMisc["oldMenu"] = "helpMenu";
	
	//user already saw the Help menu
	auxMisc["cookieStore"]["Tutorial"] = auxMisc["cookieStore"]["Tutorial"][0]+"1" ;
	player.updateCoockiesTutorial(auxMisc, auxMisc["cookieStore"]["Tutorial"][0]+"1");
}

function helpPlayClickHandler(ev, auxMisc, menus, buttons, imgs, sounds, musics, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux, player){
	menus["helpMenu"].style.display = "";
	
	//user already saw the Help menu
	auxMisc["cookieStore"]["Tutorial"] = auxMisc["cookieStore"]["Tutorial"][0]+"1" ;
	player.updateCoockiesTutorial(auxMisc, auxMisc["cookieStore"]["Tutorial"][0]+"1");

	playClickHandler(ev, auxMisc, menus, buttons, imgs, sounds, musics, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux, player);
}

//Handlers ^^^^^^






















//Aux Functions  vvvvvvvv
function secret(ev, auxMisc, menus, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux, player){
	var unlockingSpaceship = 4;

	//checks if he is on the mainMenu, if he still doesn't have the spaceship and if the popUp menu isn't open
	if(auxMisc["currentMenu"] == "mainMenu" && menus["pauseMenu"].style.display == "" && auxMisc["cookieStore"]["Spaceships"][unlockingSpaceship] != "1" && menus["popUpMenu"].style.display == ""){
		auxMisc["secretProgress"] += ev.code.substring(3);

		if(auxMisc["secretPress"] == auxMisc["secretProgress"]){
			unlockSpaceship(unlockingSpaceship, auxMisc, menus, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux, player);	
		}

	}
}

function unlockSpaceship(unlockingSpaceship, auxMisc, menus, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux, player){
	var spaceshipsStr = "";

	//update spaceships	
	player.updateCoockiesSpaceships(auxMisc,unlockingSpaceship);
 	for(var i = 0; i < auxMisc["cookieStore"]["Spaceships"].length; i++){

 		if(i == unlockingSpaceship){
 			spaceshipsStr += "1";
 		}else{
 			spaceshipsStr += auxMisc["cookieStore"]["Spaceships"][i];
 		}
 	}
 	auxMisc["cookieStore"]["Spaceships"] = spaceshipsStr;


 	//var text = document.getElementById("textPop");
 	var  text = domAux["textPop"];

	text.innerHTML = "Congratulations you unlocked spaceship number "+ unlockingSpaceship;

	buttons["popUpMenu"][0].style.display = "none";
	buttons["popUpMenu"][1].style.display = "block";
	buttons["popUpMenu"][2].style.display = "none";
	
	menus["popUpMenu"].style.display = "block";

	//REMOVE BUTTONS EVENTLISTENNERS
	for (var i = 0 ; i < buttons["mainMenu"].length; i++){
		buttons["mainMenu"][i].removeEventListener("click",auxClickHandler);
		buttons["mainMenu"][i].removeEventListener("mouseover",auxMouseInHandler);
		buttons["mainMenu"][i].removeEventListener("mouseout",auxMouseOutHandler);	
		buttons["mainMenu"][i].style.opacity = 1;
	}
}

function unlocksSpaceshipByLevel(levelCompletado, auxMisc, menus, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux, player){
	switch(levelCompletado){ 
		case(2):    unlockSpaceship(3, auxMisc, menus, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux, player);break;
		case(-11):  unlockSpaceship(2, auxMisc, menus, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux, player);break;
	}
}


function playSound(musics, level){

	//play every music
	for(let key in musics){
		for ( let i = 0; i < Object.keys(musics[key]).length; i++){
			musics[key][i].pause();
			musics[key][i].currentTime = 0;
		}
	}


	//endless
	if(level == -1){
		musics["endless"][0].loop = true;
		musics["endless"][0].load();
		musics["endless"][0].play().catch(function(){});
	//campain
	}else{
		musics["campain"][level - 1].loop = true;
		musics["campain"][level - 1].load();
		musics["campain"][level - 1].play().catch(function(){});
	}
}

function updateSoundButton(sounds, musics, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	//max Sound Volume
	if(sounds["buttons"][0].volume + 0.2 > 1){
		buttons["pauseMenu"][5].style.opacity = 0.3;	
		
		buttons["pauseMenu"][5].removeEventListener("click",auxClickHandler);
		buttons["pauseMenu"][5].removeEventListener("mouseover",auxMouseInHandler);
		buttons["pauseMenu"][5].removeEventListener("mouseout",auxMouseOutHandler);	
	
	//min Sound Volume
	}else if (sounds["buttons"][0].volume - 0.2 < 0){
		buttons["pauseMenu"][3].style.opacity = 0.3;	
		
		buttons["pauseMenu"][3].removeEventListener("click",auxClickHandler);
		buttons["pauseMenu"][3].removeEventListener("mouseover",auxMouseInHandler);
		buttons["pauseMenu"][3].removeEventListener("mouseout",auxMouseOutHandler);	

		buttons["pauseMenu"][4].style.opacity = 0.3;	
		
		buttons["pauseMenu"][4].removeEventListener("click",auxClickHandler);
		buttons["pauseMenu"][4].removeEventListener("mouseover",auxMouseInHandler);
		buttons["pauseMenu"][4].removeEventListener("mouseout",auxMouseOutHandler);	
	}


	//max Music Volume
	if(musics["music"][0].volume + 0.2 > 1){
		buttons["pauseMenu"][2].style.opacity = 0.3;	
		
		buttons["pauseMenu"][2].removeEventListener("click",auxClickHandler);
		buttons["pauseMenu"][2].removeEventListener("mouseover",auxMouseInHandler);
		buttons["pauseMenu"][2].removeEventListener("mouseout",auxMouseOutHandler);	
	
	//min Music Volume
	}else if (musics["music"][0].volume - 0.2 < 0){
		buttons["pauseMenu"][0].style.opacity = 0.3;	
		
		buttons["pauseMenu"][0].removeEventListener("click",auxClickHandler);
		buttons["pauseMenu"][0].removeEventListener("mouseover",auxMouseInHandler);
		buttons["pauseMenu"][0].removeEventListener("mouseout",auxMouseOutHandler);	

		buttons["pauseMenu"][1].style.opacity = 0.3;	
	
		buttons["pauseMenu"][1].removeEventListener("click",auxClickHandler);
		buttons["pauseMenu"][1].removeEventListener("mouseover",auxMouseInHandler);
		buttons["pauseMenu"][1].removeEventListener("mouseout",auxMouseOutHandler);	
	}
}

function addEVLButtons(buttons, key, i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	buttons[key][i].addEventListener("click", auxClickHandler);
	buttons[key][i].addEventListener("mouseover", auxMouseInHandler);
	buttons[key][i].addEventListener("mouseout", auxMouseOutHandler);
}

function removeEVLButtons(buttons, key, i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	buttons[key][i].removeEventListener("click", auxClickHandler);
	buttons[key][i].removeEventListener("mouseover", auxMouseInHandler);
	buttons[key][i].removeEventListener("mouseout", auxMouseOutHandler);
}

function auxChangeSpaceships(menus, buttons, spaceships, imgs, spaceshipsUser, spaceshipAntiga, left, middle, right, leave){
	//left
	if (parseInt(spaceshipsUser[left]) == 1 ){
		spaceships[left][1].style.left = "280px" ;
		spaceships[left][1].style.top = "200px" ;
		spaceships[left][1].style.display = "block" ;
		spaceships[left][1].style.opacity = 0.3;

		spaceships[left][1].width  = imgs["imgsMenus"]["spaceship"+1][left].naturalWidth/2 ;
		spaceships[left][1].height = imgs["imgsMenus"]["spaceship"+1][left].naturalHeight/2;
	}else{
		spaceships[left][0].style.left = "280px" ;
		spaceships[left][0].style.top = "200px" ;
		spaceships[left][0].style.display = "block" ;
		spaceships[left][0].style.opacity = 0.3;

		spaceships[left][0].width  = imgs["imgsMenus"]["spaceship"+0][left].naturalWidth/2 ;
		spaceships[left][0].height = imgs["imgsMenus"]["spaceship"+0][left].naturalHeight/2;
	}


	//spaceship middle
	if (parseInt(spaceshipsUser[middle]) == 1 ){
		buttons["chooseSpaceshipMenu"][2].style.display = "block";

		spaceships[middle][1].style.left = "510px" ;
		spaceships[middle][1].style.top = "100px" ;
		spaceships[middle][1].style.display = "block" ;
		spaceships[middle][1].style.opacity = 1;

		spaceships[middle][1].width  = imgs["imgsMenus"]["spaceship"+1][middle].naturalWidth ;
		spaceships[middle][1].height = imgs["imgsMenus"]["spaceship"+1][middle].naturalHeight;
	}else{
		buttons["chooseSpaceshipMenu"][2].style.display = "none";

		spaceships[middle][0].style.left = "510px" ;
		spaceships[middle][0].style.top = "100px" ;
		spaceships[middle][0].style.display = "block" ;
		spaceships[middle][0].style.opacity = 1;

		spaceships[middle][0].width  = imgs["imgsMenus"]["spaceship"+0][middle].naturalWidth ;
		spaceships[middle][0].height = imgs["imgsMenus"]["spaceship"+0][middle].naturalHeight;

	}

	//right
	if (parseInt(spaceshipsUser[right]) == 1 ){
		spaceships[right][1].style.left = "860px" ;
		spaceships[right][1].style.top = "200px" ;
		spaceships[right][1].style.display = "block" ;
		spaceships[right][1].style.opacity = 0.3;

		spaceships[right][1].width  = imgs["imgsMenus"]["spaceship"+1][right].naturalWidth/2 ;
		spaceships[right][1].height = imgs["imgsMenus"]["spaceship"+1][right].naturalHeight/2;
	}else{
		spaceships[right][0].style.left = "860px" ;
		spaceships[right][0].style.top = "200px" ;
		spaceships[right][0].style.display = "block";
		spaceships[right][0].style.opacity = 0.3;

		spaceships[right][0].width  = imgs["imgsMenus"]["spaceship"+0][right].naturalWidth/2 ;
		spaceships[right][0].height = imgs["imgsMenus"]["spaceship"+0][right].naturalHeight/2;
	}

	//leave 

	if(leave != "aqui leave no existe"){
		spaceships[leave][0].style.display = "" ;
		spaceships[leave][1].style.display = "" ;

		//texts
		menus["chooseSpaceshipMenu"].children["BoxAc"].children["spaceship"+spaceshipAntiga].style.display = "";
		menus["chooseSpaceshipMenu"].children["BoxSpecs"].children["spaceship"+spaceshipAntiga].style.display = "";
	}


	//texts
	menus["chooseSpaceshipMenu"].children["BoxAc"].children["spaceship"+middle].style.display = "block";
	menus["chooseSpaceshipMenu"].children["BoxSpecs"].children["spaceship"+middle].style.display = "block";
}




function putCorrectSpaceships(auxMisc, menus, buttons, spaceships, imgs){

	//var data = player.getCookie(auxMisc["playerAtual"]);
	var spaceshipsUser = auxMisc["cookieStore"]["Spaceships"];
	
	let nSpaceships = (menus["chooseSpaceshipMenu"].childElementCount-6)/2 ; 
	auxMisc["currentSpaceship"] = 0;


	//erases everything in the beggining, then it writes.
	for (let i = 0 ; i < nSpaceships;i++){
		spaceships[i][0].style.display = "";
		spaceships[i][1].style.display = "";
	}
	for (let i = 0 ; i < nSpaceships;i++){
		menus["chooseSpaceshipMenu"].children["BoxAc"].children["spaceship"+i].style.display = "";
		menus["chooseSpaceshipMenu"].children["BoxSpecs"].children["spaceship"+i].style.display = "";
	}


	var left = myMod(auxMisc["currentSpaceship"] - 1,nSpaceships);
	var right = myMod(auxMisc["currentSpaceship"] + 1, nSpaceships);


	auxChangeSpaceships(menus, buttons,spaceships,imgs, spaceshipsUser, "no ha spaceship old", left, auxMisc["currentSpaceship"], right, "aqui leave no existe");
}



function domSpaceships(menus){
	var spaceships = [];
	let nSpaceships = (menus["chooseSpaceshipMenu"].childElementCount-6)/2 ; 

	//spaceships
	for (let i = 0 ; i < nSpaceships;i++){
		spaceships[i] = []
		var spaceshipLocked = menus["chooseSpaceshipMenu"].children["spaceship0_"+i];
		spaceships[i].push(spaceshipLocked);
		var spaceship = menus["chooseSpaceshipMenu"].children["spaceship1_"+i];
		spaceships[i].push(spaceship);
	}

	return spaceships;
}


function myMod(n, m) {
  return ((n % m) + m) % m;
}

function togglePauseMenu(buttons, menus, auxMisc, sounds, musics, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){

	updateSoundButton(sounds, musics, buttons, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

	buttons["pauseMenu"][6].style.display = "none";

	// only clicks on the options if the popUpMenu is with style.display = ""
	if(menus["pauseMenu"].style.display == "" && menus["popUpMenu"].style.display == ""){
		menus["pauseMenu"].style.display = "block";

		sounds["esc"][0].load();
		sounds["esc"][0].play().catch(function(){});

		for (var i = 0 ; i < buttons[auxMisc["currentMenu"]].length; i++){
			buttons[auxMisc["currentMenu"]][i].removeEventListener("click",auxClickHandler);
			buttons[auxMisc["currentMenu"]][i].removeEventListener("mouseover",auxMouseInHandler);
			buttons[auxMisc["currentMenu"]][i].removeEventListener("mouseout",auxMouseOutHandler);
		}

	}//if the user is ingame and he unlocks a spaceship, only click on options when the popUpMenu disappears
	else if (menus["popUpMenu"].style.display == ""){
		menus["pauseMenu"].style.display = "";

		sounds["esc"][1].load();
		sounds["esc"][1].play().catch(function(){});

		for (var i = 0 ; i < buttons[auxMisc["currentMenu"]].length; i++){
			buttons[auxMisc["currentMenu"]][i].addEventListener("click", auxClickHandler);
			buttons[auxMisc["currentMenu"]][i].addEventListener("mouseover", auxMouseInHandler);
			buttons[auxMisc["currentMenu"]][i].addEventListener("mouseout", auxMouseOutHandler);
		}

	}


}


function removeEventListeners(buttons, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	window.removeEventListener("keydown",auxKeyDownHandler);	

	for (let key in buttons){
		if (key != "pauseMenu"){
		
			for(let i = 0; i < buttons[key].length; i ++){
				buttons[key][i].removeEventListener("click", auxClickHandler);
				buttons[key][i].removeEventListener("mouseover", auxMouseInHandler);
				buttons[key][i].removeEventListener("mouseout", auxMouseOutHandler);
			}
		
		}
	}
}


function firstMenu(menus, auxMisc, musics, body){
	body.bgColor = "#00083b";

	if(auxMisc["oldMenu"] == "fillerText"){
		musics["music"][0].loop = true;
		musics["music"][0].load();
		musics["music"][0].play().catch(function(){});
	}

	menus["startMenu"].style.display = "block";

	auxMisc["currentMenu"] = "startMenu";
	auxMisc["oldMenu"] = "fillerText";



}


function mainMenu(menus, auxMisc, musics, body){
	body.bgColor = "#00081d";
	menus["canvasFigure"].style.display = "";
	menus["loginRegMenu"].style.display = "";
	menus["mainMenu"].style.display = "block";

	if (auxMisc["currentMenu"] == "loginRegMenu"){
		auxMisc["oldMenu"] = "loginRegMenu";
	}
	else{
		auxMisc["oldMenu"] = "algumGame;_;";


		//pauses every music
		for(let key in musics){
			for ( let i = 0; i < Object.keys(musics[key]).length; i++){
				musics[key][i].pause();
				musics[key][i].currentTime = 0;
			}
		}

		//musics["music"][0].loop = true;
		musics["music"][0].load();
		musics["music"][0].play().catch(function(){});
		menus["pauseMenu"].style.display = "";
	}

	auxMisc["currentMenu"] = "mainMenu";

	readsCookies(menus, auxMisc);
	
}


function login(name, menus, auxMisc, musics, body, buttons, domAux, player){
	auxMisc["playerAtual"] = name;
	//document.getElementById("playerMain").innerHTML = name;
	domAux["playerMain"].innerHTML = name; 

	mainMenu(menus, auxMisc, musics, body);
	//readsCookies(menus, auxMisc);
	unlocksLevels(buttons, player);
}

function unlocksLevels(buttons, player){
	var level = player.level;
	for(var i = 0; i < parseInt(level) + 1; i++){
		buttons["levelMenu"][i].style.display = "block";
	}

	for(;i < buttons["levelMenu"].length -1 ;i++){
		buttons["levelMenu"][i].style.display = "";
	}

}


function readsCookies(menus, auxMisc){
	// Loads the progress of all the players
	// {"player1": [0,0,0,"1000"] , "player2": [1,123,0,"1110"]}
	var players = parsesCookies();
	//Save the players/records on the LeaderBoard (Henrique)
	//{"Campain": {"player1": 45 ,"gameCampain":27 } ,"Endless":{"player1": 332388,"me": 3442} }
	var records  = createRecordsArray(players, auxMisc);
	fillLeaderBoard(records, menus);


	auxMisc["cookieStore"]["Tutorial"]   = players[auxMisc["playerAtual"]][4];
	auxMisc["cookieStore"]["Spaceships"] = players[auxMisc["playerAtual"]][3];
}


//We parse the cookies to get all the players information
function parsesCookies() {
	// Loads the progress of all the players
	// {"player1": [0,0,0,"1000"] , "player2": [1,123,0,"1110"]}
	var players = {};
	var name;

	var decodedCookies = decodeURIComponent(document.cookie);
	var splitedCookies = decodedCookies.split(';');
	for(let cookie in splitedCookies) {
		var splitedCookie = splitedCookies[cookie].split('=');

		while(splitedCookie[0][0] == ' '){
			splitedCookie[0] = splitedCookie[0].substring(1);
		}

		if (splitedCookie[0].indexOf("Level") != -1) {
			name = splitedCookie[0].substring(0,splitedCookie[0].indexOf("Level"));
			if(players[name] == undefined){
				players[name] = new Array();
			}
			players[name][0] = splitedCookie[1];

		}else if (splitedCookie[0].indexOf("Campain") != -1) {
			name = splitedCookie[0].substring(0,splitedCookie[0].indexOf("Campain"));
			if(players[name] == undefined){
				players[name] = new Array();
			}
			players[name][1] = splitedCookie[1];

		}else if (splitedCookie[0].indexOf("Endless") != -1) {
			name = splitedCookie[0].substring(0,splitedCookie[0].indexOf("Endless"));
			if(players[name] == undefined){
				players[name] = new Array();
			}
			players[name][2] = splitedCookie[1];
		}
		else if (splitedCookie[0].indexOf("Spaceships") != -1) {
			name = splitedCookie[0].substring(0,splitedCookie[0].indexOf("Spaceships"));
			if(players[name] == undefined){
				players[name] = new Array();
			}
			players[name][3] = splitedCookie[1];
		}
		else if (splitedCookie[0].indexOf("Tutorial") != -1) {
			name = splitedCookie[0].substring(0,splitedCookie[0].indexOf("Tutorial"));
			if(players[name] == undefined){
				players[name] = new Array();
			}
			players[name][4] = splitedCookie[1];
		}
		
	}

	return players;
}


function createRecordsArray(players, auxMisc){
	//Save the players/records on the LeaderBoard (Henrique)
	//{"Campain": {"player1": 45 ,"gameCampain":27 } ,"Endless":{"player1": 332388,"me": 3442} }
	var records = {"Campain":{}, "Endless":{} };

	for (let user in players){
		//verificar se ja tem os levels every desbloqueados
		if (players[user][0] == auxMisc["maxLevel"] && players[user][1] != 0){
			//coloca o player no dict dos records
			records["Campain"][user] = players[user][1];
		}
		if (players[user][2] != 0){
			//coloca o player no dict dos records
			records["Endless"][user] = players[user][2];
		}
	}

	// Sort Campain
	// Create items array
	var items = Object.keys(records["Campain"]).map(function(key) {
		return [key, records["Campain"][key]];
	});

	// Sort the array based on the second element
	items.sort(function(first, second) {
		return second[1] - first[1];
	});

	var aux = {"Campain":{}  };
	for (let i = 0;i < items.length;i++){
		aux["Campain"][items[i][0]] = items[i][1];
	}
	records["Campain"] = aux["Campain"];



	// Sort Endless
	// Create items array
	var items = Object.keys(records["Endless"]).map(function(key) {
		return [key, records["Endless"][key]];
	});

	// Sort the array based on the second element
	items.sort(function(first, second) {
		return second[1] - first[1];
	});

	var aux = {"Endless":{}  };
	for (let i = 0;i < items.length;i++){
		aux["Endless"][items[i][0]] = items[i][1];
	}
	records["Endless"] = aux["Endless"];

	return records;
}

function fillLeaderBoard(records, menus){
	var list = menus["leaderBoard"].children["LeaderBoardTable"].children["listC"];
	var player = list.children["playerC"];
	var result = list.children["score"];

	//declared as var i, so it stays with the value of when the for ended
	var i;

	//CAMPAIN
	for (i = 0; i < 6 && i < Object.keys(records["Campain"]).length; i++){
		player.children[i].innerHTML = Object.keys(records["Campain"])[i];
		result.children[i].innerHTML = Object.values(records["Campain"])[i];
	}
	for (;i < 6; i++){
		player.children[i].innerHTML = "";
		result.children[i].innerHTML = "";
	}

	var list = menus["leaderBoard"].children["LeaderBoardTable"].children["listI"];
	var player = list.children["playerI"];
	var result = list.children["time"];

	//ENDLESS
	for (i = 0; i < 6 && i < Object.keys(records["Endless"]).length; i++){
		player.children[i].innerHTML = Object.keys(records["Endless"])[i];
		result.children[i].innerHTML = Object.values(records["Endless"])[i];
	}
	for (;i < 6; i++){
		player.children[i].innerHTML = "";
		result.children[i].innerHTML = "";
	}
}




//return true/false if the player does/doesn't exist.
function checkCookie(name) {

	var counter = 0;
	var decodedCookies = decodeURIComponent(document.cookie);
	var splitedCookies = decodedCookies.split(';');
	for(let cookie in splitedCookies) {
		var splitedCookie = splitedCookies[cookie].split('=');

		while(splitedCookie[0][0] == ' '){
			splitedCookie[0] = splitedCookie[0].substring(1);
		}

		if(splitedCookie[0].indexOf(name) == 0 &&
			(splitedCookie[0].substring(name.length) == "Level"      ||
			 splitedCookie[0].substring(name.length) == "Campain"    ||
			 splitedCookie[0].substring(name.length) == "Endless"    ||
			 splitedCookie[0].substring(name.length) == "Spaceships" ||
			 splitedCookie[0].substring(name.length) == "Tutorial") ) {
			counter++;
			if(counter == 5){
				return true;
			}
		}
	}
	return false;
}

function deleteCookie(name) {
	document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
}