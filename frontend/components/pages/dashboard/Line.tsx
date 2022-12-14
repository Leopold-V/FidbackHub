import dayjs from 'dayjs';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ratingType } from 'types/index';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
    createdAt: new Date()
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
    createdAt: new Date()
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    createdAt: new Date()
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    createdAt: new Date()
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    createdAt: new Date()
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    createdAt: new Date()
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    createdAt: new Date()
  },
];

export const LineTest = ({ ratings }: { ratings: ratingType[]}) => {
    function formatXAxis(tickItem) {
        // If using moment.js
        return dayjs(tickItem).format('MMM Do YY')
    }


    return (
        <LineChart
          width={800}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={ratings.map((ele) => ele.createdAt)} tickFormatter={formatXAxis} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
    );
}
