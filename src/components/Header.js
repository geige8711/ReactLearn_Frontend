import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  Row,
  ListGroup,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import SearchBox from "./SearchBox";
import "./header.css";
import { OPEN_SUBMENU, CLOSE_SUBMENU } from "../constants/submenuConstants";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [isOpen1, setIsOpen1] = useState(false);
  const [toggleAvatarMenu, setToggleAvatarMenu] = useState(false);
  const [toggleClass1, setToggleClass1] = useState(
    "mt-2 col-12 w-100 pl-3 d-none"
  );

  const expandHandler1 = () => {
    if (toggleClass1.indexOf("d-none") !== -1) {
      setToggleClass1(toggleClass1.replace("d-none", "d-block"));
      setIsOpen1(true);
    } else if (toggleClass1.indexOf("d-block") !== -1) {
      setToggleClass1(toggleClass1.replace("d-block", "d-none"));
      setIsOpen1(false);
    }
  };

  const [isOpen2, setIsOpen2] = useState(false);
  const [toggleClass2, setToggleClass2] = useState(
    "mt-2 col-12 w-100 pl-3 d-none"
  );

  const expandHandler2 = () => {
    if (toggleClass2.indexOf("d-none") !== -1) {
      setToggleClass2(toggleClass2.replace("d-none", "d-block"));
      setIsOpen2(true);
    } else if (toggleClass2.indexOf("d-block") !== -1) {
      setToggleClass2(toggleClass2.replace("d-block", "d-none"));
      setIsOpen2(false);
    }
  };

  const [isOpen3, setIsOpen3] = useState(false);
  const [toggleClass3, setToggleClass3] = useState(
    "mt-2 col-12 w-100 pl-3 d-none"
  );

  const expandHandler3 = () => {
    if (toggleClass3.indexOf("d-none") !== -1) {
      setToggleClass3(toggleClass3.replace("d-none", "d-block"));
      setIsOpen3(true);
    } else if (toggleClass3.indexOf("d-block") !== -1) {
      setToggleClass3(toggleClass3.replace("d-block", "d-none"));
      setIsOpen3(false);
    }
  };

  const [isOpen4, setIsOpen4] = useState(false);
  const [toggleClass4, setToggleClass4] = useState(
    "mt-2 col-12 w-100 pl-3 d-none"
  );

  const expandHandler4 = () => {
    if (toggleClass4.indexOf("d-none") !== -1) {
      setToggleClass4(toggleClass4.replace("d-none", "d-block"));
      setIsOpen4(true);
    } else if (toggleClass4.indexOf("d-block") !== -1) {
      setToggleClass4(toggleClass4.replace("d-block", "d-none"));
      setIsOpen4(false);
    }
  };

  const [isOpen5, setIsOpen5] = useState(false);
  const [toggleClass5, setToggleClass5] = useState(
    "mt-2 col-12 w-100 pl-3 d-none"
  );

  const expandHandler5 = () => {
    if (toggleClass5.indexOf("d-none") !== -1) {
      setToggleClass5(toggleClass5.replace("d-none", "d-block"));
      setIsOpen5(true);
    } else if (toggleClass5.indexOf("d-block") !== -1) {
      setToggleClass5(toggleClass5.replace("d-block", "d-none"));
      setIsOpen5(false);
    }
  };

  const displaySubmenu = (e) => {
    const page = e.target.textContent;
    const tempBtn = e.target.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;
    dispatch({
      type: OPEN_SUBMENU,
      payload: { text: page, coordinates: { center, bottom } },
    });
  };
  const handleSubmenu = (e) => {
    if (!e.target.classList.contains("link-btn")) {
      dispatch({ type: CLOSE_SUBMENU });
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="xl"
        collapseOnSelect
        onMouseOver={handleSubmenu}
      >
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>Proshop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto d-none d-xl-block d-xl-flex">
              <LinkContainer to="/">
                <Nav.Link className="link-btn" onMouseOver={displaySubmenu}>
                  Home
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link className="link-btn" onMouseOver={displaySubmenu}>
                  Dresses
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link className="link-btn" onMouseOver={displaySubmenu}>
                  Clothing
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link className="link-btn" onMouseOver={displaySubmenu}>
                  Shoes
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link className="link-btn" onMouseOver={displaySubmenu}>
                  Accessories
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="d-block d-xl-none d-flex flex-column small-screen-nav">
              {/* Home Section Start*/}
              <h5
                className="py-lg-0 px-2 px-lg-0 clearfix d-flex align-items-center header-title "
                onClick={expandHandler1}
              >
                <span className="py-4 d-block mt-2">Home</span>
                <i
                  className={`fas fa-chevron-down d-block ml-auto ${
                    isOpen1 ? "open" : ""
                  }`}
                ></i>
              </h5>
              <Row>
                <ListGroup className={`${toggleClass1}`}>
                  <ListGroup.Item className="px-0 pt-1 header-item bg-dark">
                    About Us
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 header-item bg-dark">
                    Store Locator
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 header-item bg-dark">
                    Careers
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 header-item bg-dark">
                    Investor Centre
                  </ListGroup.Item>
                  <ListGroup.Item className=" px-0 header-item bg-dark">
                    Responsible Jewellery Council Policy
                  </ListGroup.Item>
                </ListGroup>
              </Row>
              {/* Home Section End*/}
              {/* Dresses Section Start*/}
              <h5
                className="py-lg-0 px-2 px-lg-0 clearfix d-flex align-items-center header-title "
                onClick={expandHandler2}
              >
                <span className="py-4 d-block mt-2">Dresses</span>
                <i
                  className={`fas fa-chevron-down d-block ml-auto ${
                    isOpen2 ? "open" : ""
                  }`}
                ></i>
              </h5>
              <Row>
                <ListGroup className={`${toggleClass2}`}>
                  <ListGroup.Item className="px-0 pt-1 header-item bg-dark">
                    About Us
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 header-item bg-dark">
                    Store Locator
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 header-item bg-dark">
                    Careers
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 header-item bg-dark">
                    Investor Centre
                  </ListGroup.Item>
                  <ListGroup.Item className=" px-0 header-item bg-dark">
                    Responsible Jewellery Council Policy
                  </ListGroup.Item>
                </ListGroup>
              </Row>
              {/* Dresses Section End*/}
              {/* Clothing Section Start*/}
              <h5
                className="py-lg-0 px-2 px-lg-0 clearfix d-flex align-items-center header-title "
                onClick={expandHandler3}
              >
                <span className="py-4 d-block mt-2">Clothing</span>
                <i
                  className={`fas fa-chevron-down d-block ml-auto ${
                    isOpen3 ? "open" : ""
                  }`}
                ></i>
              </h5>
              <Row>
                <ListGroup className={`${toggleClass3}`}>
                  <ListGroup.Item className="px-0 pt-1 header-item bg-dark">
                    About Us
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 header-item bg-dark">
                    Store Locator
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 header-item bg-dark">
                    Careers
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 header-item bg-dark">
                    Investor Centre
                  </ListGroup.Item>
                  <ListGroup.Item className=" px-0 header-item bg-dark">
                    Responsible Jewellery Council Policy
                  </ListGroup.Item>
                </ListGroup>
              </Row>
              {/* Clothing Section End*/}
              {/* Shoes Section Start*/}
              <h5
                className="py-lg-0 px-2 px-lg-0 clearfix d-flex align-items-center header-title "
                onClick={expandHandler4}
              >
                <span className="py-4 d-block mt-2">Shoes</span>
                <i
                  className={`fas fa-chevron-down d-block ml-auto ${
                    isOpen4 ? "open" : ""
                  }`}
                ></i>
              </h5>
              <Row>
                <ListGroup className={`${toggleClass4}`}>
                  <ListGroup.Item className="px-0 pt-1 header-item bg-dark">
                    About Us
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 header-item bg-dark">
                    Store Locator
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 header-item bg-dark">
                    Careers
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 header-item bg-dark">
                    Investor Centre
                  </ListGroup.Item>
                  <ListGroup.Item className=" px-0 header-item bg-dark">
                    Responsible Jewellery Council Policy
                  </ListGroup.Item>
                </ListGroup>
              </Row>
              {/* Shoes Section End*/}
              {/* Accessories Section Start*/}
              <h5
                className="py-lg-0 px-2 px-lg-0 clearfix d-flex align-items-center header-title "
                onClick={expandHandler5}
              >
                <span className="py-4 d-block mt-2">Accessories</span>
                <i
                  className={`fas fa-chevron-down d-block ml-auto ${
                    isOpen5 ? "open" : ""
                  }`}
                ></i>
              </h5>
              <Row className="mb-3 m-xl-0">
                <ListGroup className={`${toggleClass5}`}>
                  <ListGroup.Item className="px-0 pt-1 header-item bg-dark">
                    About Us
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 header-item bg-dark">
                    Store Locator
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 header-item bg-dark">
                    Careers
                  </ListGroup.Item>
                  <ListGroup.Item className="px-0 header-item bg-dark">
                    Investor Centre
                  </ListGroup.Item>
                  <ListGroup.Item className=" px-0 header-item bg-dark">
                    Responsible Jewellery Council Policy
                  </ListGroup.Item>
                </ListGroup>
              </Row>
              {/* Accessories Section End*/}
            </Nav>
            <Nav className="align-items-start align-items-xl-center">
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
              <LinkContainer
                to="/cart/"
                className="navbar-icon navbar-cart-icon mt-3 mt-xl-0"
              >
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>
                  <div className="cart-items">10</div>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <div className="avatar-username py-2">
                  <span
                    className="text-light mx-xl-3"
                    onClick={() => {
                      setToggleAvatarMenu(!toggleAvatarMenu);
                    }}
                  >
                    {userInfo.name} <i className="fas fa-caret-down"></i>
                  </span>
                  <div
                    className={`avatar-dropdown-menu ${
                      toggleAvatarMenu ? "" : "d-none"
                    }`}
                  >
                    <LinkContainer to="/profile">
                      <Dropdown.Item className="avatar-menu-item">
                        Profile
                      </Dropdown.Item>
                    </LinkContainer>
                    {userInfo.isStaff && (
                      <LinkContainer to="/admin">
                        <Dropdown.Item className="avatar-menu-item">
                          Admin Management
                        </Dropdown.Item>
                      </LinkContainer>
                    )}
                    <Dropdown.Item
                      onClick={logoutHandler}
                      className="avatar-menu-item"
                    >
                      Logout
                    </Dropdown.Item>
                  </div>
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <LinkContainer to="/login">
                    <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
                  <span className="text-light mx-1">/</span>
                  <LinkContainer to="/register">
                    <Nav.Link>Sign up</Nav.Link>
                  </LinkContainer>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
