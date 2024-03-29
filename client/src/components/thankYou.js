import React from "react";
import { Row, Col } from "reactstrap";

export default _ => {
  return (
    <div>
      <Row noGutters className="text-center">
        <Col>
          <p className="thanks-header">Thank You!</p>
          <p className="thanks-subtext">
            You should receive an email with the details .
          </p>
        </Col>
      </Row>
    </div>
  );
};
