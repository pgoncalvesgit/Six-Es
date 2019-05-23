"use strict";

class Powerup extends Objeto{

	constructor(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes, direcao, tempoInicial){

		super(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes, direcao);

		this.tempoInicial = tempoInicial;		
	}
	
	//usado para mover em cada iteracao do render, se estiver fora da canvas é apagado do array de powerups
	//Durante 20 segundos, sempre que colidir com um dos extremos da canvas, fica com uma direcao random contrária
	//ao extremo com que colidiu.
	mover(canvasHeight, canvasWidth, tempoAtual, powerups, indice){
		if(tempoAtual - this.tempoInicial < 20000){
			if (this.posicaoY + this.height >= canvasHeight){
				this.direcao = Math.random() * 180;
			}
			else if(this.posicaoY <= 0){
				this.direcao = -(Math.random() * 180);
			}
			else if(this.posicaoX + this.width >= canvasWidth){
				this.direcao = Math.random() * 180 + 90;
			}
			else if(this.posicaoX <= 0){
				this.direcao = Math.random() * 180 - 90;
			}
		}
		else if(this.posicaoY               > canvasHeight ||
			    this.posicaoY + this.height < 0            ||
			    this.posicaoX               > canvasWidth  ||
			    this.posicaoX + this.width  < 0              ){
			powerups.splice(indice, 1);
		}

		this.posicaoY = this.posicaoY - this.velocidade * Math.sin(this.direcao * Math.PI/180);
		this.posicaoX = this.posicaoX + this.velocidade * Math.cos(this.direcao * Math.PI/180);
	}

	//dependendo do id do powerup, este irá interagir com a nave de forma diferente
	interage(nave, img, body, tempoAtual){
		switch(this.id){
			case 0: nave.velocidade += 1          ; break;
			case 1: nave.vida++                   ; break;
			case 2: nave.ativaEscudo(tempoAtual)  ; break;
			case 3: nave.rocketSpeed += 1         ; break;
			case 4: nave.aumenta(body, tempoAtual); break;
			case 5: nave.diminui(body, tempoAtual); break;
			case 6: nave.cooldownRocketTotal -= 2 ; break;
			case 7: nave.melhoraTiro(img)         ; break;
			case 8: nave.cooldownRocketTotal  = 3 ; break;
			default: nave.vida++                  ; break;
		}
	}

	//to string, pode ser usado para debugging
	toString(){
		return 	"Powerup: Coordenadas (" 	+ this.posicaoX 	+ "," 			+ this.posicaoY 	+ ")"
			+ 	" Width: " 					+ this.width 		+ " Heigth: " 	+ this.height
			+ 	" Velocidade -> " 			+ this.velocidade
			+ 	" Clickable: " 				+ this.clickable 	+ " Dragable: " + this.dragable
			+	" Direcao: " 				+ this.direcao;
	}
}