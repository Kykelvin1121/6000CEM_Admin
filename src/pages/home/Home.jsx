import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import List from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="sales" />
          <Widget type="orders" />
          <Widget type="earning" />
          <Widget type="users" />
        </div>
        <div className="charts">
          <Chart />
          <Featured />
        </div>
      </div>
    </div>
  );
};

export default Home;
