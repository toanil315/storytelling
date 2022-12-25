import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Tooltip,
  Area,
  XAxis,
  YAxis,
} from "recharts";
import Box from "src/components/commons/Box";
import Text from "src/components/commons/Typography";
import { useGetRevenueOfTheMonths, useUser } from "src/hooks/apis";
import formatNumber, { abbreviateNumber } from "src/utils/helpers/formatNumber";

const IncomeChart = () => {
  const { user } = useUser();
  const { data } = useGetRevenueOfTheMonths(user?.userId);

  return (
    <Box
      width="100%"
      height={450}
      padding="20px 20px 30px 0"
      bg="white"
      border="1px solid"
      borderColor="lightGray"
      borderRadius="large"
      className="shadow-md"
    >
      <Box style={{ textAlign: "center" }}>
        <Text fontSize="base" fontWeight="bold" lineHeight="xl" color="text">
          this month earnings:
        </Text>
        <Text fontSize="xl" fontWeight="bold" lineHeight="xl" color="text">
          {formatNumber(data?.at(-1)?.revenue)}Vnd
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
          <defs>
            <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#efd06b" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#f4cf69" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            animationBegin={800}
            animationDuration={2000}
            type="monotone"
            dataKey="revenue"
            stroke="#ffc107"
            fillOpacity={1}
            fill="url(#fillColor)"
            strokeWidth={3}
          />

          <XAxis tickLine={false} dataKey="month" />
          <YAxis
            tickFormatter={abbreviateNumber}
            tickLine={false}
            dataKey="revenue"
          />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default IncomeChart;
