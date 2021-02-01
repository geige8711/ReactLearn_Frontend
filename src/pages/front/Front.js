import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NotFound from "./NotFound";
import Home from "./Home";
import Submenu from "../../components/Submenu";
import { CLOSE_SUBMENU } from "../../constants/submenuConstants";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import ResetPasswordPage from "./ResetPasswordPage";

const Front = () => {
  const dispatch = useDispatch();
  const submenuHandle = useSelector((state) => state.submenuHandle);
  const { isOpen } = submenuHandle;
  return (
    <>
      <Header />
      <Submenu />
      <main
        onMouseOver={() => {
          if (isOpen) {
            dispatch({ type: CLOSE_SUBMENU });
          }
        }}
      >
        <Container fluid className="p-0 m-0">
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/home" component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/forgot-password" component={ForgotPasswordPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/activate/:token" component={RegisterPage} />
            <Route
              path="/password-reset/:token"
              component={ResetPasswordPage}
            />
            <Route component={NotFound} /> {/*上面没有一个匹配, 直接显示*/}
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Front;
