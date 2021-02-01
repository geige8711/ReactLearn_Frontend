import React, { useState } from "react";
import "./footer.css";
import { Form, Button, Row, InputGroup, ListGroup } from "react-bootstrap";

const Footer = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [toggleClass1, setToggleClass1] = useState(
    "col-12 w-100 pl-3 d-none d-lg-block"
  );

  const [toggleClass2, setToggleClass2] = useState(
    "col-12 w-100 pl-3 d-none d-lg-block"
  );

  const [toggleClass3, setToggleClass3] = useState(
    "col-12 w-100 pl-3 d-none d-lg-block"
  );

  const submitHandler = (e) => {
    e.preventDefault();
  };
  const expandHandler1 = () => {
    if (window.innerWidth < 992) {
      if (toggleClass1.indexOf("d-none") !== -1) {
        setToggleClass1(toggleClass1.replace("d-none", "d-block"));
        setIsOpen1(true);
      } else if (toggleClass1.indexOf("d-block") !== -1) {
        setToggleClass1(toggleClass1.replace("d-block", "d-none"));
        setIsOpen1(false);
      }
    }
  };

  const expandHandler2 = () => {
    if (window.innerWidth < 992) {
      if (toggleClass2.indexOf("d-none") !== -1) {
        setToggleClass2(toggleClass2.replace("d-none", "d-block"));
        setIsOpen2(true);
      } else if (toggleClass2.indexOf("d-block") !== -1) {
        setToggleClass2(toggleClass2.replace("d-block", "d-none"));
        setIsOpen2(false);
      }
    }
  };

  const expandHandler3 = () => {
    if (window.innerWidth < 992) {
      if (toggleClass3.indexOf("d-none") !== -1) {
        setToggleClass3(toggleClass3.replace("d-none", "d-block"));
        setIsOpen3(true);
      } else if (toggleClass3.indexOf("d-block") !== -1) {
        setToggleClass3(toggleClass3.replace("d-block", "d-none"));
        setIsOpen3(false);
      }
    }
  };

  return (
    <footer className="footer bg-dark pt-3 pt-lg-5">
      <div className="container-lg">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-5">
            <div className="footer-section">Add some sparkle to your inbox</div>
            <Form onSubmit={submitHandler} className="mt-3">
              <Form.Group controlId="formHorizontalEmail">
                <InputGroup className="align-items-center">
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={(e) => {}}
                    placeholder="Your Email Address"
                    className="border"
                  ></Form.Control>
                  <InputGroup.Append>
                    <Button
                      type="submit"
                      variant="outline-success"
                      className="text-nowrap"
                    >
                      Sign Up
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
            </Form>
            <div className="footer-section mt-5">Follow us</div>
            <div className="my-2 d-flex flex-wrap">
              <a
                href="/"
                className="footer-icon mt-2 mr-4 rounded-circle border px-3 py-2"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="/"
                className="footer-icon mt-2 mr-4 rounded-circle border px-3 py-2"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="/"
                className="footer-icon mt-2 mr-4 rounded-circle border px-3 py-2"
              >
                <i className="fab fa-google-plus"></i>
              </a>
              <a
                href="/"
                className="footer-icon mt-2 mr-4 rounded-circle border px-3 py-2"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="/"
                className="footer-icon mt-2 rounded-circle border px-3 py-2"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
            <div className="mt-aut0">
              <Button
                type="button"
                variant="outline-primary"
                block
                className="my-5 d-lg-inline-block"
              >
                Give us feedback
              </Button>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-7 px-0">
            <div className="row justify-content-end">
              <div className="col-lg-3">
                <h5
                  className="py-4 py-lg-0 px-2 px-lg-0 footer-title clearfix"
                  onClick={expandHandler1}
                >
                  MICHAEL HILL
                  <i
                    className={`fas fa-chevron-down float-right d-lg-none ${
                      isOpen1 ? "open" : ""
                    }`}
                  ></i>
                </h5>
                <Row>
                  <ListGroup className={`${toggleClass1}`}>
                    <ListGroup.Item className="px-0 pt-1 footer-item bg-dark">
                      About Us
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0 footer-item bg-dark">
                      Store Locator
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0 footer-item bg-dark">
                      Careers
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0 footer-item bg-dark">
                      Investor Centre
                    </ListGroup.Item>
                    <ListGroup.Item className=" px-0 footer-item bg-dark">
                      Responsible Jewellery Council Policy
                    </ListGroup.Item>
                  </ListGroup>
                </Row>
              </div>
              <div className="col-12 col-md-12 col-lg-3">
                <h5
                  className="py-4 py-lg-0 px-2 px-lg-0 footer-title clearfix"
                  onClick={expandHandler2}
                >
                  MICHAEL HILL
                  <i
                    className={`fas fa-chevron-down float-right d-lg-none ${
                      isOpen2 ? "open" : ""
                    }`}
                  ></i>
                </h5>
                <Row>
                  <ListGroup className={`${toggleClass2}`}>
                    <ListGroup.Item className="px-0 pt-1 footer-item bg-dark">
                      About Us
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0 footer-item bg-dark">
                      Store Locator
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0 footer-item bg-dark">
                      Careers
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0 footer-item bg-dark">
                      Investor Centre
                    </ListGroup.Item>
                    <ListGroup.Item className=" px-0 footer-item bg-dark">
                      Responsible Jewellery Council Policy
                    </ListGroup.Item>
                  </ListGroup>
                </Row>
              </div>{" "}
              <div className="col-lg-3">
                <h5
                  className="py-4 py-lg-0 px-2 px-lg-0 footer-title clearfix"
                  onClick={expandHandler3}
                >
                  MICHAEL HILL
                  <i
                    className={`fas fa-chevron-down float-right d-lg-none ${
                      isOpen3 ? "open" : ""
                    }`}
                  ></i>
                </h5>
                <Row>
                  <ListGroup className={`${toggleClass3}`}>
                    <ListGroup.Item className="px-0 pt-1 footer-item bg-dark">
                      About Us
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0 footer-item bg-dark">
                      Store Locator
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0 footer-item bg-dark">
                      Careers
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0 footer-item bg-dark">
                      Investor Centre
                    </ListGroup.Item>
                    <ListGroup.Item className=" px-0 footer-item bg-dark">
                      Responsible Jewellery Council Policy
                    </ListGroup.Item>
                  </ListGroup>
                </Row>
              </div>
            </div>
          </div>
          <div className="footer-bottom pt-2 pb-3">
            <Row className="m-0 p-0">
              <div className="col-md-8 footer-desc">
                <Row className="justify-content-start my-2 mx-auto">
                  <img
                    src="images/paypal.png"
                    alt=""
                    className="payment-pic mr-1 mt-1"
                  />
                  <img
                    src="images/paypal.png"
                    alt=""
                    className="payment-pic mr-1 mt-1"
                  />
                  <img
                    src="images/paypal.png"
                    alt=""
                    className="payment-pic mr-1 mt-1"
                  />
                  <img
                    src="images/paypal.png"
                    alt=""
                    className="payment-pic mr-1 mt-1"
                  />
                  <img
                    src="images/paypal.png"
                    alt=""
                    className="payment-pic mr-1 mt-1"
                  />
                  <img
                    src="images/paypal.png"
                    alt=""
                    className="payment-pic mr-1 mt-1"
                  />
                  <img
                    src="images/paypal.png"
                    alt=""
                    className="payment-pic mr-1 mt-1"
                  />
                  <img
                    src="images/paypal.png"
                    alt=""
                    className="payment-pic mr-1 mt-1"
                  />
                  <img
                    src="images/paypal.png"
                    alt=""
                    className="payment-pic mr-1 mt-1"
                  />
                  <img
                    src="images/paypal.png"
                    alt=""
                    className="payment-pic mr-1 mt-1"
                  />
                  <img
                    src="images/paypal.png"
                    alt=""
                    className="payment-pic mr-1 mt-1"
                  />
                  <img
                    src="images/paypal.png"
                    alt=""
                    className="payment-pic mr-1 mt-1"
                  />
                </Row>
                <p>
                  Our Price and Quality Commitment. All discounts quoted are off
                  the list price for that product. Products are likely to have
                  sold below the list price in stores prior to the discount
                  offer because we pride ourselves on always being competitive.
                </p>
              </div>
              <div className="col-md-4 footer-desc mt-auto">
                <div className="text-center text-lg-right text-xl-right my-2">
                  <img src="images/Norton.png" alt="" className="norton-img" />
                </div>

                <p className="pd-1 text-center text-lg-right text-xl-right">
                  Copyright © 1995-2020 Michael Hill All rights reserved.
                </p>
                <p className="text-center text-lg-right text-xl-right">
                  Michael Hill Australia Michael Hill New Zealand Michael Hill
                  Canada
                </p>
              </div>
            </Row>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
