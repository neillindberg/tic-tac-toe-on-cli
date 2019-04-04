const TicTacToe = require('./TicTacToe');
const readline = require('readline');

const ttt = new TicTacToe();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', function (line) {
    var playerMove = line.trim();
    process.stdout.write('\n' + ttt.makeMove(playerMove) + '\n');
    if (ttt.gameOver) {
        process.exit(1);
    }
});

// Intro and first draw.
process.stdout.write('\n Welcom to CLI Tic Tac Toe!\n\n' + ttt.drawBoard() + '\n');