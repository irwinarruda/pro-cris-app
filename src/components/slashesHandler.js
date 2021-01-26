export function splitSlashes(value, param) {
    let pureNumber = '';
    value.split(param).forEach((item) => {
        pureNumber += item;
    });
    return pureNumber;
}

export function insertSlashes(value) {
    let slashedNumber = '';
    //for para o value.length, mas quero restringir mais
    for(let i = 0; i < 8; i++) {
        slashedNumber += value[i];
        if(i === 1 || i === 3) {
            slashedNumber += '/';
        }
    }
    return slashedNumber;
}