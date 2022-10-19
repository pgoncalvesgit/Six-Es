"use strict";

class Bulk extends Component{

	constructor(positionX, positionY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, numberOfFrames, refreshRate, direction){

		super(positionX, positionY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, numberOfFrames, refreshRate);

		
		//direction
		if(direction == undefined){
			this.direction = Math.random()*360;
		}
		else{
			this.direction = direction;
		}


	}

	//moves each iteration of render
	move(){
		//polimorfism
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