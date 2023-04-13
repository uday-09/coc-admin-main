import Cookies from "js-cookie";
import { Navigation, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const navigate = useNavigate();

  const token = Cookies.get("admin-token");
  if (token === undefined) {
    navigate("/login");
  }
  return <Route {...props} />;
};

export default Protected;
