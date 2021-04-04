import React, { useEffect, useState } from "react";
import { Button, Navbar, NavbarBrand, NavbarText } from "reactstrap";
import eventEmitter from "../eventEmitter";

export default props => {

  const [label, setLabel] = useState("Login/Sign Up");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    var user = localStorage.getItem("user")
    if (user) {
      setLabel(JSON.parse(user).name)
      setLoggedIn(true)
    }
  })

  useEffect(() => {
    eventEmitter.on("authchange", (name) => {
      if (name === "logout") {
        setLabel("Login/Sign Up")
        setLoggedIn(false)
      } else {
        setLabel(name)
        setLoggedIn(true)
      }
    })
  }, [])

  return (
    <div>
      <Navbar color="light" light>
        <NavbarBrand
          className="nav-brand"
          onClick={_ => {
            props.setPage(0);
          }}
        >
          Demon Restaurant
        </NavbarBrand>
        <Button
          color="none"
          className="book-table-btn"
          onClick={_ => {
            (loggedIn) ?
              props.setPage(5) : props.setPage(4)
          }}
        > <i class="fa fa-user" aria-hidden="true"></i> {label}</Button>
      </Navbar>
    </div>
  );
};
