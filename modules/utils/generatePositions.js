const boundary = [250, 250];
const maxLength =  280;

const fs = require('fs');

const positions = new Set();

while(positions.size < maxLength) {
    const pixelPosition = {
        x: getRandomInt(boundary[0]),
        y: getRandomInt(boundary[1]),
        value: 0
    }
    positions.add(JSON.stringify(pixelPosition));
}

const result = Array.from(positions).map(el => JSON.parse(el));

fs.writeFileSync('../../configs/pixelPositions.json',JSON.stringify(result));

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}