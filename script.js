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
    status: "not-started", // | "won" | "tie"
    winner: null, // player / icon
}

const gameController = (function(){
    let currentIcon = "X";

    function takeTurn(position) {
        if (position >= Gameboard.gameboard.length) {return "Error position doesn't exisist"};
        if (Gameboard.gameboard[position] !== null) {return};
        if (Gameboard.status !== "playing") {return console.log("Game is already over")}
        Gameboard.gameboard[position] = currentIcon;
        console.log(Gameboard.gameboard[position])
        switchCurrentIcon();
    };

    function switchCurrentIcon() {
        currentIcon = currentIcon === "X" ? "O" : "X";
    };

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
    };

    function gameTurn(position) {
        if (Gameboard.status === "not-started") {return}
        takeTurn(position);
        setStatus();
        displayController.displayBoard(Gameboard.gameboard, Gameboard.status, this.currentIcon, Gameboard.winner)
    };

    function resetGame() {
        if (Gameboard.status !== "not-started") {
            displayController.toggleStartFunctionsContainer();
        }
        Gameboard.gameboard = [null, null, null, null, null, null, null, null, null];
        currentIcon = "X";
        Gameboard.status = "not-started";
        Gameboard.winner = null;
        Gameboard.player1.name = null;
        Gameboard.player2.name = null;
        displayController.emptyContainers();
    };

    function getPlayersName() {
        player1 = document.getElementById("player-one-input").value;
        player2 = document.getElementById("player-two-input").value;
        if (!player1 || !player2) {
            alert("Please input valid name for player1 and player2");
            return;
        }
        return [player1, player2] // maybe return names as {player1, player2}, instead of mututating here
    };

    function startGame() {
        console.log("Gamestarted")
        players = getPlayersName()
        Gameboard.player1.name = players[0];
        Gameboard.player2.name = players[1];
        Gameboard.status = "playing";
        displayController.toggleStartFunctionsContainer();
        displayController.displayBoard(Gameboard.gameboard, Gameboard.status, this.currentIcon, Gameboard.winner);
        displayController.displayNames();
    };

    return {
        startGame,
        resetGame,
        gameTurn,
    }
}())

const displayController = {
    renderBoard(board) { 
        let row1 = `${board[0]} ${board[1]} ${board[2]}`;
        let row2 = `${board[3]} ${board[4]} ${board[5]}`;
        let row3 = `${board[6]} ${board[7]} ${board[8]}`;
        return `${row1}\n${row2}\n${row3}\n`
    },

    displayBoard(board, status, currentIcon, winner) {
        let gameContainer = document.getElementById("pieces-container");
        gameContainer.innerHTML = "";
        let boardContainer = document.createElement("div");
        boardContainer.classList.add("board-container")
        let currentPlayerEl = document.createElement("div");
        currentPlayerEl.textContent = currentIcon;
        console.log(currentPlayerEl.textContent)

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
        if (status === 'won') {
            let winnerElement = document.createElement("div");
            winnerElement.textContent = `${winner} won`;
            gameContainer.removeChild(currentPlayerEl);
            gameContainer.appendChild(winnerElement);
        }
    },

    toggleStartFunctionsContainer() {
        let container = document.getElementById("start-functions-container");
        container.toggleAttribute("hidden");
    },

    emptyContainers() {
        document.getElementById("pieces-container").innerHTML = "";
        document.getElementById("player-one-input").value = "";
        document.getElementById("player-two-input").value = "";
        document.getElementById("players-name-container").innerHTML = "";
    },

    displayNames() {
        playerContainer = document.getElementById("players-name-container");
        let player1El = document.createElement("div");
        let player2El = document.createElement("div");
        player1El.textContent = `Player 1: ${Gameboard.player1.name}`;
        player2El.textContent = `Player 2: ${Gameboard.player2.name}`;
        playerContainer.appendChild(player1El);
        playerContainer.appendChild(player2El);
    }
}

document.addEventListener("click", (e) => {
    gameController.gameTurn(e.target.dataset.index)
})

document.getElementById("reset-btn").addEventListener("click", () => {
    gameController.resetGame()
})

document.getElementById("start-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (Gameboard.status !== "not-started") {return}
    gameController.startGame()
});

/*
    Current Icon isn't displaying proplerly.
    Double check display names is updating right.
*/