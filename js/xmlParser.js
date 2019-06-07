"use strict";


function readXML(rawFile, enemyEntities, imgs){
	var allText = rawFile.responseText;
    var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(allText,"text/xml");

	var enemies = xmlDoc.children;
	if(enemies[0].tagName == "enemies"){
		var everyEnemies = enemies[0].children;
		if(everyEnemies[0].tagName == "parsererror"){
			console.log("erro nos enemies");
			return;
		}
		for (let i = 0; i < everyEnemies.length; i++){
			if(everyEnemies[i].tagName == "normal"){
				var normal_tratado = new Array();
				var normal = everyEnemies[i];
				if(normal.children[0].tagName == "parsererror"){
					console.log("erro nos normal");
					return;
				}
				for(let j = 0; j < normal.children.length; j++){
					if(normal.children[j].children.length == 0){
						var spaceships_pre_tratamento = normal.children[j].innerHTML.split(" ");
						var array_aux = new Array();
						for (let k = 0; k < spaceships_pre_tratamento.length; k++){
							var spaceships = spaceships_pre_tratamento[k].split("-");
							if(spaceships.length == 4){
								spaceships[0] = parseInt(spaceships[0]);
								spaceships[1] = parseFloat(spaceships[1]);
								spaceships[2] = parseInt(spaceships[2]);
								if(spaceships[3] != "n"){
									spaceships[3] = parseInt(spaceships[3]);
								}
								if (spaceships[0] >= 0 && spaceships[0] < imgs["enemies"].length      &&
									spaceships[1] >  0                                            &&
									spaceships[2] >= 0 && spaceships[2] < 6                            && //podia no ser 6
									(spaceships[3] == "n" ||
									spaceships[3] >= 0 && spaceships[3] < imgs["powerups"].length)){
									array_aux.push(spaceships);
								}
								else{
									console.log("spaceship no existente, ou tamanho impossivel, level mal feito");
									return;
								}
							}
							else{
								console.log("erro numa spaceship");
								return;
							}
						}
						if (array_aux.length == 0){
							console.log("erro nos indexs das spaceships");
							return;
						}
						normal_tratado.push(array_aux);
					}
					else{
						console.log("erro");
						return;
					}
				}
				enemyEntities[0] = normal_tratado;
			}
			else if(everyEnemies[i].tagName == "boss"){
				var boss_tratado = new Array();
				var boss_pre_tratamento = everyEnemies[i];

				if(boss_pre_tratamento.children.length == 0){
					var boss = boss_pre_tratamento.innerHTML.split("-");
					if (boss.length == 2){
						boss_tratado.push(parseInt(boss[0]));
						boss_tratado.push(parseFloat(boss[1]));
						if(boss_tratado[0] >= 0 && boss_tratado[0] < imgs["boss"].length && boss[1] > 0){
							enemyEntities.push(boss_tratado);
						}
						else{
							console.log("Boss com index ou tamanho no permitido");
							return;
						}
					}
					else{
						console.log("Erro no boss");
						return;
					}
				}
				else{
					console.log("Erro na formatacao do boss (no pode ter filhos)");
					return;
				}
			}
		}
	}
}