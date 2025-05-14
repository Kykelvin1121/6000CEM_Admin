export const userInputs = [
  {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "john_doe",
  },
  {
    id: "displayName",
    label: "Name and surname",
    type: "text",
    placeholder: "John Doe",
  },
  {
    id: "email",
    label: "Email",
    type: "mail",
    placeholder: "john_doe@gmail.com",
  },
  {
    id: "phone",
    label: "Phone",
    type: "text",
    placeholder: "+1 234 567 89",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
  },
  {
    id: "address",
    label: "Address",
    type: "text",
    placeholder: "Elton St. 216 NewYork",
  },
  {
    id: "country",
    label: "Country",
    type: "text",
  },
  {
    id: "role",
    label: "Role",
    type: "select",
    options: [
      { text: "Super Admin", value: "super_admin" },
      { text: "Admin", value: "admin" },
      { text: "User", value: "user" },
    ],
    placeholder: "Select Role",
  },
];

export const userUpdate = [
  {
    id: "username",
    label: "Username",
    type: "text",
  },
  {
    id: "displayName",
    label: "Name and surname",
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    type: "mail",
  },
  {
    id: "phone",
    label: "Phone",
    type: "text",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
  },
  {
    id: "address",
    label: "Address",
    type: "text",
  },
  {
    id: "country",
    label: "Country",
    type: "text",
  },
  {
    id: "role",
    label: "Role",
    type: "select",
    options: [
      { text: "Super Admin", value: "super_admin" },
      { text: "Admin", value: "admin" },
      { text: "User", value: "user" },
    ],
    placeholder: "Select Role",
  },
];

export const productInputs = [
  {
    id: "title",
    label: "Title",
    type: "text",
    placeholder: "Apple Macbook Pro",
  },
  {
    id: "desc",
    label: "Description",
    type: "text",
    placeholder: "Description",
  },
  {
    id: "wh1qty",
    label: "Warehouse 1 Unit",
    type: "number",
    placeholder: "0",
  },
  {
    id: "wh2qty",
    label: "Warehouse 2 Unit",
    type: "number",
    placeholder: "0",
  },
  {
    id: "wh3qty",
    label: "Warehouse 3 Unit",
    type: "number",
    placeholder: "0",
  },
  {
    id: "price",
    label: "Price",
    type: "number", // Change to "number"
    placeholder: "0", // You can change the placeholder if needed
  },
  {
    id: "status",
    label: "Status",
    type: "select",
    options: [
      { text: "Active", value: "active" },
      { text: "Disabled", value: "disabled" },
    ],
    placeholder: "Select Status",
  },
];

export const productUpdate = [
  {
    id: "title",
    label: "Title",
    type: "text",
  },
  {
    id: "desc",
    label: "Description",
    type: "text",
  },
  {
    id: "wh1qty",
    label: "Warehouse 1 Unit",
    type: "number",
  },
  {
    id: "wh2qty",
    label: "Warehouse 2 Unit",
    type: "number",
  },
  {
    id: "wh3qty",
    label: "Warehouse 3 Unit",
    type: "number",
  },
  {
    id: "price",
    label: "Price",
    type: "number",
  },
  {
    id: "status",
    label: "Status",
    type: "select",
    options: ["Active", "Disabled"], // Provide an array of values
    placeholder: "Select Status",
  }
];

export const orderUpdate = [
  {
    id: "userId",
    label: "Customer ID",
    readOnly: true, // added readOnly property
  },
  {
    id: "status",
    label: "Status",
    type: "select",
    options: [
      { text: "Processing", value: "processing" },
      { text: "Shipped", value: "shipped" },
      { text: "Delivered", value: "delivered" },
    ],
  },
  {
    id: "selectedWarehouse",
    label: "Warehouse Selected",
  },
  {
    id: "totalPrice",
    label: "Total Paid",
    readOnly: true,
  }
]
