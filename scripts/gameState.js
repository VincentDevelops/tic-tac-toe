const gameState = () => {
    let won = false;
    let tied = false;
    let gameOver = false;
    let winnerSign = '';
    let player1Turn = true;

    const changePlayerTurn = () => { 
        if (player1Turn === true)
            player1Turn = false;
        else
            player1Turn = true;
    }

    const resetState = () => {
        setWon(false);
        setTied(false);
        setGameOver(false);
        setWinnerSign('');
        setPLayer1Turn(true);
    }

    const setWon = (outcome) => { 
        won = outcome;
        if (won)
            gameOver = true;
    } 

    const setTied = (outcome) => { 
        tied = outcome 
        if (tied)
            gameOver = true;    
    }
    
    const setGameOver = (outcome) => { gameOver = outcome }
    const setWinnerSign = (sign) => { winnerSign = sign }
    const setPLayer1Turn = (turn) => { winnerSign = turn }

    const isWon = () => { return won; }
    const isTied = () => { return tied }
    const isGameOver = () => { return gameOver }
    const isGameWon = () => { return won }
    const getWinnerSign = () => { return winnerSign }
    const isPlayer1Turn = () => { return player1Turn }

    return { 
        changePlayerTurn, resetState,setWon, setTied, setGameOver, 
        setWinnerSign, isWon, isTied, isGameOver, getWinnerSign, 
        isGameWon, isPlayer1Turn
    }

}