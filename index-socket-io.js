const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const TicTacToe = require('./TicTacToe');

let ttt = new TicTacToe();

server.listen(80);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.emit('gameInfo', { board: ttt.drawBoard(), player: ttt.getPlayer() });
    socket.on('playerMove', function (data) {
        const {playerMove} = data;
        const moveResult = ttt.makeMove(playerMove);
        socket.emit('gameInfo', { board: moveResult });
        // Emit to all connections.
        io.emit('gameInfo', { board: moveResult });
    });
    socket.on('newGame', () => {
        ttt = new TicTacToe();
        socket.emit('gameInfo', { board: ttt.drawBoard(), player: ttt.getPlayer() });
    });
});