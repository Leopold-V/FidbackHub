import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Pagination } from 'components/pages/project/Pagination';
import { feedbackType } from 'types/index';
import { FeedbackItem } from './FeedbackItem';
import { ListFeedbacksHeader } from './ListFeedbacksHeader';
import { FeedbackDetails } from './FeedbackDetails';

export const FeedbacksSection = ({
  feedbacks,
  setfeedbacks,
  projectId,
}: {
  feedbacks: feedbackType[];
  setfeedbacks: (feedbacks: feedbackType[]) => void;
  projectId: number;
}) => {
  const { query } = useRouter();
  const feedbacksOpen = [...feedbacks].filter((ele) => ele.status === 'Open');
  const [feedbacksSorted, setfeedbacksSorted] = useState(feedbacksOpen);
  const [filterStatus, setfilterStatus] = useState('Open');
  const [filterSearch, setfilterSearch] = useState('');
  const [checkedFeedbacks, setcheckedFeedbacks] = useState({
    ...feedbacks.reduce((a, ele) => ({ ...a, [ele.id]: false }), {}),
  });
  const [countchecked, setcountchecked] = useState(0);

  const pageLength = 10;
  const pageNumber = Math.ceil(feedbacksSorted.length / pageLength);

  const [feedbacksToDisplay, setFeedbacksToDisplay] = useState(feedbacksSorted.slice(0, pageLength));
  const [pageIndex, setpageIndex] = useState(0);
  const [currentPageFirstFeedbacksIndex, setcurrentPageFirstFeedbacksIndex] = useState(pageLength * pageIndex);

  const initCheckedFeedbacks = () => {
    setcheckedFeedbacks({ ...feedbacks.reduce((a, ele) => ({ ...a, [ele.id]: false }), {}) });
    setcountchecked(0);
  };

  useEffect(() => {
    initCheckedFeedbacks();
  }, [filterStatus]);

  useEffect(() => {
    setcurrentPageFirstFeedbacksIndex(pageLength * pageIndex);
  }, [pageIndex]);

  useEffect(() => {
    const newfeedbacksSorted = feedbacks.filter(
      (ele: feedbackType) => ele.title.toLowerCase().match(filterSearch.toLowerCase()) && ele.status === filterStatus,
    );
    setfeedbacksSorted(newfeedbacksSorted);
  }, [filterStatus, filterSearch, feedbacks]);

  useEffect(() => {
    console.log(feedbacksSorted);
    setFeedbacksToDisplay(
      feedbacksSorted.slice(
        currentPageFirstFeedbacksIndex * pageIndex,
        currentPageFirstFeedbacksIndex * pageIndex + pageLength,
      ),
    );
  }, [currentPageFirstFeedbacksIndex, feedbacksSorted]);

  return (
    <div className="w-full h-full flex-grow flex flex-col">
      <ListFeedbacksHeader
        initCheckedFeedbacks={initCheckedFeedbacks}
        setfilterStatus={setfilterStatus}
        setfilterSearch={setfilterSearch}
        filterStatus={filterStatus}
        filterSearch={filterSearch}
        feedbacksSorted={feedbacksSorted}
        setfeedbacksSorted={setfeedbacksSorted}
      />
      <div className="grid grid-cols-7 flex-grow">
        <div className="col-span-2 flex flex-col bg-zinc-900 border-r border-3Background">
          <ul className="divide-y flex-grow divide-3Background">
            {feedbacksToDisplay.map((feedbacks) => (
              <FeedbackItem
                key={feedbacks.id.toString()}
                projectId={projectId}
                feedback={feedbacks}
                setcountchecked={setcountchecked}
                checkedFeedbacks={checkedFeedbacks}
                setcheckedFeedbacks={setcheckedFeedbacks}
              />
            ))}
          </ul>
          <Pagination
            setfeedbacks={setfeedbacks}
            initCheckedFeedbacks={initCheckedFeedbacks}
            checkedFeedbacks={checkedFeedbacks}
            countchecked={countchecked}
            pageIndex={pageIndex}
            setpageIndex={setpageIndex}
            pageNumber={pageNumber}
            totalratings={feedbacksToDisplay.length}
            nbCurrentFeedbackDisplay={feedbacksToDisplay.length}
            pageLength={pageLength}
          />
        </div>
        <div className="col-span-3 border-r border-3Background">
          <FeedbackDetails
            feedbackId={query.feedback || feedbacksSorted[0]?.id}
            feedbacks={feedbacks}
            setfeedbacks={setfeedbacks}
            projectId={projectId}
          />
        </div>
      </div>
    </div>
  );
};
