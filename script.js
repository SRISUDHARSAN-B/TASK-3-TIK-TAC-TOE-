const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkForWinner();
};

const updateCell = (cell, index) => {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
};

const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
    } else if (!gameState.includes('')) {
        statusText.textContent = 'Draw!';
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `${currentPlayer}'s turn`;
    }
};

const resetGame = () => {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
