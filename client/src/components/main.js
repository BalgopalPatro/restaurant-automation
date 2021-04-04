import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "reactstrap";
import eventEmitter from "../eventEmitter";

export default props => {

  const checkAuth = () => {
    var user = localStorage.getItem("user")
    if (user) {
      return true
    } else {
      return false
    }
  }

  return (
    <div>
      <Row noGutters className="text-center align-items-center pizza-cta">
        <Col>
          <p className="looking-for-pizza">
            If you're looking for delicious food
            <i className="fas fa-hamburger pizza-slice"></i>
          </p>
          <Button
            color="none"
            className="book-table-btn"
            onClick={_ => {
              if (checkAuth()) {
                props.setPage(1);
              } else {
                alert("Please Login first")
              }
            }}
          >
            Book a Table
          </Button>
          <br />
          <Button
            color="none"
            className="book-table-btn"
            onClick={_ => {
              if (checkAuth()) {
                props.setPage(3);
              } else {
                alert("Please Login first")
              }
            }}
          >
            Online Order
          </Button>
        </Col>
      </Row>
      <Row noGutters className="text-center big-img-container">
        <Col>
          <img
            src="/images/cafe.jpg"
            alt="cafe"
            className="big-img"
          />
        </Col>
      </Row>
    </div>
  );
};
