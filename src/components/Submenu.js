import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import "./submenu.css";

const Submenu = () => {
  const submenuHandler = useSelector((state) => state.submenuHandle);
  const {
    isOpen,
    pages: { page, links },
    menuLocation,
  } = submenuHandler;
  const container = useRef(null);
  const [columns, setColumns] = useState("col-2");
  useEffect(() => {
    setColumns("col-2");
    const submenu = container.current;
    const { center, bottom } = menuLocation;
    submenu.style.left = `${center}px`;
    submenu.style.top = `${bottom}px`;
    if (links.length === 3) {
      setColumns("col-3");
    }
    if (links.length > 3) {
      setColumns("col-4");
    }
  }, [page, menuLocation, links]);
  return (
    <aside
      className={`${isOpen ? "d-none d-xl-block submenu show" : "submenu"}`}
      ref={container}
    >
      <section>
        <h4>{page}</h4>
        <div className={`submenu-center ${columns}`}>
          {links.map((link, index) => {
            const { url, icon, label } = link;
            return (
              <a key={index} href={url}>
                {icon}
                {label}
              </a>
            );
          })}
        </div>
      </section>
    </aside>
  );
};

export default Submenu;
