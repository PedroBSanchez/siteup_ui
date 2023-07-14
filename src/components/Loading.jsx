import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import "./Loading.css";

const Loading = ({ loading }) => {
  return (
    <Modal show={loading} centered backdrop="static" keyboard={false}>
      <Modal.Body>
        <div className="row text-center justify-content-center p-3">
          <div className="col-3">
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="row text-center mt-1">
          <div className="col">
            <p>Loading...</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Loading;
