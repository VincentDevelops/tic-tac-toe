// Runs the game 

(() => {
    const boardContainer = document.querySelector(".board-container");
    const board = gameBoard(4);
    const state = gameState();
    const gController = gameController(board, state);
    const dController = displayController(board, boardContainer);

    dController.renderBoard();
    

})();


