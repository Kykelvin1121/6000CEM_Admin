import "./edituser.scss";
import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import profileIcon from "../../images/pfpicon.png";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { userUpdate } from "../../formSource"; // adjust path if needed
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
        setUserData(docSnap.data());
      } else {
        // handle user not found case
      }
    };
    fetchUserData();
  }, [userId]);

  const handleInput = (e) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (userData && userId) {
      try {
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, userData);
        toast.success("User info updated");
      } catch (error) {
        console.error("Error updating user data:", error);
        toast.error("Error updating user info");
      }
    }
    navigate(-1);
  };

  const goBack = () => {
    navigate(-1);
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
              alt={userData?.username || "User Profile"}
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

              {userUpdate
                // filter out name, surname, country if somehow still present
                .filter(
                  (input) =>
                    !["name", "surname", "country"].includes(input.id)
                )
                .map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    {input.type === "select" ? (
                      <select
                        className="select"
                        id={input.id}
                        onChange={handleInput}
                        value={
                          userData && userData[input.id]
                            ? userData[input.id]
                            : ""
                        }
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
                          userData && userData[input.id]
                            ? userData[input.id]
                            : ""
                        }
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
