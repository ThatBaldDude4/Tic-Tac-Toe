const Gameboard = {
    gameboard: [null, null, null, null, null, null, null, null, null],
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
    let currentIcon = Gameboard.currentIcon;
    Gameboard.gameboard[position] = currentIcon;
    switchCurrentIcon();
}

function switchCurrentIcon() {
    Gameboard.currentIcon = Gameboard.currentIcon === "X" ? "O" : "X";
}

takeTurn(2)
takeTurn(1)
takeTurn(8)
takeTurn(4)
takeTurn(0)
console.log(renderBoard(Gameboard.gameboard))