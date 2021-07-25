export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 21;

export const createStage = (height, width) => Array.from(Array(height), () => Array(width).fill([0, 'clear']));

export const createMainStage = () => createStage(STAGE_HEIGHT, STAGE_WIDTH);

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.shape.length; y++) {
    for (let x = 0; x < player.tetromino.shape[y].length; x++) {
      // 1. Check that we're on an actual tetromino cell
      if (player.tetromino.shape[y][x] !== 0) {
        if (
          // 2. Check if our move is inside the game height area (y)
          !stage[y + player.pos.y + moveY]
          // 3. Check if our move is inside the game width area (x)
          || !stage[y + player.pos.y + moveY][x + player.pos.x + moveX]
          // 4. Check if the cell we're moving to isn't set to clear
          || (stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear')
        ) {
          return true;
        }
      }
    }
  }
  // 5. If everything above is false
  return false;
};
