
function siatkaWykresu(canvasID, maxValue, nrDays, nrSegVal){
	
	this.c = document.getElementById(canvasID);
	this.ctx = this.c.getContext("2d");
	
	this.maxValue = maxValue;
	this.pixDayScale = this.c.width / (nrDays +1) ; // ile pikseli na dzień 1 miejsce na opis
	this.pixValRatio = this.c.height / maxValue; // ile pikseli na value
	this.valPixRatio = maxValue/this.c.height; // ile pikseli na wartosc wykres
	this.pixValScale = this.c.height / (nrSegVal+1); //
	this.ValScale = maxValue/nrSegVal;
	this.marginBottom = Math.floor( this.pixValScale * 0.8 *0.3);
	this.marginLeft = Math.floor( this.pixDayScale  *0.1 );

	
	
		//DOPASOWANIE CZCIONKI DO ROZMIAROW CZCIONKA
	if(Math.floor( this.pixValScale * 0.8 ) < Math.floor( this.pixDayScale * 0.3 )){
		this.ctx.font = Math.floor( this.pixValScale * 0.8 ) + "px Arial";//Ustawienie czcionki			
	}
	if(Math.floor( this.pixValScale * 0.8 ) > Math.floor( this.pixDayScale * 0.3 )){
		this.ctx.font = Math.floor( this.pixDayScale * 0.25 ) + "px Arial";//Ustawienie czcionki
	}
	
	this.rysujSiatke = function (){
		var i,j;
		var actSegnetValueScale, actSegnetDayScale;
		
		for (i = 0; i <= nrSegVal +1 ; i++) {
			actSegnetValueScale = Math.floor(i* this.pixValScale);
			
			//RYSOWANIE LINI POZIOMYCH 
			if(i == nrSegVal){
				this.ctx.beginPath(); 
				this.ctx.strokeStyle="blue";
				this.ctx.setLineDash([0,0]);
				this.ctx.lineWidth=5;
				this.ctx.moveTo(0,actSegnetValueScale);
				this.ctx.lineTo(this.c.width ,actSegnetValueScale);
				this.ctx.stroke();
			}else{
				this.ctx.beginPath(); 
				this.ctx.strokeStyle="black";
				this.ctx.setLineDash([4,6]);
				this.ctx.lineWidth=2;
				this.ctx.moveTo(0,actSegnetValueScale);
				this.ctx.lineTo(this.c.width ,actSegnetValueScale);
				this.ctx.stroke();
			}
			
			
			//PODPISY WARTOSCI SKALA
			if(i<nrSegVal +1){
				this.ctx.beginPath(); 
				this.ctx.strokeStyle="orange";
				this.ctx.setLineDash([0,0]);
				this.ctx.lineWidth=1;
				this.ctx.strokeText(maxValue - (this.ValScale*i),this.marginLeft, actSegnetValueScale - this.marginBottom);
				this.ctx.stroke();
			}
		}
		
		//LINIE PIONOWE
		for (j = 0; j < nrDays+1; j++) {
			
			actSegnetDayScale = Math.floor( j * this.pixDayScale);	
			
			if(j == 1){
			
				this.ctx.beginPath(); 
				this.ctx.strokeStyle="blue";
				this.ctx.setLineDash([0,0]);
				this.ctx.lineWidth=5;
				this.ctx.moveTo(actSegnetDayScale,this.c.height);
				this.ctx.lineTo(actSegnetDayScale,0);
				this.ctx.stroke();
			
			
			}else{

				this.ctx.beginPath(); 
				this.ctx.strokeStyle="black";
				this.ctx.setLineDash([4,6]);
				this.ctx.lineWidth=2;
				this.ctx.moveTo(actSegnetDayScale,this.c.height);
				this.ctx.lineTo(actSegnetDayScale,0);
				this.ctx.stroke();

			}
			
			// PODPISY DNI
			if(j>0){
				
				this.ctx.beginPath(); 
				this.ctx.strokeStyle="violet";
				this.ctx.setLineDash([0,0]);
				this.ctx.lineWidth=1;
				this.ctx.strokeText( "DAY " + j,actSegnetDayScale +  this.marginLeft, this.pixValScale*(nrSegVal+1) - this.marginBottom);
			}
		}
	}
	
	this.rysujSegment = function (day, lastPoint, nextPoint){
		
		
		
		if( nextPoint > lastPoint){
			
			this.ctx.beginPath(); 
			this.ctx.strokeStyle="green";
			this.ctx.setLineDash([0,0]);
			this.ctx.lineWidth=3;
			this.ctx.moveTo((day)*this.pixDayScale,this.c.height - this.pixValScale -  Math.floor(lastPoint * this.pixValRatio));
			this.ctx.lineTo((day+1)*this.pixDayScale,this.c.height - this.pixValScale -  Math.floor(nextPoint * this.pixValRatio));
			this.ctx.stroke();
	
		}

		if( nextPoint < lastPoint ){
			
			this.ctx.beginPath(); 
			this.ctx.strokeStyle="red";
			this.ctx.setLineDash([0,0]);
			this.ctx.lineWidth=3;
			this.ctx.moveTo((day)*this.pixDayScale,this.c.height - this.pixValScale - Math.floor(lastPoint * this.pixValRatio));
			this.ctx.lineTo((day+1)*this.pixDayScale,this.c.height - this.pixValScale - Math.floor(nextPoint * this.pixValRatio));
			this.ctx.stroke();	
		}
		
			if( nextPoint == lastPoint ){
			
			this.ctx.beginPath(); 
			this.ctx.strokeStyle="blue";
			this.ctx.setLineDash([0,0]);
			this.ctx.lineWidth=3;
			this.ctx.moveTo((day)*this.pixDayScale,this.c.height - this.pixValScale - Math.floor(lastPoint * this.pixValRatio));
			this.ctx.lineTo((day+1)*this.pixDayScale,this.c.height - this.pixValScale - Math.floor(nextPoint * this.pixValRatio));
			this.ctx.stroke();	
		}
		
		
		
	}
};

function nextSegm(){
	
	if( actDay == 0){
		
		lastValue = Math.floor(w.maxValue/4) + Math.floor(Math.random() * ( w.maxValue/2) * 0.5);
		newValue = Math.floor(w.maxValue/4) + Math.floor(Math.random() * ( w.maxValue /2) * 0.5);
		serieLong = 1;
		
		
	} else{
		
		lastValue = newValue;
		
		//CZY NASTAPILA ZMIANA
		if((Math.floor(Math.random() * 10)+  serieLong) > 10){
			
			growing = !growing;
			serieLong = 1;
		} else{
			serieLong = serieLong +1;
		}
			
			
		if(growing){
			
			newValue =  lastValue + Math.floor(Math.random() * lastValue *0.5) ;
			
			
		}else{
			
			newValue =  lastValue - Math.floor(Math.random() * lastValue *0.5) ;
			
		}
			
	}
	
	actDay = actDay + 1;
	w.rysujSegment(actDay,lastValue,newValue);
		
};




var w = new siatkaWykresu("myCanvas",3000,15,10);
var actDay = 0;

var lastValue = 0;
var newValue = 0;
var serieLong = 0;
var growing = true;

function main(){
	
	
	
	
	
	w.rysujSiatke();
	//w.rysujSegment(1,100,500);
	//w.rysujSegment(2,500,100);
	//w.rysujSegment(3,100,400);
	//w.rysujSegment(4,400,900);
		
};

main();

//setInterval("main()", 200);