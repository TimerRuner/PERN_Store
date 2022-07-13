import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import { Context } from ".."
import Row from "react-bootstrap/esm/Row"
import Card from "react-bootstrap/Card"

const BrandBar = observer((props) => {
    const { device } = useContext(Context)
    return (
        <Row className="d-flex">
            {device.brands.map((brand) => (
                <Card
                    key={brand.id}
                    className="p-3"
                    style={{ width: "initial", cursor: "pointer" }}
                    onClick={() => device.setSelectedBrand(brand)}
                    border={
                        brand.id === device.selectedBrand.id
                            ? "danger"
                            : "light"
                    }
                >
                    {brand.name}
                </Card>
            ))}
        </Row>
    )
})

export default BrandBar
