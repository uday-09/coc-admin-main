import React, { useState, useEffect, useCallback, useContext } from "react";
import "./styles.css";
import { Button, Form, Input } from "antd";
import Notify from "../../components/Notify/index";
import { UserContext } from "../../Context/userContext";
import { Api } from "../../api";

const CHANGE_PASSWORD =
  "https://img.freepik.com/free-vector/key-concept-illustration_114360-6305.jpg?w=740&t=st=1681059056~exp=1681059656~hmac=4fa17b85bbc26d24abf20ee1b24745d176b57f49fcb24f40b0ca792f0a3ee150";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [cnfrmPassword, setConfrmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState(false);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const { state: userState, addUser } = useContext(UserContext);

  useEffect(() => {
    if (!userState?.userInfo) {
      addUser();
    }
  }, []);

  //   console.log(userState);

  const handleClick = async () => {
    try {
      setLoading(true);
      if (password != cnfrmPassword) {
        throw Error("New password and Confirm password didn't match!");
      }

      if (userState?.userInfo?._id) {
        const response = await Api.patch(`/change/my-password`, {
          password: oldPassword,
          newPassword: password,
        });
        setSuccess(true);
      } else {
        throw Error("Something not went well. Try again later");
      }
    } catch (err) {
      console.log(err);
      setErr(
        err.response?.data?.message || err.message || "Something went wrong!"
      );
      setSuccess(false);
    } finally {
      setNotify(true);
      window.scrollTo(0, 0);
      setLoading(false);
    }
    // console.log(oldPassword, password, cnfrmPassword);
  };

  const onClose = useCallback(() => {
    setNotify(false);
  }, [notify]);

  return (
    <>
      <Notify
        onClose={onClose}
        onTimeOut={onClose}
        show={notify}
        message={success ? "Succesfully Changes Password!" : err}
        success={success}
      ></Notify>
      <div className="page-body">
        <img src={CHANGE_PASSWORD} style={{ width: 300, height: 300 }} />
        <Form layout="vertical" style={{ width: 300 }}>
          <Form.Item label="Current Password">
            <Input
              type="password"
              onChange={(e) => setOldPassword(e.target.value)}
            ></Input>
          </Form.Item>
          <Form.Item label="New password">
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </Form.Item>
          <Form.Item label="Confirm password">
            <Input
              type="password"
              onChange={(e) => setConfrmPassword(e.target.value)}
            ></Input>
          </Form.Item>
          <Button type="primary" onClick={handleClick} loading={loading}>
            Change Password
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ChangePassword;
