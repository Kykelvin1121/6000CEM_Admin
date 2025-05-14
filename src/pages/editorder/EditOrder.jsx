import "./editorder.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import EditForm from "../../components/EditFormComponent/EditForm";
import { orderUpdate } from "../../formSource";

const EditOrder = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <EditForm
          title="Edit Order"
          collectionName={"orders"}
          formConfig={orderUpdate}
          showImageUpload={false}
        />
      </div>
    </div>
  );
};

export default EditOrder;
