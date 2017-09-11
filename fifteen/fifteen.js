/**
 * Dino Cajic
 */

// Records the starting time
var start = new Date();

// Records the total number of moves
var moves = 0;

// The available div elements
var ids = [
    "one",      "two",      "three",   "four",
    "five",     "six",      "seven",   "eight",
    "nine",     "ten",      "eleven",  "twelve",
    "thirteen", "fourteen", "fifteen", ""
];

// Since we're going to shuffle the divs, copy the ids into the shuffled array
var shuffled = ids.slice();

// Once shuffled, it's difficult to figure out which number is a digit, so just mapped numbers to digits
var ids_numeric = {
    "one":1,       "two":2,       "three":3,    "four":4,
    "five":5,      "six":6,       "seven":7,    "eight":8,
    "nine":9,      "ten":10,      "eleven":11,  "twelve":12,
    "thirteen":13, "fourteen":14, "fifteen":15, "sixteen":16
};

// Once the person changes the background, the current background is stored here
var selected_background;

// Maps the available movement. Looking at the ids array above, you can see that at array 0, value one,
// if the empty block was currently there, it can't move to the top or left, but it can move to the right and the bottom.
// top right bottom left
//[ 0,   1,    1,    0  ]
var movement = [
    [0, 1, 1, 0], //0: one
    [0, 1, 1, 1], //1: two
    [0, 1, 1, 1], //2: three
    [0, 0, 1, 1], //3: four
    [1, 1, 1, 0], //4: five
    [1, 1, 1, 1], //5: six
    [1, 1, 1, 1], //6: seven
    [1, 0, 1, 1], //7: eight
    [1, 1, 1, 0], //8: nine
    [1, 1, 1, 1], //9: ten
    [1, 1, 1, 1], //10: eleven
    [1, 0, 1, 1], //11: twelve
    [1, 1, 0, 0], //12: thirteen
    [1, 1, 0, 1], //13: fourteen
    [1, 1, 0, 1], //14: fifteen
    [1, 0, 0, 1]  //15: sixteen
];

// The available backgrounds
var background = ["super-mario", "luigi", "bowser", "toad"];

/**
 * Initializes the game to play
 * Displays a random image: one of the four possible options from the background array
 * Sets all of the different div (100x100) blocks to have a class of title and the random background
 */
function initializeGame() {
    var background_id = Math.floor((Math.random() * 4));
    selected_background = background[background_id];

    document.getElementById(background[background_id]).selected = true; // Grab the selected option and mark it as selected

    for (var i = 0; i < ids.length - 1; i++) {
        document.getElementById(ids[i]).className = "tile " + background[background_id];
    }
}

/**
 * Once the user selects a new option from the drop-down menu, the image selected is populated
 * The background image of the main div and each of the block divs is replaced
 */
function changeBackground() {
    var class_name = document.getElementById("characters").value;

    if (background.indexOf(class_name) < 0) {
        return;
    }

    selected_background = class_name;

    document.getElementById("main").innerHTML = "";

    for (var i = 0; i < ids.length; i++) {
        if (ids[i] == "") {
            document.getElementById("main").innerHTML += '<div id="sixteen" class="tile"></div>';
        } else {
            var id_name = ids[i];
            document.getElementById("main").innerHTML += '<div id="' + ids[i] + '" class="tile' + " " + selected_background + '">' + ids_numeric[id_name] + '</div>';
        }
    }
}

/**
 * Shuffles the board
 * Initializes the shuffle array to regular
 * Sets the empty block position
 * Loops through 500 times making sure the board is really shuffled
 * Generates a random number between 0 and 3: used for the movement array.
 * Checks to see if the movement that it selected for that particular block is set to 1, meaning that it can move,
 * otherwise it keeps trying a new random number.
 *   i.e. if the empty block is in the sixteenth block (helps to look at the ids array), the only movement that it can
 *        do is to the top or to the left (i.e. swap the position with it's neighbor). Otherwise, it can't move
 * Once the corrent movement is generated, the id of that movement is stored in movement_id. Looking at the movement
 * array, you'll notice that its indexes are mapped to top, right, bottom, left. If it needs to move to the top, you'll
 * need to subtract 4 from the current position.
 * Afterwards, the moved to and moved from are swapped in the shuffled array.
 * Finally, after all of the different possible shuffles, the displayBoard() function is called to display the board.
 */
