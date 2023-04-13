import React, { useState, useContext } from "react";
import { Button, Form, Input, Modal, Space, Typography } from "antd";
import { LOGIN_IMAGE } from "../../Utils/constants";
import { nonAuthApi } from "../../api/nonAuth";
import { UserContext } from "../../Context/userContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [uname, setUname] = useState("");
  const [pword, setPword] = useState("");
  const { addToken, addUser } = useContext(UserContext);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    userName: "",
    newpassword: "",
    bio: "",
    location: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleOnClick = async () => {
    console.log(uname, pword);
    try {
      setLoading(true);
      setErr("");
      const response = await nonAuthApi.post("/user/login", {
        username: uname,
        password: pword,
      });
      console.log(response.data, response.data?.token);

      addUser(response?.data?.user);
      Cookies.set("admin-token", response?.data?.token);
      addToken(response?.data?.token);
      setOpen(false);
      navigate("/");
    } catch (err) {
      setErr(
        err?.response?.data?.message || err?.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
      window.location.reload(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setErr("");
    console.log("Clicked");
    try {
      const response = await nonAuthApi.post("/user", {
        ...details,
        username: details.userName,
        password: details.newpassword,
      });

      addUser(response?.data?.user);
      Cookies.set("admin-token", response?.data?.token);
      addToken(response?.data?.token);
      setOpen(false);
      navigate("/");
    } catch (err) {
      setErr(
        err?.response?.data?.message || err?.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
      window.location.reload(false);
    }
  };

  return (
    <>
      <Modal open={open} footer={null}>
        <Space
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!signUp && (
            <img style={{ width: 200, height: 200 }} src={LOGIN_IMAGE}></img>
          )}

          {!signUp ? (
            <>
              <Form
                layout="row"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 250,
                }}
              >
                <Typography.Title level={5}>LOGIN</Typography.Title>
                <Form.Item label="Username" required={true}>
                  <Input onChange={(e) => setUname(e.target.value)}></Input>
                </Form.Item>
                <Form.Item label="Password" required={true}>
                  <Input
                    required={true}
                    type="password"
                    onChange={(e) => setPword(e.target.value)}
                  ></Input>
                </Form.Item>
                {err ? (
                  <Typography.Text style={{ paddingBottom: 10, color: "red" }}>
                    {err}
                  </Typography.Text>
                ) : null}
                <Button
                  type="primary"
                  onClick={handleOnClick}
                  loading={loading}
                >
                  Login
                </Button>
              </Form>
            </>
          ) : (
            <>
              <Form
                style={{
                  width: 450,
                  display: "flex",
                  flexDirection: "column",
                }}
                layout="vertical"
              >
                <Typography.Title level={5}>SIGNUP</Typography.Title>
                <Form.Item label="Username" required={true}>
                  <Input
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        userName: e.target.value,
                      }))
                    }
                  ></Input>
                </Form.Item>
                <Form.Item label="Password" required={true}>
                  <Input
                    type="password"
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        newpassword: e.target.value,
                      }))
                    }
                  ></Input>
                </Form.Item>
                <Form.Item label="Name" required={true}>
                  <Input
                    onChange={(e) =>
                      setDetails((prev) => ({ ...prev, name: e.target.value }))
                    }
                  ></Input>
                </Form.Item>
                <Form.Item label="Email" required={true}>
                  <Input
                    onChange={(e) =>
                      setDetails((prev) => ({ ...prev, email: e.target.value }))
                    }
                  ></Input>
                </Form.Item>
                <Form.Item label="Location" required={true}>
                  <Input
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                  ></Input>
                </Form.Item>
                <Form.Item label="Bio" required={true}>
                  <Input.TextArea
                    onChange={(e) =>
                      setDetails((prev) => ({ ...prev, bio: e.target.value }))
                    }
                  ></Input.TextArea>
                </Form.Item>
                {err ? (
                  <Typography.Text style={{ paddingBottom: 10, color: "red" }}>
                    {err}
                  </Typography.Text>
                ) : null}
                <Button
                  type="primary"
                  onClick={handleSignup}
                  loading={loading}
                  style={{ width: 300, alignSelf: "center" }}
                >
                  SingUp
                </Button>
              </Form>
            </>
          )}
        </Space>
        <Typography.Text
          style={{ color: "blue", padding: 10 }}
          onClick={() => {
            setSignUp(!signUp);
            setDetails({
              name: "",
              userName: "",
              newpassword: "",
              bio: "",
              location: "",
              email: "",
            });
            setUname("");
            setPword("");
          }}
        >
          <a href="#">
            {!signUp
              ? `Don't have account? Signup here!`
              : `Already have account? Signin here!`}
          </a>
        </Typography.Text>
      </Modal>
    </>
  );
}

export default LoginPage;
