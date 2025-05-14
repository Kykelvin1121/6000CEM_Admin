import "./order.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import OrderTable from "../../components/datatable/OrderTable";

const Order = () => {
  return (
    <div>
      <h1 className="order">
        <Sidebar />
        <div className="orderContainer">
          <Navbar />
          <OrderTable />
        </div>
      </h1>
    </div>
  );
};

export default Order;
