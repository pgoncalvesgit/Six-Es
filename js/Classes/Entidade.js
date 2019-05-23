"use strict";

class Entidade extends Componente{

	constructor(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes, rocketSpeed, imgsTiros, indiceTiro, cooldown){

		super(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes);

		
		//direcao
		this.boool = new Array(4);

		this.boool[0] = false;
		this.boool[1] = false;
		this.boool[2] = false;
		this.boool[3] = false;

		this.rocketSpeed 	     = rocketSpeed;
		this.cooldownRocketIni   = cooldown;
		this.cooldownRocketTotal = cooldown;
		this.cooldownRocketAtual = 0;

		this.numTiro   = indiceTiro;
		this.tiro      = imgsTiros[0];
		this.tiroBool  = false;
		this.tiroReady = true;
	}

	novoTiro(){
		//polimorfismo
	}

	//cria um novo tiro
	umTiro(posicaoX, posicaoY, width, height, nw, nh, angle, arrayRockets, body){
		var sp = new Projetil(posicaoX, posicaoY, width, height, nw, nh, this.rocketSpeed, false, false, true, this.tiro, 0, 1, angle);
		sp.pixels(body);
		arrayRockets.push(sp);
	}

	dispara(posicaoY, angle, arrayRockets, sons, body){
		var nw 	= this.tiro.naturalWidth;
		var nh 	= this.tiro.naturalHeight;

		var width  = 0.4*Math.floor(nw);   
		var height = 0.4*Math.floor(nh);

		var posicaoX = this.posicaoX + this.width/2 - width/2;

		//dependendo da evolucao do tiro, ele dispara de forma diferente
		switch(this.numTiro){
			case 0:
				this.umTiro(posicaoX, posicaoY, width, height, nw, nh, angle, arrayRockets, body);
				break;
			case 1:
				this.umTiro(posicaoX - this.width/4, posicaoY - this.width/2, width, height, nw, nh, angle, arrayRockets, body);
				this.umTiro(posicaoX + this.width/4, posicaoY - this.width/2, width, height, nw, nh, angle, arrayRockets, body);
				break;
			case 2:
				this.umTiro(posicaoX, posicaoY, width, height, nw, nh, angle - 30, arrayRockets, body);
				this.umTiro(posicaoX, posicaoY, width, height, nw, nh, angle, arrayRockets, body);
				this.umTiro(posicaoX, posicaoY, width, height, nw, nh, angle + 30, arrayRockets, body);
				break;
			case 3:
				this.umTiro(posicaoX, posicaoY, width, height, nw, nh, angle - 30, arrayRockets, body);
				this.umTiro(posicaoX - this.width/4, posicaoY - this.width/2, width, height, nw, nh, angle, arrayRockets, body);
				this.umTiro(posicaoX + this.width/4, posicaoY - this.width/2, width, height, nw, nh, angle, arrayRockets, body);
				this.umTiro(posicaoX, posicaoY, width, height, nw, nh, angle + 30, arrayRockets, body);
				break;
			case 4:
				this.umTiro(posicaoX, posicaoY, width, height, nw, nh, angle - 30, arrayRockets, body);
				this.umTiro(posicaoX - this.width/4, posicaoY - this.width/2, width, height, nw, nh, angle, arrayRockets, body);
				this.umTiro(posicaoX, posicaoY, width, height, nw, nh, angle, arrayRockets, body);
				this.umTiro(posicaoX + this.width/4, posicaoY - this.width/2, width, height, nw, nh, angle, arrayRockets, body);
				this.umTiro(posicaoX, posicaoY, width, height, nw, nh, angle + 30, arrayRockets, body);
				break;
			case 5:
				this.umTiro(posicaoX, posicaoY, width, height, nw, nh, angle - 30, arrayRockets, body);
				this.umTiro(posicaoX, posicaoY, width, height, nw, nh, angle - 15, arrayRockets, body);
				this.umTiro(posicaoX - this.width/4, posicaoY - this.width/2, width, height, nw, nh, angle, arrayRockets, body);
				this.umTiro(posicaoX, posicaoY, width, height, nw, nh, angle, arrayRockets, body);
				this.umTiro(posicaoX + this.width/4, posicaoY - this.width/2, width, height, nw, nh, angle, arrayRockets, body);
				this.umTiro(posicaoX, posicaoY, width, height, nw, nh, angle + 15, arrayRockets, body);
				this.umTiro(posicaoX, posicaoY, width, height, nw, nh, angle + 30, arrayRockets, body);
				break;
			case 6:break;
			default:break;
		}
		sons["tiros"][0].load();
		sons["tiros"][0].play().catch(function(){});

		//sons["tiros"][this.numTiro].load();
		//sons["tiros"][this.numTiro].play().catch(function(){});
	}

	//quando o cooldown atual for igual ao cooldown total, a entidade esta pronta para disparar
	tiros_cooldown(){
		if(this.cooldownRocketAtual >= this.cooldownRocketTotal){
			this.cooldownRocketAtual = 0;
			this.tiroReady = true;
		}
		else if(this.tiroReady == false){
			this.cooldownRocketAtual++;
		}
	}

	//carrega um novo tiro
	carregaTiro(img, indice){
		this.numTiro = indice;
		//this.tiro    = img[indice];
		this.tiro = img[0];
	}

	//evolui o tiro
	melhoraTiro(img){
		if (this.numTiro < 5){
			this.numTiro = this.numTiro + 1;
			//this.tiro = img[this.numTiro];
		}
	}


	//to string, pode ser usado para debugging
	toString(){
		return 	"Entidade: Coordenadas (" + this.posicaoX 	+ "," 			+ this.posicaoY 	+ ")"
			+ 	" Width: " 				+ this.width 		+ " Heigth: " 	+ this.height
			+ 	" Velocidade: " 		+ this.velocidade
			+ 	" Clickable: " 			+ this.clickable 	+ " Dragable: " + this.dragable;
	}
}