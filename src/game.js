import Paddel from './paddel.js';
import InputHanlder from './input.js';
import Ball from './ball.js';
import {buildLevel, level1, level2, level3, level4, level5, level6, level7, level8} from './levels.js';
// import Brick from './brick.js';



const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
    WIN: 5

}

export default class Game {

    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        //Game Background music
        this.music = new Audio("../sounds/music/melodyloops-preview-energy-express-2m30s.mp3");

        //Game menu state
        this.gamestate = GAMESTATE.MENU;
        this.gameObjects = [];
        this.bricks = [];
         // instance of the paddel object
        this.paddel = new Paddel(this); 
        this.ball = new Ball(this);
        
        this.lives = 4;

        this.levels = [level1, level2, level3, level4, level5, level6,level7, level8];

        this.backGImg = ["../images/giphy-brickWall.gif", "../images/Giphy-wall2.gif"];
        this.img = 0;

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
        this.music.play();
        this.music.loop = true;
    }


    update(deltaTime){

        if (this.gamestate === GAMESTATE.PAUSED 
            || this.gamestate === GAMESTATE.MENU 
            || this.gamestate === GAMESTATE.GAMEOVER
            ) return;

        if(this.lives === 0){
            this.gamestate = GAMESTATE.GAMEOVER;
        }

        if(this.currentLevel === this.levels.length-1){
            this.gamestate = GAMESTATE.WIN;
        }
         // // Handels game level by cheking brick array length
        if(this.bricks.length === 0){
            this.currentLevel+=1;
            if(this.img === 1){
                this.img = 0;
            }else{
                this.img +=1;
            }
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.start();
        }

        this.gameObjects.forEach(object => object.update(deltaTime));
        this.bricks.forEach(brick => brick.update(deltaTime));
        document.getElementById('lives').innerHTML = this.lives;
        document.getElementById('level').innerHTML = this.currentLevel + 1;
        document.getElementById('backG').src = this.backGImg[this.img];

       this.bricks = this.bricks.filter(brick => !brick.destoryBrick);

    }

    draw(context){
        //draws game objects
        this.gameObjects.forEach(object => object.draw(context));
        this.bricks.forEach(brick => brick.draw(context));

        if(this.gamestate === GAMESTATE.PAUSED){
           document.getElementById("Game-state").innerHTML = "Game Paused";
           this.music.pause();
        }else if(this.gamestate === GAMESTATE.MENU){
            context.rect(0,0, this.gameWidth, this.gameHeight);
            context.fillStyle = "rgba(0,0,0,1)"
             context.fill();
            document.getElementById("Game-state").innerHTML = "Press Shift to Start";
            document.getElementById('lives').innerHTML = this.lives;
            document.getElementById('level').innerHTML = this.currentLevel + 1;
            // context.fillStyle = '#1a0000';
            // context.fillRect(this.gameWidth, this.gameHeight);
        }else if(this.gamestate === GAMESTATE.GAMEOVER){
            context.rect(0,0, this.gameWidth, this.gameHeight);
            context.fillStyle = "rgba(0,0,0,1)"
             context.fill();
             document.getElementById("Game-state").innerHTML = "Game Over";
        } else if (this.gamestate === GAMESTATE.WIN){
            context.rect(0,0, this.gameWidth, this.gameHeight);
            context.fillStyle = "rgba(0,0,0,1)"
             context.fill();
            document.getElementById("Game-state").innerHTML = "You win!";
        }
        else {
            document.getElementById("Game-state").innerHTML = "Game Running";
            this.music.play();
          
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