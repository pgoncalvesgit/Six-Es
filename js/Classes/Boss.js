"use strict";

class Boss extends Entidade{

	constructor(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes, rocketSpeed, imgsTiros, indiceTiro, cooldown){

		super(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes, rocketSpeed, imgsTiros, indiceTiro, cooldown);
		
		this.vidaTotal;
		this.vida;
		this.fases;
		this.faseAtual   = 0;
		//usamos o this.sinal para o movimento
		this.sinal 		 = 1;
		this.inicio      = 1;

		//o switch faz mudar a funcao de movimento e a de mudanca de fase conforme o id do boss
		switch(id){
			case 0:
				this.vidaTotal = 90;
				this.vida  = 90;
				this.fases = 3;
				this.segundo_mover = function(ctx){
					//var coordenadas = new Array(2);
					if(this.posicaoX <= 0){
						this.sinal = 1;
						this.velocidade = 10;
						this.cooldownRocketTotal = Math.floor(this.cooldownRocketIni/10);
					}
					else if(this.posicaoX >= ctx.canvas.width - this.width){
						this.sinal = -1;
						this.velocidade = 2;
						this.cooldownRocketTotal = this.cooldownRocketIni;
					}
					this.posicaoX = this.posicaoX + this.sinal * this.velocidade;
				}
				this.mudanca_fase = function(){
					switch(this.faseAtual){
						case 0: this.numTiro  = 2;this.cooldownRocketTotal = 30;break;
						case 1: this.numTiro  = 4;this.cooldownRocketTotal = 20;break;
						default: this.numTiro = 0;break;
					}
					this.faseAtual++;
				}
				break;
			case 1:
				this.vidaTotal = 120;
				this.vida  = 120;
				this.fases = 3;
				this.segundo_mover = function(ctx){
					//var coordenadas = new Array(2);
					switch(this.sinal){
						case 0:
							if(this.posicaoY <= 0){
								this.sinal = 1;
								this.velocidade = 4;
							}
							else{
								this.posicaoY = this.posicaoY - this.velocidade;
							}
							break;
						case 1:
							if(this.posicaoX <= 0){
								this.sinal = 2;
								this.velocidade = 6;
							}
							else{
								this.posicaoX = this.posicaoX - this.velocidade;
							}
							break;
						case 2:
							if(this.posicaoY >= ctx.canvas.height/2 - this.height){
								this.sinal = 3;
								this.velocidade = 10;
							}
							else{
								this.posicaoY = this.posicaoY + this.velocidade;
							}
							break;
						case 3:
							if(this.posicaoX >= ctx.canvas.width - this.width){
								this.sinal = 0;
								this.velocidade = 15;
							}
							else{
								this.posicaoX = this.posicaoX + this.velocidade;
							}
							break;
						default:
							this.sinal = 0;
							break;
					}
				}
				
				this.mudanca_fase = function(){
					switch(this.faseAtual){
						case 0: this.numTiro  = 2;break;
						case 1: this.numTiro  = 4;break;
						default: this.numTiro = 0;
					}
					this.faseAtual++;
				}
				break;
				break;
			default:
				this.fases = 3;
				this.segundo_mover = function(ctx){
					//var coordenadas = new Array(2);
					if(this.posicaoX <= 0){
						this.sinal = 1;
						this.velocidade = 2;
						this.cooldownRocketTotal = Math.floor(this.cooldownRocketIni/10);
					}
					else if(this.posicaoX >= ctx.canvas.width - this.width){
						this.sinal = -1;
						this.velocidade = 0.15;
						this.cooldownRocketTotal = this.cooldownRocketIni;
					}
					this.posicaoX = this.posicaoX + this.sinal * this.velocidade;
				}
				this.mudanca_fase = function(){
					switch(this.faseAtual){
						case 0: this.numTiro  = 2;break;
						case 1: this.numTiro  = 4;break;
						default: this.numTiro = 0;
					}
					this.faseAtual++;
				}
				break;
				break;
		}
	}

	//verifica se esta no inicio, decidindo que funcao de movimento chama
	//move-se uma vez por cada iteracao do render
	mover(ctx, t){
		if(this.inicio == 1){
			this.primeiro_mover();
		}
		else{
			this.segundo_mover(ctx);
		}
	}
	
	//movimento antes de o boss estar totalmente no ecra
	primeiro_mover(){
		this.posicaoY = this.posicaoY + this.velocidade;
		if (this.posicaoY > 0){
			this.velocidade = 4;
			this.inicio = 0;
		}
	}

	//segundo movimento, abstrato, defenido no construtor
	segundo_mover(ctx){
		console.log("teste segundo_mover");
	}

	//mudaca de fase, abstrata, defenida no construtor
	mudanca_fase(){
		console.log("teste mudanca_fase");
	}

	//cria um novo tiro (dispara)
	novoTiro(ctx, sons, body, tirosInimigos){
		var posicaoY;
		var velocidade;
		
		this.tiroReady = false;

		posicaoY = this.posicaoY + 3*this.width/4;

		this.dispara(posicaoY, 270, tirosInimigos, sons, body);
	}

	//quando e atingido, verifica se tem de mudar de fase
	atingido(){
		this.vida = this.vida - 1;
		//se tiver mais que uma fase e uma vida maior que 0
		if(this.fases > 1 && this.vida > 0){
			//dividmos a vida total pelo numero de fases
			//para saber de quanto em quanto se tem de mudar de fase.
			//Quando for multiplo, tem que mudar de fase
			if(this.vida % Math.ceil(this.vidaTotal / this.fases) == 0){
				this.mudanca_fase();
			}
		}
	}

	//to string, pode ser usado para debugging
	toString(){
		return 	"Boss: Coordenadas (" 	+ this.posicaoX 	+ "," 			+ this.posicaoY 	+ ")"
			+ 	" Width: " 				+ this.width 		+ " Heigth: " 	+ this.height
			+ 	" Velocidade -> " 		+ this.velocidade
			+ 	" Clickable: " 			+ this.clickable 	+ " Dragable: " + this.dragable;
	}
}