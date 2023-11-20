module.exports = (valid, status = 200, message = "", response = {}) => {
    return {
        valid,
        response,
        message,
        status
    }
}