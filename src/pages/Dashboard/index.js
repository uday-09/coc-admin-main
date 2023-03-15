import { Card, Space, Statistic, Table, Typography } from "antd";
import React, { useState, useEffect } from "react";
import "./styles.css";
import { FiList, FiAlertCircle } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineStop } from "react-icons/ai";

const RecentPosts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const pending = await fetch("https://dummyjson.com/posts");
      const result = await pending.json();
      setData(result.posts);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Table
      columns={[
        {
          title: "Title",
          dataIndex: "title",
        },
        {
          title: "Description",
          dataIndex: "body",
        },
        {
          title: "Tags",
          dataIndex: "tags",
        },
        {
          title: "User Id",
          dataIndex: "userId",
        },
        {
          title: "Reactions",
          dataIndex: "reactions",
        },
      ]}
      dataSource={data}
      loading={loading}
    ></Table>
  );
};

const DashboardCard = ({ title, value, icon }) => {
  return (
    <Card className="cardStyles">
      <Space>
        {icon}
        <Statistic style={{ fontWeight: "bold" }} title={title} value={value} />
      </Space>
    </Card>
  );
};

function Dashboard() {
  return (
    <div style={{ margin: 15 }}>
      <Typography.Title level={3}>Dashboard</Typography.Title>
      <div className="statissticsContainer">
        <DashboardCard
          title={"All Posts"}
          value={500}
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
          value={400}
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
          value={50}
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
          value={350}
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
      <Space>
        <RecentPosts />
      </Space>
    </div>
  );
}

export default Dashboard;
