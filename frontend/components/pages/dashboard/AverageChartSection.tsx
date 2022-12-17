import { Card } from 'components/common/Card'
import { DividerTitle } from 'components/common/DividerTitle'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { ratingType } from 'types/index'
import { AverageChart } from './AverageChart'
import { DateFilter } from './DateFilter'

export const AverageChartSection = ({ ratings }: { ratings: ratingType[]}) => {
	const [dateRange, setdateRange] = useState({ 
		startDate: dayjs().subtract(7, 'day'), 
		endDate: dayjs(new Date())
	});

  return (
	<>
    <DividerTitle title="Progression" />
		<Card>
			<div className="flex flex-col items-center">
				<div className="self-start">
						<DateFilter dateRange={dateRange} setdateRange={setdateRange} />
				</div>
				<div className="my-2">
					<AverageChart ratings={ratings} />
				</div>
			</div>
		</Card>
	</>
  )
}
