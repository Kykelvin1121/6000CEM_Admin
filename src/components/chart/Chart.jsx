import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const ordersRef = collection(db, "orders");
        const today = new Date();

        const tempData = [];

        for (let i = 0; i < 6; i++) {
          const startDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
          const endDate = new Date(today.getFullYear(), today.getMonth() - i + 1, 0);

          const monthQuery = query(
            ordersRef,
            where("timeStamp", ">=", startDate),
            where("timeStamp", "<=", endDate)
          );

          const querySnapshot = await getDocs(monthQuery);

          let monthlyRevenue = 0;

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const orderData = doc.data();
              if (!isNaN(orderData.totalPrice)) {
                monthlyRevenue += parseFloat(orderData.totalPrice);
              }
            });
          }

          tempData.unshift({
            name: startDate.toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            }),
            revenue: Number(monthlyRevenue.toFixed(2)), // Keep as number for chart
          });
        }

        setData(tempData);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenueData();
  }, []);

  return (
    <div className="chart">
      <div className="title">Last 6 Months (Earning)</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <XAxis dataKey="name" stroke="gray" />
          <YAxis />
          <Tooltip formatter={(value) => `RM ${value}`} />
          <Area
            type="monotone"
            dataKey="revenue"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
