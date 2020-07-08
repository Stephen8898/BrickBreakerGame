import {collison} from './collisonDetection.js';

export default class Brick {
    constructor(game, position){
        this.image = document.getElementById('brick-img');
        this.bickSfx = new Audio('../sounds/Rock-Impact-Cinder Block-Heavy 2.mp3');

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.position = position;

        this.width = 60;
        this.height = 24;

        this.game = game;

        this.destoryBrick = false;
    }

    update(){

        if(collison(this.game.ball, this)){
            this.bickSfx.play();
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.destoryBrick = true;
        }

    }

    draw(context){
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    
}