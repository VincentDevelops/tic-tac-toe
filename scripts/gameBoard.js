// handles the logical game board

function gameBoard(size) {

    const minimumBoardSize = 3;
    let boardSize = 3;

    const validateAndSetBoardSize = (size) => {
        if (size > minimumBoardSize) 
            boardSize = size;
        else 
            boardSize = minimumBoardSize;

    }

    validateAndSetBoardSize(size);
    
    // creates a matrix of size, ex size = 3
    // ['', '', '']
    // ['', '', '']
    // ['', '', '']
    let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(''));



    const setNewSize = (size) => {
        validateAndSetBoardSize(size);
        board = Array.from({ length: boardSize }, () => Array(boardSize).fill(''));
    }

    const isValidCoordinate = (x,y) => {
        if (x >= boardSize || x < 0 || y >= boardSize || y < 0)
            return false;

        return true;
    }

    const setSlotTo = (playerSign, x, y) => {
        if (isValidCoordinate(x,y))
            board[x][y] = playerSign;
        else 
            throw new Error("invalid coordinate found in gameBoard.js");
            
    };

    const getSlot = (x,y) => {
        if (isValidCoordinate(x,y))
            return board[x][y];
        else {
            throw new Error("Invalid coordinate selected");
        }
    }

    const resetBoard = () => {
        board.forEach(row => row.fill(''));
    }


    const getBoardSize = () => {return boardSize };

    return { setSlotTo, getSlot, resetBoard, setNewSize, isValidCoordinate, getBoardSize }
}
