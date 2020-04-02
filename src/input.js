export default class InputHandler {

    constructor(paddel, game){
        document.addEventListener('keydown', e => {
            // console.log(e.keyCode)
            switch(e.keyCode){

                case 37:
                    paddel.moveLeft();
                    break;

                case 39:
                     paddel.moveRight();
                    break;

                    //pause listener feature to game state
                case 32: 
                    game.togglePause();
                    break;  
                // Enter key to start game
                case 16:
                    game.start();
                    break;
            }
        });

        document.addEventListener('keyup', e => {
            switch(e.keyCode){

                case 37:
                    if(paddel.speed < 0) paddel.stop();
                    break;

                case 39:
                    if (paddel.speed > 0) paddel.stop();
                    break;

            }
        });
    }
}