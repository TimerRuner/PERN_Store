//! Модуль, який провіряє роль користувача і надає йому певні права
const jwt = require("jsonwebtoken")

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(" ")[1] //**Bearer jfaklsjohtl */

            if (!token) {
                return res.status(401).json({ message: "Not authorization" })
            }

            //? розшифровуємо токен
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            // ?порівнюємо роль поточного користувача із роллю, яка надає спец права і дозволяємо виконати запит, або скасовуємо його

            if (decoded.role !== role) {
                return res.status(403).json({ message: "Not acess" })
            }
            req.user = decoded

            next()
        } catch (error) {
            res.status(401).json({ message: "Not authorization err" })
        }
    }
}
