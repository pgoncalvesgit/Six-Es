"use strict";

class Inimigo extends Entidade{

	constructor(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes, rocketSpeed, imgsTiros, indiceTiro, cooldown, indicePowerup){

		super(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes, rocketSpeed, imgsTiros, indiceTiro, cooldown);

		this.melhorX = 0;
		this.melhorY = 0;

		this.melhor_indice_X = 0;
		this.melhor_indice_Y = 0;

		this.velocidade_X_antiga = 0;
		this.velocidade_Y_antiga = 0;

		this.rockets;
		this.indicePowerup = indicePowerup;

	}

	//se a nave tiver um powerup associado, cria-o
	spawnPowerup(powerups, body, imgsPowerups, tempoAtual){
		if(this.indicePowerup != "n"){
			var xPowerup = this.posicaoX + this.width/2;
			var yPowerup = this.posicaoY + this.height/2;
			var img    = imgsPowerups[this.indicePowerup];
			var nw     = img.naturalWidth;
			var nh     = img.naturalHeight;

			var velocidade = Math.floor(Math.random() * 2 + 1);
			var direcao    = Math.random() * 360;

			var width  = nw;
			var height = nh;

			var powerup = new Powerup(xPowerup, yPowerup, width, height, nw, nh, velocidade, false, false, false, img, this.indicePowerup, 1, direcao, tempoAtual);

			powerup.pixels(body);

			powerup.indice = 0;
			powerups.push(powerup);
		}
	}

	//cria um novo tipo
	novoTiro(ctx, sons, body, tirosInimigos){
		var posicaoY;
		var velocidade;
		
		this.tiroReady = false;

		posicaoY = this.posicaoY + 3*this.width/4;

		this.dispara(posicaoY, 270, tirosInimigos, sons, body);

	}

	//move-se uma vez por iteração do render, na direção do quadrado da canvas melhor, calculado pela AI
	mover(){
		var diferenca_X = this.melhorX - this.posicaoX;
		var diferenca_Y = this.melhorY - this.posicaoY;

		var angulo = Math.atan2(diferenca_Y, diferenca_X);

		var velocidade_X = Math.cos(angulo) * this.velocidade * 0.03 + this.velocidade_X_antiga * 0.97;
		var velocidade_Y = Math.sin(angulo) * this.velocidade * 0.03 + this.velocidade_Y_antiga * 0.97;

		this.velocidade_X_antiga = velocidade_X;
		this.velocidade_Y_antiga = velocidade_Y;

		this.posicaoX = this.posicaoX + velocidade_X;
		this.posicaoY = this.posicaoY + velocidade_Y;
	}

