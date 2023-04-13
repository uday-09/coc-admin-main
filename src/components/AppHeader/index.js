import { Space, Typography } from "antd";
import React, { useContext } from "react";
import "./styles.css";
import { Avatar } from "antd";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

function AppHeader() {
  const { state: userState, removeToken } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <div className="AppHeader">
      <a onClick={() => navigate("/")}>
        <img
          src="https://cop-on-cloud.s3.us-east-1.amazonaws.com/image-1681067033573"
          className="Logo"
          alt="app-logo"
        />
      </a>
      <Typography.Title style={{ fontSize: 20 }}>
        Cop-on-Cloud Admin
      </Typography.Title>
      <Space
        className="iconSpacer"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <a onClick={() => navigate("/profile")}>
          <Avatar
            src={
              userState?.userInfo?.profilePic ||
              "https://joesch.moe/api/v1/random"
            }
            size={50}
          ></Avatar>
        </a>
        <a
          onClick={() => {
            if (window.confirm("Are you sure to logout?")) {
              Cookies.remove("admin-token");
              removeToken();
              navigate("/");
            }
          }}
        >
          <LogoutOutlined style={{ fontSize: 30 }}></LogoutOutlined>
        </a>
        {/* <Badge count={10}>
          <AiOutlineMail size={20} color={"black"} />
        </Badge>
        <Badge count={20}>
          <AiFillBell size={24} color={"black"} />
        </Badge> */}
      </Space>
    </div>
  );
}

export default AppHeader;
