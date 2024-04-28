import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MyPieChart from "./PieChart";
import RevenueOverTimeGraph from "./RevenueOverTimeGraph";
import { IoLogoPaypal } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";

const Dashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch statistics for the dashboard
  const {
    data: stats = {},
    isError: isStatsError,
    isLoading: isStatsLoading,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminStats");
      return res.data;
    },
  });

  // Fetch data for the pie chart
  const {
    data: chartData = [],
    isError: isChartDataError,
    isLoading: isChartDataLoading,
  } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data.categoryStats || [];
    },
  });

  // Fetch data for revenue over time
  const {
    data: revenueData = [],
    isError: isRevenueError,
    isLoading: isRevenueLoading,
  } = useQuery({
    queryKey: ["revenue-over-time"],
    queryFn: async () => {
      const res = await axiosSecure.get("/revenue-over-time");
      return res.data.revenueOverTime || [];
    },
  });

  // Display a loading indicator while fetching data
  if (isStatsLoading || isChartDataLoading || isRevenueLoading) {
    return <div>Loading...</div>;
  }

  // Display an error message if there was an error fetching data
  if (isStatsError || isChartDataError || isRevenueError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <div className=" bg-slate-50 md:w-full pt-5">
      <h2 className="text-3xl font-bold text-slate-700 mb-5 pl-5">
        Hello! <span className="text-red">{user.displayName}</span>
      </h2>

      <div className="flex flex-row justify-evenly gap-20 p-5">
        {/* Displaying various statistics */}
        {/* Revenue card with a sparkline */}
        <div className="flex stat shadow rounded-lg bg-white p-4">
          <div>
            <div className="stat-title">Revenue</div>
            <div className="stat-value">{stats.revenue}</div>
            {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
          </div>
          <div className="flex justify-center items-center">
            <IoLogoPaypal className="text-6xl" />
          </div>
        </div>
        <div className="flex stat shadow rounded-lg bg-white p-4">
          <div>
            <div className="stat-title">Users</div>
            <div className="stat-value">{stats.users}</div>
            {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
          </div>
          <div className="flex justify-center items-center">
            <FaUsers className="text-6xl" />
          </div>
        </div>

        <div className="flex stat shadow rounded-lg bg-white p-4">
          <div>
            <div className="stat-title">Menu Items</div>
            <div className="stat-value">{stats.menuItems}</div>
            {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
          </div>
          <div className="flex justify-center items-center">
            <IoFastFood className="text-6xl" />
          </div>
        </div>

        <div className="flex stat shadow rounded-lg bg-white p-4">
          <div>
            <div className="stat-title">Orders</div>
            <div className="stat-value">{stats.orders}</div>
            {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
          </div>
          <div className="flex justify-center items-center">
            <GiConfirmed className="text-6xl" />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-around gap-4 mt-5 p-4">
        <div className="bg-white rounded-xl shadow-lg p-4 w-2/3">
          <h3 className="text-xl text-center">Revenue Over Time</h3>
          <RevenueOverTimeGraph data={revenueData} />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 w-1/3">
          <h3 className="text-xl text-center">Sales by Category</h3>
          <MyPieChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
