const puzzleContainer = document.getElementById("puzzle");
const shuffleBtn = document.getElementById("shuffle-btn");
const tiles = [];
let emptyTile = { row: 2, col: 2 }; // Bottom-right corner starts empty

// Initialize the puzzle
function initPuzzle() {
  puzzleContainer.innerHTML = "";
  tiles.length = 0;

  for (let row = 0; row < 3; row++) {
    tiles[row] = [];
    for (let col = 0; col < 3; col++) {
      const tileValue = row * 3 + col + 1;
      if (row === 2 && col === 2) {
        tiles[row][col] = { value: 0, element: null }; // Empty tile
      } else {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.textContent = tileValue;
        tile.addEventListener("click", () => moveTile(row, col));
        puzzleContainer.appendChild(tile);
        tiles[row][col] = { value: tileValue, element: tile };
      }
    }
  }
}

// Move a tile if adjacent to the empty space
function moveTile(row, col) {
  const isAdjacent =
    (Math.abs(row - emptyTile.row) === 1 && col === emptyTile.col) ||
    (Math.abs(col - emptyTile.col) === 1 && row === emptyTile.row);

  if (isAdjacent) {
    // Swap tile with empty space
    const tile = tiles[row][col];
    tiles[emptyTile.row][emptyTile.col] = tile;
    tiles[row][col] = { value: 0, element: null };

    if (tile.element) {
      puzzleContainer.appendChild(tile.element);
    }

    emptyTile = { row, col };
    checkWin();
  }
}

// Check if the puzzle is solved
function checkWin() {
  let isSolved = true;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const expectedValue = row * 3 + col + 1;
      if (row === 2 && col === 2) continue;
      if (tiles[row][col].value !== expectedValue) {
        isSolved = false;
        break;
      }
    }
  }
  if (isSolved) {
    setTimeout(() => alert("Congratulations! You solved the puzzle!"), 100);
  }
}

// Shuffle the tiles
function shuffleTiles() {
  for (let i = 0; i < 500; i++) {
    const directions = [
      { row: -1, col: 0 }, // Up
      { row: 1, col: 0 },  // Down
      { row: 0, col: -1 }, // Left
      { row: 0, col: 1 }   // Right
    ];
    const validMoves = directions.filter(dir => {
      const newRow = emptyTile.row + dir.row;
      const newCol = emptyTile.col + dir.col;
      return newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3;
    });
    const move = validMoves[Math.floor(Math.random() * validMoves.length)];
    const newRow = emptyTile.row + move.row;
    const newCol = emptyTile.col + move.col;
    moveTile(newRow, newCol);
  }
}

// Event listeners
shuffleBtn.addEventListener("click", shuffleTiles);

// Initialize the game
initPuzzle();
