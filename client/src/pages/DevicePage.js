import React, { useContext, useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container"
import Col from "react-bootstrap/esm/Col"
import Image from "react-bootstrap/esm/Image"
import Row from "react-bootstrap/esm/Row"
import bigStar from "../assets/starBig.png"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { useParams } from "react-router-dom"
import { fetchOneDevice } from "../http/deviceAPI"

const DevicePage = (props) => {
    const [device, setDevice] = useState({ info: [] })
    const { id } = useParams()

    useEffect(() => {
        fetchOneDevice(id).then((data) => setDevice(data))
    }, [])

    return (
        <Container>
            <Row className="mt-3">
                <Col md={4}>
                    <Image
                        width={300}
                        height={300}
                        src={process.env.REACT_APP_API_URL + device.img}
                    />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2 className="text-center">{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                background: `url(${bigStar}) no-repeat center center`,
                                width: 240,
                                height: 240,
                                backgroundSize: "cover",
                                fontSize: 64,
                            }}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{
                            width: 300,
                            height: 300,
                            fontSize: 32,
                            border: "5px solid lightgray",
                        }}
                    >
                        <h3>{device.price}</h3>
                        <Button variant={"outline-dark"}>Add to Basket</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Characters</h1>
                {device.info.map((info, index) => (
                    <Row
                        key={info.id}
                        style={{
                            background:
                                index % 2 === 0 ? "lightgray" : "transparent",
                            padding: 10,
                        }}
                    >
                        {info.title}: {info.description}
                    </Row>
                ))}
            </Row>
        </Container>
    )
}

export default DevicePage
