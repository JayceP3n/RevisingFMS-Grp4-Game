let board = [];
let currentPlayer = 'Shell';
let cols = 5;
let rows = 5;
let w, h;
let cellPadding = 0.2;
let startOverButton;

let shellImg; // Variable to hold the shell image
let fishImg; // Variable to hold the fish image
let clickSound, victorySound, lossSound, tieSound; // Sound variables including the tie sound

function preload() {
  shellImg = loadImage('images/game1-images/marioshell.png');
  fishImg = loadImage('images/game1-images/mariofish.png');
  clickSound = loadSound('sounds/click.wav');
  victorySound = loadSound('sounds/victory.mp3');
  lossSound = loadSound('sounds/loss.mp3');
  tieSound = loadSound('sounds/Tie.mp3'); // Loading the tie sound

  BackgroundImage = loadImage('images/game1-images/Background.jpg');
  resetImg = loadImage('images/game1-images/Reset.png'); // Load the reset button image
  youLoseImg = loadImage('images/game1-images/YouLose.png'); // Load the "You Lose" image
  youWonImg = loadImage('images/game1-images/YouWon.png'); // Load the "You Won" image
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  w = width / cols;
  h = (height - 50) / rows;
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push('');
    }
    board.push(row);
  }

  startOverButton = createImg('images/game1-images/Reset.png'); // Create reset button using image
  startOverButton.position(width - 80, height - 40);
  startOverButton.size(50, 30); // Set button size
  startOverButton.mousePressed(startOver);
}

function draw() {
  background(BackgroundImage);
  stroke(0);
  strokeWeight(2);
  for (let i = 1; i < rows; i++) {
    line(0, i * h, width, i * h);
  }
  for (let j = 1; j < cols; j++) {
    line(j * w, 0, j * w, height - 50);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * w + w / 2;
      let y = i * h + h / 2;
      let spot = board[i][j];
      if (spot === 'Shell') {
        drawShellOrFish(x, y, shellImg);
      } else if (spot === 'Fish') {
        drawShellOrFish(x, y, fishImg);
      }
    }
  }

  let result = checkWinner();
  if (result != null) {
    let winnerMark = result[0]; // 'Shell' or 'Fish'
    let startRow = result[1];
    let startCol = result[2];
    let endRow = result[3];
    let endCol = result[4];
    let startX = startCol * w;
    let startY = startRow * h;
    let endX = (endCol + 1) * w;
    let endY = (endRow + 1) * h;
    stroke(255, 0, 0);
    strokeWeight(4);
    noFill();
    rect(startX, startY, endX - startX, endY - startY);
    noLoop();

    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0, 102, 153);
    if (winnerMark === 'Shell') {
      let imageSize = min(width, height) * 0.5; // Adjust size of the image
      image(youWonImg, width / 2 - imageSize / 2, height / 2 - imageSize / 2, imageSize, imageSize); // Adjust position of the image
      victorySound.play(); // Play victory sound when you win
    } else {
      let imageSize = min(width, height) * 0.5; // Adjust size of the image
      image(youLoseImg, width / 2 - imageSize / 2, height / 2 - imageSize / 2, imageSize, imageSize); // Adjust position of the image
      lossSound.play(); // Play loss sound when you lose
    }
  } else if (isBoardFull()) {
    noLoop();
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0, 102, 153);
    text("Tie!", width / 2, height - 25);
    tieSound.play(); // Play the tie sound when the match results in a tie
  } else {
    if (currentPlayer === 'Fish') {
      cpuMove();
    }
  }
}

function mousePressed() {
  if (currentPlayer !== 'Shell') {
    return;
  }

  let i = floor(mouseY / h);
  let j = floor(mouseX / w);
  if (board[i][j] === '') {
    board[i][j] = currentPlayer;
    clickSound.play(); // Play click sound when a shell is placed
    currentPlayer = (currentPlayer === 'Shell') ? 'Fish' : 'Shell';
  }
}

function cpuMove() {
  let availableSpots = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === '') {
        availableSpots.push({ i: i, j: j });
      }
    }
  }

  // Check for potential winning moves
  for (let k = 0; k < availableSpots.length; k++) {
    let spot = availableSpots[k];
    let i = spot.i;
    let j = spot.j;
    board[i][j] = 'Fish';
    if (checkWinner()) {
      currentPlayer = 'Shell';
      return;
    }
    board[i][j] = ''; // Reset the move
  }

  // Check for potential blocking moves
  for (let k = 0; k < availableSpots.length; k++) {
    let spot = availableSpots[k];
    let i = spot.i;
    let j = spot.j;
    board[i][j] = 'Shell';
    if (checkWinner()) {
      board[i][j] = 'Fish'; // Block the potential win
      currentPlayer = 'Shell';
      return;
    }
    board[i][j] = ''; // Reset the move
  }

  // If no winning or blocking moves, place fish randomly
  let randomSpot = random(availableSpots);
  let i = randomSpot.i;
  let j = randomSpot.j;
  board[i][j] = 'Fish';
  currentPlayer = 'Shell';
}

function checkWinner() {
  for (let i = 0; i < rows - 1; i++) {
    for (let j = 0; j < cols - 1; j++) {
      if (board[i][j] !== '' && 
          board[i][j] === board[i][j + 1] && 
          board[i][j] === board[i + 1][j] && 
          board[i][j] === board[i + 1][j + 1]) {
        return [board[i][j], i, j, i + 1, j + 1];
      }
    }
  }
  return null;
}

function isBoardFull() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === '') {
        return false;
      }
    }
  }
  return true;
}

function drawShellOrFish(x, y, img) {
  let imageSize = min(w, h) * (1 - cellPadding * 2);
  image(img, x - imageSize / 2, y - imageSize / 2, imageSize, imageSize);
}

function startOver() {
  board = [];
  currentPlayer = 'Shell';
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push('');
    }
    board.push(row);
  }
  loop();
}