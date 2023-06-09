export default class tileMap{
    constructor(tileSize){

        this.tileSize=tileSize;
        this.wall=this.#image("wall.png");
        this.pacman=this.#image("pacman.png");
        this.dot=this.#image("yellowDot.png");
        this.ghost=this.#image("ghost.png");
    }

        #image(fileName)
        {
            const img =new Image();
            img.src=`img/${fileName}`;
            return img;
        }

//1 - wall
//0-dots
//2-pacman
//3 enemies



  escenario = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,2,0,0,0,0,0,0,0,0,0,3,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,1,3,1,1,1,0,0,1],
    [1,0,1,0,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,1,0,1,0,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,1,0,1,1,0,1,1,1,1,0,1],
    [1,3,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ]
  
    escenario1 = [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,2,0,0,0,0,0,0,0,0,0,3,1],
      [1,0,1,1,1,1,1,1,1,1,1,1,1,0,1],
      [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,0,1,0,1,1,3,1,1,1,0,0,1],
      [1,0,1,0,1,0,1,1,0,1,1,1,1,0,1],
      [1,0,1,0,1,0,1,1,0,1,1,1,1,0,1],
      [1,0,0,0,1,0,1,1,0,1,1,1,1,0,1],
      [1,3,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
   
  ]


}