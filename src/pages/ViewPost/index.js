import { Card, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../../api";
import "./styles.css";

// import { Api } from "../../api";

const AVATAR =
  "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1679688256~exp=1679688856~hmac=cb8f03c31dbaae05837ef2384f5b75da96a6b0a9a3809bcfd1593da1c6b57705";

function ViewFullPost() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);

  const getCurrentPost = async () => {
    try {
      const resp = await Api.get(`/coc/get/post/${id}`);
      setPostData(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    getCurrentPost();
  }, [id]);

  console.log(postData);

  return (
    <div className="view-post-container">
      <Space>
        <Card>
          <h4>Posted by</h4>
          <div className="image-container">
            <img src={AVATAR} alt="avatar" className="avatar-styles"></img>
          </div>
        </Card>

        <div>
          <Card>Post information goes here</Card>
        </div>
      </Space>
    </div>
  );
}

export default ViewFullPost;
