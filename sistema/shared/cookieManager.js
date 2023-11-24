const {cookieName, chave, maxAge} = require("../config");
const {descriptografar, criptografar} = require('./cryptograph');

const containsCookie = (req, res, redirectPath) => {
    if (!req.cookies[cookieName])
        return res.redirect(redirectPath)
}
const validateId = (res, id) => {
    if (typeof (id) != "number" && id <= 0)
        return res.redirect('/')
}

const createCookie = (res, id) => {
    res.cookie(cookieName, criptografar(id.toString(), chave), { maxAge });
}

const deleteCookie = (res) => {
    res.clearCookie(cookieName);
}

const decodeCookie = (req) => {
    const id = descriptografar(req.cookies[cookieName], chave)
    return id || null
}

module.exports = {
    containsCookie,
    validateId,
    createCookie,
    deleteCookie,
    decodeCookie
}