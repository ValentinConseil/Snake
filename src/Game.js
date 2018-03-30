"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var Model_1 = require("./Model");
var Model_2 = require("./Model");
var Model_3 = require("./Model");
var Game = /** @class */ (function () {
    function Game(canvas, speed, gridSize) {
        if (gridSize === void 0) {
            gridSize = 5;
        }
        this.canvas = canvas;
        this.speed = speed;
        this.gridSize = gridSize;
        this.pause = false;
        this.isGameOver = false;
        this.score = 0;
        this.gridWidth = canvas.width / gridSize;
        this.gridHeight = canvas.height / gridSize;
        this.canvasContext = canvas.getContext("2d");
        document.addEventListener('keydown', this.keyboardInput.bind(this));
    }

    Game.prototype.keyboardInput = function (event) {
        console.log(event.keyCode);
        console.log(this);
        // PRESS LEFT ARROW
        if (event.keyCode == 37) {
            this.snake.changeDirection(Model_2.SnakeDirection.Left);
        }
        else if (event.keyCode == 38) {
            this.snake.changeDirection(Model_2.SnakeDirection.Up);
        }
        else if (event.keyCode == 39) {
            this.snake.changeDirection(Model_2.SnakeDirection.Right);
        }
        else if (event.keyCode == 40) {
            this.snake.changeDirection(Model_2.SnakeDirection.Down);
        }
        else if (event.keyCode == 32) {
            console.log(this.pause);
            if (this.pause) {
                this.pause = false;
            }
            else {
                this.pause = true;
            }
        }
    };
    /**
     * Start game
     */
    Game.prototype.start = function () {
        this.snake = new Model_1.Snake(10, this.canvas.width / 10, this.canvas.height / 10, this);
        this.food = new Model_3.Food(this.canvas.width / 5, this.canvas.height / 5, this.snake);
        this.food.relocate();
        this.animate(); // Start animation
    };
    Game.prototype.animate = function () {
        var fps = this.speed;
        var now;
        var then = Date.now();
        var interval = 1000 / fps;
        var delta;
        var animationLoop = (function () {
            if (!this.isGameOver) {
                requestAnimationFrame(animationLoop);
            }
            now = Date.now();
            delta = now - then;
            if (delta > interval) {
                then = now - (delta % interval);
                this.update();
            }
        }).bind(this);
        animationLoop();
    };
    /**
     * Update status of game and view
     */
    Game.prototype.update = function () {
        this.canvasContext.fillStyle = '#F0F0F0';
        this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.snake.draw(this.canvasContext);
        this.food.draw(this.canvasContext);
        console.log("update");
    };
    return Game;
}());
exports.Game = Game;
