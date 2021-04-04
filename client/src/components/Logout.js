import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import eventEmitter from "../eventEmitter";


export default props => {
    return (
        <Row noGutters className="text-center align-items-center pizza-cta">
            <Col>
                <p className="looking-for-pizza">
                    Hey {JSON.parse(localStorage.getItem("user")).name}
                </p> <br />
                <Button
                    color="none"
                    className="book-table-btn"
                    onClick={_ => {
                        localStorage.removeItem("user")
                        eventEmitter.emit("authchange", "logout")
                        props.setPage(0)
                    }}
                >Logout</Button>
            </Col>
        </Row>
    )
}