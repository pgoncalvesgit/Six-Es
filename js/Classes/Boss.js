"use strict";

class Boss extends Entity{

	constructor(positionX, positionY, width, height, naturalWidth, naturalHeight, speed, clickable, dragable, movable, img, id, numberOfFrames, refreshRate, rocketSpeed, imgsRockets, rocketIndex, cooldown){

		super(positionX, positionY, width, height, naturalWidth, naturalHeight, speed, clickable, dragable, movable, img, id, numberOfFrames, refreshRate, rocketSpeed, imgsRockets, rocketIndex, cooldown);
		
		this.totalLife;
		this.life;
		this.stages;
		this.currentStage = 0;
		//this.signal is used for the movement
		this.signal 	  = 1;
		this.beggining    = 1;
		

		//based on boss's id, change the change of stage and the movement
		switch(id){
			case 0:
				this.totalLife = 90;
				this.life  = 90;
				this.stages = 3;
				this.secondMovement = function(ctx){
					//var coordefillerTexts = new Array(2);
					if(this.positionX <= 0){
						this.signal = 1;
						this.speed = 10 * this.refreshRate/60;
						this.cooldownRocketTotal = Math.floor(this.cooldownRocketIni/10);
					}
					else if(this.positionX >= ctx.canvas.width - this.width){
						this.signal = -1;
						this.speed = 2 * this.refreshRate/60;
						this.cooldownRocketTotal = this.cooldownRocketIni;
					}
					this.positionX = this.positionX + this.signal * this.speed;
				}
				this.nextStage = function(){
					switch(this.currentStage){
						case 0: this.rocketLevel  = 2;this.cooldownRocketTotal = 30;break;
						case 1: this.rocketLevel  = 4;this.cooldownRocketTotal = 20;break;
						default: this.rocketLevel = 0;break;
					}
					this.currentStage++;
				}
				break;
			case 1:
				this.totalLife = 120;
				this.life  = 120;
				this.stages = 3;
				this.secondMovement = function(ctx){
					//var coordefillerTexts = new Array(2);
					switch(this.signal){
						case 0:
							if(this.positionY <= 0){
								this.signal = 1;
								this.speed = 4 * this.refreshRate/60;
							}
							else{
								this.positionY = this.positionY - this.speed;
							}
							break;
						case 1:
							if(this.positionX <= 0){
								this.signal = 2;
								this.speed = 6 * this.refreshRate/60;
							}
							else{
								this.positionX = this.positionX - this.speed;
							}
							break;
						case 2:
							if(this.positionY >= ctx.canvas.height/2 - this.height){
								this.signal = 3;
								this.speed = 10 * this.refreshRate/60;
							}
							else{
								this.positionY = this.positionY + this.speed;
							}
							break;
						case 3:
							if(this.positionX >= ctx.canvas.width - this.width){
								this.signal = 0;
								this.speed = 15 * this.refreshRate/60;
							}
							else{
								this.positionX = this.positionX + this.speed;
							}
							break;
						default:
							this.signal = 0;
							break;
					}
				}
				
				this.nextStage = function(){
					switch(this.currentStage){
						case 0: this.rocketLevel  = 2;break;
						case 1: this.rocketLevel  = 4;break;
						default: this.rocketLevel = 0;
					}
					this.currentStage++;
				}
				break;
				break;
			default:
				this.stages = 3;
				this.secondMovement = function(ctx){
					//var coordefillerTexts = new Array(2);
					if(this.positionX <= 0){
						this.signal = 1;
						this.speed = 2 * this.refreshRate/60;
						this.cooldownRocketTotal = Math.floor(this.cooldownRocketIni/10);
					}
					else if(this.positionX >= ctx.canvas.width - this.width){
						this.signal = -1;
						this.speed = 0.15 * this.refreshRate/60;
						this.cooldownRocketTotal = this.cooldownRocketIni;
					}
					this.positionX = this.positionX + this.signal * this.speed;
				}
				this.nextStage = function(){
					switch(this.currentStage){
						case 0: this.rocketLevel  = 2;break;
						case 1: this.rocketLevel  = 4;break;
						default: this.rocketLevel = 0;
					}
					this.currentStage++;
				}
				break;
				break;
		}
	}

	//checks if it is in the beggining, so it then decides which function of movement to use
	//moves each iteration of render
	move(ctx, t){
		if(this.beggining == 1){
			this.firstMovement();
		}
		else{
			this.secondMovement(ctx);
		}
	}
	
	//movement before all the boss appears on the screen 
	firstMovement(){
		this.positionY = this.positionY + this.speed;
		if (this.positionY > 0){
			this.speed = 4 * this.refreshRate/60;
			this.beggining = 0;
		}
	}

	//secondMovement, abstract, defined in the constructor
	secondMovement(ctx){
		console.log("test secondMovement");
	}

	//nextStage, abstract, defined in the constructor
	nextStage(){
		console.log("test nextStage");
	}

	//creates a new Rocket (shots)
	newRocket(ctx, sounds, body, enemyRockets){
		var positionY;
		var speed;
		
		this.rocketReady = false;

		positionY = this.positionY + 3*this.width/4;

		this.shots(positionY, 270, enemyRockets, sounds, body);
	}

	//when touched, loses a life and checks if it has to change stage
	touched(){
		this.life = this.life - 1;
		//if he has more than one stage and at least 1 life left
		if(this.stages > 1 && this.life > 0){
			//we split the life evenly between the n number of stages
			//to know how much hp it has to lose in order to change stage. 
			if(this.life % Math.ceil(this.totalLife / this.stages) == 0){
				this.nextStage();
			}
		}
	}

	//to string, can be used for debugging
	toString(){
		return 	"Boss: CoordefillerTexts (" 	+ this.positionX 	+ "," 			+ this.positionY 	+ ")"
			+ 	" Width: " 				+ this.width 		+ " Heigth: " 	+ this.height
			+ 	" Velocidade -> " 		+ this.speed
			+ 	" Clickable: " 			+ this.clickable 	+ " Dragable: " + this.dragable;
	}
}