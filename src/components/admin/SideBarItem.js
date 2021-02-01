import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "./sidebaritem.css";

const SideBarItem = ({ icon, icon_invisible, itemName, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSubmenu, setIsOpenSubmenu] = useState(false);
  const adminSidebarHandle = useSelector((state) => state.adminSidebarHandle);
  const { isCollapse } = adminSidebarHandle;
  const location = useLocation();
  return (
    <section>
      <div
        className={`item-header d-flex align-items-center ${
          isCollapse ? "justify-content-center" : "justify-content-between mx-3"
        }`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        onMouseLeave={() => {
          setIsOpenSubmenu(false);
        }}
      >
        <span
          onMouseOver={() => {
            setIsOpenSubmenu(true);
          }}
        >
          <i
            className={`${icon} mr-1`}
            style={isCollapse ? { fontSize: "1.2rem" } : {}}
          ></i>
          {isCollapse ? "" : itemName}
        </span>
        <i
          className={`fas fa-chevron-down ${isOpen ? "open" : ""} ${
            isCollapse ? "d-none" : ""
          }`}
        ></i>
        {isCollapse ? (
          <ul
            className={`item-submenu list-group ${
              isOpenSubmenu ? "" : "d-none"
            }`}
          >
            {items.map((item, index) => (
              <li
                key={index}
                className={`py-2 px-3 menu-item list-group-item border-0 ${
                  location.pathname === item.linkTo ? "active" : ""
                }`}
              >
                <Link to={item.linkTo} className="item-link">
                  <span>
                    {icon_invisible}
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
      {!isCollapse && (
        <ul className={`list-group ${isOpen ? "" : "d-none"}`}>
          {items.map((item, index) => (
            <li
              key={index}
              className={`py-2 px-3 menu-item ${
                location.pathname === item.linkTo ? "active" : ""
              }`}
            >
              <Link to={item.linkTo} className="item-link">
                <span>
                  {icon_invisible}
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SideBarItem;
