"use strict";

class Game{

	constructor(auxMisc, menus, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, level){

		this.auxMisc = auxMisc;
		this.menus   = menus;
		this.buttons = auxMisc.buttons;
		this.imgs    = auxMisc.imgs;
		this.sounds  = auxMisc.sounds;
		this.musics  = auxMisc.musics;
		this.body    = auxMisc.body;
		this.domAux  = auxMisc.domAux;
		this.auxClickHandler    = auxClickHandler;
		this.auxMouseInHandler  = auxMouseInHandler;
		this.auxMouseOutHandler = auxMouseOutHandler;

		this.player = auxMisc.player;

		this.spaceship;
		this.asteroids;
		this.explosions;
		this.enemies = new Array(0);
		this.enemyRockets;
		this.powerups;
		this.boss = new Array(0);
		this.bossStage = 0;
		this.won;

		this.currentSpaceShip;
		this.spaceshipIndex = auxMisc["currentSpaceship"];
		switch(auxMisc["gamemode"]){
			case "speedrun":
				this.gamemode = 1;
				break;
			case "endless":
				this.gamemode = 2;
				break;
			case "custom":
				this.gamemode = 3;
				break;
			default:
				this.gamemode = 0;
				break;
		}
		this.level    = level;
		this.points   = 0;

		this.maxAsteroidSpeed = 6;
		this.minAsteroidSpeed = 3;
		this.maxAsteroidSize = 0.5;
		this.minAsteroidSize = 0.25;
		this.asteroidNumberOfFrames = 32;

		this.minEnemySpeed = 4;
		this.maxEnemySpeed = 6;

		this.spriteColisionIndex;
		this.rocketColisionIndex;

		this.canvas   = document.getElementById("canvas");
		this.ctx      = this.canvas.getContext("2d");

		this.ctx.fillStyle = "red";
		this.ctx.font = "normal 30px Arial";

		this.currentCanvasEvName;
		this.currentCanvasEv;
		this.currentCanvasEvFunction;

		this.KeySpaceshipHandlerT;
		this.KeySpaceshipHandlerF;
		this.step;

		this.requestId;
		this.oldTime;
		this.currentTime;
		this.begginingTime;
		this.stoppedTime;
		this.explosionIndex;
		this.backgroundIndex;

		this.refreshRate = auxMisc["fps"];

		this.finish;



		function finishedLoading(ev){
			this.canvas.removeEventListener("finishedLoading", finishedLoading);

			if(this.gamemode == 1){
				if(this.level + 1 < 3){
					this.canvas.addEventListener("evNextLevel", startLevel);
					this.currentCanvasEvName     = "evNextLevel";
					this.currentCanvasEvFunction = startLevel;
					this.currentCanvasEv 	     = new Event(this.currentCanvasEvName);
				}
				else{
					this.canvas.addEventListener("evFinish", finish);
					this.currentCanvasEvName     = "evFinish";
					this.currentCanvasEvFunction = finish;
					this.currentCanvasEv 	     = new Event(this.currentCanvasEvName);
				}
			}

			play();
		}

		if (this.gamemode == 1){

			function startLevel(ev){
				this.canvas.removeEventListener(this.currentCanvasEvName, this.currentCanvasEvFunction);

				this.points = this.spaceship.points;

				this.initPlayer(0.3, true, this.canvas.width/2, this.canvas.height/2, 5, 7, 25, this.level - 1);
				this.initAsteroids(20);
				this.level++;

				this.canvas.addEventListener("evFinishedLoading", finishedLoading);
				this.currentCanvasEvName     = "evFinishedLoading";
				this.currentCanvasEvFunction = finishedLoading;
				this.currentCanvasEv 	     = new Event(this.currentCanvasEvName);

				this.spaceship.points = this.points;
				this.loadLevel();
			}
			

			function finish(ev){
				this.canvas.removeEventListener(this.currentCanvasEvName, this.currentCanvasEvFunction);
				this.player.updateCoockiescampaign(auxMisc, buttons, this.spaceship.points);

				menuListeners(this.auxMisc, this.menus, this.buttons, this.imgs, this.sounds, this.musics, this.body, domSpaceships(this.menus), this.domAux, this.player);
				mainMenu(this.menus, this.auxMisc, this.musics, this.body);
			}
		}

		this.canvas.addEventListener("evFinishedLoading", finishedLoading);
		this.currentCanvasEvName     = "evFinishedLoading";
		this.currentCanvasEvFunction = finishedLoading;
		this.currentCanvasEv 	     = new Event(this.currentCanvasEvName);

		this.initPlayer(0.3, true, this.canvas.width/2, this.canvas.height/2, 5, 7, 25, this.level - 1);
		this.initAsteroids(20);

		switch(this.gamemode){
			case 0:
				this.loadLevel();
				break;
			case 1:
				this.loadLevel();
				break;
			case 2:
				this.loadEndless();
				break;
		}
	}



