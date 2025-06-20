// =======================
// User Inputs (Create)
// =======================
export const userInputs = [
  {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter username",
  },
  {
    id: "email",
    label: "Email",
    type: "mail",
    placeholder: "Enter email",
  },
  {
    id: "phoneNumber",
    label: "Phone",
    type: "text",
    placeholder: "+60",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
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
  {
    id: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter address",
  },
];

// =======================
// User Update (Edit)
// =======================
export const userUpdate = [
  {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter username",
  },
  {
    id: "email",
    label: "Email",
    type: "mail",
    placeholder: "Enter email",
  },
  {
    id: "phoneNumber",
    label: "Phone",
    type: "text",
    placeholder: "+60",
  },
  {
    id: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter address",
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

// =======================
// Product Inputs (Create)
// =======================
export const productInputs = [
  {
    id: "title",
    label: "Product",
    type: "text",
    placeholder: "Product Name",
  },
  {
    id: "desc",
    label: "Description",
    type: "text",
    placeholder: "Enter product description",
  },
  {
    id: "wh1qty",
    label: "Quantity",
    type: "number",
    placeholder: "0",
  },
  {
    id: "price",
    label: "Price",
    type: "number",
    placeholder: "0",
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

// =======================
// Product Update (Edit)
// =======================
export const productUpdate = [
  {
    id: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    id: "desc",
    label: "Description",
    type: "text",
    placeholder: "Enter description",
  },
  {
    id: "wh1qty",
    label: "Warehouse 1 Unit",
    type: "number",
    placeholder: "0",
  },
  {
    id: "price",
    label: "Price",
    type: "number",
    placeholder: "0",
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

// =======================
// Order Update (Edit)
// =======================
export const orderUpdate = [
  {
    id: "userId",
    label: "Customer ID",
    type: "text",
    readOnly: true,
    placeholder: "Auto-generated",
  },
    {
    id: "username",
    label: "Username",
    type: "text",
    readOnly: true,
    placeholder: "Auto-generated",
  },
  {
    id: "shippingAddress",
    label: "Shipping Address",
    type: "text",
    readOnly: true,
    placeholder: "Auto-generated",
  },
  {
    id: "totalPrice",
    label: "Total Paid",
    type: "text",
    readOnly: true,
    placeholder: "Auto-calculated",
  },
    {
    id: "status",
    label: "Status",
    type: "select",
    options: [
      { text: "Processing", value: "processing" },
      { text: "Delivering", value: "delivering" },
      { text: "Completed", value: "completed" },
    ],
    placeholder: "Select status",
  },
];
