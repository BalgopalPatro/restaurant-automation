import React, { useEffect, useState } from "react";
import { Button, Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import axios from 'axios'

const items = [{ name: "Veg Biryani", price: 80, img: "veg-bir.jpg" }, { name: "Veg Special Biryani", price: 100, img: "veg-sp-bir.jpg" },
{ name: "Paneer Biryani", price: 150, img: "pan-bir.jpg" }, { name: "Chicken Dum Biryani", price: 180, img: "chi-bir.jpg" }
]

export default props => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        axios({
            method: "GET",
            url: process.env.REACT_APP_BACKEND+"/order/"
        }).then(response => {
            console.log(response.data)
            setOrders(response.data.orders)
            console.log(orders)
        })
    }, [])

    return (<Container>
        <Row noGutters className="text-center align-items-center pizza-cta">
            <Col>
                <p className="looking-for-pizza">
                    Orders
                </p>
                {orders.map((o) => {
                    return (
                        <Container style={{ border: "2px solid #1f1f1f", padding: "10px" }}>
                            <Row>
                                <Col>
                                    <b>Order Id : {o._id}</b> <br />
                                    {(new Date(o.time)).toLocaleString()}
                                </Col>
                            </Row>
                            <Row >
                                <Col md={6}>
                                    Name : {o.name}
                                </Col>
                                <Col md={6}>
                                    Phone : {o.address.phone}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {o.address.address1} ,<br />
                                    {o.address.address2} ,<br />
                                    {o.address.zip} <br />
                                </Col>
                            </Row>
                            {o.items.map((v, index) => {
                                if (v !== 0) {
                                    var item = items[index]
                                    return (
                                        <Row>
                                            <Col xs="3">
                                                <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }} >
                                                    <img width="100%" src={"/images/" + item.img} alt="Card image cap" height="150" width="150" style={{ borderRadius: "50%" }} />
                                                </div>
                                            </Col>
                                            <Col className="middle-align" >{item.name} <br /> Qty : {v}</Col>
                                            <Col className="middle-align" xs="3"> ₹{item.price * v}</Col>
                                        </Row>
                                    )
                                }
                            })}
                            <Row style={{ background: "black", color: "white", padding: 5, margin: "10px 0px" }} >
                                <Col className="middle-align" xs={3} >Actions</Col>
                                <Col className="middle-align" xs={3}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" />{' '}
                                            Prepared
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col className="middle-align" xs={3}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" />{' '}
                                            Delivered
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col xs={3}>
                                    <Button>Update</Button>
                                </Col>
                            </Row>
                        </Container>
                    )
                })}
            </Col>
        </Row>
    </Container>)
}

// address:
// address1: "535 Terry Ave N"
// address2: "Newbus Stand"
// zip: "98109"
// __proto__: Object
// delevered: false
// items: (4) [0, 2, 0, 0]
// name: "John Doe"
// prepared: false
// user: {_id: "6065e1d60e9b154b3826e28f", name: "N Balgopal Patro", email: "n.balgopalpatra@gmail.com", password: "needzz", __v: 0}
// __v: 0
// _id: "60660f34a784ec504088283a"