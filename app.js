import game from "./game.js";

game.hello();

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

function draw() {
    const size = calcCanvasSize();

    canvas.width = size;
    canvas.height = size;

    context.beginPath();
    context.fillStyle = "#88b";
    context.fillRect(0, 0, size, size);
    context.stroke();

    context.beginPath();
    context.lineWidth = size / 200;
}

function calcCanvasSize() {
    const scale = window.devicePixelRatio;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return Math.min(screenWidth, screenHeight) * scale;
}

draw();