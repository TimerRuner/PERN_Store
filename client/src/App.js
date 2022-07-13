import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { BrowserRouter } from "react-router-dom"
import { Context } from "."
import AppRouter from "./components/AppRouter"
import NavBar from "./components/NavBar"
import { check } from "./http/userAPI"
import Spiner from "react-bootstrap/Spinner"

const App = observer(() => {
    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true)

    //? спрацює в момент перезагрузки і перевірить чи ми наразі залогінені і чи з токеном все ок
    useEffect(() => {
        setTimeout(() => {
            check()
                .then((data) => {
                    user.setUser(true)
                    user.setIsAuth(true)
                })
                .finally(() => setLoading(false))
        }, 1000)
    }, [])

    if (loading) {
        return <Spiner animation="grow" />
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    )
})

export default App
