"use strict";

class Extra extends Component{

	constructor(positionX, positionY, width, height, naturalWidth, naturalHeight, speed, clickable, dragable, movable, img, id, numberOfFrames, refreshRate, component, active){

		super(positionX, positionY, width, height, naturalWidth, naturalHeight, speed, clickable, dragable, movable, img, id, numberOfFrames, refreshRate);

		this.attachedComponent = component;
		this.active            = active;
		this.timeActivated;
		this.blink;
	}

	//moves each iteration of render
	move(){
		this.positionX = this.attachedComponent.positionX;
		this.positionY = this.attachedComponent.positionY;
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