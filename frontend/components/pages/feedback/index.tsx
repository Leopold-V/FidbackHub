import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { updateFeedback } from '../../../services/feedback.service';
import { useFetch } from '../../../hooks/useFetch';
import { feedbackColor } from '../../../utils/feedback';
import { PageHeader } from 'components/common/PageHeader';
import { InputDecorators } from 'components/common/InputDecorators';
import { Spinner } from 'components/common/Spinner';
import { SelectState } from './SelectState';
import { ErrorAlert } from 'components/common/ErrorAlert';
import { SuccessAlert } from 'components/common/SuccessAlert';
import { Button, ButtonDelete } from 'components/common/Button';

const FeedbackPage = ({ id }) => {
  const { data: session } = useSession();
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [errorUpdate, seterrorUpdate] = useState<string | boolean>(false);
  const [selectedState, setSelectedState] = useState(null);
  const [successUpdate, setSuccessUpdate] = useState(false);
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
  });
  const [currentstatus, setcurrentstatus] = useState('');

  const { data: feedbackData, error, loading } = useFetch(`http://localhost:3000/api/feedbacks/${+id}`, session.jwt);

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
      seterrorUpdate(false);
      setSuccessUpdate(true);
    } catch (error) {
      seterrorUpdate(error.message);
      setSuccessUpdate(false);
    } finally {
      setloadingUpdate(false);
    }
  };
  const handleCloseFeedback = async () => {
    const result = confirm('Do you really want to close this fidback ?');
    if (result) {
      setloadingUpdate(true);
      try {
        await updateFeedback({ ...feedback, status: 'Close' }, session.jwt);
        seterrorUpdate(false);
        setSuccessUpdate(true);
        setcurrentstatus('Close');
      } catch (error) {
        console.log(error.message);
        seterrorUpdate(error.message);
        setSuccessUpdate(false);
      } finally {
        setloadingUpdate(false);
      }
    }
  };

  // TODO: SKELETON LOADING
  if (loading)
    return (
      <div className="flex flex-col items-center space-y-8">
        <PageHeader label={`Feedback ${id}`} />
        <Spinner />
        <h1 className="text-lg font-semibold">Loading your project data...</h1>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center space-y-8">
        <PageHeader label={`Feedback ${id}`} />
        <h1 className="text-lg font-semibold">{error}</h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center space-y-8 pb-8">
      <PageHeader label={`Feedback ${id}`} />
      <div className="flex flex-col xl:w-3/4 w-full mx-auto space-y-2 px-4">
        <h2 className="font-medium">
          Current status: <span>{currentstatus}</span>
        </h2>
        <div className="border border-3Background hover:border-4Background bg-stone-900 duration-200 sm:rounded p-1 divide-y divide-3Background">
          {errorUpdate && <ErrorAlert message={errorUpdate} />}
          {successUpdate && <SuccessAlert />}
          <InputDecorators label="Title">
            <p>{feedback.title}</p>
          </InputDecorators>
          <InputDecorators label="Description">
            <p>{feedback.description}</p>
          </InputDecorators>
          <InputDecorators label="State">
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
          </InputDecorators>
          <InputDecorators label="Author">
            <p>{feedback.author_email}</p>
          </InputDecorators>
          <div className="border-t border-3Background flex flex-col sm:flex-row justify-center items-center py-4 items sm:space-x-4 spacex-x-0 sm:space-y-0  space-y-4">
            {currentstatus === 'Open' ? (
              <>
                <Button disabled={loadingUpdate} onClick={handleUpdateStateFeedback}>
                  Save
                </Button>
                <ButtonDelete type="submit" onClick={handleCloseFeedback} disabled={loadingUpdate}>
                  Close feedback
                </ButtonDelete>
              </>
            ) : (
              <p>This fidback is close.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
