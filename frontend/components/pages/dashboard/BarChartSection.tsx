import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Chart } from './Chart'
import { DateFilter } from './DateFilter'

export const BarChartSection = ({ ratings }) => {
	const [dateRange, setdateRange] = useState({ 
		startDate: dayjs().subtract(7, 'day'), 
		endDate: dayjs(new Date())
	});
	const [ratingsFiltered, setratingsFiltered] = useState(JSON.parse(JSON.stringify(ratings)))

	useEffect(() => {
		//const d = dayjs(ratingsFiltered[0].createdAt).isBetween(dateRange.startDate, dateRange.endDate);
		//console.log(d);
		const newRating = JSON.parse(JSON.stringify(ratings)).filter((ele) => {
			console.log(dayjs(ele.createdAt).isBetween(dayjs(dateRange.startDate), dayjs(dateRange.endDate)));
			return dayjs(ele.createdAt).isBetween(dayjs(dateRange.startDate), dayjs(dateRange.endDate)) === true
		});
		setratingsFiltered([...newRating]);
	}, [dateRange]);

  return (
    <>
			<DateFilter dateRange={dateRange} setdateRange={setdateRange} />
			<div className="flex flex-row justify-center items-center">
				<Chart title={"Design"} ratings={ratingsFiltered} ratingType="design" />
				<Chart title={"Speed"} ratings={ratingsFiltered} ratingType="speed" />
				<Chart title={"Responsive"} ratings={ratingsFiltered} ratingType="responsive" />
			</div>
    </>
  )
}
