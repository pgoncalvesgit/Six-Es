"use strict";

class Enemy extends Entity{

	constructor(positionX, positionY, width, height, naturalWidth, naturalHeight, speed, clickable, dragable, movable, img, id, numberOfFrames, refreshRate, rocketSpeed, imgsRockets, rocketIndex, cooldown, indexPowerup){

		super(positionX, positionY, width, height, naturalWidth, naturalHeight, speed, clickable, dragable, movable, img, id, numberOfFrames, refreshRate, rocketSpeed, imgsRockets, rocketIndex, cooldown);

		this.bestX = 0;
		this.bestY = 0;

		this.bestXIndex = 0;
		this.bestYIndex = 0;

		this.oldSpeedX = 0;
		this.oldSpeedY = 0;

		this.rockets;
		this.indexPowerup = indexPowerup;
	}

	//if the enemy has a powerup up, spawns it
	spawnPowerup(powerups, body, imgsPowerups, currentTime){
		if(this.indexPowerup != "n"){
			var xPowerup = this.positionX + this.width/2;
			var yPowerup = this.positionY + this.height/2;
			var img    = imgsPowerups[this.indexPowerup];
			var nw     = img.naturalWidth;
			var nh     = img.naturalHeight;

			var speed = Math.floor(Math.random() * 2 + 1);
			var direction    = Math.random() * 360;

			var width  = nw;
			var height = nh;

			var powerup = new Powerup(xPowerup, yPowerup, width, height, nw, nh, speed, false, false, false, img, this.indexPowerup, 1, this.refreshRate, direction, currentTime);

			powerup.pixels(body);

			powerup.index = 0;
			powerups.push(powerup);
		}
	}

	//creates a new Rocket
	newRocket(ctx, sounds, body, enemyRockets){
		var positionY;
		var speed;
		
		this.rocketReady = false;

		positionY = this.positionY + 3*this.width/4;

		this.shots(positionY, 270, enemyRockets, sounds, body);

	}

	//moves one time, per render iteration, in the direction of the rectangle in the canvas which is considered the best, calculated by the AI
	move(){
		var xDiference = this.bestX - this.positionX;
		var yDiference = this.bestY - this.positionY;

		var angle = Math.atan2(yDiference, xDiference);

		var speedX = Math.cos(angle) * this.speed * 0.03 + this.oldSpeedX * 0.97;
		var speedY = Math.sin(angle) * this.speed * 0.03 + this.oldSpeedY * 0.97;

		this.oldSpeedX = speedX;
		this.oldSpeedY = speedY;

		this.positionX = this.positionX + speedX;
		this.positionY = this.positionY + speedY;
	}

