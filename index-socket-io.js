const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const TicTacToe = require('./TicTacToe');

server.listen(80);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

let connectionCount = 0;

io.on('connection', function (socket) {
    connectionCount++;

    io.emit('connectionCount', {connectionCount});

    socket.on('playerMove', (data) => {
        const { playerMove } = data;
        const { board, message } = ttt.makeMove(playerMove);
        io.emit('gameInfo', { board, message, player: ttt.getPlayer() });
    });

    socket.on('newGame', () => {
        ttt = new TicTacToe();
        const { board, message } = ttt.drawBoard();
        io.emit('gameInfo', { board, message, player: ttt.getPlayer() });
    });

    socket.on('disconnect', () => {
        connectionCount--;
        io.emit('connectionCount', { connectionCount });
    });
});
