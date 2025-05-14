import "./featured.scss";
import "react-circular-progressbar/dist/styles.css";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const Featured = () => {
  const [totalRevenueToday, setTotalRevenueToday] = useState(0);
  const [totalRevenueAllTime, setTotalRevenueAllTime] = useState(0);

  useEffect(() => {
    const fetchTotalRevenueAndSales = async () => {
      try {
        const ordersRef = collection(db, "orders");

        // Calculate the start and end timestamps for today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        // Create a query to filter orders made today
        const todayQuery = query(
          ordersRef,
          where("timeStamp", ">=", today),
          where("timeStamp", "<", tomorrow)
        );

        const querySnapshot = await getDocs(todayQuery);

        if (querySnapshot.empty) {
          console.log("There are no orders made today.");
        } else {
          let totalRevenueToday = 0;

          querySnapshot.forEach((doc) => {
            const orderData = doc.data();

            // Check if the totalPrice field is a valid number
            if (!isNaN(orderData.totalPrice)) {
              totalRevenueToday += parseFloat(orderData.totalPrice);
            }
          });

          setTotalRevenueToday(totalRevenueToday);
        }

        // Create a query to fetch all documents in the "orders" collection
        const allOrdersQuery = query(ordersRef);

        const allOrdersSnapshot = await getDocs(allOrdersQuery);

        if (!allOrdersSnapshot.empty) {
          let totalRevenueAllTime = 0;

          allOrdersSnapshot.forEach((doc) => {
            const orderData = doc.data();

            // Check if the totalPrice field is a valid number
            if (!isNaN(orderData.totalPrice)) {
              totalRevenueAllTime += parseFloat(orderData.totalPrice);
            }
          });

          setTotalRevenueAllTime(totalRevenueAllTime);
        }
      } catch (error) {
        console.error("Error fetching total revenue and sales:", error);
      }
    };

    fetchTotalRevenueAndSales();
  }, []);

  // Calculate the percentage based on the text
  const percentageToday = (totalRevenueToday / totalRevenueAllTime) * 100;

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={percentageToday}
            text={`${percentageToday.toFixed(2)}%`}
            strokeWidth={5}
          />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">{`$${totalRevenueToday}`}</p>
        <p className="desc">{`Total Revenue (All Time): $${totalRevenueAllTime}`}</p>
        <div className="summary">
            Total revenue is the amount of sales, without accounting the expenses for net profit.
        </div>
      </div>
    </div>
  );
};

export default Featured;

