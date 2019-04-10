class TicTacToe {
    constructor() {
        this.board = [this.emptyRow(), this.emptyRow(), this.emptyRow()];
        this.players = ['X', 'O'];
        this.moves = 0;
        this.gameOver = false;
    }

    set gameOver(gameOver) {
        this._gameOver = gameOver;
    }

    get gameOver() {
        return this._gameOver;
    }

    set moves(count) {
        this._moves = count;
    }

    get moves() {
        return this._moves;
    }

    emptyRow() {
        return new Array(3).fill('-');
    }

    getPlayer() {
        return this.players[this.moves % 2];
    }

    incrementMoves() {
        this.moves++;
    }

    getInstruction() {
        return '\nPlayer [' + this.getPlayer() + '], please enter cooridinates ' +
                'in the form/range of 1:1 (upper left) to 3:3 (lower right): ';
    }

    drawBoard() {
        const stringRows = this.board.map(row => row.join('|')), message = this.gameOver ? '\n\nGAME OVER!' : this.getInstruction();
        return { board: stringRows.join('\n'), message };
    }

    checkForWinningMove() {
        // Winning possibilities: Row, column, diagonal.
        const currentPlayer = this.getPlayer();
        // Turn multi-dimensional array, so we can look at columns the same way as rows.
        const boardTransposed = Object.keys(this.board[0]).map(column => this.board.map(row => row[column]));
        const checkEvery = x => x.every(spot => spot === currentPlayer);
        const reducer = (accumulator, currentValue) => accumulator || currentValue;
        // Reduce all boolean checks to see if any one is true (one is all marked with current player).
        return [
            this.board.filter(checkEvery).length > 0, // row
            boardTransposed.filter(checkEvery).length > 0, // columns as rows
            checkEvery([this.board[0][0], this.board[1][1], this.board[2][2]]), // top-left / bottom-right = diagonal
            checkEvery([this.board[0][2], this.board[1][1], this.board[2][0]]) // top-right / bottom-left = diagonal
        ].reduce(reducer);
    }

    makeMove(coords) {
        const [row, column] = coords.split(':');
        // Enforce numeric input.
        if(isNaN(row) || isNaN(column)) return {message: this.getInstruction()};
        // Checking num-based range here is not needed as the array spot will simply be undefined if out of range.
        if (this.board[row - 1][column - 1] === undefined) return {message: this.getInstruction()};
        // Passed validation. 
        if (this.board[row - 1][column - 1] === '-') {
            this.board[row - 1][column - 1] = this.getPlayer();
            // Check for winner if possible (should be at least the 5th move).
            if (this.moves >= 4 && this.checkForWinningMove()) {
                this.gameOver = true;
                const result = this.drawBoard();
                result.message += '\nWINNNER WINNER CHICKEN DINNER!\nPLAYER [[' + this.getPlayer() + ']] IS THE WINNER!';
                return result;
            }
            // Pre-incrementing moves if 8 then the board is full.
            if (this.moves === 8) {
                this.gameOver = true;
                const result = this.drawBoard();
                result.message += '\nNO WINNER! Eveyone is a loser...';;
                return result;
            }
            this.incrementMoves();
            return this.drawBoard();
        } else {
            return {message: 'Space taken, try again: '};
        }
    }
};

module.exports = TicTacToe;