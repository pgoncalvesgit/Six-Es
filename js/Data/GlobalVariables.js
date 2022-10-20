"use strict";

class GlobalVariables{

	constructor(){
		this.currentMenu = "startMenu";
		this.oldMenu = "fillerText";
		this.gamemode = "fillerText";
		this.secretPress = "PINEAPPLE";
		this.secretProgress = "";
		this.playerAtual = "filltext";
		this.maxLevel = 3;
		this.currentSpaceship = 0;
		this.cookieStore = {
			"Spaceships": "1000",
			"Tutorial": "00"
		},
		this.fps = 0;

		
		this.menusArray = [
			"pauseMenu",
			"startMenu",
			"loginRegMenu",
			"popUpMenu",
			"mainMenu",
			"levelMenu",
			"chooseSpaceshipMenu",
			"leaderBoard",
			"creditsMenu",
			"helpMenu",
			"controlsMenu",
			"canvasFigure"
		]

		//extra references to the DOM
		this.domAux = new DomElements(
			document.getElementById("textPop"),
			document.getElementById("playerCredits"),
			document.getElementById("name"),
			document.getElementById("playerLevel"),
			document.getElementById("playerMain"),
			document.getElementById("playerLeaderBoard")
		)

		
		//load of the spaceships in the beggining to get the natural width and height
		this.nToLoad  = {"spaceship0": 5 , "spaceship1": 5 };
		this.nLoaded  = {"spaceship0": 0 , "spaceship1": 0 };
		this.imgsMenu = {"spaceship0": [], "spaceship1": []};
		this.imgs;
		this.sounds;
		this.musics;
		this.player = new Player();


		//load the imagens of the game
		this.menuNToLoad = { "spaceship" : 5 , "enemies" : 2 , "boss" : 2 , "asteroids" : 1 , "powerups" : 9 , "others" : 1, "rockets" : 1 , "enemyRockets" : 1 , "background" : 1 , "explosions" : 1 , "gameover" : 2 , "win" : 1 };
		this.menuNLoaded = { "spaceship" : 0 , "enemies" : 0 , "boss" : 0 , "asteroids" : 0 , "powerups" : 0 , "others" : 0, "rockets" : 0 , "enemyRockets" : 0 , "background" : 0 , "explosions" : 0 , "gameover" : 0 , "win" : 0 };
		this.menuImgs 	= { "spaceship" : [], "enemies" : [], "boss" : [], "asteroids" : [], "powerups" : [], "others" : [],"rockets" : [], "enemyRockets" : [], "background" : [], "explosions" : [], "gameover" : [], "win" : []};
		
		


		//used to change background colour
		this.body = document.getElementsByTagName("body")[0];


		//spaceships
		this.spaceships = [];

		//Buttons
		this.buttons;
	}

	loadSpaceships (menus){
		let nSpaceships = (menus["chooseSpaceshipMenu"].childElementCount-6)/2 ; 
		for (let i = 0 ; i < nSpaceships;i++){
			this.spaceships[i] = []
			var spaceshipLocked = menus["chooseSpaceshipMenu"].children["spaceship0_"+i];
			this.spaceships[i].push(spaceshipLocked);
			var spaceship = menus["chooseSpaceshipMenu"].children["spaceship1_"+i];
			this.spaceships[i].push(spaceship);
		}
	}
}