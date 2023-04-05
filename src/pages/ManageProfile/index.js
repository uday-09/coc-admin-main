import React from "react";
import { useRef, useState, useEffect } from "react";
import "./styles.css";
import { Button, Form, Input, Typography } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Api } from "../../api";
const AVATAR =
  "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1679688256~exp=1679688856~hmac=cb8f03c31dbaae05837ef2384f5b75da96a6b0a9a3809bcfd1593da1c6b57705";

function ManageProfile() {
  const fileRef = useRef(null);
  const [dp, setDp] = useState(null);
  const [userInfo, setuserInfo] = useState({});
  const [details, setDetails] = useState({
    name: "",
    username: "",
    email: "",
    address: "",
    age: 0,
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const handlePicker = () => {
    fileRef.current.click();
  };

  const getMe = async () => {
    try {
      const response = await Api.get("/user/me");
      setuserInfo(response.data);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    setDetails((prev) => {
      return {
        name: userInfo?.name || "",
        username: userInfo?.username || "",
        email: userInfo?.email || "",
        bio: userInfo?.bio || "",
        address: userInfo?.location || "",
        age: userInfo?.age || "",
      };
    });
  }, [userInfo]);

  const handleUpdate = async () => {
    setErr("");
    try {
      setLoading(true);
      const response = await Api.patch("/user/update/me", {
        username: details.username,
        email: details.email,
        location: details.address,
        age: parseInt(details.age),
        name: details.name,
        bio: details.bio,
      });
      setSuccess(true);
    } catch (err) {
      setErr(
        err?.response?.data?.messsage ||
          err.messsage ||
          "Something Went wrong. Try again later!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography.Title level={4}>Edit your profile here</Typography.Title>
      <div className="manage-user-body">
        <Form
          layout="vertical"
          style={{
            width: 500,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="image-picker-container">
            <div onClick={handlePicker} className="image-picker">
              <img
                alt="profile-pic"
                src={dp || AVATAR}
                className="dp-styles"
              ></img>
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileRef}
                onChange={(e) => setDp(URL.createObjectURL(e.target.files[0]))}
              ></input>
            </div>
            <div
              onClick={handlePicker}
              style={{
                alignSelf: "flex-end",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 50,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                marginBottom: 15,
                position: "relative",
                right: 45,
                backgroundColor: "white",
              }}
            >
              <CloudUploadOutlined style={{ fontSize: 20 }} />
            </div>
          </div>
          <Form.Item label="Username">
            <Input
              placeholder="Ex: admin_123"
              value={details.username}
              onChange={(e) =>
                setDetails({ ...details, username: e.target.value })
              }
            ></Input>
          </Form.Item>
          <Form.Item label="Name">
            <Input
              value={details.name}
              placeholder="Ex: Emmanuel"
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
            ></Input>
          </Form.Item>
          <Form.Item label="Bio">
            <Input.TextArea
              value={details.bio}
              onChange={(e) => setDetails({ ...details, bio: e.target.value })}
              rows={4}
              placeholder="Ex: Myself admin of cop-on-cloud"
            ></Input.TextArea>
          </Form.Item>
          <Form.Item label="Email">
            <Input
              value={details.email}
              placeholder="Ex: admin123@gmail.com"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
            ></Input>
          </Form.Item>
          <Form.Item label="Address">
            <Input
              value={details.address}
              placeholder="Ex: Texas, California, USA"
              onChange={(e) =>
                setDetails({ ...details, address: e.target.value })
              }
            ></Input>
          </Form.Item>
          <Form.Item label="Age">
            <Input
              value={details.age}
              placeholder="Enter age here..."
              onChange={(e) => setDetails({ ...details, age: e.target.value })}
            ></Input>
          </Form.Item>
          {err && (
            <Typography.Text style={{ color: "red" }}>{err}</Typography.Text>
          )}
          {success && (
            <Typography.Text style={{ color: "green" }}>
              Succefully updated your profile!
            </Typography.Text>
          )}
          <Button
            type="primary"
            onClick={() => handleUpdate()}
            loading={loading}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ManageProfile;
