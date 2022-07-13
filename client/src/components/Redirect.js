import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Redirect(props) {
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/")
    }, [])
    return <div></div>
}

export default Redirect
