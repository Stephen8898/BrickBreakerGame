import {collison} from './collisonDetection.js';

export default class Brick {
    constructor(game, position){
        this.image = document.getElementById('brick-img');

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.position = position;

        this.width = 60;
        this.height = 24;

        this.game = game;

        this.destoryBrick = false;
    }

    draw(context){
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update(){

        if(collison(this.game.ball, this)){
            this.game.ball.speed.y = -this.game.ball.speed.y;

            this.destoryBrick = true;
        }

    }
}