import { READCHANNELS, statusFlags, toggleA, toggleB, toggleC, toggleD } from './Buttons.js';
import Disable from './Disable.js';

import { CURRENTCHANNEL_WR } from './Buttons.js';

/*
    write = 0
    read = 1
 */

const PaintUI = (e) => {

    let a = document.getElementById('aBtn');
    let b = document.getElementById('bBtn');
    let c = document.getElementById('cBtn');
    let d = document.getElementById('dBtn');

    if (e === 0) {
        // Paint yellow buttons
        switch (CURRENTCHANNEL_WR) {
            case 0:
                a.style.backgroundColor = 'yellow';
                a.style.color = 'black';
                Disable(0);
                break;
            case 1:
                b.style.backgroundColor = 'yellow';
                b.style.color = 'black';
                Disable(1);
                break;
            case 2:
                c.style.backgroundColor = 'yellow';
                c.style.color = 'black';
                Disable(2);
                break;
            case 3:
                d.style.backgroundColor = 'yellow';
                d.style.color = 'black';
                Disable(3);
                break;
            default:
                console.log('default!');
                a.style.backgroundColor = 'white';
                a.style.color = 'black';
                b.style.backgroundColor = 'white';
                b.style.color = 'black';
                c.style.backgroundColor = 'white';
                c.style.color = 'black';
                d.style.backgroundColor = 'white';
                d.style.color = 'black';
                break;

        }

    } else if (e === 1) {
        // Paint colored buttons
        for (let i = 0; i < 4; i++) {
            if (READCHANNELS[i] == true) {
                statusFlags[i] = false;
            } else {
                statusFlags[i] = true;
            }
        }
        toggleA();
        toggleB();
        toggleC();
        toggleD();
    }
}


export default PaintUI