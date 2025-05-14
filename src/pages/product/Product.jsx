import "./product.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ProductTable from "../../components/datatable/ProductTable";

const Product = () => {
  return (
    <div>
      <h1 className="product">
        <Sidebar />
        <div className="productContainer">
          <Navbar />
          <ProductTable />
        </div>
      </h1>
    </div>
  );
};

export default Product;
