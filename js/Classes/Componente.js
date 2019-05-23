"use strict";

//Classe mais basica de sprite images
class Componente{

	constructor(posicaoX, posicaoY, width, height, naturalWidth, naturalHeight, velocidade, clickable, dragable, movivel, img, id, quantidadeframes){
		this.width 		 = width;
		this.height 	 = height;
		this.widthIni    = width;
		this.heightIni   = height;
		
		//rato
		this.clickableIni 	= clickable
		this.clickable 		= clickable;

		//imagem
		this.img 		= img;	
		
		//id da imagem
		this.id 		= id;

		//tamanho
		this.naturalWidth  = naturalWidth;
		this.naturalHeight = naturalHeight;

		//posição e movimento
		this.posicaoXIni 	= posicaoX;
		this.posicaoYIni 	= posicaoY;
		this.posicaoX 		= posicaoX;
		this.posicaoY 		= posicaoY;
		this.velocidadeIni 	= velocidade;
		this.velocidade 	= velocidade;
		this.rockets 		= Array();
		this.spacehit 		= false;

		this.rocketSpeed;

		this.cooldownRocket;

		//arrastavel
		this.dragableIni 	= dragable;
		this.dragable 		= dragable;

		//movivel
		this.movivelIni = movivel;
		this.movivel 	= movivel;


		//indice e frames da imagem
		this.indice = 0;
		this.quantidadeframes = quantidadeframes;

		this.extras     = new Array();
		this.pixelArray;
	}

	//cria uma canvas temporaria, desenha a imagem, retira o pixelarray e apaga a canvas
	pixels(body){

		var canvasTemp 	= document.createElement('canvas')
		var ctxAux 		= canvasTemp.getContext("2d");
		body.appendChild(canvasTemp);

		canvasTemp.width 	= this.width * this.quantidadeframes;
		canvasTemp.height 	= this.height;
		
		canvasTemp.style.border = "3px solid #FF0000";




		//.pixels antigo
		ctxAux.drawImage(this.img, 0, 0, this.width * this.quantidadeframes, this.height);
		this.pixelArray = ctxAux.getImageData(0, 0, this.width * this.quantidadeframes, this.height);
		this.clear(ctxAux);


		body.removeChild(canvasTemp);
	}

	clear(ctx){
		ctx.clearRect(0, 0, this.width, this.height);
	}	

	//Medodos para verificar o clicar no Alfa vvvvvvvvv
	clicked(ev) {
		if (!this.clickable){
			return false;
		}
		else{
			return !this.isTransparent(ev.offsetX,ev.offsetY,false);
		}
	}



	isTransparent(x, y, log){
		//offset correspondente ao número de pixeis entre a posicaoX na canvas e a posicaoX do inicio da imagem +
		//offset correspondente ao número de pixeis entre a posicaoY na canvas e a posicaoY do inicio da imagem,
		//multiplicando pelo width do pixelArray de forma a avançar todas as linhas de pixeis                   +
		//offset correspondente ao numero do indice da sprite sheet vezes o width de cada imagem da sprite sheet 
		var offsetx = x - Math.floor(this.posicaoX) + (y - Math.floor(this.posicaoY)) * this.pixelArray.width + this.indice * Math.floor(this.width);
		//multiplica por 4, por serem 4 valores que codificam 1 pixel (RGBA)(Red,Green,Blue,Alfa), + 3, para chegar ao alfa
		var pixel = offsetx * 4 + 3;

		if(log == true){
			console.log("numero P:" + pixel);
			console.log(this.pixelArray.data[pixel + 0]);
			console.log(this.pixelArray.data[pixel + 1]);
			console.log(this.pixelArray.data[pixel + 2]);
			console.log(this.pixelArray.data[pixel + 3]);

			console.log("imgwidthx : " + this.width + " y: " + this.height);
		}

		if(this.pixelArray.data[pixel] == undefined){
			console.log("PROBLEMA NAS INTERSECOES!!!");
		}
		else if(this.pixelArray.data[pixel] != 0){
			return false;
		}
		else{
			return true;
		}
	}
	
	//volta ao inicio
	reset(ev, ctx){
		this.clear(ctx);
		this.posicaoX 	= this.posicaoXIni;
		this.posicaoY 	= this.posicaoYIni;
		this.velocidade = this.velocidadeIni;
		this.clickable 	= this.clickableIni;
		this.dragable 	= this.dragableIni;
		this.movivel 	= this.movivelIni;
	}

	//ev.target é a canvas
	mouseOverBoundingBox(ev){
		var mx = ev.offsetX;  //mx, my = mouseX, mouseY na canvas
		var my = ev.offsetY;

		if (mx >= this.posicaoX && mx <= this.posicaoX + this.width && my >= this.posicaoY && my <= this.posicaoY + this.height){
			return true;
		}
		else{
			return false;
		}
	}