	//initializes the asteroids
	initAsteroids(quantity){

		var img = this.imgs["asteroids"][0];
		var nw  = img.naturalWidth;
		var nh  = img.naturalHeight;
		nw = nw/this.asteroidNumberOfFrames;

		this.asteroids 	= new Array(quantity);

		for(let j = 0; j < quantity; j++){

			var size = Math.random() * this.maxAsteroidSize + this.minAsteroidSize;
			var width 	= size * Math.floor(nw);
			var height 	= size * Math.floor(nh);

			var sp = new Asteroid(0, 0, width, height, nw, nh, 0, false, false, true, img, 0, this.asteroidNumberOfFrames, this.refreshRate);

			sp.updateAsteroid(this.maxAsteroidSpeed, this.minAsteroidSpeed);

			sp.pixels(this.body);

			this.asteroids[j] = sp;
		}
	}

	//initPlayer: loads the player this.spaceship
	initPlayer(sizeRatio, movable, xIni, yIni, speed, rocketspeed, cooldown, rocketIndex){

		var width, height;
		var positionX, positionY;
		var imgSpaceship = this.imgs["spaceship"][this.spaceshipIndex];
		var imgRockets   = this.imgs["rockets"];
		var imgOthers    = this.imgs["others"];
		var nw, nh;
		var numberOfFrames;

		//if the natural width is higher than 2 this.currentTimes the natural height, its a sprite sheet
		if(imgSpaceship.naturalWidth > 2 * imgSpaceship.naturalHeight){
			nw = imgSpaceship.naturalHeight;
			nh = imgSpaceship.naturalHeight;

			numberOfFrames = imgSpaceship.naturalWidth/imgSpaceship.naturalHeight;
		}
		else{
			nw 		  = imgSpaceship.naturalWidth;
			nh 		  = imgSpaceship.naturalHeight;

			numberOfFrames = 1;
		}


		width  = sizeRatio  * Math.floor(nw);   
		height = sizeRatio  * Math.floor(nh);

		positionX = xIni - width/2; 
		positionY = yIni - height/4;	

		this.spaceship = new Spaceship(positionX, positionY, width, height, nw, nh, speed, false, false , movable , imgSpaceship, this.spaceshipIndex, numberOfFrames, this.refreshRate, rocketspeed, imgRockets, rocketIndex, cooldown, 3);

		this.spaceship.pixels(this.body);

		//load the extras to the player spaceship (shield)
		this.spaceship.loadOthers(imgOthers, this.body);

	}


	loadLevel(){
		var game = this;
		var enemyEntities = new Array(1);
		enemyEntities[0] = null;

		var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", "levels/campaign/level_" + this.level + ".txt", true);
	    rawFile.onreadystatechange = function (){
	        if(rawFile.readyState === 4){
	            if(rawFile.status === 200 || rawFile.status == 0){
	                readXML(rawFile, enemyEntities, game.imgs);

	            	if(enemyEntities[0] == null || enemyEntities[0].length == 0 || enemyEntities.length > 2){
						console.log("problem reading the XML");
						menuListeners(game.auxMisc, game.menus, game.buttons, game.imgs, game.sounds, game.musics, game.body, domSpaceships(game.menus), game.domAux, game.player);
						mainMenu(game.menus, game.auxMisc, game.musics, game.body);
					}
					else{
						var imgEnemies = game.imgs["enemies"];
						var imgBoss    = game.imgs["boss"];
						var imgRockets = game.imgs["enemyRockets"];


						for(let i = 0; i < enemyEntities[0].length; i++){
							var array_aux = new Array();
							for (let j = 0; j < enemyEntities[0][i].length; j++){
								var enemyIndex      = enemyEntities[0][i][j][0];
								var scaleRatio      = enemyEntities[0][i][j][1];
								var totalIterations = enemyEntities[0][i].length;
								var rocketIndex     = enemyEntities[0][i][j][2];
								var indexPowerup    = enemyEntities[0][i][j][3];

								array_aux.push(game.generateEnemy(enemyIndex, rocketIndex, scaleRatio, 5, 6, 30, j, totalIterations, indexPowerup));
							}
							game.enemies.push(array_aux);
						}


						if(enemyEntities.length == 2){
							var nw  = imgBoss[enemyEntities[1][0]].naturalWidth;
							var nh  = imgBoss[enemyEntities[1][0]].naturalHeight;

							var width 	= nw * enemyEntities[1][1];
							var height 	= nh * enemyEntities[1][1];;

							var sp = new Boss(game.ctx.canvas.width/2 - width/2, -height, width, height, nw, nh, 0.5, false, false, true, imgBoss[enemyEntities[1][0]], enemyEntities[1][0], 1, game.refreshRate, 8, imgRockets, 0, 40);

							sp.pixels(game.body);

							game.boss.push(sp);
						}
						//game.canvas.dispatchEvent(game.currentCanvasEv);
						game.play();
					}
	            }
	        }
	    }
	    rawFile.send(null);
	}

