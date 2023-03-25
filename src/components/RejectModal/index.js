import React from "react";
import { Modal } from "antd";

function RejectModal({
  open = false,
  onOk = () => console.log("ok"),
  onCancel = () => console.log("cancel"),
  modalData = {},
}) {
  return (
    <div>
      <Modal></Modal>
    </div>
  );
}

export default RejectModal;
