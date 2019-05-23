"use strict";


//main campanha, para os niveis da campanha
function main_campanha(auxMisc, menus, botoes, imgs, sons, musicas, body, nivel, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux){
	var canvas 	   	= document.getElementById("canvas");
	var ctx 		= canvas.getContext("2d");
	var naveIndice  = auxMisc["naveAtual"];

	var nave;
	var asteroides;
	var explosoes;

	// max e min velocidade dos asteroides
	var maxVelocidade = 6, minVelocidade = 3; 

	ctx.fillStyle = "red";
	ctx.font = "normal 30px Arial";

	function initEnd(ev){
		ctx.canvas.removeEventListener("initEnd", initEnd);
		nave       = ev.nave;
		asteroides = ev.asteroides;
		//explosoes  = ev.explosoes;
		//faz load do nivel lendo um ficheiro xml
		loadNivel(ctx, body, nivel, auxMisc, menus, botoes, imgs, sons, musicas, nave, asteroides, maxVelocidade, minVelocidade, 0, "fillText","fillText","fillText", auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux);
	}

	var evInitEnd 	  = new Event("initEnd");
	ctx.canvas.addEventListener("initEnd", initEnd);
	// carrega o jogador (nave)
	initPlayer(ctx, naveIndice, 0.3, false, false, true, ctx.canvas.width/2, ctx.canvas.height/2, 5, body, 7, 25, imgs, nivel - 1, evInitEnd);
	// carrega os asteroides e da dispatch do evento initEnd
	initAsteroides(ctx, 20, 0.6, 0.3, maxVelocidade, minVelocidade, body, false, "asteroides", imgs, 32, evInitEnd);
}

//main speedrun, para o speedrun
function main_speedrun(auxMisc, menus, botoes, imgs, sons, musicas, body, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux){
	var canvas 	   	= document.getElementById("canvas");
	var ctx 		= canvas.getContext("2d");
	var naveIndice  = auxMisc["naveAtual"];
	var pontos      = 0;
	var nivel       = 0;
	var ganhou;
	var nave;
	var asteroides;
	var explosoes;

	// max e min velocidade dos asteroides
	var maxVelocidade = 6, minVelocidade = 3; 

	ctx.fillStyle = "red";
	ctx.font = "normal 30px Arial";

	function comecaNivel(ev){
		ctx.canvas.removeEventListener("evNivel", comecaNivel);

		nave        = ev.nave;
		asteroides  = ev.asteroides;
		//explosoes = ev.explosoes;
		
		nave.pontos = pontos;
		if(nivel + 1 < 3){
			ctx.canvas.addEventListener("evIniNivel", iniciaNivel);
			loadNivel(ctx, body, nivel + 1, auxMisc, menus, botoes, imgs, sons, musicas, nave, asteroides, maxVelocidade, minVelocidade, 1, evIniNivel, iniciaNivel, "evIniNivel", auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux);
		}
		else{
			//quando for o ultimo nivel, o evento a adicionar é para acabar
			ctx.canvas.addEventListener("evAcabou", acabou);
			loadNivel(ctx, body, nivel + 1, auxMisc, menus, botoes, imgs, sons, musicas, nave, asteroides, maxVelocidade, minVelocidade, 1, evAcabou, acabou, "evAcabou", auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux);
		}
		nivel++;
	}

	function iniciaNivel(ev){
		ctx.canvas.removeEventListener("evIniNivel", iniciaNivel);
		ctx.canvas.addEventListener("evNivel", comecaNivel);

		pontos = nave.pontos;

		initPlayer(ctx, naveIndice, 0.3, false, false, true, ctx.canvas.width/2, ctx.canvas.height/2, 5, body, 7, 25, imgs, nivel, evNivel);
		initAsteroides(ctx, 20, 0.6, 0.3, maxVelocidade, minVelocidade, body, false, "asteroides", imgs, 32, evNivel);
	}
	

	function acabou(ev){
		ctx.canvas.removeEventListener("evAcabou", acabou);
		atualizaCoockiesCampanha(auxMisc, botoes, nave.pontos);

		listeners_do_menu(auxMisc, menus, botoes, imgs, sons, musicas, body, domNaves(menus), domAux);
		menu_principal(menus, auxMisc, musicas, body);
	}

	//cria 3 eventos, um para cada caso
	//evNivel para dar load a um novo nivel
	var evNivel 	= new Event("evNivel");
	//evIniNivel para iniciar um novo nivel
	var evIniNivel 	= new Event("evIniNivel");
	//evAcabou para quando acaba o speedrun
	var evAcabou 	= new Event("evAcabou");

	ctx.canvas.addEventListener("evNivel", comecaNivel);
	// carrega o jogador (nave)
	initPlayer(ctx, naveIndice, 0.3, false, false, true, ctx.canvas.width/2, ctx.canvas.height/2, 5, body, 7, 25, imgs, nivel, evNivel);
	// carrega os asteroides e da dispatch do evento initEnd
	initAsteroides(ctx, 20, 0.6, 0.3, maxVelocidade, minVelocidade, body, false, "asteroides", imgs, 32, evNivel);

}

