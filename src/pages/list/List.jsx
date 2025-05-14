import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DataTable from "../../components/datatable/DataTable";

const List = () => {
  return (
    <div>
      <h1 className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <DataTable />
        </div>
      </h1>
    </div>
  );
};

export default List;