	loadEndless(){
		this.currentTime   = 0;
		this.begginingTime = 0;
		this.spaceship.rocketLevel = 0;
		this.generatesEnemies(0.25, 0.5);
		this.play();
	}





	play(){

		var cooldownRocket   = 0;
		this.explosionIndex  = 0;
		this.backgroundIndex = 0;
		this.oldTime         = -500;
		this.begginingTime   = 0;
		this.finish          = 0;
		this.bossStage       = 0;
		this.enemyRockets    = new Array(0);
		this.powerups        = new Array(0);
		this.explosions      = new Array(0);

		var game = this;

		playSound(this.musics, this.level);


		function auxClickHandlerGame(ev){

			this.sounds["buttons"][1].load();
			this.sounds["buttons"][1].play().catch(function(){});
			
			//ve qual é o button
			switch(ev.target.id){

				//POP UP------------
				//yes
				case("popUpMenu_yesButton"):
					console.log("yes of the Game");
					this.yesClickHandlerGame();
					break;

				//no
				case("popUpMenu_noButton"):
					console.log("no of the Game");
					this.noClickHandlerGame();
					break;
			}
		}


		//Key events
		this.KeySpaceshipHandlerF = function (ev){
			game.KeySpaceshipF(ev);
		}
		this.KeySpaceshipHandlerT = function (ev){
		 	game.KeySpaceshipT(ev);
		}

				
		window.addEventListener("keyup"  , this.KeySpaceshipHandlerF);	
		window.addEventListener("keydown", this.KeySpaceshipHandlerT);
		
		addEVLButtons(this.buttons, "popUpMenu", "yesButton", this.auxClickHandlerGame, this.auxMouseInHandler, this.auxMouseOutHandler);
		addEVLButtons(this.buttons, "popUpMenu", "noButton", this.auxClickHandlerGame, this.auxMouseInHandler, this.auxMouseOutHandler);

		this.step = function (time) {
			game.currentTime = time;
			if(game.begginingTime == 0){

				game.begginingTime = game.currentTime;

			}

			//every 0.5 seconds, if it isn't in the boss stage, updates enemy prefered positions (AI);
			if(game.currentTime - game.oldTime >= 500 && game.bossStage == 0){
				game.updateInim();
				game.oldTime = game.currentTime;
			}
			else if(game.bossStage == 1){
				game.boss[0].move(game.ctx, game.currentTime - game.oldTime);
				game.oldTime = game.currentTime;
			}

			//draws every object
			game.draws();
			//checks for colisions and in case the player finish the game, returns and ends the step function
			game.checksColisions();
			if(game.finish != 0){
				return;
			}
			//moves every object and creates all the necessary new sprites (rockets for example)
			game.render();
			
			//next background iteration
			game.backgroundIndex++;				
		  	if (game.backgroundIndex >= 90) {  	//when at the end of the background sprite sheet, goes back to the beggining
			    game.backgroundIndex = 0;
			}

			game.requestId = window.requestAnimationFrame(game.step);
		}

		this.requestId = window.requestAnimationFrame(this.step);
	}






	draws(){

		this.ctx.drawImage(this.imgs["background"][0], this.backgroundIndex * 500, 0, 500, 250, 0, 0, 3.5 * 500,  3 * 250);

		this.draw(this.asteroids);
		if (this.enemies.length > 0){
			this.draw(this.enemies[0]);
		}
		else{
			this.draw(this.boss);
		}
		this.spaceship.draw(this.ctx, this.body, this.currentTime);
		this.spaceship.drawShield(this.ctx, this.currentTime);
		this.draw(this.spaceship.rockets);
		this.draw(this.enemyRockets);
		this.draw(this.powerups);

		if(this.spaceship.life == 1){
			this.ctx.fillText("Last life", 20, 35);
		}
		else{
			this.ctx.fillText("Lifes: ", 20, 35);
			this.ctx.fillText(this.spaceship.life, 120, 35);
		}

		if(this.gamemode != 0){
			this.ctx.fillText("Points: ", 20, this.ctx.canvas.height  - 20);
			this.ctx.fillText(this.spaceship.points, 130, this.ctx.canvas.height  - 18);
		}


		for(let i = 0; i < this.explosions.length; i++){
			this.explosions[i].drawUmaRotacao(this.ctx);
			if(this.explosions[i].index == this.explosions[i].numberOfFrames){
				this.explosions.splice(i, 1);
			}
		}
	}

	//draw sprites
	draw(spArray){
		for (let i = 0; i < spArray.length; i++){
			spArray[i].draw(this.ctx);
		}
	}


