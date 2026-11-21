const board = document.getElementById("game-board");
const message = document.getElementById("message");
const startButton = document.getElementById("start-button");

const size = 5;
const bombs = [1, 7, 12, 18, 23];
let cells = [];
let gameOver = false;
function startGame() {

  board.innerHTML = "";

  cells = [];

  gameOver = false;

  message.textContent = "ゲームスタート！";

  for (let i = 0; i < size * size; i++) {

    const cell = document.createElement("button");
    cell.classList.add("cell");

    cells.push({
      bomb: bombs.includes(i),
      open: false,
      number: 0
    });

    cell.addEventListener("click", function() {

      openCell(i);

    });

    board.appendChild(cell);
  }

  calculateNumbers();
}

function calculateNumbers() {

  for (let i = 0; i < cells.length; i++) {

    if (cells[i].bomb) {
      continue;
    }

    let count = 0;

    const row = Math.floor(i / size);
    const col = i % size;

    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        if (x === 0 && y === 0) {
          continue;
        }

        const newRow = row + y;
        const newCol = col + x;

        if (
          newRow >= 0 &&
          newRow < size &&
          newCol >= 0 &&
          newCol < size
        ) {
          const nextIndex = newRow * size + newCol;
          if (cells[nextIndex].bomb) {
            count++;
          }
        }
      }
    }

    cells[i].number = count;
  }
}
function openCell(i) {
  if (gameOver) {
    return;
  }
  if (cells[i].open) {
    return;
  }

  cells[i].open = true;

  const cell = board.children[i];

  cell.classList.add("open");

  if (cells[i].bomb) {

    cell.textContent = "💣";

    message.textContent = "ゲームオーバー！";

    gameOver = true;

    for (let j = 0; j < cells.length; j++) {

      if (cells[j].bomb) {
        board.children[j].textContent = "💣";
        board.children[j].classList.add("open");
      }
    }

    return;
  }

  if (cells[i].number > 0) {
    cell.textContent = cells[i].number;
  }
  checkClear();
}
function checkClear() {
  let unopened = 0;
  for (let i = 0; i < cells.length; i++) {
    if (!cells[i].bomb && !cells[i].open) {
      unopened++;
    }
  }
  if (unopened === 0) {
    message.textContent = "クリア！";
    gameOver = true;
  }
}
startButton.addEventListener("click", function() {
  startGame();
});
