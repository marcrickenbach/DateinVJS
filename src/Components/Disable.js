
import { statusFlags } from './Buttons.js';

const Disable = (ch) => {

    let a = document.getElementById('aBtn');
    let b = document.getElementById('bBtn');
    let c = document.getElementById('cBtn');
    let d = document.getElementById('dBtn');

    switch (ch) {

        case 0:
            statusFlags[1] = false;
            statusFlags[2] = false;
            statusFlags[3] = false;
            b.style.backgroundColor = 'white';
            b.style.color = 'black';
            c.style.backgroundColor = 'white';
            c.style.color = 'black';
            d.style.backgroundColor = 'white';
            d.style.color = 'black';
            break;

        case 1:
            statusFlags[0] = false;
            statusFlags[2] = false;
            statusFlags[3] = false;
            a.style.backgroundColor = 'white';
            a.style.color = 'black';
            c.style.backgroundColor = 'white';
            c.style.color = 'black';
            d.style.backgroundColor = 'white';
            d.style.color = 'black';
            break;

        case 2:
            statusFlags[0] = false;
            statusFlags[1] = false;
            statusFlags[3] = false;
            a.style.backgroundColor = 'white';
            a.style.color = 'black';
            b.style.backgroundColor = 'white';
            b.style.color = 'black';
            d.style.backgroundColor = 'white';
            d.style.color = 'black';
            break;

        case 3:
            statusFlags[0] = false;
            statusFlags[1] = false;
            statusFlags[2] = false;
            a.style.backgroundColor = 'white';
            a.style.color = 'black';
            b.style.backgroundColor = 'white';
            b.style.color = 'black';
            c.style.backgroundColor = 'white';
            c.style.color = 'black';
            break;

        default:
            console.log('Write Channel Toggle Error');
            break;
    }
}

export default Disable