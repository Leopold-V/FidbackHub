import React, { useEffect, useState } from 'react';
import { Pagination } from 'components/pages/project/Pagination';
import { feedbackType } from 'types/index';
import { FeedbackItem } from './FeedbackItem';
import { ListFeedbacksHeader } from './ListFeedbacksHeader';

export const ListFeedbacks = ({ feedbacks }: { feedbacks: feedbackType[] }) => {
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
  };

  useEffect(() => {
    initCheckedFeedbacks();
    setcountchecked(0);
  }, [filterStatus]);

  useEffect(() => {
    setcurrentPageFirstFeedbacksIndex(pageLength * pageIndex);
  }, [pageIndex]);

  useEffect(() => {
    const newfeedbacksSorted = feedbacks.filter(
      (ele: feedbackType) => ele.title.toLowerCase().match(filterSearch.toLowerCase()) && ele.status === filterStatus,
    );
    setfeedbacksSorted(newfeedbacksSorted);
  }, [filterStatus, filterSearch]);

  useEffect(() => {
    setFeedbacksToDisplay(
      feedbacksSorted.slice(
        currentPageFirstFeedbacksIndex * pageIndex,
        currentPageFirstFeedbacksIndex * pageIndex + pageLength,
      ),
    );
  }, [currentPageFirstFeedbacksIndex, feedbacksSorted]);

  return (
    <div className="border border-3Background bg-zinc-900 duration-200 sm:rounded">
      <ListFeedbacksHeader
        initCheckedFeedbacks={initCheckedFeedbacks}
        setcountchecked={setcountchecked}
        setfilterStatus={setfilterStatus}
        setfilterSearch={setfilterSearch}
        filterStatus={filterStatus}
        filterSearch={filterSearch}
        feedbacksSorted={feedbacksSorted}
        setfeedbacksSorted={setfeedbacksSorted}
      />
      <ul className="divide-y divide-3Background">
        {feedbacksToDisplay.map((feedback) => (
          <FeedbackItem
            key={feedback.id.toString()}
            feedback={feedback}
            setcountchecked={setcountchecked}
            checkedFeedbacks={checkedFeedbacks}
            setcheckedFeedbacks={setcheckedFeedbacks}
          />
        ))}
      </ul>
      {
        <Pagination
          checkedFeedbacks={checkedFeedbacks}
          countchecked={countchecked}
          pageIndex={pageIndex}
          setpageIndex={setpageIndex}
          pageNumber={pageNumber}
          totalratings={feedbacksToDisplay.length}
          nbCurrentFeedbackDisplay={feedbacksToDisplay.length}
          pageLength={pageLength}
        />
      }
    </div>
  );
};
