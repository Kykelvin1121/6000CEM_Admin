import "./editproduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import EditForm from "../../components/EditFormComponent/EditForm";
import { productUpdate } from "../../formSource";

const EditProduct = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <EditForm
          title="Edit Product"
          collectionName={"products"}
          formConfig={productUpdate}
          showImageUpload={true}
        />
      </div>
    </div>
  );
};

export default EditProduct;
