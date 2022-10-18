import React from "react";
import { ResponsiveContainer, AreaChart, Tooltip, Area, XAxis } from "recharts";
import Box from "src/components/commons/Box";
import Text from "src/components/commons/Typography";

const data = [
  {
    month: 1,
    income: 4000,
  },
  {
    month: 2,
    income: 5000,
  },
  {
    month: 3,
    income: 3000,
  },
  {
    month: 4,
    income: 3300,
  },
  {
    month: 5,
    income: 6000,
  },
  {
    month: 6,
    income: 9500,
  },
  {
    month: 7,
    income: 9000,
  },
  {
    month: 8,
    income: 7300,
  },
  {
    month: 9,
    income: 10000,
  },
  {
    month: 10,
    income: 14000,
  },
  {
    month: 11,
    income: 14700,
  },
  {
    month: 12,
    income: 15000,
  },
];

const IncomeChart = () => {
  return (
    <Box
      width="100%"
      height={450}
      padding="20px 20px 30px"
      bg="white"
      border="1px solid"
      borderColor="lightGray"
      borderRadius="large"
    >
      <Box style={{ textAlign: "center" }}>
        <Text fontSize="base" fontWeight="bold" lineHeight="xl" color="text">
          this month earnings:
        </Text>
        <Text fontSize="xl" fontWeight="bold" lineHeight="xl" color="text">
          $621
        </Text>
        <Text fontSize="sm" fontWeight="bold" lineHeight="normal" color="green">
          + 12%
        </Text>
      </Box>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={data}
          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Tooltip cursor={false} />
          <Area
            animationBegin={800}
            animationDuration={2000}
            type="monotone"
            dataKey="income"
            stroke="#ffc107"
            fill="#faf3de"
            strokeWidth={3}
          />
          <XAxis dataKey="month" />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default IncomeChart;
