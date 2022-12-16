import { Card } from 'components/common/Card'
import { DividerTitle } from 'components/common/DividerTitle'
import React from 'react'
import { ratingType } from 'types/index'
import { AverageChart } from './AverageChart'

export const AverageChartSection = ({ ratings }: { ratings: ratingType[]}) => {
  return (
	<>
    	<DividerTitle title="Progression" />
		<h3 className="text-lg font-medium leading-6 text-gray-900"></h3>
		<Card>
			<div className="flex flex-col items-center">
				<div className="flex lg:flex-row lg:justify-start w-full flex-col space-x-6 items-center">
					<div>
						Filter
					</div>
				</div>
				<AverageChart ratings={ratings} />
			</div>
		</Card>
	</>
  )
}
