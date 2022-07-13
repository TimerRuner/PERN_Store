import React, { useContext, useEffect } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TypeBar from "../components/TypeBar"
import BrandBar from "../components/BrandBar"
import DeviceList from "../components/DeviceList"
import { observer } from "mobx-react-lite"
import { Context } from ".."
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI"
import Pages from "../components/Pages"

const Shop = observer(() => {
    const { device } = useContext(Context)

    //? отримуємо всі дані для розмітки магазину
    useEffect(() => {
        fetchTypes().then((data) => device.setTypes(data)) //? отримуємо типип і передаємо в стору
        fetchBrands().then((data) => device.setBrands(data))
        fetchDevices(null, null, 1, 2).then((data) => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count) //? записуємо к-сть товарів, які ми отримуємо в даній категорії
        })
    }, [])

    useEffect(() => {
        fetchDevices(
            device.selectedType.id,
            device.selectedBrand.id,
            device.page,
            2
        ).then((data) => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count) //? записуємо к-сть товарів, які ми отримуємо в даній категорії
        })
    }, [device.page, device.selectedBrand, device.selectedType])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    )
})

export default Shop
