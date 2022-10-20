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


	//saves buttons reference to the DOM
	//this way we can do style.block and style.none to display and hide menus
	var menus = (new Menus(document, auxMisc["menusArray"]))["domElements"];



    function initEndHandler(ev){
		window.removeEventListener("initEnd", initEndHandler);
		firstMenu(menus, auxMisc);

		auxMisc.loadSpaceships(menus);
		menuListeners(auxMisc, menus);
	}

	function initSoundsEndHandler(ev){
		window.removeEventListener("initSoundsEnd", initSoundsEndHandler);
		window.addEventListener("initEnd", initEndHandler);

		calculateMonitorRefreshRate(auxMisc);
	}

	function initMusicsEndHandler(ev){
		window.removeEventListener("initMusicsEnd", initMusicsEndHandler);
		window.addEventListener("initSoundsEnd", initSoundsEndHandler);

		//load the sounds of the game
		auxMisc.nToLoad = {"rockets" : 1 , "buttons" : 2 ,"esc" : 2 };
		auxMisc.sounds = {"rockets" : [], "buttons" : [],"esc" : []};


		initSounds(auxMisc);
	}

	function initImagesEndHandler(ev){
		window.removeEventListener("initImagesEnd", initImagesEndHandler);
		window.addEventListener("initMusicsEnd", initMusicsEndHandler);

		//load the music of the game
		auxMisc.nToLoad  = {"campaign" : 3 ,"endless" : 1 , "boss" : 2 ,"music": 1 };
		auxMisc.musics   = {"campaign" : [],"endless" : [], "boss" : [],"music": []};


		initMusics(auxMisc);
	}


	function initMenuEndHandler(ev){
		window.removeEventListener("initMenuEnd", initMenuEndHandler);
		window.addEventListener("initImagesEnd", initImagesEndHandler);

		auxMisc.nToLoad = { "spaceship" : 5 , "enemies" : 2 , "boss" : 2 , "asteroids" : 1 , "powerups" : 9 , "others" : 1, "rockets" : 1 , "enemyRockets" : 1 , "background" : 1 , "explosions" : 1 , "gameover" : 2 , "win" : 1 };
		auxMisc.nLoaded = { "spaceship" : 0 , "enemies" : 0 , "boss" : 0 , "asteroids" : 0 , "powerups" : 0 , "others" : 0, "rockets" : 0 , "enemyRockets" : 0 , "background" : 0 , "explosions" : 0 , "gameover" : 0 , "win" : 0 };
		auxMisc.imgs = { "spaceship" : [], "enemies" : [], "boss" : [], "asteroids" : [], "powerups" : [], "others" : [],"rockets" : [], "enemyRockets" : [], "background" : [], "explosions" : [], "gameover" : [], "win" : []};

		
		initImages(auxMisc);

	}

	window.addEventListener("initMenuEnd", initMenuEndHandler);
	
	initMenu(auxMisc);



	auxMisc.buttons = new Buttons()

}








function initMenu(auxMisc){
	var numToLoad = 0;

	//Images load handler
	function imgMenuLoad(ev){
		var img = ev.target;

		let key   = img.id.split("_")[0];
		auxMisc.nLoaded[key] += 1;

		if (allLoaded(auxMisc.nLoaded, numToLoad) == true){
			var evInitMenuEnd = new Event("initMenuEnd");
			window.dispatchEvent(evInitMenuEnd);
		}
	}

	for (let toLoad in auxMisc.nToLoad){
		numToLoad += auxMisc.nToLoad[toLoad];
	}

	for (let key in auxMisc.imgsMenu){
		for (var i = 0; i < auxMisc.nToLoad[key]; i++ ){

			auxMisc.imgsMenu[key][i] 		= new Image(); 
			auxMisc.imgsMenu[key][i].addEventListener("load", imgMenuLoad);

			auxMisc.imgsMenu[key][i].id 	= [key]+"_" + i;
			auxMisc.imgsMenu[key][i].src 	= "resources/menu/"+[key]+"_" + i + ".png";  //dá ordem de loadmento da imagem

		}
	}
}


function initImages(auxMisc){
	var numToLoad = 0;

	//Images load handler
	function imgLoad(ev){
		var img = ev.target;

		let key   = img.id.split("_")[0];
		auxMisc.menuNLoaded[key] += 1;

		if (allLoaded(auxMisc.menuNLoaded, numToLoad) == true){
			var evInitImagesEnd = new Event("initImagesEnd");
			auxMisc.imgs["imgsMenu"] = auxMisc.imgsMenu;
			window.dispatchEvent(evInitImagesEnd);
		}
	}

	for (let toLoad in auxMisc.menuNToLoad){
		numToLoad += auxMisc.menuNToLoad[toLoad];
	}

	for (let key in auxMisc.imgs){
		for (var i = 0; i < auxMisc.menuNToLoad[key]; i++ ){

			auxMisc.imgs[key][i] 		= new Image(); 
			auxMisc.imgs[key][i].addEventListener("load", imgLoad);

			auxMisc.imgs[key][i].id 	= [key]+"_" + i;
			auxMisc.imgs[key][i].src 	= "resources/game/"+[key]+"_" + i + ".png";  //dá ordem de loadmento da imagem

		}
	}

}

function initMusics(auxMisc){

	for (let key in auxMisc.musics){
		for (var i = 0; i < auxMisc.nToLoad[key]; i++ ){

			auxMisc.musics[key][i] 	 = new Audio();

			auxMisc.musics[key][i].id 	 = [key]+"_" + i;
			auxMisc.musics[key][i].src  = "resources/musics/"+[key]+"_" + i + ".mp3";  //dá ordem de loadmento da imagem

		}
	}


	var evInitEnd = new Event("initMusicsEnd");
	window.dispatchEvent(evInitEnd);
}

