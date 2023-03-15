import { Typography } from "antd";
import React from "react";
import "./styles.css";

function AppFooter() {
  return (
    <div className="AppFooter">
      <Typography.Link href="tel:+1234567890">+1234567890</Typography.Link>
      <Typography.Link href="www.google.com">Privacy Policy</Typography.Link>
      <Typography.Link href="www.google.com">Contact Us</Typography.Link>
    </div>
  );
}

export default AppFooter;
