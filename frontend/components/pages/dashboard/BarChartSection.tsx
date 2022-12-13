import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { ratingType } from 'types/index';
import { Chart } from './Chart'
import { DateFilter } from './DateFilter'

export const BarChartSection = ({ ratings }: { ratings: ratingType[]}) => {
	const [dateRange, setdateRange] = useState({ 
		startDate: dayjs().subtract(7, 'day'), 
		endDate: dayjs(new Date())
	});
	const [ratingsFiltered, setratingsFiltered] = useState(JSON.parse(JSON.stringify(ratings)))

	const filterRatings = (ratings) => {
		const newRatings = ratings.filter(ele => dayjs(ele.createdAt).isBetween(dayjs(dateRange.startDate), dayjs(dateRange.endDate), 'date', '[]') === true)
		return newRatings;
	}

	useEffect(() => {
		const newRating = filterRatings(ratings);
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
