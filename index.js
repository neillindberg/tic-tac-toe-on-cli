const TicTacToe = require('./TicTacToe');
const readline = require('readline');
const ttt = new TicTacToe();

console.log(ttt.drawBoard());

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', function (line) {
    var playerMove = line.trim();
    // console.log actually calls stdout.write, so we can simplify by using it.
    console.log('\n' + ttt.makeMove(playerMove));
    if (ttt.gameOver) {
        process.exit(1);
    }
});
