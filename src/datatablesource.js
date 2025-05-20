import profileIcon from "../src/images/pfpicon.png";

const smallScreenQuery = window.matchMedia("(max-width: 1080px)");

export const userColumns = [
    {
        field: "id",
        headerName: "ID",
        width: 150,
    },
    {
        field: "img",
        headerName: "",
        width: smallScreenQuery.matches ? 0 : 15, // 0% on small screens, 15% on larger screens
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    {smallScreenQuery.matches ? null : (
                        <img className="cellImg" src={params.row.img ? params.row.img : profileIcon} alt="avatar" />
                    )}
                </div>
            );
        },
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
                    label = params.value;
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
    // "Full Name" column removed here (displayName)
    {
        field: "address",
        headerName: "Address",
        width: 250,
    },
];

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
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.img ? params.row.img : profileIcon} alt="avatar" />
                    {params.row.username}
                </div>
            );
        },
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
    },
    {
        field: "wh1qty",
        headerName: "WH1 Quantity",
        width: 100,
    },
    {
        field: "wh2qty",
        headerName: "WH2 Quantity",
        width: 100,
    },
    {
        field: "wh3qty",
        headerName: "WH3 Quantity",
        width: 100,
    },
    {
        field: "status",
        headerName: "Product Status",
        width: 150,
    }
];

export const orderColumns = [
    {
        field: "id",
        headerName: "ID",
        width: 100,
    },
    {
        field: "title",
        headerName: "Product Title",
        width: 250, // Adjust the width as needed
    },
    {
        field: "qty",
        headerName: "Quantity",
        width: 100, // Adjust the width as needed
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
        field: "selectedWarehouse",
        headerName: "Warehouse",
        width: 120,
    },
    {
        field: "userId",
        headerName: "Customer ID",
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