	//checks colisions
	checksColisions(){
		var powerupIndex;

		//spaceship x powerups
		powerupIndex = this.spaceship.colisionWithASpriteArray(this.ctx, this.powerups);
		if(powerupIndex > 0){
			this.powerups[powerupIndex - 1].interage(this.spaceship, this.imgs["rockets"], this.body, this.currentTime);
			this.powerups.splice(powerupIndex - 1, 1);
		}

		//spaceship x asteroids
		//spaceship x rockets enemies
		//spaceship x enemies/boss
		if(this.spaceship.colisionWithASpriteArray(this.ctx, this.asteroids) > 0 ||
		   this.spaceship.colisionWithASpriteArray(this.ctx, this.enemyRockets) > 0 ||
		  (this.enemies.length > 0 && this.spaceship.colisionWithASpriteArray(this.ctx, this.enemies[0])) ||
		  (this.bossStage == 1 && this.spaceship.colisionWithASpriteArray(this.ctx, this.boss))){
		  	this.spaceship.touched(this.currentTime);
		  	//if the spaceship has no life, player loses
		  	if(this.spaceship.life == 0){
		  		this.finish = 1;
				this.lost();
				return -1;
			}
		}

		//rockets x asteroids
		this.asteroidsRocketsColision();
		//rockets x enemies if there are enemies
		if(this.bossStage == 0 && this.enemies.length > 0 && this.enemyRocketsColision() == 1){
			//if its endless, needs to generate new enemies
			if(this.gamemode == 2){
				this.generatesEnemies(0.25, 0.5);
			}
			else if(this.boss.length != 0){
				//stops every music playing
				for(let key in this.musics){
					for ( let i = 0; i < Object.keys(this.musics[key]).length; i++){
						this.musics[key][i].pause();
						this.musics[key][i].currentTime = 0;
					}
				}
				this.musics["boss"][this.boss[0]["id"]].loop = true;
				this.musics["boss"][this.boss[0]["id"]].load();
				this.musics["boss"][this.boss[0]["id"]].play().catch(function(){});
				
				this.bossStage = 1;
			}
		}
		//se no existirem mais enemies, ou se o boss for destruido, won
		else if((this.bossStage == 0 && this.enemies.length == 0 && this.gamemode != 2) ||
			    (this.bossStage == 1 && this.bossRocketsColision() == 1)){
		  	this.finish = -1;
			this.won();
			return 1;
		}
		return 0;
	}



	//moves every object and creates all the necessary new sprites (rockets for example)
	render(){
		var cw 		= this.ctx.canvas.width;
		var ch 		= this.ctx.canvas.height;

		this.spaceship.rockets_cooldown(); 	// function that doesnt let the player spam the rockets
		this.moveRockets(ch, cw, this.spaceship.rockets);
		this.moveRockets(ch, cw, this.enemyRockets);


		for(let i = 0; i < this.asteroids.length; i++){
			this.asteroids[i].move(ch, 6, 3);
		}
		for(let i = 0; i < this.powerups.length; i++){
			this.powerups[i].move(ch, cw, this.currentTime, this.powerups, i);
		}

		//moves enemys and creates new enemy rockets when possible
		if(this.enemies.length > 0){
			for(let i = 0; i < this.enemies[0].length; i++){
				let enemy = this.enemies[0][i];
				this.enemies[0][i].move();
				enemy.rockets_cooldown();
				if(enemy.rocketReady == true){
					enemy.newRocket(this.ctx, this.sounds, this.body, this.enemyRockets);
				}
			}
		}
		//if on boss stage and possible, boss shots a new Rocket
		else if(this.bossStage == 1){
			this.boss[0].rockets_cooldown();
			if(this.boss[0].rocketReady == true){
				this.boss[0].newRocket(this.ctx, this.sounds, this.body, this.enemyRockets);
			}
		}

		//Spaceship
		if(this.spaceship.movable == true){
			this.spaceship.move(this.ctx);
			for(let i = 0; i < this.spaceship.extras.length; i++){
				this.spaceship.extras[i].move();
			}
			if(this.spaceship.rocketBool == true){
				if(this.spaceship.rocketReady == true){
					this.spaceship.newRocket(this.ctx, this.sounds, this.body);
				}
			}
		}
	}

	




	//Changes enemy position preferences
	updateInim(){
		if (this.enemies.length > 0){
			for(let i = 0; i < this.enemies[0].length; i++){
				this.enemies[0][i].bestPositionAI(this.ctx, this.enemies, this.spaceship, this.asteroids);
			}
		}
	}

	//Move every Rockets in the array
	moveRockets(canvasHeight, canvasWidth, rocketsArray){
		for(let i = 0; i < rocketsArray.length; i++){
			rocketsArray[i].move(canvasHeight, canvasWidth, rocketsArray, i);
		}
	}

