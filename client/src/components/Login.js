import React, { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import emitter from '../eventEmitter';

export default props => {

    const [user, setUser] = useState({ name: "", email: "", password: "" })

    const signup = async () => {
        let res = await fetch(process.env.REACT_APP_BACKEND+"/user/signup", {
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
            emitter.emit("authchange", res.user.name)
            props.setPage(0);
        }
    }

    const login = async () => {
        let res = await fetch(process.env.REACT_APP_BACKEND+"/user/signin", {
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
            emitter.emit("authchange", res.user.name)
            props.setPage(0);
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Sign In</h2>
                    <Form className="form">
                        <Col>
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
                        <Col>
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
                    </Form>
                </Col>
                <Col>
                    <h2>Sign UP</h2>
                    <Form className="form">
                        <Col>
                            <FormGroup>
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="N Balgopal"
                                    value={user.name}
                                    onChange={(e) => {
                                        setUser({ ...user, name: e.target.value })
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
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
                        <Col>
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
                        <Button onClick={signup} >Sign Up</Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    )
}