import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import profileIcon from "../../images/pfpicon.png";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { uid } = currentUser || {};
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (uid) {
      const fetchUserData = async () => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      };

      fetchUserData();
    }
  }, [uid]);

  const goToProfile = () => {
    navigate(`/users/${uid}`);
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchIcon className="icon" />
        </div>
        {userData && (
          <div className="userProfile" onClick={goToProfile}>
            <img
              src={userData.img ? userData.img : profileIcon}
              alt={userData.displayName || "User Profile"}
              className="avatar"
            />
            <span className="username">{userData.displayName}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