function initSounds(auxMisc){

	for (let key in auxMisc.sounds){
		for (var i = 0; i < auxMisc.nToLoad[key]; i++ ){

			auxMisc.sounds[key][i] 		= new Audio();

			auxMisc.sounds[key][i].id 	= [key]+"_" + i;
			auxMisc.sounds[key][i].src 	= "resources/sounds/"+[key]+"_" + i + ".mp3";  //dá ordem de loadmento da imagem

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








function menuListeners(auxMisc, menus){

	var auxKeyDownHandler = function(ev){
		KeyDownHandler(ev, menus, auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}

	var auxClickHandler = function(ev){

		auxMisc.sounds["buttons"][1].load();
		auxMisc.sounds["buttons"][1].play().catch(function(){});
		
		//which button?
		switch(ev.target.id){

			//PAUSA--------------
			//mute
			case("pauseMenu_muteM"): 
				muteClickHandlerM(auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;

			case("pauseMenu_volumeLowM"): 
				somLowClickHandlerM(auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;

			case("pauseMenu_volumeHighM"):
				somHighClickHandlerM(auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;
			case("pauseMenu_muteS"): 
				muteClickHandlerS(auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;
			case("pauseMenu_volumeLowS"): 
				somLowClickHandlerS(auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;
			case("pauseMenu_volumeHighS"):
				somHighClickHandlerS(auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;
			case("pauseMenu_back"):
				leaveDoGameClickHandler(auxMisc, menus, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;




			//START------------
			case("startMenu_startButton"):
				startClickHandler(ev, menus, auxMisc);
				break;





			//LOGIN REG------------
			//signUp
			case("loginRegMenu_signUpButton"):
				signUpClickHandler(ev, menus, auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;

			//login
			case("loginRegMenu_loginButton"):
				loginClickHandler(menus, auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;


			//POP UP------------
			//yes
			case("popUpMenu_yesButton"):
				yesClickHandler(ev, menus, auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;
			//ok
			case("popUpMenu_okButton"):
				okClickHandler(ev, menus, auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;
			//no
			case("popUpMenu_noButton"):
				noClickHandler(ev, menus, auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;



			//MAIN MENU------------
			//campaign
			case("mainMenu_campaign"): 
				campaignClickHandler(ev, auxMisc, menus);
				break;

			//endless
			case("mainMenu_endless"):
				endlessClickHandler(ev, auxMisc, menus);
				break;

			case("mainMenu_editor"):
				console.log("editor");
				break;

			//closes game
			case("mainMenu_leave"): 
				closesGameClickHandler(ev, auxMisc, menus); 
				break;

			//help
			case("mainMenu_help"):
				helpClickHandler(ev, menus, auxMisc);
				break;

			//credits
			case("mainMenu_credits"): 
				creditsClickHandler(ev, menus, auxMisc);
				break;
			
			//leaderBoard
			case("mainMenu_leaderBoard"): 
				leaderBoardClickHandler(ev, menus, auxMisc);
				break;						
			
			//controls
			case("mainMenu_controls"): 
				controlsClickHandler(ev, menus, auxMisc);
				break;		


			//LEVEL MENU------------
			//level 1
			case("levelMenu_level1"): 
				levelClickHandler(ev, auxMisc, menus, 1);
				break;
			case("levelMenu_level2"): 
				levelClickHandler(ev, auxMisc, menus, 2);
				break;

			case("levelMenu_level3"):
				levelClickHandler(ev, auxMisc, menus, 3);
				break;

			case("levelMenu_speedrun"):
				speedrunClickHandler(ev, auxMisc, menus);
				break;
			//back
			case("levelMenu_back"):
				levelMenuBack(ev, menus, auxMisc);
				break;





			//CHOOSE SPACESHIP MENU------------
			//left
			case("chooseSpaceshipMenu_right"): 
				leftClickHandler(ev, auxMisc, menus);
				break;

			//right
			case("chooseSpaceshipMenu_left"): 
				rightClickHandler(ev, auxMisc, menus);
				break;

			//play
			case("chooseSpaceshipMenu_go"):
				playClickHandler(ev, auxMisc, menus, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;
			//back
			case("chooseSpaceshipMenu_backChooseSpaceship"):
				chooseSpaceshipsMenuBack(ev, menus, auxMisc);
				break;




			//LEADERBOARD------------
			//back
			case("leaderBoard_leaderBoardBack"):
				leaderBoardBackClickHandler(ev, menus, auxMisc);
				break;


			//CREDITS MENU------------
			//back
			case("creditsMenu_backCredits"):
				creditsBackClickHandler(ev, menus, auxMisc);
				break;

			//CONTROLS MENU------------
			//back
			case("controlsMenu_backControl"):
				controlsBackClickHandler(ev, menus, auxMisc);
				break;

			case("controlsMenu_nextControl"):
				controlsNextClickHandler(ev, menus, auxMisc);
				break;	
			case("controlsMenu_playControll"):
				controlsPlayClickHandler(ev, auxMisc, menus, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;

			//HELP MENU------------
			//back
			case("helpMenu_backHelp"):
				helpBackClickHandler(ev, menus, auxMisc);
				break;
			//next
			case("helpMenu_nextHelp"):
				helpPlayClickHandler(ev, auxMisc, menus, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;
		}
	}



	var auxMouseInHandler = function(ev){

			let key = ev.target.id.split("_")[0];
			let index = ev.target.id.split("_")[1];

			auxMisc.buttons[key][index].style.opacity = 0.7;
			auxMisc.buttons[key][index].style.cursor = "pointer";

			auxMisc.sounds["buttons"][0].load();
			auxMisc.sounds["buttons"][0].play().catch(function(){});
	}

	var auxMouseOutHandler = function(ev){

			let key = ev.target.id.split("_")[0];
			let index = ev.target.id.split("_")[1];

			auxMisc.buttons[key][index].style.opacity = 1;
			auxMisc.buttons[key][index].style.cursor = "default";

	}





	//LISTENERS vvvvv
	window.addEventListener("keydown",auxKeyDownHandler);	


	//if he is coming from the game and he didnt unlock fillerText Henrique
	if (auxMisc["oldMenu"] == "chooseSpaceshipMenu" && menus["popUpMenu"].style.display == ""){

		for(let key in auxMisc.buttons){
			if(key != "pauseMenu"){
				for (var i in auxMisc.buttons[key]){
					addEVLButtons(auxMisc.buttons, key, i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				}
			}
		}

	//beggining
	}else if(auxMisc["oldMenu"] == "fillerText"){

		for(let key in auxMisc.buttons){
			for (var i in auxMisc.buttons[key]){
				addEVLButtons(auxMisc.buttons, key, i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
			}
		}

	//if he is coming from a game and he unlocked a spaceship
	}else if(auxMisc["oldMenu"] == "chooseSpaceshipMenu" && menus["popUpMenu"].style.display == "block"){
		for(let key in auxMisc.buttons){
			if(key == "popUpMenu"){
				for (var i in auxMisc.buttons[key]){
					addEVLButtons(auxMisc.buttons, key, i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				}
			}
		}

	}


	//LISTENERS ^^^^^^
}






















function EnterPress(menus, auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	if(auxMisc["currentMenu"] == "loginRegMenu"){
		loginClickHandler(menus, auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler)
	}
}



//Handlers vvvvvv

function KeyDownHandler(ev, menus, auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){


	switch(ev.code) {
		case "Escape": togglePauseMenu(menus, auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler); break;
		case "Enter":  EnterPress(menus, auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler); break;
		case "KeyP":
			auxMisc["secretProgress"] += "P";
			if(auxMisc["secretPress"].indexOf(auxMisc["secretProgress"]) != 0){
				auxMisc["secretProgress"] = "P";
			}
			else if(auxMisc["secretPress"] == auxMisc["secretProgress"]){
				var unlockingSpaceship = 4;
				unlockSpaceship(unlockingSpaceship, auxMisc, menus, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
			}
			break;
		default: secret(ev, auxMisc, menus, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);break;
		

	}
}


// PAUSE -------

function muteClickHandlerM(auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	for(let key in auxMisc.musics){
		for ( let i = 0; i < Object.keys(musics[key]).length; i++){
			auxMisc.musics[key][i].volume = 0;
		}
	}
	
	auxMisc.buttons["pauseMenu"]["muteM"].style.opacity = 0.3;
	auxMisc.buttons["pauseMenu"]["muteM"].style.cursor = "default";
	removeEVLButtons(auxMisc.buttons, "pauseMenu", "pauseMenu", auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	
	auxMisc.buttons["pauseMenu"]["volumeLowM"].style.opacity = 0.3;
	auxMisc.buttons["pauseMenu"]["volumeLowM"].style.cursor = "default";
	removeEVLButtons(auxMisc.buttons, "pauseMenu", "pauseMenu", auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

	//sound goes from 1 to 0
	auxMisc.buttons["pauseMenu"]["volumeHighM"].style.opacity = 1;
	addEVLButtons(auxMisc.buttons, "pauseMenu", "volumeHighM", auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
}

function somLowClickHandlerM(auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	console.log("-M");		
	
	//place volume up button again
	if (auxMisc.musics["music"][0].volume + 0.2 > 1){
		auxMisc.buttons["pauseMenu"]["volumeHighM"].style.opacity = 1;
		addEVLButtons(auxMisc.buttons, "pauseMenu", "volumeHighM", auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}


	for(let key in auxMisc.musics){
		for ( let i = 0; i < Object.keys(auxMisc.musics[key]).length; i++){
			auxMisc.musics[key][i].volume -= 0.2;
		}
	}


	//turn of mute and volume down buttons
	if (auxMisc.musics["music"][0].volume - 0.2 < 0 ){
		auxMisc.buttons["pauseMenu"]["muteM"].style.opacity = 0.3;
		auxMisc.buttons["pauseMenu"]["muteM"].style.cursor = "default";
		removeEVLButtons(auxMisc.buttons, "pauseMenu", "muteM", auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

		auxMisc.buttons["pauseMenu"]["volumeLowM"].style.opacity = 0.3;
		auxMisc.buttons["pauseMenu"]["volumeLowM"].style.cursor = "default";
		removeEVLButtons(auxMisc.buttons, "pauseMenu", "volumeLowM", auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}

}

function somHighClickHandlerM(auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	console.log("+M");		

	//place volume down and mute buttons again
	if (auxMisc.musics["music"][0].volume - 0.2 < 0 ){
		auxMisc.buttons["pauseMenu"]["muteM"].style.opacity = 1;
		addEVLButtons(auxMisc.buttons, "pauseMenu", "muteM", auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

		auxMisc.buttons["pauseMenu"]["volumeLowM"].style.opacity = 1;
		addEVLButtons(auxMisc.buttons, "pauseMenu", "volumeLowM", auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}

	for(let key in auxMisc.musics){
		for ( let i = 0; i < Object.keys(auxMisc.musics[key]).length; i++){
			auxMisc.musics[key][i].volume += 0.2;
		}
	}


	//turn off volume up button
	if (auxMisc.musics["music"][0].volume + 0.2 > 1){
		auxMisc.buttons["pauseMenu"]["volumeHighM"].style.opacity = 0.3;
		auxMisc.buttons["pauseMenu"]["volumeHighM"].style.cursor = "default";
		removeEVLButtons(buttons, "pauseMenu", "volumeHighM", auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}

}



function muteClickHandlerS(auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){	
	for(let key in auxMisc.sounds){
		for ( let i = 0; i < Object.keys(auxMisc.sounds[key]).length; i++){
			auxMisc.sounds[key][i].volume = 0;
		}
	}

	auxMisc.buttons["pauseMenu"]["muteS"].style.opacity = 0.3;
	auxMisc.buttons["pauseMenu"]["muteS"].style.cursor = "default";
	removeEVLButtons(auxMisc.buttons, "pauseMenu", "muteS", auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

	auxMisc.buttons["pauseMenu"]["volumeLowS"].style.opacity = 0.3;
	auxMisc.buttons["pauseMenu"]["volumeLowS"].style.cursor = "default";
	removeEVLButtons(auxMisc.buttons, "pauseMenu", "volumeLowS", auxClickHandler, auxMouseInHandler, auxMouseOutHandler);


	//sound goes from 1 to 0
	auxMisc.buttons["pauseMenu"]["volumeHighS"].style.opacity = 1;
	addEVLButtons(auxMisc.buttons, "pauseMenu", "volumeHighS", auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
}

function somLowClickHandlerS(auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	console.log("-S");		
	
	//place volume up button again
	if (auxMisc.sounds["buttons"][0].volume + 0.2 > 1){
		auxMisc.buttons["pauseMenu"]["volumeHighS"].style.opacity = 1;
		addEVLButtons(auxMisc.buttons, "pauseMenu", "volumeHighS", auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}


	for(let key in auxMisc.sounds){
		for ( let i = 0; i < Object.keys(auxMisc.sounds[key]).length; i++){
			auxMisc.sounds[key][i].volume -= 0.2;
		}
	}

	//turn of mute and volume down buttons
	if (auxMisc.sounds["buttons"][0].volume - 0.2 < 0 ){
		auxMisc.buttons["pauseMenu"]["volumeLowS"].style.opacity = 0.3;
		auxMisc.buttons["pauseMenu"]["volumeLowS"].style.cursor = "default";
		removeEVLButtons(auxMisc.buttons, "pauseMenu", "volumeLowS", auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

		auxMisc.buttons["pauseMenu"]["muteS"].style.opacity = 0.3;
		auxMisc.buttons["pauseMenu"]["muteS"].style.cursor = "default";
		removeEVLButtons(auxMisc.buttons, "pauseMenu", "muteS", auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}

}



function somHighClickHandlerS(auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){

	//place mute and volume down buttons again
	if (auxMisc.sounds["buttons"][0].volume - 0.2 < 0 ){
		auxMisc.buttons["pauseMenu"]["muteS"].style.opacity = 1;
		addEVLButtons(auxMisc.buttons, "pauseMenu", "muteS", auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

		auxMisc.buttons["pauseMenu"]["volumeLowS"].style.opacity = 1;
		addEVLButtons(auxMisc.buttons, "pauseMenu", "volumeLowS", auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}


	for(let key in auxMisc.sounds){
		for ( let i = 0; i < Object.keys(auxMisc.sounds[key]).length; i++){
			auxMisc.sounds[key][i].volume += 0.2;
		}
	}

	//turn off volume up button
	if (auxMisc.sounds["buttons"][0].volume + 0.2 > 1){
		auxMisc.buttons["pauseMenu"]["volumeHighS"].style.opacity = 0.3;
		auxMisc.buttons["pauseMenu"]["volumeHighS"].style.cursor = "default";
		removeEVLButtons(auxMisc.buttons, "pauseMenu", "volumeHighS", auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}

}
function leaveDoGameClickHandler(auxMisc, menus, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){

 	//var text = document.getElementById("textPop");
 	var text = auxMisc.domAux["textPop"];

	text.innerHTML = "Quer voltar ao menu principal??"

	auxMisc.buttons["popUpMenu"]["yesButton"].style.display = "block";
	auxMisc.buttons["popUpMenu"]["okButton"].style.display = "none";
	auxMisc.buttons["popUpMenu"]["noButton"].style.display = "block";
	
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
	for (var i in buttons["pauseMenu"]){
		if (auxMisc.buttons["pauseMenu"][i].style.opacity == 1 || i == 6){
			removeEVLButtons(auxMisc.buttons, "pauseMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
		}
	}
	auxMisc.buttons["pauseMenu"]["back"].style.opacity = 0.3;
}


//START------
function startClickHandler(ev, menus, auxMisc){
	menus["startMenu"].style.display = "";
	menus["loginRegMenu"].style.display = "block";

	auxMisc["currentMenu"] = "loginRegMenu";
	auxMisc["oldMenu"] = "startMenu";
}



//LOGIN REG------
function loginClickHandler(menus, auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){

	//var name = document.getElementById("name").value;
	var name = auxMisc.domAux["name"].value;

	//name doesn't exist -> PopUp
	if(checkCookie(name) == false){
		
		//var text = document.getElementById("textPop");
		var text = auxMisc.domAux["textPop"];

		text.innerHTML = "There isn't an account with that username."

		auxMisc.buttons["popUpMenu"]["yesButton"].style.display = "none";
		auxMisc.buttons["popUpMenu"]["okButton"].style.display = "block";
		auxMisc.buttons["popUpMenu"]["noButton"].style.display = "none";
		
		menus["popUpMenu"].style.display = "block";

		//REMOVE BUTTONS EVENTLISTENNERS
		for (let i in auxMisc.buttons["loginRegMenu"]){
			removeEVLButtons(auxMisc.buttons, "loginRegMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
			auxMisc.buttons["loginRegMenu"][i].style.opacity = 1;
		}


	}else{
		auxMisc.player.name = name;
		auxMisc.player.getCookie();
		login(name, menus, auxMisc);
	}
	
}

function signUpClickHandler(ev, menus, auxMisc, auxClickHandler,auxMouseInHandler,auxMouseOutHandler){
	
	//var name = document.getElementById("name").value;
	var name = auxMisc.domAux["name"].value;

	//invalid name
	if( name.indexOf("Level")      != -1 ||
	    name.indexOf("campaign")    != -1 ||
	    name.indexOf("Endless")    != -1 ||
	    name.indexOf("Spaceships") != -1 ||
	    name.indexOf("Tutorial")   != -1 ||
	    name.indexOf(" ")          != -1 ||
	    name == ""){
		//var text = document.getElementById("textPop");
		var text = auxMisc.domAux["textPop"];

		text.innerHTML = "Invalid Username. Keep in mind your name can't be empty, contain spaces or the words: \"Level\", \"campaign\", \"Endless\", \"Spaceships\" and \"Tutorial\"";

		auxMisc.buttons["popUpMenu"]["yesButton"].style.display = "none";
		auxMisc.buttons["popUpMenu"]["okButton"].style.display = "block";
		auxMisc.buttons["popUpMenu"]["noButton"].style.display = "none";
		
		menus["popUpMenu"].style.display = "block";

		//REMOVE BUTTONS EVENTLISTENNERS
		for (var i = 0 ; i < auxMisc.buttons["loginRegMenu"].length; i++){
			removeEVLButtons(auxMisc.buttons, "loginRegMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

			auxMisc.buttons["loginRegMenu"][i].style.opacity = 1;
		}


	//username already exists -> PopUp
	}else if(checkCookie(name) == true){

		//var text = document.getElementById("textPop");
		var text = auxMisc.domAux["textPop"];

		text.innerHTML = "This username has saved progress. Are you sure you want to erase it?"

		auxMisc.buttons["popUpMenu"]["yesButton"].style.display = "block";
		auxMisc.buttons["popUpMenu"]["okButton"].style.display = "none";
		auxMisc.buttons["popUpMenu"]["noButton"].style.display = "block";
		
		menus["popUpMenu"].style.display = "block";


		//REMOVE BUTTONS EVENTLISTENNERS
		for (var i in auxMisc.buttons["loginRegMenu"]){
			removeEVLButtons(auxMisc.buttons, "loginRegMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
			auxMisc.buttons["loginRegMenu"][i].style.opacity = 1;
		}


	}else{
		auxMisc.player.createPlayer(name);
	 	login(name, menus, auxMisc);
	}


}



//POP UP------
function yesClickHandler(ev, menus, auxMisc, auxClickHandler,auxMouseInHandler,auxMouseOutHandler){

	menus["popUpMenu"].style.display = "";
	menus["popUpMenu"].style.zIndex  = 1;


	//if the popup is on Log Reg Menu
	if (auxMisc["currentMenu"] == "loginRegMenu"){

		
		//var name = document.getElementById("name").value;
		var name = auxMisc.domAux["name"].value;

		auxMisc.player.createPlayer(name);
		login(name, menus, auxMisc);

		//Reset Listeners
		for (var i in auxMisc.buttons["loginRegMenu"]){
			addEVLButtons(auxMisc.buttons, "loginRegMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

		}
	}
	//if the popup appears during a game
	else{
		/*buttons["pauseMenu"][6].style.opacity = 1;

		for (var i = 0 ; i < buttons["pauseMenu"].length; i++){
			if (buttons["pauseMenu"][i].style.opacity == 1 ){
				addEVLButtons(auxMisc.buttons, "pauseMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
			}
		}

		//Code to get back to the menu (Henrique)
		
		*/

	}

}

function okClickHandler(ev, menus, auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	menus["popUpMenu"].style.display = "";			
	menus["popUpMenu"].style.zIndex  = 1;

	//if the PopUpMenu has style.display = "block" and the user came from a game
	//this means he unlocked something ingame.
	if(auxMisc["oldMenu"] == "algumGame;_;"){
		for(let key in auxMisc.buttons){
			if(key != "pauseMenu" || key != "popUpMenu" ){
				for (var i in auxMisc.buttons[key]){
					addEVLButtons(auxMisc.buttons, key, i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				}
			}
		}

	//else if (auxMisc["currentMenu"] == "loginRegMenu" || auxMisc["currentMenu"] == "mainMenu"){
	}//if the PopUpMemu is on the Log Reg Menu or MainMenu
	else{
		//Reset Listeners
		for (var i in auxMisc.buttons[auxMisc["currentMenu"]]){
			addEVLButtons(auxMisc.buttons, auxMisc["currentMenu"], i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
		}
	}
}

function noClickHandler(ev, menus, auxMisc, auxClickHandler,auxMouseInHandler,auxMouseOutHandler){
	menus["popUpMenu"].style.display = "";			
	menus["popUpMenu"].style.zIndex  = 1;

	//if the PopUpMemu is on the Log Reg Menu
	if (auxMisc["currentMenu"] == "loginRegMenu"){
		//Reset listeners
		for (var i in auxMisc.buttons["loginRegMenu"]){
				addEVLButtons(auxMisc.buttons, "loginRegMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
		}

	//if the PopUpMemu appears while ingame (Henrique)
	}else{
		/*buttons["pauseMenu"][6].style.opacity = 1;

		for (var i = 0 ; i < buttons["pauseMenu"].length; i++){
			if (buttons["pauseMenu"][i].style.opacity == 1 ){
				addEVLButtons(auxMisc.buttons, "pauseMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
			}
		}*/
	}
}


//MAIN MENU------
function campaignClickHandler(ev, auxMisc, menus){
	menus["mainMenu"].style.display  = "";
	menus["levelMenu"].style.display = "block";

	auxMisc["currentMenu"] = "levelMenu";
	auxMisc["oldMenu"] = "mainMenu";


 	var name = auxMisc["playerAtual"];
 	console.log(name);
	//document.getElementById("playerLevel").innerHTML = name;
	auxMisc.domAux["playerLevel"].textContent = name;
}

function endlessClickHandler(ev, auxMisc, menus){
	auxMisc.body.bgColor = "#0a131f";
	menus["mainMenu"].style.display = "";
	menus["chooseSpaceshipMenu"].style.display = "block";

	auxMisc["currentMenu"] = "chooseSpaceshipMenu";
	auxMisc["oldMenu"] = "mainMenu";
	auxMisc["gamemode"] = "endless";

	putCorrectSpaceships(auxMisc, menus);
}

function playEndlessClickHandler(ev, auxMisc, menus, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	auxMisc.body.bgColor = "black";

	menus["chooseSpaceshipMenu"].style.display    = "";
	menus["canvasFigure"].style.display = "block";
	

	auxMisc["currentMenu"] = "endless";
	auxMisc["oldMenu"] = "chooseSpaceshipMenu";


	removeEventListeners(auxMisc.buttons, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	new Game(auxMisc, menus, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, -1);
}

function closesGameClickHandler(ev, auxMisc, menus){
	menus["mainMenu"].style.display  = "";
	firstMenu(menus, auxMisc);
}

function creditsClickHandler(ev, menus, auxMisc){
	menus["mainMenu"].style.display = "";
	menus["creditsMenu"].style.display = "block";
	auxMisc["currentMenu"] = "creditsMenu";
	auxMisc["oldMenu"] = "mainMenu";


 	var name = auxMisc["playerAtual"];
	//document.getElementById("playerCredits").innerHTML = name;
	auxMisc.domAux["playerCredits"].innerHTML = name;
}

function helpClickHandler(ev, menus, auxMisc){
	auxMisc.body.bgColor = "#0a131f";
	menus["mainMenu"].style.display = "";
	menus["helpMenu"].style.display = "block";
	auxMisc["currentMenu"] = "helpMenu";
	auxMisc["oldMenu"] = "mainMenu";

}

function leaderBoardClickHandler(ev, menus, auxMisc){
	auxMisc.body.bgColor = "#0a131f";
	menus["mainMenu"].style.display = "";
	menus["leaderBoard"].style.display = "block";
	auxMisc["currentMenu"] = "leaderBoard";
	auxMisc["oldMenu"] = "mainMenu";


 	var name = auxMisc["playerAtual"];
	//document.getElementById("playerLeaderBoard").innerHTML = name;
	auxMisc.domAux["playerLeaderBoard"].innerHTML = name;
}

function controlsClickHandler(ev, menus, auxMisc){
	auxMisc.body.bgColor = "#0a131f";
	menus["mainMenu"].style.display = "";
	menus["controlsMenu"].style.display = "block";
	auxMisc["currentMenu"] = "controlsMenu";
	auxMisc["oldMenu"] = "mainMenu";

}







//NIVEL MENU-------
function levelClickHandler(ev, auxMisc, menus, level){
	auxMisc.body.bgColor = "#0a131f";
	menus["levelMenu"].style.display = "";
	menus["chooseSpaceshipMenu"].style.display = "block";

	auxMisc["currentMenu"] = "chooseSpaceshipMenu";
	auxMisc["oldMenu"] = "levelMenu";
	auxMisc["gamemode"] = "level_" + level;

	putCorrectSpaceships(auxMisc, menus);
}

function speedrunClickHandler(ev, auxMisc, menus){
	auxMisc.body.bgColor = "#0a131f";
	menus["levelMenu"].style.display = "";
	menus["chooseSpaceshipMenu"].style.display = "block";

	auxMisc["currentMenu"] = "chooseSpaceshipMenu";
	auxMisc["oldMenu"] = "levelMenu";
	auxMisc["gamemode"] = "speedrun";

	putCorrectSpaceships(auxMisc, menus);
}

function levelMenuBack(ev, menus, auxMisc){
	menus["levelMenu"].style.display = "";
	menus["mainMenu"].style.display = "block";

	auxMisc["currentMenu"] = "mainMenu";
	auxMisc["oldMenu"] = "levelMenu";
}





//CHOOSE SPACESHIP MENU-------
function playClickHandler(ev, auxMisc, menus, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){

	//hasn't seen the controls menu
	if(auxMisc["cookieStore"]["Tutorial"][0] == "0"){

		//appears Controls
		auxMisc.body.bgColor = "#0a131f";

		menus["chooseSpaceshipMenu"].style.display    = "";
		menus["controlsMenu"].style.display = "block";
		
		auxMisc["currentMenu"] = "controlsMenu";
		auxMisc["oldMenu"] = "chooseSpaceshipMenu";

		//checks if the user knows the Help menu
		if(auxMisc["cookieStore"]["Tutorial"][1] == "0" ){
			//buttonNext
			auxMisc.buttons["controlsMenu"]["nextControl"].style.display = "block";
		}else{
			//buttonPlay
			auxMisc.buttons["controlsMenu"]["playControl"].style.display = "block";
		}

	//hasn't seen the help menu <=> Tutorial[1] == "0"
	}else if (auxMisc["cookieStore"]["Tutorial"] == "10"){
		
		//appears Help
		auxMisc.body.bgColor = "#0a131f";

		menus["chooseSpaceshipMenu"].style.display    = "";
		menus["helpMenu"].style.display = "block";
		

		auxMisc["oldMenu"] = "chooseSpaceshipMenu";
		auxMisc["currentMenu"] = "helpMenu";

		//appears buttons 
		auxMisc.buttons["helpMenu"]["nextHelp"].style.display = "block";
	
	//user knows controls and help menus
	}else if (auxMisc["cookieStore"]["Tutorial"] == "11"){
		var gamemode = auxMisc["gamemode"].split("_")[0]; 

		auxMisc.buttons["helpMenu"]["nextHelp"].style.display = "";
		auxMisc.buttons["controlsMenu"]["nextControl"].style.display = "";
		auxMisc.buttons["controlsMenu"]["playControl"].style.display = "";



		if ( gamemode== "level"){
			playLevelClickHandler(ev, auxMisc, menus, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, parseInt(auxMisc["gamemode"].split("_")[1]));
		}
		else if (gamemode == "speedrun"){
			playSpeedrunClickHandler(ev, auxMisc, menus, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
		}
		else if (gamemode == "endless"){
			playEndlessClickHandler(ev, auxMisc, menus, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
		}
	}
}

function playLevelClickHandler(ev, auxMisc, menus, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, level){
	auxMisc.body.bgColor = "black";

	menus["chooseSpaceshipMenu"].style.display    = "";
	menus["canvasFigure"].style.display = "block";
	

	auxMisc["currentMenu"] = "level" + level + "Menu";
	auxMisc["oldMenu"] = "chooseSpaceshipMenu";


	removeEventListeners(auxMisc.buttons, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	new Game(auxMisc, menus, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, level);
}

function playSpeedrunClickHandler(ev, auxMisc, menus, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	body.bgColor = "black";

	menus["chooseSpaceshipMenu"].style.display    = "";
	menus["canvasFigure"].style.display = "block";
	

	auxMisc["currentMenu"] = "speedrun";
	auxMisc["oldMenu"] = "chooseSpaceshipMenu";


	removeEventListeners(auxMisc.buttons, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	new Game(auxMisc, menus, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, 0);
}

function rightClickHandler(ev, auxMisc, menus){

	//var data = player.getCookie(auxMisc["playerAtual"]);
	var spaceshipsUser = auxMisc["cookieStore"]["Spaceships"];
	var spaceshipAntiga = auxMisc["currentSpaceship"];
	auxMisc["currentSpaceship"] = myMod(auxMisc["currentSpaceship"] -1, spaceshipsUser.length); 


	var appears_left = myMod(auxMisc["currentSpaceship"] - 1,spaceshipsUser.length);
	var right = spaceshipAntiga;
	var leave_right = myMod(auxMisc["currentSpaceship"] + 2, spaceshipsUser.length);

	auxChangeSpaceships(menus, auxMisc, spaceshipsUser, spaceshipAntiga, appears_left, auxMisc["currentSpaceship"], right, leave_right);
}

function leftClickHandler(ev, auxMisc, menus){

	//var data = player.getCookie(auxMisc["playerAtual"]);
	var spaceshipsUser = auxMisc["cookieStore"]["Spaceships"];
	
	var spaceshipAntiga = auxMisc["currentSpaceship"];
	auxMisc["currentSpaceship"] = myMod(auxMisc["currentSpaceship"] + 1, spaceshipsUser.length); 


	var leave_left = myMod(auxMisc["currentSpaceship"] - 2,spaceshipsUser.length);
	var left = spaceshipAntiga;
	var appears_right = myMod(auxMisc["currentSpaceship"] + 1, spaceshipsUser.length);

	auxChangeSpaceships(menus, auxMisc, spaceshipsUser, spaceshipAntiga, left, auxMisc["currentSpaceship"], appears_right, leave_left);

}

function chooseSpaceshipsMenuBack(ev, menus, auxMisc){
	menus["chooseSpaceshipMenu"].style.display = "";

	auxMisc.body.bgColor = "#00081d";
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
function leaderBoardBackClickHandler(ev, menus, auxMisc){
	auxMisc.body.bgColor = "#00081d";
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
function controlsBackClickHandler(ev, menus, auxMisc){
	
	menus["controlsMenu"].style.display = "";

	auxMisc.buttons["controlsMenu"]["nextControl"].style.display = "";
	auxMisc.buttons["controlsMenu"]["playControl"].style.display = "";

	//user already saw the Controls menu
	auxMisc["cookieStore"]["Tutorial"] = "1"+auxMisc["cookieStore"]["Tutorial"][1];
	auxMisc.player.updateCoockiesTutorial(auxMisc,"1"+auxMisc["cookieStore"]["Tutorial"][1]);


	if(auxMisc["oldMenu"] == "mainMenu"){
		auxMisc.body.bgColor = "#00081d";
		menus["mainMenu"].style.display = "block";
		auxMisc["currentMenu"] = "mainMenu";
		auxMisc["oldMenu"] = "controlsMenu";
	}else{
		auxMisc.body.bgColor = "#0a131f";
		menus["chooseSpaceshipMenu"].style.display = "block";
		auxMisc["currentMenu"] = "chooseSpaceshipMenu";

		auxMisc["oldMenu"] = "controlsMenu";
		
		auxMisc.buttons["helpMenu"]["nextHelp"].style.display = "";
	}
}

function controlsNextClickHandler(ev, menus, auxMisc){
	auxMisc.body.bgColor = "#0a131f";
	menus["controlsMenu"].style.display = "";
	menus["helpMenu"].style.display = "block";
	auxMisc["currentMenu"] = "helpMenu";
	auxMisc["oldMenu"] = "controlsMenu";

	auxMisc["cookieStore"]["Tutorial"] = "1"+auxMisc["cookieStore"]["Tutorial"][1] ;
	auxMisc.player.updateCoockiesTutorial(auxMisc,"1"+auxMisc["cookieStore"]["Tutorial"][1]);

	auxMisc.buttons["helpMenu"]["nextHelp"].style.display = "block";
}

function controlsPlayClickHandler(ev, auxMisc, menus, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	menus["controlsMenu"].style.display = "";
	
	//user already saw the Controls menu
	auxMisc["cookieStore"]["Tutorial"] = "1"+auxMisc["cookieStore"]["Tutorial"][1] ;
	auxMisc.player.updateCoockiesTutorial(auxMisc,"1"+auxMisc["cookieStore"]["Tutorial"][1]);

	playClickHandler(ev, auxMisc, menus, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
}

//HELP MENU------
function helpBackClickHandler(ev, menus, auxMisc){
	//goes to the old menu
	//if Tutorial[1] == 1 goes to mainMenu;
	//if Tutorial[1] == 0 goes to controls or chooseSpaceshipsMenu
	if(auxMisc["oldMenu"] == "mainMenu"){
		auxMisc.body.bgColor = "#00081d";
	}else{
		auxMisc.body.bgColor = "#0a131f";
	}

	menus["helpMenu"].style.display = "";
	menus[auxMisc["oldMenu"]].style.display = "block";

	auxMisc["currentMenu"] = auxMisc["oldMenu"];
	auxMisc["oldMenu"] = "helpMenu";
	
	//user already saw the Help menu
	auxMisc["cookieStore"]["Tutorial"] = auxMisc["cookieStore"]["Tutorial"][0]+"1" ;
	auxMisc.player.updateCoockiesTutorial(auxMisc, auxMisc["cookieStore"]["Tutorial"][0]+"1");
}

function helpPlayClickHandler(ev, auxMisc, menus, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	menus["helpMenu"].style.display = "";
	
	//user already saw the Help menu
	auxMisc["cookieStore"]["Tutorial"] = auxMisc["cookieStore"]["Tutorial"][0]+"1" ;
	auxMisc.player.updateCoockiesTutorial(auxMisc, auxMisc["cookieStore"]["Tutorial"][0]+"1");

	playClickHandler(ev, auxMisc, menus, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
}

//Handlers ^^^^^^






















//Aux Functions  vvvvvvvv
function secret(ev, auxMisc, menus, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	var unlockingSpaceship = 4;

	//checks if he is on the mainMenu, if he still doesn't have the spaceship and if the popUp menu isn't open
	if(auxMisc["currentMenu"] == "mainMenu" && menus["pauseMenu"].style.display == "" && auxMisc["cookieStore"]["Spaceships"][unlockingSpaceship] != "1" && menus["popUpMenu"].style.display == ""){
		auxMisc["secretProgress"] += ev.code.substring(3);

		if(auxMisc["secretPress"] == auxMisc["secretProgress"]){
			unlockSpaceship(unlockingSpaceship, auxMisc, menus, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);	
		}

	}
}

function unlockSpaceship(unlockingSpaceship, auxMisc, menus, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	var spaceshipsStr = "";

	//update spaceships	
	auxMisc.player.updateCoockiesSpaceships(auxMisc, unlockingSpaceship);
 	for(var i = 0; i < auxMisc["cookieStore"]["Spaceships"].length; i++){

 		if(i == unlockingSpaceship){
 			spaceshipsStr += "1";
 		}else{
 			spaceshipsStr += auxMisc["cookieStore"]["Spaceships"][i];
 		}
 	}
 	auxMisc["cookieStore"]["Spaceships"] = spaceshipsStr;


 	//var text = document.getElementById("textPop");
 	var  text = auxMisc.domAux["textPop"];

	text.innerHTML = "Congratulations you unlocked spaceship number "+ unlockingSpaceship;

	auxMisc.buttons["popUpMenu"]["yesButton"].style.display = "none";
	auxMisc.buttons["popUpMenu"]["okButton"].style.display = "block";
	auxMisc.buttons["popUpMenu"]["noButton"].style.display = "none";
	
	menus["popUpMenu"].style.display = "block";

	//REMOVE BUTTONS EVENTLISTENNERS
	for (var i = 0 ; i < auxMisc.buttons["mainMenu"].length; i++){
		auxMisc.buttons["mainMenu"][i].removeEventListener("click",auxClickHandler);
		auxMisc.buttons["mainMenu"][i].removeEventListener("mouseover",auxMouseInHandler);
		auxMisc.buttons["mainMenu"][i].removeEventListener("mouseout",auxMouseOutHandler);	
		auxMisc.buttons["mainMenu"][i].style.opacity = 1;
	}
}

function unlocksSpaceshipByLevel(levelCompletado, auxMisc, menus, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	switch(levelCompletado){ 
		case(2):    unlockSpaceship(3, auxMisc, menus, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);break;
		case(-11):  unlockSpaceship(2, auxMisc, menus, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);break;
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
	//campaign
	}else{
		musics["campaign"][level - 1].loop = true;
		musics["campaign"][level - 1].load();
		musics["campaign"][level - 1].play().catch(function(){});
	}
}

function updateSoundButton(auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	//max Sound Volume
	if(auxMisc.sounds["buttons"][0].volume + 0.2 > 1){
		auxMisc.buttons["pauseMenu"]["volumeHighS"].style.opacity = 0.3;	
		
		auxMisc.buttons["pauseMenu"]["volumeHighS"].removeEventListener("click",auxClickHandler);
		auxMisc.buttons["pauseMenu"]["volumeHighS"].removeEventListener("mouseover",auxMouseInHandler);
		auxMisc.buttons["pauseMenu"]["volumeHighS"].removeEventListener("mouseout",auxMouseOutHandler);	
	
	//min Sound Volume
	}else if (auxMisc.sounds["buttons"][0].volume - 0.2 < 0){
		auxMisc.buttons["pauseMenu"]["muteS"].style.opacity = 0.3;	
		
		auxMisc.buttons["pauseMenu"]["muteS"].removeEventListener("click",auxClickHandler);
		auxMisc.buttons["pauseMenu"]["muteS"].removeEventListener("mouseover",auxMouseInHandler);
		auxMisc.buttons["pauseMenu"]["muteS"].removeEventListener("mouseout",auxMouseOutHandler);	

		auxMisc.buttons["pauseMenu"]["volumeLowS"].style.opacity = 0.3;	
		
		auxMisc.buttons["pauseMenu"]["volumeLowS"].removeEventListener("click",auxClickHandler);
		auxMisc.buttons["pauseMenu"]["volumeLowS"].removeEventListener("mouseover",auxMouseInHandler);
		auxMisc.buttons["pauseMenu"]["volumeLowS"].removeEventListener("mouseout",auxMouseOutHandler);	
	}


	//max Music Volume
	if(auxMisc.musics["music"][0].volume + 0.2 > 1){
		auxMisc.buttons["pauseMenu"]["volumeHighM"].style.opacity = 0.3;	
		
		auxMisc.buttons["pauseMenu"]["volumeHighM"].removeEventListener("click",auxClickHandler);
		auxMisc.buttons["pauseMenu"]["volumeHighM"].removeEventListener("mouseover",auxMouseInHandler);
		auxMisc.buttons["pauseMenu"]["volumeHighM"].removeEventListener("mouseout",auxMouseOutHandler);	
	
	//min Music Volume
	}else if (auxMisc.musics["music"][0].volume - 0.2 < 0){
		auxMisc.buttons["pauseMenu"]["muteM"].style.opacity = 0.3;	
		
		auxMisc.buttons["pauseMenu"]["muteM"].removeEventListener("click",auxClickHandler);
		auxMisc.buttons["pauseMenu"]["muteM"].removeEventListener("mouseover",auxMouseInHandler);
		auxMisc.buttons["pauseMenu"]["muteM"].removeEventListener("mouseout",auxMouseOutHandler);	

		auxMisc.buttons["pauseMenu"]["volumeLowM"].style.opacity = 0.3;	
	
		auxMisc.buttons["pauseMenu"]["volumeLowM"].removeEventListener("click",auxClickHandler);
		auxMisc.buttons["pauseMenu"]["volumeLowM"].removeEventListener("mouseover",auxMouseInHandler);
		auxMisc.buttons["pauseMenu"]["volumeLowM"].removeEventListener("mouseout",auxMouseOutHandler);	
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

function auxChangeSpaceships(menus, auxMisc, spaceshipsUser, spaceshipAntiga, left, middle, right, leave){
	//left
	if (parseInt(spaceshipsUser[left]) == 1 ){
		auxMisc.spaceships[left][1].style.left = "280px" ;
		auxMisc.spaceships[left][1].style.top = "200px" ;
		auxMisc.spaceships[left][1].style.display = "block" ;
		auxMisc.spaceships[left][1].style.opacity = 0.3;

		auxMisc.spaceships[left][1].width  = auxMisc["imgsMenu"]["spaceship"+1][left].naturalWidth/2 ;
		auxMisc.spaceships[left][1].height = auxMisc["imgsMenu"]["spaceship"+1][left].naturalHeight/2;
	}else{
		auxMisc.spaceships[left][0].style.left = "280px" ;
		auxMisc.spaceships[left][0].style.top = "200px" ;
		auxMisc.spaceships[left][0].style.display = "block" ;
		auxMisc.spaceships[left][0].style.opacity = 0.3;

		auxMisc.spaceships[left][0].width  = auxMisc["imgsMenu"]["spaceship"+0][left].naturalWidth/2 ;
		auxMisc.spaceships[left][0].height = auxMisc["imgsMenu"]["spaceship"+0][left].naturalHeight/2;
	}


	//spaceship middle
	if (parseInt(spaceshipsUser[middle]) == 1 ){
		auxMisc.buttons["chooseSpaceshipMenu"]["go"].style.display = "block";

		auxMisc.spaceships[middle][1].style.left = "510px" ;
		auxMisc.spaceships[middle][1].style.top = "100px" ;
		auxMisc.spaceships[middle][1].style.display = "block" ;
		auxMisc.spaceships[middle][1].style.opacity = 1;

		auxMisc.spaceships[middle][1].width  = auxMisc["imgsMenu"]["spaceship"+1][middle].naturalWidth ;
		auxMisc.spaceships[middle][1].height = auxMisc["imgsMenu"]["spaceship"+1][middle].naturalHeight;
	}else{
		auxMisc.buttons["chooseSpaceshipMenu"]["go"].style.display = "none";

		auxMisc.spaceships[middle][0].style.left = "510px" ;
		auxMisc.spaceships[middle][0].style.top = "100px" ;
		auxMisc.spaceships[middle][0].style.display = "block" ;
		auxMisc.spaceships[middle][0].style.opacity = 1;

		auxMisc.spaceships[middle][0].width  = auxMisc["imgsMenu"]["spaceship"+0][middle].naturalWidth ;
		auxMisc.spaceships[middle][0].height = auxMisc["imgsMenu"]["spaceship"+0][middle].naturalHeight;

	}

	//right
	if (parseInt(spaceshipsUser[right]) == 1 ){
		auxMisc.spaceships[right][1].style.left = "860px" ;
		auxMisc.spaceships[right][1].style.top = "200px" ;
		auxMisc.spaceships[right][1].style.display = "block" ;
		auxMisc.spaceships[right][1].style.opacity = 0.3;

		auxMisc.spaceships[right][1].width  = auxMisc["imgsMenu"]["spaceship"+1][right].naturalWidth/2 ;
		auxMisc.spaceships[right][1].height = auxMisc["imgsMenu"]["spaceship"+1][right].naturalHeight/2;
	}else{
		auxMisc.spaceships[right][0].style.left = "860px" ;
		auxMisc.spaceships[right][0].style.top = "200px" ;
		auxMisc.spaceships[right][0].style.display = "block";
		auxMisc.spaceships[right][0].style.opacity = 0.3;

		auxMisc.spaceships[right][0].width  = auxMisc["imgsMenu"]["spaceship"+0][right].naturalWidth/2 ;
		auxMisc.spaceships[right][0].height = auxMisc["imgsMenu"]["spaceship"+0][right].naturalHeight/2;
	}

	//leave 

	if(leave != "aqui leave no existe"){
		auxMisc.spaceships[leave][0].style.display = "" ;
		auxMisc.spaceships[leave][1].style.display = "" ;

		//texts
		menus["chooseSpaceshipMenu"].children["BoxAc"].children["spaceship"+spaceshipAntiga].style.display = "";
		menus["chooseSpaceshipMenu"].children["BoxSpecs"].children["spaceship"+spaceshipAntiga].style.display = "";
	}


	//texts
	menus["chooseSpaceshipMenu"].children["BoxAc"].children["spaceship"+middle].style.display = "block";
	menus["chooseSpaceshipMenu"].children["BoxSpecs"].children["spaceship"+middle].style.display = "block";
}




function putCorrectSpaceships(auxMisc, menus){

	//var data = player.getCookie(auxMisc["playerAtual"]);
	var spaceshipsUser = auxMisc["cookieStore"]["Spaceships"];
	
	let nSpaceships = (menus["chooseSpaceshipMenu"].childElementCount-6)/2 ; 
	auxMisc["currentSpaceship"] = 0;


	//erases everything in the beggining, then it writes.
	for (let i = 0 ; i < nSpaceships;i++){
		auxMisc.spaceships[i][0].style.display = "";
		auxMisc.spaceships[i][1].style.display = "";
	}
	for (let i = 0 ; i < nSpaceships;i++){
		menus["chooseSpaceshipMenu"].children["BoxAc"].children["spaceship"+i].style.display = "";
		menus["chooseSpaceshipMenu"].children["BoxSpecs"].children["spaceship"+i].style.display = "";
	}


	var left = myMod(auxMisc["currentSpaceship"] - 1,nSpaceships);
	var right = myMod(auxMisc["currentSpaceship"] + 1, nSpaceships);


	auxChangeSpaceships(menus, auxMisc, spaceshipsUser, "no ha spaceship old", left, auxMisc["currentSpaceship"], right, "aqui leave no existe");
}






function myMod(n, m) {
  return ((n % m) + m) % m;
}

function togglePauseMenu(menus, auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){

	updateSoundButton(auxMisc, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

	auxMisc.buttons["pauseMenu"]["back"].style.display = "none";

	// only clicks on the options if the popUpMenu is with style.display = ""
	if(menus["pauseMenu"].style.display == "" && menus["popUpMenu"].style.display == ""){
		menus["pauseMenu"].style.display = "block";

		auxMisc.sounds["esc"][0].load();
		auxMisc.sounds["esc"][0].play().catch(function(){});

		for (let i in buttons[auxMisc["currentMenu"]]){
			auxMisc.buttons[auxMisc["currentMenu"]][i].removeEventListener("click",auxClickHandler);
			auxMisc.buttons[auxMisc["currentMenu"]][i].removeEventListener("mouseover",auxMouseInHandler);
			auxMisc.buttons[auxMisc["currentMenu"]][i].removeEventListener("mouseout",auxMouseOutHandler);
		}

	}//if the user is ingame and he unlocks a spaceship, only click on options when the popUpMenu disappears
	else if (menus["popUpMenu"].style.display == ""){
		menus["pauseMenu"].style.display = "";

		auxMisc.sounds["esc"][1].load();
		auxMisc.sounds["esc"][1].play().catch(function(){});

		for (let i in buttons[auxMisc["currentMenu"]]){
			auxMisc.buttons[auxMisc["currentMenu"]][i].addEventListener("click", auxClickHandler);
			auxMisc.buttons[auxMisc["currentMenu"]][i].addEventListener("mouseover", auxMouseInHandler);
			auxMisc.buttons[auxMisc["currentMenu"]][i].addEventListener("mouseout", auxMouseOutHandler);
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


function firstMenu(menus, auxMisc){
	auxMisc.body.bgColor = "#00083b";

	if(auxMisc["oldMenu"] == "fillerText"){
		auxMisc.musics["music"][0].loop = true;
		auxMisc.musics["music"][0].load();
		auxMisc.musics["music"][0].play().catch(function(){});
	}

	menus["startMenu"].style.display = "block";

	auxMisc["currentMenu"] = "startMenu";
	auxMisc["oldMenu"] = "fillerText";



}


function mainMenu(menus, auxMisc, musics, body){
	auxMisc.body.bgColor = "#00081d";
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


function login(name, menus, auxMisc){
	auxMisc["playerAtual"] = name;
	//document.getElementById("playerMain").innerHTML = name;
	auxMisc.domAux["playerMain"].innerHTML = name; 

	mainMenu(menus, auxMisc);
	//readsCookies(menus, auxMisc);

	// Unlock levels
	var level = parseInt(auxMisc.player.level);
	var i = 0;
	for(; i < parseInt(level) + 1; i++){
		auxMisc.buttons["levelMenu"]["level" + (i + 1)].style.display = "block";
	}

	for(;i < auxMisc.maxLevel; i++){
		auxMisc.buttons["levelMenu"]["level" + (i + 1)].style.display = "";
	}

	if (i == auxMisc.maxLevel){
		auxMisc.buttons["levelMenu"]["speedrun"].style.display = "";
	}
}


function readsCookies(menus, auxMisc){
	// Loads the progress of all the players
	// {"player1": [0,0,0,"1000"] , "player2": [1,123,0,"1110"]}
	var players = parsesCookies();
	//Save the players/records on the LeaderBoard (Henrique)
	//{"campaign": {"player1": 45 ,"gamecampaign":27 } ,"Endless":{"player1": 332388,"me": 3442} }
	var records  = createRecordsArray(players, auxMisc);
	fillLeaderBoard(records, menus);

	if (auxMisc["playerAtual"] in players){
		auxMisc["cookieStore"]["Tutorial"]   = players[auxMisc["playerAtual"]][4];
		auxMisc["cookieStore"]["Spaceships"] = players[auxMisc["playerAtual"]][3];
	}
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

		}else if (splitedCookie[0].indexOf("campaign") != -1) {
			name = splitedCookie[0].substring(0,splitedCookie[0].indexOf("campaign"));
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
	//{"campaign": {"player1": 45 ,"gamecampaign":27 } ,"Endless":{"player1": 332388,"me": 3442} }
	var records = {"campaign":{}, "Endless":{} };

	for (let user in players){
		//verificar se ja tem os levels every desbloqueados
		if (players[user][0] == auxMisc["maxLevel"] && players[user][1] != 0){
			//coloca o player no dict dos records
			records["campaign"][user] = players[user][1];
		}
		if (players[user][2] != 0){
			//coloca o player no dict dos records
			records["Endless"][user] = players[user][2];
		}
	}

	// Sort campaign
	// Create items array
	var items = Object.keys(records["campaign"]).map(function(key) {
		return [key, records["campaign"][key]];
	});

	// Sort the array based on the second element
	items.sort(function(first, second) {
		return second[1] - first[1];
	});

	var aux = {"campaign":{}  };
	for (let i = 0;i < items.length;i++){
		aux["campaign"][items[i][0]] = items[i][1];
	}
	records["campaign"] = aux["campaign"];



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

	//campaign
	for (i = 0; i < 6 && i < Object.keys(records["campaign"]).length; i++){
		player.children[i].innerHTML = Object.keys(records["campaign"])[i];
		result.children[i].innerHTML = Object.values(records["campaign"])[i];
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
			 splitedCookie[0].substring(name.length) == "campaign"    ||
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
