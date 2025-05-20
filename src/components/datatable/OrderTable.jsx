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
    // Real-time listener for Firestore "orders" collection
    const unsub = onSnapshot(
      collection(db, "orders"),
      (snapShot) => {
        const list = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(list);
      },
      (error) => {
        console.log("Error fetching orders:", error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "orders", id));
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
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
      ),
    },
  ];

  // Custom columns: filter out hidden, override values, and add shippingAddress
  const customOrderColumns = orderColumns
    .map((col) => {
      if (col.field === "selectedWarehouse") {
        return { ...col, hide: true };
      }
      return col;
    })
    .filter((col) => !col.hide) // filter out hidden columns
    .map((col) => {
      if (col.field === "title" || col.field === "qty") {
        return {
          ...col,
          valueGetter: (params) => {
            const products = params.row.products;
            if (Array.isArray(products)) {
              return products.map((product) => product[col.field]).join(", ");
            }
            return "";
          },
        };
      }
      return col;
    })
    .concat([
      {
        field: "shippingAddress",
        headerName: "Shipping Address",
        width: 250,
        valueGetter: (params) => {
          const addr = params.row.shippingAddress;
          if (typeof addr === "string") return addr;
          if (typeof addr === "object" && addr !== null) {
            return `${addr.street || ""} ${addr.city || ""} ${addr.zip || ""}`.trim();
          }
          return "";
        },
      },
    ]);

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
