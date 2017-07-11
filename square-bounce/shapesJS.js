/**
 * Created by Dino Cajic on 4/12/17.
 *
 * A canvas with 5 squares bouncing off of
 */

(function() {

    /**
     * Starts the creation
     */
    function init() {
        var context      = document.getElementById("my_canvas").getContext("2d");
        var canvasWidth  = context.canvas.width;
        var canvasHeight = context.canvas.height;

        var squares = [
            {y:20,  x:100, width:50, height:50, y_velocity:-1, x_velocity:-2, color:"magenta"},
            {y:80,  x:70,  width:50, height:50, y_velocity:1,  x_velocity:2,  color:"blue"},
            {y:150, x:130, width:50, height:50, y_velocity:1,  x_velocity:2,  color:"red"},
            {y:210, x:190, width:50, height:50, y_velocity:1,  x_velocity:2,  color:"pink"},
            {y:210, x:250, width:50, height:50, y_velocity:-1, x_velocity:-2, color:"purple"}
        ];

        // Initialize loop variables
        var i = 0, j = 0;

        /**
         * Animates the square movement.
         * Clears the screen prior to continuation
         * Loops through each of the squares and creates them.
         */
        function animate() {
            context.save();
            context.clearRect(0, 0, canvasWidth, canvasHeight);

            for (i = 0; i < squares.length; i++) {
                context.fillStyle = squares[i].color;
                context.fillRect( squares[i].x, squares[i].y, squares[i].width, squares[i].height );

                // Checks to see if y is at zero (top edge of the canvas) or
                // if y (top left corner of square + it's height = bottom left corner) is at the bottom of the screen.
                // If so, the velocity is reversed so that the square can move in the opposite direction.
                if ( squares[i].y == 0 || ( squares[i].y + squares[i].height == canvasHeight ) ) {
                    squares[i].y_velocity = -squares[i].y_velocity;
                }

                // Checks to see if x is at zero (left edge of the canvas) or
                // if x (top left corner of square + it's width = top right corner) is at the right edge of the screen.
                // If so, the velocity is reversed so that the square can move in the opposite direction.
                if ( squares[i].x == 0 || ( squares[i].x + squares[i].width == canvasWidth ) ) {
                    squares[i].x_velocity = -squares[i].x_velocity;
                }

                // y is incremented by the velocity of y
                squares[i].y += squares[i].y_velocity;

                // x is incremented by the velocity of x
                squares[i].x += squares[i].x_velocity;

                // This is where it needs to compare all values of other squares with it
                for (j = 0; j < squares.length; j++) {

                    // If it's the same square, continue
                    if (i == j) {
                        continue;
                    }

                    // i right side collision with j left side
                    if (squares[i].x + squares[i].width - squares[j].x == 0 ||
                        // i left side collision with j right side
                        squares[j].x + squares[j].width - squares[i].x == 0) {

                        // If square j is above square i
                        if ((squares[j].y + squares[j].height >= squares[i].y &&
                             squares[j].y + squares[j].height <= squares[i].y + squares[i].height) ||
                            // or if square j is below square i
                            (squares[j].y >= squares[i].y &&
                             squares[j].y <= squares[i].y + squares[i].height))
                        {
                            squares[i].x_velocity = -squares[i].x_velocity;
                            squares[j].x_velocity = -squares[j].x_velocity;
                        }


                    // i bottom side collision with j top side
                    } else if (squares[i].y + squares[i].height - squares[j].y == 0 ||
                               // i top side collision with j bottom side
                               squares[j].y + squares[j].height - squares[i].y == 0) {

                        // If square j is to the right of i
                        if ((squares[j].x >= squares[i].x &&
                             squares[j].x <= squares[i].x + squares[i].width) ||
                            // or if j is to the left of i
                            (squares[j].x + squares[j].width >= squares[i].x &&
                             squares[j].x + squares[j].width <= squares[i].x + squares[i].width))
                        {
                            squares[i].y_velocity = -squares[i].y_velocity;
                            squares[j].y_velocity = -squares[j].y_velocity;
                        }
                    }
                }
            }

            context.restore();
        }

        // Executes the animate function every 30 milliseconds.
        // The setInterval() method calls a function or evaluates an expression at specified intervals in milliseconds.
        // The setInterval() method will continue calling the function until clearInterval() is called, or the window is closed.
        // We put the setInterval() into a variable so that we can stop the interval
        var animateInterval = setInterval(animate, 30);

        var stop = 1;

        // Adds an event listener to the canvas so that when it's clicked, the animation is stopped
        context.canvas.addEventListener("click", function(e) {
            if (stop == 1) {
                clearInterval(animateInterval);
                stop = 0;
            } else {
                animateInterval = setInterval(animate, 30);
                stop = 1;
            }
        });
    }

    window.addEventListener('load', init, false);
}());