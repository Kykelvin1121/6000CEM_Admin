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

        // Today range
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        // Today's orders
        const todayQuery = query(
          ordersRef,
          where("timeStamp", ">=", today),
          where("timeStamp", "<", tomorrow)
        );
        const todaySnapshot = await getDocs(todayQuery);

        let revenueToday = 0;
        todaySnapshot.forEach((doc) => {
          const { totalPrice } = doc.data();
          if (!isNaN(totalPrice)) revenueToday += parseFloat(totalPrice);
        });
        setTotalRevenueToday(revenueToday);

        // All-time orders
        const allOrdersSnapshot = await getDocs(ordersRef);
        let revenueAllTime = 0;
        allOrdersSnapshot.forEach((doc) => {
          const { totalPrice } = doc.data();
          if (!isNaN(totalPrice)) revenueAllTime += parseFloat(totalPrice);
        });
        setTotalRevenueAllTime(revenueAllTime);
      } catch (error) {
        console.error("Error fetching total revenue and sales:", error);
      }
    };

    fetchTotalRevenueAndSales();
  }, []);

  const percentageToday =
    totalRevenueAllTime > 0
      ? (totalRevenueToday / totalRevenueAllTime) * 100
      : 0;

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
        <p className="amount">{`RM ${totalRevenueToday.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}</p>
        <p className="desc">{`Total Revenue: RM ${totalRevenueAllTime.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}</p>
        <div className="summary">
          Total revenue is the amount of sales, without accounting for expenses or net profit.
        </div>
      </div>
    </div>
  );
};

export default Featured;
