import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { ratingType } from 'types/index';
import { RatingBarChart } from './RatingBarChart'
import { DateFilter } from './DateFilter'
import { Card } from 'components/common/Card';
import { DividerTitle } from 'components/common/DividerTitle';

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
	    <DividerTitle title="Overall ratings" />
		<Card >
			<div className="flex flex-col items-center">
				<div className="self-start">
					<DateFilter dateRange={dateRange} setdateRange={setdateRange} />
				</div>
				<div className="flex lg:flex-row flex-col justify-center items-center">
					<RatingBarChart title={"Design"} ratings={ratingsFiltered} ratingType="design" />
					<RatingBarChart title={"Speed"} ratings={ratingsFiltered} ratingType="speed" />
					<RatingBarChart title={"Responsive"} ratings={ratingsFiltered} ratingType="responsive" />
				</div>
			</div>
		</Card>
	</>
  )
}
