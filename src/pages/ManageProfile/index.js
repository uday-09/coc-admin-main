import React from "react";
import { useRef, useState, useEffect, useCallback } from "react";
import "./styles.css";
import { Button, Form, Input, Typography } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Api } from "../../api";
import Nofity from "../../components/Notify";

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
  const [notify, setNotify] = useState(false);
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

  console.log(userInfo);

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

  const onTimeOut = useCallback(() => {
    setNotify(false);
  }, [notify]);

  const onClose = useCallback(() => {
    setNotify(false);
  }, []);

  const handleUpdate = async () => {
    setErr("");
    setSuccess(false);
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("image", dp);
      let imageUri = undefined;
      if (dp) {
        console.log("Hey---->");
        const resp = await Api.post("/post/crime/picture", formData);
        imageUri = resp.data?.imageUri;
        console.log("imageUri--->", imageUri);
      }
      const response = await Api.patch("/user/update/me", {
        username: details.username,
        email: details.email,
        location: details.address,
        age: parseInt(details.age),
        name: details.name,
        bio: details.bio,
        profilePic: imageUri || userInfo?.profilePic,
      });
      setSuccess(true);
    } catch (err) {
      console.log(err);
      console.log(err, err?.response?.data?.message);
      setErr(
        err?.response?.data?.message ||
          err.messsage ||
          "Something Went wrong. Try again later!"
      );
    } finally {
      setNotify(true);
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <Nofity
        show={notify}
        message={success ? "Your profile has been updated succesfully!" : err}
        success={success}
        onClose={onClose}
        onTimeOut={onTimeOut}
      />
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
                src={
                  dp ? URL.createObjectURL(dp) : userInfo?.profilePic || AVATAR
                }
                className="dp-styles"
              ></img>
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileRef}
                onChange={(e) => setDp(e.target.files[0])}
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
