"use strict";

class Asteroid extends Bulk{

	constructor(positionX, positionY, width, height, naturalWidth, naturalHeight, speed, clickable, dragable, movable, img, id, numberOfFrames, refreshRate, direction){

		super(positionX, positionY, width, height, naturalWidth, naturalHeight, speed, clickable, dragable, movable, img, id, numberOfFrames, refreshRate, direction);

		this.refreshRate = refreshRate;
	}

	//called every iteration on render
	move(canvasHeight, maxSpeed, minSpeed){
		if (this.positionY < canvasHeight){
			this.positionY = this.positionY + this.speed;		
		}
		//if the asteroid leaves the screen, he gets updated back to the beggining
		else{
			this.updateAsteroid(maxSpeed, minSpeed);
		}
	}

	//update the asteroid, placing it on the top again
	updateAsteroid(maxSpeed, minSpeed){
		//Random X inside the canvas
		var positionX = Math.random() * 1200 + 50;
		//Starts between 1000 and 1500 pixels on top of the canvas
		var positionY = Math.random() * 500 + 1000;

		this.positionX = positionX;
		//positionY is posive, but we want it to be on top, so it has to be negative
		this.positionY = -positionY;

		//random initial index
		var indexIni = Math.random() * 32;
		indexIni 	  = Math.floor(indexIni);

		this.index = indexIni;

		//random speed between minSpeed and (minSpeed + maxSpeed)
		this.speed = ((Math.random() * maxSpeed) + minSpeed) * this.refreshRate / 60;
	}

	//to string, can be used for debugging
	toString(){
		return 	"Asteroid: CoordefillerTexts (" 	+ this.positionX 	+ "," 			+ this.positionY 	+ ")"
			+ 	" Width: " 					+ this.width 		+ " Heigth: " 	+ this.height
			+ 	" Velocidade -> " 			+ this.speed
			+ 	" Clickable: " 				+ this.clickable 	+ " Dragable: " + this.dragable
			+	" Direcao: " 				+ this.direction;
	}
}