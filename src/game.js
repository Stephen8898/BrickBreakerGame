import Paddel from './paddel.js';
import InputHanlder from './input.js';
import Ball from './ball.js';
import {buildLevel, level1} from './levels.js';
// import Brick from './brick.js';

export default class Game {

    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

    }

    start(){
        // instance of the paddel object
        this.paddel = new Paddel(this); 
        this.ball = new Ball(this);
   


        let bricks = buildLevel(this, level1);
        

        this.gameObjects = [this.ball, this.paddel, ...bricks];

        new InputHanlder(this.paddel);
    }


    update(deltaTime){
        this.gameObjects.forEach(object => object.update(deltaTime));

        this.gameObjects = this.gameObjects.filter(object => !object.destroyBrick);
    }

    draw(context){
        //draws game objects
        this.gameObjects.forEach(object => object.draw(context));
        
    }
}