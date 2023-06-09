import { Form, Input, Checkbox, Card, Typography, Button } from "antd";
import React, { useState, useEffect, useRef, useCallback } from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import { Api } from "../../api";
import { Link } from "react-router-dom";
import Notify from "../../components/Notify";

function RejectPostForm() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [reason, setReason] = useState([]);
  const textareaRef = useRef("");
  const [rejecting, setRejecting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [notify, setNotify] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [err, setErr] = useState("");
  const [note, setNote] = useState("");

  const getCurrentPost = async () => {
    try {
      const resp = await Api.get(`/coc/get/post/${id}`);
      const userResp = await Api.get(`/user/${resp.data?.postedBy}`);
      setPostData(resp.data);
      setUserInfo(userResp.data?.user);
      console.log(userResp);
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    getCurrentPost();
  }, []);

  console.log(userInfo);

  const handleSubmit = async () => {
    const customReasonValue = textareaRef.current;

    let reasons = reason.map((item, index) => {
      return { reason: item };
    });

    if (note) {
      reasons = [...reasons, { reason: note }];
    }

    console.log(reasons);

    setErr("");
    if (!userInfo || !postData) {
      setNotify(true);
      return;
    }

    try {
      setRejecting(true);

      const res = await Api.post(`/send/post-status`, {
        username: userInfo?.username,
        postTitle: postData?.title,
        imageUri: postData?.imageUri,
        reciever: userInfo?.email,
        reasons: reasons,
      });

      console.log(res);

      const result = await Api.patch(`/admin/update-status/${id}`, {
        status: "rejected",
      });
      console.log("Api result from reject--->", result);
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      setErr(
        err?.response?.data?.message || err.message || "Something went wrong!"
      );
    } finally {
      setRejecting(false);
      setNotify(true);
      window.scrollTo(0, 0);
    }
    console.log(customReasonValue);
  };

  const checKBoxOptions = [
    {
      label: "Image/Video is not relavant to Subject",
      value: "Image/Video is not relavant to Subject",
    },
    {
      label: "Title and Description are not relavant",
      value: "Title and Description are not relavant",
    },
    {
      label: "Not enough description provided",
      value: "Not enough description provided",
    },
    {
      label: "Post found to be misleading",
      value: "Post found to be misleading",
    },
    {
      label: "Post found to be Offensive",
      value: "Post found to be Offensive",
    },
    {
      label: "Post found to be False information",
      value: "Post found to be False information",
    },
  ];

  const onChange = (checkedValues) => {
    setReason(checkedValues);
  };

  const notifyClose = useCallback(() => {
    setNotify(false);
  }, [notify]);

  const onTimeOut = useCallback(() => {
    setNotify(false);
  }, [notify]);

  return (
    <>
      <Notify
        show={notify}
        success={success}
        message={success ? "Post has been successfully rejected!" : err}
        onClose={notifyClose}
        onTimeOut={onTimeOut}
      ></Notify>
      <div className="reject-post-body">
        <Card
          cover={
            <>
              {postData?.imageUri.endsWith("mp4") ||
              postData?.imageUri.endsWith("mkv") ? (
                <video controls style={{ width: 600, height: 200 }}>
                  <source src={postData?.imageUri} type="video/mp4" />
                </video>
              ) : (
                <img
                  alt="Post-postData"
                  src={postData?.imageUri}
                  style={{ width: 600, height: 200 }}
                />
              )}
            </>
          }
          style={{ maxWidth: 600 }}
        >
          <Typography.Title level={5}>{postData?.title}</Typography.Title>
          <Form style={{ width: 500, marginTop: 20 }} layout="vertical">
            <Form.Item label="Common Reasons Templates">
              <Checkbox.Group
                options={checKBoxOptions}
                onChange={onChange}
                style={{ flexDirection: "column" }}
              />
            </Form.Item>
            <Form.Item label="Write Custom Reason/Note here...">
              <Input.TextArea
                rows={6}
                ref={textareaRef}
                onChange={(e) => setNote(e.target.value)}
              ></Input.TextArea>
            </Form.Item>
            <Form.Item>
              <Checkbox checked={true}>
                An email will be sent to user regarding the rejection of this
                post
              </Checkbox>
            </Form.Item>
          </Form>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link to={`/view/post/${id}`}>
              <Button>Go Back</Button>
            </Link>
            <Button
              type="primary"
              loading={rejecting}
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}

export default RejectPostForm;
