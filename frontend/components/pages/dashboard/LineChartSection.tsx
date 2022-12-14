import React from 'react'
import { ratingType } from 'types/index'
import { LineTest } from './Line'

export const LineChartSection = ({ ratings }: { ratings: ratingType[]}) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded shadow">
		<div className="flex lg:flex-row lg:justify-start w-full flex-col space-x-6 items-center">
			<h2 className="text-center text-lg lg:w-1/4">Progression</h2>
			<div>
				Filter
			</div>
		</div>
		<div className="flex lg:flex-row flex-col justify-center items-center">
			<LineTest ratings={ratings} />
		</div>
    </div>
  )
}
