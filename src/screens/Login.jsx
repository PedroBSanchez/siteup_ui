import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

import "./Login.css";

import Loading from "../components/Loading";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [newEmail, setNewEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const login = async () => {
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/user/login`,
      data: {
        email: email,
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        console.log(response);
        setLoading(false);
        localStorage.clear();
        localStorage.setItem("tokenApi", response.data.token);
        localStorage.setItem("userEmail", response.data.user.email);
        localStorage.setItem("userCreatedAt", response.data.user.created_at);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        Swal.fire({
          title: error.response.data.error ?? "Error",
          icon: "error",
        });
      });
  };

  const signUp = async () => {
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/user/signup`,
      data: {
        email: newEmail,
        password: newPassword,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        console.log(response);
        setLoading(false);
        handleClose();
        Swal.fire({
          title: "User successfully registered",
          icon: "success",
        });
        setNewEmail("");
        setNewPassword("");
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoading(true);
        Swal.fire({
          title: error.response.data.error ?? "Error",
          icon: "error",
        });
      });
  };

  return (
    <>
      <Loading loading={loading} />
      <div className="container-fluid login-background">
        <div className="position-absolute top-50 start-50 translate-middle login-card p-4 col-4">
          <div className="row">
            <div className="col">
              <div className="form-control-input">
                <input required onChange={(e) => setEmail(e.target.value)} />
                <label>
                  <span style={{ transitionDelay: "0ms" }}>E</span>
                  <span style={{ transitionDelay: "50ms" }}>m</span>
                  <span style={{ transitionDelay: "100ms" }}>a</span>
                  <span style={{ transitionDelay: "150ms" }}>i</span>
                  <span style={{ transitionDelay: "200ms" }}>l</span>
                </label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-control-input">
                <input
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>
                  <span style={{ transitionDelay: "0ms" }}>P</span>
                  <span style={{ transitionDelay: "25ms" }}>a</span>
                  <span style={{ transitionDelay: "100ms" }}>s</span>
                  <span style={{ transitionDelay: "125ms" }}>s</span>
                  <span style={{ transitionDelay: "150ms" }}>w</span>
                  <span style={{ transitionDelay: "175ms" }}>o</span>
                  <span style={{ transitionDelay: "200ms" }}>r</span>
                  <span style={{ transitionDelay: "225ms" }}>d</span>
                </label>
              </div>
            </div>
          </div>

          <div className="row text-end">
            <div className="col">
              <a
                style={{ color: "white", cursor: "pointer" }}
                onClick={handleShow}
              >
                <u>Sing up</u>
              </a>
            </div>
          </div>

          <div className="row mt-4 justify-content-center">
            <div className="col">
              <button
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={login}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col">
              <label>Email:</label>
              <input
                className="form-control"
                type="email"
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <label>Password:</label>
              <input
                className="form-control"
                type="email"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-success" onClick={signUp}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