	//Checks for colision between a sprite array and a rocket array
	rocketsColision(arraySpriteImages, rocketArray){
		this.spriteColisionIndex = 0;
		this.rocketColisionIndex = 0;
		var arrayTemp = Array();
		for(let i = 0; i < rocketArray.length; i++){
			var index = rocketArray[i].colisionWithASpriteArray(this.ctx, arraySpriteImages);
			if(index > 0){
				this.spriteColisionIndex = index;
				this.rocketColisionIndex = i + 1;
			}
		}
	}

	//Creates a new explosion
	newExplosion(spArray){
		if(spArray[this.spriteColisionIndex - 1] == undefined){
			console.log("AI");
		}
		var xExplosion = spArray[this.spriteColisionIndex - 1].positionX + spArray[this.spriteColisionIndex - 1].width/2 - 64/2;
		var yExplosion = spArray[this.spriteColisionIndex - 1].positionY + spArray[this.spriteColisionIndex - 1].height/2;

		var img = this.imgs["explosions"][0];
		var nw  = img.naturalWidth/16;
		var nh  = img.naturalHeight;

		var width  = nw;   
		var height = nh;

		var explosion = new Component(xExplosion, yExplosion, width, height, nw, nh, 0, false, false, false, img, 0, 16, this.refreshRate);

		explosion.index = 0;
		this.explosions.push(explosion);


		this.spaceship.rockets.splice(this.rocketColisionIndex - 1, 1);
	}

	//creates a random new powerup
	newPowerup(spArray){
		var imgsPowerups = this.imgs["powerups"];

		var xPowerup = spArray[this.spriteColisionIndex - 1].positionX + spArray[this.spriteColisionIndex - 1].width/2;
		var yPowerup = spArray[this.spriteColisionIndex - 1].positionY + spArray[this.spriteColisionIndex - 1].height/2;

		var max;
		var index;
		var random = Math.floor(Math.random() * 10);
		//if the random is 2, creates a rocket upgrade powerup
		if(random == 2){
			index = 7;
		}
		//if the random is higher than 5 and the rocket cooldown between 3 and 15, creates the powerup that drastically reduces rockets cooldown
		else if(random > 5 &&  this.spaceship.cooldownRocketTotal < 15 && this.spaceship.cooldownRocketTotal > 3){
			index = 8;
		}
		else{
			//max is exclusive
			//if the rocket cooldown is lower than 10, can't reduce the spaceship rocket cooldown
		 	if(this.spaceship.cooldownRocketTotal > 10){
		 		// 9 - 2 = 7[
				max = imgsPowerups.length - 2;
			}
			else{
		 		// 9 - 3 = 6[
				max = imgsPowerups.length - 3;
			}
			//cria um powerup random
			index = Math.floor(Math.random() * max);
		}

		var img    = imgsPowerups[index];
		var nw     = img.naturalWidth;
		var nh     = img.naturalHeight;

		var speed = Math.floor(Math.random() * 2 + 1);
		var direction    = Math.random() * 360;

		var width  = nw;   
		var height = nh;

		var powerup = new Powerup(xPowerup, yPowerup, width, height, nw, nh, speed, false, false, false, img, index, 1, this.refreshRate, direction, this.currentTime);

		powerup.pixels(this.body);

		powerup.index = 0;
		this.powerups.push(powerup);
	}

	//colision between a rocket array and the asteroids
	asteroidsRocketsColision(){
		this.rocketsColision(this.asteroids, this.spaceship.rockets);

		//if the rocket index is higher than 0 there was a colision so
		//it will be created a new explosion, and somethis.currentTimes a new powerup.
		//Then it will update the asteroids and sum points to the spaceship.
		if(this.rocketColisionIndex > 0){
			this.newExplosion(this.asteroids);
			if(Math.floor(Math.random() * 15) == 0){
				this.newPowerup(this.asteroids);
			}
			this.asteroids[this.spriteColisionIndex - 1].updateAsteroid(6, 3);
			this.spaceship.sumsPoints(10, this.gamemode, this.currentTime, this.begginingTime);
		}
	}

	//colision between a rocket array and the enemies
	enemyRocketsColision(){
		this.rocketsColision(this.enemies[0], this.spaceship.rockets);

		//if the rocket index is higher than 0 there was a colision so
		//it will be created a new explosion, and somethis.currentTimes a new powerup.
		//delete the enemy from the array of enemies and sum points to the spaceship.
		//If there are no more enemies in the wave, go to the next one
		if(this.rocketColisionIndex > 0){
			this.newExplosion(this.enemies[0]);
			if(this.gamemode == 0 || this.gamemode == 1){
				this.enemies[0][this.spriteColisionIndex - 1].spawnPowerup(this.powerups, this.body, this.imgs["powerups"], this.currentTime);
			}
			else if(this.gamemode == 2 && Math.floor(Math.random() * 5) == 0){
				this.newPowerup(this.enemies[0]);
			}
			this.enemies[0].splice(this.spriteColisionIndex - 1, 1);
			this.spaceship.sumsPoints(100, this.gamemode, this.currentTime, this.begginingTime);
			if(this.enemies[0].length == 0){
				this.enemies.splice(0,1);
				if(this.enemies.length == 0){
					return 1;
				}
			}
		}
		return 0;
	}

