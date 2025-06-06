import "./widget.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(0);

  let data;

  switch (type) {
        case "users":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        query: "users",
        icon: <PersonOutlineIcon className="icon" />,
      };
      break;
    case "order":
      data = {
        title: "ORDER",
        isMoney: false,
        link: "See all order",
        query: "orders",
        icon: <ReceiptIcon className="icon" />,
      };
      break;
    case "product":
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
    default:
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, data.query);
      const querySnapshot = await getDocs(collectionRef);

      if (type === "earning") {
        const totalEarnings = querySnapshot.docs.reduce(
          (total, doc) => total + (doc.data().totalPrice || 0),
          0
        );
        setAmount(totalEarnings);
      } else {
        setAmount(querySnapshot.docs.length);
      }
    };

    fetchData();
  }, [type]);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data?.title}</span>
        <span className="counter">
          {data?.isMoney ? `RM ${amount.toFixed(2)}` : amount}
        </span>
        {data?.link && (
          <Link to={`/${data.query}`}>
            <span className="link">{data.link}</span>
          </Link>
        )}
      </div>
      <div className="right">
        {data?.icon}
      </div>
    </div>
  );
};

export default Widget;
