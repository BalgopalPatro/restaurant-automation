import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import eventEmitter from "../eventEmitter";

export default props => {

    const [user, setUser] = useState({ email: "", password: "" })

    const checkAuth = () => {
        var user = localStorage.getItem("user")
        if (user) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        if (checkAuth()) { props.setPage(1) }
    }, [])

    const login = async () => {
        let res = await fetch(process.env.REACT_APP_BACKEND+"/admin/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...user
            })
        });
        res = await res.json();
        console.log(res);
        if (res.status === "error") {
            alert(res.msg)
        }
        else if (res.status === "done") {
            console.log(JSON.stringify(res.user))
            window.localStorage.setItem("user", JSON.stringify(res.user))
            eventEmitter.emit("authchange", res.user.name)
            props.setPage(1);
        }
    }

    return (
        <div>
            <Row noGutters className="text-center align-items-center pizza-cta">
                <Col>
                    <p className="looking-for-pizza">
                        Login
                    </p>
                    <Form className="form">
                        <Container>
                            <Col lg={{ size: 6, offset: 3 }}  >
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="myemail@email.com"
                                        value={user.email}
                                        onChange={(e) => {
                                            setUser({ ...user, email: e.target.value })
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={{ size: 6, offset: 3 }}  >
                                <FormGroup>
                                    <Label for="examplePassword">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="********"
                                        value={user.password}
                                        onChange={(e) => {
                                            setUser({ ...user, password: e.target.value })
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Button onClick={login} > Sign In</Button>
                        </Container>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};
