"use strict";


function loadEndingHandlers(auxMisc, menus, buttons, imgs, sounds, musics, body, domAux, player, domSpaceships){

	function initEndHandler(ev){
		window.removeEventListener("initEnd", initEndHandler);
		firstMenu(menus, auxMisc, musics, body);
		menuListeners(auxMisc, menus, buttons, imgs, sounds, musics, body, domSpaceships(menus), domAux, player);
	}

	function initSoundsEndHandler(ev){
		window.removeEventListener("initSoundsEnd", initSoundsEndHandler);
		window.addEventListener("initEnd", initEndHandler);

		calculateMonitorRefreshRate(auxMisc);
	}

	function initMusicsEndHandler(ev){
		window.removeEventListener("initMusicsEnd", initMusicsEndHandler);
		window.addEventListener("initSoundsEnd", initSoundsEndHandler);

		//load the sounds of the game
		nToLoad = {"rockets" : 1 , "buttons" : 2 ,"esc" : 2 };
		sounds 	= {"rockets" : [], "buttons" : [],"esc" : []};


		initSounds(nToLoad, sounds);
	}

	function initImagesEndHandler(ev){
		window.removeEventListener("initImagesEnd", initImagesEndHandler);
		window.addEventListener("initMusicsEnd", initMusicsEndHandler);

		//load the music of the game
		nToLoad  = {"campain" : 3 ,"endless" : 1 , "boss" : 2 ,"music": 1 };
		musics   = {"campain" : [],"endless" : [], "boss" : [],"music": []};


		initMusics(nToLoad, musics);
	}


	function initMenuEndHandler(ev){
		window.removeEventListener("initMenuEnd", initMenuEndHandler);
		window.addEventListener("initImagesEnd", initImagesEndHandler);

		//load the imagens of the game
		var nToLoad = { "spaceship" : 5 , "enemies" : 2 , "boss" : 2 , "asteroids" : 1 , "powerups" : 9 , "others" : 1, "rockets" : 1 , "enemyRockets" : 1 , "background" : 1 , "explosions" : 1 , "gameover" : 2 , "win" : 1 };
		var nLoaded = { "spaceship" : 0 , "enemies" : 0 , "boss" : 0 , "asteroids" : 0 , "powerups" : 0 , "others" : 0, "rockets" : 0 , "enemyRockets" : 0 , "background" : 0 , "explosions" : 0 , "gameover" : 0 , "win" : 0 };
		imgs 	    = { "spaceship" : [], "enemies" : [], "boss" : [], "asteroids" : [], "powerups" : [], "others" : [],"rockets" : [], "enemyRockets" : [], "background" : [], "explosions" : [], "gameover" : [], "win" : []};
		
		initImages(nLoaded, nToLoad, imgs, imgsMenu);

	}

	window.addEventListener("initMenuEnd", initMenuEndHandler);

}

