import state from "./state.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

function draw(count, upcomingMove) {
    const highlightedA = upcomingMove == "AB" || upcomingMove == "AC";
    const highlightedB = upcomingMove == "AB" || upcomingMove == "BC";
    const highlightedC = upcomingMove == "AC" || upcomingMove == "BC";

    resizeCanvas();
    fillBackground();
    drawMoveMarker("AB", 1, upcomingMove == "AB");
    drawMoveMarker("AC", 2, upcomingMove == "AC");
    drawMoveMarker("BC", 3, upcomingMove == "BC");
    drawCounter(count);
    drawTower(state.getTowerA(), 1);
    drawTower(state.getTowerB(), 2);
    drawTower(state.getTowerC(), 3);
    drawTowerLetter("A", 1, highlightedA);
    drawTowerLetter("B", 2, highlightedB);
    drawTowerLetter("C", 3, highlightedC);

    drawArrow(upcomingMove);
}

function resizeCanvas() {
    const size = calcCanvasWidth();
    canvas.width = size;
    canvas.height = size;
    context.scale = window.devicePixelRatio;
}

function calcCanvasWidth() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return Math.min(screenWidth, screenHeight);
}

function fillBackground() {
    context.fillStyle = "#eee";
    context.fillRect(0, 0, canvas.width, canvas.width);
}

function drawMoveMarker(text, position, highlighted) {
    context.fillStyle = highlighted ? "#444" : "#bbb";
    context.font = "60px Arial";
    context.textAlign = "left"; 
    context.fillText(text, 20, 60 + position * 60);
}

function drawCounter(count) {
    context.fillStyle = "#444";
    context.font = "60px Arial";
    context.textAlign = "left"; 
    context.fillText(count, 20, 60);
}

function drawTower(tower, position) {
    const fourthhWidth = canvas.width / 4;
    context.lineWidth = canvas.width / 200;

    context.strokeStyle  = "#888";
    context.lineCap = "round";
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
    context.lineCap = "round";
    context.strokeStyle = `hsl(${(360 / state.DISk_COUNT) * diskSize},70%,50%)`;
    context.beginPath();
    context.moveTo(towerPosition * fourthhWidth - diskSize*diskWidth, fourthhWidth*3 - diskIndex*diskHeight - diskHeight/2);
    context.lineTo(towerPosition * fourthhWidth + diskSize*diskWidth, fourthhWidth*3 - diskIndex*diskHeight - diskHeight/2);
    context.stroke();
}

function drawTowerLetter(letter, towerPosition, highlighted) {
    const fourthhWidth = canvas.width / 4;
    context.fillStyle = highlighted ? "#444" : "#888";
    context.font = "60px Arial";
    context.textAlign = "center"; 
    context.fillText(letter, towerPosition * fourthhWidth, fourthhWidth*3 + 60);
}

function drawArrow(move) {

    const fourthhWidth = canvas.width / 4;
    var startX;
    var endX;
    switch(move) {
        case "AB": startX = fourthhWidth; endX = fourthhWidth*2; break;
        case "AC": startX = fourthhWidth; endX = fourthhWidth*3; break;
        case "BC": startX = fourthhWidth*2; endX = fourthhWidth*3; break;
    }

    context.lineWidth = 5;
    context.lineCap = "round";
    context.strokeStyle = "#444";
    context.beginPath();
    context.moveTo(startX - 10, fourthhWidth * 3 + 90);
    context.lineTo(startX, fourthhWidth * 3 + 80);
    context.lineTo(startX + 10, fourthhWidth * 3 + 90);
    context.stroke();

    context.beginPath();
    context.moveTo(endX - 10, fourthhWidth * 3 + 90);
    context.lineTo(endX, fourthhWidth * 3 + 80);
    context.lineTo(endX + 10, fourthhWidth * 3 + 90);
    context.stroke();

    context.beginPath();
    context.moveTo(startX, fourthhWidth * 3 + 80);
    context.bezierCurveTo(startX, fourthhWidth * 3 + 200, endX, fourthhWidth * 3 + 200, endX, fourthhWidth * 3 + 80);
    context.stroke();
}



export default { draw }