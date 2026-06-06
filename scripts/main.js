// Runs the game 

(() => {
    const opponentMenu = document.querySelector(".opponent-menu");
    const signMenu = document.querySelector(".sign-menu");
    const vsComputer = document.querySelector(".vs-comp");
    const vsHuman = document.querySelector(".vs-hum");
    const weaponX = document.querySelector(".x");
    const weaponO = document.querySelector(".o");
    const sizeMenu = document.querySelector(".size-menu");
    const sizeOption = document.querySelectorAll(".size");
    const gameOverMenu = document.querySelector(".game-over")
    const playAgain = document.querySelector(".play-again");
    const changeSize = document.querySelector(".change-size");
    const mainMenu = document.querySelector(".main-menu")
    const winnerAnnouncement = document.querySelector("#winner");

    const boardContainer = document.querySelector(".board-container");
    const board = gameBoard(4);
    const state = gameState();
    const gController = gameController(board, state);
    const dController = displayController(board, boardContainer);


    let player1 = player();
    let player2 = player();


    mainMenu.onclick = function () {
        gameOverMenu.classList.add("hide");
        opponentMenu.classList.remove("hide");
    }

    changeSize.onclick = function () {
        gameOverMenu.classList.add("hide");
        sizeMenu.classList.remove("hide");
    }

    playAgain.onclick = function () {
        boardContainer.replaceChildren();

        board.resetBoard();
        state.resetState();

        dController.renderBoard();
        slot_initializer();

        gameOverMenu.classList.add("hide");
        boardContainer.classList.remove("hide");

    }


    vsComputer.onclick = function () {
        chooseOpponent(1);
    }

    vsHuman.onclick = function () {
        chooseOpponent(2);
    }

    weaponX.onclick = function () {
        setSigns('x');
    }

    weaponO.onclick = function () {
        setSigns('o');
    }

    sizeOption.forEach(element => {
        element.onclick = function () {
            let size = Number(element.textContent)
            dController.changeSize(size);
            slot_initializer();
            sizeMenu.classList.add("hide");
            boardContainer.classList.remove("hide");
        }
    });

    function gameOver(winnerSign) {
        winnerAnnouncement.textContent = "Player " + winnerSign + " won!";
        state.resetState();
    }

    function setSigns(sign) {
        switch (sign) {
            case 'x':
                player1.setSign('X');
                player2.setSign('O');
                signMenu.classList.add("hide");
                dController.renderBoard();
                slot_initializer();
                sizeMenu.classList.remove("hide");
                break;
            case 'o':
                player1.setSign('O');
                player2.setSign('X');
                signMenu.classList.add("hide");
                dController.renderBoard();
                slot_initializer();
                sizeMenu.classList.remove("hide");
                break;
        }
    }

    function chooseOpponent(opp) {
        switch (opp) {
            case 1:
                console.log("vs comp");
                opponentMenu.classList.add("hide");
                signMenu.classList.remove("hide");
                break;
            case 2:
                console.log("vs hum");
                opponentMenu.classList.add("hide");
                signMenu.classList.remove("hide");
                break;
        }
    }

    function slot_initializer() {
        for (let row = 0; row < dController.getSize(); row++) {
            for (let column = 0; column < dController.getSize(); column++) {
                dController.getSlotElementAt(row, column).onclick = function (e) {
                    if (gController.isPlayer1Turn() === true && state.isGameOver() === false) {
                        if (gController.isValidMove(row, column) == false)
                            return;
                        e.currentTarget.textContent = player1.getSign();
                        gController.takeTurn(row, column, player1.getSign());
                        console.log(row, column);
                        e.currentTarget.classList.add("playerX");
                        if (state.isGameWon()) {
                            boardContainer.classList.add("hide");
                            gameOverMenu.classList.remove("hide");
                            gameOver(state.getWinnerSign());
                        }

                    } else if (gController.isPlayer1Turn() === false && state.isGameOver() === false) {
                        if (gController.isValidMove(row, column) == false)
                            return;
                        e.currentTarget.textContent = player2.getSign();
                        gController.takeTurn(row, column, player2.getSign());
                        console.log(row, column);
                        e.currentTarget.classList.add("playerO");
                        if (state.isGameWon()) {
                            boardContainer.classList.add("hide");
                            gameOverMenu.classList.remove("hide");
                            gameOver(state.getWinnerSign());
                        }
                    } else if (state.isGameOver()) {
                        console.log("game over");
                    }
                }
            }
        }
    }




})();


