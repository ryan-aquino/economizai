const crypto = require('crypto');
const IV = "5183666c72eec9e4";
const ALGO = "chacha20"

const criptografar = (texto, chave) => {
    let textTransform = `${texto}$^.${Date.now().toString()}`
    let cipher = crypto.createCipheriv(ALGO, chave, IV);
    let encrypted = cipher.update(textTransform, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

const descriptografar = (cifrado, chave) => {
    let decipher = crypto.createDecipheriv(ALGO, chave, IV);
    let decrypted = decipher.update(cifrado, 'base64', 'utf8');
    let decData = decrypted + decipher.final('utf8');
    let id = decData.split('$^.')[0];
    return (id);
}

module.exports = {
    criptografar,
    descriptografar
}