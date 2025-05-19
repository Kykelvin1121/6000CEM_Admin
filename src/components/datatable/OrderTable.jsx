import "./ordertable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { orderColumns } from "../../datatablesource";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const OrderTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "orders"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "orders", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* View button is hidden but present */}
            <div className="viewButton" style={{ display: "none" }}>
              View
            </div>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>

            <Link
              to={`/order/edit/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="editButton">Edit</div>
            </Link>
          </div>
        );
      },
    },
  ];

  const customOrderColumns = orderColumns.map((column) => {
    if (column.field === "title" || column.field === "qty") {
      return {
        ...column,
        valueGetter: (params) => {
          if (params.row.products && Array.isArray(params.row.products)) {
            return params.row.products.map((product) => product[column.field]);
          }
          return ""; // Return empty string if "products" is undefined or not array
        },
      };
    }
    return column;
  });

  return (
    <div className="datatable">
      <div className="tableTitle">Order List</div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={customOrderColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default OrderTable;
