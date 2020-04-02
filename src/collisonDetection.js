export function collison(ball, gameObject){
     //paddel collision detection

     let bottomBall = ball.position.y + ball.size;
     let topBall = ball.position.y;

     let topGameObj = gameObject.position.y;
     let leftGameObj = gameObject.position.x;
     let rightGameObj = gameObject.position.x + gameObject.width;
    let bottomGameObj =  gameObject.position.y + gameObject.height;

     if (bottomBall >= topGameObj 
        && topBall <= bottomGameObj &&
         ball.position.x  >= leftGameObj
         && ball.position.x + ball.size <= rightGameObj
         ){
        return true
     }
     else {
         return false;
     }
}