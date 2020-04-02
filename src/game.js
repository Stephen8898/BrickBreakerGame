import Paddel from './paddel.js';
import InputHanlder from './input.js';
import Ball from './ball.js';
import {buildLevel, level1, level2} from './levels.js';
// import Brick from './brick.js';



const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4

}

export default class Game {

    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        //Game menu state
        this.gamestate = GAMESTATE.MENU;
        this.gameObjects = [];
        this.bricks = [];
         // instance of the paddel object
        this.paddel = new Paddel(this); 
        this.ball = new Ball(this);
        
        this.lives = 4;

        this.levels = [level1,level2];

        this.currentLevel = 0;

        new InputHanlder(this.paddel, this);
    }
    
    start(){ 
        if(this.gamestate !== GAMESTATE.MENU 
            && this.gamestate !== GAMESTATE.NEWLEVEL
            ) return;
        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        this.gameObjects = [this.ball, this.paddel];

        this.gamestate = GAMESTATE.RUNNING;
    }


    update(deltaTime){
        // Handels game level by cheking brick array length
        if(this.bricks.length === 0){
            this.currentLevel++;
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.start();
        }

        if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

        if (this.gamestate === GAMESTATE.PAUSED 
            || this.gamestate === GAMESTATE.MENU 
            || this.gamestate === GAMESTATE.GAMEOVER
            ) return;

        this.gameObjects.forEach(object => object.update(deltaTime));
        this.bricks.forEach(brick => brick.update(deltaTime));
        document.getElementById('lives').innerHTML = this.lives;

       this.bricks = this.bricks.filter(brick => !brick.destoryBrick);

    }

    draw(context){
        //draws game objects
        this.gameObjects.forEach(object => object.draw(context));
        this.bricks.forEach(brick => brick.draw(context));

        if(this.gamestate === GAMESTATE.PAUSED){
           document.getElementById("Game-state").innerHTML = "Game Paused";
        }else if(this.gamestate == GAMESTATE.MENU){
            context.rect(0,0, this.gameWidth, this.gameHeight);
            context.fillStyle = "rgba(0,0,0,1)"
             context.fill();
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