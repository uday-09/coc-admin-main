import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import "./styles.css";
import { CloseOutlined } from "@ant-design/icons";

function Nofity({
  show = true,
  message = "Something went wrong!",
  success = false,
  autoClose = true,
  duration = 5000,
  onClose,
  onTimeOut,
}) {
  console.log(`show = ${show}, message: ${message}, success: ${success}`);

  useEffect(() => {
    let timerId = undefined;
    if (show === true && autoClose === true) {
      timerId = setTimeout(() => {
        onTimeOut();
      }, duration);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [show]);

  return (
    <>
      {show ? (
        <div className={`notification-body ${success ? "success" : "failure"}`}>
          <Typography.Title level={5} style={{ padding: 0, margin: 0 }}>
            {message}
          </Typography.Title>
          <CloseOutlined
            onClick={onClose}
            style={{
              fontSize: 18,
              // borderStyle: "solid",
              // borderWidth: 1,
              // borderColor: "green",
            }}
          />
        </div>
      ) : null}
    </>
  );
}

export default React.memo(Nofity);
