import {collison} from './collisonDetection.js';

export default class Ball {
    constructor(game){
        this.image = document.getElementById('ball-img');
        this.collide = document.getElementById("collide");
        this.wallSfx = document.getElementById("wallSfx");
        this.loseSfx = document.getElementById("loseSfx");


        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.size = 18;
        this.position = {x: 100, y: 170};
        this.speed = {x: 4, y: 4};
        this.game = game;
    }

    reset(){
        this.position = {x: 100, y: 170};
        this.speed = {x: 4, y: 4};
    }

    draw(context){      
        context.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        //wall collison detectiont
        if(this.position.x + this.size > this.gameWidth || this.position.x < 0){
            this.wallSfx.play();
            this.speed.x = -this.speed.x;
        }

        // wall on top
        if(this.position.y < 0){
            this.wallSfx.play();
            this.speed.y = -this.speed.y;
        }

        // wall on the bottom
        if(this.position.y + this.size > this.gameHeight){
            this.loseSfx.play();
            this.game.lives-= 1;
            this.reset();
        }

        if(collison(this, this.game.paddel)){
            this.collide.play();
            this.speed.y = -this.speed.y;
            this.position.y = this.position.y - this.size;
        }

    }
}