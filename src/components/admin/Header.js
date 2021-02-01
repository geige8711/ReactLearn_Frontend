import React, { useState, useRef, useEffect } from "react";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import "./header.css";
import avatar from "../../images/paypal.PNG";
import {
  OPEN_AVATAR_SUBMENU,
  CLOSE_AVATAR_SUBMENU,
  OPEN_NOTIFICATION_SUBMENU,
  CLOSE_NOTIFICATION_SUBMENU,
} from "../../constants/avatarMenuConstants";
import {
  OPEN_ADMIN_SIDEBAR,
  CLOSE_ADMIN_SIDEBAR,
  ADMIN_SIDEBAR_SLIDE_IN,
  ADMIN_SIDEBAR_SLIDE_OUT,
} from "../../constants/adminSidebarConstants";
import { useDispatch, useSelector } from "react-redux";
import avatarComment from "../../images/028.jpg";

const Header = () => {
  const width = useWindowWidth();
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const container = useRef(null);
  const imgRef = useRef(null);
  const notificationArea = useRef(null);

  const notificationMenuHandle = useSelector(
    (state) => state.notificationMenuHandle
  );
  const { isOpen } = notificationMenuHandle;

  const dispatch = useDispatch();
  const displaySubmenu = (e) => {
    const tempBtn = container.current.getBoundingClientRect();
    const center = tempBtn.left;
    const bottom = tempBtn.bottom;
    dispatch({
      type: OPEN_AVATAR_SUBMENU,
      payload: { coordinates: { center, bottom } },
    });
  };

  const displayNotification = (e) => {
    if (isOpen) {
      dispatch({
        type: CLOSE_NOTIFICATION_SUBMENU,
      });
    } else {
      const tempBtn = notificationArea.current.getBoundingClientRect();
      const right = tempBtn.right;
      console.log(right);
      const bottom = tempBtn.bottom;
      dispatch({
        type: OPEN_NOTIFICATION_SUBMENU,
        payload: { coordinates: { right, bottom } },
      });
    }
  };

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
    if (width < 992) {
      dispatch({ type: CLOSE_ADMIN_SIDEBAR });
    }
    if (width > 992) {
      dispatch({ type: OPEN_ADMIN_SIDEBAR });
    }
  }, [width, dispatch]);

  useEffect(() => {
    if (container.current.getBoundingClientRect().right > width) {
      imgRef.current.style.display = "none";
    } else {
      imgRef.current.style.display = "";
    }
  }, [isOpenSearch, width]);

  useEffect(() => {
    imgRef.current.style.display = "";
  }, []);
  return (
    //toggle-icon my-auto text-center h-100
    <div
      className="admin-header bg-white d-flex justify-content-start"
      onMouseOver={handleSubmenu}
    >
      <img
        src={avatarComment}
        alt=""
        className={`admin-logo rounded-circle mx-2 align-self-center ${
          width > 768 ? "d-none" : isOpenSearch ? "d-none" : ""
        }`}
      />
      <div
        className={`d-flex align-items-center toggle-icon`}
        onClick={() => {
          isCollapse
            ? dispatch({ type: OPEN_ADMIN_SIDEBAR })
            : dispatch({ type: CLOSE_ADMIN_SIDEBAR });
          isSlideIn
            ? dispatch({ type: ADMIN_SIDEBAR_SLIDE_OUT })
            : dispatch({ type: ADMIN_SIDEBAR_SLIDE_IN });
        }}
      >
        <i
          className={`fas fa-angle-double-right mx-4 ${
            isOpenSearch && width <= 768 ? "d-none" : " "
          } ${
            width > 768 ? (isCollapse ? "" : "open") : isSlideIn ? "open" : ""
          }`}
        ></i>
      </div>
      <div
        className={`toolbar ml-sm-auto d-flex ${
          isOpenSearch ? "ml-0" : "ml-auto"
        }`}
      >
        <div className="d-flex align-items-center mr-4">
          <i
            className={`fas fa-search d-inline-block mr-1 ${
              isOpenSearch ? "ml-4 mr-2" : ""
            }`}
            onClick={() => {
              setIsOpenSearch(!isOpenSearch);
            }}
          ></i>
          <input
            type="text"
            className={`${
              isOpenSearch ? "" : "d-none"
            } search-input border border-top-0 border-right-0 border-left-0`}
          />
        </div>
        <div className="d-flex align-items-center toggle-icon">
          <i className="far fa-question-circle mx-3 mx-lg-4"></i>
        </div>

        <div
          className="d-flex align-items-center navbar-bell-icon"
          ref={notificationArea}
        >
          <div className="bell-icon py-4" onClick={displayNotification}>
            <i className="far fa-bell mx-3 mx-lg-4"></i>
            <div className="message-items">10</div>
          </div>
        </div>
        <div
          className="px-2 d-flex align-items-center toggle-icon toggle-avatar"
          onMouseOver={displaySubmenu}
          ref={container}
        >
          <img
            src={avatar}
            alt=""
            className="border avatar-pic rounded-circle mr-2 toggle-avatar"
            ref={imgRef}
          />
          <span className="mr-2 toggle-avatar d-none d-md-block">Yi He</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
