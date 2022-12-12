import { useEffect, useState } from 'react';
import { XAxis, YAxis, BarChart, Bar, Tooltip } from 'recharts';

export const Chart = ({ratings, title, ratingType }) => {
	const [data, setdata] = useState([]);
  console.log('render');

useEffect(() => {
  setdata(JSON.parse(JSON.stringify(initialData)));
}, [])

	useEffect(() => {
		// ******************************* TODO: ****************************** 
		// Refactor this with a copy array or so many re-render will occurs because of thesetdata in the loop.
    if (data.length > 0) {
      ratings.forEach((ele, i) => {
        data[ele[ratingType]][ratingType] += 1;
        setdata([...data]);
      })
    }
	}, [ratings]);
	
	return (
		<div>
			<h2 className="text-center my-4 text-lg">{title}</h2>
			<BarChart width={400} height={250} data={Object.values(data)}>
				<Tooltip />
        <Bar dataKey={ratingType} fill="#4f46e5" />
				<XAxis dataKey="name" />
				<YAxis />
      </BarChart>
		</div>
	)
};

const initialData = [
	{
    name: '0',
    design: 0,
		speed: 0,
		responsive: 0
  },
  {
    name: '1',
		design: 0,
		speed: 0,
		responsive: 0
  },
  {
    name: '2',
    design: 0,
		speed: 0,
		responsive: 0
  },
  {
    name: '3',
    design: 0,
		speed: 0,
		responsive: 0
  },
	{
    name: '4',
    design: 0,
		speed: 0,
		responsive: 0
  },
  {
    name: '5',
    design: 0,
		speed: 0,
		responsive: 0
  },
  {
    name: '6',
    design: 0,
		speed: 0,
		responsive: 0
  },
  {
    name: '7',
    design: 0,
		speed: 0,
		responsive: 0
  },
	{
    name: '8',
    design: 0,
		speed: 0,
		responsive: 0
  },
	{
    name: '9',
    design: 0,
		speed: 0,
		responsive: 0
  },
	{
    name: '10',
		design: 0,
		speed: 0,
		responsive: 0
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