import React from "react";
import "./styles.css";
import { Typography } from "antd";

function ErrorPage({ errorMessage = "OOPS! Something went wrong." }) {
  return (
    <div className="centered">
      <img
        style={{ width: 300, height: 300 }}
        alt="error"
        src="https://img.freepik.com/free-vector/feeling-sorry-concept-illustration_114360-3950.jpg?w=740&t=st=1680541242~exp=1680541842~hmac=991d285b516f8c806e492c2f793dfe982c5ac23a7c67f4ce9a720620bebb94f2"
      ></img>
      <Typography.Title level={4}>{errorMessage}</Typography.Title>
    </div>
  );
}

export default ErrorPage;
