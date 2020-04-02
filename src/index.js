import Game from './game.js';

let canvas = document.getElementById('gamescreen');

// context of the canvas
//Gives the rendering context to draw to the canvas
let context = canvas.getContext('2d');


const GAME_WIDTH = 600;

const GAME_HEIGHT = 500;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();
 
//draw square to the canvas
//position: x,y || object-size: w,h


// context.fillStyle = "#1565c0";
// context.fillRect(GAME_WIDTH / 2 - 150 /2, GAME_HEIGHT - 30 - 10, 150, 30);


let lastTime = 0;

// Creating the Game loop
function gameLoop(currTime){

    let deltaTime = currTime - lastTime;

    lastTime = currTime;
    context.clearRect(0,0, GAME_WIDTH, GAME_HEIGHT);
    //clear the canvas
    game.update(deltaTime);
    game.draw(context);


    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);