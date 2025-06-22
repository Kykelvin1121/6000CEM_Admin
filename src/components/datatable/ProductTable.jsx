import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          quantity:
            (doc.data().wh1qty || 0),
        }));
        setProducts(products);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error(error);
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
            <Link
              to={`/product/edit/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="editButton">Edit</div>
            </Link>
          </div>
        );
      },
    },
  ];

  // Mark warehouse quantity columns as hidden
  const customProductColumns = productColumns.map((col) => {
    if (["wh1qty", "wh2qty", "wh3qty"].includes(col.field)) {
      return { ...col, hide: true }; // keep but hidden
    }
    return col;
  });

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Product List
        <Link to="/product/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={products}
        columns={customProductColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default ProductTable;
