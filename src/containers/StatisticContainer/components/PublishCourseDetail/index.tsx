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
import Text from "src/components/commons/Typography";

interface Props {
  record: any;
}

const data = [
  {
    name: "1",
    students: 100,
  },
  {
    name: "2",
    students: 80,
  },
  {
    name: "3",
    students: 120,
  },
  {
    name: "4",
    students: 150,
  },
  {
    name: "5",
    students: 200,
  },
  {
    name: "6",
    students: 180,
  },
  {
    name: "7",
    students: 160,
  },
  {
    name: "8",
    students: 230,
  },
  {
    name: "9",
    students: 250,
  },
  {
    name: "10",
    students: 300,
  },
  {
    name: "11",
    students: 400,
  },
  {
    name: "12",
    students: 380,
  },
];

const PublishCourseDetail = ({ record }: Props) => {
  return (
    <Box padding="10px">
      <Box width="100%" height="300px">
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
            <XAxis tickLine={false} dataKey="name" />
            <YAxis tickLine={false} dataKey="students" />
            <Tooltip />
            <Line
              dataKey="students"
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
    </Box>
  );
};

export default PublishCourseDetail;
