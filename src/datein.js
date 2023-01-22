/*
 * Datein
 * Author: Marc Rickenbach
 * 
 * Note: this is a work in progress.
 * 
 * Working example can (or will) be found at https://datein.marcrickenbach.com
 * 
 */


import Info from "./Components/Info.js";
import Clear from "./Components/Clear.js"
import {
    toggleA,
    toggleB,
    toggleC,
    toggleD,
    toggleWrite,
    togglePlay,
    toggleLast,
    mute
} from './Components/Buttons.js';
import * as dateinTone from "/node_modules/tone/build/Tone.js";
import * as Visuals from "./Components/BeatVisual.js";

import { convertToBinary, reader } from "./Components/FileLoad.js";
import { statusFlags, WRITECHANNELS, READCHANNELS } from "./Components/Buttons.js";
import { CURRENTCHANNEL_WR } from "./Components/Buttons.js";
import { INITIAL_FRAME } from "./Components/FileLoad.js";
export let PREVIOUS_SCREEN = '';

dateinInfoBtn.addEventListener('click', () => { Info() });
aBtn.addEventListener('click', () => { toggleA() });
bBtn.addEventListener('click', () => { toggleB() });
cBtn.addEventListener('click', () => { toggleC() });
dBtn.addEventListener('click', () => { toggleD() });
writeBtn.addEventListener('click', () => { toggleWrite() });
playBtn.addEventListener('click', () => { togglePlay() });
lastBtn.addEventListener('click', () => { toggleLast() });
clearBtn.addEventListener('click', () => { Clear() });

const binary = document.querySelector(".binaryBody");
const inputFileField = document.querySelector('input[type="file"]');

let seqA = [];
let seqB = [];
let seqC = [];
let seqD = [];

let stepA = 0;
let stepB = 0;
let stepC = 0;
let stepD = 0;

let aArray = [];
let bArray = [];
let cArray = [];
let dArray = [];

let a_merged = [];
let b_merged = [];
let c_merged = [];
let d_merged = [];

let undoArrayOrder = [];
export let lastEnabled;



// AUDIO CHAIN
const synthA = new Tone.PluckSynth().toDestination();
const synthB = new Tone.PluckSynth().toDestination();
const synthC = new Tone.PluckSynth().toDestination();
const synthD = new Tone.PluckSynth().toDestination();


// Set initial volumes & values
synthA.volume.value = 3;
synthB.volume.value = 3;
synthC.volume.value = 3;
synthD.volume.value = 3;
Tone.Master.volume.value = 10;


// Set initial BPM
Tone.Transport.bpm.value = 160;
// export let beatAnalyzer = new Tone.Waveform();
export let meterA = new Tone.Waveform();
export let meterB = new Tone.Waveform();
export let meterC = new Tone.Waveform();
export let meterD = new Tone.Waveform();
synthA.connect(meterA);
synthB.connect(meterB);
synthC.connect(meterC);
synthD.connect(meterD);

const audContext = new Tone.Context();

const ToneLoop = new Tone.Loop(time => {

    if (typeof a_merged !== 'undefined' && a_merged.length > 0) {
        if (a_merged[stepA] === "1" && !mute[0]) {
            synthA.triggerAttackRelease(440, "32n", time);
        } else {
        }
        stepA += 1;
        stepA %= a_merged.length;
    }

    if (typeof b_merged !== 'undefined' && b_merged.length > 0) {
        if (b_merged[stepB] === "1" && !mute[1]) {
            synthB.triggerAttackRelease(220, "32n", time);
        } else {
        }
        stepB += 1;
        stepB %= b_merged.length;
    }

    if (typeof c_merged !== 'undefined' && c_merged.length > 0) {
        if (c_merged[stepC] === "1" && !mute[2]) {
            synthC.triggerAttackRelease(120, "32n", time);
        } else {
        }
        stepC += 1;
        stepC %= c_merged.length;
    }

    if (typeof d_merged !== 'undefined' && d_merged.length > 0) {
        if (d_merged[stepD] === "1" && !mute[3]) {
            synthD.triggerAttackRelease(1130, "32n", time);
        } else {
        }
        stepD += 1;
        stepD %= d_merged.length;
    }

    Tone.Draw.schedule(() => {
    }, time);

}, '8n').start(0);


export const lastEnabledTog = (e) => {
    lastEnabled = e;
}

export const synthPlay = (e) => {
    if (e) {
        audContext.resume();
        Tone.start();
        Tone.Transport.start();
    } else {
        Tone.Transport.pause();
    }
}

$(document).ready(() => {
    document.getElementById("lastBtn").disabled = true;
    lastEnabled = false;
})

if (binary != null) {
    binary.onmouseup = function () {
        let selectedText, sequenceData = "";
        let span = document.createElement('span');

        if (window.getSelection) {
            let windowTest = window.getSelection();
            if (windowTest == "" || statusFlags[4] == false || (CURRENTCHANNEL_WR == null || CURRENTCHANNEL_WR == 4)) {
                console.log('CURRENT: ' + CURRENTCHANNEL_WR);
                if (statusFlags[4] == true && (CURRENTCHANNEL_WR == null || CURRENTCHANNEL_WR == 4)) {
                    alert("Choose a channel to write to");
                }
                return -1;
            } else {
                PREVIOUS_SCREEN = document.getElementById("binaryBody").innerHTML;
                console.log(PREVIOUS_SCREEN);
                // enable 'LAST' button
                document.getElementById("lastBtn").disabled = false;
                lastEnabledTog(true);
                console.log('Binary Selection: Mouse Up');
                selectedText = document.getSelection();
                sequenceData = selectedText;
                let range = sequenceData.getRangeAt(0).cloneRange();
                range.surroundContents(span);
                sequenceData.removeAllRanges();
                sequenceData.addRange(range);
            }
        }

        if (statusFlags[4] === true) {
            switch (CURRENTCHANNEL_WR) {
                case 0:
                    seqA = sequenceData;
                    if (seqA === "") {
                        return -1;
                        //do nothing;
                    } else {
                        span.className = "highlight_A";
                        if (aArray.length === 0) {
                            aArray[0] = String(seqA);
                            aArray[0] = Array.from(String(seqA));
                        } else if (aArray.length > 0) {
                            aArray[aArray.length] = Array.from(String(seqA));
                        }
                    }
                    undoArrayOrder[undoArrayOrder.length] = 0;
                    selectedText.removeAllRanges();
                    a_merged = [].concat(...aArray);
                    console.log('aArray: ', aArray);
                    console.log('a_merged: ', a_merged);
                    console.log('seqA: ', seqA);
                    break;
                case 1:
                    seqB = sequenceData;
                    if (seqB === "") {
                        return -1;
                        //do nothing;
                    } else {
                        span.className = "highlight_B";
                        if (bArray.length > 0) {
                            bArray[bArray.length] = Array.from(String(seqB));
                        } else if (bArray.length === 0) {
                            bArray[0] = Array.from(String(seqB));
                        }
                    }
                    undoArrayOrder[undoArrayOrder.length] = 1;
                    selectedText.removeAllRanges();
                    b_merged = [].concat(...bArray);
                    console.log('bArray: ', bArray);
                    console.log('b_merged: ', b_merged);
                    console.log('seqB: ', seqB);
                    break;
                case 2:
                    seqC = sequenceData;
                    if (seqC === "") {
                        return -1;
                        //do nothing;
                    } else {
                        span.className = "highlight_C";
                        if (cArray.length > 0) {
                            cArray[cArray.length] = Array.from(String(seqC));
                        } else if (cArray.length === 0) {
                            cArray[0] = Array.from(String(seqC));
                        }
                    }
                    undoArrayOrder[undoArrayOrder.length] = 2;
                    selectedText.removeAllRanges();
                    c_merged = [].concat(...cArray);
                    break;
                case 3:
                    seqD = sequenceData;
                    if (seqD === "") {
                        return -1;
                        //do nothing;
                    } else {
                        span.className = "highlight_D";
                        if (dArray.length > 0) {
                            dArray[dArray.length] = Array.from(String(seqD));
                        } else if (dArray.length === 0) {
                            dArray[0] = Array.from(String(seqD));
                        }
                    }
                    undoArrayOrder[undoArrayOrder.length] = 3;
                    selectedText.removeAllRanges();
                    d_merged = [].concat(...dArray);
                    break;
                default:
                    if (sequenceData == "") {
                        return -1;
                        //do nothing;
                    }
                    alert("Choose a channel to write a sequence to first.");
                    console.log('Switch Error: No Channel Selected')
                    break;
            }
        }
    }
}

export const popLast = () => {
    // Check to see which channel was the last to grow its array
    let popChannel;
    let popLength;

    if (undoArrayOrder.length > 0) {
        popChannel = undoArrayOrder[undoArrayOrder.length - 1]
    }
    switch (popChannel) {
        case 0:
            // check the length of that last array element: popLength = channel[channel.length-1].length    
            popLength = aArray[aArray.length - 1].length;
            // pop off the last element of that array
            aArray.pop();
            // set up a for loop with an iteration length equal to popLength
            for (let i = 0; i < popLength; i++) {
                // pop off that many elements from the mergedArray
                a_merged.pop();
            }
            //console.log result to make sure that we're rid of the last added elements in all appropriate arrays
            console.log('aArray updated: ', aArray);
            console.log('a_merged updated: ', a_merged);
            break;
        case 1:
            popLength = bArray[bArray.length - 1].length;
            bArray.pop();
            for (let i = 0; i < popLength; i++) {
                b_merged.pop();
            }
            console.log('bArray updated: ', bArray);
            console.log('b_merged updated: ', b_merged);
            break;
        case 2:
            popLength = cArray[cArray.length - 1].length;
            cArray.pop();
            for (let i = 0; i < popLength; i++) {
                c_merged.pop();
            }
            console.log('cArray updated: ', cArray);
            console.log('c_merged updated: ', c_merged);
            break;
        case 3:
            popLength = dArray[dArray.length - 1].length;
            dArray.pop();
            for (let i = 0; i < popLength; i++) {
                d_merged.pop();
            }
            console.log('dArray updated: ', dArray);
            console.log('d_merged updated: ', d_merged);
            break;
        default:
            console.log('popLast Error');
            break;
    }
}

export const ResetSqs = () => {
    // Call this function to clear all arrays
    seqA = [];
    seqB = [];
    seqC = [];
    seqD = [];

    aArray = [];
    bArray = [];
    cArray = [];
    dArray = [];

    a_merged = [];
    b_merged = [];
    c_merged = [];
    d_merged = [];

    undoArrayOrder = [];

    // Verification
    console.log(seqA);
    console.log(aArray);
    console.log(a_merged);
}



inputFileField.addEventListener('change', (e) => {

    //Reset buttons, write status, sequencer arrays   

    reader.onload = () => {
        ResetSqs();
        let finalBinary = reader.result.trim();
        finalBinary = finalBinary.replace(/\s/g, '');
        finalBinary = finalBinary.replace(/(\r\n|\n|\r)/gm, '');
        finalBinary = finalBinary.slice(0, 1000);
        convertToBinary(finalBinary);
        PREVIOUS_SCREEN = INITIAL_FRAME;
        console.log('Initial Frame loaded into PREVIOUS_SCREEN');
    }
    reader.readAsText(inputFileField.files[0]);
}, false)



//////////////////////////////////////////////////////////////
// BPM KNOB
//////////////////////////////////////////////////////////////

const knobFREQ = pureknob.createKnob(50, 50);

knobFREQ.setProperty('angleStart', -0.75 * Math.PI);
knobFREQ.setProperty('angleEnd', 0.15 * Math.PI);
knobFREQ.setProperty('colorFG', 'black');
knobFREQ.setProperty('colorBG', 'whitesmoke');
knobFREQ.setProperty('trackWidth', 0.5);
knobFREQ.setProperty('valMin', 0);
knobFREQ.setProperty('valMax', 500);
knobFREQ.setProperty('colorLabel', 'black');
knobFREQ.setProperty('label', 'BPM');
knobFREQ.setProperty('abel', 'yellow');

knobFREQ.setValue(160);

const listener_freq = (knobFREQ, value) => {
    let oscFreq = value;
    Tone.Transport.bpm.value = oscFreq;
};

knobFREQ.addListener(listener_freq);

const node_freq = knobFREQ.node();

const elem_freq = document.getElementById('knobMenu');
elem_freq.appendChild(node_freq);
elem_freq.insertAdjacentHTML('beforeend', "&nbsp;&nbsp;&nbsp;&nbsp;");



//////////////////////////////////////////////////////////////
// MASTER VOLUME KNOB
//////////////////////////////////////////////////////////////


const knobNote = pureknob.createKnob(50, 50);

knobNote.setProperty('angleStart', -0.75 * Math.PI);
knobNote.setProperty('angleEnd', 0.15 * Math.PI);
knobNote.setProperty('colorFG', 'darkgrey');
knobNote.setProperty('colorBG', 'whitesmoke');
knobNote.setProperty('trackWidth', 0.5);
knobNote.setProperty('valMin', -24);
knobNote.setProperty('valMax', 16);
knobNote.setProperty('colorLabel', 'black');
knobNote.setProperty('label', 'VOL');

knobNote.setValue(10);

const listener_note = (knobNote, value) => {
    Tone.Master.volume.value = value;
};

knobNote.addListener(listener_note);

const node_note = knobNote.node();

const elem_note = document.getElementById('knobMenu');
elem_note.appendChild(node_note);
elem_note.insertAdjacentHTML('beforeend', "&nbsp;&nbsp;&nbsp;&nbsp;");


//////////////////////////////////////////////////////////////
// A GAIN KNOB
//////////////////////////////////////////////////////////////

const knobGAIN_A = pureknob.createKnob(50, 50);

knobGAIN_A.setProperty('angleStart', -0.75 * Math.PI);
knobGAIN_A.setProperty('angleEnd', 0.15 * Math.PI);
knobGAIN_A.setProperty('colorFG', 'blue');
knobGAIN_A.setProperty('colorBG', 'whitesmoke');
knobGAIN_A.setProperty('trackWidth', 0.5);
knobGAIN_A.setProperty('valMin', -24);
knobGAIN_A.setProperty('valMax', 9);

