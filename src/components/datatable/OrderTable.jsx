import "./ordertable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { orderColumns } from "../../datatablesource";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const OrderTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "orders"),
      (snapShot) => {
        const list = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Orders fetched:", list); // Debug: see if username exists
        setData(list);
      },
      (error) => {
        console.log("Error fetching orders:", error);
      }
    );
    return () => unsub();
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
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

  const customOrderColumns = orderColumns
    .map((col) => {
      if (col.field === "selectedWarehouse") {
        return { ...col, hide: true };
      }

      // Special handling for array fields
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

      // Ensure username fallback if undefined
      if (col.field === "username") {
        return {
          ...col,
          valueGetter: (params) => params.row.username || "Unknown",
        };
      }

      return col;
    })
    .filter((col) => !col.hide)
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
    <div className="ordertable">
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
