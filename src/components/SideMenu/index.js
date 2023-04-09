import { Menu } from "antd";
import React from "react";
import { AiFillWarning, AiOutlineAppstore, AiOutlineKey } from "react-icons/ai";
import { BiListUl, BiUser } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function SideMenu() {
  const navigate = useNavigate();

  return (
    <div className="sideMenu">
      <Menu
        onClick={(item) => {
          navigate(item.key);
        }}
        items={[
          {
            label: "Dashboard",
            icon: <AiOutlineAppstore />,
            key: "/",
          },
          {
            label: "Pending Posts",
            key: "/pending-posts",
            icon: <AiFillWarning />,
          },
          {
            label: "All Posts",
            key: "/all-posts",
            icon: <BiListUl />,
          },
          {
            label: "Rejected Posts",
            key: "rejected-posts",
            icon: <FiAlertCircle />,
          },
          {
            label: "Manage Profile",
            key: "/profile",
            icon: <BiUser />,
          },
          {
            label: "Change Password",
            key: "/change-password",
            icon: <AiOutlineKey />,
          },
        ]}
      ></Menu>
    </div>
  );
}

export default SideMenu;
