const TicTacToe = require('./TicTacToe');
const readline = require('readline');

const ttt = new TicTacToe();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', function (line) {
    const playerMove = line.trim();
    const result = ttt.makeMove(playerMove);
    if (result.board) process.stdout.write('\n' + result.board);
    if (result.message) process.stdout.write('\n' + result.message);

    if (ttt.gameOver) {
        process.exit(1);
    }
});

// Intro and first draw.
const {board, message} = ttt.drawBoard();
process.stdout.write('\n Welcom to CLI Tic Tac Toe!\n\n' + board + '\n' + message);