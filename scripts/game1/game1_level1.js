let board = [];
let currentPlayer = 'Shell';
let cols = 3;
let rows = 3;
let w, h;
let cellPadding = 0.2;
let startOverButton;
let continueButton;
let shellImage, fishImage;
let clickSound, victorySound, lossSound, tieSound;
let backgroundImage;
let resetButtonImage, nextButtonImage;
let youWinImage, youLoseImage;

function preload() {
  shellImage = loadImage('images/game1-images/marioshell.png');
  fishImage = loadImage('images/game1-images/mariofish.png');
  clickSound = loadSound('sounds/click.wav');
  victorySound = loadSound('sounds/victory.mp3');
  lossSound = loadSound('sounds/loss.mp3');
  tieSound = loadSound('sounds/Tie.mp3');
  backgroundImage = loadImage('images/game1-images/Background.jpeg');
  resetButtonImage = loadImage('images/game1-images/Reset.png');
  nextButtonImage = loadImage('images/game1-images/Next.png');
  youWinImage = loadImage('images/game1-images/YouWon.png'); // Load YouWon.png
  youLoseImage = loadImage('images/game1-images/YouLose.png'); // Load YouLose.png
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = width / cols;
  h = (height - 50) / rows;

  // Scale factor for button images
  let buttonScale = 0.15; // Adjust as needed for proper button sizing

  // Calculate button widths and heights based on canvas dimensions
  let buttonWidth = width * buttonScale;
  let buttonHeight = buttonWidth * (resetButtonImage.height / resetButtonImage.width);

  // Position the 'Reset' button
  startOverButton = createImg('images/game1-images/Reset.png', 'restart');
  startOverButton.size(buttonWidth, buttonHeight);
  startOverButton.position(width - buttonWidth - 20, height - buttonHeight - 20); // Adjust positioning
  startOverButton.mousePressed(startOver);

  // Position the 'Next' button
  continueButton = createImg('images/game1-images/Next.png', 'next level');
  continueButton.size(buttonWidth, buttonHeight);
  continueButton.position(20, height - buttonHeight - 20); // Adjust positioning
  continueButton.mousePressed(continueToLevel2);

  // Initialize the game board
  initializeBoard();
}

function draw() {
  background(backgroundImage);
  stroke(0);
  strokeWeight(4);

  // Draw grid lines
  for (let i = 1; i < rows; i++) {
    line(0, i * h, width, i * h);
  }

  for (let j = 1; j < cols; j++) {
    line(j * w, 0, j * w, height - 50);
  }

  // Draw game pieces
  drawGamePieces();

  // Check for game result
  let result = checkWinner();
  if (result != null) {
    displayGameResult(result);
    noLoop(); // Stop the game loop
  } else if (isBoardFull()) {
    displayGameResult(null); // Display tie game result
    noLoop(); // Stop the game loop
  } else {
    // CPU move if it's Fish's turn
    if (currentPlayer === 'Fish') {
      cpuMove();
    }
  }
}

function drawGamePieces() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * w + w / 2;
      let y = i * h + h / 2;
      let spot = board[i][j];

      if (spot === 'Shell') {
        image(shellImage, x - w / 4, y - h / 4, w / 2, h / 2);
      } else if (spot === 'Fish') {
        image(fishImage, x - w / 4, y - h / 4, w / 2, h / 2);
      }
    }
  }
}

function initializeBoard() {
  board = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push('');
    }
    board.push(row);
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
    currentPlayer = (currentPlayer === 'Shell') ? 'Fish' : 'Shell';
    clickSound.play();
  }
}

function cpuMove() {
  let availableSpots = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === '') {
        availableSpots.push({ row: i, col: j });
      }
    }
  }

  if (availableSpots.length > 0) {
    let randomIndex = floor(random(availableSpots.length));
    let move = availableSpots[randomIndex];
    board[move.row][move.col] = 'Fish';
    currentPlayer = 'Shell';
    clickSound.play();
  }
}

function checkWinner() {
  // Check rows
  for (let i = 0; i < rows; i++) {
    if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      return [{ x: 0, y: i }, { x: 2, y: i }];
    }
  }

  // Check columns
  for (let j = 0; j < cols; j++) {
    if (board[0][j] !== '' && board[0][j] === board[1][j] && board[0][j] === board[2][j]) {
      return [{ x: j, y: 0 }, { x: j, y: 2 }];
    }
  }

  // Check diagonals
  if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return [{ x: 0, y: 0 }, { x: 2, y: 2 }];
  }

  if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return [{ x: 2, y: 0 }, { x: 0, y: 2 }];
  }

  return null; // Return null if no winner
}

function isBoardFull() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === '') {
        return false; // Board is not full
      }
    }
  }
  return true; // Board is full
}

function displayGameResult(result) {
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0, 102, 153);

  if (result) {
    let startX = result[0].x * w + (w / 2);
    let startY = result[0].y * h + (h / 2);
    let endX = result[1].x * w + (w / 2);
    let endY = result[1].y * h + (h / 2);
    stroke(255, 0, 0);
    strokeWeight(10);
    line(startX, startY, endX, endY);

    let centerX = width / 2;
    let centerY = height / 2;

    // Define image display size (adjust as needed)
    let imageWidth = w * 2;
    let imageHeight = h * 2;

    if (board[result[0].y][result[0].x] === 'Shell') {
      image(youWinImage, centerX - imageWidth / 2, centerY - imageHeight / 2, imageWidth, imageHeight); // Display You Win image
      victorySound.play();
    } else {
      image(youLoseImage, centerX - imageWidth / 2, centerY - imageHeight / 2, imageWidth, imageHeight); // Display You Lose image
      lossSound.play();
    }
  } else {
    text("Tie!", width / 2, height - 25);
    tieSound.play();
  }
}

function startOver() {
  initializeBoard();
  currentPlayer = 'Shell';
  loop(); // Restart the game loop
}

function continueToLevel2() {
  // Redirect to level 2
  window.location.href = "https://editor.p5js.org/mnovlani/full/GNupRzcZs"; // Change the URL to your level 2 file
}
