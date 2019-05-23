"use strict";

class Objeto extends Componente{

	constructor(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes, direcao){

		super(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes);

		
		//direcao
		if(direcao == undefined){
			this.direcao = Math.random()*360;
		}
		else{
			this.direcao = direcao;
		}


	}

	//usado para mover em cada iteracao do render
	mover(){
		//polimorfismo
	}

	//to string, pode ser usado para debugging
	toString(){
		return 	"Objeto: Coordenadas (" + this.posicaoX 	+ "," 			+ this.posicaoY 	+ ")"
			+ 	" Width: " 				+ this.width 		+ " Heigth: " 	+ this.height
			+ 	" Velocidade -> " 		+ this.velocidade
			+ 	" Clickable: " 			+ this.clickable 	+ " Dragable: " + this.dragable
			+	" Rotacao: " 			+ this.direcao;
	}
}