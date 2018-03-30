import {Food, Snake, SnakeDirection, SuperFood} from "./Model"


export class Game {

    canvasContext: CanvasRenderingContext2D;
    gridWidth: number;
    gridHeight: number;
    snake: Snake;
    pause: Boolean = false;
    isGameOver: Boolean = false;
    score: number = 0;
    food: Food;
    superfood: SuperFood;

    constructor(public canvas: HTMLCanvasElement, public speed: number, public length:number, public gridSize: number = 5) {
        this.gridWidth = canvas.width / gridSize;
        this.gridHeight = canvas.height / gridSize;
        this.canvasContext = canvas.getContext("2d");


        document.addEventListener('keydown', this.keyboardInput.bind(this));

    }

    keyboardInput(event: KeyboardEvent) {

        console.log(event.keyCode);
        console.log(this);

        // PRESS LEFT ARROW
        if (event.keyCode == 37) {
            this.snake.changeDirection(SnakeDirection.Left);
        }
        // PRESS UP ARROW
        else if (event.keyCode == 38) {
            this.snake.changeDirection(SnakeDirection.Up);
        }
        // PRESS RIGHT ARROW
        else if (event.keyCode == 39) {
            this.snake.changeDirection(SnakeDirection.Right);
        }
        // PRESS DOWN ARROW
        else if (event.keyCode == 40) {
            this.snake.changeDirection(SnakeDirection.Down);
        }
        else if (event.keyCode == 32) {
            console.log(this.pause);
            if (this.pause) {
                this.pause = false;
            } else {
                this.pause = true;
            }
        }
    }

    /**
     * Start game
     */
    start() {

        this.snake = new Snake(this.length, this.canvas.width / 10, this.canvas.height / 10, this);
        this.food = new Food(this.canvas.width / 5, this.canvas.height / 5, "#008000", this.snake);
        this.superfood = new SuperFood(this.canvas.width / 5, this.canvas.height / 5, "#ff6347", 50, this.snake);

        this.food.relocate();
        this.superfood.relocate();
        this.animate(); // Start animation
    }

    animate() {
        let fps = this.speed;
        let now;
        let then = Date.now();
        let interval = 1000 / fps;
        let delta;

        let animationLoop = (function () {


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
    }

    /**
     * Update status of game and view
     */
    update() {
        this.canvasContext.fillStyle = '#F0F0F0';
        this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.superfood.count();
        this.snake.draw(this.canvasContext);
        this.food.draw(this.canvasContext);
        this.superfood.draw(this.canvasContext);

        document.getElementById("score").innerHTML = "" + this.score;
        console.log("update")
    }


}
