/**
 * Read the README.md file for updates
 * 
 * [!REMINDERS]
 *   > There are some codes that are left for debug purposes
 *
 * [!NOTICE]
 *   > IF ANYONE SEES THIS, I HAVE CONNECTED MY GITHUB ACCOUNT TO THIS REPLIT TO HOST A WEBSITE BUT ITS STILL WORK IN PROGRESS
 *   > GO TO THIS LINK TO ACCESS THE GITHUB:      https://github.com/JayceP3n/FMS_Team4
 */

let fishes = []; // An array of fishes objects
let x = 0;       // x-position of the fishes
let y = 200;     // y-position of the fishes

let bubbles = [];          // An array of bubbles objects
let bubbleIntensity = 0.5; // The intensity of the bubbles

var mainPage_bg;      // Variable for mainPage background image
var starterBtn;       // Start button
var titleUI;          // Variable for title UI image
var mainPage_bgMusic; // Variable for mainPage background music

/**
 * The function preload() helps prevent any delays or glitches that may
 * occur while the program is running by ensuring that all necessary resources are
 * preloaded and ready to use.
 */
function preload() {
  mainPage_bg = loadImage("images/background/mainPage_bg.jpg");
  loadImage("images/Trimmed_FMS_title.png");
  loadImage("images/buttons/First_button_sign.png");
  loadImage("images/buttons/Second_button_sign.png");
  loadImage("images/buttons/Third_button_sign.png");
  mainPage_bgMusic = loadSound("sounds/ocean-waves-112906.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  // Play background music
  // playBGMusic();

  // Create multiple fish objects
  CreateFish();

  // Create image object for title GUI
  titleUI = createImg("images/Trimmed_FMS_title.png", "FMS Title");

  // Create image object for buttons
  CreateButtons();
}

function draw() {
  background(mainPage_bg);

  // Updates and Display the Fishies
  updateDisplayFishy();

  // Update and display each bubble
  CreateAndDisplayBubbles();

  // Display the title UI on screen
  displayTitleUI();

  // Display the button UI on screen
  displayButtons();
}

/**
 * In the following codes, these are the functions that are used to create the main page of the game
 */

// Function to create multiple fish objects
function CreateFish() {
  for (let i = 0; i < 5; i++) {
    let fish = new Fish(random(width), random(height), random(1, 3));
    fishes.push(fish);
  }
}

// Function to create multiple button objects
function CreateButtons() {
  firstBtn = createImg("images/buttons/First_button_sign.png", "First Button");
  secondBtn = createImg("images/buttons/Second_button_sign.png", "Second Button")
  thirdBtn = createImg("images/buttons/Third_button_sign.png", "Third Button")
}

// Function to update and display Fishies
function updateDisplayFishy() {
  for (let i = 0; i < fishes.length; i++) {
    fishes[i].update();
    fishes[i].display();
  }
}

// Update and display each bubble
function CreateAndDisplayBubbles() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].display();
    if (bubbles[i].y < 0) {
      bubbles.splice(i, 1);
    }
  }

  // Generate bubbles randomly
  if (random(bubbleIntensity) < 0.03) {
    let bubble = new Bubble(random(width), height, random(3, 8));
    bubbles.push(bubble);
  }
}

// Display Title UI
function displayTitleUI() {
  titleUI.size(windowWidth/2, windowHeight/2);
  titleUI.position(width/2-titleUI.width/2, (height/2-titleUI.height/2) - 200 );
}

// Display Button UI and create event listeners
function displayButtons() {
  let buttonWidth = windowWidth/4;
  let buttonHeight = windowHeight/6;
  let firstGame = "https://jaycep3n.github.io/RevisingFMS-Grp4-Game/game1.html";
  let secondGame = "";
  let thirdGame = "";

  // This is a test code
  // let firstGame = "https://bdbd7bff-8635-45ac-8fc3-57633c6e20d5-00-24hd4tpq1ak9i.kirk.replit.dev/";

  firstBtn.size(buttonWidth, buttonHeight);
  firstBtn.position(width/2-firstBtn.width/2, height/2-firstBtn.height/2);

  secondBtn.size(buttonWidth, buttonHeight);
  secondBtn.position(width/2-secondBtn.width/2, height/2-secondBtn.height/2 + 130);


  thirdBtn.size(buttonWidth, buttonHeight)
  thirdBtn.position(width/2-thirdBtn.width/2, height/2-thirdBtn.height/2 + 260);

  // Add event listener for buttons
  firstBtn.mouseClicked(() => {
    window.open(firstGame, "_self");
  })
  secondBtn.mouseClicked(() => {
    window.open(secondGame, "_self");
  })
  thirdBtn.mouseClicked(() => {
    window.open(thirdGame, "_self");
  })
}

// Function to play music
function playBGMusic() {
  mainPage_bgMusic.setVolume(.3);
  mainPage_bgMusic.play();
  mainPage_bgMusic.loop();

}

