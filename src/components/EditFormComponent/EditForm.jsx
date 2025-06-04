import "./editform.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import profileIcon from "../../images/pfpicon.png";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { toast } from "react-toastify";

const EditForm = ({ title, collectionName, formConfig, showImageUpload }) => {
  const { paramId } = useParams();
  const navigate = useNavigate();
  const [docData, setDocData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (collectionName && paramId) {
        const docRef = doc(db, collectionName, paramId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const docData = docSnap.data();
          setDocData(docData);
        } else {
          // Handle the case where the document doesn't exist
        }
      }
    };

    fetchData();
  }, [collectionName, paramId]);

  // Define a handler function to update the form data
  const handleInput = (e) => {
    const { id, value, type } = e.target;
    let parsedValue = value;

    // If the input type is number or integer, parse the value as an integer
    if (type === "number" || type === "integer") {
      parsedValue = parseInt(value, 10); // Parse the value as an integer with base 10
      if (isNaN(parsedValue)) {
        // Handle invalid input, e.g., non-numeric values
        parsedValue = 0; // You can set a default value or handle the error as needed
      }
    }

    // Update the docData state with the new value
    setDocData({
      ...docData,
      [id]: parsedValue,
    });
  };

  // Define a handler function for form submission
  const handleAdd = async (e) => {
    e.preventDefault();

    // Add code to submit the updated user data to your database
    if (docData && paramId) {
      try {
        const userDocRef = doc(db, collectionName, paramId);
        // Update the document with the new user data
        await updateDoc(userDocRef, docData);
        toast.success("Info updated");
        // You can also navigate to another page or perform other actions here if needed.
      } catch (error) {
        console.error("Error updating user data:", error);
        toast.error("Error updating info");
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
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <button className="goBack-edit" onClick={goBack}>
          Go Back
        </button>
        <div className="bottom">
          <div className="left">
            {showImageUpload && (
              <img
                src={docData?.img || profileIcon}
                alt={docData?.name || "User Profile"}
                className="edit-img"
              />
            )}
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              {showImageUpload && (
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) =>
                      setDocData({ ...docData, file: e.target.files[0] })
                    }
                    style={{ display: "none" }}
                  />
                </div>
              )}
              {formConfig.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "select" ? (
                    <select
                      className="edit-select"
                      id={input.id}
                      onChange={handleInput}
                      value={
                        docData && docData[input.id] ? docData[input.id] : ""
                      } // Check if docData and docData[input.id] are not null
                      disabled={input.readOnly ? true : false} // Check if readOnly is true
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
                        docData && docData[input.id] ? docData[input.id] : ""
                      } // Check if docData and docData[input.id] are not null
                      readOnly={input.readOnly ? true : false} // Check if readOnly is true
                    />
                  )}
                </div>
              ))}
              <br />
              <button
                disabled={docData && docData.per !== null && docData.per < 100}
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

export default EditForm;
