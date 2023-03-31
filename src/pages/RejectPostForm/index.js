import { Space, Breadcrumb, Form, Input, Radio, Checkbox } from "antd";
import React, { useState, useEffect } from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import { Api } from "../../api";

function RejectPostForm() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
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

  return (
    <div className="reject-post-body">
      <Form style={{ width: 500 }}>
        <Form.Item label="Common Reasons Templates">
          {/* <Radio.Group style={{ display: "flex", flexDirection: "column" }}>
            <Radio value="apple"> Apple </Radio>
            <Radio value="pear"> Pear </Radio>
          </Radio.Group> */}
          <Checkbox.Group>
            <Checkbox>Image/Video is not relavant to Subject</Checkbox>
            <Checkbox>Title and Description are not relavant</Checkbox>
            <Checkbox>Not enough description provided</Checkbox>
            <Checkbox>Post found to be misleading</Checkbox>
            <Checkbox>Post found to be Offensive</Checkbox>
            <Checkbox>Post found to be False information</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="Why rejecting post?">
          <Input></Input>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RejectPostForm;