function shuffleBoard() {
    shuffled = ids.slice(); // Reinitialize the shuffled array
    var sixteen = 15;

    // Set a loop to go through 500 times
    for (var i = 0; i < 500; i++) {

        var movement_id = Math.floor((Math.random() * 4));

        while(movement[sixteen][movement_id] != 1) {
            movement_id = Math.floor((Math.random() * 4));
        }

        // The index id where the blank space will go to
        var move_to;

        switch(movement_id) {
            case 0:
                move_to = sixteen - 4;
                break;
                // subtract 4 to go to the top
            case 1:
                move_to = sixteen + 1;
                break;
                // add 1 to go to the right
            case 2:
                move_to = sixteen + 4;
                break;
                // subtract 4 to go to the bottom
            case 3:
                move_to = sixteen - 1;
                break;
                // subtract 1 to go to the left
        }

        // swap sixteen and move_to
        var temp = shuffled[sixteen];
        shuffled[sixteen] = shuffled[move_to];
        shuffled[move_to] = temp;

        sixteen = move_to;
    }

    displayBoard();
}

/**
 * Clears the inner html of the file and cycles through the shuffled array displaying the div's within main in the correct order.
 */
function displayBoard() {
    document.getElementById("main").innerHTML = "";

    for (var i = 0; i < shuffled.length; i++) {
        if (shuffled[i] == "") {
            document.getElementById("main").innerHTML += '<div id="sixteen" class="tile"></div>';
        } else {
            var id_name = shuffled[i];
            document.getElementById("main").innerHTML += '<div id="' + shuffled[i] + '" class="tile' + " " + selected_background + '">' + ids_numeric[id_name] + '</div>';
        }
    }

    var clickable_id;

    if (movement[shuffled.indexOf("")][0] == 1) {
        clickable_id = shuffled.indexOf("") - 4;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][1] == 1) {
        clickable_id = shuffled.indexOf("") + 1;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][2] == 1) {
        clickable_id = shuffled.indexOf("") + 4;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][3] == 1) {
        clickable_id = shuffled.indexOf("") -1;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }
}

/**
 * Swaps the pieces and increments the total number of moves the player has done
 *
 * @param clickable_id
 * @param empty_id
 */
function swapPieces(clickable_id, empty_id) {
    animateMovement(clickable_id, empty_id);

    setTimeout(function() {
        var temp = shuffled[empty_id];
        shuffled[empty_id] = shuffled[clickable_id];
        shuffled[clickable_id] = temp;

        moves++;

        displayBoard();
        checkIfWon();
    }, 600);
}

/**
 * Animates the movement of the blocks
 * @param clickable_id
 * @param empty_id
 */
function animateMovement(clickable_id, empty_id) {
    if (clickable_id - 4 == empty_id) {
        console.log(shuffled[clickable_id]);
        document.getElementById(shuffled[clickable_id]).className += " animate-up";
    } else if (clickable_id + 1 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " animate-right";
    } else if (clickable_id + 4 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " animate-down";
    } else if (clickable_id - 1 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " animate-left";
    }
}

/**
 * Checks to see if the user won
 * Converts the two arrays into strings and compares them
 * If the user won, the end date is subtracted from the start date and the milliseconds are converted to seconds
 * The following items are displayed to the winner: total number of time elapsed in seconds, a winning image and
 * the number of moves used to complete the puzzle
 */
function checkIfWon() {
    if (ids.toString() == shuffled.toString()) { // Test the image, time and number of turns by swapping == to !=
        var end        = new Date();
        var elapsed_ms = end - start;
        var seconds    = Math.round(elapsed_ms / 1000);

        var html = "";
        html += "<img src='win.gif' alt='You win' />";
        html += "<p>Total time it took you to solve this puzzle (in seconds): " + seconds + "</p>";
        html += "<p>Total number of moves it took you to solve this puzzle: " + moves + "</p>";

        document.getElementById("win").innerHTML = html;
    }
}