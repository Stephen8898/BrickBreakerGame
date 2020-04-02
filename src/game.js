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
    
        this.lives = 4;

        new InputHanlder(this.paddel, this);
    }
    
    start(){ 
        if(this.gamestate !== GAMESTATE.MENU) return;

        let bricks = buildLevel(this, level1);
        this.gameObjects = [this.ball, this.paddel, ...bricks];

        this.gamestate = GAMESTATE.RUNNING;
    }


    update(deltaTime){

        if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

        if (this.gamestate === GAMESTATE.PAUSED 
            || this.gamestate === GAMESTATE.MENU 
            || this.gamestate === GAMESTATE.GAMEOVER
            ) return;

        this.gameObjects.forEach(object => object.update(deltaTime));
        document.getElementById('lives').innerHTML = this.lives;

       this.gameObjects = this.gameObjects.filter(object => !object.destoryBrick);
    }

    draw(context){
        //draws game objects
        this.gameObjects.forEach(object => object.draw(context));

        if(this.gamestate === GAMESTATE.PAUSED){
           document.getElementById("Game-state").innerHTML = "Game Paused";
        }else if(this.gamestate == GAMESTATE.MENU){
            document.getElementById("Game-state").innerHTML = "Press Shift to Start";
            document.getElementById('lives').innerHTML = this.lives;
            // context.fillStyle = '#1a0000';
            // context.fillRect(this.gameWidth, this.gameHeight);
        }else if(this.gamestate == GAMESTATE.GAMEOVER){
            context.rect(0,0, this.gameWidth, this.gameHeight);
            context.fillStyle = "rgba(0,0,0,1)"
             context.fill();
             document.getElementById("Game-state").innerHTML = "Game Over";
        }
        else {
            document.getElementById("Game-state").innerHTML = "Game Running";
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