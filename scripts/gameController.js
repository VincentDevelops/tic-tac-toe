// handles the rules of the game

const gameController = ((gameBoard, state) => {
    
    const board = gameBoard;

    let player1Turn = true;
    let player2Turn = false;
    let gameState =  state; // { won: false, tied: false, gameOver:false, winnerSign: null }


    const restartGame = () => {
        board.resetBoard();
        player1Turn = true;
        player2Turn = false;
        gameState.resetState();
    }

    const takeTurn = (row, column, sign) => {
        if (gameState.isGameOver())
            return;

        if (isValidMove(row,column)) {
            board.setSlotTo(sign, row, column);
            gameState.changePlayerTurn();
        } else {
            throw new Error("gameController: out of bounds slot selected")
        }
        updateGameState();


        if (player1Turn) {
            player1Turn = false;
            player2Turn = true;
        } else if (player2Turn) {
            player1Turn = true;
            player2Turn = false;
        }      
        
        return { validMove:true, won:false, tied: false, gameOver:false, winnerSign: null } 

    }

    const isValidMove = (row, column) => {
        // must bee within bounds
        if (!board.isValidCoordinate(row,column))
            return false;

        // slot cannot already be taken
        if (board.getSlot(row,column) !== '')
            return false;

        return true;
    }

    // winning functionality

    const isGameWon = () => {

        const verticalCheck = isGameWonVertically();
        const horizontalCheck = isGameWonHorizontally();
        const diagonalCheck = isGameWonDiagonally();

        if (verticalCheck.won) {
            gameState.setWon(verticalCheck.won);
            gameState.setWinnerSign(verticalCheck.winnerSign);
        }
        else if (horizontalCheck.won){
            gameState.setWon(horizontalCheck.won);
            gameState.setWinnerSign(horizontalCheck.winnerSign);
        }
        else if (diagonalCheck.won) {
            gameState.setWon(diagonalCheck.won);
            gameState.setWinnerSign(diagonalCheck.winnerSign);
        }
        else 
            gameState.setWon(false);

        return gameState.isGameWon();
    }

    // does not check for wins, simply if board is full. win must be checked 
    const isGameTied = () => {
        for (let row = 0; row < board.getBoardSize(); row ++) 
            for (let column = 0; column < board.getBoardSize(); column++)
                if (board.getSlot(row,column) === '')
                    return false;

        gameState.setTied(true);
        return gameState.isGameTied();
    }

    const isGameWonVertically = () => {

        let sign = '';

        for (let row = 0; row < board.getBoardSize(); row++){
            let column = 0;
            sign = board.getSlot(row , column);
            
            if (sign === '')
                continue;

            while (column < board.getBoardSize() && sign === board.getSlot(row,column)) {
                column++;
            }

            if (column === board.getBoardSize())
                return { won:true, winnerSign:sign }

        }
        
        return { won:false, winnerSign: null };
    }

    const isGameWonHorizontally = () => {
        let sign = '';

        for (let column = 0; column < board.getBoardSize(); column++){
            let row = 0;
            sign = board.getSlot(row , column);
            
            if (sign === '')
                continue;

            while (row < board.getBoardSize() && sign === board.getSlot(row,column)) {
                row++;
            }

            if (row === board.getBoardSize())
                return { won:true, winnerSign:sign }

        }
        
        return { won:false, winnerSign:null };
    }

    const isGameWonDiagonally = () => {

        // going top left to bottom right 
        let row = 0;
        let column = 0;

        let sign = board.getSlot(row,column);

        if (sign !== '') {
            while (row < board.getBoardSize() && column < board.getBoardSize()) {
                if (sign !== board.getSlot(row,column))
                    break;
                row++;
                column++;
            }

            if (row === board.getBoardSize() && column === board.getBoardSize())
                return { won:true, winnerSign:sign }

        } 
        
        // going top right to bottom left
        row = board.getBoardSize() - 1;
        column = 0;
        sign = board.getSlot(row,column);

        if (sign !== '') {

            while (row >= 0 && column < board.getBoardSize()) {
                if (sign !== board.getSlot(row,column))
                    break;

                row--;
                column++;
            }

            if (row === -1 && column === board.getBoardSize())
                return { won:true, winnerSign:sign }
            
        }

        return { won:false ,winnerSign:null };
    }

    const updateGameState = () => {
        if (isGameWon())
            return;
        if (isGameTied())
            return;
    }
    
    const isPlayer1Turn = () => { return player1Turn }

    return { restartGame, takeTurn, 
                isGameWon , isPlayer1Turn }
    
})

const board = gameBoard(3);
const state = gameState();
const controller = gameController(board, state);

controller.takeTurn(0,0,'x');
controller.takeTurn(1,1,'x');
controller.takeTurn(1,2,'x');
controller.takeTurn(2,0,'x');
controller.takeTurn(2,2,'x');
controller.takeTurn(2,1,'x');
controller.takeTurn(1,0,'x');
console.log(state.isGameWon());


for (let row = 0; row < 3; row ++) {
    let line = '';
    for (let column = 0; column < 3; column++) {
        if (board.getSlot(row,column) == '')
            line += "_"; 
        else
            line += board.getSlot(row,column);

    }

    console.log(line);
}