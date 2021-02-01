import React, { useState, useRef, useEffect } from "react";
import "./notificationbell.css";
import avatarComment from "../../images/028.jpg";
import { useSelector } from "react-redux";

const NotificationBell = () => {
  const [canGoNext, setCanGoNext] = useState(true);
  const [notificationTabs, setNotificationTabs] = useState({
    notifications: true,
    messages: false,
    events: false,
  });
  const notificationMenuHandle = useSelector(
    (state) => state.notificationMenuHandle
  );
  const { isOpen, menuLocation } = notificationMenuHandle;
  const notificationTab = useRef(null);
  const container = useRef(null);

  const backSlide = () => {
    if (!canGoNext) {
      const nTab = notificationTab.current;
      nTab.style.left = `0rem`;
      setCanGoNext(true);
    }
  };
  const nextSlide = () => {
    if (canGoNext) {
      const nTab = notificationTab.current;
      nTab.style.left = `-8rem`;
      setCanGoNext(false);
    }
  };

  useEffect(() => {
    const submenu = container.current;
    const { right, bottom } = menuLocation;
    submenu.style.left = `${right - submenu.getBoundingClientRect().width}px`;
    submenu.style.top = `${bottom}px`;
  }, [menuLocation]);

  return (
    <div
      className={`notification-area ${isOpen ? "d-block" : "d-none"}`}
      ref={container}
    >
      <div className="notification-header d-flex mt-2 justify-content-between px-2 border border-top-0 border-left-0 border-right-0">
        <span
          className="d-none d-sm-block"
          style={
            canGoNext
              ? { cursor: "no-drop", color: "#aaa" }
              : { cursor: "pointer" }
          }
          onClick={backSlide}
        >
          <i className="fas fa-angle-left"></i>
        </span>
        <div className="notification-tab-container mx-auto">
          <div className="notification-tab" ref={notificationTab}>
            <span
              onClick={() => {
                setNotificationTabs({
                  notifications: true,
                  messages: false,
                  events: false,
                });
              }}
              className="notification-tabItem d-inline-block text-center"
              style={
                notificationTabs.notifications
                  ? {
                      borderBottom: "4px solid blue",
                      fontWeight: "bold",
                      color: "blue",
                    }
                  : { cursor: "pointer" }
              }
            >
              Notification
            </span>
            <span
              onClick={() => {
                setNotificationTabs({
                  notifications: false,
                  messages: true,
                  events: false,
                });
              }}
              className="notification-tabItem d-inline-block text-center"
              style={
                notificationTabs.messages
                  ? {
                      borderBottom: "4px solid blue",
                      fontWeight: "bold",
                      color: "blue",
                    }
                  : { cursor: "pointer" }
              }
            >
              Message
            </span>
            <span
              onClick={() => {
                setNotificationTabs({
                  notifications: false,
                  messages: false,
                  events: true,
                });
              }}
              className="notification-tabItem d-inline-block text-center"
              style={
                notificationTabs.events
                  ? {
                      borderBottom: "4px solid blue",
                      fontWeight: "bold",
                      color: "blue",
                    }
                  : { cursor: "pointer" }
              }
            >
              Event
            </span>
          </div>
        </div>
        <span
          className="d-none d-sm-block"
          style={
            canGoNext
              ? { cursor: "pointer" }
              : { cursor: "no-drop", color: "#aaa" }
          }
          onClick={nextSlide}
        >
          <i className="fas fa-angle-right"></i>
        </span>
      </div>
      <div className="notification-body text-center">
        {notificationTabs.notifications ? (
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex p-0 notification-item">
              <div className="d-flex align-items-center">
                <div className="notification-icon rounded-circle text-center mx-2">
                  <i className="fas fa-envelope text-white mt-3"></i>
                </div>
              </div>
              <div className="ml-2">
                <p className="mt-2 mb-1">you have messages</p>
                <p className="text-muted text-left">3 years ago</p>
              </div>
            </li>
            <li className="list-group-item d-flex p-0 notification-item">
              <div className="d-flex align-items-center">
                <div className="notification-icon rounded-circle text-center mx-2">
                  <i className="fas fa-envelope text-white mt-3"></i>
                </div>
              </div>
              <div className="ml-2">
                <p className="mt-2 mb-1">you have messages</p>
                <p className="text-muted text-left">3 years ago</p>
              </div>
            </li>
            <li className="list-group-item d-flex p-0 notification-item">
              <div className="d-flex align-items-center">
                <div className="notification-icon rounded-circle text-center mx-2">
                  <i className="fas fa-envelope text-white mt-3"></i>
                </div>
              </div>
              <div className="ml-2">
                <p className="mt-2 mb-1">you have messages</p>
                <p className="text-muted text-left">3 years ago</p>
              </div>
            </li>
          </ul>
        ) : notificationTabs.messages ? (
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex p-0 notification-item">
              <img
                src={avatarComment}
                alt=""
                className="rounded-circle comment-avatar ml-2 mt-3"
              />

              <div className="ml-2">
                <p className="mt-2 mb-1">Yi give you a comment</p>
                <p className="mt-2 mb-1 text-muted text-left">
                  this is a test message
                </p>
                <p className="text-muted text-left">3 years ago</p>
              </div>
            </li>
            <li className="list-group-item d-flex p-0 notification-item">
              <img
                src={avatarComment}
                alt=""
                className="rounded-circle comment-avatar ml-2 mt-3"
              />

              <div className="ml-2">
                <p className="mt-2 mb-1">Yi give you a comment</p>
                <p className="mt-2 mb-1 text-muted text-left">
                  this is a test message
                </p>
                <p className="text-muted text-left">3 years ago</p>
              </div>
            </li>
            <li className="list-group-item d-flex p-0 notification-item">
              <img
                src={avatarComment}
                alt=""
                className="rounded-circle comment-avatar ml-2 mt-3"
              />

              <div className="ml-2">
                <p className="mt-2 mb-1">Yi give you a comment</p>
                <p className="mt-2 mb-1 text-muted text-left">
                  this is a test message
                </p>
                <p className="text-muted text-left">3 years ago</p>
              </div>
            </li>
          </ul>
        ) : (
          <ul className="list-group list-group-flush">
            <li className="list-group-item px-4 notification-item">
              <div className="d-flex justify-content-between">
                <span>task name</span>
                <span className="btn border border-success py-0 text-success">
                  start
                </span>
              </div>
              <div className="text-left text-muted">
                this task will start tomorrow
              </div>
            </li>
            <li className="list-group-item px-4 notification-item">
              <div className="d-flex justify-content-between">
                <span>task name</span>
                <span className="btn border border-success py-0 text-success">
                  start
                </span>
              </div>
              <div className="text-left text-muted">
                this task will start tomorrow
              </div>
            </li>
            <li className="list-group-item px-4 notification-item">
              <div className="d-flex justify-content-between">
                <span>task name</span>
                <span className="btn border border-success py-0 text-success">
                  start
                </span>
              </div>
              <div className="text-left text-muted">
                this task will start tomorrow
              </div>
            </li>
          </ul>
        )}
        <a href="/" className="text-decoration-none">
          loading more
        </a>
      </div>
      <div
        className="notification-footer border border-bottom-0 border-left-0 border-right-0 py-2 text-center"
        style={{ cursor: "pointer" }}
      >
        Clear Notification
      </div>
    </div>
  );
};

export default NotificationBell;
