export const TETROMINOS = {
  0: {
    shape: [[0]],
    color: '0, 0, 0',
  },
  I: {
    shape: [
      [0, 0, 0, 0],
      ['I', 'I', 'I', 'I'],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: '80, 227, 230',
  },
  J: {
    shape: [
      ['J', 0, 0],
      ['J', 'J', 'J'],
      [0, 0, 0],
    ],
    color: '36, 95, 223',
  },
  L: {
    shape: [
      [0, 0, 'L'],
      ['L', 'L', 'L'],
      [0, 0, 0],
    ],
    color: '223, 173, 36',
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O'],
    ],
    color: '223, 217, 36',
  },
  S: {
    shape: [
      [0, 'S', 'S'],
      ['S', 'S', 0],
      [0, 0, 0],
    ],
    color: '48, 211, 56',
  },
  T: {
    shape: [
      [0, 'T', 0],
      ['T', 'T', 'T'],
      [0, 0, 0],
    ],
    color: '132, 61, 198',
  },
  Z: {
    shape: [
      ['Z', 'Z', 0],
      [0, 'Z', 'Z'],
      [0, 0, 0],
    ],
    color: '227, 78, 78',
  },
};

function* tgm3Randomizer() {
  const pieces = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  const order = [];

  // Create 35 pool.
  const pool = pieces.concat(pieces, pieces, pieces, pieces);

  // First piece special conditions
  const firstPiece = ['I', 'J', 'L', 'T'][Math.floor(Math.random() * 4)];
  yield firstPiece;

  const history = ['S', 'Z', 'S', firstPiece];

  while (true) {
    let roll;
    let i;
    let piece;

    // Roll For piece
    for (roll = 0; roll < 6; ++roll) {
      i = Math.floor(Math.random() * 35);
      piece = pool[i];
      if (history.includes(piece) === false || roll === 5) {
        break;
      }
      // eslint-disable-next-line prefer-destructuring
      if (order.length) pool[i] = order[0];
    }

    // Update piece order
    if (order.includes(piece)) {
      order.splice(order.indexOf(piece), 1);
    }
    order.push(piece);

    // eslint-disable-next-line prefer-destructuring
    pool[i] = order[0];

    // Update history
    history.shift();
    history[3] = piece;

    yield piece;
  }
}

function tetrominoGeneration() {
  let tetrominoGenerator = tgm3Randomizer();

  function restartPool() {
    tetrominoGenerator = tgm3Randomizer();
  }

  function randomTetromino() {
    const piece = tetrominoGenerator.next().value;
    return TETROMINOS[piece];
  }

  function createNextPiecesArray(piecesAmount) {
    const array = [];
    for (let i = 0; i < piecesAmount; i++) {
      array.push(randomTetromino());
    }
    return array;
  }

  return {
    randomTetromino,
    createNextPiecesArray,
    restartPool,
  };
}

export const {
  randomTetromino,
  createNextPiecesArray,
  restartPool,
} = tetrominoGeneration();
