"use strict";

class Entity extends Component{

	constructor(positionX, positionY, width, height, naturalWidth, naturalHeight, speed, clickable, dragable, movable, img, id, numberOfFrames, refreshRate, rocketSpeed, imgsRockets, rocketIndex, cooldown){

		super(positionX, positionY, width, height, naturalWidth, naturalHeight, speed, clickable, dragable, movable, img, id, numberOfFrames, refreshRate);

		
		//direction
		this.boool = new Array(4);

		this.boool[0] = false;
		this.boool[1] = false;
		this.boool[2] = false;
		this.boool[3] = false;

		this.refreshRate 		 = refreshRate;
		this.rocketSpeed 	     = rocketSpeed * this.refreshRate/60;
		this.cooldownRocketIni   = cooldown;
		this.cooldownRocketTotal = cooldown;
		this.cooldownRocketAtual = 0;

		this.rocketLevel   = rocketIndex;
		this.rocket      = imgsRockets[0];
		this.rocketBool  = false;
		this.rocketReady = true;

	}

	newRocket(){
		//polimorfism
	}

	//creates a new Rocket
	oneRocket(positionX, positionY, width, height, nw, nh, angle, rocketsArray, body){
		var sp = new Rocket(positionX, positionY, width, height, nw, nh, this.rocketSpeed, false, false, true, this.rocket, 0, 1, this.refreshRate, angle);
		sp.pixels(body);
		rocketsArray.push(sp);
	}

	shots(positionY, angle, rocketsArray, sounds, body){
		var nw 	= this.rocket.naturalWidth;
		var nh 	= this.rocket.naturalHeight;

		var width  = 0.4*Math.floor(nw);   
		var height = 0.4*Math.floor(nh);

		var positionX = this.positionX + this.width/2 - width/2;

		//depending on rocketLevel, will shot in a different way
		switch(this.rocketLevel){
			case 0:
				this.oneRocket(positionX, positionY, width, height, nw, nh, angle, rocketsArray, body);
				break;
			case 1:
				this.oneRocket(positionX - this.width/4, positionY - this.width/2, width, height, nw, nh, angle, rocketsArray, body);
				this.oneRocket(positionX + this.width/4, positionY - this.width/2, width, height, nw, nh, angle, rocketsArray, body);
				break;
			case 2:
				this.oneRocket(positionX, positionY, width, height, nw, nh, angle - 30, rocketsArray, body);
				this.oneRocket(positionX, positionY, width, height, nw, nh, angle, rocketsArray, body);
				this.oneRocket(positionX, positionY, width, height, nw, nh, angle + 30, rocketsArray, body);
				break;
			case 3:
				this.oneRocket(positionX, positionY, width, height, nw, nh, angle - 30, rocketsArray, body);
				this.oneRocket(positionX - this.width/4, positionY - this.width/2, width, height, nw, nh, angle, rocketsArray, body);
				this.oneRocket(positionX + this.width/4, positionY - this.width/2, width, height, nw, nh, angle, rocketsArray, body);
				this.oneRocket(positionX, positionY, width, height, nw, nh, angle + 30, rocketsArray, body);
				break;
			case 4:
				this.oneRocket(positionX, positionY, width, height, nw, nh, angle - 30, rocketsArray, body);
				this.oneRocket(positionX - this.width/4, positionY - this.width/2, width, height, nw, nh, angle, rocketsArray, body);
				this.oneRocket(positionX, positionY, width, height, nw, nh, angle, rocketsArray, body);
				this.oneRocket(positionX + this.width/4, positionY - this.width/2, width, height, nw, nh, angle, rocketsArray, body);
				this.oneRocket(positionX, positionY, width, height, nw, nh, angle + 30, rocketsArray, body);
				break;
			case 5:
				this.oneRocket(positionX, positionY, width, height, nw, nh, angle - 30, rocketsArray, body);
				this.oneRocket(positionX, positionY, width, height, nw, nh, angle - 15, rocketsArray, body);
				this.oneRocket(positionX - this.width/4, positionY - this.width/2, width, height, nw, nh, angle, rocketsArray, body);
				this.oneRocket(positionX, positionY, width, height, nw, nh, angle, rocketsArray, body);
				this.oneRocket(positionX + this.width/4, positionY - this.width/2, width, height, nw, nh, angle, rocketsArray, body);
				this.oneRocket(positionX, positionY, width, height, nw, nh, angle + 15, rocketsArray, body);
				this.oneRocket(positionX, positionY, width, height, nw, nh, angle + 30, rocketsArray, body);
				break;
			case 6:break;
			default:break;
		}
		sounds["rockets"][0].load();
		sounds["rockets"][0].play().catch(function(){});

		//sounds["rockets"][this.rocketLevel].load();
		//sounds["rockets"][this.rocketLevel].play().catch(function(){});
	}

	//when the current cooldown is the same or bigger than the total cooldown, its ready to shoot
	rockets_cooldown(){
		if(this.cooldownRocketAtual >= this.cooldownRocketTotal){
			this.cooldownRocketAtual = 0;
			this.rocketReady = true;
		}
		else if(this.rocketReady == false){
			this.cooldownRocketAtual++;
		}
	}

	//loads a new rocket
	loadRocket(img, index){
		this.rocketLevel = index;
		//this.rocket    = img[index];
		this.rocket = img[0];
	}

	//upgrades the rocket
	upgradeRocket(img){
		if (this.rocketLevel < 5){
			this.rocketLevel = this.rocketLevel + 1;
			//this.rocket = img[this.rocketLevel];
		}
	}


	//to string, can be used for debugging
	toString(){
		return 	"Entity: CoordefillerTexts (" + this.positionX 	+ "," 			+ this.positionY 	+ ")"
			+ 	" Width: " 				+ this.width 		+ " Heigth: " 	+ this.height
			+ 	" Velocidade: " 		+ this.speed
			+ 	" Clickable: " 			+ this.clickable 	+ " Dragable: " + this.dragable;
	}
}