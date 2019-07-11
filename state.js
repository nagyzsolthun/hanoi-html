const MAX_VALUE = 10;

const towerA = calcFilledTower();
const towerB = [];
const towerC = [];

function calcFilledTower() {
    const tower = [];
    for (var i = MAX_VALUE; i > 0; i--) {
        tower.push(i);
    }
    return tower;
}

function moveLegalAB() {
    moveLegal(towerA, towerB);
}

function moveLegalAC() {
    moveLegal(towerA, towerC);
}

function moveLegalBC() {
    moveLegal(towerB, towerC);
}

function moveLegal(tower1, tower2) {
    const disk1 = calcTopDisk(tower1);
    const disk2 = calcTopDisk(tower2);
    if (disk1 < disk2) {
        moveDisk(tower1, tower2);
    }
    if (disk2 < disk1) {
        moveDisk(tower2, tower1);
    }
}

function calcTopDisk(tower) {
    const lastIndex = tower.length - 1;
    if (lastIndex < 0) {
        return MAX_VALUE + 1;
    }
    return tower[lastIndex];
}

function moveDisk(source, target) {
    const disk = source.pop();
    target.push(disk);
}

function getTowerA() {
    return towerA;
}

function getTowerB() {
    return towerB;
}

function getTowerC() {
    return towerC;
}

export default { moveLegalAB, moveLegalAC, moveLegalBC, getTowerA, getTowerB, getTowerC }