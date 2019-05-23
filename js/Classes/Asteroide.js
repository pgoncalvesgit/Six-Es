"use strict";

class Asteroide extends Objeto{

	constructor(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes, direcao){

		super(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes, direcao);

		
	}

	//chamado todas as iteracoes no render
	mover(canvasHeight, MaxVelocidade, MinVelocidade){
		if (this.posicaoY < canvasHeight){
			this.posicaoY = this.posicaoY + this.velocidade;		
		}
		//se o asteroide estiver fora do ecra, ele tem de voltar ao inicio
		else{
			this.atualizaAsteroide(MaxVelocidade, MinVelocidade);
		}
	}

	//atualiza o asteroide, colocando-o no inicio de novo
	atualizaAsteroide(MaxVelocidade, MinVelocidade){
		//Tem uma posicaoX random dentro da canvas
		var posicaoX = Math.random() * 1200 + 50;
		//Comeca entre 1000 e 1500 pixeis acima da posicao Y igual a 0 da canvas
		var posicaoY = Math.random() * 500 + 1000;

		this.posicaoX = posicaoX;
		//inverte para ser negativo (acima da posicaoY igual a 0)
		this.posicaoY = -posicaoY;

		//escolhe um indice random inicial
		var indiceIni = Math.random() * 32;
		indiceIni 	  = Math.floor(indiceIni);

		this.indice = indiceIni;

		//velocidade random entre a minima e a maxima mais a minima
		this.velocidade = (Math.random() * MaxVelocidade) + MinVelocidade;
	}

	//to string, pode ser usado para debugging
	toString(){
		return 	"Asteroide: Coordenadas (" 	+ this.posicaoX 	+ "," 			+ this.posicaoY 	+ ")"
			+ 	" Width: " 					+ this.width 		+ " Heigth: " 	+ this.height
			+ 	" Velocidade -> " 			+ this.velocidade
			+ 	" Clickable: " 				+ this.clickable 	+ " Dragable: " + this.dragable
			+	" Direcao: " 				+ this.direcao;
	}
}