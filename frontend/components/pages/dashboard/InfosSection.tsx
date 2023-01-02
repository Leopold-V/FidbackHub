import { Card } from 'components/common/Card';
import { feedbackType } from 'types/index';

export const InfoSection = ({ feedbacks }: { feedbacks: feedbackType[] }) => {

  //TODO: update stats with real values
  const stats = [
    { name: 'Total feedbacks', stat: feedbacks.length },
    { name: 'Open', stat: feedbacks.length > 0 ? 2 : 0 },
    { name: 'Total progress', stat: '78%'},
  ];

  return (
    <div>
      <h3 className="text-lg font-medium leading-6">Total</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <Card key={item.name}>
            <dt className="truncate text-sm font-medium text-secondaryText">{item.name}</dt>
            <dd className="mt-1 text-2xl font-semibold tracking-tight">{item.stat}</dd>
          </Card>
        ))}
      </dl>
    </div>
  );
};
