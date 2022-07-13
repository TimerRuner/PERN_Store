//? контроллер для опрацювання логіки в роутері brand

const { Brand } = require("../models/models")
const ApiError = require("../error/ApiError")

class BrandController {
    async create(req, res) {
        const { name } = req.body
        const brand = await Brand.create({ name }) //! створюємо новий бренд в бд через модель
        return res.json(brand)
    }
    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
}

module.exports = new BrandController()
