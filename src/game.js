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

    }

    start(){
        // instance of the paddel object
        this.gamestate = GAMESTATE.RUNNING;
        this.paddel = new Paddel(this); 
        this.ball = new Ball(this);
   


        let bricks = buildLevel(this, level1);
        

        this.gameObjects = [this.ball, this.paddel, ...bricks];

        new InputHanlder(this.paddel, this);
    }


    update(deltaTime){
        if (this.gamestate == GAMESTATE.PAUSED) return;

        this.gameObjects.forEach(object => object.update(deltaTime));

       this.gameObjects = this.gameObjects.filter(object => !object.destoryBrick);
    }

    draw(context){
        //draws game objects
        this.gameObjects.forEach(object => object.draw(context));
        
    }


    togglePause(){
        // Game state
        if(this.gamestate == GAMESTATE.PAUSED){
            this.gamestate = GAMESTATE.RUNNING;
        }
        else {
            this.gamestate = GAMESTATE.PAUSED;
        }

    }
}