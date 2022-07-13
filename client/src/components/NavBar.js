import React, { useContext } from "react"
import { Context } from ".."
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import { NavLink } from "react-router-dom"
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"

const NavBar = observer((props) => {
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
                    BuyDevice
                </NavLink>
                {user.isAuth ? (
                    <Nav className="ml-auto" style={{ color: "white" }}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Admin panel
                        </Button>
                        <Button
                            variant={"outline-light"}
                            style={{ marginLeft: "10px" }}
                            onClick={() => logOut()}
                        >
                            Logout
                        </Button>
                    </Nav>
                ) : (
                    <Nav className="ml-auto" style={{ color: "white" }}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Authorization
                        </Button>
                    </Nav>
                )}
            </Container>
        </Navbar>
    )
})

export default NavBar
