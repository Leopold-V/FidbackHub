import { Card } from 'components/common/Card';
import { feedbackType } from 'types/index';

export const InfoSection = ({ feedbacks }: { feedbacks: feedbackType[] }) => {
  const numberOfOpenFeedback = feedbacks.filter(
    (ele: feedbackType) => ele.state !== 'Rejected' && ele.state !== 'Confirmed',
  ).length;
  const confirmedFeedback = feedbacks.filter((ele: feedbackType) => ele.state === 'Confirmed').length;
  const rejectedFeedback = feedbacks.filter((ele: feedbackType) => ele.state === 'Rejected').length;
  const totalProgress = confirmedFeedback > 0 ? (confirmedFeedback / (feedbacks.length - rejectedFeedback)) * 100 : 0;

  //TODO: update stats with real values
  const stats = [
    { name: 'Total feedbacks', stat: feedbacks.length },
    { name: 'Open', stat: numberOfOpenFeedback },
    { name: 'Total progress', stat: `${totalProgress.toFixed(2)}%` },
  ];

  return (
    <div>
      <h3 className="font-medium mb-3">Stats</h3>
      <ul className="flex flex-col space-y-3">
        {stats.map((item) => (
          <Card key={item.name}>
            <dt className="truncate text-sm font-medium text-secondaryText">{item.name}</dt>
            <dd className="mt-1 text-2xl font-semibold tracking-tight">{item.stat}</dd>
          </Card>
        ))}
      </ul>
    </div>
  );
};
