import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Redirect, Route, Switch } from "react-router-dom";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import "./admin.css";
import AdminHome from "./AdminHome";
import Category from "./Category";
import CreateUser from "./CreateUser";
import ManageUser from "./ManageUser";
import CreateBanner from "./CreateBanner";
import ManageBanner from "./ManageBanner";
import CreateProduct from "./CreateProduct";
import ManageProduct from "./ManageProduct";
import EditProduct from "./EditProduct";
import EditUser from "./EditUser";
import NotFound from "./NotFound";
import SideBar from "../../components/admin/SideBar";
import Header from "../../components/admin/Header";
import { useDispatch, useSelector } from "react-redux";
import AvatarMenu from "../../components/admin/AvatarMenu";
import NotificationBell from "../../components/admin/NotificationBell";
import Footer from "../../components/admin/Footer";
import { CLOSE_AVATAR_SUBMENU } from "../../constants/avatarMenuConstants";
import {
  CLOSE_ADMIN_SIDEBAR,
  OPEN_ADMIN_SIDEBAR,
  ADMIN_SIDEBAR_SLIDE_OUT,
} from "../../constants/adminSidebarConstants";

const Admin = () => {
  const dispatch = useDispatch();
  const width = useWindowWidth();
  const handleSubmenu = (e) => {
    if (!e.target.classList.contains("toggle-avatar")) {
      dispatch({ type: CLOSE_AVATAR_SUBMENU });
    }
  };
  const adminSidebarHandle = useSelector((state) => state.adminSidebarHandle);
  const { isCollapse } = adminSidebarHandle;

  const adminSidebarSlideHandle = useSelector(
    (state) => state.adminSidebarSlideHandle
  );
  const { isSlideIn } = adminSidebarSlideHandle;
  useEffect(() => {
    if (width < 992 && width > 768 && !isCollapse) {
      dispatch({ type: CLOSE_ADMIN_SIDEBAR });
    }
    if (width > 992 && isCollapse) {
      dispatch({ type: OPEN_ADMIN_SIDEBAR });
    }
    if (width < 768 && isCollapse) {
      dispatch({ type: OPEN_ADMIN_SIDEBAR });
    }
  }, [width, dispatch, isCollapse]);
  return (
    <>
      <Container fluid className="admin-page">
        <AvatarMenu />
        <NotificationBell />
        <Row>
          <div
            className={`m-0 p-0 sidebar-panel ${isSlideIn ? "show" : ""}`}
            style={
              isCollapse
                ? { width: "5rem" }
                : width < 576
                ? { width: "16rem" }
                : { width: "20rem" }
            }
          >
            <SideBar />
          </div>
          <div
            className={`modal-grey ${isSlideIn ? "" : "d-none"}`}
            onClick={() => {
              dispatch({ type: ADMIN_SIDEBAR_SLIDE_OUT });
              dispatch({ type: CLOSE_ADMIN_SIDEBAR });
            }}
          ></div>
          <Col className="m-0 p-0">
            <Header />

            <div onMouseOver={handleSubmenu} className="admin-body">
              <Switch>
                <Redirect exact from="/admin" to="/admin/home" />
                <Route path="/admin/home" component={AdminHome} />
                <Route path="/admin/manage-category" component={Category} />
                <Route path="/admin/create-user" component={CreateUser} />
                <Route path="/admin/manage-user" component={ManageUser} />
                <Route path="/admin/users/:id/edit" component={EditUser} />
                <Route path="/admin/create-banner" component={CreateBanner} />
                <Route path="/admin/manage-banner" component={ManageBanner} />
                <Route path="/admin/create-product" component={CreateProduct} />
                <Route path="/admin/manage-product" component={ManageProduct} />
                <Route
                  path="/admin/products/:id/edit"
                  component={EditProduct}
                />
                <Route component={NotFound} /> {/*上面没有一个匹配, 直接显示*/}
              </Switch>
            </div>
            <Footer />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Admin;