	//AI of the enemy, splits the canvas in rectangles and verifies which one is the best to move there
	bestPositionAI(ctx, enemies, spaceship, asteroids){
		var width  = ctx.canvas.width;
		var height = ctx.canvas.height;

		//divide verticalmente e horizontalmente a canvas
		var verticalSplitting   = 10;
		var horizontalSplitting = 10;

		//cria 3 arrays com as divisoes acima especificadas, colocando every os valores a 1
		var pref_enemies = new Array(verticalSplitting);
		for(let i = 0; i < verticalSplitting; i++){
			pref_enemies[i] = new Array(horizontalSplitting);
			for(let k = 0; k < horizontalSplitting; k++){
				pref_enemies[i][k] = 1;
			}
		}

		var pref_asteroids = new Array(verticalSplitting);
		for(let i = 0; i < verticalSplitting; i++){
			pref_asteroids[i] = new Array(horizontalSplitting);
			for(let k = 0; k < horizontalSplitting; k++){
				pref_asteroids[i][k] = 1;
			}
		}

		var pref_final = new Array(verticalSplitting);
		for(let i = 0; i < verticalSplitting; i++){
			pref_final[i] = new Array(horizontalSplitting);
			for(let k = 0; k < horizontalSplitting; k++){
				pref_final[i][k] = 1;
			}
		}


		var widthPiece  = width/horizontalSplitting;
		var heightPiece = height/verticalSplitting;


		//Reduces margin preference
		for(let i = 0; i < verticalSplitting; i++){
			for(let k = 0; k < horizontalSplitting; k++){
				if(i > 0 || k > 0 || i < verticalSplitting - 1 || k < horizontalSplitting - 1){
					pref_final[i][k] = 0.5 * pref_final[i][k];
				}
			}
		}


		//based on where the enemies are and where they want to go, change the rectangle preference so that they prefer to stay away from each other
		for(let i = 0; i < enemies[0].length; i++){
			var heightIndex  = Math.floor(enemies[0][i].positionY/heightPiece);
			var widthIndex = Math.floor(enemies[0][i].positionX/widthPiece);

			pref_enemies[enemies[0][i].bestYIndex][enemies[0][i].bestXIndex] = 0;

			if(widthIndex >= 0 && widthIndex < horizontalSplitting && heightIndex >= 0 && heightIndex < verticalSplitting){
				pref_enemies[heightIndex][widthIndex] = 0.15 * pref_enemies[heightIndex][widthIndex];
			}
		}

		//mitigates the preference by mixing the values with the adjacent rectangles (considers -1 if non existent) (pref_enemies and pref_final)
		for(let i = 0; i < verticalSplitting; i++){
			for(let k = 0; k < horizontalSplitting; k++){
				//mitigates for the pref_enemies
				//starts at -1 so that the non existent adjacent rectangles have a -1 value
				//this way it also sets a negative preference for the margin
				var pref_up     = -1;
				var pref_right  = -1;
				var pref_left   = -1;
				var pref_down   = -1;

				if(i > 0){
					pref_up  = pref_enemies[i - 1][k];
				}
				if(i < verticalSplitting - 1){
					pref_down = pref_enemies[i + 1][k];
				}

				if(k > 0){
					pref_left = pref_enemies[i][k - 1];
				}
				if(k < horizontalSplitting - 1){
					pref_right = pref_enemies[i][k + 1];
				}

				pref_enemies[i][k] = 0.25 * pref_enemies[i][k] + 0.75 * (0.25 * pref_up + 0.25 * pref_right + 0.25 * pref_down + 0.25 * pref_left);
				


				//mitigates for the pref_final
				//starts at -1 so that the non existent adjacent rectangles have a -1 value
				//this way it also sets a negative preference for the margin
				pref_up     = -1;
				pref_right  = -1;
				pref_left   = -1;
				pref_down   = -1;
				
				if(i > 0){
					pref_up  = pref_final[i - 1][k];
				}
				if(i < verticalSplitting - 1){
					pref_down = pref_final[i + 1][k];
				}

				if(k > 0){
					pref_left = pref_final[i][k - 1];
				}
				if(k < horizontalSplitting - 1){
					pref_right = pref_final[i][k + 1];
				}

				pref_final[i][k] = 0.5 * pref_final[i][k] + 0.5 * (0.25 * pref_up + 0.25 * pref_right + 0.25 * pref_down + 0.25 * pref_left);


			}
		}

		//Based on where the asteroids are and , change the rectangle preference so that they prefer to stay away from each them
		for(let i = 0; i < asteroids.length; i++){
			var heightIndex  = Math.floor(asteroids[i].positionY/heightPiece);
			var widthIndex = Math.floor(asteroids[i].positionX/widthPiece);

			if(widthIndex >= 0 && widthIndex < horizontalSplitting && heightIndex >= 0 && heightIndex < verticalSplitting){
				pref_asteroids[heightIndex][widthIndex] = pref_asteroids[heightIndex][widthIndex] - 1;
			}
		}


		//Multiplies all matrices together
		for(let i = 0; i < verticalSplitting; i++){
			for(let k = 0; k < horizontalSplitting; k++){
				pref_final[i][k] = pref_final[i][k] * pref_enemies[i][k] * pref_asteroids[i][k];
			}
		}


		//Based on here the spaceship is, choses a preference for the rectangles directly on top and near it.
		//This "for" goes up to the retangle of the canvas where the spaceship is
		for(let i = 0; i < Math.floor(spaceship.positionY/heightPiece); i++){
			for(let k = 0; k < horizontalSplitting; k++){
				if((k < Math.floor(spaceship.positionX/widthPiece)  + Math.floor(horizontalSplitting/3) &&
				   k > Math.floor(spaceship.positionX/widthPiece)  - Math.floor(horizontalSplitting/3)  &&
				   i < Math.floor(spaceship.positionY/heightPiece) - Math.floor(verticalSplitting/3)    &&
				   Math.floor(spaceship.positionX/widthPiece)  != 0)                                   ||
				   (Math.floor(spaceship.positionX/widthPiece)  == 0 && k == 0)                        ||
				   (Math.floor(spaceship.positionX/widthPiece)  == horizontalSplitting - 2 && k == horizontalSplitting - 2)){
				   pref_final[i][k] = pref_final[i][k] + 4;
				}
				else if(k < Math.floor(spaceship.positionX/widthPiece)  + Math.floor(horizontalSplitting/5)  &&
					 	k > Math.floor(spaceship.positionX/widthPiece)  - Math.floor(horizontalSplitting/5)  &&
				   		i < Math.floor(spaceship.positionY/heightPiece) - Math.floor(verticalSplitting/3)){
					pref_final[i][k] = pref_final[i][k] + 2;
				}
			}
		}

		//Based on here the spaceship is, choses a negative preference for the rectangles directly below it.
		//However, increases the preference for the rectangles on the margins drastically if the spaceship is near it
		//This "for" goes from the retangle of the canvas where the spaceship is up to the end of the canvas
		for(let i = Math.floor(spaceship.positionY/heightPiece); i < verticalSplitting; i++){
			for(let k = 0; k < horizontalSplitting; k++){
				if((Math.floor(spaceship.positionY/heightPiece) == 0 && i == 0) ||
				   (Math.floor(spaceship.positionX/widthPiece)  == 0 && k == 0)){
				   pref_final[i][k] = pref_final[i][k] + 4;
				}
				if(k < Math.floor(spaceship.positionX/widthPiece)  - Math.floor(horizontalSplitting/3)  ||
				   k > Math.floor(spaceship.positionX/widthPiece)  + Math.floor(horizontalSplitting/3) ||
				   i > Math.floor(spaceship.positionY/heightPiece) - Math.floor(verticalSplitting/3)){
					pref_final[i][k] = pref_final[i][k] - 1;
				}
				else if(k < Math.floor(spaceship.positionX/widthPiece)   - Math.floor(horizontalSplitting/5)  ||
					 	k > Math.floor(spaceship.positionX/widthPiece)  + Math.floor(horizontalSplitting/5)){
					pref_final[i][k] = pref_final[i][k] - 0.25;
				}
			}
		}

		//checks where the enemy is at the moment
		var current_i = Math.floor(this.positionY/heightPiece);
		var current_k = Math.floor(this.positionX/widthPiece);

		if(current_i < 0){
			current_i = 0;
		}
		else if(current_i >= verticalSplitting){
			current_i = verticalSplitting - 1;
		}

		if(current_k < 0){
			current_k = 0;
		}
		else if(current_k >= horizontalSplitting){
			current_k = horizontalSplitting - 1;
		}

		//checks which rectangle has the highest preference. If there is a tie, chooses the closer one
		for(let i = 0; i < verticalSplitting; i++){
			for(let k = 0; k < horizontalSplitting; k++){
				if(pref_final[i][k] >  pref_final[this.bestYIndex][this.bestXIndex] ||
				  (pref_final[i][k] == pref_final[this.bestYIndex][this.bestXIndex] &&
				  (Math.sqrt(Math.pow(i - current_i, 2) + Math.pow(k - current_k, 2))  <   Math.sqrt(Math.pow(i - this.bestYIndex, 2) + Math.pow(k - this.bestXIndex, 2))))){
					this.bestYIndex = i;
					this.bestXIndex = k;
				}
			}
		}

		//Changes the value of the best X and Y
		this.bestX = this.bestXIndex * widthPiece  + widthPiece/2;
		this.bestY = this.bestYIndex * heightPiece + heightPiece/2;
	}

	//to string, can be used for debugging	
	toString(){
		return 	"Enemy: CoordefillerTexts (" 	+ this.positionX 	+ "," 			+ this.positionY 	+ ")"
			+ 	" Width: " 					+ this.width 		+ " Heigth: " 	+ this.height
			+ 	" Velocidade -> " 			+ this.speed
			+ 	" Clickable: " 				+ this.clickable 	+ " Dragable: " + this.dragable;
	}
}