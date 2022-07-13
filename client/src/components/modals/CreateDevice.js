import React, { useContext, useState, useEffect } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/Form"
import Dropdown from "react-bootstrap/Dropdown"
import Row from "react-bootstrap/esm/Row"
import { Context } from "../../"
import Col from "react-bootstrap/esm/Col"
import {
    createDevice,
    fetchBrands,
    fetchDevices,
    fetchTypes,
} from "../../http/deviceAPI"
import { observer } from "mobx-react-lite"

const CreateDevice = observer(({ show, onHide }) => {
    const { device } = useContext(Context)

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then((data) => device.setTypes(data)) //? отримуємо типип і передаємо в стору
        fetchBrands().then((data) => device.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, { title: "", description: "", number: Date.now() }])
    }
    const removeInfo = (number) => {
        setInfo(info.filter((i) => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(
            info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
        )
    }

    //? функція для обробки картинок доданих з компютера
    const selectFile = (e) => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("price", `${price}`)
        formData.append("img", file)
        formData.append("barndId", device.selectedBrand.id)
        formData.append("typeId", device.selectedType.id)
        formData.append("info", JSON.stringify(info))
        createDevice(formData).then((data) => onHide())
    }

    return (
        <Modal size="lg" centered show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New Device
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>
                            {device.selectedType.name || "Chose type"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map((type) => (
                                <Dropdown.Item
                                    key={type.id}
                                    onClick={() => device.setSelectedType(type)}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>
                            {device.selectedBrand.name || "Chose brand"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map((brand) => (
                                <Dropdown.Item
                                    key={brand.id}
                                    onClick={() =>
                                        device.setSelectedBrand(brand)
                                    }
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        placeholder="Name device"
                        className="mt-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control
                        placeholder="Price device"
                        className="mt-3"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr />
                    <Button variant="outline-dark" onClick={addInfo}>
                        Add new property
                    </Button>
                    {info.map((i) => (
                        <Row className="mt-2" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    placeholder="Add title"
                                    value={i.title}
                                    onChange={(e) =>
                                        changeInfo(
                                            "title",
                                            e.target.value,
                                            i.number
                                        )
                                    }
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    placeholder="Add description"
                                    value={i.description}
                                    onChange={(e) =>
                                        changeInfo(
                                            "description",
                                            e.target.value,
                                            i.number
                                        )
                                    }
                                />
                            </Col>
                            <Col md={4} onClick={(e) => removeInfo(i.number)}>
                                <Button variant="outline-danger">Delete</Button>
                            </Col>
                        </Row>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Close
                </Button>
                <Button variant="outline-success" onClick={addDevice}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateDevice
