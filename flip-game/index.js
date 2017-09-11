/**
 * Created by Dino Cajic on 7/15/2017.
 */

var list_of_images;
var board_images;
var time  = 0;
var guess = [];
var guessed_images = [];
var won = false;

/**
 * Initializes the game
 *
 * Grabs the select option values and sets the number of images and the difficulty level
 * If the user did not select either number of images or the difficulty level, an alert box appears stating that they must
 * Changes the Start Button to a Restart Button
 * The timer starts counting down
 * The arrays holding the list of images and the board images are initialized to empty arrays
 * The images located in the "images" directory are loaded into the array list_of_images
 * The board images are generated and shuffled
 * The board is displayed for a set number of seconds
 * Images are hidden
 */
function initializeGame() {
    var number_of_images = document.getElementById("num_of_images").value;
    var difficulty_level = document.getElementById("difficulty").value;

    if (number_of_images == 0) {
        alert("You must select a tile count");
        return;
    }

    if (difficulty_level == 0) {
        alert("You must select a difficulty level");
        return;
    }

    document.getElementById("submit_button").innerHTML = '<input type="submit" value="Restart" name="start" id="start" onclick="restartGame()" />';

    initializeTimer(number_of_images);

    list_of_images = [];
    board_images   = [];

    initializeImages(parseInt(number_of_images));
    initializeBoardImages();
    displayBoard();
    flipBoard(parseInt(difficulty_level));
}

/**
 * Restarts the game
 */
function restartGame() {
    location.reload();
}

/**
 * Starts the countdown timer
 * @param number_of_images
 */
function initializeTimer(number_of_images) {
    var timer_div = document.getElementById("timer");

    switch (parseInt(number_of_images)) {
        case 8:
            time = 120;
            break;
        case 10:
            time = 150;
            break;
        case 12:
            time = 180;
            break;
    }

    timer_div.innerHTML = time;

    var timer = setInterval(function() {
        if (time > 0) {
            if (!won) {
                timer_div.innerHTML = time;
                time--;
            }
        } else {
            if (!won) {
                // This is where it ends
                alert("Sorry you lost.");
                location.reload();
            }
        }
    }, 1000);
}

/**
 * Initialize saved images
 * @param num_of_images
 */
function initializeImages(num_of_images) {
    for (var i = 1; i < num_of_images + 1; i++) {
        list_of_images[i] = "images/" + i + ".jpg";
    }
}

/**
 * Creates a random array of images to be used in the guessing game
 */
function initializeBoardImages() {
    var j = 1;

    for (var i = 0; i < (list_of_images.length * 2) - 2; i++) {

        board_images[i] = list_of_images[j];

        if (j == list_of_images.length -1) {
            j = 1;
        } else {
            j++;
        }
    }

    board_images.sort(function(a,b) { return 0.5 - Math.random()});
}

/**
 * Displays the board
 */
function displayBoard() {
    var html;
    html = "<table id='boardgame'><tr>";

    for (var i = 0; i < board_images.length; i++) {
        if (i % 4 == 0 && i != 0) {
            html += "</tr><tr>";
        }

        html += "<td class='images' id='image_" + i + "'><img src='" + board_images[i] + "'></td>";
    }

    html += "</tr></table>";

    document.getElementById("board").innerHTML = html;
}

/**
 * Hides all of the images on the board after a specified amount of time
 * @param difficulty
 */
function flipBoard(difficulty) {
    setTimeout(function(){

        for (var i = 0; i < board_images.length; i++) {
            var image = document.getElementById("image_" + i).innerHTML;
            document.getElementById("image_" + i).innerHTML = image + "<div class='overlay' onclick='flipImage(" + i + ")'></div>";
        }

    }, (difficulty * 1000));
}

/**
 * Flips the image when it's clicked
 * When each image is clicked, the image id is pushed into the guess array. When two image id's are present in the guess array,
 * the image id's are taken and the values of the board_images array are compared. If they're identical, the image id's are
 * added to the guessed_images array. Otherwise, the cards are flipped back over and the guess array is cleared. After each
 * guess, the length of the board_images and the guessed_images are compared. Once all of the id's have been added to the
 * guessed_images, the array should be full and a message stating that you won the game will be displayed. The won variable
 * will be changed to true so that the timer can stop counting down.
 *
 * @param img - the image id
 */
function flipImage(img) {
    document.getElementById("image_" + img).innerHTML = "<img src='" + board_images[img] + "'>";

    guess.push(img);

    if (guess.length == 2) {
        if (board_images[guess[0]] == board_images[guess[1]]) {
            guessed_images.push(guess[0]);
            guessed_images.push(guess[1]);
        } else {
            setTimeout(function() {
                document.getElementById("image_" + guess[0]).innerHTML = "<img src='" + board_images[guess[0]] + "'>" + "<div class='overlay' onclick='flipImage(" + guess[0] + ")'></div>";
                document.getElementById("image_" + guess[1]).innerHTML = "<img src='" + board_images[guess[1]] + "'>" + "<div class='overlay' onclick='flipImage(" + guess[1] + ")'></div>";
            }, 300);
        }

        setTimeout(function() {
            guess = [];
        }, 300);
    }

    if (parseInt(board_images.length) == parseInt(guessed_images.length)) {
        setTimeout(function() {
            won = true;
            document.getElementById("won").innerHTML = "<h1>You won the game. Press Restart to play again.</h1>";
        }, 500);
    }
}