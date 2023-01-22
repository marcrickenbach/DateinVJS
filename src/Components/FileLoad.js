export let length_of_file = 0;
export const reader = new FileReader();
export let INITIAL_FRAME = '';

export const convertToBinary = (dataIn) => {

    const textToBinary = (dataIn = '') => {
        let binResult = '';
        binResult = dataIn.split('').map(char => {
            return char.charCodeAt(0).toString(2);
        }).join(' ');
        length_of_file = binResult.length;
        INITIAL_FRAME = binResult.replace(/\s/g, '');
        return binResult;
    };
    document.getElementById('binaryBody').textContent = textToBinary(dataIn).replace(/\s/g, '');
}
