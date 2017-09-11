Fifteen Game

The Sliding Puzzle is a simple classic game consisting of a 4x4 grid of numbered squares with one square missing.
The object of the game is to arrange the tiles into numerical order by repeatedly sliding a square that neighbors
the missing square into its empty space.

![Demo 1](http://dinocajic.xyz/projects/fifteen/demo_images/1.JPG)

Four Features Implemented:
- End-of-game notification - Can be seen in fifteen.js in checkIfWon() function (line 252)
- Animations and/or transitions - Can be seen in fifteen.js in animateMovement() function (line 232)
- Game time - Can be seen in fifteen.js in checkIfWon() function (line 252)
- Multiple backgrounds - Can be seen in fifteen.js in background array (line 59)

General Directions:
- You will write the JavaScript code for a page fifteen.html that plays the Fifteen Puzzle.
- You create a background image of your own choosing, displayed underneath the tiles of the board.
- Create fifteen.js, the JavaScript code for your web page
- Create background.jpg, your background image, suitable for a puzzle of size 400x400 px.
- You CAN create your own XHTML or CSS code in this assignment or instead, use the CSS provided.
- Write JavaScript code that interacts with the page using the DOM.
- In order to create its appearance, write appropriate DOM code to change styles of onscreen elements by setting classes, IDs, and/or style properties on them.

Specific Directions:
- In the center of the page is a set of tiles representing the playable Fifteen Puzzle game.
- Each tile is 100x100 pixels in total size, including a 2px black border around all four of its sides.
  + This leaves 96x96 pixels visible area inside the tile.
- Each tile displays a number from 1 to 15 in 32pt text using the default sans-serif font available on the system.
- When the page loads, initially the tiles are arranged in their correct order, top to bottom, left to right, with the missing square in the bottom-right.
- The tiles also should display a chunk of the image background.jpg
- Please ensure that your background image appears on the 15 puzzle pieces.
- By adjusting the background-position on each div which is a container, you'll be able to show a different piece of the background on each of the 15 puzzle pieces.
  + If you wanted a 100x100px div to show the top-right corner of a 400x400px background image, you would set its background-position to -300px 0px.
- Centered underneath the puzzle tiles is a Shuffle button that can be clicked to randomly rearrange the tiles of the puzzle.
- The last content on the page is a right-aligned paragraph containing two links to the W3C validators and JSLint.
- All other style elements on the page are subject to the preference of the web browser.

- When the Shuffle button is clicked, the tiles of the puzzle are randomized.
  + The tiles must be rearranged into a solvable state.
  + It has been proven that the puzzle cannot be solved if you switch only its 14 and 15 tiles.
  + We suggest that you generate a random solvable puzzle state by repeatedly choosing a random neighbor of the missing tile and sliding it onto the missing tile's space.
  + A few hundred such random movements should produce a shuffled board.
- When the mouse button is pressed on a puzzle square, if that square is next to the blank square, it is moved into the blank space.
  + If the square does not neighbor the blank square, no action occurs.
  + Similarly, if the mouse is pressed on the empty square or elsewhere on the page, no action occurs.
- Whenever the mouse cursor hovers over a square that can be moved (one that neighbors the blank square), its appearance should change.
  + Its border color should change from black to red.
  + Its text should become underlined and should become drawn in a green color of #006600.
  + Once the cursor is no longer hovering over the square, its appearance should revert to its original state.
  + Hovering the mouse over a square that cannot be moved has no effect.
- Provide some sort of visual notification when the game has been won.
  + An alert is not sufficient; you should modify the appearance of the page. You may display an image(s) if you like.
- Game time: Keep track of the game time elapsed in seconds and the total number of moves, and when the puzzle has been solved, display them along with the best time/moves seen so far.
- Animations and/or transitions: Instead of each tile immediately appearing in its new position, make them animate.
  + You can do any sort of animation or other styling you like, as long as the game ends up in the proper state after a reasonable amount of time.
- Multiple backgrounds: Provide several background images (at least 4) to choose from.
  + The game should choose a random background on startup, and should have a UI
    (such as a select box) by which the player can choose a different image while playing.
