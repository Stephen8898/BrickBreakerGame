import {collison} from './collisonDetection.js';

export default class Ball {
    constructor(game){
        this.image = document.getElementById('ball-img');

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.position = {x: 100, y: 170};
        this.speed = {x: 4, y: 4};
        this.size = 18;

        this.game = game;
    }

    draw(context){      
        context.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        //wall collison detectiont
        if(this.position.x + this.size > this.gameWidth || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }

        if(this.position.y + this.size > this.gameHeight || this.position.y < 0){
            this.speed.y = -this.speed.y;
        }

        if(collison(this, this.game.paddel)){
            this.speed.y = -this.speed.y;
            this.position.y = this.position.y - this.size;
        }

    }
}