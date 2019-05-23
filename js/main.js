"use strict";

(function()
{	
	window.addEventListener("load", main);
}());

//meter a verificaçao do clik handler de se esta a clcar no opaco.... antes d switch case que verifica o id do botao



function main(){

	function initMenuEndHandler(ev){
		window.removeEventListener("initMenuEnd", initMenuEndHandler);
		window.addEventListener("initImagensEnd", initImagensEndHandler);

		//load das imagens do jogo
		var nToLoad = { "nave" : 5 , "inimigos" : 2 , "boss" : 2 , "asteroides" : 1 , "powerups" : 9 , "outros" : 1, "tiros" : 1 , "tirosInimigos" : 1 , "fundo" : 1 , "explosoes" : 1 , "gameover" : 2 , "win" : 1 };
		var nLoaded = { "nave" : 0 , "inimigos" : 0 , "boss" : 0 , "asteroides" : 0 , "powerups" : 0 , "outros" : 0, "tiros" : 0 , "tirosInimigos" : 0 , "fundo" : 0 , "explosoes" : 0 , "gameover" : 0 , "win" : 0 };
		imgs 	    = { "nave" : [], "inimigos" : [], "boss" : [], "asteroides" : [], "powerups" : [], "outros" : [],"tiros" : [], "tirosInimigos" : [], "fundo" : [], "explosoes" : [], "gameover" : [], "win" : []};
		
		initImagens(nLoaded, nToLoad, imgs, imgsMenu);
	
	}

	function initImagensEndHandler(ev){
		window.removeEventListener("initImagensEnd", initImagensEndHandler);
		window.addEventListener("initMusicasEnd", initMusicasEndHandler);

		//load das imagens do jogo
		nToLoad  = {"campanha" : 3 ,"infinito" : 1 , "boss" : 2 ,"musica": 1 };
		musicas  = {"campanha" : [],"infinito" : [], "boss" : [],"musica": []};


		initMusicas(nToLoad, musicas);
	}

	function initMusicasEndHandler(ev){
		window.removeEventListener("initMusicasEnd", initMusicasEndHandler);
		window.addEventListener("initEnd", initEndHandler);

		//load das imagens do jogo
		nToLoad = {"tiros" : 1 , "botoes" : 2 ,"esc" : 2 };
		sons 	= {"tiros" : [], "botoes" : [],"esc" : []};


		initSons(nToLoad, sons);
	}


	function initEndHandler(ev){
		window.removeEventListener("initEnd", initEndHandler);
		menu_inicial(menus, auxMisc, musicas, body);
		listeners_do_menu(auxMisc, menus, botoes, imgs, sons, musicas, body, domNaves(menus), domAux);
	}
    
	//setCookie("Henrique", 3, 100, 999,"11111","00");
	//setCookie("Carlos", 3, 99, 1000,"11000","00");
	//setCookie("Paulo", 2, 10, 20,"11000","00");


	//controlo de varias coisas
	//assim da para passar por referencia			//menuAtual usado para remover liseners da pagina onde aparece o menu
	//var auxMisc = { "menuAtual" : "startMenu", "jogadorAtual" : "filltext", "popUpCarregamos":"nada"};
	var auxMisc = { "menuAtual" : "startMenu", "menuAntigo": "nada", "modoJogo": "nada", "secretPress": "KeyPKeyIKeyZKeyZKeyA","secretProgress": "", "jogadorAtual" : "filltext", "maxNivel": 3, "naveAtual" : 0, "cookieStore" : {"Naves": "1000", "Tutorial":0} };



	//referencias extra da Dom
	var domAux = {};

	domAux["textoPop"] = document.getElementById("textoPop");
	domAux["jogadorCreditos"] = document.getElementById("jogadorCreditos");
	domAux["nome"] = document.getElementById("nome");
	domAux["jogadorNivel"] = document.getElementById("jogadorNivel");
	domAux["jogadorMain"] = document.getElementById("jogadorMain");
	domAux["jogadorLeaderBoard"] = document.getElementById("jogadorLeaderBoard");




	//precisavamos da nw e nh, por isso fizemos load ao inicio das naves
	var nToLoad  = {"nave0": 5 , "nave1": 5 };
	var nLoaded  = {"nave0": 0 , "nave1": 0 };
	var imgsMenu = {"nave0": [], "nave1": []};
	var imgs;
	var sons;
	var musicas;



	//guarda a referencia da DOM dos botoes
	//assim podemos meter/tirar os liseners quando quisermos
	var botoes = {"pausaMenu": [], "startMenu" : [], "loginRegMenu": [], "popUpMenu" : [], "mainMenu" : [],"nivelMenu": [], "escolhernaveMenu": [], "leaderBoard" : [], "controlosMenu":[], "creditosMenu":[], "ajudaMenu":[] };


	//guarda a referencia da DOM das Figures DOS Menus
	//assim podemos fazer style.block/none
	var menus = {};


	//usado para mudar de cor de fundo
	var body = document.getElementsByTagName("body")[0];



	var pausaMenu         = document.getElementById("pausaMenu");
	menus["pausaMenu"]    = pausaMenu;
	var startMenu         = document.getElementById("startMenu");
	menus["startMenu"]    = startMenu;
	var loginRegMenu      = document.getElementById("loginRegMenu");
	menus["loginRegMenu"] = loginRegMenu;
	var popUpMenu         = document.getElementById("popUpMenu");
	menus["popUpMenu"]    = popUpMenu;
	var mainMenu          = document.getElementById("mainMenu");
	menus["mainMenu"]     = mainMenu;
	var nivelMenu         = document.getElementById("nivelMenu");
	menus["nivelMenu"]    = nivelMenu;
	var escolhernaveMenu         = document.getElementById("escolhernaveMenu");
	menus["escolhernaveMenu"]    = escolhernaveMenu;
	var leaderBoard       = document.getElementById("leaderBoard");
	menus["leaderBoard"]  = leaderBoard;
	var creditosMenu      = document.getElementById("creditosMenu");
	menus["creditosMenu"] = creditosMenu;
	var ajudaMenu         = document.getElementById("ajudaMenu");
	menus["ajudaMenu"]    = ajudaMenu;
	var controlosMenu         = document.getElementById("controlosMenu");
	menus["controlosMenu"]    = controlosMenu;
	var figuraCanvas      = document.getElementById("figuraCanvas");
	menus["figuraCanvas"] = figuraCanvas;






	window.addEventListener("initMenuEnd", initMenuEndHandler);
	initMenu(nLoaded, nToLoad, imgsMenu);



	//pausa
	var muteM = document.getElementById("pausaMenu_0");
	botoes["pausaMenu"].push(muteM);
	var volumeBaixoM = document.getElementById("pausaMenu_1");
	botoes["pausaMenu"].push(volumeBaixoM);
	var volumeAltoM   = document.getElementById("pausaMenu_2");
	botoes["pausaMenu"].push(volumeAltoM);
	
	var muteS = document.getElementById("pausaMenu_3");
	botoes["pausaMenu"].push(muteS);
	var volumeBaixoS = document.getElementById("pausaMenu_4");
	botoes["pausaMenu"].push(volumeBaixoS);
	var volumeAltoS   = document.getElementById("pausaMenu_5");
	botoes["pausaMenu"].push(volumeAltoS);

	var atras = document.getElementById("pausaMenu_6");
	botoes["pausaMenu"].push(atras);

	//startMenu
	var startButon = document.getElementById("startMenu_0");
	botoes["startMenu"].push(startButon);


	//loginRegMenu
	var registarButon = document.getElementById("loginRegMenu_0");
	botoes["loginRegMenu"].push(registarButon);
	var loginButon = document.getElementById("loginRegMenu_1");
	botoes["loginRegMenu"].push(loginButon);

	//popUpMenu
	var simButon = document.getElementById("popUpMenu_0");
	botoes["popUpMenu"].push(simButon);
	var okButon = document.getElementById("popUpMenu_1");
	botoes["popUpMenu"].push(okButon);
	var naoButon = document.getElementById("popUpMenu_2");
	botoes["popUpMenu"].push(naoButon);

	//mainMenu
	var campanha = document.getElementById("mainMenu_0");
	botoes["mainMenu"].push(campanha);
	var infinito = document.getElementById("mainMenu_1");
	botoes["mainMenu"].push(infinito);
	var editor   = document.getElementById("mainMenu_2");
	botoes["mainMenu"].push(editor);

	var sair   = document.getElementById("mainMenu_3");
	botoes["mainMenu"].push(sair);
	var ajuda   = document.getElementById("mainMenu_4");
	botoes["mainMenu"].push(ajuda);
	var creditos = document.getElementById("mainMenu_5");
	botoes["mainMenu"].push(creditos);
	var leaderBoard = document.getElementById("mainMenu_6");
	botoes["mainMenu"].push(leaderBoard);
	var controlos = document.getElementById("mainMenu_7");
	botoes["mainMenu"].push(controlos);

	//nivelMenu
	var nivel1 = document.getElementById("nivelMenu_0");
	botoes["nivelMenu"].push(nivel1);
	var nivel2 = document.getElementById("nivelMenu_1");
	botoes["nivelMenu"].push(nivel2);
	var nivel3   = document.getElementById("nivelMenu_2");
	botoes["nivelMenu"].push(nivel3);
	var speedrun   = document.getElementById("nivelMenu_3");
	botoes["nivelMenu"].push(speedrun);
	var tras   = document.getElementById("nivelMenu_4");
	botoes["nivelMenu"].push(tras);

	//escolhernaveMenu
	var esquerda = document.getElementById("escolhernaveMenu_0");
	botoes["escolhernaveMenu"].push(esquerda);
	var direita = document.getElementById("escolhernaveMenu_1");
	botoes["escolhernaveMenu"].push(direita);
	var go   = document.getElementById("escolhernaveMenu_2");
	botoes["escolhernaveMenu"].push(go);
	var trasEscolherNave   = document.getElementById("escolhernaveMenu_3");
	botoes["escolhernaveMenu"].push(trasEscolherNave);


	//creditosMenu
	var trasCreditos = document.getElementById("creditosMenu_0");
	botoes["creditosMenu"].push(trasCreditos);

	//ajudaMenu
	var trasAjuda = document.getElementById("ajudaMenu_0");
	botoes["ajudaMenu"].push(trasAjuda);
	var nextAjuda = document.getElementById("ajudaMenu_1");
	botoes["ajudaMenu"].push(nextAjuda);

	//controlosMenu
	var trasControlo = document.getElementById("controlosMenu_0");
	botoes["controlosMenu"].push(trasControlo);
	var nextControlo = document.getElementById("controlosMenu_1");
	botoes["controlosMenu"].push(nextControlo);
	var playControlo = document.getElementById("controlosMenu_2");
	botoes["controlosMenu"].push(playControlo);

	//leaderBoard
	var leaderBoardBack = document.getElementById("leaderBoard_0");
	botoes["leaderBoard"].push(leaderBoardBack);

}








