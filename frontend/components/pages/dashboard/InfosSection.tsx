import { Card } from 'components/common/Card';
import { DividerTitle } from 'components/common/DividerTitle';
import { feedbackType } from 'types/index';

export const InfoSection = ({ feedbacks }: { feedbacks: feedbackType[] }) => {
  const openFeedback = feedbacks.filter((ele) => ele.status === 'Open').length;
  const closeFeedback = feedbacks.filter((ele) => ele.status === 'Close').length;

  const stats = [
    { name: 'Total feedbacks', stat: feedbacks.length },
    { name: 'Open', stat: openFeedback },
    { name: 'Close', stat: closeFeedback },
  ];

  return (
    <>
      <DividerTitle title="Stats" />
      <ul className="flex flex-col md:flex-row w-full items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
        {stats.map((item) => (
          <div key={item.name} className="flex-grow">
            <Card>
              <dt className="truncate text-sm font-medium text-secondaryText">{item.name}</dt>
              <dd className="mt-1 text-2xl font-semibold tracking-tight">{item.stat}</dd>
            </Card>
          </div>
        ))}
      </ul>
    </>
  );
};
