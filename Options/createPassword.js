const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*-_+=(){}|/.,"

const createPassword = (length=6, hasNumber=true, hasSymbol=true) => {

    let sample = alpha;
    hasNumber? (sample+=numbers) : ''
    hasSymbol? (sample+=symbols) : ''

    return generatedPassword(length, sample);



}

const generatedPassword = (length, sample) => {
    let password = ''
    for(let i = 0; i<length;i++){
        password+=sample.charAt(Math.floor(Math.random() * sample.length))
    }
    return password;
}

module.exports = createPassword;