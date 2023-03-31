import { Card, Space, Statistic, Table, Tag, Typography } from "antd";
import React, { useState, useEffect } from "react";
import "./styles.css";
import { FiList, FiAlertCircle } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineStop } from "react-icons/ai";
import { Api } from "../../api";
import Column from "antd/es/table/Column";
import { Link } from "react-router-dom";

const RecentPosts = () => {
  const [loadingPengingPosts, setLoadingPendingPosts] = useState(false);
  const [recentPendingPosts, setRecentPendingPosts] = useState([]);

  const fetchPendingPost = async () => {
    try {
      setLoadingPendingPosts(true);
      const response = await Api.get("/admin/post/status?status=pending");
      setRecentPendingPosts(() => {
        return response.data?.posts.map((item) => {
          const middle = { ...item, ...item?.postedUserInfo };
          delete middle?.postedUserInfo;
          return middle;
        });
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingPendingPosts(false);
    }
  };

  useEffect(() => {
    fetchPendingPost();
  }, []);

  console.log("recentPendingPosts-->", recentPendingPosts);

  return (
    <Table
      // columns={[
      //   {
      //     title: "Title",
      //     dataIndex: "title",
      //   },
      //   {
      //     title: "Description",
      //     dataIndex: "description",
      //   },
      //   {
      //     title: "Posted By",
      //     dataIndex: "username",
      //   },
      //   {
      //     title: "Location",
      //     dataIndex: "location",
      //   },
      //   {
      //     title: "Uploaded On",
      //     dataIndex: "updatedAt",
      //   },
      // ]}
      dataSource={recentPendingPosts}
      loading={loadingPengingPosts}
    >
      <Column title="Posted By" dataIndex={"username"} key={"username"} />
      <Column
        title="Title"
        dataIndex={"title"}
        key={"title"}
        render={(title) => {
          return (
            <>
              <Typography.Paragraph>
                {title.substring(0, 50)}
              </Typography.Paragraph>
            </>
          );
        }}
      />
      <Column
        title="Description"
        dataIndex={"description"}
        key={"description"}
        render={(title) => {
          return (
            <>
              <Typography.Paragraph>
                {title.substring(0, 50)}
              </Typography.Paragraph>
            </>
          );
        }}
      />
      <Column
        title="Tags"
        dataIndex={"tags"}
        render={(item) => {
          return (
            <>
              {item.map((tag) => {
                // console.log(tag);
                return <Tag color="blue"> {tag}</Tag>;
              })}
            </>
          );
        }}
      />
      <Column
        title={"Action"}
        dataIndex={"_id"}
        render={(_id) => {
          return (
            <>
              <Link to={`/view/post/${_id}`}>
                <Typography.Link>Full details</Typography.Link>
              </Link>
            </>
          );
        }}
      />
    </Table>
  );
};

const DashboardCard = ({ title, value, icon, loading }) => {
  return (
    <Card className="cardStyles">
      <Space>
        {icon}
        <Statistic
          loading={loading}
          style={{ fontWeight: "bold" }}
          title={title}
          value={value}
        />
      </Space>
    </Card>
  );
};

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    acceptedPostCount: 0,
    pendingPostsCount: 0,
    rejectedPostsCount: 0,
    allPostsCount: 0,
  });

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await Api.get("/admin/stats");
      setStats({
        ...stats,
        acceptedPostCount: response.data?.stats?.acceptedPostCount,
        rejectedPostsCount: response.data?.stats?.rejectedPostsCount,
        pendingPostsCount: response.data?.stats?.pendingPostsCount,
        allPostsCount: response.data?.stats?.allPostsCount,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div style={{ margin: 15 }}>
      <Typography.Title level={3}>Dashboard</Typography.Title>
      <div className="statissticsContainer">
        <DashboardCard
          title={"All Posts"}
          value={stats.allPostsCount}
          loading={loading}
          icon={
            <FiList
              style={{
                fontSize: 24,
                padding: 10,
                borderRadius: 10,
                backgroundColor: "rgba(0, 0, 225, 0.25)",
                marginRight: 10,
                color: "rgba(0, 0, 225, 1)",
              }}
            />
          }
        ></DashboardCard>
        <DashboardCard
          title={"Accepted Posts"}
          value={stats.acceptedPostCount}
          loading={loading}
          icon={
            <AiOutlineCheckCircle
              style={{
                fontSize: 24,
                padding: 10,
                borderRadius: 10,
                backgroundColor: "rgba(0, 225, 0, 0.25)",
                color: "rgba(0, 225,0, 1)",
                marginRight: 10,
              }}
            />
          }
        ></DashboardCard>
        <DashboardCard
          title={"Pending Posts"}
          loading={loading}
          value={stats.pendingPostsCount}
          icon={
            <FiAlertCircle
              style={{
                fontSize: 24,
                padding: 10,
                borderRadius: 10,
                backgroundColor: "rgba(110, 0, 110, 0.25)",
                color: "rgba(110, 0, 110, 1)",
                marginRight: 10,
              }}
            />
          }
        ></DashboardCard>
        <DashboardCard
          title={"Rejected Posts"}
          loading={loading}
          value={stats.rejectedPostsCount}
          icon={
            <AiOutlineStop
              style={{
                fontSize: 24,
                padding: 10,
                borderRadius: 10,
                backgroundColor: "rgba(225, 0, 0, 0.25)",
                color: "rgba(225, 0, 0, 1)",
                marginRight: 10,
              }}
            />
          }
        ></DashboardCard>
      </div>
      <Typography.Title level={4}>Recent Posts</Typography.Title>
      <RecentPosts />
    </div>
  );
}

export default Dashboard;
