require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const models = require("./models/models")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const router = require("./routes/index")
const errorHandler = require("./middleware/ErrorHandlingMiddleware")
const path = require("path")

const PORT = process.env.PORT || 7000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "static"))) //? говоримо серверу, що можна роздавати ці картинки із фотки
app.use(fileUpload())
app.use("/api", router)
//? міддлвейр, який обробляє помилки є замикаючим і йде останнім
app.use(errorHandler)

app.get("/", (req, res) => {
    res.status(200).json({ message: "WORKING!!" })
})

const start = async () => {
    try {
        await sequelize.authenticate() //? підключення до бд
        await sequelize.sync()
        app.listen(PORT, () =>
            console.log(` Server start on http://localhost:${PORT}`)
        )
    } catch (error) {
        console.log(error)
    }
}

start()
