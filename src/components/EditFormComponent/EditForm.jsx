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
          setDocData(docSnap.data());
        }
      }
    };
    fetchData();
  }, [collectionName, paramId]);

  const handleInput = (e) => {
    const { id, value, type } = e.target;
    let parsedValue = value;

    if (type === "number" || type === "integer") {
      parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) parsedValue = 0;
    }

    setDocData({
      ...docData,
      [id]: parsedValue,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (docData && paramId) {
      try {
        const userDocRef = doc(db, collectionName, paramId);
        await updateDoc(userDocRef, docData);
        toast.success("Info updated");
      } catch (error) {
        console.error("Error updating user data:", error);
        toast.error("Error updating info");
      }
    }
    navigate(-1);
  };

  const goBack = () => navigate(-1);

  const isLowStock = docData?.quantity !== undefined && docData.quantity < 5;

  return (
    <div className="new">
      <div className={`newContainer ${isLowStock ? "lowStockHighlight" : ""}`}>
        <div className="top">
          <h1>{title}</h1>
          {isLowStock && <span className="lowStockWarning">⚠️ Quantity Low!</span>}
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
                  <label htmlFor="file" className="uploadLabel">
                    Upload Image <DriveFolderUploadOutlinedIcon className="icon" />
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
                      value={docData?.[input.id] || ""}
                      disabled={input.readOnly}
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
                      value={docData?.[input.id] || ""}
                      readOnly={input.readOnly}
                    />
                  )}
                </div>
              ))}
              <br />
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
