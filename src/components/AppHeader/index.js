import { Badge, Space, Typography } from "antd";
import React from "react";
import "./styles.css";
import { AiFillBell, AiOutlineMail } from "react-icons/ai";

function AppHeader() {
  return (
    <div className="AppHeader">
      <img src="logo.png" className="Logo" alt="app-logo" />
      <Typography.Title style={{ fontSize: 20 }}>
        Cop-on-Cloud Admin
      </Typography.Title>
      <Space className="iconSpacer">
        <Badge count={10}>
          <AiOutlineMail size={20} color={"black"} />
        </Badge>
        <Badge count={20}>
          <AiFillBell size={24} color={"black"} />
        </Badge>
      </Space>
    </div>
  );
}

export default AppHeader;
