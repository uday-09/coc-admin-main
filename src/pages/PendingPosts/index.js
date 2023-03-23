import { Card } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { Api } from "../../api";

function PendingPosts() {
  const [loadingPengingPosts, setLoadingPendingPosts] = useState(false);
  const [recentPendingPosts, setRecentPendingPosts] = useState([]);

  const fetchPendingPost = async () => {
    try {
      setLoadingPendingPosts(true);
      const response = await Api.get("/admin/post/status?status=accepted");
      setRecentPendingPosts(response.data?.posts || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingPendingPosts(false);
    }
  };

  useEffect(() => {
    fetchPendingPost();
  }, []);

  console.log("recent posts from tab-->", recentPendingPosts);

  return (
    <div>
      {/* {
      recentPendingPosts.map((item, index) => {
        return<>
          <Card ></Card>
        </>
      })
    } */}
      PendingPosts
    </div>
  );
}

export default PendingPosts;
