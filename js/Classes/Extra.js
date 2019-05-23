"use strict";

class Extra extends Componente{

	constructor(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes, componente, ativo){

		super(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes);

		this.componenteAxexado = componente;
		this.ativo             = ativo;
		this.tempoAtivado;
		this.pisca;
	}

	//usado para mover em cada iteracao do render
	mover(){
		this.posicaoX = this.componenteAxexado.posicaoX;
		this.posicaoY = this.componenteAxexado.posicaoY;
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