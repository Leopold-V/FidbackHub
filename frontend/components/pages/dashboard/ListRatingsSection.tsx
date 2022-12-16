import { DividerTitle } from "components/common/DividerTitle"
import { ListRatings } from "./ListRatings"

export const ListRatingsSection = ({ ratings }) => {
    return (
      <>
	    <DividerTitle title="List of ratings" />
        <ListRatings ratings={ratings} />
      </>
    )
  }