import { Space, Typography } from "antd";
import React, { useContext } from "react";
import "./styles.css";
import { Avatar } from "antd";
import { UserContext } from "../../Context/userContext";

function AppHeader() {
  const { state: userState } = useContext(UserContext);

  return (
    <div className="AppHeader">
      <img
        src="https://cop-on-cloud.s3.us-east-1.amazonaws.com/image-1681067033573"
        className="Logo"
        alt="app-logo"
      />
      <Typography.Title style={{ fontSize: 20 }}>
        Cop-on-Cloud Admin
      </Typography.Title>
      <Space className="iconSpacer">
        <Avatar
          src={
            userState?.userInfo?.profilePic ||
            "https://joesch.moe/api/v1/random"
          }
          size={50}
        ></Avatar>
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
