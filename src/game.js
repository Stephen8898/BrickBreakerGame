import Paddel from './paddel.js';
import InputHanlder from './input.js';
import Ball from './ball.js';
import {buildLevel, level1} from './levels.js';
// import Brick from './brick.js';



const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3 

}

export default class Game {

    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        //Game menu state
        this.gamestate = GAMESTATE.MENU;
        this.gameObjects = [];
         // instance of the paddel object
         this.paddel = new Paddel(this); 
         this.ball = new Ball(this);
    
         new InputHanlder(this.paddel, this);

    }

    start(){ 

        let bricks = buildLevel(this, level1);
        this.gameObjects = [this.ball, this.paddel, ...bricks];

        this.gamestate = GAMESTATE.RUNNING;
    }


    update(deltaTime){
        if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU) return;

        this.gameObjects.forEach(object => object.update(deltaTime));

       this.gameObjects = this.gameObjects.filter(object => !object.destoryBrick);
    }

    draw(context){
        //draws game objects
        this.gameObjects.forEach(object => object.draw(context));

        if(this.gamestate == GAMESTATE.PAUSED){
           document.getElementById("Game-state").innerHTML = "GAME PAUSED";
        }else if(this.gamestate == GAMESTATE.MENU){
            document.getElementById("Game-state").innerHTML = "Press Enter to Start";
            // context.fillStyle = '#1a0000';
            // context.fillRect(this.gameWidth, this.gameHeight);
        }
        else {
            document.getElementById("Game-state").innerHTML = "GAME RUNNING";
        }
        
    }


    togglePause(){
        // Game state
        if(this.gamestate === GAMESTATE.PAUSED ){
            this.gamestate = GAMESTATE.RUNNING;
        }
        else {
            this.gamestate = GAMESTATE.PAUSED;
        }

    }
}