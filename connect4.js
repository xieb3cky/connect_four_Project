/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2

let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
// TODO: set "board" to empty HEIGHT x WIDTH matrix array
function makeBoard() {
    for (let i = 0; i < HEIGHT; i++) {
        board.push([]);
        for (let j = 0; j < WIDTH; j++) {
            board[i].push(null);
        }
    }

}


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
    // TODO: get "htmlBoard" letiable from the item in HTML w/ID of "board"
    const htmlBoard = document.querySelector("#board")
    // TODO: add comment for this code
    // create element tr/table row 
    let top = document.createElement("tr");
    //set top attribute id to "column-top"
    top.setAttribute("id", "column-top");
    //add event listener to top, listen for "click" -->  call handleClick 
    top.addEventListener("click", handleClick);

    //iterate through width (columns)
    for (let x = 0; x < WIDTH; x++) {
        //create element td/table data
        let headCell = document.createElement("td");
        //set headCell attribute id to x
        headCell.setAttribute("id", x);
        //append headCell to top
        top.append(headCell);
    }
    //append top to htmlBoard
    htmlBoard.append(top);

    // TODO: add comment for this code
    // iterating through height (rows)
    for (let y = 0; y < HEIGHT; y++) {
        // create element tr/table row
        const row = document.createElement("tr");
        //iterate through width (columns)
        for (let x = 0; x < WIDTH; x++) {
            //create element td/table data 
            const cell = document.createElement("td");
            //set cell attribute id to the y & x value
            cell.setAttribute("id", `${y}-${x}`);
            //append cell to row
            row.append(cell);
        }
        //append row to the html board
        htmlBoard.append(row);
    }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
//if column is full return a null value
function findSpotForCol(x) {
    // TODO: write the real version of this, rather than always returning 0
    //iterate through height (row)
    for (let i = HEIGHT - 1; i >= 0; i--) {
        //if board[i][x] equals to null return i (y/column)
        if (board[i][x] === null) {
            return i;
        }
    }
    // all board[i][x] equals to !null = filled column
    return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
    // TODO: make a div and insert into correct table cell
    //creates a new div
    const newDiv = document.createElement("div");
    //add class base on player#
    newDiv.classList.add("piece", `p${currPlayer}`)
    //get the cell base on the id 
    const cell = document.getElementById(`${y}-${x}`);
    // add the new div to the cell
    cell.append(newDiv);

    //update the global board letiable 
    //updates the cell with currPlayer #
    board[y][x] = currPlayer;

    /** endGame: announce game end */
}
function endGame(msg) {
    // TODO: pop up alert message
    alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
    // get x from ID of clicked cell
    let x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    let y = findSpotForCol(x);
    //if x column is filled, return
    if (y === null) {
        return;
    }

    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    placeInTable(y, x);

    // check for win
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
    }

    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame
    const checkFilled = () => {
        //checks every item in first row, if it's !null/filled
        return board[0].every((val) => val !== null)
    }

    //if checkFilled returns true, call endGame 
    if (checkFilled()) {
        endGame("is the entire board filled");
    }

    // switch players
    // TODO: switch currPlayer 1 <-> 2
    currPlayer = currPlayer === 1 ? 2 : 1;
}



/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
    //pass in cells array
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        //iterates through the cells array
        //checks if every cell in cells array equals to currPlayer
        return cells.every(
            ([y, x]) =>
                y >= 0 &&
                y < HEIGHT &&
                x >= 0 &&
                x < WIDTH &&
                board[y][x] === currPlayer
        );
    }

    // TODO: read and understand this code. Add comments to help you.
    // iterate through height (rows)
    for (let y = 0; y < HEIGHT; y++) {
        //iterate through width (column)
        for (let x = 0; x < WIDTH; x++) {
            //gets array of the 4 horizontal cells 
            let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
            //pass in the array in _win()
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}

makeBoard();
makeHtmlBoard();
