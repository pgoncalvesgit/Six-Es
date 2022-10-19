"use strict";

function isEnemyWellFormatted(enemy_list_dom_element, enemyEntities, imgs){

	var normal_tratado = new Array();

	if(enemy_list_dom_element.children[0].tagName == "parsererror"){
		console.log("XML not well formatted");
		return false;
	}

	for(let j = 0; j < enemy_list_dom_element.children.length; j++){
		var enemy_dom_element = enemy_list_dom_element.children[j]

		if(enemy_dom_element.children.length != 0){
			console.log("Error - Enemy has no children");
			return false;
		}

		var enemy_list = enemy_dom_element.innerHTML.split(" ");

		for (let k = 0; k < enemy_list.length; k++){
			
			var enemies = enemy_list[k].split("-");

			if(enemies.length != 4){
				console.log("Error in the description of an enemy");
				return false;
			}

			// enemy properties treatment
			// index
			enemies[0] = parseInt(enemies[0]);
			// size
			enemies[1] = parseFloat(enemies[1]);
			// level?
			enemies[2] = parseInt(enemies[2]);
			// has powerup or not
			if(enemies[3] != "n"){
				enemies[3] = parseInt(enemies[3]);
			}

			//check index
			if (enemies[0] < 0 || enemies[0] >= imgs["enemies"].length){
				console.log("Enemy spaceship with wrong index");
				return false;
			}

			if (enemies[1] <= 0){
				console.log("Enemy spaceship with an invalid size");
				return false;
			}

			if (enemies[2] < 0 || enemies[2] >= 6){
				console.log("Invalid Level??? (need to confirm)");
				return false;
			}

			if (enemies[3] != "n" && (enemies[3] < 0 || enemies[3] >= imgs["powerups"].length)){
				console.log("Enemy spaceship with an invalid powerup");
				return false;
			}
			
		}

		normal_tratado.push(enemies);
	}

	enemyEntities[0] = (new Array()).push(normal_tratado);
	
	return true;
}

function isBossWellFormatted(boss_dom_element, enemyEntities, imgs){

	
	if(boss_dom_element.children.length != 0){
		console.log("Formatting error in the boss (no childs allowed)");
		return false;
	}

	var boss_elements = boss_dom_element.innerHTML.split("-");

	if (boss_elements.length != 2){
		console.log("Error in the boss");
		return false;
	}

	//Cleaning the elements
	boss_elements[0] = parseInt(boss_elements[0]);
	boss_elements[1] = parseFloat(boss_elements[1]);

	//old if:
	//if(!(boss_elements[0] >= 0 && boss_elements[0] < imgs["boss"].length && boss_elements[1] > 0)){
	
	// check index
	if(boss_elements[0] < 0 || boss_elements[0] >= imgs["boss"].length){
		console.log("Boss with invalid index.");
		return false;
	}

	// check size
	if(boss_elements[1] <= 0){
		console.log("Boss with invalid size");
		return false;
	}
	
	enemyEntities.push(boss_elements);
	
	return true;
}


function readXML(rawFile, enemyEntities, imgs){
	var allText = rawFile.responseText;
    var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(allText,"text/xml");

	var enemies = xmlDoc.children;
	if(enemies[0].tagName != "enemies"){
		console.log("no enemies in the level");
		return;
	}
	var everyEnemies = enemies[0].children;
	if(everyEnemies[0].tagName == "parsererror"){
		console.log("error on the enemies");
		return;
	}
	
	for (let i = 0; i < everyEnemies.length; i++){
		if(everyEnemies[i].tagName == "normal"){
			isEnemyWellFormatted(everyEnemies[i], enemyEntities, imgs);
		}
		else if(everyEnemies[i].tagName == "boss"){
			isBossWellFormatted(everyEnemies[i], enemyEntities, imgs);
		}
	}
}
