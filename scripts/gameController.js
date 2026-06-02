// handles the rules of the game

const gameController = ((size) => {
    
    const board = gameBoard(size);

    let player1Turn = true;
    let player2Turn = false;
    let gameState = { won: false, tied: false, gameOver:false, winnerSign: null }


    const restartGame = () => {
        board.resetBoard();
        player1Turn = true;
        player2Turn = false;
        gameState =  { won: false, tied: false, gameOver:false, winnerSign: null };
    }

    const takeTurn = (x, y, sign) => {
        if (gameState.gameOver)
            return gameState;

        if (isValidMove(x,y)) {
            board.setSlotTo(sign, x, y);
        } else {
            return { validMove:false, won:false, tied: false, gameOver:false, winnerSign: null } 
        }

        gameState = isGameOver();
        if (gameState.won) {
            return { validMove:true, won:true, tied: false, gameOver:true, winnerSign:gameState.winnerSign } 
        } else if (gameState.tied) {
            return { validMove: true, won: false, tied: true, gameOver:true, winnerSign: null }
        }      


        if (player1Turn) {
            player1Turn = false;
            player2Turn = true;
        } else if (player2Turn) {
            player1Turn = true;
            player2Turn = false;
        }      
        
        return { validMove:true, won:false, tied: false, gameOver:false, winnerSign: null } 

    }

    const isValidMove = (x, y) => {
        // must bee within bounds
        if (!board.isValidCoordinate(x,y))
            return false;

        // slot cannot already be taken
        if (board.getSlot(x,y) !== '')
            return false;

        return true;
    }

    // winning functionality

    const isGameWon = () => {

        const verticalCheck = isGameWonVertically();
        const horizontalCheck = isGameWonHorizontally();
        const diagonalCheck = isGameWonDiagonally();

        if (verticalCheck.won) 
            return { won:true, gameOver:true, winnerSign:verticalCheck.winnerSign }
        else if (horizontalCheck.won)
            return { won:true, gameOver:true, winnerSign:horizontalCheck.winnerSign }
        else if (diagonalCheck.won)
            return { won:true, gameOver:true, winnerSign:diagonalCheck.winnerSign }
        else 
            return { won:false, gameOver:false, winnerSign:null }
    }

    const isGameOver = () => {
        
        const winCheck = isGameWon();
        if (winCheck.won) {
            return { won:true, tied:false, gameOver:true, winnerSign:winCheck.winnerSign }
        }
        if (isGameTied()) {
            return { won:false, tied:true, gameOver:true, winnerSign:null }
        }

        return { won:false, tied:false, gameOver: false, winnerSign:null }

    }

    const isGameWonVertically = () => {

        let sign = '';

        for (let x = 0; x < board.getBoardSize(); x++){
            let y = 0;
            sign = board.getSlot(x , y);
            
            if (sign === '')
                continue;

            while (y < board.getBoardSize() && sign === board.getSlot(x,y)) {
                y++;
            }

            if (y === board.getBoardSize())
                return { won:true, winnerSign:sign }

        }
        
        return { won:false, winnerSign: null };
    }

    const isGameWonHorizontally = () => {
        let sign = '';

        for (let y = 0; y < board.getBoardSize(); y++){
            let x = 0;
            sign = board.getSlot(x , y);
            
            if (sign === '')
                continue;

            while (x < board.getBoardSize() && sign === board.getSlot(x,y)) {
                x++;
            }

            if (x === board.getBoardSize())
                return { won:true, winnerSign:sign }

        }
        
        return { won:false, winnerSign:null };
    }

    const isGameWonDiagonally = () => {

        // going top left to bottom right 
        let x = 0;
        let y = 0;

        let sign = board.getSlot(x,y);

        if (sign !== '') {
            while (x < board.getBoardSize() && y < board.getBoardSize()) {
                if (sign !== board.getSlot(x,y))
                    break;
                x++;
                y++;
            }

            if (x === board.getBoardSize() && y === board.getBoardSize())
                return { won:true, winnerSign:sign }

        } 
        
        // going top right to bottom left
        x = board.getBoardSize() - 1;
        y = 0;
        sign = board.getSlot(x,y);

        if (sign !== '') {

            while (x >= 0 && y < board.getBoardSize()) {
                if (sign !== board.getSlot(x,y))
                    break;

                x--;
                y++;
            }

            if (x === -1 && y === board.getBoardSize())
                return { won:true, winnerSign:sign }
            
        }

        return { won:false ,winnerSign:null };
    }

    // does not check for wins, simply if board is full. win must be checked 
    const isGameTied = () => {
        for (let x = 0; x < board.getBoardSize(); x ++) 
            for (let y = 0; y < board.getBoardSize(); y++)
                if (board.getSlot(x,y) === '')
                    return false;

        
        return true;
    }
    
    const isPlayer1Turn = () => { return player1Turn }
    const isPlayer2Turn = () => { return player2Turn }


    return { restartGame, takeTurn, isGameOver, isGameWon , isPlayer1Turn, isPlayer2Turn }
    
})

