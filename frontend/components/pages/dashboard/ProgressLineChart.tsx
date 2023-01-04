import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { feedbackType } from 'types/index';

export const ProgressLineChart = ({
  feedbacks,
  dateRange,
}: {
  feedbacks: feedbackType[];
  dateRange: { startDate: string; endDate: string };
}) => {
  const [data, setData] = useState([]);
  function formatXAxis(tickItem) {
    return dayjs(tickItem).format('DD/MM/YY');
  }

  const createHashMapFromDateRangeFilter = (dateRange) => {
    const newData = {};
    const numberOfDayDifference = dayjs(dateRange.endDate).diff(dayjs(dateRange.startDate), 'day');
    for (let i = 0; i <= numberOfDayDifference; i++) {
      newData[dayjs(dateRange.startDate).add(i, 'day').format('YYYY-MM-DD')] = {
        number: 0,
        date: dayjs(dateRange.startDate).add(i, 'day').format('YYYY-MM-DD'),
      };
    }
    return newData;
  };

  useEffect(() => {
    const newData = createHashMapFromDateRangeFilter(dateRange);
    feedbacks.forEach((ele) => {
      if (newData[dayjs(ele.createdAt).format('YYYY-MM-DD')]) {
        newData[dayjs(ele.createdAt).format('YYYY-MM-DD')].number += 1;
      }
    });
    setData(
      Object.values(newData).map((ele: any) => {
        return {
          number: ele.number,
          date: ele.date,
        };
      }),
    );
  }, [feedbacks]);

  return (
    <ResponsiveContainer width="95%" height={260}>
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
          style={{
            fontSize: '.8rem',
          }}
          tick={{ fill: '#d3d3de' }}
        />
        <YAxis
          style={{
            fontSize: '.9rem',
          }}
          tick={{ fill: '#d3d3de' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#303136',
            borderRadius: '5px',
            borderColor: '#303136',
          }}
          labelStyle={{
            color: '#d3d3de',
          }}
          content={<CustomTooltip />}
        />
        <Legend
          iconSize={12}
          iconType="plainline"
          style={{
            fontSize: '.9rem',
          }}
          formatter={(value) => <span className="text-secondaryText text-sm">{value}</span>}
        />
        <Line type="monotone" dataKey="number" stroke="#6366f1" dot={null} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active) {
    return (
      <div className="bg-secondaryBackground text-secondaryText font-medium p-3 rounded space-y-1">
        <p>{label}</p>
        <p>Number: {payload[0].payload.number}</p>
      </div>
    );
  }

  return null;
};
