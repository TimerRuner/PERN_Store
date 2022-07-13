import React, { useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/Form"
import { createBrand } from "../../http/deviceAPI"

const CreateBrand = ({ show, onHide }) => {
    const [value, setValue] = useState("")
    const addBrand = () => {
        createBrand({ name: value }).then((data) => {
            setValue("")
            onHide()
        })
    }
    return (
        <Modal size="lg" centered show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New Brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Enter type of device"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Close
                </Button>
                <Button variant="outline-success" onClick={addBrand}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateBrand
