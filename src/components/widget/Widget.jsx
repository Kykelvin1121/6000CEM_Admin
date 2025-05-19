import "./widget.scss";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import React from "react";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);
  let data = null;

  switch (type) {
    case "sales":
      data = {
        title: "SALES",
        isMoney: false, // no RM for sales count
        link: "See all sales",
        query: "orders",
        icon: <ShowChartIcon className="icon" />,
      };
      break;
    case "orders":
      data = {
        title: "PRODUCT LISTED",
        isMoney: false,
        link: "See all products",
        query: "products",
        icon: <ShoppingCartIcon className="icon negative" />,
      };
      break;
    case "earning":
      data = {
        title: "EARNING",
        isMoney: true,
        link: false,
        query: "orders",
        icon: <MonetizationOnIcon className="icon" />,
      };
      break;
    case "users":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        query: "users",
        icon: <PersonOutlineIcon className="icon" />,
      };
      break;
    default:
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

      if (data && data.query) {
        const lastMonthQuery = query(
          collection(db, data.query),
          where("timeStamp", "<=", today),
          where("timeStamp", ">", lastMonth)
        );
        const prevMonthQuery = query(
          collection(db, data.query),
          where("timeStamp", "<=", lastMonth),
          where("timeStamp", ">", prevMonth)
        );

        const lastMonthData = await getDocs(lastMonthQuery);
        const prevMonthData = await getDocs(prevMonthQuery);

        let newAmount;
        let newDiff;

        if (type === "earning") {
          const lastMonthEarnings = lastMonthData.docs.reduce(
            (total, doc) => total + doc.data().totalPrice,
            0
          );

          const prevMonthEarnings = prevMonthData.docs.reduce(
            (total, doc) => total + doc.data().totalPrice,
            0
          );

          newAmount = lastMonthEarnings;
          newDiff =
            ((lastMonthEarnings - prevMonthEarnings) / prevMonthEarnings) * 100;
        } else {
          // sales, orders, users
          newAmount = lastMonthData.docs.length;
          newDiff =
            ((lastMonthData.docs.length - prevMonthData.docs.length) /
              prevMonthData.docs.length) *
            100;
        }

        setAmount(newAmount);
        setDiff(newDiff);
      }
    };

    fetchData();
  }, [data, type]);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney
            ? `RM ${amount}`
            : type === "sales"
            ? `${amount} Sales`
            : amount}
        </span>
        {data.link && (
          <Link to={`/${data.query}`}>
            <span className="link">{data.link}</span>
          </Link>
        )}
      </div>
      <div className="right">
        <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
          {diff < 0 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
          {diff?.toFixed(2)}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
