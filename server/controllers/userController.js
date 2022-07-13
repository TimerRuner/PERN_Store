//? контроллер для опрацювання логіки в роутері user
const ApiError = require("../error/ApiError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { User, Basket } = require("../models/models")

const generateJwt = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
        expiresIn: "24h",
    })
}

class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body
        if (!email) {
            return next(ApiError.badRequest("Uncorrect email and password"))
        }
        const candidate = await User.findOne({ where: { email } })
        //? якщо кандидат уже є ми не можемо зареєструватись ще раз
        if (candidate) {
            return next(ApiError.badRequest("User has been created"))
        }
        //? хешуємо пароль
        const hashPassword = await bcrypt.hash(password, 5)

        //? створюємо користувача
        const user = await User.create({ email, role, password: hashPassword })

        //? створюємо корзину даного користувача
        const basket = await Basket.create({ userId: user.id })

        //? генеруємо jwt token і вщиваємо в нього основні дані користувача
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({ token })
    }
    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.internal("User not found"))
        }
        //? порівнюємо хешовані паролі
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal("Password incorrect"))
        }

        const token = generateJwt(user.id, user.email, user.role)
        return res.json({ token })
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({ token })
    }
}

module.exports = new UserController()
