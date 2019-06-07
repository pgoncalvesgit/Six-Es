"use strict";

//Classe mais basica de sprite images
class Component{

	constructor(positionX, positionY, width, height, naturalWidth, naturalHeight, speed, clickable, dragable, movable, img, id, numberOfFrames, refreshRate){
		this.width 		 = width;
		this.height 	 = height;
		this.widthIni    = width;
		this.heightIni   = height;
		
		//mouse
		this.clickableIni 	= clickable
		this.clickable 		= clickable;

		//image
		this.img 		= img;	
		
		//image id
		this.id 		= id;

		//size
		this.naturalWidth  = naturalWidth;
		this.naturalHeight = naturalHeight;

		//position and movement
		this.positionXIni 	= positionX;
		this.positionYIni 	= positionY;
		this.positionX 		= positionX;
		this.positionY 		= positionY;
		this.speedIni 	    = speed * refreshRate/60;
		this.speed       	= speed * refreshRate/60;
		this.rockets 		= Array();
		this.spacehit 		= false;

		this.rocketSpeed;

		this.cooldownRocket;

		//draggable
		this.dragableIni 	= dragable;
		this.dragable 		= dragable;

		//movable
		this.movableIni = movable;
		this.movable 	= movable;


		//index and numberOfFrames of the sprite
		this.index = 0;
		this.numberOfFrames = numberOfFrames;

		this.extras     = new Array();
		this.pixelArray;
	}

	//creates a timerary canvas, draws the image, saves the pixelArray and erases the canvas
	pixels(body){

		var canvasTemp 	= document.createElement('canvas')
		var ctxAux 		= canvasTemp.getContext("2d");
		body.appendChild(canvasTemp);

		canvasTemp.width 	= this.width * this.numberOfFrames;
		canvasTemp.height 	= this.height;
		
		canvasTemp.style.border = "3px solid #FF0000";




		// old pixels function vv
		ctxAux.drawImage(this.img, 0, 0, this.width * this.numberOfFrames, this.height);
		this.pixelArray = ctxAux.getImageData(0, 0, this.width * this.numberOfFrames, this.height);
		this.clear(ctxAux);
		// old pixels function ^^


		body.removeChild(canvasTemp);
	}

	clear(ctx){
		ctx.clearRect(0, 0, this.width, this.height);
	}	

	//Methods to check Alfa vvvvvvvvv
	clicked(ev) {
		if (!this.clickable){
			return false;
		}
		else{
			return !this.isTransparent(ev.offsetX,ev.offsetY,false);
		}
	}



	isTransparent(x, y, log){
		//offset equals the number of pixels between the positionX in the canvas and the positionX in the beggining of the image +
		//the number of pixels between the positionY in the canvas and the positionY in the beggining of the image,
		//times the width of the pixelArray (this way we move forward all the pixel lines) +
		//the number of the index of the sprite sheet times the width of each image in the sprite sheet
		var offsetx = x - Math.floor(this.positionX) + (y - Math.floor(this.positionY)) * this.pixelArray.width + this.index * Math.floor(this.width);
		//times 4, because we have 4 values to encode 1 pixel (RGBA)(Red,Green,Blue,Alfa), + 3, to get to the alfa
		var pixel = offsetx * 4 + 3;

		if(log == true){
			console.log("number P:" + pixel);
			console.log(this.pixelArray.data[pixel + 0]);
			console.log(this.pixelArray.data[pixel + 1]);
			console.log(this.pixelArray.data[pixel + 2]);
			console.log(this.pixelArray.data[pixel + 3]);

			console.log("imgwidthx : " + this.width + " y: " + this.height);
		}

		if(this.pixelArray.data[pixel] == undefined){
			console.log("PROBLEM IN THE INTERSECTIONS!!!");
		}
		else if(this.pixelArray.data[pixel] != 0){
			return false;
		}
		else{
			return true;
		}
	}
	
	//goes back to the beggining
	reset(ev, ctx){
		this.clear(ctx);
		this.positionX 	= this.positionXIni;
		this.positionY 	= this.positionYIni;
		this.speed      = this.speedIni;
		this.clickable 	= this.clickableIni;
		this.dragable 	= this.dragableIni;
		this.movable 	= this.movableIni;
	}

