import { DividerTitle } from "components/common/DividerTitle"
import { MouseEvent, useState } from "react";
import { ratingType } from "types/index";
import { ListRatings } from "./ListRatings"

export const ListRatingsSection = ({ ratings }: { ratings: ratingType[]}) => {
  const [ratingsSorted, setratingsSorted] = useState(ratings);

  const sortRatingsAscending = (e: MouseEvent<HTMLButtonElement>) => {
    const category = e.currentTarget.dataset.category;
    let newratings = [];
    if (category === 'avg') {
      newratings = [...ratings].sort((a, b) => Math.round((a.design + a.speed + a.responsive) / 3) - Math.round((b.design + b.speed + b.responsive) / 3));
    } else if (category === 'createdAt') {
      newratings = [...ratings].sort((a, b) => new Date(a[category]).getTime() - new Date(b[category]).getTime());
    } else {
      newratings = [...ratings].sort((a, b) => a[category] - b[category]);
    }
    setratingsSorted(newratings);
  }

  const sortRatingsDescending = (e: MouseEvent<HTMLButtonElement>) => {
    const category = e.currentTarget.dataset.category;
    let newratings = [];
    console.log(category);
    if (category === 'avg') {
      newratings = [...ratings].sort((a, b) => Math.round((b.design + b.speed + b.responsive) / 3) - Math.round((a.design + a.speed + a.responsive) / 3));
    } else if (category === 'createdAt') {
      newratings = [...ratings].sort((a, b) => new Date(b[category]).getTime() - new Date(a[category]).getTime());
    } else {
      newratings = [...ratings].sort((a, b) => b[category] - a[category]);
    }
    setratingsSorted(newratings);
  }

    return (
      <>
        <DividerTitle title="List of ratings" />
        <ListRatings ratings={ratingsSorted} sortRatingsAscending={sortRatingsAscending} sortRatingsDescending={sortRatingsDescending} />
      </>
    )
  }