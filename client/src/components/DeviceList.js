import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import { Context } from ".."
import Row from "react-bootstrap/esm/Row"
import DeviceItem from "./DeviceItem"

const DeviceList = observer((props) => {
    const { device } = useContext(Context)
    return (
        <Row className="d-flex">
            {device.devices.map((device) => (
                <DeviceItem key={device.id} device={device} />
            ))}
        </Row>
    )
})

export default DeviceList