knobGAIN_A.setValue(3);

const listener_gainA = (knobGAIN_A, value) => {
    synthA.volume.value = value;
};

knobGAIN_A.addListener(listener_gainA);

const node_gainA = knobGAIN_A.node();

const elem_gainA = document.getElementById('knobMenu');
elem_gainA.appendChild(node_gainA);
elem_gainA.insertAdjacentHTML('beforeend', "&nbsp;&nbsp;&nbsp;&nbsp;");


//////////////////////////////////////////////////////////////
// B GAIN KNOB
//////////////////////////////////////////////////////////////

const knobGAIN_B = pureknob.createKnob(50, 50);

knobGAIN_B.setProperty('angleStart', -0.75 * Math.PI);
knobGAIN_B.setProperty('angleEnd', 0.15 * Math.PI);
knobGAIN_B.setProperty('colorFG', 'chocolate');
knobGAIN_B.setProperty('colorBG', 'whitesmoke');
knobGAIN_B.setProperty('trackWidth', 0.5);
knobGAIN_B.setProperty('valMin', -24);
knobGAIN_B.setProperty('valMax', 9);


knobGAIN_B.setValue(3);

const listener_gainB = (knobGAIN_B, value) => {
    synthB.volume.value = value;
};

knobGAIN_B.addListener(listener_gainB);

const node_gainB = knobGAIN_B.node();

const elem_gainB = document.getElementById('knobMenu');
elem_gainB.appendChild(node_gainB);
elem_gainB.insertAdjacentHTML('beforeend', "&nbsp;&nbsp;&nbsp;&nbsp;");


//////////////////////////////////////////////////////////////
// C GAIN KNOB
//////////////////////////////////////////////////////////////

const knobGAIN_C = pureknob.createKnob(50, 50);

knobGAIN_C.setProperty('angleStart', -0.75 * Math.PI);
knobGAIN_C.setProperty('angleEnd', 0.15 * Math.PI);
knobGAIN_C.setProperty('colorFG', 'darkred');
knobGAIN_C.setProperty('colorBG', 'whitesmoke');
knobGAIN_C.setProperty('trackWidth', 0.5);
knobGAIN_C.setProperty('valMin', -24);
knobGAIN_C.setProperty('valMax', 9);

knobGAIN_C.setValue(3);

const listener_gainC = (knobGAIN_C, value) => {
    synthC.volume.value = value;
};

knobGAIN_C.addListener(listener_gainC);

const node_gainC = knobGAIN_C.node();

const elem_gainC = document.getElementById('knobMenu');
elem_gainC.appendChild(node_gainC);
elem_gainC.insertAdjacentHTML('beforeend', "&nbsp;&nbsp;&nbsp;&nbsp;");
elem_gainC.style.textAlign = 'justify';

//////////////////////////////////////////////////////////////
// D GAIN KNOB
//////////////////////////////////////////////////////////////

const knobGAIN_D = pureknob.createKnob(50, 50);

knobGAIN_D.setProperty('angleStart', -0.75 * Math.PI);
knobGAIN_D.setProperty('angleEnd', 0.15 * Math.PI);
knobGAIN_D.setProperty('colorFG', 'olivedrab');
knobGAIN_D.setProperty('colorBG', 'whitesmoke');
knobGAIN_D.setProperty('trackWidth', 0.5);
knobGAIN_D.setProperty('valMin', -24);
knobGAIN_D.setProperty('valMax', 9);

knobGAIN_D.setValue(3);

const listener_gainD = (knobGAIN_D, value) => {
    synthD.volume.value = value;
};

knobGAIN_D.addListener(listener_gainD);

const node_gainD = knobGAIN_D.node();

const elem_gainD = document.getElementById('knobMenu');
elem_gainD.appendChild(node_gainD);
elem_gainD.style.textAlign = 'center';


document.addEventListener('keydown', (event) => {
    let code = event.code;
    switch (code) {
        case 'KeyA':
            toggleA()
            break;
        case 'KeyS':
            toggleB();
            break;
        case 'KeyD':
            toggleC();
            break;
        case 'KeyF':
            toggleD();
            break;
        case 'KeyP':
            togglePlay();
            break;
        case 'KeyW':
            toggleWrite();
            break;
        case 'KeyL':
            if (lastEnabled) {
                toggleLast();
            } else {
                Swal.fire({
                    text: "You can only return to the last sequence entered.",
                    confirmButtonColor: 'black',
                    confirmButtonText: 'Ok, fine',
                    width: '22em'
                })
            }
            break;
        default:
            return -1;
    }
});

