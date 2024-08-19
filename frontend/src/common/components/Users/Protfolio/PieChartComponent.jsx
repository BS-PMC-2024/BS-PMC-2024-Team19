import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const PieChartComponent = ({ data }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6347"];

  // Calculate the total investment amount
  const totalInvestment = data.reduce(
    (acc, stock) => acc + (stock.qnty * stock.entryPrice || 0),
    0
  );

  // Format data for the PieChart
  const formattedData = data.map((stock) => ({
    name: stock.symbol,
    value:
      totalInvestment > 0
        ? (stock.qnty * stock.entryPrice) / totalInvestment
        : 0,
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={formattedData}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={140} // Reduced outer radius to give more space for labels
        fill="#8884d8"
        dataKey="value"
        label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
          const radius = outerRadius - 60; // Increased margin for label positioning
          const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
          const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);
          return (
            <text
              x={x}
              y={y}
              fill="white"
              textAnchor={x > cx ? "start" : "end"}
              dominantBaseline="central"
              fontSize="14px"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              {(value * 100).toFixed(2)}%
            </text>
          );
        }}
      >
        {formattedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => `${(value * 100).toFixed(2)}%`} />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
