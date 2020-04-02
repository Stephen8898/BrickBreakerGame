export default class InputHandler {

    constructor(paddel){
        document.addEventListener('keydown', e => {
            switch(e.keyCode){

                case 37:
                    paddel.moveLeft();
                    break;

                case 39:
                     paddel.moveRight();
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