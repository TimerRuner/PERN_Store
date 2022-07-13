import React, { useState, useContext } from "react"
import Container from "react-bootstrap/esm/Container"
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/esm/Button"
import Row from "react-bootstrap/Row"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts"
import { registration, login } from "../http/userAPI"
import { observer } from "mobx-react-lite"
import { Context } from ".."

const Auth = observer(() => {
    const { user } = useContext(Context)
    //? в залежності від того на сторінці логіна чи реєстрації ми змінюватимемо відображення
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            //? зберігаємо дані і статус авторизовано
            user.setUser(user)
            user.setIsAuth(true)
            history(SHOP_ROUTE)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? "Login" : "Registration"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter email ..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter password ..."
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Row className="d-flex justify-content-between mt-3 align-items-center">
                        {isLogin ? (
                            <div
                                style={{
                                    display: "inline-block",
                                    width: "50%",
                                }}
                            >
                                No account ?
                                <NavLink to={REGISTRATION_ROUTE}>
                                    {" "}
                                    Register!
                                </NavLink>
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "inline-block",
                                    width: "50%",
                                }}
                            >
                                Is account ?
                                <NavLink to={LOGIN_ROUTE}> Login!</NavLink>
                            </div>
                        )}
                        <Button
                            variant={"outline-success"}
                            style={{ maxWidth: "49%" }}
                            onClick={() => click()}
                        >
                            {isLogin ? "Login" : "Registration"}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth
