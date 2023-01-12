import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { updateFeedback } from '../../../services/feedback.service';
import { toast } from 'react-toastify';
import { InputDecorators } from 'components/common/InputDecorators';
import { Spinner } from 'components/common/Spinner';
import { Button, ButtonDelete } from 'components/common/Button';
import { Modal } from 'components/common/Modal';
import { SelectState } from './SelectState';
import { feedbackColor } from '../../../utils/feedback';
import dayjs from 'dayjs';

const message = `Are you sure you want to close this feedback? The feedback will be permanently
closed. This action cannot be undone.`;

export const FeedbackDetails = ({ feedbackId }) => {
  const { data: session } = useSession();
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
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
    author_email: null,
    api_key: null,
    project: null,
  });
  const [currentstatus, setcurrentstatus] = useState('');

  useEffect(() => {
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
          setcurrentstatus(feedbackData.data.attributes.status);
        }
      } catch (error) {
        seterror(error.message);
      } finally {
        setloading(false);
      }
    })();
  }, [feedbackId]);

  const handleClickToClose = () => {
    setopen(true);
  };

  const handleUpdateStateFeedback = async () => {
    setloadingUpdate(true);
    try {
      await updateFeedback({ ...feedback, state: selectedState }, session.jwt);
      toast.success(`Feedback updated!`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloadingUpdate(false);
    }
  };
  const handleCloseFeedback = async () => {
    setloadingUpdate(true);
    try {
      await updateFeedback({ ...feedback, status: 'Close' }, session.jwt);
      toast.success(`Feedback closed!`);
      setcurrentstatus('Close');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloadingUpdate(false);
    }
  };

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
    <div className="py-4 px-3 text-sm space-y-3 flex flex-col items-center w-full">
      <h2 className="text-center text-base">{feedback.title}</h2>
      <p className="text-muted text-xs">{dayjs(feedback.createdAt).format('llll').toString()}</p>
      <p>{feedback.description}</p>
      {feedback.status === 'Open' ? (
        <SelectState selected={selectedState} setselected={setSelectedState} />
      ) : (
        <span
          className={`text-${feedbackColor(feedback.state)}-800 px-2.5 py-0.5 bg-${feedbackColor(
            feedback.state,
          )}-200 rounded-full text-sm`}
        >
          {feedback.state}
        </span>
      )}
      <p>{feedback.author_email}</p>
      <div className="flex flex-col sm:flex-row justify-center items-center py-4 items sm:space-x-4 spacex-x-0 sm:space-y-0  space-y-4">
        {currentstatus === 'Open' ? (
          <>
            <Button disabled={loadingUpdate} onClick={handleUpdateStateFeedback}>
              Save
            </Button>
            <ButtonDelete type="submit" onClick={handleClickToClose} disabled={loadingUpdate}>
              Close feedback
            </ButtonDelete>
          </>
        ) : (
          <p>This fidback is close.</p>
        )}
      </div>
      <Modal
        open={open}
        setopen={setopen}
        handleConfirm={handleCloseFeedback}
        title="Close a feedback"
        message={message}
      />
    </div>
  );
};