//main infinito, para o infinito
function main_infinito(auxMisc, menus, botoes, imgs, sons, musicas, body, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux){
	var canvas 	   	= document.getElementById("canvas");
	var ctx 		= canvas.getContext("2d"); 
	var naveIndice  = auxMisc["naveAtual"];

	var nave;
	var asteroides;
	var explosoes;

	// max e min velocidade dos asteroides
	var maxVelocidade = 6, minVelocidade = 3; 

	ctx.fillStyle = "red";
	ctx.font = "normal 30px Arial";

	function initEnd(ev){
		ctx.canvas.removeEventListener("initEnd", initEnd);
		nave       = ev.nave;
		asteroides = ev.asteroides;
		//explosoes  = ev.explosoes;

		nave.pontos = 0;
		loadInfinito(ctx, body, auxMisc, menus, botoes, imgs, sons, musicas, nave, asteroides, maxVelocidade, minVelocidade, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux);
	}

	//evInitEnd, evento para quando acaba de inicializar as sprite images
	var evInitEnd 	  = new Event("initEnd");
	// carrega Nave em spriteImage
	ctx.canvas.addEventListener("initEnd", initEnd);
	// carrega o jogador (nave)
	initPlayer(ctx, naveIndice, 0.3, false, false, true, ctx.canvas.width/2, ctx.canvas.height/2, 5, body, 7, 25, imgs, 0, evInitEnd);
	// carrega os asteroides e da dispatch do evento initEnd
	initAsteroides(ctx, 20, 0.6, 0.3, maxVelocidade, minVelocidade, body, false, "asteroides", imgs, 32, evInitEnd);
}



//initPlayer: Carrega a nave
function initPlayer(ctx, naveIndice, indiceTam, dragable, clickable, movivel, xIni, yIni, velocidade, body, rocketspeed, cooldown, imgs, tiroIndice, evInitEnd){

	var width, height;
	var posicaoX, posicaoY;
	var imgNave   = imgs["nave"][naveIndice];
	var imgTiros  = imgs["tiros"];
	var imgOutros = imgs["outros"];

	//se a natural width for 2 vezes maior que a natural height, consideramos que é uma sprite sheet e descobrimos a quantidade de frames da imagem
	if(imgNave.naturalWidth > 2 * imgNave.naturalHeight){
		var nw = imgNave.naturalHeight;
		var nh = imgNave.naturalHeight;

		var quantidadeframes = imgNave.naturalWidth/imgNave.naturalHeight;
	}
	else{
		var nw 		  = imgNave.naturalWidth;
		var nh 		  = imgNave.naturalHeight;

		var quantidadeframes = 1;
	}


	width  = indiceTam  * Math.floor(nw);   
	height = indiceTam  * Math.floor(nh);

	posicaoX = xIni - width/2; 
	posicaoY = yIni - height/4;	

	var nave = new Nave(posicaoX, posicaoY, width, height, nw, nh, velocidade, clickable, dragable , movivel , imgNave, naveIndice, quantidadeframes, rocketspeed, imgTiros, tiroIndice, cooldown, 3);

	nave.pixels(body);

	//carrega extras da nave (neste caso só o escudo)
	nave.carregaOutros(imgOutros, body);

	evInitEnd.nave = nave;
}

//inicializa os asteroides
function initAsteroides(ctx, quantidade, maxTam, minTam, maxVelocidade, minVelocidade, body , clickable , id, imgs, quantidadeframes, ev){

	var img = imgs["asteroides"][0];
	var nw  = img.naturalWidth;
	var nh  = img.naturalHeight;
	nw = nw/quantidadeframes;

	var asteroides 	= new Array(quantidade);

	for(let j = 0; j < quantidade; j++){

		var tamanho = Math.random() * maxTam + minTam;
		var width 	= tamanho * Math.floor(nw);
		var height 	= tamanho * Math.floor(nh);

		var sp = new Asteroide(0, 0, width, height, nw, nh, 0, clickable, false, true, img, 0, quantidadeframes);

		sp.atualizaAsteroide(maxVelocidade, minVelocidade);

		sp.pixels(body);


		asteroides[j] = sp;
	}

	ev.asteroides = asteroides;
	//da dispatch do evento
	ctx.canvas.dispatchEvent(ev);
}

//da load do xml do nivel correspondente
function loadNivel(ctx, body, nivel, auxMisc, menus, botoes, imgs, sons, musicas, nave, asteroides, maxVelocidade, minVelocidade, modoDeJogo, evento, listener, nomeDoEvento, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux){
	
	function acabouOCarregamento(ev){
		ctx.canvas.removeEventListener("acabouOCarregamento", acabouOCarregamento);

		var nave       = ev.nave;
		var asteroides = ev.asteroides;
		var inimigos   = ev.inimigos;
		var boss  	   = ev.boss;
		//explosoes    = ev.explosoes;

		jogar(ctx, body, auxMisc, menus, botoes, imgs, sons, musicas, nave, asteroides, inimigos, boss, maxVelocidade, minVelocidade, nivel, modoDeJogo, evento, listener, nomeDoEvento, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux);
	}

	ctx.canvas.addEventListener("acabouOCarregamento", acabouOCarregamento);

	var entidadesInimigas = new Array(1);
	entidadesInimigas[0] = null;

	var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "niveis/campanha/nivel_" + nivel + ".txt", true);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                leXml(rawFile, entidadesInimigas, imgs);

            	if(entidadesInimigas[0] == null || entidadesInimigas[0].length == 0 || entidadesInimigas.length > 2){
					console.log("Problema ao ler XML");
					listeners_do_menu(auxMisc, menus, botoes, imgs, sons, musicas, body, domNaves(menus), domAux);
					menu_principal(menus, auxMisc, musicas, body);
				}
				else{
					var imgInimigos = imgs["inimigos"];
					var imgBoss     = imgs["boss"];
					var imgTiros    = imgs["tirosInimigos"];

					var inimigos = new Array();
					var boss 	 = new Array();

					for(let i = 0; i < entidadesInimigas[0].length; i++){
						var array_aux = new Array();
						for (let j = 0; j < entidadesInimigas[0][i].length; j++){
							var indiceInimigo = entidadesInimigas[0][i][j][0];
							var escala        = entidadesInimigas[0][i][j][1];
							var total         = entidadesInimigas[0][i].length;
							var indiceTiro    = entidadesInimigas[0][i][j][2];
							var indicePowerup = entidadesInimigas[0][i][j][3];

							array_aux.push(geraInimigo(ctx, body, imgInimigos, imgTiros, indiceInimigo, indiceTiro, escala, 5, 6, 30, j, total, indicePowerup));
						}
						inimigos.push(array_aux);
					}


					if(entidadesInimigas.length == 2){
						var nw  = imgBoss[entidadesInimigas[1][0]].naturalWidth;
						var nh  = imgBoss[entidadesInimigas[1][0]].naturalHeight;

						var width 	= nw * entidadesInimigas[1][1];
						var height 	= nh * entidadesInimigas[1][1];;

						var sp = new Boss(ctx.canvas.width/2 - width/2, -height, width, height, nw, nh, 0.5, false, false, true, imgBoss[entidadesInimigas[1][0]], entidadesInimigas[1][0], 1, 8, imgTiros, 0, 40);

						sp.pixels(body);

						boss.push(sp);
					}
					var evAcabouOCarregamento 	  	 = new Event("acabouOCarregamento");
					evAcabouOCarregamento.asteroides = asteroides;
					evAcabouOCarregamento.nave 	     = nave;
					evAcabouOCarregamento.inimigos 	 = inimigos;
					evAcabouOCarregamento.boss 	     = boss;
					ctx.canvas.dispatchEvent(evAcabouOCarregamento);
				}
            }
        }
    }
    rawFile.send(null);
}

