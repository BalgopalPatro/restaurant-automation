import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Container, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row } from "reactstrap";

const items = [{ name: "Veg Biryani", price: 80, img: "veg-bir.jpg" }, { name: "Veg Special Biryani", price: 100, img: "veg-sp-bir.jpg" },
{ name: "Paneer Biryani", price: 150, img: "pan-bir.jpg" }, { name: "Chicken Dum Biryani", price: 180, img: "chi-bir.jpg" }
]

export default (props) => {
    const [select, setSelect] = useState(false)
    const [selectedQuantity, setSelectedQuantity] = useState([0, 0, 0, 0])

    const [address, setAddres] = useState({
        name: "",
        phone: "",
        address1: "",
        address2: "",
        zip: ""
    })

    useEffect(() => {
        var user = JSON.parse(localStorage.getItem("user"))
        setAddres({ ...address, name: user.name })
    }, [])

    const update = (value, index) => {
        setSelectedQuantity((old) => {
            old[index] = parseInt(value)
            return old;
        })
        console.log(selectedQuantity)
    }

    const cartValue = () => {
        var sum = 0;
        selectedQuantity.forEach((v, index) => {
            sum += v * items[index].price;
        })
        return sum
    }

    const placeOrder = async () => {
        if ((address.address1 || 0) && (address.address2 || 0) && (address.phone || 0) && (address.name || 0) && (address.zip)) {
            let res = await fetch(process.env.REACT_APP_BACKEND+"/order/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: address.name,
                    user: JSON.parse(localStorage.getItem("user")),
                    items: selectedQuantity,
                    address: {
                        address1: address.address1,
                        address2: address.address2,
                        zip: address.zip,
                        phone: address.phone
                    },
                    prepared: false,
                    delevered: false
                })
            });
            res = await res.json();
            console.log(res)
            if (res.status === "done") {
                props.setPage(2)
            } else {
                alert(res.msg)
            }
        } else {
            alert("Please enter all the details")
        }
    }

    return (
        <div>
            <Row noGutters className="text-center align-items-center pizza-cta">
                <Col>
                    <p className="looking-for-pizza">
                        {(select) ? "Confirm Order" : "Order Online"}
                        <i
                            className={(select) ? "fas fa-clipboard-check pizza-slice" : "fa fa-shopping-bag pizza-slice"}
                        >
                        </i>
                    </p>
                </Col>
            </Row>
            {(select) ?
                <div>
                    <Container>
                        <Row >
                            <Button
                                color="none"
                                className="book-table-btn"
                                onClick={_ => {
                                    console.log(selectedQuantity)
                                    setSelect(false)
                                }}
                            > <i class="fa fa-arrow-left" aria-hidden="true"></i> Edit Items</Button>
                        </Row>
                        <Row style={{ fontSize: "150%" }} >
                            <Col xs="3">
                            </Col>
                            <Col ><b>Item Name</b></Col>
                            <Col xs="3"> <b> Price</b></Col>
                        </Row>
                        <br />
                        {selectedQuantity.map((v, index) => {
                            if (v !== 0) {
                                var item = items[index]
                                return (
                                    <Row>
                                        <Col xs="3">
                                            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }} >
                                                <img width="100%" src={"/images/" + item.img} alt="Card image cap" height="150" width="150" style={{ borderRadius: "50%" }} />
                                            </div>
                                        </Col>
                                        <Col >{item.name} <br /> Qty : {v}</Col>
                                        <Col xs="3"> ₹{item.price * v}</Col>
                                    </Row>
                                )
                            }
                        })}
                        <Row style={{ fontSize: "150%" }} >
                            <Col xs="3"> </Col>
                            <Col style={{ textAlign: "end" }} ><b>Total : </b></Col>
                            <Col xs="3"><b>₹{cartValue()}</b></Col>
                        </Row>
                        <Row >
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleEmail">Name</Label>
                                    <Input name="name"
                                        placeholder="N Balgopal"
                                        value={address.name}
                                        onChange={(e) => {
                                            setAddres({ ...address, name: e.target.value })
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleEmail">Phone</Label>
                                    <Input type="tel" name="email" id="exampleEmail" placeholder="9178922476"
                                        value={address.phone}
                                        onChange={(e) => {
                                            setAddres({ ...address, phone: e.target.value })
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="exampleAddress">Address</Label>
                            <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St"
                                value={address.address1}
                                onChange={(e) => {
                                    setAddres({ ...address, address1: e.target.value })
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleAddress2">Address 2</Label>
                            <Input type="text" name="address2" id="exampleAddress2"
                                value={address.address2}
                                onChange={(e) => {
                                    setAddres({ ...address, address2: e.target.value })
                                }}

                                placeholder="Apartment, studio, or floor" />
                        </FormGroup>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleCity">City</Label>
                                    <Input type="text" name="city" id="exampleCity" value="Sambalur" disabled={true} />
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label for="exampleZip">Zip</Label>
                                    <Input type="text" name="zip" id="exampleZip"
                                        value={address.zip}
                                        onChange={(e) => {
                                            setAddres({ ...address, zip: e.target.value })
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row style={{ display: "flex", flexDirection: "column-reverse" }} >
                            <Button
                                color="none"
                                className="book-table-btn"
                                onClick={_ => {
                                    placeOrder()
                                }}
                            >Place Order</Button>
                        </Row>
                    </Container>
                </div>
                :
                <div id="reservation-stuff">
                    <Row noGutters className="text-center align-items-center">
                        {items.map((item, index) => {
                            return (<Col xs="12" sm="3">
                                <Card>
                                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }} >
                                        <img width="100%" src={"/images/" + item.img} alt="Card image cap" height="200" width="200" />
                                    </div>
                                    <CardBody>
                                        <CardTitle tag="h5">{item.name}</CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">{item.price}</CardSubtitle>
                                        <CardText>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">Quantity</InputGroupAddon>
                                                <Input
                                                    placeholder="0" min={0} max={100} type="number" step="1"
                                                    defaultValue={selectedQuantity[index]}
                                                    onChange={(e) => update(e.target.value, index)}
                                                />
                                                {/* <InputGroupAddon addonType="append">.00</InputGroupAddon> */}
                                            </InputGroup>
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </Col>)
                        })}
                    </Row>
                    <Row style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px" }} >
                        <Button
                            color="none"
                            className="book-table-btn"
                            onClick={_ => {
                                if (selectedQuantity.reduce((total, num) => total + num) === 0) {
                                    alert("Please add some items")
                                } else {
                                    console.log(selectedQuantity)
                                    setSelect(true)
                                }

                            }}
                        >Proceed <i class="fa fa-arrow-right" aria-hidden="true"></i> </Button>
                    </Row>
                </div>
            }
        </div>

    )
}