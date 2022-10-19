"use strict";

class Powerup extends Bulk{

	constructor(positionX, positionY, width, height, naturalWidth, naturalHeight, speed, clickable, dragable, movable, img, id, numberOfFrames, refreshRate, direction, begginingTime){

		super(positionX, positionY, width, height, naturalWidth, naturalHeight, speed, clickable, dragable, movable, img, id, numberOfFrames, refreshRate, direction);

		this.begginingTime = begginingTime;
		this.refreshRate = refreshRate;
	}
	
	//moves each iteration of render, if he is outside the canvas, gets erased from the Powerups Array
	//For the first 20 seconds, each time it colides with a wall, he will change direction to point at a random location inside the canvas
	move(canvasHeight, canvasWidth, currentTime, powerups, index){
		if(currentTime - this.begginingTime < 20000){
			if (this.positionY + this.height >= canvasHeight){
				this.direction = Math.random() * 180;
			}
			else if(this.positionY <= 0){
				this.direction = -(Math.random() * 180);
			}
			else if(this.positionX + this.width >= canvasWidth){
				this.direction = Math.random() * 180 + 90;
			}
			else if(this.positionX <= 0){
				this.direction = Math.random() * 180 - 90;
			}
		}
		else if(this.positionY               > canvasHeight ||
			    this.positionY + this.height < 0            ||
			    this.positionX               > canvasWidth  ||
			    this.positionX + this.width  < 0              ){
			powerups.splice(index, 1);
		}

		this.positionY = this.positionY - this.speed * Math.sin(this.direction * Math.PI/180) * this.refreshRate / 60;
		this.positionX = this.positionX + this.speed * Math.cos(this.direction * Math.PI/180) * this.refreshRate / 60;
	}

	//interacts differently with the spaceship deppending on the powerup
	interage(spaceship, img, body, currentTime){
		switch(this.id){
			case 0: spaceship.speed += 1          ; break;
			case 1: spaceship.life++                   ; break;
			case 2: spaceship.activatesShield(currentTime)  ; break;
			case 3: spaceship.rocketSpeed += 1         ; break;
			case 4: spaceship.grow(body, currentTime); break;
			case 5: spaceship.shrink(body, currentTime); break;
			case 6: spaceship.cooldownRocketTotal -= 2 ; break;
			case 7: spaceship.upgradeRocket(img)         ; break;
			case 8: spaceship.cooldownRocketTotal  = 3 ; break;
			default: spaceship.life++                  ; break;
		}
	}

	//to string, can be used for debugging
	toString(){
		return 	"Powerup: CoordefillerTexts (" 	+ this.positionX 	+ "," 			+ this.positionY 	+ ")"
			+ 	" Width: " 					+ this.width 		+ " Heigth: " 	+ this.height
			+ 	" Velocidade -> " 			+ this.speed
			+ 	" Clickable: " 				+ this.clickable 	+ " Dragable: " + this.dragable
			+	" Direcao: " 				+ this.direction;
	}
}