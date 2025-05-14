import "./navbar.scss";
import SearchIcon from '@mui/icons-material/Search';
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import profileIcon from "../../images/pfpicon.png";
import { AuthContext } from "../../context/AuthContext"; // Update the import path

const Navbar = () => {
  const { currentUser } = useContext(AuthContext); // Get the currentUser object from the context
  const { uid } = currentUser || {}; // Extract the uid from currentUser if it exists
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (uid) {
      const fetchUserData = async () => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserData(userData); // Store the fetched data in state
        } else {
          // Handle the case where the document doesn't exist
        }
      };

      fetchUserData();
    }
  }, [uid]);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchIcon className="icon" />
        </div>
        {userData && (
          <div className="items">
            <div className="item">
              <img
                src={userData.img ? userData.img : profileIcon}
                alt={userData.name || "User Profile"}
                className="item avatar" // Add "avatar" class here
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar