"use strict";


function leXml(rawFile, entidadesInimigas, imgs){
	var allText = rawFile.responseText;
    var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(allText,"text/xml");

	var inimigos = xmlDoc.children;
	if(inimigos[0].tagName == "inimigos"){
		var todosInimigos = inimigos[0].children;
		if(todosInimigos[0].tagName == "parsererror"){
			console.log("erro nos inimigos");
			return;
		}
		for (let i = 0; i < todosInimigos.length; i++){
			if(todosInimigos[i].tagName == "normais"){
				var normais_tratado = new Array();
				var normais = todosInimigos[i];
				if(normais.children[0].tagName == "parsererror"){
					console.log("erro nos normais");
					return;
				}
				for(let j = 0; j < normais.children.length; j++){
					if(normais.children[j].children.length == 0){
						var naves_pre_tratamento = normais.children[j].innerHTML.split(" ");
						var array_aux = new Array();
						for (let k = 0; k < naves_pre_tratamento.length; k++){
							var naves = naves_pre_tratamento[k].split("-");
							if(naves.length == 4){
								naves[0] = parseInt(naves[0]);
								naves[1] = parseFloat(naves[1]);
								naves[2] = parseInt(naves[2]);
								if(naves[3] != "n"){
									naves[3] = parseInt(naves[3]);
								}
								if (naves[0] >= 0 && naves[0] < imgs["inimigos"].length      &&
									naves[1] >  0                                            &&
									naves[2] >= 0 && naves[2] < 6                            && //podia nao ser 6
									(naves[3] == "n" ||
									naves[3] >= 0 && naves[3] < imgs["powerups"].length)){
									array_aux.push(naves);
								}
								else{
									console.log("nave nao existente, ou tamanho impossivel, nivel mal feito");
									return;
								}
							}
							else{
								console.log("erro numa nave");
								return;
							}
						}
						if (array_aux.length == 0){
							console.log("erro nos indices das naves");
							return;
						}
						normais_tratado.push(array_aux);
					}
					else{
						console.log("erro");
						return;
					}
				}
				entidadesInimigas[0] = normais_tratado;
			}
			else if(todosInimigos[i].tagName == "boss"){
				var boss_tratado = new Array();
				var boss_pre_tratamento = todosInimigos[i];

				if(boss_pre_tratamento.children.length == 0){
					var boss = boss_pre_tratamento.innerHTML.split("-");
					if (boss.length == 2){
						boss_tratado.push(parseInt(boss[0]));
						boss_tratado.push(parseFloat(boss[1]));
						if(boss_tratado[0] >= 0 && boss_tratado[0] < imgs["boss"].length && boss[1] > 0){
							entidadesInimigas.push(boss_tratado);
						}
						else{
							console.log("Boss com indice ou tamanho nao permitido");
							return;
						}
					}
					else{
						console.log("Erro no boss");
						return;
					}
				}
				else{
					console.log("Erro na formatacao do boss (nao pode ter filhos)");
					return;
				}
			}
		}
	}
}