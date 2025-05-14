import "./sidebar.scss";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import InventoryIcon from "@mui/icons-material/Inventory";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import logoImage from "../../images/logo.png";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { dispatch: authDispatch } = useContext(AuthContext);

  const { currentUser } = useContext(AuthContext);

  // Assuming currentUser includes a field like 'uid' for the user's ID
  const currentUserID = currentUser ? currentUser.uid : null;

  return (
    <div className="sidebar">
      <div className="top">
        <div>
          <img src={logoImage} alt="Logo" className="logo" />
        </div>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <SpaceDashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LIST</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PeopleIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <ShoppingCartCheckoutIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          {/* <Link to="/inventory" style={{ textDecoration: "none" }}>
          <li>
            <InventoryIcon className="icon" />
            <span>Inventory</span>
          </li>
          </Link> */}
          {/* <p className="title">DATA</p>
          <li>
            <QueryStatsIcon className="icon" />
            <span>Status</span>
          </li>
          <li>
            <AssessmentIcon className="icon" />
            <span>Report</span>
          </li> */}
          <p className="title">USER</p>
          <Link
            to={`/users/${currentUserID}`}
            style={{ textDecoration: "none" }}
          >
            <li>
              <AccountBoxIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <li onClick={() => authDispatch({ type: "LOGOUT" })}>
              <LogoutIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
