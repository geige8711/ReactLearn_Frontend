import React from "react";
import { transitions, positions } from "react-alert";
import "./alertTemplate.css";

export const AlertTemplate = ({ style, options, message, close }) => (
  <div style={style} className="alert-success d-flex flex-column">
    <button
      type="button"
      class="close align-self-end mr-2 p-0 border-0 alert-close"
      aria-label="Close"
      onClick={close}
    >
      <span aria-hidden="true">&times;</span>
    </button>
    <div className="mt-1 text-center display-4">
      {options.type === "success" && <i className="far fa-check-circle"></i>}
    </div>
    {options.type === "info" && <i className="fas fa-info-circle"></i>}

    {options.type === "error" && <i className="far fa-times-circle"></i>}
    <div className="text-center mt-2 font-weight-bold">{message}</div>
  </div>
);

export const options = {
  // you can also just use 'bottom center'
  position: positions.MIDDLE,
  timeout: 0,
  offset: "0px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};
