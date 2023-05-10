
import tileMap from "./TileMap.js";
var canvas;
var ctx;
var FPS = 50;

var anchoF = 50;
var altoF = 50;

var muro = '#044f14';
var puerta = '#3a1700';
var tierra = '#c6892f';
var llave = '#c6bc00';

var protagonista;

var enemigo=[]; // Array de enemigos

var imagenAntorcha; 

var tileMap;

var musica;
var sonido1, sonido2, sonido3;


musica = new Howl({
  src: ['music/fortaleza.mp3'],
  loop: false
});

sonido1 = new Howl({
  src: ['sound/fuego.wav'],
  loop: false
});

sonido2 = new Howl({
  src: ['sound/llave.wav'],
  loop: false
});

sonido3 = new Howl({
  src: ['sound/puerta.wav'],
  loop: false
});

//1 - wall
//0-dots
//2-pacman
//3 enemies


// DIBUJO EL ESCENARIO

/*function dibujaEscenario(){

  for(y=0;y<10;y++){
    for(x=0;x<15;x++){

      var tile = escenario[y][x];
      ctx.drawImage(tileMap,tile*32,0,32,32,anchoF*x,altoF*y,anchoF,altoF);
    }
  }
}
*/
function dibujaEscenario(){

  for(y=0;y<10;y++){
    for(x=0;x<15;x++){

const tile = this.escenario[y][x];
        let image = null;
        switch (tile) {
          case 1:
            image = this.wall;
            break;
          case 0:
            image = this.dot;
            break;
          case 2:
            image = this.pacman;
            break;
          case 3:
            image = this.ghost;
            break;
        }
      }
    }
  }
/*var antorcha = function(x,y){
  this.x = x;
  this.y = y;

  this.retraso = 10;
  this.contador = 0;
  this.fotograma = 0; //0-3


  this.cambiaFotograma = function(){
    if(this.fotograma < 3) {
      this.fotograma++;
    }
    else{
      this.fotograma = 0;
    }

  }


  this.dibuja = function(){

    if(this.contador < this.retraso){
      this.contador++;
    }
    else{
      this.contador = 0;
      this.cambiaFotograma();
    }

    ctx.drawImage(tileMap,this.fotograma*32,64,32,32,anchoF*x,altoF*y,anchoF,altoF);
  }

}
*/

//CLASE ENEMIGO
var malo = function(x,y){
    this.x = x;
    this.y = y;

    this.direccion = Math.floor(Math.random()*4);

    this.retraso = 50;
    this.fotograma = 0;


    this.dibuja = function(){
      ctx.drawImage(tileMap,0,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
    }


    this.compruebaColision = function(x,y){
        var colisiona = false;

        if(escenario[y][x]==0){
          colisiona = true;
        }
        return colisiona;
    }


    this.mueve = function(){

      protagonista.colisionEnemigo(this.x, this.y);


      if(this.contador < this.retraso){
        this.contador++;
      }

      else{
        this.contador = 0;

        //ARRIBA
        if(this.direccion == 0){
          if(this.compruebaColision(this.x, this.y - 1)==false){
            this.y--;
          }
          else{
            this.direccion = Math.floor(Math.random()*4);
          }
        }


        //ABAJO
        if(this.direccion == 1){
          if(this.compruebaColision(this.x, this.y + 1)==false){
            this.y++;
          }
          else{
            this.direccion = Math.floor(Math.random()*4);
          }
        }

        //IZQUIERDA
        if(this.direccion == 2){
          if(this.compruebaColision(this.x - 1, this.y)==false){
            this.x--;
          }
          else{
            this.direccion = Math.floor(Math.random()*4);
          }
        }

        //IZQUIERDA
        if(this.direccion == 3){
          if(this.compruebaColision(this.x + 1, this.y)==false){
            this.x++;
          }
          else{
            this.direccion = Math.floor(Math.random()*4);
          }
        }
      }

    }

}


//OBJETO JUGADOR
var jugador = function(){
  this.x = 1;
  this.y = 1;
  this.color = '#820c01';
  this.llave = false;


  this.dibuja = function(){
    ctx.drawImage(tileMap,32,32,32,32,this.x*anchoF,this.y*altoF,anchoF,altoF);
  }


  this.colisionEnemigo = function(x,y){
    if(this.x == x && this.y == y){
        this.muerte();
    }

  }


  this.margenes = function(x,y){
    var colision = false;

    if(escenario[y][x]==0){
      colision = true;
    }

    return(colision);
  }



  this.arriba = function(){
    if(this.margenes(this.x, this.y-1)==false){
      this.y--;
      this.logicaObjetos();
    }
  }


  this.abajo = function(){
    if(this.margenes(this.x, this.y+1)==false){
      this.y++;
      this.logicaObjetos();
    }
  }

  this.izquierda = function(){
    if(this.margenes(this.x-1, this.y)==false){
      this.x--;
      this.logicaObjetos();
    }
  }

  this.derecha = function(){
    if(this.margenes(this.x+1, this.y)==false){
      this.x++;
      this.logicaObjetos();
    }
  }

  this.victoria = function(){

    sonido3.play();
    console.log('Has ganado!');


    this.x = 1;
    this.y = 1;

    this.llave = false;   //el jugador ya no tiene la llave
    escenario[8][3] = 3;  //volvemos a poner la llave en su sitio
  }


  this.muerte = function(){

    sonido1.play();
    console.log('Has perdido!');

    this.x = 1;
    this.y = 1;

    this.llave = false;   //el jugador ya no tiene la llave
    escenario[8][3] = 3;  //volvemos a poner la llave en su sitio
  }




  this.logicaObjetos = function(){
    var objeto = escenario[this.y][this.x];

    //OBTIENE LLAVE
    if(objeto == 3){

      sonido2.play();

      this.llave = true;
      escenario[this.y][this.x]=2;

      console.log('Has obtenido la llave!!');
    
    }


/*
    //ABRIMOS LA PUERTA
    if(objeto == 1){
      if(this.llave == true)
        this.victoria();
      else{
      
        console.log('No tienes la llave, no puedes pasar!');
      }
    }
*/

  }

}

// BUCLE PRINCIPAL

function inicializa(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  tileMap = new tileMap();
 

  

  musica.play();

  //CREAMOS AL JUGADOR
  protagonista = new jugador();

  //CREAMOS LA ANTORCHA
  imagenAntorcha = new antorcha(0,0);

  //CREAMOS LOS ENEMIGOS
  enemigo.push(new malo(3,3));
  enemigo.push(new malo(5,7));
  enemigo.push(new malo(7,7));

  //LECTURA DEL TECLADO
  document.addEventListener('keydown',function(tecla){

    if(tecla.keyCode == 38){
      protagonista.arriba();
    }

    if(tecla.keyCode == 40){
      protagonista.abajo();
    }

    if(tecla.keyCode == 37){
      protagonista.izquierda();
    }

    if(tecla.keyCode == 39){
      protagonista.derecha();
    }

  });

  setInterval(function(){
    principal();
  },1000/FPS);
}


function borraCanvas(){
  canvas.width=750;
  canvas.height=500;
}

// GENERA TODO EL MOVIMIENTO DEL JUEGO

function principal(){
  borraCanvas();
  dibujaEscenario();
  imagenAntorcha.dibuja();
  protagonista.dibuja();


  for(c=0; c<enemigo.length; c++){
    enemigo[c].mueve();
    enemigo[c].dibuja();
  }
}