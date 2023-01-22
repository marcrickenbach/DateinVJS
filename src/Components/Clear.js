import { INITIAL_FRAME } from './FileLoad.js';
import { ResetSqs } from '../datein.js';

const Clear = () => {
    Swal.fire({
        html: "<p style='font-size:16px; font-family:monospace'>Do you want to clear your sequences?</p>",
        // icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'black',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Clear it!',
        width: '22em'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                html: "<p style='font-size:16px; font-family:monospace'>You've got a clean slate!</p>",
                confirmButtonColor: 'pink',
                confirmButtonText: "Make some more sounds",
                width: '22em'
            })
            document.getElementById('binaryBody').innerHTML = INITIAL_FRAME;
            ResetSqs();
        }
    })
}

export default Clear