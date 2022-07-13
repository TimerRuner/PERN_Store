//? контроллер для опрацювання логіки в роутері type
const { Type } = require("../models/models")
const ApiError = require("../error/ApiError")

class TypeController {
    //? створення типів продукту в бд
    async create(req, res) {
        const { name } = req.body
        const type = await Type.create({ name }) //! створюємо новий тип в бд через модель
        return res.json(type)
    }
    //? повернення даних по типам з бд
    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
}

module.exports = new TypeController()