	//colision between a rocket array and a boss
	bossRocketsColision(){
		this.rocketsColision(this.boss, this.spaceship.rockets);

		//if the rocket index is higher than 0, creates a new explosion and the boss gets touched,
		//if his lige equals 0, sums points to the spaceship and returns 1;
		if(this.rocketColisionIndex > 0){
			this.newExplosion(this.boss);
			this.boss[0].touched();
			if(this.boss[0].life == 0){
				this.spaceship.sumsPoints(2500, this.gamemode, this.currentTime, this.begginingTime);
				return 1;
			}
		}
		return 0;
	}





	//generates an enemy
	generateEnemy(enemyIndex, rocketIndex, sizeScale, speed, rocketSpeed, cooldown, iteration, totalIterations, powerupIndex){
		var imgEnemies = this.imgs["enemies"];
		var imgRockets = this.imgs["enemyRockets"];


		var nw  = imgEnemies[enemyIndex].naturalWidth;
		var nh  = imgEnemies[enemyIndex].naturalHeight;

		var width 	= nw * sizeScale;
		var height 	= nh * sizeScale;

		if(cooldown < 15){
			cooldown = 15;
		}

		var sp = new Enemy((iteration + 1)*(this.ctx.canvas.width/(totalIterations + 1.5)), -2*height, width, height, nw, nh, speed, false, false, true, imgEnemies[enemyIndex], 0, 1, this.refreshRate, rocketSpeed, imgRockets, rocketIndex, cooldown, powerupIndex);
		
		sp.pixels(this.body);

		return sp;
	}

	//no endless é preciso gerar enemies quando já não há mais enemies, sendo que os valores são randoms baseados no time
	generatesEnemies(minSizeScale, maxSizeScale){
		var imgEnemies      = this.imgs["enemies"];
		var indexEnemiesMax = imgEnemies.length;
		var imgRockets      = this.imgs["enemyRockets"];
		var rocketIndexMax  = imgRockets.length;
		var enemyIndex;
		var rocketIndex;
		var sizeScale;
		var speed;
		var rocketSpeed = 6;
		var cooldown    = 30;

		var newArrayEnemies = new Array();

		var minEnemies = Math.floor((this.currentTime - this.begginingTime)/10000) + 1;
		var maxEnemies = (Math.floor((this.currentTime - this.begginingTime)/10000) + 1) * 2;
		var numEnemies = Math.floor(Math.random() * (maxEnemies - minEnemies) + minEnemies);

		for(let i = 0; i < numEnemies; i++){
			enemyIndex = Math.floor(Math.random() * indexEnemiesMax);
			//rocketIndex    = Math.floor(Math.random() * rocketIndexMax);
			sizeScale        = Math.random() * (maxSizeScale - minSizeScale) + minSizeScale;
			speed    = Math.floor(Math.random() * (this.maxEnemySpeed - this.minEnemySpeed) + this.minEnemySpeed);
			if(Math.floor((this.currentTime - this.begginingTime) / 30000) <=  3){
				rocketIndex = Math.floor(Math.random() * Math.floor((this.currentTime - this.begginingTime) / 30000));
			}
			else if(Math.floor((this.currentTime - this.begginingTime) / 60000) <=3){
				rocketIndex = Math.floor(Math.random() * Math.floor((this.currentTime - this.begginingTime) / 60000)) + Math.floor((this.currentTime - this.begginingTime) / 60000);
			}
			else{
				rocketIndex = Math.round(Math.random()) + 4;
			}

			newArrayEnemies.push(this.generateEnemy(enemyIndex, rocketIndex, sizeScale, speed, rocketSpeed, cooldown, i, numEnemies, "fillText"));
		}
		this.enemies.push(newArrayEnemies);
	}











