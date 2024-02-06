const game = {
    board : [],
    player : {
        sprite : "C",
        index : 0
    },
    ghost : {
        sprite : "^",
        index : 0
    },
    fruit : "@",
    dots : ".",
    score : 0,
    scoreMax : 0,
    level : 0,
    speed : 2000,
    isGameOver : false,
};

let timerId = setInterval(ghostMovement, 2000);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function createGame(n) {
    for (let i = 0; i < n; i++) {
        game.board[i] = game.dots;
        game.scoreMax = parseInt(game.scoreMax)+1
    }
    game.board[getRandomInt(game.board.length)] = game.fruit;
    game.board[game.ghost.index = getRandomInt(game.board.length)] += game.ghost.sprite;
    game.board[game.player.index = parseInt(n/2)] = game.player.sprite;
    if(game.ghost.index == game.player.index){
        game.board[game.ghost.index += 1] += game.ghost.sprite;
    }
    game.scoreMax -=2;
    console.log(game.scoreMax);
    display(game.board);    
    return game.board
}

function moveLeft(user, board) {
    board[user.index] = board[user.index].replace(user.sprite, "");
    if(user.sprite == game.player.sprite){
        board[user.index] = "";
    }

    //Gestion des mouvement 
    if (user.index == 0) {
        user.index = parseInt(board.length)-1;
        //Gestion du score
        if(board[user.index].includes(game.dots) && user.sprite == game.player.sprite){
            game.score++;
        }
        //Gestion des collisions
        if(board[user.index].includes(game.ghost.sprite) && user.sprite == game.player.sprite){
            gameOver(game);
        }else if(board[user.index].includes(game.player.sprite) && user.sprite == game.ghost.sprite){
            gameOver(game);
            clearInterval(timerId);
        }
        board[user.index] = user.sprite == game.player.sprite ? user.sprite : board[user.index]+user.sprite;
    }else{
        user.index = parseInt(user.index)-1;
        //Gestion du score
        if(board[user.index].includes(game.dots) && user.sprite == game.player.sprite){
            game.score++;
        }
        //Gestion des collisions
        if(board[user.index].includes(game.ghost.sprite) && user.sprite == game.player.sprite){
            gameOver(game);
        }else if(board[user.index].includes(game.player.sprite) && user.sprite == game.ghost.sprite){
            gameOver(game);
            clearInterval(timerId);
        }
        board[user.index] = user.sprite == game.player.sprite ? user.sprite : board[user.index]+user.sprite;
    }
    update(board);
    nextLevel(game);
    return board
}

function moveRight(user, board) {
    board[user.index] = board[user.index].replace(user.sprite, "");
    if(user.sprite == game.player.sprite){
        board[user.index] = "";
    }

    if (user.index == board.length - 1) {
        user.index = 0;
        //Gestion du score
        if(board[0].includes(game.dots) && user.sprite == game.player.sprite){
            game.score++;
        }
        //Gestion des Fantome
        if(board[user.index].includes(game.ghost.sprite) && user.sprite == game.player.sprite){
            gameOver(game);
        }else if(board[user.index].includes(game.player.sprite) && user.sprite == game.ghost.sprite){
            gameOver(game);
            clearInterval(timerId);
        }
        board[0] = user.sprite == game.player.sprite ? user.sprite : board[0]+user.sprite;
    }else{
        user.index = parseInt(user.index)+1
        //Gestion du score
        if(board[user.index].includes(game.dots) && user.sprite == game.player.sprite){
            game.score++;
        }
        //Gestion des Collision
        if(board[user.index].includes(game.ghost.sprite) && user.sprite == game.player.sprite){
            gameOver(game);
        }else if(board[user.index].includes(game.player.sprite) && user.sprite == game.ghost.sprite){
            gameOver(game);
            clearInterval(timerId);
        }
        
        board[user.index] = user.sprite == game.player.sprite ? user.sprite : board[user.index]+user.sprite;
    }
    nextLevel(game);
    update(board);
    return board
}

function ghostMovement() {
    console.log("movement");
    var decision = getRandomInt(2);
    if(decision>=1){
        moveLeft(game.ghost, game.board);
    }else{
        moveRight(game.ghost, game.board);
    }
}

function nextLevel(g){
    //Verification if we should advance to the next level
    if(game.score == game.scoreMax){
        //Advancing to the next level
        game.level++;
        if(game.speed>500){
            game.speed-=100;
        }
        update(board)
        restart(game, 7);
        console.log("NEXT LEVEL");
        //restart(game, 7);
        //regenerating the game but in a bigger size
        return true;
    }else{
        return false;
    }

    
}

function display(board) {
    //displaying the board
    var boardElements = [];
    for(i in board){
        boardElements[i] = document.createElement("div");
        boardElements[i].className = "cell elem "+ i;
        boardElements[i].id = "cell elem "+ i;
        boardElements[i].innerHTML = board[i];
        document.getElementById("board").appendChild(boardElements[i]);
    }

     //Displaying the game system
        //score update
        var scoreElem = document.getElementById("score").innerHTML = "Score : " + game.score;

        //Level display
        var levelElem = document.getElementById("level").innerHTML = "Level : " + 0;

}

function update(board) {
    //Updating the board
    var boardElements = [];
    for(i in board){
        boardElements[i] = document.getElementById("cell elem "+ i)
        if(boardElements[i] != null)
            boardElements[i].innerHTML = board[i];
    }

    //Updating the game system
        //score update
    var scoreElem = document.getElementById("score").innerHTML = "Score : " + game.score;

        //Level update
    var levelElem = document.getElementById("level").innerHTML = "Level : " + game.level;
}

function deleteGame(){
    const list = document.getElementById("board");
    //clearInterval(timerId);
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
      }
}

function gameOver(g) {
    g.isGameOver = true;
    document.getElementById("game-status").innerHTML = "GAME OVER";
}

function restart(g,n) {
    g.board = [];
    g.score = 0;
    g.scoreMax = 0;
    g.player.index = 0;
    g.isGameOver = false;
    deleteGame();
    clearInterval(timerId);
    timerId = setInterval(ghostMovement, game.speed);
    createGame(n);
    document.getElementById("game-status").innerHTML = "";
    //timerId = setInterval(ghostMovement(), 2000);
    return g.board;
}

createGame(7)

// HTML button elements
const btnMoveLeft = document.getElementById("moveLeft");
const btnMoveRight = document.getElementById("moveRight");
const btnRestart = document.getElementById("restartButton");

// btnMoveLeft click event listener to apply function
btnMoveLeft.addEventListener("click", function() {
    // your function code here
    if(!game.isGameOver)
        moveLeft(game.player,game.board);
});

// btnMoveRight click event listener to apply function
btnMoveRight.addEventListener("click", function() {
    // your function code here
    if(!game.isGameOver)
        moveRight(game.player,game.board);
});

// btnMoveLeft click event listener to apply function
btnRestart.addEventListener("click", function() {
    // your function code here
    restart(game,7);
});

//DANGEROUS : GHOST MOVEMENT


