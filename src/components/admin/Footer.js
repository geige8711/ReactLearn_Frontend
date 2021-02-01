import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="admin-footer container-fluid">
      <div className="row  justify-content-center">
        <span>E Shop Home Page</span>
        <span className="mx-5">
          <i className="fab fa-github"></i>
        </span>
        <span>Design by Yi He</span>
      </div>
      <div className="row justify-content-center">
        <p className="text-center">Copyright 2021 for learning puperpose</p>
      </div>
    </div>
  );
};

export default Footer;
