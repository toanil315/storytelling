import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Box from "src/components/commons/Box";
import Center from "src/components/commons/Center";
import Text from "src/components/commons/Typography";
import PlaceholderLoading from "src/components/commons/Loading";
import { CourseType } from "src/data-model/CourseTypes";
import { useGetAttendanceByMonth } from "src/hooks/apis";

interface Props {
  record: CourseType;
}

const PublishCourseDetail = ({ record }: Props) => {
  const { data, isLoading } = useGetAttendanceByMonth(record.id ?? "");

  return (
    <Box padding="10px">
      {isLoading ? (
        <Center width="100%" height="300px">
          <PlaceholderLoading />
        </Center>
      ) : (
        <Box width="100%" height="350px" padding="25px 0">
          <Box
            as={Text}
            fontSize="base"
            fontWeight="bold"
            color="text"
            lineHeight="large"
            textAlign="center"
            padding="0 0 10px"
          >
            Attendance Of This Year
          </Box>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              height={250}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dy={12} tickLine={false} dataKey="month" />
              <YAxis tickLine={false} dataKey="totalSubscribers" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                dataKey="totalSubscribers"
                stroke="#ffc107"
                strokeWidth={2}
                dot={{
                  stroke: "#ffc107",
                  strokeWidth: 5,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box className="bg-white p-4 rounded-lg shadow-md">
        <Text fontSize="sm" fontWeight="medium" color="green">
          {label}
        </Text>
        <Box className="flex items-end">
          Total subscriber:
          <Box
            as={Text}
            padding="0 0 0 5px"
            fontSize="base"
            fontWeight="bold"
            color="green"
          >
            {payload[0].value}
          </Box>
        </Box>
      </Box>
    );
  }

  return null;
};

export default PublishCourseDetail;
