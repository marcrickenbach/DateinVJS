import { meterA, meterB, meterC, meterD } from "../datein.js";
import * as p5 from '../p5/p5.js';



function setup() {
    let canv = createCanvas(windowWidth, 80);
    canv.parent('beatvisual');
    background(255);
}


function draw() {
    background(255);
    let buffer = meterA.getValue();
    let paramB = meterB.getValue();
    let paramC = meterC.getValue();
    let paramD = meterD.getValue();

    for (let i = 0; i < buffer.length; i++) {
        let x1 = map(buffer[i], 0, buffer.length, 0, windowWidth);
        rect(x1, 1, buffer[i]*windowWidth, 18);
        noStroke();
        fill(0,0,0);

        let x2 = map(paramB[i], 0, paramB.length, 0, windowWidth);
        rect(x2, 25, paramB[i]*windowWidth, 20);
        noStroke();
        fill(0,0,0);

        let x3 = map(paramC[i], 0, paramC.length, 0, windowWidth);
        rect(x3, 50, paramC[i]*windowWidth, 13);
        noStroke();
        fill(0,0,0);

        let x4 = map(paramD[i], 0, paramD.length, 0, windowWidth);
        rect(x4, 75, paramD[i]*windowWidth, 8);
        noStroke();
        fill(0,0,0);
    }
}

window.setup = setup;
window.draw = draw;

function windowResized() {
    resizeCanvas(windowWidth, 100);
}