import {Game} from "./Game"

const canvas = <HTMLCanvasElement> document.getElementById("snakeGame");
var speed = 10;
var length = 4;
var game;


document.getElementById("easyButton").addEventListener("click", function(){
    document.getElementById("scoreH3").style.display = "block";  
    document.getElementById("snakeGame").style.display = "block"; 
    document.getElementById("difficultyBox").style.display= "none";
    speed = 5; 
    length = 5;
    game = new Game(canvas, speed, length);
    game.start();
});

document.getElementById("normalButton").addEventListener("click", function(){
    document.getElementById("scoreH3").style.display = "block";  
    document.getElementById("snakeGame").style.display = "block";  
    document.getElementById("difficultyBox").style.display= "none";
    speed = 10;
    length = 10;
    game = new Game(canvas, speed, length);
    game.start();
});

document.getElementById("hardButton").addEventListener("click", function(){
    document.getElementById("scoreH3").style.display = "block";  
    document.getElementById("snakeGame").style.display = "block";
    document.getElementById("difficultyBox").style.display= "none";
    speed = 15;
    length = 15;
    game = new Game(canvas, speed, length);
    game.start();

});
