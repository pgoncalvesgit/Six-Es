"use strict";

class Spaceship extends Entity{

	constructor(positionX, positionY, width, height, naturalWidth, naturalHeight, speed, clickable, dragable, movable, img, id, numberOfFrames, refreshRate, rocketSpeed, imgsRockets, rocketIndex, cooldown, life){

		super(positionX, positionY, width, height, naturalWidth, naturalHeight, speed, clickable, dragable, movable, img, id, numberOfFrames, refreshRate, rocketSpeed, imgsRockets, rocketIndex, cooldown);
		
		this.rockets   = new Array();
		this.life      = life;
		this.points    = 0;
		this.blink     = 0;

		this.timeHit;
		this.timeGrowed;
		this.timeShrinked;
		this.timeShield;

		this.growed = 0;
		this.shrinked = 0;
		//dependendo do id, a spaceship terá caracteristicas diferentes
		switch(id){
			case 0: break;
			case 1:
				this.life       = 2;
				this.speed = this.speed + 6;
				break;
			case 2:
				this.life       = 5;
				this.speed = this.speed - 2;
				break;
			case 3:
				this.life       = 2;
				this.cooldownRocketIni   = this.cooldownRocketIni - 15;
				this.cooldownRocketTotal = this.cooldownRocketIni;
				break;
			case 4: 
				this.speed = this.speed + 3;
				this.cooldownRocketIni   = this.cooldownRocketIni - 8;
				this.cooldownRocketTotal = this.cooldownRocketIni;
			default: break;
		}

	}

	//creates a new Rocket
	newRocket(ctx, sounds, body){
		var positionY;

		this.rocketReady = false;
		positionY = this.positionY;

		this.shots(positionY, 90, this.rockets, sounds, body);

	}

	//moves each iteration of render, usa os booleanos para verificar que teclas foram clicadas
	//de modo a saber que direction tem de se movimentar
	move(ctx){
		if(this.boool[0]){
			if(this.positionX - this.speed > 0) {
				this.positionX -= this.speed;
			}
			else if(this.positionX > 0){
				this.positionX = 0;
			}
		}
		if(this.boool[1]){
			if(this.positionX + this.width + this.speed < ctx.canvas.width) {
				this.positionX += this.speed;
			}
			else if(this.positionX + this.width < ctx.canvas.width){
				this.positionX = ctx.canvas.width - this.width;
			}
		}
		if(this.boool[2]){
			if(this.positionY - this.speed > 0) {
				this.positionY -= this.speed;
			}
			else if(this.positionY > 0){
				this.positionY = 0;
			}
		}
		if(this.boool[3]){
			if(this.positionY + this.height + this.speed < ctx.canvas.height) {
				this.positionY += this.speed;
			}
			else if(this.positionY + this.height < ctx.canvas.height){
				this.positionY = ctx.canvas.height - this.height;
			}
		}
	}

	//coloca os booleanos every a 0 parando a spaceship
	stop(){
		for(let i = 0; i < 4; i++){
			this.boool[i] = false;
		}
		this.rocketBool = false;
	}

	//desenha a spaceship, blinkndo-a caso esta tenha perdido life recentemente
	//redefine a funcao draw da classe component (polimorfism)
	draw(ctx, body, currentTime){
		if((this.growed == 1 && currentTime - this.timeGrowed > 15000) ||
		   (this.shrinked == 1 && currentTime - this.timeShrinked > 15000)){
			this.normal(body);
		}

		if (this.extras[0].active == 1 && currentTime - this.timeShield > 20000){
			this.extras[0].active = 0;
		}

		if (this.blink == 0 || (this.blink == 1 && currentTime % 200 > 100)){
			this.drawUmaRotacao(ctx);
			if(this.index >= this.numberOfFrames - 1){
				this.index = 0;
			}

			if(this.blink == 1 && currentTime - this.timeHit >= 3000){
				this.blink = 0;
			}
		}
	}

	//desenha o esculo caso o tenha, e blink-o caso faltem menos de 5 segundos para o perder
	drawShield(ctx, currentTime){
		if((this.extras[0].active == 1 && currentTime - this.timeShield < 15000) ||
		   (this.extras[0].active == 1 && currentTime - this.timeShield < 20000 && currentTime % 200 > 100)){
			this.extras[0].draw(ctx);
		}
		else if(this.extras[0].active == 1 && currentTime - this.timeShield >= 20000){
			this.extras[0].active = 0;
		}
	}

	//caso a spaceship seja antingida, se no estiver invulneravel (a blinkr), verifica
	//se possui um escudo, perdendo-o em caso afirmactive, ou perdendo life no caso contrario
	//ficando invulnerável (a blinkr), independentemente de o ter ou no
	touched(currentTime){
		if(this.blink == 0){
			if(this.extras[0].active == 1){
				this.extras[0].active = 0;
			}
			else{
				this.life--;
			}
			this.timeHit = currentTime;
			this.blink        = 1;
		}
	}

	//Carrega every os extras
	loadOthers(imgOthers, body){
		for(let i = 0; i < imgOthers.length; i++){
			this.loadExtra(imgOthers[i], body, 0, this.refreshRate);
		}
	}

	//activates o powerup/extra do escudo
	activatesShield(currentTime){
		this.extras[0].active = 1;
		this.timeShield      = currentTime;
	}

	//a spaceship change o seu tamanho
	changeSize(body, ratio){
		this.width  = this.widthIni  * ratio;
		this.height = this.heightIni * ratio;

		this.pixels(body);

		for(let i = 0; i < this.extras.length; i++){
			this.extras[i].width  = this.extras[i].widthIni  * ratio;
			this.extras[i].height = this.extras[i].heightIni * ratio;
			
			this.extras[i].pixels(body);
		}
	}

	//a spaceship grow o seu tamanho para o dobro
	grow(body, currentTime){
		
		this.shrinked = 0;
		this.growed = 1;
		this.timeGrowed = currentTime;

		this.changeSize(body, 2);
	}

	//a spaceship shrink o seu tamanho para metade
	shrink(body, currentTime){

		this.shrinked = 1;
		this.growed = 0;
		this.timeShrinked = currentTime;
		
		this.changeSize(body, 0.5);
	}

	//a spaceship volta ao normal
	normal(body){

		this.growed = 0;
		this.shrinked = 0;

		this.changeSize(body, 1);
	}

	//sums points dependendo do modo de Game
	sumsPoints(quantity, gamemode, currentTime, begginingTime){
		switch(gamemode){
			case 1 : this.points += Math.floor(quantity * (1/Math.log(currentTime - begginingTime + 2) + 1));break;
			case 2 : this.points += Math.floor(quantity * (currentTime - begginingTime) / 1000);break;
			default: this.points += quantity; break;
		}
	}

	//to string, can be used for debugging
	toString(){
		return 	"Spaceship: CoordefillerTexts (" 	+ this.positionX 	+ "," 			+ this.positionY 	+ ")"
			+ 	" Width: " 				+ this.width 		+ " Heigth: " 	+ this.height
			+ 	" Velocidade -> " 		+ this.speed
			+ 	" Clickable: " 			+ this.clickable 	+ " Dragable: " + this.dragable;
	}
}