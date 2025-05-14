import React from "react";
import Unauthorized from "../../pages/unauthorized/Unauth";

function RoleAuth({ userRole, allowedRoles, children }) {
  // console.log("userRole:", userRole);
  // console.log("allowedRoles:", allowedRoles);

  // Check if the userRole matches any of the allowedRoles
  if (allowedRoles.includes(userRole)) {
    return children; // Render the children if the user's role matches any of the allowed roles
  } else {
    // toast.error("You are not authorized to access this page.", {});
    return <Unauthorized />;
  }
}

export default RoleAuth;
