import profileIcon from "../src/images/pfpicon.png";

// Detect screen size for responsive column rendering
const smallScreenQuery = window.matchMedia("(max-width: 1080px)");

// USER TABLE COLUMNS
export const userColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
  },
  {
    field: "img",
    headerName: "",
    width: smallScreenQuery.matches ? 0 : 50,
    renderCell: (params) => (
      <div className="cellWithImg">
        {!smallScreenQuery.matches && (
          <img
            className="cellImg"
            src={params.row.img || profileIcon}
            alt="avatar"
          />
        )}
      </div>
    ),
  },
  {
    field: "username",
    headerName: "Username",
    width: 200,
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
    renderCell: (params) => {
      let label = "";
      switch (params.value) {
        case "super_admin":
          label = "Super Admin";
          break;
        case "admin":
          label = "Admin";
          break;
        case "user":
          label = "User";
          break;
        default:
          label = params.value || "N/A";
          break;
      }
      return <div>{label}</div>;
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "address",
    headerName: "Address",
    width: 250,
  },
];

// PRODUCT TABLE COLUMNS
export const productColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => (
      <div className="cellWithImg">
        <img
          className="cellImg"
          src={params.row.img || profileIcon}
          alt="product"
        />
        {params.row.username}
      </div>
    ),
  },
  {
    field: "title",
    headerName: "Product Name",
    width: 150,
  },
  {
    field: "price",
    headerName: "Product Price",
    width: 100,
  },
  {
    field: "quantity",
    headerName: "Total Quantity",
    width: 100,
    hide: true,
  },
  {
    field: "status",
    headerName: "Product Status",
    width: 150,
  },
];

// ORDER TABLE COLUMNS
export const orderColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "title",
    headerName: "Product Title",
    width: 250,
  },
  {
    field: "qty",
    headerName: "Quantity",
    width: 100,
  },
  {
    field: "status",
    headerName: "Order Status",
    width: 100,
  },
  {
    field: "totalPrice",
    headerName: "Total Paid",
    width: 100,
  },
  {
    field: "username",
    headerName: "Customer Name",
    width: 150,
  },
  {
    field: "timeStamp",
    headerName: "Order Date",
    width: 200,
    valueFormatter: (params) => {
      if (params.value && params.value.toDate) {
        const date = params.value.toDate();
        return date.toLocaleString();
      }
      return "";
    },
  },
];
