import state from "./state.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

function draw() {
    resizeCanvas();
    fillBackground();
    drawTower(state.getTowerA(), 1);
    drawTower(state.getTowerB(), 2);
    drawTower(state.getTowerC(), 3);
    drawTowerLetter("A", 1);
    drawTowerLetter("B", 2);
    drawTowerLetter("C", 3);
}

function resizeCanvas() {
    const size = calcCanvasWidth();
    canvas.width = size;
    canvas.height = size;
    context.scale = window.devicePixelRatio;
}

function fillBackground() {
    context.fillStyle = "#88b";
    context.fillRect(0, 0, canvas.width, canvas.width);
}

function drawTower(tower, position) {
    const fourthhWidth = canvas.width / 4;
    context.lineWidth = canvas.width / 200;

    context.strokeStyle  = "black";
    context.beginPath();
    context.moveTo(position * fourthhWidth, fourthhWidth);
    context.lineTo(position * fourthhWidth, fourthhWidth*3);
    context.stroke();

    tower.forEach( (diskSize,index) => drawDisk(position,index,diskSize));
}

function drawDisk(towerPosition, diskIndex, diskSize) {
    const fourthhWidth = canvas.width / 4;
    const diskHeight = canvas.width / 20;
    const diskWidth = canvas.width / 100;

    context.lineWidth = diskHeight;
    context.strokeStyle = `hsl(${36 * diskIndex},70%,50%)`;
    context.beginPath();
    context.moveTo(towerPosition * fourthhWidth - diskSize*diskWidth, fourthhWidth*3 - diskIndex*diskHeight - diskHeight/2);
    context.lineTo(towerPosition * fourthhWidth + diskSize*diskWidth, fourthhWidth*3 - diskIndex*diskHeight - diskHeight/2);
    context.stroke();
}

function drawTowerLetter(letter, towerPosition) {
    const fourthhWidth = canvas.width / 4;
    context.fillStyle = "#000";
    context.font = "60px Arial";
    context.textAlign = "center"; 
    context.fillText(letter, towerPosition * fourthhWidth, fourthhWidth*3 + 60);
}

function calcCanvasWidth() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return Math.min(screenWidth, screenHeight);
}

export default { draw }