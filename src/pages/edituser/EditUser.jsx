import "./edituser.scss";
import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import profileIcon from "../../images/pfpicon.png";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { userUpdate } from "../../formSource";
import { toast } from "react-toastify";

const EditUser = ({ title }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUserData(userData); // Store the fetched data in state
      } else {
        // Handle the case where the document doesn't exist
      }
    };

    fetchUserData();
  }, [userId]);

  // Define a handler function to update the form data
  const handleInput = (e) => {
    // Update the userData state with the new value
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  // Define a handler function for form submission
  const handleAdd = async (e) => {
    e.preventDefault();
    // Add code to submit the updated user data to your database
    if (userData && userId) {
      try {
        const userDocRef = doc(db, "users", userId);
        // Update the document with the new user data
        await updateDoc(userDocRef, userData);
        toast.success("User info updated");
        // You can also navigate to another page or perform other actions here if needed.
      } catch (error) {
        console.error("Error updating user data:", error);
        toast.error("Error updating user info");
        // Handle any errors that occur during the update.
      }
    }
    navigate(-1);
  };

  const goBack = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <button className="goBack" onClick={goBack}>
          Go Back
        </button>
        <div className="bottom">
          <div className="left">
            <img
              src={userData?.img || profileIcon}
              alt={userData?.name || "User Profile"}
              className="item avatar"
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) =>
                    setUserData({ ...userData, file: e.target.files[0] })
                  }
                  style={{ display: "none" }}
                />
              </div>

              {userUpdate.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "select" ? (
                    <select
                      className="select"
                      id={input.id}
                      onChange={handleInput}
                      value={
                        userData && userData[input.id] ? userData[input.id] : ""
                      } // Check if userData and userData[input.id] are not null
                    >
                      <option value="" disabled>
                        Select {input.label}
                      </option>
                      {input.options.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="formInput"
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleInput}
                      value={
                        userData && userData[input.id] ? userData[input.id] : ""
                      } // Check if userData and userData[input.id] are not null
                    />
                  )}
                </div>
              ))}
              <button
                disabled={
                  userData && userData.per !== null && userData.per < 100
                }
                type="submit"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;