	//verifica se esta a intersetar
	interseta(sp){
		/*inclui*/
		//if( (this.posicaoY > sp.posicaoY) && (this.posicaoY + this.height < sp.posicaoY + sp.height) &&  (this.posicaoX  > sp.posicaoX ) && (this.posicaoX + this.width < sp.posicaoX + sp.width)           ||         (sp.posicaoY > this.posicaoY) && (sp.posicaoY + sp.height < this.posicaoY + this.height) &&  (sp.posicaoX  > this.posicaoX ) && (sp.posicaoX + sp.width < this.posicaoX + this.width) ){
		if ( this.posicaoY + this.height < sp.posicaoY 
		  || this.posicaoY 			  	 > sp.posicaoY + sp.height
		  || this.posicaoX + this.width  < sp.posicaoX
		  || this.posicaoX 			  	 > sp.posicaoX + sp.width){
			return false;
		
		}else{
			return this.rectInterseta(sp);
		}
	}

	//retorna o retangulo de intersecao
	rectInterseta(sp){
		//(x1,y1,x2,y2)
		var coor = new Array(4);

		//esquerda
		if (Math.floor(sp.posicaoX) >= Math.floor(this.posicaoX)){
			coor[0] 	= Math.floor(sp.posicaoX);
		}
		else{
			coor[0] 	= Math.floor(this.posicaoX);
		}

		//direita
		if (Math.floor(sp.posicaoX) + Math.floor(sp.width) < Math.floor(this.posicaoX) + Math.floor(this.width)){
			coor[2] 	= Math.floor(sp.posicaoX) + Math.floor(sp.width);
		}
		else{
			coor[2] 	= Math.floor(this.posicaoX) + Math.floor(this.width);
		}
			
		//cima
		if(Math.floor(sp.posicaoY) >= Math.floor(this.posicaoY)){
			coor[1] = Math.floor(sp.posicaoY);
		}
		else{
			coor[1] = Math.floor(this.posicaoY);
		}


		//baixo
		if (Math.floor(sp.posicaoY) + Math.floor(sp.height) < Math.floor(this.posicaoY) + Math.floor(this.height)){
			coor[3] = Math.floor(sp.posicaoY) + Math.floor(sp.height);
		}
		else{
			coor[3] = Math.floor(this.posicaoY) + Math.floor(this.height);
		}

		return coor;
	}

	clickTransparent(ev){
		var mx = ev.offsetX;  //mx, my = mouseX, mouseY na canvas
		var my = ev.offsetY;

		return this.isTransparent(mx,my,true);
		
	}


	//ev.target é a canvas
	clickedBoundingBox(ev) {
		if (!this.clickable){
			return false;
		}
		else{
			return this.mouseOverBoundingBox(ev) && !this.clickTransparent(ev);
		}
	}

	dragedBoundingBox(ev) {
		if (!this.clickable || !this.dragable){
			return false;
		}
		else{
			return this.mouseOverBoundingBox(ev) && !this.clickTransparent(ev);
		}
	}

	//draw de uma rotacao da sprite sheet e avanca no indice
	drawUmaRotacao(ctx){
		var iteracao = this.indice * this.naturalWidth;

		ctx.drawImage(this.img, iteracao, 0 , this.naturalWidth, this.naturalHeight, this.posicaoX , this.posicaoY , this.width , this.height);

		this.indice ++;
		
	}

	//draw de uma rotacao da sprite sheet e caso o indice seja o maior possivel, volta ao inicio
	draw(ctx){
		this.drawUmaRotacao(ctx);
		if(this.indice >= this.quantidadeframes - 1){
			this.indice = 0;
		}
	}

	//verifica se esta a colidir com uma sprite
	colisaoComUmaSprite(ctx, spriteImage){
		var coor = this.interseta(spriteImage);

		if (coor == false){
			return false;
		}

		for(var i = coor[0] ; i < coor[2] ;i++){
			for(var j = coor[1] ; j < coor[3] ;j++){
				if (spriteImage.isTransparent(i,j,false) == false && this.isTransparent(i,j,false) == false){
					return true;
				}
			}
		}
		return false;
	}

	//retorna o indice + 1 do array de sprites em que a componente esta a colidir
	colisaoComUmArraySprites(ctx,spArray){
		for(let j = 0; j < spArray.length ; j++){
			if(this.colisaoComUmaSprite(ctx, spArray[j])){
				return j + 1;
			}
		}
		return 0;
	}


	//carrega extras que ficam à volta da componente, exemplo: escudo
	carregaExtra(img, body, ativo){
		var nw = img.naturalWidth;
		var nh = img.naturalHeight;

		var width  = this.width;   
		var height = this.height;

		var posicaoX = this.posicaoX
		var posicaoY = this.posicaoY	

		var extra = new Extra(posicaoX, posicaoY, width, height, nw, nh, this.velocidade, false, false, true, img, 0, 1, this, ativo);
		
		extra.pixels(body);

		this.extras.push(extra);
	}

	//draw dos extras que ficam à volta da componente, exemplo: escudo
	drawExtras(ctx){
		for (let i = 0; i < this.extras.length; i++){
			if(this.extras[i].ativo == 1){
				this.extras[i].draw(ctx);
			}
		}
	}

	//to string, pode ser usado para debugging
	toString(){
		return 	"Componente: Coordenadas (" + this.posicaoX 	+ "," 			+ this.posicaoY 	+ ")"
			+ 	" Width: " 					+ this.width 		+ " Heigth: " 	+ this.height
			+ 	" Velocidade: " 			+ this.velocidade
			+ 	" Clickable: " 				+ this.clickable 	+ " Dragable: " + this.dragable;
	}
}