	//when won
	won(){
		var newRequestId;
		var levelCompletado;

		//stops the asteroids and the spaceshup
		for(let i = 0; i < this.asteroids.length; i++){
			this.asteroids[i].speed = 0;
		}
		this.spaceship.stop();

		var game = this;
		//level completed, returns -1 if the player already completed the level.
		//if doesnt need to unlock a spaceship returns 1,2,3 when completing the levels 1,2,3 respectivly
		//when in campaign mode, completes a level and updates the cookies
		if(this.gamemode == 0){
			levelCompletado = this.player.updateCoockiesLevel(this.auxMisc, this.buttons, this.level);
		}
		else{
			console.log("Please call a certified senior technician.");
		}

		//shows "win" for 2 seconds and then returns to the main menu
		function won_animation(time){
			game.currentTime = time;

			game.draws();
			game.ctx.drawImage(game.imgs["win"][0], 120 , 80);

			//next background iteration
			game.backgroundIndex++;				
		  	if (game.backgroundIndex >= 90) {  	//when at the end of the background sprite sheet, goes back to the beggining
			    game.backgroundIndex = 0;
			}

			if(game.currentTime - game.oldTime >= 2000){
				//cleans the canvas
				game.ctx.clearRect(0, 0, game.ctx.canvas.width, game.ctx.canvas.height);
				window.cancelAnimationFrame(newRequestId);

				if(game.gamemode == 0  && game.spaceship.life >= 3 && game.level == 1 && game.auxMisc["cookieStore"]["Spaceships"][2] == "0"){
					//returns -11 when he completes level 1 width at least 3 lifes
					levelCompletado = -11
				}

				//if its on campaign or custom (not implemented yet), returns to the main menu
				if(game.gamemode == 0 || game.gamemode == 3){

					unlocksSpaceshipByLevel(levelCompletado, game.auxMisc, game.menus, game.buttons, game.auxClickHandler, game.auxMouseInHandler, game.auxMouseOutHandler, game.domAux, game.player);

					menuListeners(game.auxMisc, game.menus, game.buttons, game.imgs, game.sounds, game.musics, game.body, domSpaceships(game.menus), game.domAux, game.player);
					mainMenu(game.menus, game.auxMisc, game.musics, game.body);
				}
				//if it is speedrun, dipatchs the event
				else{
					game.ctx.canvas.dispatchEvent(game.currentCanvasEv);
				}
				return;
			}
			else{
				newRequestId = window.requestAnimationFrame(won_animation);
			}

		}

		window.removeEventListener("keyup",   this.KeySpaceshipHandlerF);
		window.removeEventListener("keydown", this.KeySpaceshipHandlerT);

		removeEVLButtons(this.buttons, "popUpMenu", "yesButton", this.auxClickHandlerGame, this.auxMouseInHandler, this.auxMouseOutHandler);
		removeEVLButtons(this.buttons, "popUpMenu", "noButton", this.auxClickHandlerGame, this.auxMouseInHandler, this.auxMouseOutHandler);

		window.cancelAnimationFrame(this.requestId);
		newRequestId = window.requestAnimationFrame(won_animation);
	}

	//when lost
	lost(){
		var newRequestId;

		//removes event listener when on speedrun and loses
		if(this.gamemode == 1){
			this.ctx.canvas.removeEventListener(this.currentCanvasEvName, this.currentCanvasEvFunction);
		}
		//updates the coockies on endless if the game was lost and the player is on endless mode
		else if(this.gamemode == 2){
			this.player.updateCoockiesEndless(this.auxMisc, this.buttons, this.spaceship.points);
		}

		//stops all asteroids and the spaceship
		for(let i = 0; i < this.asteroids.length; i++){
			this.asteroids[i].speed = 0;
		}
		this.spaceship.stop();

		var game = this;
		//shows "gameover" for 2 seconds
		function lost_animation(time){
			game.currentTime = time;

			game.draws();
			game.ctx.drawImage(game.imgs["gameover"][0], 120 , 80);

			//next background iteration
			game.backgroundIndex++;				
		  	if (game.backgroundIndex >= 90) {  	//when at the end of the background sprite sheet, goes back to the beggining
			    game.backgroundIndex = 0;
			}

			if(game.currentTime - game.oldTime >= 2500){

				//unlocks spaceship if on endless and still hasnt been unlocked
				if(game.gamemode == 2 && game.auxMisc["cookieStore"]["Spaceships"][1] == "0"){
					unlockSpaceship(1, game.auxMisc, game.menus, game.buttons, game.auxClickHandler, game.auxMouseInHandler, game.auxMouseOutHandler, game.domAux, game.player)
				}

				//resets the canvas and goes back to the menu
				game.ctx.clearRect(0, 0, game.ctx.canvas.width, game.ctx.canvas.height);
				window.cancelAnimationFrame(newRequestId);
				menuListeners(game.auxMisc, game.menus, game.buttons, game.imgs, game.sounds, game.musics, game.body, domSpaceships(game.menus), game.domAux, game.player);
				mainMenu(game.menus, game.auxMisc, game.musics, game.body);
				return;
			}
			else{
				newRequestId = window.requestAnimationFrame(lost_animation);
			}
		}

		window.removeEventListener("keyup",   this.KeySpaceshipHandlerF);
		window.removeEventListener("keydown", this.KeySpaceshipHandlerT);
		removeEVLButtons(this.buttons, "popUpMenu", "yesButton", this.auxClickHandlerGame, this.auxMouseInHandler, this.auxMouseOutHandler);
		removeEVLButtons(this.buttons, "popUpMenu", "noButton", this.auxClickHandlerGame, this.auxMouseInHandler, this.auxMouseOutHandler);

		window.cancelAnimationFrame(this.requestId);
		newRequestId = window.requestAnimationFrame(lost_animation);
	}












































