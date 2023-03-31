import React from "react";
import { Modal, Space, Card, Avatar, Typography } from "antd";

function Acceptmodal({
  open = false,
  modalData = {},
  onOk = () => console.log("Ok"),
  onCancel = () => console.log("Cancel"),
}) {
  return (
    <Modal open={open} onOk={onOk} onCancel={onCancel}>
      <Space>
        <Card
          style={{
            width: 200,
          }}
          cover={<img alt="Post-item" src={modalData?.imageUri} />}
        >
          <Card.Meta
            avatar={
              <Avatar src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1679688256~exp=1679688856~hmac=cb8f03c31dbaae05837ef2384f5b75da96a6b0a9a3809bcfd1593da1c6b57705" />
            }
            title={modalData?.title.substring(0, 50) + "..."}
            description={modalData?.description.substring(0, 50) + "..."}
          />
        </Card>
        <div>
          <Typography.Title>Are you sure!</Typography.Title>
          <Typography.Paragraph>
            You are ACCEPTING THIS POST. Now every one can see this post!
          </Typography.Paragraph>
        </div>
      </Space>
    </Modal>
  );
}

export default Acceptmodal;
