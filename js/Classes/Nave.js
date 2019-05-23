"use strict";

class Nave extends Entidade{

	constructor(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes, rocketSpeed, imgsTiros, indiceTiro, cooldown, vida){

		super(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes, rocketSpeed, imgsTiros, indiceTiro, cooldown);
		
		this.rockets   = new Array();
		this.vida      = vida;
		this.pontos    = 0;
		this.pisca     = 0;

		this.tempoAtingido;
		this.tempoAumentou;
		this.tempoDiminuiu;
		this.tempoEscudo;

		this.aumentado = 0;
		this.diminuido = 0;
		//dependendo do id, a nave terá caracteristicas diferentes
		switch(id){
			case 0: break;
			case 1:
				this.vida       = 2;
				this.velocidade = this.velocidade + 6;
				break;
			case 2:
				this.vida       = 5;
				this.velocidade = this.velocidade - 2;
				break;
			case 3:
				this.vida       = 2;
				this.cooldownRocketIni   = this.cooldownRocketIni - 15;
				this.cooldownRocketTotal = this.cooldownRocketIni;
				break;
			case 4: 
				this.velocidade = this.velocidade + 3;
				this.cooldownRocketIni   = this.cooldownRocketIni - 8;
				this.cooldownRocketTotal = this.cooldownRocketIni;
			default: break;
		}

	}

	//cria um novo tiro
	novoTiro(ctx, sons, body){
		var posicaoY;
		var velocidade;

		this.tiroReady = false;

		posicaoY = this.posicaoY;

		this.dispara(posicaoY, 90, this.rockets, sons, body);

	}

	//usado para mover em cada iteracao do render, usa os booleanos para verificar que teclas foram clicadas
	//de modo a saber que direcao tem de se movimentar
	mover(ctx){
		if(this.boool[0]){
			if(this.posicaoX - this.velocidade > 0) {
				this.posicaoX -= this.velocidade;
			}
			else if(this.posicaoX > 0){
				this.posicaoX = 0;
			}
		}
		if(this.boool[1]){
			if(this.posicaoX + this.width + this.velocidade < ctx.canvas.width) {
				this.posicaoX += this.velocidade;
			}
			else if(this.posicaoX + this.width < ctx.canvas.width){
				this.posicaoX = ctx.canvas.width - this.width;
			}
		}
		if(this.boool[2]){
			if(this.posicaoY - this.velocidade > 0) {
				this.posicaoY -= this.velocidade;
			}
			else if(this.posicaoY > 0){
				this.posicaoY = 0;
			}
		}
		if(this.boool[3]){
			if(this.posicaoY + this.height + this.velocidade < ctx.canvas.height) {
				this.posicaoY += this.velocidade;
			}
			else if(this.posicaoY + this.height < ctx.canvas.height){
				this.posicaoY = ctx.canvas.height - this.height;
			}
		}
	}

	//coloca os booleanos todos a 0 parando a nave
	parou(){
		for(let i = 0; i < 4; i++){
			this.boool[i] = false;
		}
		this.tiroBool = false;
	}

	//desenha a nave, piscando-a caso esta tenha perdido vida recentemente
	//redefine a funcao draw da classe componente (polimorfismo)
	draw(ctx, body, tempoAtual){
		if((this.aumentado == 1 && tempoAtual - this.tempoAumentou > 15000) ||
		   (this.diminuido == 1 && tempoAtual - this.tempoDiminuiu > 15000)){
			this.normal(body);
		}

		if (this.extras[0].ativo == 1 && tempoAtual - this.tempoEscudo > 20000){
			this.extras[0].ativo = 0;
		}

		if (this.pisca == 0 || (this.pisca == 1 && tempoAtual % 200 > 100)){
			this.drawUmaRotacao(ctx);
			if(this.indice >= this.quantidadeframes - 1){
				this.indice = 0;
			}

			if(this.pisca == 1 && tempoAtual - this.tempoAtingido >= 3000){
				this.pisca = 0;
			}
		}
	}

	//desenha o esculo caso o tenha, e pisca-o caso faltem menos de 5 segundos para o perder
	drawEscudo(ctx, tempoAtual){
		if((this.extras[0].ativo == 1 && tempoAtual - this.tempoEscudo < 15000) ||
		   (this.extras[0].ativo == 1 && tempoAtual - this.tempoEscudo < 20000 && tempoAtual % 200 > 100)){
			this.extras[0].draw(ctx);
		}
		else if(this.extras[0].ativo == 1 && tempoAtual - this.tempoEscudo >= 20000){
			this.extras[0].ativo = 0;
		}
	}

	//caso a nave seja antingida, se nao estiver invulneravel (a piscar), verifica
	//se possui um escudo, perdendo-o em caso afirmativo, ou perdendo vida no caso contrario
	//ficando invulnerável (a piscar), independentemente de o ter ou nao
	atingido(tempoAtual){
		if(this.pisca == 0){
			if(this.extras[0].ativo == 1){
				this.extras[0].ativo = 0;
			}
			else{
				this.vida--;
			}
			this.tempoAtingido = tempoAtual;
			this.pisca        = 1;
		}
	}

	//Carrega todos os extras
	carregaOutros(imgOutros, body){
		for(let i = 0; i < imgOutros.length; i++){
			this.carregaExtra(imgOutros[i], body, 0);
		}
	}

	//ativa o powerup/extra do escudo
	ativaEscudo(tempoAtual){
		this.extras[0].ativo = 1;
		this.tempoEscudo     = tempoAtual;
	}

	//a nave altera o seu tamanho
	alteraTamanho(body, ratio){
		this.width  = this.widthIni  * ratio;
		this.height = this.heightIni * ratio;

		this.pixels(body);

		for(let i = 0; i < this.extras.length; i++){
			this.extras[i].width  = this.extras[i].widthIni  * ratio;
			this.extras[i].height = this.extras[i].heightIni * ratio;
			
			this.extras[i].pixels(body);
		}
	}

	//a nave aumenta o seu tamanho para o dobro
	aumenta(body, tempoAtual){
		
		this.diminuido = 0;
		this.aumentado = 1;
		this.tempoAumentou = tempoAtual;

		this.alteraTamanho(body, 2);
	}

	//a nave diminui o seu tamanho para metade
	diminui(body, tempoAtual){

		this.diminuido = 1;
		this.aumentado = 0;
		this.tempoDiminuiu = tempoAtual;
		
		this.alteraTamanho(body, 0.5);
	}

	//a nave volta ao normal
	normal(body){

		this.aumentado = 0;
		this.diminuido = 0;

		this.alteraTamanho(body, 1);
	}

	//soma pontos dependendo do modo de Jogo
	somaPontos(quantidade, modoDeJogo, tempoAtual, tempoInicial){
		switch(modoDeJogo){
			case 1 : this.pontos += Math.floor(quantidade * (1/Math.log(tempoAtual - tempoInicial + 2) + 1));break;
			case 2 : this.pontos += Math.floor(quantidade * (tempoAtual - tempoInicial) / 1000);break;
			default: this.pontos += quantidade; break;
		}
	}

	//to string, pode ser usado para debugging
	toString(){
		return 	"Nave: Coordenadas (" 	+ this.posicaoX 	+ "," 			+ this.posicaoY 	+ ")"
			+ 	" Width: " 				+ this.width 		+ " Heigth: " 	+ this.height
			+ 	" Velocidade -> " 		+ this.velocidade
			+ 	" Clickable: " 			+ this.clickable 	+ " Dragable: " + this.dragable;
	}
}