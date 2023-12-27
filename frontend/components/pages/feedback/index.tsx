import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { ArrowPathIcon, ChatBubbleBottomCenterTextIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/20/solid';
import { feedbackStateType, feedbackStatusType, feedbackType, feedbackTypeType, historyType } from 'types/index';
import img from 'public/images/screenshot_example.png';
import { updateFeedback, deleteFeedback } from '../../../services/feedback.service';
import { sendUpdateFeedbackNotif } from '../../../services/notif.service';
import { formatDateToDisplay } from '../../../utils/formatDate';
import { SelectState } from 'components/common/SelectState';
import { ButtonBack, ButtonDelete, ButtonOutline } from 'components/common/Button';
import { Modal } from 'components/common/Modal';
import { HeaderWrapper } from 'components/common/HeaderWrapper';
import { Card } from 'components/common/Card';
import { CommentZone } from './CommentZone';
import { ModalImage } from './ModalImage';

const listState: feedbackStateType[] = ['New', 'In progress', 'Resolved', 'Rejected'];
const listStatus: feedbackStatusType[] = ['Open', 'Closed'];
const listType: feedbackTypeType[] = ['Bug report', 'Feature request', 'General feedback'];

const message = `Are you sure you want to delete this feedback? The feedback will be permanently
removed. This action cannot be undone.`;

export const FeedbackPageComponent = ({
  _feedback,
  histories,
  projectId,
}: {
  _feedback: feedbackType;
  histories: historyType[];
  projectId: number;
}) => {
  const [feedback, setfeedback] = useState(_feedback);
  const { data: session } = useSession();
  const router = useRouter();
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [loadingDelete, setloadingDelete] = useState(false);
  const [open, setopen] = useState(false);
  const [openimage, setopenimage] = useState(false);
  const [selectedState, setSelectedState] = useState(feedback.state);
  const [selectedType, setSelectedType] = useState(feedback.type);
  const [selectedStatus, setSelectedStatus] = useState(feedback.status);

  const handleUpdateStateFeedback = async () => {
    setloadingUpdate(true);
    try {
      const { screenshot, metadata, ...newFeedback } = feedback; // destructuring because body limit for screenshot and some fields aren't updated anyway.
      await updateFeedback(
        { ...newFeedback, state: selectedState, status: selectedStatus, type: selectedType },
        session.jwt,
      );
      await sendUpdateFeedbackNotif(projectId, session.id, newFeedback.title);
      setfeedback((feedback) => ({ ...feedback, state: selectedState, status: selectedStatus, type: selectedType }));
      toast.success(`Feedback updated!`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloadingUpdate(false);
    }
  };

  const handleDeleteFeedback = async () => {
    setloadingDelete(true);
    try {
      await deleteFeedback(feedback.id, session.jwt);
      router.push(`/project/${projectId}`);
      toast.success(`Feedback deleted!`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloadingDelete(false);
    }
  };

  const handleClickToClose = () => {
    setopen(true);
  };

  const handleOpenImage = () => {
    setopenimage(true);
  };

  return (
    <div>
      <HeaderWrapper>
        <div className="flex justify-between items-center lg:flex-row flex-col">
          <div className="flex space-x-2 items-center">
            <ButtonBack link={`/project/${projectId}`} label="" />
            <h2 className="text-secondary">
              {feedback.type} #{feedback.id} - {feedback.title}
            </h2>
          </div>
          <div className="flex items-center justify-between">
            {feedback.status === 'Open' ? (
              <div className="flex items-center space-x-2">
                <LockOpenIcon className="h-4 w-4 text-green-400" aria-hidden="true" />
                <span className="font-medium text-green-400">Open - {feedback.state}</span>
              </div>
            ) : (
              <div className="flex items-center font-light space-x-2">
                <LockClosedIcon className="h-4 w-4 text-red-500" aria-hidden="true" />
                <span className="font-medium text-red-500">Closed - {feedback.state}</span>
              </div>
            )}
          </div>
          <div className="text-secondaryText">
            <div className=" text-sm">
              Open by <span className="">{feedback.author_email}</span>
            </div>
            <div className="flex items-center font-light">
              <span className=" text-sm">
                <time dateTime="2020-12-02">{formatDateToDisplay(feedback.createdAt)}</time>
              </span>
            </div>
          </div>
        </div>
      </HeaderWrapper>

      <div className="flex flex-col lg:flex-row lg:space-x-5 px-5">
        <div className="lg:w-1/2 flex flex-col">
          <div className="py-5">
            <Card>
              {feedback.screenshot && (
                <div className="mx-auto w-full h-32 overflow-hidden relative group">
                  <img
                    unoptimized
                    //@ts-ignore
                    src={feedback.screenshot || img}
                    alt="Screenshot for the feedback"
                    layout="responsive"
                    className="group-hover:blur-sm duration-500"
                  />
                  <ButtonOutline
                    className="focus:ring-main text-main border-main hover:bg-main hover:text-mainText opacity-0 group-hover:opacity-100 absolute z-10 -translate-y-1/2 duration-500 right-0 group-hover:right-1/3 top-1/2"
                    onClick={handleOpenImage}
                  >
                    Open
                  </ButtonOutline>
                </div>
              )}
              <div className="py-4 text-sm border-b border-3Background space-y-2">
                <h3 className="text-mainText">Description</h3>
                <p className="text-secondaryText">{feedback.description}</p>
              </div>

              <div className="flex space-x-4">
                <div className="flex flex-col space-y-4 py-4 text-sm">
                  <h3 className=" text-mainText">Status</h3>
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

                {_feedback.metadata && (
                  <div className="text-muted text-sm py-4 space-y-4 mx-auto">
                    <h3 className="text-mainText pb-2">Device/System details</h3>
                    <p>
                      OS: <span className="text-secondaryText pl-2">{_feedback.metadata.os}</span>
                    </p>
                    <p>
                      Browser: <span className="text-secondaryText pl-2">{_feedback.metadata.userAgent}</span>
                    </p>
                    <p>
                      Resolution:{' '}
                      <span className="text-secondaryText pl-2">
                        {_feedback.metadata.resolutionWidth} x {_feedback.metadata.resolutionHeight}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-center space-x-3 pt-3">
                <ButtonOutline disabled={loadingUpdate} className="space-x-1" onClick={handleUpdateStateFeedback}>
                  <ArrowPathIcon className="h-5 w-5" aria-hidden="true" />
                  <span>Update</span>
                </ButtonOutline>
                <ButtonDelete type="submit" onClick={handleClickToClose} disabled={loadingDelete}>
                  Delete
                </ButtonDelete>
              </div>
            </Card>
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col">
          <div className="py-5 min-h-[screen]">
            <Card>
              <div className="flex items-center space-x-2">
                <ChatBubbleBottomCenterTextIcon className="h-5 w-5" aria-hidden="true" />
                <h3 className="text-base text-mainText">Comments</h3>
              </div>
              <CommentZone
                _comments={feedback.comments}
                histories={histories}
                feedbackId={feedback.id}
                projectId={projectId}
              />
            </Card>
          </div>
        </div>
      </div>
      <ModalImage image={feedback.screenshot || img} open={openimage} setopen={setopenimage} />
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

export default FeedbackPageComponent;
