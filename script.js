"use strict"

let gameStatusDisplay = document.querySelector('.game-status');
let isGameActive = true;
let activePlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

function displayStatus(message) {
    gameStatusDisplay.innerText = message;
}

displayStatus(`Player ${activePlayer}'s turn`);

function handleSquareClick(event) {
    let clickedSquare = event.target;
    let squareIndex = parseInt(clickedSquare.getAttribute('data-square-index'));

    if (boardState[squareIndex] !== "" || !isGameActive) return;

    boardState[squareIndex] = activePlayer;
    clickedSquare.innerText = activePlayer;

    checkForWinner();
}

function switchPlayer() {
    activePlayer = activePlayer === "X" ? "O" : "X";
    displayStatus(`Player ${activePlayer}'s turn`);
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winPatterns.length; i++) {
        let [a, b, c] = winPatterns[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        displayStatus(`Player ${activePlayer} wins!`);
        isGameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        displayStatus("It's a draw!");
        isGameActive = false;
        return;
    }

    switchPlayer();
}

function resetGame() {
    isGameActive = true;
    activePlayer = "X";
    boardState = ["", "", "", "", "", "", "", "", ""];
    displayStatus(`Player ${activePlayer}'s turn`);
    document.querySelectorAll('.square').forEach(square => square.innerText = "");
}

document.querySelectorAll('.square').forEach(square => square.addEventListener('click', handleSquareClick));
document.querySelector('.reset-button').addEventListener('click', resetGame);
