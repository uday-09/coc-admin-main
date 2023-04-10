import { Button, Card, Modal, Spin, Tag, Typography, Result } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../../api";
import "./styles.css";
import Acceptmodal from "../../components/AcceptModal";
import RejectModal from "../../components/RejectModal";
import { Link } from "react-router-dom";

// import { Api } from "../../api";

const AVATAR =
  "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1679688256~exp=1679688856~hmac=cb8f03c31dbaae05837ef2384f5b75da96a6b0a9a3809bcfd1593da1c6b57705";

function ViewFullPost() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [err, setErr] = useState("");
  const [rejectModalopen, setRejectPostModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [userInfoLoading, setUserInfoLoading] = useState(false);
  const [assetType, setAssetType] = useState("image");

  const handleAcceptPost = async () => {
    setLoading(true);
    setErr("");
    Api.patch(`/admin/update-status/${id}`, {
      status: "accepted",
    })
      .then((resp) => {
        setResultModalOpen(true);
      })
      .catch((err) => {
        setErr(err.message || "Something went wrong!");
        setResultModalOpen(true);
      })
      .finally(() => {
        setLoading(false);
        setModalOpen(false);
      });
  };

  const handleRejectPost = async () => {
    try {
      setRejectPostModal(true);
    } catch (err) {
    } finally {
      setRejectPostModal(false);
    }
  };

  const getCurrentPost = async () => {
    try {
      const resp = await Api.get(`/coc/get/post/${id}`);
      setPostData(resp.data);
      const asset = resp?.data?.imageUri.split(".").pop();
      console.log("assetType---->", asset);
      if (asset === "mp4" || asset === "mkv") {
        setAssetType("video");
      } else {
        setAssetType("image");
      }
    } catch (err) {
    } finally {
    }
  };

  const getUserInfo = async () => {
    try {
      setUserInfoLoading(true);
      const response = await Api.get(`/user/${postData.postedBy}`);
      setUserInfo(response.data?.user);
    } catch (err) {
    } finally {
      setUserInfoLoading(false);
    }
  };

  useEffect(() => {
    if (!postData) {
      getCurrentPost();
    }
  }, [id]);

  useEffect(() => {
    console.log(postData, postData?.postedBy);
    getUserInfo();
  }, [postData]);

  console.log("userInfo--->", assetType);

  return (
    <Spin spinning={loading}>
      <div className="view-post-container">
        <Modal
          open={resultModalOpen}
          onOk={() => setResultModalOpen(false)}
          onCancel={() => setResultModalOpen(false)}
        >
          {!err ? (
            <Result
              status={"success"}
              title="Post has been succefully accepted!"
            ></Result>
          ) : (
            <Result
              status={"500"}
              title="Something went wrong! Try again later"
            ></Result>
          )}
        </Modal>

        <Acceptmodal
          open={modalOpen}
          onOk={() => {
            handleAcceptPost();
          }}
          onCancel={() => {
            setModalOpen(false);
            console.log("Cancelled clicked");
          }}
          modalData={postData}
        ></Acceptmodal>
        <RejectModal
          modalData={postData}
          open={rejectModalopen}
          onOk={() => handleRejectPost()}
          onCancel={() => setRejectPostModal(false)}
        ></RejectModal>
        <Card
          style={{ alignSelf: "flex-start", marginRight: 20 }}
          loading={userInfoLoading}
        >
          <h4>Posted by</h4>
          <div className="image-container">
            <Typography.Title level={5}>{`Posted By: ${
              userInfo?.username ? `${userInfo.username}` : `Anonymous`
            }`}</Typography.Title>
            <Typography.Title level={5}>{`Location: ${
              userInfo?.location ? `${userInfo.location}` : `Anonymous`
            }`}</Typography.Title>
            <Typography.Title level={5}>{`Email: ${
              userInfo?.email ? `${userInfo.email}` : `Anonymous`
            }`}</Typography.Title>
          </div>
        </Card>

        <Card
          style={{
            flexDirection: "column",
            alignItems: "center",
            alignSelf: "flex-start",
            width: 500,
          }}
          cover={
            <>
              {assetType === "image" ? (
                <img
                  className="post-image"
                  src={postData?.imageUri}
                  alt="crime-scene"
                />
              ) : (
                <video width="750" height="500" controls>
                  <source src={postData?.imageUri} type="video/mp4" />
                </video>
              )}
            </>
          }
        >
          <Typography.Title level={5} style={{ paddingTop: 0, marginTop: 0 }}>
            {postData?.title}
          </Typography.Title>
          <Typography.Paragraph>{postData?.description}</Typography.Paragraph>
          <Typography.Title level={5}>Tags:</Typography.Title>
          {postData?.tags ? (
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              {postData.tags.map((tag) => {
                return <Tag color="blue">{tag}</Tag>;
              })}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Link to={`/reject/post/${postData?._id}`}>
              <Button
                danger={true}
                onClick={() => {
                  console.log("Reject clicked");
                  setModalOpen(false);
                  setResultModalOpen(false);
                  setRejectPostModal(true);
                }}
              >
                Reject
              </Button>
            </Link>
            <Button type="primary" onClick={() => setModalOpen(true)}>
              Accept
            </Button>
          </div>
        </Card>
      </div>
    </Spin>
  );
}

export default ViewFullPost;
