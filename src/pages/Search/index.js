import { SearchOutlined } from "@ant-design/icons";
// const { Button, Input, Space, Table } = antd;
import { Button, Input, Space, Table, Typography } from "antd";
import React, { useRef, useEffect, useState } from "react";
import { Api } from "../../api";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [loadingPengingPosts, setLoadingPendingPosts] = useState(false);
  const [recentPendingPosts, setRecentPendingPosts] = useState([]);

  const fetchPendingPost = async () => {
    try {
      setLoadingPendingPosts(true);
      const response = await Api.get("/admin/post/status");
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      console.log("hehe", record[dataIndex], value.toLowerCase());
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        // <Highlighter
        //   highlightStyle={{
        //     backgroundColor: "#ffc069",
        //     padding: 0,
        //   }}
        //   searchWords={[searchText]}
        //   autoEscape
        //   textToHighlight={text ? text.toString() : ""}
        // />
        <Typography.Text>{text}</Typography.Text>
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "postedBy",
      dataIndex: "username",
      key: "name",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "age",
      render: (title) => {
        return (
          <>
            <Typography.Paragraph>
              {title.substring(0, 50)}
            </Typography.Paragraph>
          </>
        );
      },
      ...getColumnSearchProps("title"),
    },
    {
      title: "Description",
      dataIndex: "description",
      ...getColumnSearchProps("description"),
      render: (description) => {
        return (
          <>
            <Typography.Paragraph>
              {description.substring(0, 50)}
            </Typography.Paragraph>
          </>
        );
      },
      //   sorter: (a, b) => a.address.length - b.address.length,
      //   sortDirections: ["descend", "ascend"],
    },
    {
      title: "Uploaded date",
      dataIndex: "updatedAt",
      ...getColumnSearchProps("updatedAt"),
      render: (updatedAt) => {
        return (
          <>
            <Typography.Paragraph>
              {updatedAt.substring(0, 50)}
            </Typography.Paragraph>
          </>
        );
      },
      //   sorter: (a, b) => a.address.length - b.address.length,
      //   sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "View",
      render: (_id) => {
        return (
          <>
            <Link to={`/view/post/${_id}`}>
              <Typography.Link>Full details</Typography.Link>
            </Link>
          </>
        );
      },
    },
    // <Column
    //     title={"Action"}
    //     dataIndex={"_id"}
    //     render={(_id) => {
    //       return (
    //         <>
    //           <Link to={`/view/post/${_id}`}>
    //             <Typography.Link>Full details</Typography.Link>
    //           </Link>
    //         </>
    //       );
    //     }}
    //   />
  ];
  return (
    <Table
      columns={columns}
      dataSource={recentPendingPosts}
      loading={loadingPengingPosts}
    />
  );
};

export default Search;
