import "./single.scss";
import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import profileIcon from "../../images/pfpicon.png";

const Single = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        // Handle user not found, maybe redirect or show message
      }
    };

    fetchUserData();
  }, [userId]);

  const goBack = () => {
    navigate(-1);
  };

  const goToEdit = () => {
    navigate(`/users/edit/${userId}`);
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />

        <div className="top">
          <button className="backButton" onClick={goBack}>
            Go Back
          </button>
          <div className="left">
            <div
              className="editButton"
              onClick={goToEdit}
              style={{ cursor: "pointer" }}
            >
              Edit
            </div>
            <h1 className="title">Information</h1>
            {userData && (
              <div className="item">
                <img
                  src={userData.img ? userData.img : profileIcon}
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{userData.displayName}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{userData.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{userData.phoneNumber}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">{userData.address}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Roles:</span>
                    <span className="itemValue">{userData.role}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
