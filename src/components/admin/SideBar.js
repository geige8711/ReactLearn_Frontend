import React from "react";
import "./sidebar.css";
import { useSelector } from "react-redux";
import SideBarItem from "./SideBarItem";
import avatarComment from "../../images/028.jpg";

const SideBar = () => {
  const adminSidebarHandle = useSelector((state) => state.adminSidebarHandle);
  const { isCollapse } = adminSidebarHandle;

  return (
    <aside className="sidebar">
      <div className="sidebar-header d-flex align-items-center justify-content-center">
        <img
          src={avatarComment}
          alt=""
          className="admin-logo rounded-circle "
        />
        <h1
          className={`logo text-center ml-3 text-light ${
            isCollapse ? "d-none" : ""
          }`}
        >
          E-Shop CRM
        </h1>
      </div>
      <div className="sidebar-body">
        <SideBarItem
          icon="fas fa-users"
          icon_invisible={<i className="fas fa-users mr-1 invisible"></i>}
          itemName={"Users"}
          items={[
            { name: "Create User", linkTo: "/admin/create-user" },
            { name: "Manage User", linkTo: "/admin/manage-user" },
          ]}
        />
        <SideBarItem
          icon="far fa-flag"
          icon_invisible={<i className="far fa-flag mr-1 invisible"></i>}
          itemName={"Banners"}
          items={[
            { name: "Create Banner", linkTo: "/admin/create-banner" },
            { name: "Manage Banner", linkTo: "/admin/manage-banner" },
          ]}
        />
        <SideBarItem
          icon="far fa-building"
          icon_invisible={<i className="far fa-building mr-1 invisible"></i>}
          itemName={"Categories"}
          items={[
            { name: "Manage Category", linkTo: "/admin/manage-category" },
          ]}
        />
        <SideBarItem
          icon="fab fa-hive"
          icon_invisible={<i className="fab fa-hive mr-1 invisible"></i>}
          itemName={"Products"}
          items={[
            { name: "Create Product", linkTo: "/admin/create-product" },
            { name: "Manage Product", linkTo: "/admin/manage-product" },
          ]}
        />
      </div>
    </aside>
  );
};

export default SideBar;
