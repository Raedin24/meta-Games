//board
var blockSize = 25;
var rows = 25;
var columns = 25;
var board;
var context;

//snake
var snakeX;
var snakeY;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

//game over
var gameOver = false;

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    updateBoard();
    placeSnake();
    setInterval(updateBoard, 1225/10);
}

function updateBoard(){
    if (gameOver){
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect (foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY){
        snakeBody.push({x: foodX, y: foodY});
        placeFood();
    }

    for (var i = snakeBody.length - 1; i >= 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length){
        snakeBody[0] = {x: snakeX, y: snakeY};
    }

    context.fillStyle = "lime";
    snakeX += velocityX;
    snakeY += velocityY;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (var i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i].x, snakeBody[i].y, blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX > board.width - blockSize || snakeY < 0 || snakeY > board.height - blockSize){
        gameOver = true;
        alert("Game Over");
    }

    for (var i = 1; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i].x && snakeY == snakeBody[i].y){
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY != blockSize){
        velocityX = 0;
        velocityY = -blockSize;
    }
    else if (e.code == "ArrowDown" && velocityY != -blockSize){
        velocityX = 0;
        velocityY = blockSize;
    }
    else if (e.code == "ArrowLeft" && velocityX != blockSize){
        velocityX = -blockSize;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -blockSize){
        velocityX = blockSize;
        velocityY = 0;
    }
}

function placeFood(){
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function placeSnake(){
    snakeX = Math.floor(Math.random() * columns) * blockSize;
    snakeY = Math.floor(Math.random() * rows) * blockSize;
}