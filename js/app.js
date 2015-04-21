// Enemies our player must avoid
var Enemy = function() {
    // The x position of the enemy
    this.x = -1 * 101;
    // The y position of the enemy
    this.y = (Math.floor(Math.random() * 4) + .6) * 83;
    // The speed of the enemy
    this.speed = Math.floor(Math.random() * 4 + 3) * 75;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 5 * 101) {
        this.x = -1 * 101;
        this.y = (Math.floor(Math.random() * 4) + .6) * 83;
        this.speed = Math.floor(Math.random() * 4 + 3) * 75;
    }
    else {
        this.x += dt * this.speed;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // The x position of the player
    this.x = 2 * 101;
    // The y position of the player
    this.y = 4.6 * 83;
    // The number of lives of the player
    this.lives = 4;
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    // False unless player has won
    this.won = false;
};


// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Locates the player in the starting position on the board
Player.prototype.restart = function() {
    this.x = 2 * 101;
    this.y = 4.6 * 83;
};

// Handle the directional key presses and move the player accordingly
Player.prototype.handleInput = function(direction) {
    if (direction == 'left') {
        if (this.x - 101 >= 0) {
            this.x -= 101;
        }
    }
    else if (direction == 'up') {
        if (this.y - 83 >= 0) {
            this.y -= 83;
        }
        else {
            this.won = true;
            this.lives = 4;
            this.restart();
        };
    }
    else if (direction == 'right') {
        if (this.x + 101 <= 4 * 101) {
            this.x += 101;
        }
    }
    else if (direction == 'down') {
        if (this.y + 83 <= 4.6 * 83) {
            this.y += 83;
        }
    }
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    Player.handleInput(allowedKeys[e.keyCode]);
});