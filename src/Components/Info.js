const Info = () => {
    Swal.fire({
        title: 'Datein',
        html: "<p style='font-size:16px; font-family:monospace'>Binary Rhythm Generator</p><p style='font-size:14px;font-family:monospace''>built by <a class='modalLink' href='https://www.marcrickenbach.com' target='_blank'>Marc Rickenbach</a> using JavaScript, Tone.js and pure-knob</p><p style='font-size:14px; text-align: justify; font-family:monospace''>DATEIN (German n. pl. 'data, data sets, files') is a JavaScript web app that allows for playful data-mining of user-supplied files that results in accidental rhythms and sequences. Once a file is loaded, it is translated into a binary string from which patterns can be selected. Each channel produces a different percussive sound.</p><p style='font-size:14px; text-align: justify; font-family:monospace''>To use: (1) load a file from the menu (note that none of your files are being uploaded and are only partial) (2) select write mode and channel (3) select pattern from body binary text. (4) once out of write mode, toggle channels on/off.</p><p style='font-size:13px; font-family:monospace'>last update: 01.19.23</p>",
            // icon: 'warning',
            // showCancelButton: true,
            confirmButtonColor: 'black',
        // cancelButtonColor: '#d33',
        confirmButtonText: 'Got it',
        width: '32em'
        })
    }

export default Info


/**
 * <p style='font-size:13px; font-family:monospace; text-align: left'><table><tr><td>[A] -> A</td><td>[B] -> S</td><td>[C] -> D</td><td>[D] -> F</td><td>[W] -> W</td></tr><tr></tr><tr><td>[Play] -> S</td><td>[Last] -> L</td></tr></table></p>
 */