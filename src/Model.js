"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var SnakePart = /** @class */ (function () {
    function SnakePart(x, y) {
        this.x = x;
        this.y = y;
    }

    SnakePart.prototype.draw = function (ctx) {
        ctx.fillStyle = '#654654';
        ctx.fillRect(this.x * 5, this.y * 5, 5, 5);
    };
    return SnakePart;
}());
var Snake = /** @class */ (function () {
    function Snake(nbPart, startX, startY, game) {
        this.nbPart = nbPart;
        this.startX = startX;
        this.startY = startY;
        this.game = game;
        this.hasEat = false;
        this.parts = new Array();
        var i = 0;
        for (i = 0; i <= this.nbPart; i++) {
            this.parts.push(new SnakePart(startX, startY));
            startX += 1;
        }
        this.direction = SnakeDirection.Right;
    }

    Snake.prototype.draw = function (ctx) {
        this.grow();
        this.move();
        this.parts.forEach(function (value) {
            value.draw(ctx);
        });
    };
    Snake.prototype.grow = function () {
        if (this.isInTheSnake(this.game.food.x, this.game.food.y)) {
            this.hasEat = true;
        }
    };
    Snake.prototype.move = function () {
        if (!this.hasEat) {
            this.parts.shift();
        }
        else {
            this.game.food.relocate();
            this.hasEat = false;
        }
        var lastPart = this.parts[this.parts.length - 1];
        var x = lastPart.x, y = lastPart.y;
        if (this.direction == SnakeDirection.Up) {
            y -= 1;
        }
        else if (this.direction == SnakeDirection.Down) {
            y += 1;
        }
        else if (this.direction == SnakeDirection.Left) {
            x -= 1;
        }
        else if (this.direction == SnakeDirection.Right) {
            x += 1;
        }
        if ((x <= 0 || x > this.startX * 2 || y <= -1 || y > this.startY * 2) && !this.game.isGameOver) {
            this.game.isGameOver = true;
            alert("Game Over ! ");
        }
        else {
            this.parts.push(new SnakePart(x, y));
        }
    };
    Snake.prototype.changeDirection = function (dir) {
        if ((this.direction == SnakeDirection.Up) && (dir == SnakeDirection.Down)) {
            return;
        }
        else if ((this.direction == SnakeDirection.Down) && (dir == SnakeDirection.Up)) {
            return;
        }
        else if ((this.direction == SnakeDirection.Left) && (dir == SnakeDirection.Right)) {
            return;
        }
        else if ((this.direction == SnakeDirection.Right) && (dir == SnakeDirection.Left)) {
            return;
        }
        else {
            this.direction = dir;
        }
    };
    Snake.prototype.isInTheSnake = function (x, y) {
        var i = 0;
        for (i = 0; i <= this.nbPart; i++) {
            if (x == this.parts[i].x && y == this.parts[i].y) {
                return true;
            }
        }
        return false;
    };
    return Snake;
}());
exports.Snake = Snake;
var SnakeDirection;
(function (SnakeDirection) {
    SnakeDirection[SnakeDirection["Up"] = 0] = "Up";
    SnakeDirection[SnakeDirection["Down"] = 1] = "Down";
    SnakeDirection[SnakeDirection["Left"] = 2] = "Left";
    SnakeDirection[SnakeDirection["Right"] = 3] = "Right";
})(SnakeDirection = exports.SnakeDirection || (exports.SnakeDirection = {}));
var Food = /** @class */ (function () {
    function Food(width, height, snake) {
        this.width = width;
        this.height = height;
        this.snake = snake;
    }

    Food.prototype.relocate = function () {
        do {
            this.x = Math.floor(Math.random() * this.width - 1) + 0;
            this.y = Math.floor(Math.random() * this.height - 1) + 0;
        } while (this.snake.isInTheSnake(this.x, this.y));
    };
    Food.prototype.draw = function (ctx) {
        ctx.fillStyle = '#343434';
        ctx.fillRect(this.x * 5, this.y * 5, 5, 5);
    };
    return Food;
}());
exports.Food = Food;
