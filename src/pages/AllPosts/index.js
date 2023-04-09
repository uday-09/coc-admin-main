import React from "react";
import { useState, useEffect } from "react";
import { Api } from "../../api";
import { Card, Avatar, Button, Modal, Typography, Space } from "antd";
import "./styles.css";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import ErrorPage from "../../components/ErrorPage";

function AllPosts() {
  const [lodingAllPosts, setLoadingAllPosts] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [handleModal, setHandleModal] = useState({
    isOpen: false,
    modalData: null,
  });
  const [err, setErr] = useState("");

  const fetchAllPosts = async () => {
    try {
      setLoadingAllPosts(true);
      const response = await Api.get("/admin/post/status");
      setAllPosts([...response.data?.posts] || []);
    } catch (err) {
      console.log(err);
      setErr(err?.response?.message || err?.message || "Something went wrong!");
    } finally {
      setLoadingAllPosts(false);
    }
  };

  useEffect(() => {
    setErr("");
    fetchAllPosts();
  }, []);

  console.log("recent posts from tab-->", allPosts);

  // const handleAccept = (modalDataItem) => {
  //   console.log(modalDataItem);
  //   setHandleModal({ isOpen: true, modalData: modalDataItem });
  // };

  const resetModal = () => {
    setHandleModal({ isOpen: false, modalData: {} });
  };

  if (err) {
    return <ErrorPage errorMessage={err}></ErrorPage>;
  }

  if (!lodingAllPosts && allPosts.length === 0) {
    return <ErrorPage errorMessage="No data found at the moment!"></ErrorPage>;
  }

  return (
    <Spin spinning={lodingAllPosts}>
      <div className="pending-posts-container">
        <Modal
          open={handleModal.isOpen}
          onOk={resetModal}
          onCancel={resetModal}
        >
          <Space>
            <Card
              onClick={() => {}}
              style={{
                width: 200,
                height: 400,
              }}
              cover={
                <img
                  alt="Post-item"
                  src={handleModal?.modalData?.imageUri}
                  style={{ width: 300, height: 200 }}
                />
              }
            >
              <Card.Meta
                avatar={
                  <Avatar src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1679688256~exp=1679688856~hmac=cb8f03c31dbaae05837ef2384f5b75da96a6b0a9a3809bcfd1593da1c6b57705" />
                }
                title={handleModal?.modalData?.title}
                description={handleModal?.modalData?.description}
              />
            </Card>
            <div>
              <Typography.Title>Are you sure!</Typography.Title>
              <Typography.Paragraph>
                You are ACCEPTING THIS POST. Now every one can see this post!
              </Typography.Paragraph>
            </div>
          </Space>
        </Modal>

        {allPosts.map((item, index) => {
          return (
            <Card
              hoverable={true}
              key={index}
              loading={lodingAllPosts}
              style={{
                width: 350,
                marginLeft: 15,
                marginBottom: 15,
              }}
              cover={
                <img
                  alt="Post-item"
                  src={item?.imageUri}
                  style={{ width: 350, height: 200 }}
                />
              }
              actions={[
                <Link to={`/view/post/${item?._id}`}>
                  {
                    <Button type="primary">
                      {item?.postStatus === "accepted" ? "Reject" : "Accept"}
                    </Button>
                  }
                </Link>,
                <Link to={`/view/post/${item?._id}`}>
                  <Button>View More</Button>
                </Link>,
                <Link to={`/view/post/${item?._id}`}>
                  <Button
                    style={{
                      backgroundColor:
                        item?.postStatus === "accepted"
                          ? "rgba(0,225,0, 0.5)"
                          : item?.postStatus === "rejected"
                          ? "rgba(225,0,0,0.5)"
                          : "orange",
                    }}
                  >
                    {item?.postStatus}
                  </Button>
                </Link>,
              ]}
            >
              <Card.Meta
                avatar={
                  <Avatar
                    src={
                      item?.postedUserInfo?.profilePic ||
                      "https://joesch.moe/api/v1/random"
                    }
                  />
                }
                title={item?.title.substring(0, 50) + "..."}
                description={item?.description.substring(0, 50) + "..."}
              />
            </Card>
          );
        })}
      </div>
    </Spin>
  );
}

export default AllPosts;
