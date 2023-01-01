import { useEffect, useState } from 'react';
import { XAxis, YAxis, BarChart, Bar, Tooltip } from 'recharts';
import { ratingCategories, ratingType } from 'types/index';

export const RatingBarChart = ({
  ratings,
  title,
  ratingType,
}: {
  ratings: ratingType[];
  title: string;
  ratingType: ratingCategories;
}) => {
  const [data, setdata] = useState(initialData);

  useEffect(() => {
    const newData = JSON.parse(JSON.stringify(initialData));
    ratings.forEach((ele, i) => {
      newData[ele[ratingType]][ratingType] += 1;
    });
    setdata([...newData]);
  }, [ratings]);

  return (
    <div>
      <h4 className="text-center text-secondaryText font-medium my-4">{title}</h4>
      <BarChart width={400} height={250} data={Object.values(data)}>
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey={ratingType} fill="#4f46e5" />
        <XAxis
          dataKey="name"
          style={{
            fontSize: '.9rem',
          }}
          tick={{ fill: '#d3d3de' }}
        />
        <YAxis
          type="number"
          style={{
            fontSize: '.9rem',
          }}
          tick={{ fill: '#d3d3de' }}
        />
      </BarChart>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active) {
    return (
      <div className="bg-secondaryBackground text-secondaryText font-medium p-3 rounded space-y-1">
        <p>Count: {payload[0].payload[payload[0].name]}</p>
        <p>Rating: {label}</p>
      </div>
    );
  }
  return null;
};

const initialData = [
  {
    name: '0',
    design: 0,
    speed: 0,
    responsive: 0,
  },
  {
    name: '1',
    design: 0,
    speed: 0,
    responsive: 0,
  },
  {
    name: '2',
    design: 0,
    speed: 0,
    responsive: 0,
  },
  {
    name: '3',
    design: 0,
    speed: 0,
    responsive: 0,
  },
  {
    name: '4',
    design: 0,
    speed: 0,
    responsive: 0,
  },
  {
    name: '5',
    design: 0,
    speed: 0,
    responsive: 0,
  },
  {
    name: '6',
    design: 0,
    speed: 0,
    responsive: 0,
  },
  {
    name: '7',
    design: 0,
    speed: 0,
    responsive: 0,
  },
  {
    name: '8',
    design: 0,
    speed: 0,
    responsive: 0,
  },
  {
    name: '9',
    design: 0,
    speed: 0,
    responsive: 0,
  },
  {
    name: '10',
    design: 0,
    speed: 0,
    responsive: 0,
  },
];
/*
const dataObject = {
	'0': {
    name: '0',
    uv: 0,
  },
  '1': {
    name: '1',
    uv: 0,
  },
  '2': {
    name: '2',
    uv: 0,
  },
  '3': {
    name: '3',
    uv: 0,
  },
  '4': {
    name: '4',
    uv: 0,
  },
  '5': {
    name: '5',
    uv: 0,
  },
  '6': {
    name: '6',
    uv: 0,
  },
  '7': {
    name: '7',
    uv: 0,
  },
	'8': {
    name: '8',
    uv: 0,
  },
	'9': {
    name: '9',
    uv: 0,
  },
	'10': {
    name: '10',
    uv: 0,
  },
};
*/
