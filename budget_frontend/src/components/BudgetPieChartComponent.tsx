import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Budget } from "../types";

interface Props {
  budget: Budget;
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

const BudgetPieChartComponent: React.FC<Props> = ({ budget }) => {
  const totalAllocated = budget.allocations.reduce(
    (sum, a) => sum + a.percentage,
    0
  );
  const remainingPercentage = 100 - totalAllocated;

  const data = [
    ...budget.allocations.map((allocation) => ({
      name: allocation.category,
      value: allocation.percentage,
    })),
    {
      name: "Spending Money",
      value: remainingPercentage > 0 ? remainingPercentage : 0,
    },
  ];

  return (
    <div className="w-full h-96">
      <h2 className="text-xl font-semibold mb-4">
        {budget.budgetName} Allocation
      </h2>
      <p>Total amount: {budget.totalAmount}</p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart margin={{ top: 80, right: 30, bottom: 30, left: 30 }}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label={({ name, percent }) =>
                `${name}: $${(percent * budget.totalAmount).toFixed(1)}`
              }              
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `${value.toFixed(1)}%`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetPieChartComponent;
