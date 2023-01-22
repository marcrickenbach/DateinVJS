import Disable from "./Disable.js";
import PaintUI from "./PaintUI.js";
import { popLast, PREVIOUS_SCREEN, lastEnabledTog, lastEnabled, synthPlay } from '../datein.js';

export const statusFlags = [false,false,false,false,false,false,false,false]; 
export const READCHANNELS = []; 
export const WRITECHANNELS = [true, false, false, false];
export let CURRENTCHANNEL_WR; 

export const mute = [true, true, true, true]; 



export const toggleA = () => {
    statusFlags[0] = !statusFlags[0]; 
    let a = document.getElementById('aBtn');
    if (!statusFlags[4]){   // not in write mode
        if (statusFlags[0]) {
            a.style.backgroundColor = 'blue';
            a.style.color = 'white';
            mute[0] = false;
        } else {
            a.style.backgroundColor = 'white';
            a.style.color = 'black';
            mute[0] = true;
        }
    } else {  // in write mode
        if (statusFlags[0]) {
            CURRENTCHANNEL_WR = 0;
            console.log('CURRENT: ' + CURRENTCHANNEL_WR);
            a.style.backgroundColor = 'yellow';
            a.style.color = 'black';
            Disable(0); 
        } else {
            a.style.backgroundColor = 'white';
            a.style.color = 'black';
        }
    }
    console.log('A Channel | Status ' + statusFlags[0]);
};



export const toggleB = () => {
    statusFlags[1] = !statusFlags[1]; 
    let b = document.getElementById('bBtn');
    if (!statusFlags[4]){ // not in write mode
        if (statusFlags[1]) {
            b.style.backgroundColor = 'chocolate';
            b.style.color = 'white';
            mute[1] = false;
        } else {
            b.style.backgroundColor = 'white';
            b.style.color = 'black';
            mute[1] = true;
        }
    } else {  // in write mode
        if (statusFlags[1]) {
            CURRENTCHANNEL_WR = 1;
            console.log('CURRENT: ' + CURRENTCHANNEL_WR);
            b.style.backgroundColor = 'yellow';
            b.style.color = 'black';
            Disable(1); 
        } else {
            b.style.backgroundColor = 'white';
            b.style.color = 'black';
        }
    }
    console.log('B Channel | Status ' + statusFlags[1]);
};



export const toggleC = () => {
    statusFlags[2] = !statusFlags[2]; 
    let c = document.getElementById('cBtn');
    if (!statusFlags[4]){ // not in write mode
        if (statusFlags[2]) {
            c.style.backgroundColor = 'darkred';
            c.style.color = 'white';
            mute[2] = false;
        } else {
            c.style.backgroundColor = 'white';
            c.style.color = 'black';
            mute[2] = true;
        }
    } else {  // in write mode
        if (statusFlags[2]) {
            CURRENTCHANNEL_WR = 2;
            console.log('CURRENT: ' + CURRENTCHANNEL_WR);
            c.style.backgroundColor = 'yellow';
            c.style.color = 'black';
            Disable(2); 
        } else {
            c.style.backgroundColor = 'white';
            c.style.color = 'black';
        }
    }
    console.log('C Channel | Status ' + statusFlags[2]);
};



export const toggleD = () => {
    statusFlags[3] = !statusFlags[3]; 
    let d = document.getElementById('dBtn');
    if (!statusFlags[4]){ // not in write mode
        if (statusFlags[3]) {
            d.style.backgroundColor = 'olivedrab';
            d.style.color = 'white';
            mute[3] = false;
        } else {
            d.style.backgroundColor = 'white';
            d.style.color = 'black';
            mute[3] = true;
        }
    } else {  // in write mode
        if (statusFlags[3]) {
            CURRENTCHANNEL_WR = 3;
            console.log('CURRENT: ' + CURRENTCHANNEL_WR);
            d.style.backgroundColor = 'yellow';
            d.style.color = 'black';
            Disable(3); 
        } else {
            d.style.backgroundColor = 'white';
            d.style.color = 'black';
        }
    }
    console.log('D Channel | Status ' + statusFlags[3]);
};



export const toggleWrite = () => {
    statusFlags[4] = !statusFlags[4]; 
    console.log("RD", READCHANNELS);
    console.log("WR", WRITECHANNELS);
    let write = document.getElementById('writeBtn');

    /*      write = 0 | read = 1      */

    if (statusFlags[4]) {
        write.style.backgroundColor = 'yellow';
        // Enter Write Mode
        // Save Current Read Channels to Array
        for (let i = 0; i < 4; i++) {
            READCHANNELS[i] = statusFlags[i];
        }
        // Load Previously saved Write Channels to UI
        PaintUI(0);
    } else {
        write.style.backgroundColor = 'white';
        PaintUI(1);
    }
    console.log('Write | Status ' + statusFlags[4]);
};



export const togglePlay = () => {
    statusFlags[5] = !statusFlags[5]; 
    let play = document.getElementById('playBtn');
    if (statusFlags[5]) {
        play.style.backgroundColor = 'red';
        play.textContent = 'Pause';
        synthPlay(true);
    } else {
        play.style.backgroundColor = 'green';
        play.textContent = 'Play';
        synthPlay(false);
    }
    console.log('Play | Status ' + statusFlags[5]);
};



export const toggleLast = () => {
    console.log('Last was pressed');
    statusFlags[6] = !statusFlags[6]; 
    popLast();
    document.getElementById('binaryBody').innerHTML = PREVIOUS_SCREEN;
    document.getElementById("lastBtn").disabled = true;
    lastEnabledTog(false);
};



export const toggleClear = () => {
    statusFlags[7] = !statusFlags[7]; 
    let clear = document.getElementById('clearBtn');
    console.log('Clear | Status ' + statusFlags[7]);
};