import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { CalendarIcon, LockOpenIcon } from '@heroicons/react/20/solid';
import { deleteFeedback, updateFeedback } from '../../../services/feedback.service';
import { formatDateToDisplay } from '../../../utils/formatDate';
import { feedbackStateType, feedbackStatusType, feedbackTypeType } from 'types/index';
import { Spinner } from 'components/common/Spinner';
import { Button, ButtonDelete } from 'components/common/Button';
import { Modal } from 'components/common/Modal';
import { SelectState } from '../../common/SelectState';

import img from 'public/images/screenshot_example.png';

const listState: feedbackStateType[] = ['New', 'In progress', 'Resolved', 'Rejected'];
const listStatus: feedbackStatusType[] = ['Open', 'Closed'];
const listType: feedbackTypeType[] = ['Bug report', 'Feature request', 'General feedback'];

const message = `Are you sure you want to delete this feedback? The feedback will be permanently
removed. This action cannot be undone.`;

export const FeedbackDetails = ({ feedbackId, feedbacks, setfeedbacks, projectId }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState<boolean | string>(false);
  const [open, setopen] = useState(false);
  const [feedback, setfeedback] = useState({
    id: null,
    title: null,
    createdAt: null,
    updatedAt: null,
    description: null,
    status: null,
    state: null,
    type: null,
    author_email: null,
    api_key: null,
    project: null,
  });

  useEffect(() => {
    if (feedbackId) {
      (async () => {
        setloading(true);
        try {
          const reponse = await fetch(`http://localhost:3000/api/feedbacks/${feedbackId}`, {
            headers: {
              authorization: 'Bearer ' + session.jwt,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
          const feedbackData = await reponse.json();
          if (feedbackData.data.attributes) {
            setfeedback({
              ...feedbackData.data.attributes,
              api_key: feedbackData.data.attributes.project.api_key,
              id: feedbackData.data.id,
            });
            setSelectedState(feedbackData.data.attributes.state);
            setSelectedStatus(feedbackData.data.attributes.status);
            setSelectedType(feedbackData.data.attributes.type);
          }
        } catch (error) {
          seterror(error.message);
        } finally {
          setloading(false);
        }
      })();
    }
  }, [feedbackId]);

  const handleUpdateStateFeedback = async () => {
    setloadingUpdate(true);
    try {
      await updateFeedback({ ...feedback, state: selectedState, status: selectedStatus, type: selectedType }, session.jwt);
      const indexOfeedback = feedbacks.findIndex((ele) => ele.id === +feedbackId);
      const newFeedbacks = [...feedbacks];
      newFeedbacks[indexOfeedback] = { ...feedback, state: selectedState, status: selectedStatus, type: selectedType };
      setfeedbacks(newFeedbacks);
      toast.success(`Feedback updated!`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloadingUpdate(false);
    }
  };

  const handleDeleteFeedback = async () => {
    setloadingUpdate(true);
    try {
      await deleteFeedback(feedbackId, session.jwt);
      setfeedbacks((feedbacks) => ([...feedbacks].filter((ele) => ele.id !== +feedbackId)));
      router.push(`http://localhost:3000/project/${projectId}`);
      toast.success(`Feedback deleted!`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloadingUpdate(false);
    }
  };

  const handleClickToClose = () => {
    setopen(true);
  };

  if (!feedbackId) {
    return (
      <div className="flex flex-col h-full justify-center items-center space-y-8">
        <h1 className="text-lg font-semibold ">No feedback found!</h1>
      </div>
    );
  }

  // TODO: SKELETON LOADING
  if (loading)
    return (
      <div className="flex flex-col h-full justify-center items-center space-y-8">
        <Spinner />
        <h1 className="text-lg font-semibold ">Loading your project data...</h1>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center h-full justify-center space-y-8">
        <h1 className="text-lg font-semibold">{error}</h1>
      </div>
    );

  return (
    <div className="py-4 px-6 text-sm flex flex-col divide-y divide-3Background">
      <div className="grid grid-cols-2 pb-4 gap-3">
        <div className="col-span-1 flex flex-col space-y-4">
          <h3 className="text-left text-xl font-semibold">{feedback.title}</h3>
          <div className="text-secondaryText">
            #{feedback.id} Open by <span className="text-mainText">{feedback.author_email}</span>
          </div>
          <div className="space-y-5">
            <div className="flex items-center space-x-2">
              <LockOpenIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
              <span className="text-sm font-medium text-green-400">Open - {feedback.type}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-secondary" aria-hidden="true" />
              <span className=" text-secondaryText">
                Created on <time dateTime="2020-12-02">{formatDateToDisplay(feedback.createdAt)}</time>
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1 w-7/12 mx-auto">
          <Image src={img} alt="Screenshot for the feedback" layout="intrinsic" />
        </div>
      </div>

      <div className="grid grid-cols-2 pb-4 gap-3">
        <div className="col-span-1 flex flex-col space-y-4 py-4">
          <div className="flex items-center space-x-3 w-full">
            <span className=" text-secondaryText text-right w-12">Type: </span>
            <div className="">
              <SelectState selected={selectedType} setselected={setSelectedType} listItems={listType} />
            </div>
          </div>
          <div className="flex items-center space-x-3 w-full">
            <span className=" text-secondaryText text-right w-12">State: </span>
            <div className="">
              <SelectState selected={selectedState} setselected={setSelectedState} listItems={listState} />
            </div>
          </div>
          <div className="flex items-center space-x-3 w-full">
            <span className=" text-secondaryText text-right w-12">Status: </span>
            <div className="">
              <SelectState selected={selectedStatus} setselected={setSelectedStatus} listItems={listStatus} />
            </div>
          </div>
        </div>
        <div className="text-secondaryText col-span-1 flex flex-col justify-between mx-auto py-4">
          <p>
            OS: <span className="text-mainText">Windows 10</span>
          </p>
          <p>
            Browser: <span className="text-mainText">Firefox Firefox 108.0</span>
          </p>
          <p>
            Resolution: <span className="text-mainText">1536 x 864</span>
          </p>
          <p>
            Viewport: <span className="text-mainText">1536 x 711</span>
          </p>
        </div>
      </div>

      <div className="pt-4 flex space-x-4 justify-center w-full">
        <Button disabled={loadingUpdate} onClick={handleUpdateStateFeedback}>
          Save
        </Button>
        <ButtonDelete type="submit" onClick={handleClickToClose} disabled={loadingUpdate}>
          Delete
        </ButtonDelete>
      </div>
      <Modal
        open={open}
        setopen={setopen}
        handleConfirm={handleDeleteFeedback}
        title="Delete a feedback"
        message={message}
      />
    </div>
  );
};

/*
Session Environment

Website
http://localhost:3000/projects
OS
	Windows Windows 10
Browser
	Firefox Firefox 108.0
Resolution
	
1536 x 864
Viewport
	1536 x 711
Pixel Ratio
	@1.25x
Zoom
	100%

*/