function initMenu(nLoaded, nToLoad, imgsMenu){
	var numToLoad = 0;

	//Handler do Load das imagens
	function imgMenuLoad(ev){
		var img = ev.target;

		let key   = img.id.split("_")[0];
		nLoaded[key] += 1;

		if (allLoaded(nLoaded, numToLoad) == true){
			var evInitMenuEnd = new Event("initMenuEnd");
			window.dispatchEvent(evInitMenuEnd);
		}
	}

	for (let toLoad in nToLoad){
		numToLoad += nToLoad[toLoad];
	}

	for (let key in imgsMenu){
		for (var i = 0; i < nToLoad[key]; i++ ){

			imgsMenu[key][i] 		= new Image(); 
			imgsMenu[key][i].addEventListener("load", imgMenuLoad);

			imgsMenu[key][i].id 	= [key]+"_" + i;
			imgsMenu[key][i].src 	= "resources/menu/"+[key]+"_" + i + ".png";  //dá ordem de carregamento da imagem

		}
	}
}


function initImagens(nLoaded, nToLoad, imgs, imgsMenu){
	var numToLoad = 0;

	//Handler do Load das imagens
	function imgLoad(ev){
		var img = ev.target;

		let key   = img.id.split("_")[0];
		nLoaded[key] += 1;

		if (allLoaded(nLoaded, numToLoad) == true){
			var evInitImagensEnd = new Event("initImagensEnd");
			imgs["imgsMenus"] = imgsMenu;
			window.dispatchEvent(evInitImagensEnd);
		}
	}

	for (let toLoad in nToLoad){
		numToLoad += nToLoad[toLoad];
	}

	for (let key in imgs){
		for (var i = 0; i < nToLoad[key]; i++ ){

			imgs[key][i] 		= new Image(); 
			imgs[key][i].addEventListener("load", imgLoad);

			imgs[key][i].id 	= [key]+"_" + i;
			imgs[key][i].src 	= "resources/jogo/"+[key]+"_" + i + ".png";  //dá ordem de carregamento da imagem

		}
	}

}

function initMusicas(nToLoad, musicas){

	for (let key in musicas){
		for (var i = 0; i < nToLoad[key]; i++ ){

			musicas[key][i] 	 = new Audio();

			musicas[key][i].id 	 = [key]+"_" + i;
			musicas[key][i].src  = "resources/musicas/"+[key]+"_" + i + ".mp3";  //dá ordem de carregamento da imagem

		}
	}


	var evInitEnd = new Event("initMusicasEnd");
	window.dispatchEvent(evInitEnd);
}

function initSons(nToLoad, sons){

	for (let key in sons){
		for (var i = 0; i < nToLoad[key]; i++ ){

			sons[key][i] 		= new Audio();

			sons[key][i].id 	= [key]+"_" + i;
			sons[key][i].src 	= "resources/sons/"+[key]+"_" + i + ".mp3";  //dá ordem de carregamento da imagem

		}
	}


	var evInitEnd = new Event("initEnd");
	window.dispatchEvent(evInitEnd);
}


function allLoaded(nLoaded,numToLoad){
	var sumLoaded = 0;

	for(let lo in nLoaded){
		sumLoaded += nLoaded[lo];
	}

	if(sumLoaded == numToLoad){
		return true;
	}else{
		return false;
	}
}








