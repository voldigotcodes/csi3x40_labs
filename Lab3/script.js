const game = {
    board : [],
    player : "C",
    ghost : "^.",
    fruit : "@",
    dots : "."
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function createGame(n) {
    for (let i = 0; i < n; i++) {
        game.board[i] = game.dots;
    }
    game.board[getRandomInt(game.board.length)] = game.fruit;
    game.board[getRandomInt(game.board.length)] = game.ghost;
    game.board[parseInt(n/2)] = game.player;
    document.writeln("Game Created");
    return game.board
}

document.writeln(createGame(8));