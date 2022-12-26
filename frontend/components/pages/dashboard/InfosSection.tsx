import { Card } from "components/common/Card";
import { ratingType } from "types/index";

export const InfoSection = ({ ratings }: { ratings: ratingType[]}) => {
  const avgRating = ratings.reduce((a, b) => {
    return a += b.average
  }, 0) / (ratings.length);
  const avgDesign = ratings.reduce((a, b) => {
    return a += b.design
  }, 0) / (ratings.length);
  const avgSpeed = ratings.reduce((a, b) => {
    return a += b.speed
  }, 0) / (ratings.length);
  const avgResponsive = ratings.reduce((a, b) => {
    return a += b.responsive
  }, 0) / (ratings.length);
  const bestAvg = Math.max(avgDesign, avgSpeed, avgResponsive);

  const bestCategory = () => {
    switch (bestAvg) {
      case avgDesign:
        return `Design - ${avgDesign.toFixed(2)}`
      case avgSpeed:
        return `Speed - ${avgSpeed.toFixed(2)}`
      case avgResponsive:
        return `Responsive - ${avgResponsive.toFixed(2)}`
      default:
        break;
    }
  }

  const stats = [
    { name: "Total ratings", stat: ratings.length },
    { name: "Avg. rating", stat: avgRating.toFixed(2) + '/10' },
    { name: "Best category", stat: bestCategory()},
  ];

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Total
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <Card key={item.name}>
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </Card>
        ))}
      </dl>
    </div>
  );
};
