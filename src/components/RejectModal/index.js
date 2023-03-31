import React from "react";
import { Modal, Avatar, Card, Space, Typography, Button } from "antd";

function RejectModal({
  open = false,
  onOk = () => console.log("ok"),
  onCancel = () => console.log("cancel"),
  modalData = {},
}) {
  return (
    <div>
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
              You are{" "}
              <i>
                <b>REJECTING THIS POST</b>
              </i>{" "}
              . Now nobody can see this Post!
            </Typography.Paragraph>
          </div>
        </Space>
      </Modal>
    </div>
  );
}

export default RejectModal;
