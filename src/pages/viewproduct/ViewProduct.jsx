import "./single.scss";
import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import profileIcon from "../../images/pfpicon.png";

const Single = () => {
  const { productId } = useParams();

  const [productData, setProductData] = useState(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const docRef = doc(db, "products", productId);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       const productData = docSnap.data();
  //       setProductData(productData); // Store the fetched data in state
  //     } else {
  //       // Handle the case where the document doesn't exist
  //     }
  //   };

  //   fetchUserData();
  // });

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            {productData && ( // Check if userData is available before rendering
              <div className="item">
                <img
                  src={productData.img ? productData.img : profileIcon}
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{productData.displayName}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Title:</span>
                    <span className="itemValue">{productData.title}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Price:</span>
                    <span className="itemValue">{productData.price}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Total Quantity:</span>
                    <span className="itemValue">{productData.quantity}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Status:</span>
                    <span className="itemValue">{productData.status}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="right">
            <Chart aspect={2 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
