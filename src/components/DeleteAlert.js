import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./deleteAlert.css";

export const DeleteAlert = ({ deleteHandler, deleteMessage }) => {
  return confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="delete-confirm-dialog">
          <div className="h-75 d-flex align-items-center justify-content-center">
            <p className="my-auto font-weight-bold text-center text-danger mx-2">
              {deleteMessage}
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-outline-danger mr-4 alert-button p-0"
              onClick={() => {
                deleteHandler();
                onClose();
              }}
            >
              Yes
            </button>
            <button
              className="btn btn-outline-info alert-button p-0"
              onClick={onClose}
            >
              No
            </button>
          </div>
        </div>
      );
    },
  });
};
