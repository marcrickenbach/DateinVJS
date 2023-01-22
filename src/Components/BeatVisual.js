import { meterA, meterB, meterC, meterD } from "../datein.js";
import * as p5 from '../p5/p5.js';

// var w = window.innerWidth;
// var h = window.innerHeight;

// Definition of windowResized Function



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
 

    // for (let i = 1; i < buffer.length; i++) {
    //     //CH A
    //     let x1 = map(i - 1, 0, buffer.length, 0, windowWidth);
    //     let y1 = map(buffer[i - 1], -1, 1, 0, 90);

    //     let x2 = map(i, 0, buffer.length, 0, windowWidth);
    //     let y2 = map(buffer[i], -1, 1, 0, 90);

    //     line(x1, y1, x2, y2);
    //     stroke(255, 204, 100);
    //     strokeWeight(1);

        // //CH B
        // let x3 = map(i - 1, 0, paramB.length, 0, windowWidth);
        // let y3 = map(paramB[i - 1], -1, 1, 0, 90);

        // let x4 = map(i, 0, paramB.length, 0, windowWidth);
        // let y4 = map(paramB[i], -1, 1, 0, 90);

        // line(x3, y3-10, x4-10, y4-10);
        // stroke(0, 0, 0);
        // strokeWeight(1);

        // //CH C
        // let x5 = map(i - 1, 0, paramC.length, 0, windowWidth);
        // let y5 = map(paramC[i - 1], -1, 1, 0, 90);

        // let x6 = map(i, 0, paramC.length, 0, windowWidth);
        // let y6 = map(paramC[i], -1, 1, 0, 90);

        // line(x5, y5+10, x6+10, y6+10);
        // stroke(0, 0, 0);
        // strokeWeight(1);

        // //CH D
        // let x7 = map(i - 1, 0, paramD.length, 0, windowWidth);
        // let y7 = map(paramD[i - 1], -1, 1, 0, 90);

        // let x8 = map(i, 0, paramD.length, 0, windowWidth);
        // let y8 = map(paramD[i], -1, 1, 0, 90);

        // line(x7, y7+30, x8+30, y8+30);
        // stroke(0, 0, 0);
        // strokeWeight(1);
    }

    // for (let k = 1; k < paramB.length; k++) {
    //     let x3 = map(k - 1, 0, paramB.length, 0, windowWidth);
    //     let y3 = map(paramB[k - 1], -1, 1, 0, 90);

    //     let x4 = map(k, 0, paramB.length, 0, windowWidth);
    //     let y4 = map(paramB[k], -1, 1, 0, 90);

    //     line(x3, y3-10, x4-10, y4-10);
    //     stroke(0, 0, 0);
    //     strokeWeight(1);
    // }

    // for (let m = 1; m < paramC.length; m++) {
    //     let x1 = map(m - 1, 0, paramC.length, 0, windowWidth);
    //     let y1 = map(paramC[m - 1], -1, 1, 0, 90);

    //     let x2 = map(m, 0, paramC.length, 0, windowWidth);
    //     let y2 = map(paramC[m], -1, 1, 0, 90);

    //     line(x1, y1+10, x2+10, y2+10);
    //     stroke(0, 0, 0);
    //     strokeWeight(1);
    // }

    // for (let g = 1; g < paramD.length; g++) {
    //     let x6 = map(g - 1, 0, paramD.length, 0, windowWidth);
    //     let y6 = map(paramD[g - 1], -1, 1, 0, 90);

    //     let x7 = map(g, 0, paramD.length, 0, windowWidth);
    //     let y7 = map(paramD[g], -1, 1, 0, 90);

    //     line(x6, y6+30, x7+30, y7+30);
    //     stroke(0, 0, 0);
    //     strokeWeight(1);
    // }
// }

window.setup = setup;
window.draw = draw;

function windowResized() {
    resizeCanvas(windowWidth, 100);
}