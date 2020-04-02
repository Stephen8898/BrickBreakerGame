export default class Paddle {
    constructor(game){
        this.gameWidth = game.gameWidth;
    
        this.width = 150;
        this.height = 30;

        this.maxSpeed = 10;

        this.speed = 0;

        this.position = {
            x: game.gameWidth / 2 - this.width /2,

            y: game.gameHeight - this.height - 10,

        };
    }

    moveLeft(){
        this.speed = -this.maxSpeed;
    }

    moveRight(){
        this.speed = this.maxSpeed;
    }

    stop(){
        this.speed = 0;
    }

    draw(context){
        context.fillStyle = "#1565c0";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    //This update function will take in the change in time between each frame
    //The objects position would be updated to thier new position 
    update(deltaTime){

        //The new position will be summed by the speed and the deivided by the amount of 
        this.position.x += this.speed;

        if (this.position.x < 0) this.position.x = 0;

        if (this.position.x + this.width > this.gameWidth) 
            this.position.x = this.gameWidth - this.width;
    }
}