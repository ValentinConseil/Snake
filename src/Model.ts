import {Game} from "./Game"

class SnakePart {

    color : string;

    constructor(public x: number, public y: number) {
        this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * 5, this.y * 5, 5, 5);
    }

}

export class Snake {

    parts: SnakePart[];
    direction: SnakeDirection;
    hasEat: Boolean = false;
    hasEatSuper: Boolean = false;

    constructor(public nbPart: number, public startX: number, public startY: number, public game: Game) {
        this.parts = new Array();
        var i: number = 0;

        for (i = 0; i <= this.nbPart; i++) {
            this.parts.push(new SnakePart(startX, startY));
            startX += 1;
        }
        this.direction = SnakeDirection.Right;
    }

    draw(ctx: CanvasRenderingContext2D) {

        this.move();
        this.grow();

        this.parts.forEach(function (value) {
            value.draw(ctx);
        });
    }

    grow() {
        if (this.isInTheSnake(this.game.food.x, this.game.food.y)) {
            this.hasEat = true;
            this.game.score++;
        }
        else if (this.isInTheSnake(this.game.superfood.x, this.game.superfood.y)) {
            this.hasEatSuper = true;
            this.game.score += 2;
        }
    }

    move() {

        if (this.hasEat) {
            this.game.food.relocate();
            this.hasEat = false;
        }
        else if (this.hasEatSuper) {
            this.game.superfood.relocate();
            this.hasEatSuper = false;
            this.game.superfood.resetCount();
        }
        else {
            this.parts.shift();
        }


        var lastPart: SnakePart = this.parts[this.parts.length - 1];

        var x: number = lastPart.x, y: number = lastPart.y;

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

        if ( !this.game.isGameOver && (x <= 0 || x > this.startX * 2 || y <= -1 || y > this.startY * 2)) {
            this.game.isGameOver = true;
            alert("Game Over !\n Score : "+this.game.score);
            location.reload();
        }
        else {

            for (var i: number = 0; i < this.parts.length; i++) {
                if (this.isInTheSnake(x, y)) {
                    this.game.isGameOver = true;
                    alert("Game Over !\n Score : "+this.game.score);
                    location.reload();
                }
            }

            this.parts.push(new SnakePart(x, y));
        }


    }

    changeDirection(dir: SnakeDirection) {

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
    }

    isInTheSnake(x: number, y: number) {
        var i: number;
        for (i = 0; i < this.parts.length; i++) {
            if (x == this.parts[i].x && y == this.parts[i].y) {
                return true;
            }
        }
        return false;
    }
}

export enum SnakeDirection {
    Up,
    Down,
    Left,
    Right,
}

export class Food {

    x: number;
    y: number;

    constructor(public width: number, public height: number, public color: string, public snake: Snake) {
    }

    relocate() {
        console.log(this.width + "," + this.height);
        do {
            this.x = Math.floor(Math.random() * this.width - 1) + 1;
            this.y = Math.floor(Math.random() * this.height - 1) + 1;
        } while (this.snake.isInTheSnake(this.x, this.y));
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * 5, this.y * 5, 5, 5);
    }
}

export class SuperFood extends Food {

    counter: number = 0;

    constructor(width: number, height: number, color: string, public time: number, snake: Snake) {
        super(width, height, color, snake);
    }

    count() {
        if (this.counter < this.time) {
            this.counter++;
        }
        else {
            this.counter = 0;
            this.relocate();
        }
    }

    resetCount() {
        this.counter = 0;
    }
}
