import "./addform.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

const AddForm = ({ inputs, title, collectionName }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
        },
        (error) => {
          console.log(error);
          toast.error("Image upload failed");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
            toast.success("Image uploaded successfully");
          });
        }
      );
    };

    if (file) {
      uploadFile();
    }
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    let value = e.target.value;

    if (e.target.type === "number") {
      const num = parseInt(value, 10);
      value = isNaN(num) || num < 1 ? 1 : num;
    }

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    let isEmptyField = false;
    for (const input of inputs) {
      const key = input.id;
      const value = data[key];
      if (!value || value.toString().trim() === "") {
        isEmptyField = true;
        break;
      }
    }

    if (isEmptyField) {
      toast.dismiss();
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    if (file && per !== null && per < 100) {
      toast.dismiss();
      toast.error("Please wait for the image to finish uploading");
      setIsSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, collectionName), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      toast.success("Product added successfully");
      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("Failed to add Product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Preview"
            />
            <div className="uploadButtonWrapper">
              <label htmlFor="file" className="uploadLabel">
                Upload Image <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "select" ? (
                    <select
                      id={input.id}
                      onChange={handleInput}
                      defaultValue=""
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
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleInput}
                      min={input.type === "number" ? 1 : undefined}
                    />
                  )}
                </div>
              ))}

              <button
                disabled={(file && per !== null && per < 100) || isSubmitting}
                type="submit"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddForm;