function listeners_do_menu(auxMisc, menus, botoes, imgs, sons, musicas, body, naves, domAux){

	var auxKeyDownHandler = function(ev){
		KeyDownHandler(ev, botoes, menus, auxMisc, sons, musicas, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux);
	}

	var auxClickHandler = function(ev){

		sons["botoes"][1].load();
		sons["botoes"][1].play().catch(function(){});
		
		//ve qual é o botao
		switch(ev.target.id){

			//PAUSA--------------
			//mute
			case("pausaMenu_0"): 
				muteClickHandlerM( musicas, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;

			case("pausaMenu_1"): 
				somBaixoClickHandlerM( musicas, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;

			case("pausaMenu_2"):
				somAltoClickHandlerM( musicas, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;
			case("pausaMenu_3"): 
				muteClickHandlerS(sons, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;
			case("pausaMenu_4"): 
				somBaixoClickHandlerS(sons, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;
			case("pausaMenu_5"):
				somAltoClickHandlerS(sons, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;
			case("pausaMenu_6"):
				sairDoJogoClickHandler(auxMisc, menus, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux);
				break;




			//START------------
			case("startMenu_0"):
				startClickHandler(ev, menus, auxMisc);
				break;





			//LOGIN REG------------
			//registar
			case("loginRegMenu_0"):
				registarClickHandler(ev, menus, auxMisc, musicas, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux);
				break;

			//login
			case("loginRegMenu_1"):
				loginClickHandler(menus, auxMisc, musicas, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux);
				break;


			//POP UP------------
			//sim
			case("popUpMenu_0"):
				simClickHandler(ev, menus, auxMisc, musicas, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux);
				break;
			//ok
			case("popUpMenu_1"):
				okClickHandler(ev, menus, auxMisc, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;
			//nao
			case("popUpMenu_2"):
				naoClickHandler(ev, menus, auxMisc, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				break;



			//MAIN MENU------------
			//campanha
			case("mainMenu_0"): 
				campanhaClickHandler(ev, auxMisc, menus, domAux);
				break;

			//infinito
			case("mainMenu_1"):
				infinitoClickHandler(ev, auxMisc, menus, botoes, body, naves,imgs);
				break;

			case("mainMenu_2"):
				console.log("editor");
				break;

			//fecha jogo
			case("mainMenu_3"): 
				fechaJogoClickHandler(ev, auxMisc, sons, musicas, menus, body); 
				break;

			//ajuda
			case("mainMenu_4"):
				ajudaClickHandler(ev, menus, auxMisc, body);
				break;

			//creditos
			case("mainMenu_5"): 
				creditosClickHandler(ev, menus, auxMisc, domAux);
				break;
			
			//leaderBoard
			case("mainMenu_6"): 
				leaderBoardClickHandler(ev, menus, auxMisc, body, domAux);
				break;						
			
			//controlos
			case("mainMenu_7"): 
				controlosClickHandler(ev, menus, auxMisc, body);
				break;		


			//NIVEL MENU------------
			//nivel 1
			case("nivelMenu_0"): 
				nivelClickHandler(ev, auxMisc, menus, botoes, body, 1, naves, imgs);
				break;
			case("nivelMenu_1"): 
				nivelClickHandler(ev, auxMisc, menus, botoes, body, 2, naves, imgs);
				break;

			case("nivelMenu_2"):
				nivelClickHandler(ev, auxMisc, menus, botoes, body, 3, naves, imgs);
				break;

			case("nivelMenu_3"):
				speedrunClickHandler(ev, auxMisc, menus, botoes, body, naves, imgs);
				break;
			//tras
			case("nivelMenu_4"):
				nivelMenuBack(ev, menus, auxMisc);
				break;





			//ESCOLHER NAVE MENU------------
			//direita
			case("escolhernaveMenu_1"): 
				esquerdaClickHandler(ev, auxMisc, menus, botoes, naves, imgs);
				break;

			//esquerda
			case("escolhernaveMenu_0"): 
				direitaClickHandler(ev, auxMisc, menus, botoes, naves, imgs);
				break;

			//jogar
			case("escolhernaveMenu_2"):
				jogarClickHandler(ev, auxMisc, menus, botoes, imgs, sons, musicas, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux);
				break;
			//tras
			case("escolhernaveMenu_3"):
				escolhernavesMenuBack(ev, menus, auxMisc, body);
				break;




			//LEADERBOARD------------
			//tras
			case("leaderBoard_0"):
				leaderBoardBackClickHandler(ev, menus, auxMisc, body);
				break;


			//CREDITOS MENU------------
			//tras
			case("creditosMenu_0"):
				creditosBackClickHandler(ev, menus, auxMisc);
				break;

			//CONTROLOS MENU------------
			//tras
			case("controlosMenu_0"):
				controlosBackClickHandler(ev, menus, auxMisc, body, botoes);
				break;

			case("controlosMenu_1"):
				controlosNextClickHandler(ev, menus, auxMisc, body, botoes);
				break;	
			case("controlosMenu_2"):
				controlosPlayClickHandler(ev, auxMisc, menus, botoes, imgs, sons, musicas, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux);
				break;

			//AJUDA MENU------------
			//tras
			case("ajudaMenu_0"):
				ajudaBackClickHandler(ev, menus, auxMisc, body);
				break;
			//next
			case("ajudaMenu_1"):
				ajudaPlayClickHandler(ev, auxMisc, menus, botoes, imgs, sons, musicas, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux);
				break;
		}
	}



	var auxMouseInHandler = function(ev){

			let key = ev.target.id.split("_")[0];
			let index = ev.target.id.split("_")[1];

			botoes[key][index].style.opacity = 0.7;
			botoes[key][index].style.cursor = "pointer";

			sons["botoes"][0].load();
			sons["botoes"][0].play().catch(function(){});
	}

	var auxMouseOutHandler = function(ev){

			let key = ev.target.id.split("_")[0];
			let index = ev.target.id.split("_")[1];

			botoes[key][index].style.opacity = 1;
			botoes[key][index].style.cursor = "default";

	}





	//LISTENERS vvvvv
	window.addEventListener("keydown",auxKeyDownHandler);	


	//se estiver a vir de um jogo, (nao desbloqueou nada)
	if (auxMisc["menuAntigo"] == "escolhernaveMenu" && menus["popUpMenu"].style.display == ""){

		for(let key in botoes){
			if(key != "pausaMenu"){
				for ( var i = 0; i < Object.keys(botoes[key]).length; i++){
					adicionaEVLBotoes(botoes, key, i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				}
			}
		}

	//inicio de tudo
	}else if(auxMisc["menuAntigo"] == "nada"){

		for(let key in botoes){
			for ( var i = 0; i < Object.keys(botoes[key]).length; i++){
				adicionaEVLBotoes(botoes, key, i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
			}
		}

	//se estiver a vir de um jogo, e desbloqueou uma nave
	}else if(auxMisc["menuAntigo"] == "escolhernaveMenu" && menus["popUpMenu"].style.display == "block"){
		for(let key in botoes){
			if(key == "popUpMenu"){
				for ( var i = 0; i < Object.keys(botoes[key]).length; i++){
					adicionaEVLBotoes(botoes, key, i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				}
			}
		}

	}


	//LISTENERS ^^^^^^
}






















function EnterPress( menus, auxMisc, musicas, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux){
	if(auxMisc["menuAtual"] == "loginRegMenu"){
		loginClickHandler( menus, auxMisc, musicas, botoes, auxClickHandler,auxMouseInHandler,auxMouseOutHandler, body, domAux)
	}
}



//Handlers vvvvvv

function KeyDownHandler(ev, botoes, menus, auxMisc, sons, musicas, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux){


	switch(ev.code) {
		case "Escape": MenuPausaToggle(botoes, menus, auxMisc, sons, musicas, auxClickHandler, auxMouseInHandler, auxMouseOutHandler); break;
		case "Enter":  EnterPress(menus, auxMisc, musicas, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux); break;
		case "KeyP": auxMisc["secretProgress"] = "KeyP"; break;
		default: secret(ev, auxMisc, menus, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux);break;
		

	}
}


// PAUSE -------

function muteClickHandlerM(musicas, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	console.log("muteM");		
	
	for(let key in musicas){
		for ( let i = 0; i < Object.keys(musicas[key]).length; i++){
			musicas[key][i].volume = 0;
		}
	}
	
	botoes["pausaMenu"][0].style.opacity = 0.3;
	botoes["pausaMenu"][0].style.cursor = "default";
	removeEVLBotoes(botoes, "pausaMenu", 0, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	
	botoes["pausaMenu"][1].style.opacity = 0.3;
	botoes["pausaMenu"][1].style.cursor = "default";
	removeEVLBotoes(botoes, "pausaMenu", 1, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

	//caso em que o som passa 1 para 0
	botoes["pausaMenu"][2].style.opacity = 1;
	adicionaEVLBotoes(botoes, "pausaMenu", 2, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
}

function somBaixoClickHandlerM(musicas, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	console.log("-M");		
	
	//repor o botao de aumentar
	if (musicas["musica"][0].volume + 0.2 > 1){
		botoes["pausaMenu"][2].style.opacity = 1;
		adicionaEVLBotoes(botoes, "pausaMenu", 2, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}


	for(let key in musicas){
		for ( let i = 0; i < Object.keys(musicas[key]).length; i++){
			musicas[key][i].volume -= 0.2;
		}
	}


	//tirar o botao de mute e diminuir
	if (musicas["musica"][0].volume - 0.2 < 0 ){
		botoes["pausaMenu"][0].style.opacity = 0.3;
		botoes["pausaMenu"][0].style.cursor = "default";
		removeEVLBotoes(botoes, "pausaMenu", 0, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

		botoes["pausaMenu"][1].style.opacity = 0.3;
		botoes["pausaMenu"][1].style.cursor = "default";
		removeEVLBotoes(botoes, "pausaMenu", 1, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}

}

function somAltoClickHandlerM(musicas, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	console.log("+M");		

	//repor o botao de mute e o de diminuir
	if (musicas["musica"][0].volume - 0.2 < 0 ){
		botoes["pausaMenu"][0].style.opacity = 1;
		adicionaEVLBotoes(botoes, "pausaMenu", 0, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

		botoes["pausaMenu"][1].style.opacity = 1;
		adicionaEVLBotoes(botoes, "pausaMenu", 1, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}

	for(let key in musicas){
		for ( let i = 0; i < Object.keys(musicas[key]).length; i++){
			musicas[key][i].volume += 0.2;
		}
	}


	//tirar o botao de aumentar
	if (musicas["musica"][0].volume + 0.2 > 1){
		botoes["pausaMenu"][2].style.opacity = 0.3;
		botoes["pausaMenu"][2].style.cursor = "default";
		removeEVLBotoes(botoes, "pausaMenu", 2, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}

}



function muteClickHandlerS(sons, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	console.log("muteS");		

	for(let key in sons){
		for ( let i = 0; i < Object.keys(sons[key]).length; i++){
			sons[key][i].volume = 0;
		}
	}

	botoes["pausaMenu"][3].style.opacity = 0.3;
	botoes["pausaMenu"][3].style.cursor = "default";
	removeEVLBotoes(botoes, "pausaMenu", 3, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

	botoes["pausaMenu"][4].style.opacity = 0.3;
	botoes["pausaMenu"][4].style.cursor = "default";
	removeEVLBotoes(botoes, "pausaMenu", 4, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);


	//caso em que o som passa 1 para 0
	botoes["pausaMenu"][5].style.opacity = 1;
	adicionaEVLBotoes(botoes, "pausaMenu", 5, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
}

function somBaixoClickHandlerS(sons, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	console.log("-S");		
	
	//repor o botao de aumentar
	if (sons["botoes"][0].volume + 0.2 > 1){
		botoes["pausaMenu"][5].style.opacity = 1;
		adicionaEVLBotoes(botoes, "pausaMenu", 5, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}


	for(let key in sons){
		for ( let i = 0; i < Object.keys(sons[key]).length; i++){
			sons[key][i].volume -= 0.2;
		}
	}

	//tirar o botao de mute e diminuir
	if (sons["botoes"][0].volume - 0.2 < 0 ){
		botoes["pausaMenu"][4].style.opacity = 0.3;
		botoes["pausaMenu"][4].style.cursor = "default";
		removeEVLBotoes(botoes, "pausaMenu", 4, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

		botoes["pausaMenu"][3].style.opacity = 0.3;
		botoes["pausaMenu"][3].style.cursor = "default";
		removeEVLBotoes(botoes, "pausaMenu", 3, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}

}



function somAltoClickHandlerS(sons, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	console.log("+S");		

	//repor o botao de mute e o de diminuir
	if (sons["botoes"][0].volume - 0.2 < 0 ){
		botoes["pausaMenu"][3].style.opacity = 1;
		adicionaEVLBotoes(botoes, "pausaMenu", 3, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

		botoes["pausaMenu"][4].style.opacity = 1;
		adicionaEVLBotoes(botoes, "pausaMenu", 4, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}


	for(let key in sons){
		for ( let i = 0; i < Object.keys(sons[key]).length; i++){
			sons[key][i].volume += 0.2;
		}
	}

	//tirar o botao de aumentar
	if (sons["botoes"][0].volume + 0.2 > 1){
		botoes["pausaMenu"][5].style.opacity = 0.3;
		botoes["pausaMenu"][5].style.cursor = "default";
		removeEVLBotoes(botoes, "pausaMenu", 5, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	}

}
function sairDoJogoClickHandler(auxMisc, menus, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux){

 	//var texto = document.getElementById("textoPop");
 	var texto = domAux["textoPop"];

	texto.innerHTML = "Quere voltar ao menu principal??"

	botoes["popUpMenu"][0].style.display = "block";
	botoes["popUpMenu"][1].style.display = "none";
	botoes["popUpMenu"][2].style.display = "block";
	
	menus["popUpMenu"].style.display = "block";
	
	menus["popUpMenu"].style.zIndex = 4;


	//adiciona liseners
	/*for (var i = 0 ; i < botoes["popUpMenu"].length; i++){
		adicionaEVLBotoes(botoes, "popUpMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);	
		botoes["popUpMenu"][i].style.opacity = 1;
	}*/

	//REMOVER EVENTLISENNERS DOS BOTOES
	//retiro os ev liseners dos botoes que ainda tinham (MAS NAO MEXO NA OPACIDADE, assim sei quais tenho de repor os evliseners)
	for (var i = 0 ; i < botoes["pausaMenu"].length; i++){
		if (botoes["pausaMenu"][i].style.opacity == 1 || i == 6){
			removeEVLBotoes(botoes, "pausaMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
		}
	}
	botoes["pausaMenu"][6].style.opacity = 0.3;
}


//START------
function startClickHandler(ev, menus, auxMisc){
	menus["startMenu"].style.display = "";
	menus["loginRegMenu"].style.display = "block";

	auxMisc["menuAtual"] = "loginRegMenu";
	auxMisc["menuAntigo"] = "startMenu";
}



//LOGIN REG------
function loginClickHandler(menus, auxMisc, musicas, botoes, auxClickHandler,auxMouseInHandler,auxMouseOutHandler, body, domAux){

	//var nome = document.getElementById("nome").value;
	var nome = domAux["nome"].value;

	//console.log(nome);

	//nao existe nome -> PopUp
	if(checkCookie(nome) == false){
		console.log("nao existe esse nome");
		
		//var texto = document.getElementById("textoPop");
		var texto = domAux["textoPop"];

		texto.innerHTML = "Nao existe nenhuma conta com esse username"

		botoes["popUpMenu"][0].style.display = "none";
		botoes["popUpMenu"][1].style.display = "block";
		botoes["popUpMenu"][2].style.display = "none";
		
		menus["popUpMenu"].style.display = "block";

		//REMOVER EVENTLISENNERS DOS BOTOES
		for (var i = 0 ; i < botoes["loginRegMenu"].length; i++){
			removeEVLBotoes(botoes, "loginRegMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
			botoes["loginRegMenu"][i].style.opacity = 1;
		}


	}else{
		login(nome, menus, auxMisc, musicas, body, botoes, domAux);
	}
	
}

function registarClickHandler(ev, menus, auxMisc, musicas, botoes, auxClickHandler,auxMouseInHandler,auxMouseOutHandler, body, domAux){
	
	//var nome = document.getElementById("nome").value;
	var nome = domAux["nome"].value;

	//nome invalido
	if(nome == "Nivel" || nome == "Campanha" || nome == "Infinito" || nome == "Naves" || nome == "Tutorial"){
		//var texto = document.getElementById("textoPop");
		var texto = domAux["textoPop"];

		texto.innerHTML = "Nome é invalido"

		botoes["popUpMenu"][0].style.display = "none";
		botoes["popUpMenu"][1].style.display = "block";
		botoes["popUpMenu"][2].style.display = "none";
		
		menus["popUpMenu"].style.display = "block";

		//REMOVER EVENTLISENNERS DOS BOTOES
		for (var i = 0 ; i < botoes["loginRegMenu"].length; i++){
			removeEVLBotoes(botoes, "loginRegMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

			botoes["loginRegMenu"][i].style.opacity = 1;
		}


	//ja existe -> PopUp
	}else if(checkCookie(nome) == true){

		//var texto = document.getElementById("textoPop");
		var texto = domAux["textoPop"];

		texto.innerHTML = "Esse username ja existe. Queres apagar o seu progresso?"

		botoes["popUpMenu"][0].style.display = "block";
		botoes["popUpMenu"][1].style.display = "none";
		botoes["popUpMenu"][2].style.display = "block";
		
		menus["popUpMenu"].style.display = "block";


		//REMOVER EVENTLISENNERS DOS BOTOES
		for (var i = 0 ; i < botoes["loginRegMenu"].length; i++){
			removeEVLBotoes(botoes, "loginRegMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
			botoes["loginRegMenu"][i].style.opacity = 1;
		}


	}else{
	 	setCookie(nome, 0, 0, 0, "10000","00");
	 	login(nome, menus, auxMisc, musicas, body, botoes, domAux);
	}


}



//POP UP------
function simClickHandler(ev, menus, auxMisc, musicas, botoes, auxClickHandler,auxMouseInHandler,auxMouseOutHandler, body, domAux){

	menus["popUpMenu"].style.display = "";
	menus["popUpMenu"].style.zIndex  = 1;


	//se o PopUpMemu estiver no Log Reg Menu
	if (auxMisc["menuAtual"] == "loginRegMenu"){

		
		//var nome = document.getElementById("nome").value;
		var nome = domAux["nome"].value;

		setCookie(nome, 0, 0, 0, "10000","00");
		login(nome, menus, auxMisc, musicas, body, botoes, domAux);

		//Repor os lissenners
		for (var i = 0 ; i < botoes["loginRegMenu"].length; i++){
			adicionaEVLBotoes(botoes, "loginRegMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

		}
	}
	//se o PopUpMemu estiver num jogo
	else{
		/*botoes["pausaMenu"][6].style.opacity = 1;

		for (var i = 0 ; i < botoes["pausaMenu"].length; i++){
			if (botoes["pausaMenu"][i].style.opacity == 1 ){
				adicionaEVLBotoes(botoes, "pausaMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
			}
		}

		//Mete codigo para voltar ao mainMenu
		
		*/

	}

}

function okClickHandler(ev, menus, auxMisc, botoes, auxClickHandler,auxMouseInHandler,auxMouseOutHandler){
	menus["popUpMenu"].style.display = "";			
	menus["popUpMenu"].style.zIndex  = 1;

	//se o PopUpMemu "block" e veio de um jogo foi porque desbloqueamos algo jogo
	if(auxMisc["menuAntigo"] == "algumJogo;_;"){
		for(let key in botoes){
			if(key != "pausaMenu" || key != "popUpMenu" ){
				for ( var i = 0; i < Object.keys(botoes[key]).length; i++){
					adicionaEVLBotoes(botoes, key, i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
				}
			}
		}

	//else if (auxMisc["menuAtual"] == "loginRegMenu" || auxMisc["menuAtual"] == "mainMenu"){
	}//se o PopUpMemu estiver no Log Reg Menu OU no MainMenu
	else{
		//Repor os lissenners
		for (var i = 0 ; i < botoes[auxMisc["menuAtual"]].length; i++){
			adicionaEVLBotoes(botoes, auxMisc["menuAtual"], i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
		}
	}
}

function naoClickHandler(ev, menus, auxMisc,botoes, auxClickHandler,auxMouseInHandler,auxMouseOutHandler){
	menus["popUpMenu"].style.display = "";			
	menus["popUpMenu"].style.zIndex  = 1;

	//se o PopUpMemu estiver no Log Reg Menu
	if (auxMisc["menuAtual"] == "loginRegMenu"){
		//Repor os lissenners
		for (var i = 0 ; i < botoes["loginRegMenu"].length; i++){
				adicionaEVLBotoes(botoes, "loginRegMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
		}

	//se o PopUpMemu estiver num jogo
	}else{
		/*botoes["pausaMenu"][6].style.opacity = 1;

		for (var i = 0 ; i < botoes["pausaMenu"].length; i++){
			if (botoes["pausaMenu"][i].style.opacity == 1 ){
				adicionaEVLBotoes(botoes, "pausaMenu", i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
			}
		}*/
	}
}


//MAIN MENU------
function campanhaClickHandler(ev, auxMisc, menus, domAux){
	menus["mainMenu"].style.display  = "";
	menus["nivelMenu"].style.display = "block";

	auxMisc["menuAtual"] = "nivelMenu";
	auxMisc["menuAntigo"] = "mainMenu";


 	var nome = auxMisc["jogadorAtual"];
 	console.log(nome);
	//document.getElementById("jogadorNivel").innerHTML = nome;
	domAux["jogadorNivel"].innerHTM = nome;
}

function infinitoClickHandler(ev, auxMisc, menus, botoes, body, naves,imgs){
	body.bgColor = "#0a131f";
	menus["mainMenu"].style.display = "";
	menus["escolhernaveMenu"].style.display = "block";

	auxMisc["menuAtual"] = "escolhernaveMenu";
	auxMisc["menuAntigo"] = "mainMenu";
	auxMisc["modoJogo"] = "infinito";

	meteNavesCertas(auxMisc, menus, botoes, naves,imgs);
}

function jogarInfinitoClickHandler(ev, auxMisc, menus, botoes, imgs, sons, musicas, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux){
	body.bgColor = "black";

	menus["escolhernaveMenu"].style.display    = "";
	menus["figuraCanvas"].style.display = "block";
	

	auxMisc["menuAtual"] = "infinito";
	auxMisc["menuAntigo"] = "escolhernaveMenu";


	removeEventListeners(botoes, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	main_infinito(auxMisc, menus, botoes, imgs, sons,musicas, body, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux);
}

function fechaJogoClickHandler(ev, auxMisc, sons, musicas, menus, body){
	menus["mainMenu"].style.display  = "";
	menu_inicial(menus, auxMisc, musicas, body);
}

function creditosClickHandler(ev, menus, auxMisc, domAux){
	menus["mainMenu"].style.display = "";
	menus["creditosMenu"].style.display = "block";
	auxMisc["menuAtual"] = "creditosMenu";
	auxMisc["menuAntigo"] = "mainMenu";


 	var nome = auxMisc["jogadorAtual"];
	//document.getElementById("jogadorCreditos").innerHTML = nome;
	domAux["jogadorCreditos"].innerHTML = nome;
}

function ajudaClickHandler(ev, menus, auxMisc, body){
	body.bgColor = "#0a131f";
	menus["mainMenu"].style.display = "";
	menus["ajudaMenu"].style.display = "block";
	auxMisc["menuAtual"] = "ajudaMenu";
	auxMisc["menuAntigo"] = "mainMenu";

}

function leaderBoardClickHandler(ev, menus, auxMisc, body, domAux){
	body.bgColor = "#0a131f";
	menus["mainMenu"].style.display = "";
	menus["leaderBoard"].style.display = "block";
	auxMisc["menuAtual"] = "leaderBoard";
	auxMisc["menuAntigo"] = "mainMenu";


 	var nome = auxMisc["jogadorAtual"];
	//document.getElementById("jogadorLeaderBoard").innerHTML = nome;
	domAux["jogadorLeaderBoard"].innerHTML = nome;
}

function controlosClickHandler(ev, menus, auxMisc, body){
	body.bgColor = "#0a131f";
	menus["mainMenu"].style.display = "";
	menus["controlosMenu"].style.display = "block";
	auxMisc["menuAtual"] = "controlosMenu";
	auxMisc["menuAntigo"] = "mainMenu";

}







//NIVEL MENU-------
function nivelClickHandler(ev, auxMisc, menus, botoes, body, nivel, naves, imgs){
	body.bgColor = "#0a131f";
	menus["nivelMenu"].style.display = "";
	menus["escolhernaveMenu"].style.display = "block";

	auxMisc["menuAtual"] = "escolhernaveMenu";
	auxMisc["menuAntigo"] = "nivelMenu";
	auxMisc["modoJogo"] = "nivel_" + nivel;

	meteNavesCertas(auxMisc, menus, botoes, naves, imgs);
}

function speedrunClickHandler(ev, auxMisc, menus, botoes, body, naves, imgs){
	body.bgColor = "#0a131f";
	menus["nivelMenu"].style.display = "";
	menus["escolhernaveMenu"].style.display = "block";

	auxMisc["menuAtual"] = "escolhernaveMenu";
	auxMisc["menuAntigo"] = "nivelMenu";
	auxMisc["modoJogo"] = "speedrun";

	meteNavesCertas(auxMisc, menus, botoes, naves, imgs);
}

function nivelMenuBack(ev,menus,auxMisc){
	menus["nivelMenu"].style.display = "";
	menus["mainMenu"].style.display = "block";

	auxMisc["menuAtual"] = "mainMenu";
	auxMisc["menuAntigo"] = "nivelMenu";
}





//ESCOLHER NAVE MENU-------
function jogarClickHandler(ev, auxMisc, menus, botoes, imgs, sons, musicas, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux){

	//ainda nao conhece controlos
	if(auxMisc["cookieStore"]["Tutorial"][0] == "0"){

		//aparecem Controlos
		body.bgColor = "#0a131f";

		menus["escolhernaveMenu"].style.display    = "";
		menus["controlosMenu"].style.display = "block";
		
		auxMisc["menuAtual"] = "controlosMenu";
		auxMisc["menuAntigo"] = "escolhernaveMenu";

		//verifica se conhece a ajuda
		if(auxMisc["cookieStore"]["Tutorial"][1] == "0" ){
			//botaoNext
			botoes["controlosMenu"][1].style.display = "block";
		}else{
			//botaoPlay
			botoes["controlosMenu"][2].style.display = "block";
		}

	//ainda nao conhece ajuda <=> Tutorial[1] == "0"
	}else if (auxMisc["cookieStore"]["Tutorial"] == "10"){
		
		//aparece Ajuda
		body.bgColor = "#0a131f";

		menus["escolhernaveMenu"].style.display    = "";
		menus["ajudaMenu"].style.display = "block";
		

		auxMisc["menuAntigo"] = "escolhernaveMenu";
		auxMisc["menuAtual"] = "ajudaMenu";

		//aparece botoes 
		botoes["ajudaMenu"][1].style.display = "block";
	
	//ja conhece os controlos e ajuda
	}else if (auxMisc["cookieStore"]["Tutorial"] == "11"){
		var modoDeJogo = auxMisc["modoJogo"].split("_")[0]; 

		botoes["ajudaMenu"][1].style.display = "";
		botoes["controlosMenu"][1].style.display = "";
		botoes["controlosMenu"][2].style.display = "";



		if ( modoDeJogo== "nivel"){
			jogarNivelClickHandler(ev, auxMisc, menus, botoes, imgs, sons,musicas, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, parseInt(auxMisc["modoJogo"].split("_")[1]), domAux );
		}
		else if (modoDeJogo == "speedrun"){
			jogarSpeedrunClickHandler(ev, auxMisc, menus, botoes, imgs, sons,musicas, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler,  body, domAux);
		}
		else if (modoDeJogo == "infinito"){
			jogarInfinitoClickHandler(ev, auxMisc, menus, botoes, imgs, sons,musicas, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux);
		}
	}
}

function jogarNivelClickHandler(ev, auxMisc, menus, botoes, imgs, sons, musicas, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, nivel, domAux){
	body.bgColor = "black";

	menus["escolhernaveMenu"].style.display    = "";
	menus["figuraCanvas"].style.display = "block";
	

	auxMisc["menuAtual"] = "nivel" + nivel + "Menu";
	auxMisc["menuAntigo"] = "escolhernaveMenu";


	removeEventListeners(botoes, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	main_campanha(auxMisc, menus, botoes, imgs, sons, musicas, body, nivel, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux);
}

function jogarSpeedrunClickHandler(ev, auxMisc, menus, botoes, imgs, sons, musicas, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux){
	body.bgColor = "black";

	menus["escolhernaveMenu"].style.display    = "";
	menus["figuraCanvas"].style.display = "block";
	

	auxMisc["menuAtual"] = "speedrun";
	auxMisc["menuAntigo"] = "escolhernaveMenu";


	removeEventListeners(botoes, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);
	main_speedrun(auxMisc, menus, botoes, imgs, sons, musicas, body, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux);
}

function direitaClickHandler(ev, auxMisc, menus, botoes, naves, imgs){

	//var dados = getCookie(auxMisc["jogadorAtual"]);
	var navesUser = auxMisc["cookieStore"]["Naves"];
	var naveAntiga = auxMisc["naveAtual"];
	auxMisc["naveAtual"] = meuMod(auxMisc["naveAtual"] -1, navesUser.length); 


	var aparece_esquerda = meuMod(auxMisc["naveAtual"] - 1,navesUser.length);
	var direita = naveAntiga;
	var saiu_direita = meuMod(auxMisc["naveAtual"] + 2, navesUser.length);

	auxiliaMudarNaves(menus, botoes,naves,imgs, navesUser, naveAntiga, aparece_esquerda, auxMisc["naveAtual"], direita, saiu_direita);
}

function esquerdaClickHandler(ev, auxMisc, menus, botoes, naves, imgs){

	//var dados = getCookie(auxMisc["jogadorAtual"]);
	var navesUser = auxMisc["cookieStore"]["Naves"];
	
	var naveAntiga = auxMisc["naveAtual"];
	auxMisc["naveAtual"] = meuMod(auxMisc["naveAtual"] + 1, navesUser.length); 


	var saiu_esquerda = meuMod(auxMisc["naveAtual"] - 2,navesUser.length);
	var esquerda = naveAntiga;
	var aparece_direita = meuMod(auxMisc["naveAtual"] + 1, navesUser.length);

	auxiliaMudarNaves(menus, botoes,naves,imgs, navesUser, naveAntiga, esquerda, auxMisc["naveAtual"], aparece_direita, saiu_esquerda);

}

function escolhernavesMenuBack(ev, menus, auxMisc, body){
	menus["escolhernaveMenu"].style.display = "";

	body.bgColor = "#00081d";
	if( auxMisc["modoJogo"] != "infinito" ){

		menus["nivelMenu"].style.display = "block";

		auxMisc["menuAtual"] = "nivelMenu";

	}else{

		menus["mainMenu"].style.display = "block";
		
		auxMisc["menuAtual"] = "mainMenu";
	}

	auxMisc["menuAntigo"] = "escolhernaveMenu";
}




//LEADERBOARD------
function leaderBoardBackClickHandler(ev, menus, auxMisc, body){
	body.bgColor = "#00081d";
	menus["leaderBoard"].style.display = "";
	menus["mainMenu"].style.display = "block";

	auxMisc["menuAtual"] = "mainMenu";
	auxMisc["menuAntigo"] = "leaderBoard";

}




//CREDITOS MENU------
function creditosBackClickHandler(ev, menus, auxMisc){
	menus["creditosMenu"].style.display = "";
	menus["mainMenu"].style.display = "block";
	
	auxMisc["menuAtual"] = "mainMenu";
	auxMisc["menuAntigo"] = "creditosMenu";

}



//CONTROLOS MENU -----
function controlosBackClickHandler(ev, menus, auxMisc,body, botoes){
	
	menus["controlosMenu"].style.display = "";

	botoes["controlosMenu"][1].style.display = "";
	botoes["controlosMenu"][2].style.display = "";

	//ja viu controlos
	auxMisc["cookieStore"]["Tutorial"] = "1"+auxMisc["cookieStore"]["Tutorial"][1];
	atualizaCoockiesTutorial(auxMisc,"1"+auxMisc["cookieStore"]["Tutorial"][1]);


	if(auxMisc["menuAntigo"] == "mainMenu"){
		body.bgColor = "#00081d";
		menus["mainMenu"].style.display = "block";
		auxMisc["menuAtual"] = "mainMenu";
		auxMisc["menuAntigo"] = "controlosMenu";
	}else{
		body.bgColor = "#0a131f";
		menus["escolhernaveMenu"].style.display = "block";
		auxMisc["menuAtual"] = "escolhernaveMenu";

		auxMisc["menuAntigo"] = "controlosMenu";
		
		botoes["ajudaMenu"][1].style.display = "";
	}
}

function controlosNextClickHandler(ev, menus, auxMisc, body, botoes, domAux){
	body.bgColor = "#0a131f";
	menus["controlosMenu"].style.display = "";
	menus["ajudaMenu"].style.display = "block";
	auxMisc["menuAtual"] = "ajudaMenu";
	auxMisc["menuAntigo"] = "controlosMenu";

	auxMisc["cookieStore"]["Tutorial"] = "1"+auxMisc["cookieStore"]["Tutorial"][1] ;
	atualizaCoockiesTutorial(auxMisc,"1"+auxMisc["cookieStore"]["Tutorial"][1]);

	botoes["ajudaMenu"][1].style.display = "block";
}

function controlosPlayClickHandler(ev, auxMisc, menus, botoes, imgs, sons, musicas, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux){
	menus["controlosMenu"].style.display = "";
	
	//ja viu controlos
	auxMisc["cookieStore"]["Tutorial"] = "1"+auxMisc["cookieStore"]["Tutorial"][1] ;
	atualizaCoockiesTutorial(auxMisc,"1"+auxMisc["cookieStore"]["Tutorial"][1]);

	jogarClickHandler(ev, auxMisc, menus, botoes, imgs, sons, musicas, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux);
}

//AJUDA MENU------
function ajudaBackClickHandler(ev, menus, auxMisc, body, domAux){
	//vai par ao menu anterior
	//se Tutorial[1] == 1 vai mainMenu; se Tutorial[1] == 0 vai controlos ou escolher naves
	if(auxMisc["menuAntigo"] == "mainMenu"){
		body.bgColor = "#00081d";
	}else{
		body.bgColor = "#0a131f";
	}

	menus["ajudaMenu"].style.display = "";
	menus[auxMisc["menuAntigo"]].style.display = "block";

	auxMisc["menuAtual"] = auxMisc["menuAntigo"];
	auxMisc["menuAntigo"] = "ajudaMenu";
	
	//ja viu ajuda
	auxMisc["cookieStore"]["Tutorial"] = auxMisc["cookieStore"]["Tutorial"][0]+"1" ;
	atualizaCoockiesTutorial(auxMisc, auxMisc["cookieStore"]["Tutorial"][0]+"1");
}

function ajudaPlayClickHandler(ev, auxMisc, menus, botoes, imgs, sons, musicas, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux){
	menus["ajudaMenu"].style.display = "";
	
	//ja viu ajuda
	auxMisc["cookieStore"]["Tutorial"] = auxMisc["cookieStore"]["Tutorial"][0]+"1" ;
	atualizaCoockiesTutorial(auxMisc, auxMisc["cookieStore"]["Tutorial"][0]+"1");

	jogarClickHandler(ev, auxMisc, menus, botoes, imgs, sons, musicas, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, body, domAux);
}

//Handlers ^^^^^^






















//Funcoes Auxiliares  vvvvvvvv
function secret(ev, auxMisc, menus, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux){
	var naveADesbloquear = 4;

	//verifica s eesta no main Menu e se ainda nao tem a nave e se o popUp nao esta a ser usado
	if(auxMisc["menuAtual"] == "mainMenu" && menus["pausaMenu"].style.display == "" && auxMisc["cookieStore"]["Naves"][naveADesbloquear] != "1" && menus["popUpMenu"].style.display == ""){
		auxMisc["secretProgress"] += ev.code;

		if(auxMisc["secretPress"] == auxMisc["secretProgress"]){
			naveDesbloqueia(naveADesbloquear, auxMisc, menus, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux);	
		}

	}
}

function naveDesbloqueia(naveADesbloquear, auxMisc, menus, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux){
	var navesStr = "";

	//atualiza as naves	
	atualizaCoockiesNaves(auxMisc,naveADesbloquear);
 	for(var i = 0; i < auxMisc["cookieStore"]["Naves"].length; i++){

 		if(i == naveADesbloquear){
 			navesStr += "1";
 		}else{
 			navesStr += auxMisc["cookieStore"]["Naves"][i];
 		}
 	}
 	auxMisc["cookieStore"]["Naves"] = navesStr;


 	//var texto = document.getElementById("textoPop");
 	var  texto = domAux["textoPop"];

	texto.innerHTML = "Parabens!!! Desbloqueou a nave "+ naveADesbloquear;

	botoes["popUpMenu"][0].style.display = "none";
	botoes["popUpMenu"][1].style.display = "block";
	botoes["popUpMenu"][2].style.display = "none";
	
	menus["popUpMenu"].style.display = "block";

	//REMOVER EVENTLISENNERS DOS BOTOES
	for (var i = 0 ; i < botoes["mainMenu"].length; i++){
		botoes["mainMenu"][i].removeEventListener("click",auxClickHandler);
		botoes["mainMenu"][i].removeEventListener("mouseover",auxMouseInHandler);
		botoes["mainMenu"][i].removeEventListener("mouseout",auxMouseOutHandler);	
		botoes["mainMenu"][i].style.opacity = 1;
	}
}

function desbloqueiaNavePorNivel(nivelCompletado, auxMisc, menus, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux){
	switch(nivelCompletado){ 
		case(2):    naveDesbloqueia(3, auxMisc, menus, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux);break;
		case(-11):  naveDesbloqueia(2, auxMisc, menus, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler, domAux);break;
	}
}


function tocaMusica(musicas, nivel){

	//para todas as musicas a tocar 
	for(let key in musicas){
		for ( let i = 0; i < Object.keys(musicas[key]).length; i++){
			musicas[key][i].pause();
			musicas[key][i].currentTime = 0;
		}
	}


	//infinito
	if(nivel == -1){
		musicas["infinito"][0].loop = true;
		musicas["infinito"][0].load();
		musicas["infinito"][0].play().catch(function(){});
	//campanha
	}else{
		musicas["campanha"][nivel - 1].loop = true;
		musicas["campanha"][nivel - 1].load();
		musicas["campanha"][nivel - 1].play().catch(function(){});
	}
}

function preparaBotaoSomMusica(sons, musicas, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	//som no maximo
	if(sons["botoes"][0].volume +0.2 > 1){
		botoes["pausaMenu"][5].style.opacity = 0.3;	
		
		botoes["pausaMenu"][5].removeEventListener("click",auxClickHandler);
		botoes["pausaMenu"][5].removeEventListener("mouseover",auxMouseInHandler);
		botoes["pausaMenu"][5].removeEventListener("mouseout",auxMouseOutHandler);	
	
	//som no minimo
	}else if (sons["botoes"][0].volume -0.2 < 0){
		botoes["pausaMenu"][3].style.opacity = 0.3;	
		
		botoes["pausaMenu"][3].removeEventListener("click",auxClickHandler);
		botoes["pausaMenu"][3].removeEventListener("mouseover",auxMouseInHandler);
		botoes["pausaMenu"][3].removeEventListener("mouseout",auxMouseOutHandler);	

		botoes["pausaMenu"][4].style.opacity = 0.3;	
		
		botoes["pausaMenu"][4].removeEventListener("click",auxClickHandler);
		botoes["pausaMenu"][4].removeEventListener("mouseover",auxMouseInHandler);
		botoes["pausaMenu"][4].removeEventListener("mouseout",auxMouseOutHandler);	
	}


	//musica no maximo
	if(musicas["musica"][0].volume + 0.2 > 1){
		botoes["pausaMenu"][2].style.opacity = 0.3;	
		
		botoes["pausaMenu"][2].removeEventListener("click",auxClickHandler);
		botoes["pausaMenu"][2].removeEventListener("mouseover",auxMouseInHandler);
		botoes["pausaMenu"][2].removeEventListener("mouseout",auxMouseOutHandler);	
	
	//musica no minimo
	}else if (musicas["musica"][0].volume -0.2 < 0){
		botoes["pausaMenu"][0].style.opacity = 0.3;	
		
		botoes["pausaMenu"][0].removeEventListener("click",auxClickHandler);
		botoes["pausaMenu"][0].removeEventListener("mouseover",auxMouseInHandler);
		botoes["pausaMenu"][0].removeEventListener("mouseout",auxMouseOutHandler);	

		botoes["pausaMenu"][1].style.opacity = 0.3;	
	
		botoes["pausaMenu"][1].removeEventListener("click",auxClickHandler);
		botoes["pausaMenu"][1].removeEventListener("mouseover",auxMouseInHandler);
		botoes["pausaMenu"][1].removeEventListener("mouseout",auxMouseOutHandler);	
	}
}

function adicionaEVLBotoes(botoes, key, i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	botoes[key][i].addEventListener("click", auxClickHandler);
	botoes[key][i].addEventListener("mouseover", auxMouseInHandler);
	botoes[key][i].addEventListener("mouseout", auxMouseOutHandler);
}

function removeEVLBotoes(botoes, key, i, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	botoes[key][i].removeEventListener("click", auxClickHandler);
	botoes[key][i].removeEventListener("mouseover", auxMouseInHandler);
	botoes[key][i].removeEventListener("mouseout", auxMouseOutHandler);
}

function auxiliaMudarNaves(menus, botoes, naves, imgs, navesUser, naveAntiga, esquerda, meio, direita, saiu){
	//esquerda
	if (parseInt(navesUser[esquerda]) == 1 ){
		naves[esquerda][1].style.left = "280px" ;
		naves[esquerda][1].style.top = "200px" ;
		naves[esquerda][1].style.display = "block" ;
		naves[esquerda][1].style.opacity = 0.3;

		naves[esquerda][1].width  = imgs["imgsMenus"]["nave"+1][esquerda].naturalWidth/2 ;
		naves[esquerda][1].height = imgs["imgsMenus"]["nave"+1][esquerda].naturalHeight/2;
	}else{
		naves[esquerda][0].style.left = "280px" ;
		naves[esquerda][0].style.top = "200px" ;
		naves[esquerda][0].style.display = "block" ;
		naves[esquerda][0].style.opacity = 0.3;

		naves[esquerda][0].width  = imgs["imgsMenus"]["nave"+0][esquerda].naturalWidth/2 ;
		naves[esquerda][0].height = imgs["imgsMenus"]["nave"+0][esquerda].naturalHeight/2;
	}


	//nave meio
	if (parseInt(navesUser[meio]) == 1 ){
		botoes["escolhernaveMenu"][2].style.display = "block";

		naves[meio][1].style.left = "510px" ;
		naves[meio][1].style.top = "100px" ;
		naves[meio][1].style.display = "block" ;
		naves[meio][1].style.opacity = 1;

		naves[meio][1].width  = imgs["imgsMenus"]["nave"+1][meio].naturalWidth ;
		naves[meio][1].height = imgs["imgsMenus"]["nave"+1][meio].naturalHeight;
	}else{
		botoes["escolhernaveMenu"][2].style.display = "none";

		naves[meio][0].style.left = "510px" ;
		naves[meio][0].style.top = "100px" ;
		naves[meio][0].style.display = "block" ;
		naves[meio][0].style.opacity = 1;

		naves[meio][0].width  = imgs["imgsMenus"]["nave"+0][meio].naturalWidth ;
		naves[meio][0].height = imgs["imgsMenus"]["nave"+0][meio].naturalHeight;

	}

	//direita
	if (parseInt(navesUser[direita]) == 1 ){
		naves[direita][1].style.left = "860px" ;
		naves[direita][1].style.top = "200px" ;
		naves[direita][1].style.display = "block" ;
		naves[direita][1].style.opacity = 0.3;

		naves[direita][1].width  = imgs["imgsMenus"]["nave"+1][direita].naturalWidth/2 ;
		naves[direita][1].height = imgs["imgsMenus"]["nave"+1][direita].naturalHeight/2;
	}else{
		naves[direita][0].style.left = "860px" ;
		naves[direita][0].style.top = "200px" ;
		naves[direita][0].style.display = "block";
		naves[direita][0].style.opacity = 0.3;

		naves[direita][0].width  = imgs["imgsMenus"]["nave"+0][direita].naturalWidth/2 ;
		naves[direita][0].height = imgs["imgsMenus"]["nave"+0][direita].naturalHeight/2;
	}

	//saiu 

	if(saiu != "aqui saiu nao existe"){
		naves[saiu][0].style.display = "" ;
		naves[saiu][1].style.display = "" ;

		//textos
		menus["escolhernaveMenu"].children["CaixaAc"].children["nave"+naveAntiga].style.display = "";
		menus["escolhernaveMenu"].children["CaixaSpecs"].children["nave"+naveAntiga].style.display = "";
	}


	//textos
	menus["escolhernaveMenu"].children["CaixaAc"].children["nave"+meio].style.display = "block";
	menus["escolhernaveMenu"].children["CaixaSpecs"].children["nave"+meio].style.display = "block";
}




function meteNavesCertas(auxMisc, menus, botoes, naves, imgs){

	//var dados = getCookie(auxMisc["jogadorAtual"]);
	var navesUser = auxMisc["cookieStore"]["Naves"];
	
	let nNaves = (menus["escolhernaveMenu"].childElementCount-6)/2 ; 
	auxMisc["naveAtual"] = 0;


	//apaga tudo ao inicio
	for (let i = 0 ; i < nNaves;i++){
		naves[i][0].style.display = "";
		naves[i][1].style.display = "";
	}
	for (let i = 0 ; i < nNaves;i++){
		menus["escolhernaveMenu"].children["CaixaAc"].children["nave"+i].style.display = "";
		menus["escolhernaveMenu"].children["CaixaSpecs"].children["nave"+i].style.display = "";
	}


	var esquerda = meuMod(auxMisc["naveAtual"] - 1,nNaves);
	var direita = meuMod(auxMisc["naveAtual"] + 1, nNaves);


	auxiliaMudarNaves(menus, botoes,naves,imgs, navesUser, "nao ha nave antiga", esquerda, auxMisc["naveAtual"], direita, "aqui saiu nao existe");
}



function domNaves(menus){
	var naves = [];
	let nNaves = (menus["escolhernaveMenu"].childElementCount-6)/2 ; 

	//naves
	for (let i = 0 ; i < nNaves;i++){
		naves[i] = []
		var naveLocked = menus["escolhernaveMenu"].children["nave0_"+i];
		naves[i].push(naveLocked);
		var nave = menus["escolhernaveMenu"].children["nave1_"+i];
		naves[i].push(nave);
	}

	return naves;
}


function meuMod(n, m) {
  return ((n % m) + m) % m;
}

function MenuPausaToggle(botoes, menus, auxMisc, sons, musicas, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){

	preparaBotaoSomMusica(sons, musicas, botoes, auxClickHandler, auxMouseInHandler, auxMouseOutHandler);

	botoes["pausaMenu"][6].style.display = "none";

		// so clica nas opçoes se o popUpMenu estyiver ""
	if(menus["pausaMenu"].style.display == "" && menus["popUpMenu"].style.display == ""){
		menus["pausaMenu"].style.display = "block";

		sons["esc"][0].load();
		sons["esc"][0].play().catch(function(){});

		for (var i = 0 ; i < botoes[auxMisc["menuAtual"]].length; i++){
			botoes[auxMisc["menuAtual"]][i].removeEventListener("click",auxClickHandler);
			botoes[auxMisc["menuAtual"]][i].removeEventListener("mouseover",auxMouseInHandler);
			botoes[auxMisc["menuAtual"]][i].removeEventListener("mouseout",auxMouseOutHandler);
		}

	}		//se estavamos num joo e desbloqueamos a nave, so caregamso nas opçoes quando desaparece ro popUpMenu
	else if (menus["popUpMenu"].style.display == ""){
		menus["pausaMenu"].style.display = "";

		sons["esc"][1].load();
		sons["esc"][1].play().catch(function(){});

		for (var i = 0 ; i < botoes[auxMisc["menuAtual"]].length; i++){
			botoes[auxMisc["menuAtual"]][i].addEventListener("click", auxClickHandler);
			botoes[auxMisc["menuAtual"]][i].addEventListener("mouseover", auxMouseInHandler);
			botoes[auxMisc["menuAtual"]][i].addEventListener("mouseout", auxMouseOutHandler);
		}

	}


}


function removeEventListeners(botoes, auxKeyDownHandler, auxClickHandler, auxMouseInHandler, auxMouseOutHandler){
	window.removeEventListener("keydown",auxKeyDownHandler);	

	for (let key in botoes){
		if (key != "pausaMenu"){
		
			for(let i = 0; i < botoes[key].length; i ++){
				botoes[key][i].removeEventListener("click", auxClickHandler);
				botoes[key][i].removeEventListener("mouseover", auxMouseInHandler);
				botoes[key][i].removeEventListener("mouseout", auxMouseOutHandler);
			}
		
		}
	}
}


function menu_inicial(menus, auxMisc, musicas, body){
	body.bgColor = "#00083b";

	if(auxMisc["menuAntigo"] == "nada"){
		musicas["musica"][0].loop = true;
		musicas["musica"][0].load();
		musicas["musica"][0].play().catch(function(){});
	}

	menus["startMenu"].style.display = "block";

	auxMisc["menuAtual"] = "startMenu";
	auxMisc["menuAntigo"] = "nada";



}


function menu_principal(menus, auxMisc, musicas, body){
	body.bgColor = "#00081d";
	menus["figuraCanvas"].style.display = "";
	menus["loginRegMenu"].style.display = "";
	menus["mainMenu"].style.display = "block";

	if (auxMisc["menuAtual"] == "loginRegMenu"){
		auxMisc["menuAntigo"] = "loginRegMenu";
	}
	else{
		auxMisc["menuAntigo"] = "algumJogo;_;";


		//para todas as musicas a tocar 
		for(let key in musicas){
			for ( let i = 0; i < Object.keys(musicas[key]).length; i++){
				musicas[key][i].pause();
				musicas[key][i].currentTime = 0;
			}
		}

		//musicas["musica"][0].loop = true;
		musicas["musica"][0].load();
		musicas["musica"][0].play().catch(function(){});
		menus["pausaMenu"].style.display = "";
	}

	auxMisc["menuAtual"] = "mainMenu";

	trataDasCookies(menus, auxMisc);
	
}


function login(nome, menus, auxMisc, musicas, body, botoes, domAux){
	auxMisc["jogadorAtual"] = nome;
	//document.getElementById("jogadorMain").innerHTML = nome;
	domAux["jogadorMain"].innerHTML = nome; 

	menu_principal(menus, auxMisc, musicas, body);
	//trataDasCookies(menus, auxMisc);
	desbloqueiaNiveis(botoes, nome);
}

function desbloqueiaNiveis(botoes, nome){
	var dados = getCookie(nome);
	for(var i = 0; i < parseInt(dados[0]) + 1; i++){
		botoes["nivelMenu"][i].style.display = "block";
	}

	for(;i < botoes["nivelMenu"].length -1 ;i++){
		botoes["nivelMenu"][i].style.display = "";
	}

}


function trataDasCookies(menus, auxMisc){
	//Guardamos o progresso de todos os jogadores que alguma vez jogaram o jogo
	// {"player1": [0,0,0,"1100",1] , "player2": [1,123,0,"1000",0]}
	var jogadores = parseDasCookies();
	//Guardamos os jogadores/recordes da LeaderBoard
	//{"Campanha": {"player1": 45 ,"jogoCampanha":27 } ,"Infinito":{"player1": 332388,"eu": 3442} }
	var recordes  = criaRecordeArray(jogadores, auxMisc);
	preencheLeaderBoard(recordes, menus);


	auxMisc["cookieStore"]["Tutorial"] = jogadores[auxMisc["jogadorAtual"]][4];
	auxMisc["cookieStore"]["Naves"] = jogadores[auxMisc["jogadorAtual"]][3];
}


//Fazemos parse nas cookies para ficarmos com todos os jogadores
function parseDasCookies() {
	//Guardamos o progresso de todos os jogadores que alguma vez jogaram o jogo
	// {"player1": [0,0,0,"1000"] , "player2": [1,123,0,"1110"]}
	var jogadores = {};
	var nome;

	var decodedCookies = decodeURIComponent(document.cookie);
	var splitedCookies = decodedCookies.split(';');
	for(let cookie in splitedCookies) {
		var splitedCookie = splitedCookies[cookie].split('=');

		while(splitedCookie[0][0] == ' '){
			splitedCookie[0] = splitedCookie[0].substring(1);
		}

		if (splitedCookie[0].indexOf("Nivel") != -1) {
			nome = splitedCookie[0].substring(0,splitedCookie[0].indexOf("Nivel"));
			if(jogadores[nome] == undefined){
				jogadores[nome] = new Array();
			}
			jogadores[nome][0] = splitedCookie[1];

		}else if (splitedCookie[0].indexOf("Campanha") != -1) {
			nome = splitedCookie[0].substring(0,splitedCookie[0].indexOf("Campanha"));
			if(jogadores[nome] == undefined){
				jogadores[nome] = new Array();
			}
			jogadores[nome][1] = splitedCookie[1];

		}else if (splitedCookie[0].indexOf("Infinito") != -1) {
			nome = splitedCookie[0].substring(0,splitedCookie[0].indexOf("Infinito"));
			if(jogadores[nome] == undefined){
				jogadores[nome] = new Array();
			}
			jogadores[nome][2] = splitedCookie[1];
		}
		else if (splitedCookie[0].indexOf("Naves") != -1) {
			nome = splitedCookie[0].substring(0,splitedCookie[0].indexOf("Naves"));
			if(jogadores[nome] == undefined){
				jogadores[nome] = new Array();
			}
			jogadores[nome][3] = splitedCookie[1];
		}
		else if (splitedCookie[0].indexOf("Tutorial") != -1) {
			nome = splitedCookie[0].substring(0,splitedCookie[0].indexOf("Tutorial"));
			if(jogadores[nome] == undefined){
				jogadores[nome] = new Array();
			}
			jogadores[nome][4] = splitedCookie[1];
		}
		
	}

	return jogadores;
}


function criaRecordeArray(jogadores, auxMisc){
	//Guardamos os jogadores/recordes da LeaderBoard
	//{"Campanha": {"player1": 45 ,"jogoCampanha":27 } ,"Infinito":{"player1": 332388,"eu": 3442} }
	var recordes = {"Campanha":{}, "Infinito":{} };

	for (let user in jogadores){
		//verificar se ja tem os niveis todos desbloqueados
		if (jogadores[user][0] == auxMisc["maxNivel"] && jogadores[user][1] != 0){
			//coloca o jogador no dict dos recordes
			recordes["Campanha"][user] = jogadores[user][1];
		}
		if (jogadores[user][2] != 0){
			//coloca o jogador no dict dos recordes
			recordes["Infinito"][user] = jogadores[user][2];
		}
	}

	// Organizamos Campanha
	// Create items array
	var items = Object.keys(recordes["Campanha"]).map(function(key) {
		return [key, recordes["Campanha"][key]];
	});

	// Sort the array based on the second element
	items.sort(function(first, second) {
		return second[1] - first[1];
	});

	var aux = {"Campanha":{}  };
	for (let i = 0;i < items.length;i++){
		aux["Campanha"][items[i][0]] = items[i][1];
	}
	recordes["Campanha"] = aux["Campanha"];



	// Organizamos Infinito
	// Create items array
	var items = Object.keys(recordes["Infinito"]).map(function(key) {
		return [key, recordes["Infinito"][key]];
	});

	// Sort the array based on the second element
	items.sort(function(first, second) {
		return second[1] - first[1];
	});

	var aux = {"Infinito":{}  };
	for (let i = 0;i < items.length;i++){
		aux["Infinito"][items[i][0]] = items[i][1];
	}
	recordes["Infinito"] = aux["Infinito"];

	return recordes;
}

function preencheLeaderBoard(recordes,menus){
	var lista = menus["leaderBoard"].children["TabelaLeaderBoard"].children["listaC"];
	var player = lista.children["playerC"];
	var resultado = lista.children["score"];

	//o var fica de fora para saber onde acabou
	var i;

	//CAMPANHA
	for (i = 0; i < 6 && i < Object.keys(recordes["Campanha"]).length; i++){
		player.children[i].innerHTML    = Object.keys(recordes["Campanha"])[i];
		resultado.children[i].innerHTML = Object.values(recordes["Campanha"])[i];
	}
	for (;i < 6; i++){
		player.children[i].innerHTML    = "";
		resultado.children[i].innerHTML = "";
	}

	var lista = menus["leaderBoard"].children["TabelaLeaderBoard"].children["listaI"];
	var player = lista.children["playerI"];
	var resultado = lista.children["time"];

	//INFINITO
	for (i = 0; i < 6 && i < Object.keys(recordes["Infinito"]).length; i++){
		player.children[i].innerHTML = Object.keys(recordes["Infinito"])[i];
		resultado.children[i].innerHTML = Object.values(recordes["Infinito"])[i];
	}
	for (;i < 6; i++){
		player.children[i].innerHTML    = "";
		resultado.children[i].innerHTML = "";
	}
}



function setCookie(nome, nivel, valorCampanha, valorInfinito, naves, valorTutorial) {

	document.cookie = nome + "Nivel=" 	+ nivel 		+ ";expires=Thu, 02 Jan 2020 00:00:00 UTC;path=/";
	document.cookie = nome + "Campanha="  + valorCampanha + ";expires=Thu, 02 Jan 2020 00:00:00 UTC;path=/";
	document.cookie = nome + "Infinito="  + valorInfinito + ";expires=Thu, 02 Jan 2020 00:00:00 UTC;path=/";
	document.cookie = nome + "Naves="  + naves + ";expires=Thu, 02 Jan 2020 00:00:00 UTC;path=/";
	document.cookie = nome + "Tutorial="  + valorTutorial + ";expires=Thu, 02 Jan 2020 00:00:00 UTC;path=/";

}

//return Dados do jogador se ele existir
//return false se o jogador nao existir
function getCookie(nome) {
	var dados = new Array(5);
	var procuraNivel 	= nome + "Nivel";
	var procuraCampanha = nome + "Campanha";
	var procuraInfinito = nome + "Infinito";
	var procuraNaves    = nome + "Naves";
	var procuraTutorial = nome + "Tutorial";

	var contador = 0;


	var decodedCookies = decodeURIComponent(document.cookie);
	var splitedCookies = decodedCookies.split(';');
	for(let cookie in splitedCookies) {
		var splitedCookie = splitedCookies[cookie].split('=');

		while(splitedCookie[0][0] == ' '){
			splitedCookie[0] = splitedCookie[0].substring(1);
		}

		if(splitedCookie[0].indexOf(nome) == 0 && (splitedCookie[0].substring(nome.length) == "Nivel" || splitedCookie[0].substring(nome.length) == "Campanha" || splitedCookie[0].substring(nome.length) == "Infinito" || splitedCookie[0].substring(nome.length) == "Naves"|| splitedCookie[0].substring(nome.length) == "Tutorial") ) {
			if (splitedCookie[0].indexOf(procuraNivel) == 0) {
				dados[0] = splitedCookie[1];
			}
			else if (splitedCookie[0].indexOf(procuraCampanha) == 0) {
				dados[1] = splitedCookie[1];
			}
			else if (splitedCookie[0].indexOf(procuraInfinito) == 0) {
				dados[2] = splitedCookie[1];
			}
			else if (splitedCookie[0].indexOf(procuraNaves) == 0) {
				dados[3] = splitedCookie[1];
			}
			else if (splitedCookie[0].indexOf(procuraTutorial) == 0) {
				dados[4] = splitedCookie[1];
			}

			contador++;
			if(contador == 5){
				return dados;
			}
		}
	}
	return false;
}


//return false se jogador nao existir
//return true se o jogador existir
function checkCookie(nome) {
	var username = getCookie(nome);
	if (username == false){
		return false;
	}
	else{
		return true;
	}
}

function deleteCookie(name) {
	document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
}








function atualizaCoockiesNivel(auxMisc, botoes, nivel){
 	var nome  = auxMisc["jogadorAtual"];
 	var dados = getCookie(nome);
 	if(parseInt(dados[0]) == nivel - 1){
 		dados[0] = nivel;
 		botoes["nivelMenu"][dados[0]].style.display = "block";
 		setCookie(nome, dados[0], dados[1], dados[2], dados[3],dados[4]);
 		return nivel;
 	}
 	return -1;
}

function atualizaCoockiesCampanha(auxMisc, botoes, pontos){
 	var nome  = auxMisc["jogadorAtual"];
 	var dados = getCookie(nome);
 	if(parseInt(dados[1]) < pontos){
 		setCookie(nome, dados[0], pontos, dados[2], dados[3],dados[4]);
 	}
}

function atualizaCoockiesInfinito(auxMisc, botoes, pontos){
 	var nome  = auxMisc["jogadorAtual"];
 	var dados = getCookie(nome);
 	if(parseInt(dados[2]) < pontos){
 		setCookie(nome, dados[0], dados[1], pontos, dados[3],dados[4]);
 	}
}


function atualizaCoockiesNaves(auxMisc, nave){
 	var nome  = auxMisc["jogadorAtual"];
 	var dados = getCookie(nome);
 	/*var navesStr = "";


 	for(var i = 0; i < dados[3].length; i++){

 		if(i == nave){
 			navesStr += "1";
 		}else{
 			navesStr += dados[3][i];
 		}
 	}*/

 	if(dados[3].charAt(nave) == "0"){
		dados[3] = dados[3].substring(0, nave) + "1" + dados[3].substring(nave + 1, 5);
		setCookie(nome, dados[0], dados[1], dados[2], dados[3], dados[4]);
 	}
}


function atualizaCoockiesTutorial(auxMisc, valorControloAjuda){
 	var nome  = auxMisc["jogadorAtual"];
 	var dados = getCookie(nome);
	setCookie(nome, dados[0], dados[1], dados[2], dados[3], valorControloAjuda);
}

