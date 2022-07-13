import axios from "axios"

//? для звичайних запиті, що не потребують авторизації
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

//? для цих запитів, кожного разу підставлятиметься header authorization з токеном
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

//? інтерсептор для відправки запитів із вшитим в хедер токеном
const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
    return config
}
$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }
