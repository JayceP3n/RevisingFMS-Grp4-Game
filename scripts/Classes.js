/** @class */
class ButtonClass {
  /**
   * @contructor
   *   @param {Image File path: string} src - File path of button's image
   *   @param {string} alt - Alternative name incase the picture did not load
   *   @param {number} xSize - Width of the button
   *   @param {number} ySize - Height of the button
   *   @xPos {numer} xPos - x-position of the button
   *   @yPos {number} yPos - y-position of the button
   */
  constructor(varName, src, alt, xSize, ySize, xPos, yPos, text, fill, txtSize, xPosTxt, yPosTxt, link) {
    this.varName = varName
    this.src = src;
    this.alt = alt;
    this.xSize = xSize;
    this.ySize = ySize;
    this.xPos = xPos;
    this.yPos = yPos;
    this.text = text;
    this.fill = fill;
    this.txtSize = txtSize;
    this.xPosTxt = xPosTxt;
    this.yPosTxt = yPosTxt;
    this.link = link;

    this.varName = createImg(this.src, this.alt); // Change to createElement() if using images
    this.displayImg();
    this.visible = true;
    this.createTextElement();
  }

  displayImg() {
    this.varName.size(this.xSize, this.ySize);
    let adjustedXPos = this.xPos - this.xSize / 2; // Adjust position for the center of the image
    let adjustedYPos = this.yPos - this.ySize / 2; // Adjust position for the center of the image
    this.varName.position(adjustedXPos, adjustedYPos);
    this.varName.elt.style.opacity = '0.9'; // Adjust opacity value as needed
    this.varName.elt.style.zIndex = '-0.5'; // Adjust z-index value as needed
    this.varName.elt.style.margin = '0px'; // Remove any margins

    // Add event listener for mouseClicked
    this.varName.mouseClicked(() => {
      window.open(this.link, "_self");
    });

    // Add event lisenter for mouseOver
    this.varName.mouseOver(() => {
      console.log("MouseOver");
    });
  }

  createTextElement() {
    this.textElement = createP(this.text);
    this.textElement.position(this.xPosTxt/1.3-25, this.yPosTxt-45);
    this.textElement.style('color', this.fill);
    this.textElement.style('font-family', 'Arial');
    this.textElement.style('font-size', `${this.txtSize}px`);
    this.textElement.style('font-weight', 'bold'); // Added bold formatting
    this.textElement.style('display', this.visible ? 'block' : 'none');
  }

  toggleVisibility() {
    this.visible = !this.visible;
    this.textElement.style('display', this.visible ? 'block' : 'none');
  }

}

/**
 * @class Fish
 */
class Fish {

  /** @construct */
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  update() {
    // Move the fish horizontally
    this.x += this.speed;

    // Reset the fish's position when it moves off-screen
    if (this.x > width + 30) {
      this.x = -30;
    }
  }

  display() {
    // Body
    fill(255, 204, 0);
    ellipse(this.x, this.y, 60, 40);

    // Tail
    fill(255, 102, 0);
    triangle(this.x - 30, this.y, this.x - 60, this.y - 20, this.x - 60, this.y + 20);

    // Eye
    fill(0);
    ellipse(this.x + 20, this.y - 5, 10, 10);
  }
}

class Bubble {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  update() {
    // Move the bubble upwards
    this.y -= this.speed;
  }

  display() {
    // Display the bubble
    fill(146, 187, 231, 150);
    noStroke();
    ellipse(this.x, this.y, 50, 50);
  }
}