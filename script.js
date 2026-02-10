const Gameboard = {
    gameboard: [null, null, null, null, null, null, null, null, null],
    winningSets: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ],
    player1: {
        icon: "X",
        name: null,
    },
    player2: {
        icon: "O",
        name: null,
    },
    currentIcon: "X",
    status: "playing", // | "won" | "tie"
    winner: null, // player / icon
}

function renderBoard(board) {
    let row1 = `${board[0]} ${board[1]} ${board[2]}`;
    let row2 = `${board[3]} ${board[4]} ${board[5]}`;
    let row3 = `${board[6]} ${board[7]} ${board[8]}`;
    return `${row1}\n${row2}\n${row3}\n`
}

function takeTurn(position) {
    if (position >= Gameboard.gameboard.length) {return "Error position doesn't exisist"};
    if (Gameboard.gameboard[position] !== null) {return};
    if (Gameboard.status !== "playing") {return console.log("Game is already over")}
    let currentIcon = Gameboard.currentIcon;
    Gameboard.gameboard[position] = currentIcon;
    switchCurrentIcon();
}

function switchCurrentIcon() {
    Gameboard.currentIcon = Gameboard.currentIcon === "X" ? "O" : "X";
}

function setStatus() {
    let sets = Gameboard.winningSets;
    let board = Gameboard.gameboard
    for (let i = 0; i < sets.length; i++) {
        let [a, b, c] = sets[i];
        if (board[a] === board[b] && board[a] === board[c] && board[a]) {
            Gameboard.winner = board[a];
            Gameboard.status = `won`;
            return
        }
    }
    if (board.every((val) => val !== null)) {
        Gameboard.status = "tie";
        return
    }
    Gameboard.status = "playing";
    return 
}

function displayBoard(board) {
    let gameContainer = document.getElementById("pieces-container");
    gameContainer.innerHTML = "";
    let boardContainer = document.createElement("div");
    boardContainer.classList.add("board-container")
    let currentPlayerEl = document.createElement("div");
    currentPlayerEl.textContent = Gameboard.currentIcon;

    for (let i = 0; i < board.length; i++) {
        let piece = document.createElement("div");
        piece.classList.add("piece");
        piece.setAttribute("data-index", i);
        if (board[i] !== null) {
            piece.textContent = board[i];
        }
        boardContainer.appendChild(piece);
    }
    gameContainer.appendChild(boardContainer);
    gameContainer.appendChild(currentPlayerEl);
    if (Gameboard.status === 'won') {
        let winnerElement = document.createElement("div");
        winnerElement.textContent = `${Gameboard.winner} won`;
        gameContainer.removeChild(currentPlayerEl);
        gameContainer.appendChild(winnerElement);
    }
}

function resetGame() {
    Gameboard.gameboard = [null, null, null, null, null, null, null, null, null];
    Gameboard.currentIcon = "X";
    Gameboard.status = "playing";
    Gameboard.winner = null;
}

function gameTurn(position) {
    takeTurn(position);
    setStatus();
    displayBoard(Gameboard.gameboard)
}

document.addEventListener("click", (e) => {
    gameTurn(e.target.dataset.index)
})

document.getElementById("reset-btn").addEventListener("click", () => {resetGame()})

displayBoard(Gameboard.gameboard)
 