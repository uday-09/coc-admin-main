import {
  Space,
  Breadcrumb,
  Form,
  Input,
  Radio,
  Checkbox,
  Card,
  Typography,
  Button,
} from "antd";
import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import { Api } from "../../api";
import { Link } from "react-router-dom";

function RejectPostForm() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [reason, setReason] = useState("");
  const textareaRef = useRef("");
  console.log("id from Reject post-->", postData);

  const getCurrentPost = async () => {
    try {
      const resp = await Api.get(`/coc/get/post/${id}`);
      setPostData(resp.data);
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    getCurrentPost();
  }, []);

  const handleSubmit = () => {
    const customReasonValue = textareaRef.current;
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
    console.log(checkedValues);
  };

  return (
    <div className="reject-post-body">
      <Card
        cover={
          <img
            alt="Post-item"
            src={postData?.imageUri}
            style={{ width: "100%", height: 250 }}
          />
        }
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
            <Input.TextArea rows={6} ref={textareaRef}></Input.TextArea>
          </Form.Item>
        </Form>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to={`/view/post/${id}`}>
            <Button>Go Back</Button>
          </Link>
          <Button type="primary" onClick={() => handleSubmit()}>
            Submit
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default RejectPostForm;
