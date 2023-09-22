import React from 'react';
import { Card } from 'components/common/Card';
import { DividerTitle } from 'components/common/DividerTitle';
import { feedbackType } from 'types/index';
import { ProgressLineChart } from './ProgressLineChart';
import { useDateFilterForFeedbacks } from '../../../hooks/useDateFilterForFeedbacks';
import { DateButtonGroups } from './DateButtonsGroup';
import dayjs from 'dayjs';

export const ProgressLineChartSection = ({
  feedbacks,
  projectId,
}: {
  feedbacks: feedbackType[];
  projectId: number;
}) => {
  const [feedbacksFiltered, dateRange, setdateRange] = useDateFilterForFeedbacks(
    feedbacks,
    projectId,
    dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
  );

  return (
    <>
      <DividerTitle title="Progression" />
      <Card>
        <div className="flex flex-col mb-2 items-center space-y-4">
          <div className="flex lg:flex-row flex-col items-center justify-between w-full">
            <h2 className="pb-2 lg:pb-0">Reported feedbacks</h2>
            <DateButtonGroups setdateRange={setdateRange} firstDate={feedbacks[0].createdAt} />
          </div>
          <div className="w-full flex justify-center">
            <ProgressLineChart feedbacks={feedbacksFiltered} dateRange={dateRange} />
          </div>
        </div>
      </Card>
    </>
  );
};