//load do modo infinito
function loadInfinito(ctx, body, auxMisc, menus, botoes, imgs, sons, musicas, nave, asteroides, maxVelocidade, minVelocidade, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux){
	ctx.canvas.addEventListener("acabouOCarregamento", acabouOCarregamento);

	var inimigos = new Array();
	geraInimigos(ctx, body, imgs, inimigos, 1, 1, 0.25 , 0.5, minVelocidade, maxVelocidade);

	function acabouOCarregamento(ev){
		ctx.canvas.removeEventListener("acabouOCarregamento", acabouOCarregamento);

		var nave       = ev.nave;
		var asteroides = ev.asteroides;
		var inimigos   = ev.inimigos;
		//explosoes    = ev.explosoes;

		//sao parametros de entrada que nao vao ser usados
		var boss       = new Array();
		var nivel      = -1;
		var evento;
		var listener;
		var nomeDoEvento;

		jogar(ctx, body, auxMisc, menus, botoes, imgs, sons, musicas, nave, asteroides, inimigos, boss, maxVelocidade, minVelocidade, nivel, 2, evento, listener, nomeDoEvento, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux);
	}
	
	var evAcabouOCarregamento 	  	 = new Event("acabouOCarregamento");
	evAcabouOCarregamento.asteroides = asteroides;
	evAcabouOCarregamento.nave 	     = nave;
	evAcabouOCarregamento.inimigos 	 = inimigos;
	ctx.canvas.dispatchEvent(evAcabouOCarregamento);

}








