"use strict";

class Rocket extends Bulk{

	constructor(positionX, positionY, width, height, naturalWidth, naturalHeight, speed, clickable, dragable, movable, img, id, numberOfFrames, refreshRate, direction){

		super(positionX, positionY, width, height, naturalWidth, naturalHeight, speed, clickable, dragable, movable, img, id, numberOfFrames, refreshRate, direction);

		
	}
	
	//moves each iteration of render, if he is outside the canvas, gets erased from the Rockets Array
	move(canvasHeight, canvasWidth, rocketsArray, index){
		
		if (this.positionY               > canvasHeight ||
			this.positionY + this.height < 0            ||
			this.positionX               > canvasWidth  ||
			this.positionX + this.width  < 0              ){
			rocketsArray.splice(index, 1);
		}

		this.positionY = this.positionY - this.speed * Math.sin(this.direction * Math.PI/180);
		this.positionX = this.positionX - this.speed * Math.cos(this.direction * Math.PI/180);
	}

	//to string, can be used for debugging
	toString(){
		return 	"Rocket: CoordefillerTexts (" 	+ this.positionX 	+ "," 			+ this.positionY 	+ ")"
			+ 	" Width: " 					+ this.width 		+ " Heigth: " 	+ this.height
			+ 	" Velocidade -> " 			+ this.speed
			+ 	" Clickable: " 				+ this.clickable 	+ " Dragable: " + this.dragable
			+	" Direcao: " 				+ this.direction;
	}
}