	mouseOverBoundingBox(ev){
		var mx = ev.offsetX;  //mx, my = mouseX, mouseY na canvas
		var my = ev.offsetY;

		if (mx >= this.positionX && mx <= this.positionX + this.width && my >= this.positionY && my <= this.positionY + this.height){
			return true;
		}
		else{
			return false;
		}
	}

	//checks if it is intercepting
	interseta(sp){
		if ( this.positionY + this.height < sp.positionY 
		  || this.positionY 			  	 > sp.positionY + sp.height
		  || this.positionX + this.width  < sp.positionX
		  || this.positionX 			  	 > sp.positionX + sp.width){
			return false;
		
		}else{
			return this.rectInterseta(sp);
		}
	}

	//returns the intersection rectangle
	rectInterseta(sp){
		//(x1,y1,x2,y2)
		var coor = new Array(4);

		//left
		if (Math.floor(sp.positionX) >= Math.floor(this.positionX)){
			coor[0] 	= Math.floor(sp.positionX);
		}
		else{
			coor[0] 	= Math.floor(this.positionX);
		}

		//right
		if (Math.floor(sp.positionX) + Math.floor(sp.width) < Math.floor(this.positionX) + Math.floor(this.width)){
			coor[2] 	= Math.floor(sp.positionX) + Math.floor(sp.width);
		}
		else{
			coor[2] 	= Math.floor(this.positionX) + Math.floor(this.width);
		}
			
		//up
		if(Math.floor(sp.positionY) >= Math.floor(this.positionY)){
			coor[1] = Math.floor(sp.positionY);
		}
		else{
			coor[1] = Math.floor(this.positionY);
		}


		//down
		if (Math.floor(sp.positionY) + Math.floor(sp.height) < Math.floor(this.positionY) + Math.floor(this.height)){
			coor[3] = Math.floor(sp.positionY) + Math.floor(sp.height);
		}
		else{
			coor[3] = Math.floor(this.positionY) + Math.floor(this.height);
		}

		return coor;
	}

	clickTransparent(ev){
		var mx = ev.offsetX;  //mx, my = mouseX, mouseY in the canvas
		var my = ev.offsetY;

		return this.isTransparent(mx,my,true);
		
	}


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

	//draw one rotation of the sprite sheet and adds one to the index
	drawUmaRotacao(ctx){
		var iteration = this.index * this.naturalWidth;

		ctx.drawImage(this.img, iteration, 0 , this.naturalWidth, this.naturalHeight, this.positionX , this.positionY , this.width , this.height);

		this.index ++;
		
	}

	//draw one rotation of the sprite sheet and if the index is the biggest possible, returns to 0
	draw(ctx){
		this.drawUmaRotacao(ctx);
		if(this.index >= this.numberOfFrames - 1){
			this.index = 0;
		}
	}

	//returns true if it is colliding with a sprite and vice versa
	colisionWithASprite(ctx, spriteImage){
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

	//returns index + 1 of the sprite (which is colliding with) in the array
	colisionWithASpriteArray(ctx,spArray){
		for(let j = 0; j < spArray.length ; j++){
			if(this.colisionWithASprite(ctx, spArray[j])){
				return j + 1;
			}
		}
		return 0;
	}


	//load all the extras around the object, example: shield
	loadExtra(img, body, active, refreshRate){
		var nw = img.naturalWidth;
		var nh = img.naturalHeight;

		var width  = this.width;   
		var height = this.height;

		var positionX = this.positionX
		var positionY = this.positionY	

		var extra = new Extra(positionX, positionY, width, height, nw, nh, this.speed, false, false, true, img, 0, 1, refreshRate, this, active);
		
		extra.pixels(body);

		this.extras.push(extra);
	}

	//draw all the extras around the object, example: shield
	drawExback(ctx){
		for (let i = 0; i < this.extras.length; i++){
			if(this.extras[i].active == 1){
				this.extras[i].draw(ctx);
			}
		}
	}

	//to string, can be used for debugging
	toString(){
		return 	"Component: CoordefillerTexts (" + this.positionX 	+ "," 			+ this.positionY 	+ ")"
			+ 	" Width: " 					+ this.width 		+ " Heigth: " 	+ this.height
			+ 	" Velocidade: " 			+ this.speed
			+ 	" Clickable: " 				+ this.clickable 	+ " Dragable: " + this.dragable;
	}
}