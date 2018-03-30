"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var Game_1 = require("./Game");
var canvas = document.getElementById("snakeGame");
var speed = 10;
var game = new Game_1.Game(canvas, speed);
game.start();
