//? контроллер для опрацювання логіки в роутері device
const generateId = require("../utils/randomId")
const path = require("path")
const { Device, DeviceInfo } = require("../models/models")
const { nextTick } = require("process")
const ApiError = require("../error/ApiError")

class DeviceController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = generateId() + ".jpg"
            img.mv(path.resolve(__dirname, "..", "static", fileName)) //? переміщаємо файл в папку static і вказуємо їй ім'я

            //? створюємо новий девайс на основі отриманих даних
            const device = await Device.create({
                name,
                price,
                brandId,
                typeId,
                img: fileName, //? в бд передаємо лише назву файлу
            })

            //? якщо дані є - закидаємо їх в таблицю info
            if (info) {
                info = JSON.parse(info)
                info.forEach((i) => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id,
                    })
                })
            }

            return res.json(device)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async getAll(req, res) {
        //? якщо brandId i typeId не вказані, то поверне усі девайси
        let { brandId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit //? вираховуюємо стартовий індекс порції товарів в залежності від сторінки і к-сті елементів на сторінку

        let devices

        //!findAndCountAll - метод, що поверне не лише об'єкти шукаємі в бд за заданими параметрами, я й к-сть товарів загалом
        //? повернемо всі девайси
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset })
        }

        //? робимо фільтрацію лише по бренду
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({
                where: { brandId },
                limit,
                offset,
            })
        }

        //? робимо фільтрацію лише по типу
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({
                where: { typeId },
                limit,
                offset,
            })
        }

        //? робимо фільтрацію і по бренду і по типу
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({
                where: { typeId, brandId },
                limit,
                offset,
            })
        }

        return res.json(devices)
    }
    async getOne(req, res) {
        const { id } = req.params
        const device = await Device.findOne({
            where: { id },
            include: [{ model: DeviceInfo, as: "info" }], //? получаємо і масив характеристик поле info якого буде отримано із моделі device info із яким device пов'язаний
        })
        res.json(device)
    }
}

module.exports = new DeviceController()