	//event listeners das teclas
	KeySpaceshipF(ev) {
		switch(ev.code) {
			case 'Space': 		this.spaceship.rocketBool = false; break;
			case 'ArrowLeft':	this.spaceship.boool[0] = false; break;
			case 'ArrowRight': 	this.spaceship.boool[1] = false; break;
			case 'ArrowUp':  	this.spaceship.boool[2] = false; break;
			case 'ArrowDown': 	this.spaceship.boool[3] = false; break;
			case 'KeyA': 		this.spaceship.boool[0] = false; break;
			case 'KeyD': 		this.spaceship.boool[1] = false; break;
			case 'KeyW': 		this.spaceship.boool[2] = false; break;
			case 'KeyS': 		this.spaceship.boool[3] = false; break;
		}
	}

	KeySpaceshipT(ev){
		switch(ev.code) {
			case 'Escape': 		
				// no mexe no pause menu se o popUp estiver aberto 
				if(this.menus["popUpMenu"].style.zIndex == 1 || this.menus["popUpMenu"].style.zIndex == "" ){
					this.togglePauseMenuGame();break;
				}break;
			case 'Space': 		this.spaceship.rocketBool = true; break;
			case 'ArrowLeft': 	this.spaceship.boool[0] = true; break;
			case 'ArrowRight': 	this.spaceship.boool[1] = true; break;
			case 'ArrowUp': 	this.spaceship.boool[2] = true; break;
			case 'ArrowDown': 	this.spaceship.boool[3] = true; break;
			case 'KeyA': 	    this.spaceship.boool[0] = true; break;
			case 'KeyD': 		this.spaceship.boool[1] = true; break;
			case 'KeyW': 		this.spaceship.boool[2] = true; break;
			case 'KeyS': 		this.spaceship.boool[3] = true; break;
			default: console.log(ev.code);break;
		}
	}


	//others listeners
	togglePauseMenuGame(){

		this.buttons["pauseMenu"]["back"].style.display = "block";

		updateSoundButton(this.sounds, this.musics, this.buttons, this.auxClickHandler, this.auxMouseInHandler, this.auxMouseOutHandler);

		if(this.menus["pauseMenu"].style.display == ""){
			this.stoppedTime = this.currentTime;

			this.sounds["esc"][0].load();
			this.sounds["esc"][0].play().catch(function(){});

			this.menus["pauseMenu"].style.display = "block";
			window.cancelAnimationFrame(this.requestId);

		}
		else{
			this.begginingTime = this.begginingTime + this.currentTime - this.stoppedTime;

			this.sounds["esc"][1].load();
			this.sounds["esc"][1].play().catch(function(){});

			this.menus["pauseMenu"].style.display = "";
			this.requestId = window.requestAnimationFrame(this.step);
		}
	}


	noClickHandlerGame(){
		this.buttons["pauseMenu"]["back"].style.opacity = 1;

		//places listeners on the buttons back
		for (var i in this.buttons["pauseMenu"]){
			if (this.buttons["pauseMenu"][i].style.opacity == 1 ){
				addEVLButtons(this.buttons, "pauseMenu", i, this.auxClickHandler, this.auxMouseInHandler, this.auxMouseOutHandler);
			}
		}

		this.menus["popUpMenu"].style.zIndex = 1;
		this.menus["popUpMenu"].style.display = "";
	}

	yesClickHandlerGame(){

		this.buttons["pauseMenu"]["back"].style.opacity = 1;

		for (var i in this.buttons["pauseMenu"]){
			if (this.buttons["pauseMenu"][i].style.opacity == 1 ){
				addEVLButtons(this.buttons, "pauseMenu", i, this.auxClickHandler, this.auxMouseInHandler, this.auxMouseOutHandler);
			}
		}
		
		this.menus["popUpMenu"].style.zIndex = 1;
		this.menus["popUpMenu"].style.display = "";

		window.removeEventListener("keyup",   this.KeySpaceshipHandlerF);
		window.removeEventListener("keydown", this.KeySpaceshipHandlerT);

		removeEVLButtons(this.buttons, "popUpMenu", "yesButton", this.auxClickHandlerGame, this.auxMouseInHandler, this.auxMouseOutHandler);
		removeEVLButtons(this.buttons, "popUpMenu", "noButton", this.auxClickHandlerGame, this.auxMouseInHandler, this.auxMouseOutHandler);



		this.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		//window.cancelAnimationFrame(newRequestId);
		menuListeners(this.auxMisc, this.menus, this.buttons, this.imgs, this.sounds, this.musics, this.body, domSpaceships(this.menus), this.domAux, this.player);
		mainMenu(this.menus, this.auxMisc, this.musics, this.body);

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