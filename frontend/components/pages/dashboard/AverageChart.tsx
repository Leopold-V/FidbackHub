import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ratingType } from 'types/index';

export const AverageChart = ({ ratings, dateRange }: { ratings: ratingType[], dateRange: { startDate: string, endDate: string}}) => {
  const [data, setData] = useState([]);
  function formatXAxis(tickItem) {
    return dayjs(tickItem).format('DD/MM/YY')
  }

  const createHashMapFromDateRangeFilter = (dateRange) => {
    const newData = {};
    const numberOfDayDifference = dayjs(dateRange.endDate).diff(dayjs(dateRange.startDate), 'day');
    for (let i = 0; i <= numberOfDayDifference; i ++) {
      newData[dayjs(dateRange.startDate).add(i, 'day').format('YYYY-MM-DD')] = {
        count: 0,
        design: 0,
        speed: 0,
        responsive: 0,
        date: dayjs(dateRange.startDate).add(i, 'day').format('YYYY-MM-DD'), 
      };
    }
    return newData;
  }

  useEffect(() => {
    const newData = createHashMapFromDateRangeFilter(dateRange);
    ratings.forEach((ele, i) => {
      if (newData[dayjs(ele.createdAt).format('YYYY-MM-DD')]) {
        newData[dayjs(ele.createdAt).format('YYYY-MM-DD')].count += 1;
        newData[dayjs(ele.createdAt).format('YYYY-MM-DD')].design += ele.design;
        newData[dayjs(ele.createdAt).format('YYYY-MM-DD')].speed += ele.speed;
        newData[dayjs(ele.createdAt).format('YYYY-MM-DD')].responsive += ele.responsive;
      }
    });
    setData(Object.values(newData).map((ele: any) => {
      return {
        count: ele.count,
        date: ele.date,
        speed: ele.count > 0 ? (ele.speed / ele.count).toFixed(2) : 0,
        design: ele.count > 0 ? (ele.design / ele.count).toFixed(2) : 0,
        responsive: ele.count > 0 ? (ele.responsive / ele.count).toFixed(2) : 0
      }
    }));
  }, [ratings]);
    
  return (
    <ResponsiveContainer width="80%" height={260}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date"
          tickFormatter={formatXAxis} 
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" dot={null} />
        <Line type="monotone" dataKey="design" stroke="#84d8c4" dot={null} />
        <Line type="monotone" dataKey="speed" stroke="#d5d871" dot={null} />
        <Line type="monotone" dataKey="responsive" stroke="#f15353" dot={null} />
      </LineChart>
    </ResponsiveContainer>
  );
}