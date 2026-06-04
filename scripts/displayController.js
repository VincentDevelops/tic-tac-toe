// handles the dom rendering and manipulation for a game

const displayController = ((gameBoard, container) => {

    const board = gameBoard;
    const boardContainer = container;
    let boardSize = board.getBoardSize();




    const renderBoard = () => {
        adjustBoardContainerSize();

        for (let row = 0; row < boardSize; row++) {
            for (let column = 0; column < boardSize; column++) {
                boardContainer.append(createSlot(row,column));
            }
        }

    }

    const adjustBoardContainerSize = () => {
        container.style.setProperty("--board-size", boardSize);
    }

    const createSlot = (row, column) => {
        let slot = document.createElement("div");
        slot.classList.add("slot", "slot-flex");
        slot.dataset.row = row;
        slot.dataset.column = column;

        // row == 0 top
        // 0 < row < size - 1 center 
        // row == size - 1 bottom 
        // 
        // column == 0 left
        // 0 < column < size - 1 center
        // column == size - 1 right

        // top row
        if (row == 0) {
            if (column == 0) 
                slot.classList.add("top-left-slot");
            else if (column == boardSize - 1)
                slot.classList.add("top-right-slot");
            else 
                slot.classList.add("top-middle-slot")
        } // bottom row 
        else if (row == boardSize - 1) {
            if (column == 0) 
                slot.classList.add("bottom-left-slot");
            else if (column == boardSize - 1)
                slot.classList.add("bottom-right-slot");
            else 
                slot.classList.add("bottom-middle-slot")
        } // center row(s) 
        else {
            if (column == 0) 
                slot.classList.add("middle-left-slot");
            else if (column == boardSize - 1)
                slot.classList.add("middle-right-slot");
            else 
                slot.classList.add("middle-slot")
        }

        return slot;

    }

    return {renderBoard}

}) 



