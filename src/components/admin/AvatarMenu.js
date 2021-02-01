import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import "./avatarmenu.css";

const AvatarMenu = () => {
  const avatarmenuHandler = useSelector((state) => state.avatarmenuHandle);
  const { isOpen, menuLocation } = avatarmenuHandler;
  const container = useRef(null);
  useEffect(() => {
    //${center - submenu.getBoundingClientRect().width}
    const submenu = container.current;
    const { bottom } = menuLocation;
    submenu.style.right = `0px`;
    submenu.style.top = `${bottom}px`;
  }, [menuLocation]);
  return (
    <div className={`avatar-menu ${isOpen ? "show" : ""}`} ref={container}>
      <a className="dropdown-item text-wrap avatar-menu-item" href="/">
        Action
      </a>
      <a className="dropdown-item text-wrap avatar-menu-item" href="/">
        Another action
      </a>
      <a className="dropdown-item text-wrap avatar-menu-item" href="/">
        Something else here
      </a>
      <div className="dropdown-divider"></div>
      <a className="dropdown-item text-wrap avatar-menu-item" href="/">
        Separated link
      </a>
    </div>
  );
};

export default AvatarMenu;
