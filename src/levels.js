
import Brick from './brick.js';




export function buildLevel(game, level){

    let bricks = [];

    level.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {
            if(brick === 1){
                let position = {
                    x: 60 * brickIndex,

                    y: 60 + 24 * rowIndex
                }

                bricks.push(new Brick(game, position));
            }
        });
    });

    return bricks;
}



export const level1 = [
    [0,1,0,1,0,1,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,1]
]

export const level2 = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1]
]

export const level3 = [
    [0,1,0,1,0,0,0,0,0,0],
    [1,1,1,0,1,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1]
]

export const level4 = [
    [0,1,0,1,0,0,0,0,0,0],
    [1,1,1,0,1,0,0,0,0,0],
    [1,1,0,0,0,0,0,1,1,1],
]

export const level5 = [
    [0,0,0,0,1,1,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,1,1,0,0,0,0]
]


export const level6 = [
    [0,0,0,0,1,0,0,0,0,0],
    [1,1,1,0,0,0,0,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,1]
]

export const level7 = [
    [0,1,0,0,1,0,0,0,1,0],
    [1,0,1,0,0,0,0,1,0,1],
    [0,1,0,1,0,1,0,0,1,0],
    [1,0,0,1,0,0,1,0,0,1],
    [1,0,1,0,1,0,1,0,1,0],
    [1,0,0,0,1,0,0,0,0,1]
]

export const level8 = [
    [0,0,0,0,0,0,0,0,0,0]
]
