const Gameboard = {
    gameboard: [null, null, null, null, null, null, null, null, null],
    winningSets: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 3, 7],
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
    if (position > Gameboard.gameboard.length) {return "Error position doesn't exisist"};
    if (Gameboard.gameboard[position] !== null) {return}
    let currentIcon = Gameboard.currentIcon;
    Gameboard.gameboard[position] = currentIcon;
    switchCurrentIcon();
}

function switchCurrentIcon() {
    Gameboard.currentIcon = Gameboard.currentIcon === "X" ? "O" : "X";
}

function checkStatus() {
    let sets = Gameboard.winningSets;
    let board = Gameboard.gameboard
    for (let i = 0; i < sets.length; i++) {
        let [a, b, c] = sets[i];
        if (board[a] === board[b] && board[a] === board[c] && board[a] && board[b] && board[c]) {
            return `${board[a]} won`
        }
    }
    if (board.every((val) => val !== null)) {
        return "tie"
    }
    return "playing"
}



takeTurn(0)
takeTurn(3)
takeTurn(4)
takeTurn(5)
takeTurn(8) 
takeTurn(3)
console.log(checkStatus()) 
console.log(renderBoard(Gameboard.gameboard))