	//AI do inimigo, divide a canvas em retangulos e verifica qual o melhor quadrado para se deslocar
	melhor_posicao(ctx, inimigos, nave, asteroides){
		var width  = ctx.canvas.width;
		var height = ctx.canvas.height;

		//divide verticalmente e horizontalmente a canvas
		var divisao_vertical   = 10;
		var divisao_horizontal = 10;

		//cria 3 arrays com as divisoes acima especificadas, colocando todos os valores a 1
		var pref_inimigos = new Array(divisao_vertical);
		for(let i = 0; i < divisao_vertical; i++){
			pref_inimigos[i] = new Array(divisao_horizontal);
			for(let k = 0; k < divisao_horizontal; k++){
				pref_inimigos[i][k] = 1;
			}
		}

		var pref_asteroides = new Array(divisao_vertical);
		for(let i = 0; i < divisao_vertical; i++){
			pref_asteroides[i] = new Array(divisao_horizontal);
			for(let k = 0; k < divisao_horizontal; k++){
				pref_asteroides[i][k] = 1;
			}
		}

		var pref_final = new Array(divisao_vertical);
		for(let i = 0; i < divisao_vertical; i++){
			pref_final[i] = new Array(divisao_horizontal);
			for(let k = 0; k < divisao_horizontal; k++){
				pref_final[i][k] = 1;
			}
		}


		var pedaco_width  = width/divisao_horizontal;
		var pedaco_height = height/divisao_vertical;


		//Reduz a preferência pelas margens
		for(let i = 0; i < divisao_vertical; i++){
			for(let k = 0; k < divisao_horizontal; k++){
				if(i > 0 || k > 0 || i < divisao_vertical - 1 || k < divisao_horizontal - 1){
					pref_final[i][k] = 0.5 * pref_final[i][k];
				}
			}
		}

		//faz uma atenuação, misturando os valores com base no quadrado em cima, baixo, esquerda e direita
		for(let i = 0; i < divisao_vertical; i++){
			for(let k = 0; k < divisao_horizontal; k++){
				var pref_cima     = -1;
				var pref_direita  = -1;
				var pref_esquerda = -1;
				var pref_baixo    = -1;

				
			}
		}


		//Com base onde os inimigos estao e onde querem ir, altera a preferência pelos retangulos, de modo a preferirem estar afastados
		for(let i = 0; i < inimigos[0].length; i++){
			var indice_altura  = Math.floor(inimigos[0][i].posicaoY/pedaco_height);
			var indice_largura = Math.floor(inimigos[0][i].posicaoX/pedaco_width);

			pref_inimigos[inimigos[0][i].melhor_indice_Y][inimigos[0][i].melhor_indice_X] = 0;

			if(indice_largura >= 0 && indice_largura < divisao_horizontal && indice_altura >= 0 && indice_altura < divisao_vertical){
				pref_inimigos[indice_altura][indice_largura] = 0.15 * pref_inimigos[indice_altura][indice_largura];
			}
		}

		//faz uma atenuação, misturando os valores com base no quadrado em cima, baixo, esquerda e direita tanto do pref_final, como do pref_inimigos
		for(let i = 0; i < divisao_vertical; i++){
			for(let k = 0; k < divisao_horizontal; k++){
				//faz para o pref_inimigos
				//coloca a -1 porque as margens nao podem verificar os valores que nao existem 
				//e assim tambem afasta os inimigos das margens
				var pref_cima     = -1;
				var pref_direita  = -1;
				var pref_esquerda = -1;
				var pref_baixo    = -1;

				if(i > 0){
					pref_cima  = pref_inimigos[i - 1][k];
				}
				if(i < divisao_vertical - 1){
					pref_baixo = pref_inimigos[i + 1][k];
				}

				if(k > 0){
					pref_esquerda = pref_inimigos[i][k - 1];
				}
				if(k < divisao_horizontal - 1){
					pref_direita = pref_inimigos[i][k + 1];
				}

				pref_inimigos[i][k] = 0.25 * pref_inimigos[i][k] + 0.75 * (0.25 * pref_cima + 0.25 * pref_direita + 0.25 * pref_baixo + 0.25 * pref_esquerda);
				


				//faz para o pref_final
				//coloca a -1 porque as margens nao podem verificar os valores que nao existem
				//e assim tambem afasta os inimigos das margens
				pref_cima     = -1;
				pref_direita  = -1;
				pref_esquerda = -1;
				pref_baixo    = -1;
				
				if(i > 0){
					pref_cima  = pref_final[i - 1][k];
				}
				if(i < divisao_vertical - 1){
					pref_baixo = pref_final[i + 1][k];
				}

				if(k > 0){
					pref_esquerda = pref_final[i][k - 1];
				}
				if(k < divisao_horizontal - 1){
					pref_direita = pref_final[i][k + 1];
				}

				pref_final[i][k] = 0.5 * pref_final[i][k] + 0.5 * (0.25 * pref_cima + 0.25 * pref_direita + 0.25 * pref_baixo + 0.25 * pref_esquerda);


			}
		}


		//Com base onde os asteroides estao, altera a preferência pelos retangulos, de modo a preferirem estar afastados dos mesmos
		for(let i = 0; i < asteroides.length; i++){
			var indice_altura  = Math.floor(asteroides[i].posicaoY/pedaco_height);
			var indice_largura = Math.floor(asteroides[i].posicaoX/pedaco_width);

			if(indice_largura >= 0 && indice_largura < divisao_horizontal && indice_altura >= 0 && indice_altura < divisao_vertical){
				pref_asteroides[indice_altura][indice_largura] = pref_asteroides[indice_altura][indice_largura] - 1;
			}
		}


		//Une todas as matrizes já tratadas
		for(let i = 0; i < divisao_vertical; i++){
			for(let k = 0; k < divisao_horizontal; k++){
				pref_final[i][k] = pref_final[i][k] * pref_inimigos[i][k] * pref_asteroides[i][k];
			}
		}


		//Com base on a nave está, estabelece uma preferencia pelos retangulos acima e perto da mesma
		//o for vai até ao retangulo da canvas onde esta a nave
		for(let i = 0; i < Math.floor(nave.posicaoY/pedaco_height); i++){
			for(let k = 0; k < divisao_horizontal; k++){
				if((k < Math.floor(nave.posicaoX/pedaco_width)  + Math.floor(divisao_horizontal/3) &&
				   k > Math.floor(nave.posicaoX/pedaco_width)  - Math.floor(divisao_horizontal/3)  &&
				   i < Math.floor(nave.posicaoY/pedaco_height) - Math.floor(divisao_vertical/3)    &&
				   Math.floor(nave.posicaoX/pedaco_width)  != 0)                                   ||
				   (Math.floor(nave.posicaoX/pedaco_width)  == 0 && k == 0)                        ||
				   (Math.floor(nave.posicaoX/pedaco_width)  == divisao_horizontal - 2 && k == divisao_horizontal - 2)){
				   pref_final[i][k] = pref_final[i][k] + 4;
				}
				else if(k < Math.floor(nave.posicaoX/pedaco_width)  + Math.floor(divisao_horizontal/5)  &&
					 	k > Math.floor(nave.posicaoX/pedaco_width)  - Math.floor(divisao_horizontal/5)  &&
				   		i < Math.floor(nave.posicaoY/pedaco_height) - Math.floor(divisao_vertical/3)){
					pref_final[i][k] = pref_final[i][k] + 2;
				}
			}
		}

		//Com base on a nave está, estabelece uma aversão pelos retangulos em baixo da mesma
		//Para alem disso, caso a nave esteja perto da margem esquerda, aumenta a preferncia por esses retangulos
		//o for vai do retangulo da canvas onde esta a nave ate ao fim da canvas
		for(let i = Math.floor(nave.posicaoY/pedaco_height); i < divisao_vertical; i++){
			for(let k = 0; k < divisao_horizontal; k++){
				if((Math.floor(nave.posicaoY/pedaco_height) == 0 && i == 0) ||
				   (Math.floor(nave.posicaoX/pedaco_width)  == 0 && k == 0)){
				   pref_final[i][k] = pref_final[i][k] + 4;
				}
				if(k < Math.floor(nave.posicaoX/pedaco_width)  - Math.floor(divisao_horizontal/3)  ||
				   k > Math.floor(nave.posicaoX/pedaco_width)  + Math.floor(divisao_horizontal/3) ||
				   i > Math.floor(nave.posicaoY/pedaco_height) - Math.floor(divisao_vertical/3)){
					pref_final[i][k] = pref_final[i][k] - 1;
				}
				else if(k < Math.floor(nave.posicaoX/pedaco_width)   - Math.floor(divisao_horizontal/5)  ||
					 	k > Math.floor(nave.posicaoX/pedaco_width)  + Math.floor(divisao_horizontal/5)){
					pref_final[i][k] = pref_final[i][k] - 0.25;
				}
			}
		}

		//verifica onde este inimigo esta no momento
		var i_atual = Math.floor(this.posicaoY/pedaco_height);
		var k_atual = Math.floor(this.posicaoX/pedaco_width);

		if(i_atual < 0){
			i_atual = 0;
		}
		else if(i_atual >= divisao_vertical){
			i_atual = divisao_vertical - 1;
		}

		if(k_atual < 0){
			k_atual = 0;
		}
		else if(k_atual >= divisao_horizontal){
			k_atual = divisao_horizontal - 1;
		}

		//verifica qual o retangulo de preferencia e, em caso de empate, escolhe o mais perto
		for(let i = 0; i < divisao_vertical; i++){
			for(let k = 0; k < divisao_horizontal; k++){
				if(pref_final[i][k] >  pref_final[this.melhor_indice_Y][this.melhor_indice_X] ||
				  (pref_final[i][k] == pref_final[this.melhor_indice_Y][this.melhor_indice_X] &&
				  (Math.sqrt(Math.pow(i - i_atual, 2) + Math.pow(k - k_atual, 2))  <   Math.sqrt(Math.pow(i - this.melhor_indice_Y, 2) + Math.pow(k - this.melhor_indice_X, 2))))){
					this.melhor_indice_Y = i;
					this.melhor_indice_X = k;
				}
			}
		}

		//altera o valor do melhor retangulo (preferido), para onde ele ira se deslocar
		this.melhorX = this.melhor_indice_X * pedaco_width  + pedaco_width/2;
		this.melhorY = this.melhor_indice_Y * pedaco_height + pedaco_height/2;
	}

	//to string, pode ser usado para debugging	
	toString(){
		return 	"Inimigo: Coordenadas (" 	+ this.posicaoX 	+ "," 			+ this.posicaoY 	+ ")"
			+ 	" Width: " 					+ this.width 		+ " Heigth: " 	+ this.height
			+ 	" Velocidade -> " 			+ this.velocidade
			+ 	" Clickable: " 				+ this.clickable 	+ " Dragable: " + this.dragable;
	}
}