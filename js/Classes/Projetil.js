"use strict";

class Projetil extends Objeto{

	constructor(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes, direcao){

		super(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes, direcao);

		
	}
	
	//usado para mover em cada iteracao do render, se estiver fora da canvas, é apagado do array de rockets
	mover(canvasHeight, canvasWidth, rocketsArray, indice){
		
		if (this.posicaoY               > canvasHeight ||
			this.posicaoY + this.height < 0            ||
			this.posicaoX               > canvasWidth  ||
			this.posicaoX + this.width  < 0              ){
			rocketsArray.splice(indice, 1);
		}

		this.posicaoY = this.posicaoY - this.velocidade * Math.sin(this.direcao * Math.PI/180);
		this.posicaoX = this.posicaoX - this.velocidade * Math.cos(this.direcao * Math.PI/180);
	}

	//to string, pode ser usado para debugging
	toString(){
		return 	"Projetil: Coordenadas (" 	+ this.posicaoX 	+ "," 			+ this.posicaoY 	+ ")"
			+ 	" Width: " 					+ this.width 		+ " Heigth: " 	+ this.height
			+ 	" Velocidade -> " 			+ this.velocidade
			+ 	" Clickable: " 				+ this.clickable 	+ " Dragable: " + this.dragable
			+	" Direcao: " 				+ this.direcao;
	}
}