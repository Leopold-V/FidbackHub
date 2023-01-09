import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { updateFeedback } from '../../../services/feedback.service';
import { useFetch } from '../../../hooks/useFetch';
import { toast } from 'react-toastify';
import { feedbackColor } from '../../../utils/feedback';
import { PageHeader } from 'components/common/PageHeader';
import { InputDecorators } from 'components/common/InputDecorators';
import { Spinner } from 'components/common/Spinner';
import { SelectState } from './SelectState';
import { ErrorAlert } from 'components/common/ErrorAlert';
import { SuccessAlert } from 'components/common/SuccessAlert';
import { Button, ButtonDelete } from 'components/common/Button';
import { FeedbackHeader } from './FeedbackHeader';
import { Modal } from 'components/common/Modal';

const message = `Are you sure you want to close this feedback? The feedback will be permanently
closed. This action cannot be undone.`;

const FeedbackPage = ({ id }) => {
  const { data: session } = useSession();
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
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

  const { data: feedbackData, error, loading } = useFetch(`http://localhost:3000/api/feedbacks/${+id}`, session.jwt);

  const handleClickToClose = () => {
    setopen(true);
  };

  useEffect(() => {
    if (feedbackData) {
      setfeedback({
        ...feedbackData.data.attributes,
        api_key: feedbackData.data.attributes.project.api_key,
        id: feedbackData.data.id,
      });
      setSelectedState(feedbackData.data.attributes.state);
      setcurrentstatus(feedbackData.data.attributes.status);
    }
  }, [feedbackData]);

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
      <div className="flex flex-col items-center space-y-8">
        <div className="w-full bg-stone-900 border-b py-8 border-3Background">
          <div className="text-center sm:text-left sm:w-3/4 mx-auto">
            <div className="relative flex justify-center items-center">
              <h1 className="text-2xl font-bold py-3 text-center">Feedback</h1>
            </div>
          </div>
        </div>
        <Spinner />
        <h1 className="text-lg font-semibold">Loading your project data...</h1>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center space-y-8">
        <div className="w-full bg-stone-900 border-b py-8 border-3Background">
          <div className="text-center sm:text-left sm:w-3/4 mx-auto">
            <div className="relative flex justify-center items-center">
              <h1 className="text-2xl font-bold py-3 text-center">Feedback</h1>
            </div>
          </div>
        </div>
        <h1 className="text-lg font-semibold">{error}</h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center space-y-8 pb-8">
      <FeedbackHeader label="Feedback" projectId={feedbackData.data.attributes.project.id} />
      <div className="flex flex-col xl:w-3/4 w-full mx-auto space-y-2 px-4">
        <h2 className="font-medium">
          Current status: <span>{currentstatus}</span>
        </h2>
        <div className="border border-3Background hover:border-4Background bg-stone-900 duration-200 sm:rounded p-1 divide-y divide-3Background">
          <InputDecorators label="Title">
            <p>{feedback.title}</p>
          </InputDecorators>
          <InputDecorators label="Description">
            <p>{feedback.description}</p>
          </InputDecorators>
          {/* <InputDecorators label="State">
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
          </InputDecorators> */}
          <InputDecorators label="Author">
            <p>{feedback.author_email}</p>
          </InputDecorators>
          <div className="border-t border-3Background flex flex-col sm:flex-row justify-center items-center py-4 items sm:space-x-4 spacex-x-0 sm:space-y-0  space-y-4">
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
        </div>
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

export default FeedbackPage;
