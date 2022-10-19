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
			"Tutorial": 0
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
	}
}