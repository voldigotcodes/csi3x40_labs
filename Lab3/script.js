const game = {
    board : [],
    player : {
        sprite : "C",
        index : 0
    },
    ghost : "^",
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
    game.board[getRandomInt(game.board.length)] += game.ghost;
    game.board[game.player.index = parseInt(n/2)] = game.player.sprite;
    document.writeln("Game Created");
    return game.board
}

function moveLeft(board) {
    board[game.player.index] -= game.player.sprite;
    board[game.player.index] = ""

    if (game.player.index == 0) {
        game.player.index = parseInt(board.length)-1;
        board[game.player.index] += game.player.sprite;
    }else{
        game.player.index = parseInt(game.player.index)-1;
        board[game.player.index] += game.player.sprite;
    }
    return board
}

function moveRight(board) {
    board[game.player.index] -= game.player.sprite;
    board[game.player.index] = ""

    if (game.player.index == board.length - 1) {
        game.player.index = 0;
        board[0] += game.player.sprite;
    }else{
        game.player.index = parseInt(game.player.index)+1
        board[game.player.index] += game.player.sprite;
    }
    return board
}

document.writeln(createGame(8));
document.writeln(moveLeft(game.board));
