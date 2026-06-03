// handles the logical game board

const gameBoard = (size) => {

    const minimumBoardSize = 3;
    let boardSize = 3;

    const validateAndSetBoardSize = (size) => {
        if (size > minimumBoardSize) 
            boardSize = size;
        else 
            boardSize = minimumBoardSize;

    }

    validateAndSetBoardSize(size);
    
    // creates a matrix of size boardSize, ex boardSize = 3
    // ['', '', '']
    // ['', '', ''] where board[0,0] is found on the top left
    // ['', '', ''] and board[2, 2] is the bottom right
    let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(''));



    const setNewSize = (size) => {
        validateAndSetBoardSize(size);
        board = Array.from({ length: boardSize }, () => Array(boardSize).fill(''));
    }

    const isValidCoordinate = (row,column) => {
        if (row >= boardSize || row < 0 || column >= boardSize || column < 0)
            return false;

        return true;
    }

    const setSlotTo = (playerSign, row, column) => {
        if (isValidCoordinate(row,column))
            board[row][column] = playerSign;
        else 
            throw new Error("invalid coordinate found in gameBoard.js");
            
    };

    const getSlot = (row,column) => {
        if (isValidCoordinate(row,column))
            return board[row][column];
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