//funcao principal do jogo
function jogar(ctx, body, auxMisc, menus, botoes, imgs, sons, musicas, nave, asteroides, inimigos, boss, maxVelocidade, minVelocidade, nivel, modoDeJogo, evento, listener, nomeDoEvento, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux){
	var etapaDoBoss    = new Array(1);
	etapaDoBoss[0]     = 0;

	var indexExplo 	   = 0;
	var cooldownRocket = 0;
	var fundoIndex     = 0;
	var tempo_antigo   = -500;
	var tempo_inicio   = new Array(1);
	var tempo_parado   = new Array(1);
	tempo_inicio[0]    = 0;
	var requestId;

	var acabou;

	var tirosInimigos = new Array();
	var explosoes     = new Array();
	var powerups      = new Array();

	//sons["campanha"][0].load();
	//sons["campanha"][0].play().catch(function(){});

	tocaMusica(musicas,nivel);


	var KeyNaveHandlerF;
	var KeyNaveHandlerT;
	var auxClickHandlerJogo;

	//funcao step, iteracao do jogo
	var step = function (time) {

		if(tempo_inicio[0] == 0){
			tempo_inicio[0] = time;



			auxClickHandlerJogo = function(ev){

				sons["botoes"][1].load();
				sons["botoes"][1].play().catch(function(){});
				
				//ve qual é o botao
				switch(ev.target.id){

					//POP UP------------
					//sim
					case("popUpMenu_0"):
						console.log("sim do Jogo");
						simClickHandlerJogo(auxMisc, botoes, menus, imgs, sons, musicas, body, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, auxClickHandlerJogo, KeyNaveHandlerF, KeyNaveHandlerT, requestId, domAux);
						break;

					//nao
					case("popUpMenu_2"):
						console.log("nao do Jogo");
						naoClickHandlerJogo(botoes, menus, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
						break;
				}
			}




			//Eventos das Teclas 
			KeyNaveHandlerF = function(ev){
				KeyNaveF(ev, nave, ctx);
			}
			KeyNaveHandlerT = function(ev){
			 	KeyNaveT(ev, nave, ctx, body, imgs, sons, musicas, menus, requestId, step, time, tempo_parado, tempo_inicio, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
			}




			window.addEventListener("keyup"  ,KeyNaveHandlerF);	
			window.addEventListener("keydown",KeyNaveHandlerT);
			
			adicionaEVLBotoes(botoes, "popUpMenu", 0, auxClickHandlerJogo, auxMouseInHandler, auxMouseOutHandler);
			adicionaEVLBotoes(botoes, "popUpMenu", 2, auxClickHandlerJogo, auxMouseInHandler, auxMouseOutHandler);
		

		}

		//de 0.5 a 0.5 segundos, se nao estiver na etapa do boss, atualiza as posicoes preferidas dos inimigos
		if(time - tempo_antigo >= 500 && etapaDoBoss[0] == 0){
			atualizaInim(ctx, inimigos, nave, asteroides);
			tempo_antigo = time;
		}
		else if(etapaDoBoss[0] == 1){
			boss[0].mover(ctx, time - tempo_antigo);
			tempo_antigo = time;
		}

		//desenha todos os objetos
		desenha(ctx, body, time, imgs, nave, asteroides, inimigos, powerups, explosoes, fundoIndex, tirosInimigos, modoDeJogo, boss);
		//verifica as colisoes e caso se perca ou ganha, da return diferente de 0, acabando a funcao
		acabou = colisoes(ctx, body, auxMisc, menus, botoes, imgs, sons, musicas, nave, asteroides, inimigos, powerups, maxVelocidade, minVelocidade, etapaDoBoss, explosoes, tirosInimigos, fundoIndex, time, tempo_inicio[0], requestId, KeyNaveHandlerT, KeyNaveHandlerF, auxClickHandlerJogo, auxClickHandlerJogo, auxMouseInHandler, auxMouseOutHandler, nivel, modoDeJogo, boss, evento, listener, nomeDoEvento, domAux);
		if(acabou != 0){
			return;
		}
		//movimenta todos os objetos e cria novos objetos se necessario
		render(ctx, nave, sons, asteroides, inimigos, powerups, body, imgs, time, tirosInimigos, etapaDoBoss[0], boss);
		
		//passa uma iteracao no fundo
		fundoIndex++;				//conta os frames da animacao de fundo
	  	if (fundoIndex >= 90) {  	//quando acaba o numero de frames da animacao de fundo retoma o valor 0
		    fundoIndex = 0;
		}

		requestId = window.requestAnimationFrame(step);
	}

	requestId = window.requestAnimationFrame(step);
}

//desenha todos os objetos
function desenha(ctx, body, time, imgs, nave, asteroides, inimigos, powerups, explosoes, fundoIndex, tirosInimigos, modoDeJogo, boss){

	ctx.drawImage(imgs["fundo"][0], fundoIndex * 500, 0, 500, 250, 0, 0, 3.5 * 500,  3 * 250);

	draw(ctx, asteroides);
	if (inimigos.length > 0){
		draw(ctx, inimigos[0]);
	}
	else{
		draw(ctx, boss);
	}
	nave.draw(ctx, body, time);
	nave.drawEscudo(ctx, time);
	draw(ctx, nave.rockets);
	draw(ctx, tirosInimigos);
	draw(ctx, powerups);

	if(nave.vida == 1){
		ctx.fillText("Última vida", 20, 35);
	}
	else{
		ctx.fillText("Vidas: ", 20, 35);
		ctx.fillText(nave.vida, 120, 35);
	}

	if(modoDeJogo != 0){
		ctx.fillText("Pontos: ", 20, ctx.canvas.height  - 20);
		ctx.fillText(nave.pontos, 130, ctx.canvas.height  - 18);
	}


	for(let i = 0; i < explosoes.length; i++){
		explosoes[i].drawUmaRotacao(ctx);
		if(explosoes[i].indice == explosoes[i].quantidadeframes){
			explosoes.splice(i, 1);
		}
	}
}

//desenhar sprites
function draw(ctx, spArray){
	for (let i = 0; i < spArray.length; i++){
		spArray[i].draw(ctx);
	}
}

//movimenta todos os objetos e cria novos se necessario
function render(ctx, nave, sons, asteroides, inimigos, powerups, body, imgs, tempo, tirosInimigos, etapaDoBoss, boss){
	var cw 		= ctx.canvas.width;
	var ch 		= ctx.canvas.height;

	nave.tiros_cooldown(); 	// funcao para nao spammar os tiros da nave
	mover_tiros(ch, cw, nave.rockets);
	mover_tiros(ch, cw, tirosInimigos);


	for(let i = 0; i < asteroides.length; i++){
		asteroides[i].mover(ch, 6, 3);
	}
	for(let i = 0; i < powerups.length; i++){
		powerups[i].mover(ch, cw, tempo, powerups, i);
	}

	//move inimigos e cria novos tiros quando possivel
	if(inimigos.length > 0){
		for(let i = 0; i < inimigos[0].length; i++){
			let inimigo = inimigos[0][i];
			inimigos[0][i].mover();
			inimigo.tiros_cooldown();
			if(inimigo.tiroReady == true){
				inimigo.novoTiro(ctx, sons, body, tirosInimigos);
			}
		}
	}
	//se possivel, o boss dispara
	else if(etapaDoBoss == 1){
		boss[0].tiros_cooldown();
		if(boss[0].tiroReady == true){
			boss[0].novoTiro(ctx, sons, body, tirosInimigos);
		}
	}

	//Nave
	if(nave.movivel == true){
		nave.mover(ctx);
		for(let i = 0; i < nave.extras.length; i++){
			nave.extras[i].mover();
		}
		if(nave.tiroBool == true){
			if(nave.tiroReady == true){
				nave.novoTiro(ctx, sons, body);
			}
		}
	}
}

//verifica as colisões
function colisoes(ctx, body, auxMisc, menus, botoes, imgs, sons, musicas, nave, asteroides, inimigos, powerups, maxVelocidade, minVelocidade, etapaDoBoss, explosoes, tirosInimigos, fundoIndex, time, tempo_inicio, requestId, KeyNaveHandlerT, KeyNaveHandlerF, auxClickHandler, auxClickHandlerJogo, auxMouseInHandler, auxMouseOutHandler, nivel, modoDeJogo, boss, evento, listener, nomeDoEvento, domAux){
	var powerupIndex;

	//nave x powerups
	powerupIndex = nave.colisaoComUmArraySprites(ctx, powerups);
	if(powerupIndex > 0){
		powerups[powerupIndex - 1].interage(nave, imgs["tiros"], body, time);
		powerups.splice(powerupIndex - 1, 1);
	}

	//nave x asteroides
	//nave x tiros inimigos
	//nave x inimigos/boss
	if(nave.colisaoComUmArraySprites(ctx, asteroides) > 0 ||
	   nave.colisaoComUmArraySprites(ctx, tirosInimigos) > 0 ||
	  (inimigos.length > 0 && nave.colisaoComUmArraySprites(ctx, inimigos[0])) ||
	  (etapaDoBoss[0] == 1 && nave.colisaoComUmArraySprites(ctx, boss))){
	  	nave.atingido(time);
	  	//se a nave ficar sem vida, perdeu
	  	if(nave.vida == 0){
			perdeu(ctx, body, auxMisc, menus, botoes, imgs, sons, musicas, nave, asteroides, inimigos, explosoes, powerups, tirosInimigos, fundoIndex, time, requestId, KeyNaveHandlerT, KeyNaveHandlerF, auxClickHandlerJogo, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, modoDeJogo, boss, listener, nomeDoEvento, domAux);
			return -1;
		}
	}

	//tiros x asteroides
	colisao_tiros_asteroides(ctx, asteroides, nave, imgs, explosoes, powerups, body, modoDeJogo, time, tempo_inicio);
	//tiros x inimigos se existirem inimigos
	if(etapaDoBoss[0] == 0 && inimigos.length > 0 && colisao_tiros_inimigos(ctx, inimigos, powerups, nave, imgs, explosoes, body, modoDeJogo, time, tempo_inicio) == 1){
		//se for infinito, é preciso gerar novos inimigos
		if(modoDeJogo == 2){
			geraInimigos(ctx, body, imgs, inimigos, time, tempo_inicio, 0.25, 0.5, minVelocidade, maxVelocidade);
		}
		else if(boss.length != 0){
			//sons["campanha"][0].load();
			
			//para todas as musicas a tocar 
			for(let key in musicas){
				for ( let i = 0; i < Object.keys(musicas[key]).length; i++){
					musicas[key][i].pause();
					musicas[key][i].currentTime = 0;
				}
			}
			musicas["boss"][boss[0]["id"]].loop = true;
			musicas["boss"][boss[0]["id"]].load();
			musicas["boss"][boss[0]["id"]].play().catch(function(){});
			
			etapaDoBoss[0] = 1;
		}
	}
	//se nao existirem mais inimigos, ou se o boss for destruido, ganhou
	else if((etapaDoBoss[0] == 0 && inimigos.length == 0 && modoDeJogo != 2) ||
		    (etapaDoBoss[0] == 1 && colisao_tiros_boss(ctx, boss, nave, imgs, explosoes, modoDeJogo, time, tempo_inicio) == 1)){
		ganhou(ctx, body, auxMisc, menus, botoes, imgs, sons, musicas, nave, asteroides, inimigos, explosoes, powerups, tirosInimigos, fundoIndex, time, requestId, KeyNaveHandlerT, KeyNaveHandlerF, auxClickHandler, auxClickHandlerJogo, auxMouseInHandler, auxMouseOutHandler, nivel, modoDeJogo, boss, modoDeJogo, evento, domAux);
		return 1;
	}
	return 0;
}















//Altera as posicoes preferidas de cada inimigo
function atualizaInim(ctx, inimigos, nave, asteroides){
	if (inimigos.length > 0){
		for(let i = 0; i < inimigos[0].length; i++){
			inimigos[0][i].melhor_posicao(ctx, inimigos, nave, asteroides);
			//inimigos[0][i].tiros_cooldown(ctx, inimigos, nave, asteroides);
		}
	}
}

//Move todos os tiros de um array de rockets
function mover_tiros(canvasHeight, canvasWidth, arrayRockets){
	for(let i = 0; i < arrayRockets.length; i++){
		arrayRockets[i].mover(canvasHeight, canvasWidth, arrayRockets, i);
	}
}

//Verifica a colisao de um array de sprites com um array de rockets
function colisao_tiros(ctx, arraySpriteImages, arrayDeRockets){
	var arrayTemp = Array();
	for(let i = 0; i < arrayDeRockets.length; i++){
		var index = arrayDeRockets[i].colisaoComUmArraySprites(ctx, arraySpriteImages);
		if(index > 0){
			arrayTemp.push(i + 1);
			arrayTemp.push(index);
		}
	}
	arrayTemp.push(0);
	arrayTemp.push(0);
	return arrayTemp;
}

//cria uma nova explosao
function nova_explosao(inimigos, nave, inimIndex, tiroindex, imgs, explosoes){
	var xExplosao = inimigos[inimIndex - 1].posicaoX + inimigos[inimIndex - 1].width/2 - 64/2;
	var yExplosao = inimigos[inimIndex - 1].posicaoY + inimigos[inimIndex - 1].height/2;

	var img = imgs["explosoes"][0];
	var nw  = img.naturalWidth/16;
	var nh  = img.naturalHeight;

	var width  = nw;   
	var height = nh;

	var explosao = new Componente(xExplosao, yExplosao, width, height, nw, nh, 0, false, false, false, img, 0, 16);

	explosao.indice = 0;
	explosoes.push(explosao);


	nave.rockets.splice(tiroindex - 1, 1);
}

//cria um novo powerup random
function novo_powerup(inimigos, inimIndex, nave, powerups, imgsPowerups, body, tempoAtual){
	var xPowerup = inimigos[inimIndex - 1].posicaoX + inimigos[inimIndex - 1].width/2;
	var yPowerup = inimigos[inimIndex - 1].posicaoY + inimigos[inimIndex - 1].height/2;

	var max;
	var indice;
	var random = Math.floor(Math.random() * 10);
	//se o random for 2, cria um powerup de upgrade do tiro
	if(random == 2){
		indice = 7;
	}
	//se o random for maior que 5, e o cooldown for menor que 15 e maior que 3, cria um powerup de infinito
	else if(random > 5 &&  nave.cooldownRocketTotal < 15 && nave.cooldownRocketTotal > 3){
		indice = 8;
	}
	else{
		//max e exclusive
		//se o cooldown do rocket for maior que 10, nao se pode gerar o powerup que reduz o cooldown dos tiros
	 	if(nave.cooldownRocketTotal > 10){
	 		// 9 - 2 = 7[
			max = imgsPowerups.length - 2;
		}
		else{
	 		// 9 - 3 = 6[
			max = imgsPowerups.length - 3;
		}
		//cria um powerup random
		indice = Math.floor(Math.random() * max);
	}

	var img    = imgsPowerups[indice];
	var nw     = img.naturalWidth;
	var nh     = img.naturalHeight;

	var velocidade = Math.floor(Math.random() * 2 + 1);
	var direcao    = Math.random() * 360;

	var width  = nw;   
	var height = nh;

	var powerup = new Powerup(xPowerup, yPowerup, width, height, nw, nh, velocidade, false, false, false, img, indice, 1, direcao, tempoAtual);

	powerup.pixels(body);

	powerup.indice = 0;
	powerups.push(powerup);
}

//colisao de tiros com asteroides
function colisao_tiros_asteroides(ctx, asteroides, nave, imgs, explosoes, powerups, body, modoDeJogo, tempoAtual, tempoInicial){
	var arrayTemp = colisao_tiros(ctx, asteroides, nave.rockets);
	var tiroindex = arrayTemp[0];
	var rockindex = arrayTemp[1];

	//se o index do tiro for maior que 0, é porque houve colisao, entao
	//vai ser criada uma nova explosao, por vezes criar um powerup, atualizar o asteroide
	//e somar os pontos da nave
	if(tiroindex > 0){
		nova_explosao(asteroides, nave, rockindex, tiroindex, imgs, explosoes);
		if(Math.floor(Math.random() * 15) == 0){
			novo_powerup(asteroides, rockindex, nave, powerups, imgs["powerups"], body, tempoAtual);
		}
		asteroides[rockindex - 1].atualizaAsteroide(6, 3);
		nave.somaPontos(10, modoDeJogo, tempoAtual, tempoInicial);
	}
}

//colisao de tiros com inimigos
function colisao_tiros_inimigos(ctx, inimigos, powerups, nave, imgs, explosoes, body, modoDeJogo, tempoAtual, tempoInicial){
	var arrayTemp = colisao_tiros(ctx, inimigos[0], nave.rockets);
	var tiroindex = arrayTemp[0];
	var inimIndex = arrayTemp[1];

	//se o index do tiro for maior que 0, é porque houve colisao, entao
	//vai ser criada uma nova explosao, por vezes criar um powerup, retirar
	//o inimigo do array de inimigos, somar pontos da nave, e caso nao hajam inimigos
	//retirar um elemento ao array de waves de inimigos
	if(tiroindex > 0){
		nova_explosao(inimigos[0], nave, inimIndex, tiroindex, imgs, explosoes);
		if(modoDeJogo == 0 || modoDeJogo == 1){
			inimigos[0][inimIndex - 1].spawnPowerup(powerups, body, imgs["powerups"], tempoAtual);
		}
		else if(modoDeJogo == 2 && Math.floor(Math.random() * 5) == 0){
			novo_powerup(inimigos[0], inimIndex, nave, powerups, imgs["powerups"], body, tempoAtual);
		}
		inimigos[0].splice(inimIndex - 1, 1);
		nave.somaPontos(100, modoDeJogo, tempoAtual, tempoInicial);
		if(inimigos[0].length == 0){
			inimigos.splice(0,1);
			if(inimigos.length == 0){
				return 1;
			}
		}
	}
	return 0;
}

//colisao de tiros com o boss
function colisao_tiros_boss(ctx, boss, nave, imgs, explosoes, modoDeJogo, tempoAtual, tempoInicial){
	var arrayTemp = colisao_tiros(ctx, boss, nave.rockets);
	var tiroindex = arrayTemp[0];
	var inimIndex = arrayTemp[1];

	//se o index do tiro for maior que 0, cria-se uma nova explosao e o boss é atingido,
	//Se a vida for igual a 0, soma-se pontos à nave e retorna 1
	if(tiroindex > 0){
		nova_explosao(boss, nave, inimIndex, tiroindex, imgs, explosoes);
		boss[0].atingido();
		if(boss[0].vida == 0){
			nave.somaPontos(2500, modoDeJogo, tempoAtual, tempoInicial);
			return 1;
		}
	}
	return 0;
}






//gera Inimigo é uma forma generalizada de criar um inimigo
function geraInimigo(ctx, body, imgInimigos, imgTiros, indiceInimigo, indiceTiro, escala, velocidade, rocketSpeed, cooldown, iteracao, total, powerupIndice){
	var nw  = imgInimigos[indiceInimigo].naturalWidth;
	var nh  = imgInimigos[indiceInimigo].naturalHeight;

	var width 	= nw * escala;
	var height 	= nh * escala;

	if(cooldown < 15){
		cooldown = 15;
	}

	var sp = new Inimigo((iteracao + 1)*(ctx.canvas.width/(total + 1.5)), -2*height, width, height, nw, nh, velocidade, false, false, true, imgInimigos[indiceInimigo], 0, 1, rocketSpeed, imgTiros, indiceTiro, cooldown, powerupIndice);
	
	sp.pixels(body);

	return sp;
}

//no infinito é preciso gerar inimigos quando já não há mais inimigos, sendo que os valores são randoms baseados no tempo
function geraInimigos(ctx, body, imgs, inimigos, time, tempo_inicio, minEscala, maxEscala, minVelocidade, maxVelocidade){
	var imgInimigos       = imgs["inimigos"];
	var indiceInimigosMax = imgInimigos.length;
	var imgTiros          = imgs["tirosInimigos"];
	var indiceTiroMax     = imgTiros.length;
	var indiceInimigo;
	var indiceTiro;
	var escala;
	var velocidade;
	var rocketSpeed = 6;
	var cooldown    = 30;

	var novoArrayInimigos = new Array();

	var minInimigos = Math.floor((time - tempo_inicio)/10000) + 1;
	var maxInimigos = (Math.floor((time - tempo_inicio)/10000) + 1) * 2;
	var numInimigos = Math.floor(Math.random() * (maxInimigos - minInimigos) + minInimigos);

	for(let i = 0; i < numInimigos; i++){
		indiceInimigo = Math.floor(Math.random() * indiceInimigosMax);
		//indiceTiro    = Math.floor(Math.random() * indiceTiroMax);
		escala        = Math.random() * (maxEscala - minEscala) + minEscala;
		velocidade    = Math.floor(Math.random() * (maxVelocidade - minVelocidade) + minVelocidade);
		if(Math.floor((time - tempo_inicio) / 30000) <=  3){
			indiceTiro = Math.floor(Math.random() * Math.floor((time - tempo_inicio) / 30000));
		}
		else if(Math.floor((time - tempo_inicio) / 60000) <=3){
			indiceTiro = Math.floor(Math.random() * Math.floor((time - tempo_inicio) / 60000)) + Math.floor((time - tempo_inicio) / 60000);
		}
		else{
			indiceTiro = Math.round(Math.random()) + 4;
		}

		novoArrayInimigos.push(geraInimigo(ctx, body, imgInimigos, imgTiros, indiceInimigo, indiceTiro, escala, velocidade, rocketSpeed, cooldown, i, numInimigos));
	}
	inimigos.push(novoArrayInimigos);
}














//quando se ganha
function ganhou(ctx, body, auxMisc, menus, botoes, imgs, sons, musicas, nave, asteroides, inimigos, explosoes, powerups, tirosInimigos, fundoIndex, tempoAntigo, requestId, KeyNaveHandlerT, KeyNaveHandlerF, auxClickHandler, auxClickHandlerJogo, auxMouseInHandler, auxMouseOutHandler, nivel, modoDeJogo, boss, speedrun, evento, domAux){
	var newRequestId;
	var nivelCompletado;

	//para os asteroides e a nave
	for(let i = 0; i < asteroides.length; i++){
		asteroides[i].velocidade = 0;
	}
	nave.parou();

	//nivel Completado, da return -1 se ja tiver feito o nivel, nao tendo de desbloquear nenhuma nave
	//return 1,2,3 para quando completa os niveis, 1,2,3, respetivamente
	//quando esta no modo de camapanha, completa um nivel e atualiza cookies
	if(modoDeJogo == 0){
		nivelCompletado = atualizaCoockiesNivel(auxMisc, botoes, nivel);
	}
	else{
		console.log("Impossivel, problema no ganhou");
	}

	//mostra a imagem de "win" durante 2 segundos, voltando depois para o menu principal
	function ganhou_animation(time){
		desenha(ctx, body, time, imgs, nave, asteroides, inimigos, powerups, explosoes, fundoIndex, tirosInimigos, modoDeJogo, boss);
		ctx.drawImage(imgs["win"][0], 120 , 80);

		//proxima iteracao do fundo
		fundoIndex++;				//conta os frames da animacao de fundo
	  	if (fundoIndex >= 90) {  	//quando acaba o numero de frames da animacao de fundo retoma o valor 0
		    fundoIndex = 0;
		}

		if(time - tempoAntigo >= 2000){
			//limpa a canvas
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			window.cancelAnimationFrame(newRequestId);

			if(modoDeJogo == 0  && nave.vida >= 3 && nivel == 1 && auxMisc["cookieStore"]["Naves"][2] == "0"){
				//return -11 quando completa o nivel 1 com pelo menos 3 vidas
				nivelCompletado = -11
			}

			//se o modo de jogo for campanha ou custom (por implementar), volta ao menu principal
			if(modoDeJogo == 0 || modoDeJogo == 3){

				desbloqueiaNavePorNivel(nivelCompletado, auxMisc, menus, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux);

				listeners_do_menu(auxMisc, menus, botoes, imgs, sons, musicas, body, domNaves(menus), domAux);
				menu_principal(menus, auxMisc, musicas, body);
			}
			//se o modo de jogo for speedrun, da dispatch de um evento
			else{
				ctx.canvas.dispatchEvent(evento);
			}
			return;
		}
		else{
			newRequestId = window.requestAnimationFrame(ganhou_animation);
		}

	}

	window.removeEventListener("keydown",KeyNaveHandlerT);
	window.removeEventListener("keyup",  KeyNaveHandlerF);

	removeEVLBotoes(botoes, "popUpMenu", 0, auxClickHandlerJogo, auxMouseInHandler, auxMouseOutHandler);
	removeEVLBotoes(botoes, "popUpMenu", 2, auxClickHandlerJogo, auxMouseInHandler, auxMouseOutHandler);

	window.cancelAnimationFrame(requestId);
	newRequestId = window.requestAnimationFrame(ganhou_animation);
}

//quando se perde
function perdeu(ctx, body, auxMisc, menus, botoes, imgs, sons, musicas, nave, asteroides, inimigos, explosoes, powerups, tirosInimigos, fundoIndex, tempoAntigo, requestId, KeyNaveHandlerT, KeyNaveHandlerF, auxClickHandlerJogo, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, modoDeJogo, boss, listener, nomeDoEvento, domAux){
	var newRequestId;

	//Quando se perde e esta no speedrun, ele retira os eventos
	if(modoDeJogo == 1){
		ctx.canvas.removeEventListener(nomeDoEvento, listener);
	}
	//Quando se perde e esta no infinito, atualiza as coockies do infinito
	else if(modoDeJogo == 2){
		atualizaCoockiesInfinito(auxMisc, botoes, nave.pontos);
	}

	//para os asteroides e a nave
	for(let i = 0; i < asteroides.length; i++){
		asteroides[i].velocidade = 0;
	}
	nave.parou();

	//mostra a imagem de "gameover" durante 2 segundos
	function perdeu_animation(time){
		desenha(ctx, body, time, imgs, nave, asteroides, inimigos, powerups, explosoes, fundoIndex, tirosInimigos, modoDeJogo, boss);
		ctx.drawImage(imgs["gameover"][0], 120 , 80);

		//passa a frame de fundo seguinte
		fundoIndex++;				//conta os frames da animacao de fundo
	  	if (fundoIndex >= 90) {  	//quando acaba o numero de frames da animacao de fundo retoma o valor 0
		    fundoIndex = 0;
		}

		if(time - tempoAntigo >= 2500){

			//quando se esta no infinito, se nao tiver a nave, desbloqueia-a
			if(modoDeJogo == 2 && auxMisc["cookieStore"]["Naves"][1] == "0"){
				naveDesbloqueia(1, auxMisc, menus, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux)
			}

			//da reset na canvas e volta para o menu
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			window.cancelAnimationFrame(newRequestId);
			listeners_do_menu(auxMisc, menus, botoes, imgs, sons, musicas, body, domNaves(menus), domAux);
			menu_principal(menus, auxMisc, musicas, body);
			return;
		}
		else{
			newRequestId = window.requestAnimationFrame(perdeu_animation);
		}
	}

	window.removeEventListener("keydown",KeyNaveHandlerT);
	window.removeEventListener("keyup",  KeyNaveHandlerF);
	removeEVLBotoes(botoes, "popUpMenu", 0, auxClickHandlerJogo, auxMouseInHandler, auxMouseOutHandler);
	removeEVLBotoes(botoes, "popUpMenu", 2, auxClickHandlerJogo, auxMouseInHandler, auxMouseOutHandler);

	window.cancelAnimationFrame(requestId);
	newRequestId = window.requestAnimationFrame(perdeu_animation);

}































//event listeners das teclas
function KeyNaveF(ev, nave, ctx) {
	switch(ev.code) {
		case 'Space': 		nave.tiroBool = false; break;
		case 'ArrowLeft':	nave.boool[0] = false; break;
		case 'ArrowRight': 	nave.boool[1] = false; break;
		case 'ArrowUp':  	nave.boool[2] = false; break;
		case 'ArrowDown': 	nave.boool[3] = false; break;
	}
}

function KeyNaveT(ev, nave, ctx, body, imgs, sons, musicas, menus, requestId, step, time, tempo_parado, tempo_inicio, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	switch(ev.code) {
		case 'Escape': 		
			// nao mexe no pausa menu se o popUp estiver aberto 
			if(menus["popUpMenu"].style.zIndex == 1 || menus["popUpMenu"].style.zIndex == "" ){
				MenuPausaToggleJogo(menus, sons, musicas, requestId, step, time, tempo_parado, tempo_inicio, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);break;
			}break;
		case 'Space': 		nave.tiroBool = true; break;
		case 'ArrowLeft': 	nave.boool[0] = true; break;
		case 'ArrowRight': 	nave.boool[1] = true; break;
		case 'ArrowUp': 	nave.boool[2] = true; break;
		case 'ArrowDown': 	nave.boool[3] = true; break;
	}
}


//outros listeners
function MenuPausaToggleJogo(menus, sons, musicas, requestId, step, time, tempo_parado, tempo_inicio, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){

	botoes["pausaMenu"][6].style.display = "block";

	preparaBotaoSomMusica(sons, musicas, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

	if(menus["pausaMenu"].style.display == ""){
		tempo_parado[0] = time;

		sons["esc"][0].load();
		sons["esc"][0].play().catch(function(){});

		menus["pausaMenu"].style.display = "block";
		window.cancelAnimationFrame(requestId);

	}
	else{
		tempo_inicio[0] = tempo_inicio[0] + time - tempo_parado[0];

		sons["esc"][1].load();
		sons["esc"][1].play().catch(function(){});

		menus["pausaMenu"].style.display = "";
		requestId = window.requestAnimationFrame(step);
	}
}


function naoClickHandlerJogo(botoes, menus, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	botoes["pausaMenu"][6].style.opacity = 1;

	//repoem liseners nos botoes do menu
	for (var i = 0 ; i < botoes["pausaMenu"].length; i++){
		if (botoes["pausaMenu"][i].style.opacity == 1 ){
			adicionaEVLBotoes(botoes, "pausaMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
		}
	}

	menus["popUpMenu"].style.zIndex = 1;
	menus["popUpMenu"].style.display = "";
}

function simClickHandlerJogo(auxMisc, botoes, menus, imgs, sons, musicas, body, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, auxClickHandlerJogo, KeyNaveHandlerF, KeyNaveHandlerT, newRequestId, domAux){
	var canvas 	   	= document.getElementById("canvas");
	var ctx 		= canvas.getContext("2d");

	botoes["pausaMenu"][6].style.opacity = 1;

	for (var i = 0 ; i < botoes["pausaMenu"].length; i++){
		if (botoes["pausaMenu"][i].style.opacity == 1 ){
			adicionaEVLBotoes(botoes, "pausaMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
		}
	}
	
	menus["popUpMenu"].style.zIndex = 1;
	menus["popUpMenu"].style.display = "";
	
	//Mete codigo para voltar ao mainMenu

	window.removeEventListener("keydown",KeyNaveHandlerT);
	window.removeEventListener("keyup",  KeyNaveHandlerF);

	removeEVLBotoes(botoes, "popUpMenu", 0, auxClickHandlerJogo, auxMouseInHandler, auxMouseOutHandler);
	removeEVLBotoes(botoes, "popUpMenu", 2, auxClickHandlerJogo, auxMouseInHandler, auxMouseOutHandler);



	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	window.cancelAnimationFrame(newRequestId);
	listeners_do_menu(auxMisc, menus, botoes, imgs, sons, musicas, body, domNaves(menus), domAux);
	menu_principal(menus, auxMisc, musicas, body);

}