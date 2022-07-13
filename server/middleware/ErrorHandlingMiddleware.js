//! мідлварина для обробки помилок
const ApiError = require("../error/ApiError")

module.exports = function (err, req, res, next) {
    //? якщо клас помилки ApiError
    if (err instanceof ApiError) {
        res.status(err.status).json({ message: err.message })
    }
    //? якщо це помилка не описана в ApiError
    return res.status(500).json({ message: "Unexpectable error!" })
}
