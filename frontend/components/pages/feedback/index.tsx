import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import {
  ArrowPathIcon,
  ChatBubbleBottomCenterTextIcon,
  LockClosedIcon,
  LockOpenIcon,
  PaperClipIcon,
} from '@heroicons/react/20/solid';
import { feedbackStateType, feedbackStatusType, feedbackType, feedbackTypeType } from 'types/index';
import img from 'public/images/screenshot_example.png';
import { formatDateToDisplay } from '../../../utils/formatDate';
import { SelectState } from 'components/common/SelectState';
import { Button, ButtonDelete, ButtonOutline } from 'components/common/Button';
import { updateFeedback, deleteFeedback } from '../../../services/feedback.service';
import { Modal } from 'components/common/Modal';
import { HeaderWrapper } from 'components/common/HeaderWrapper';
import { Card } from 'components/common/Card';
import { CommentZone } from './CommentZone';

const listState: feedbackStateType[] = ['New', 'In progress', 'Resolved', 'Rejected'];
const listStatus: feedbackStatusType[] = ['Open', 'Closed'];
const listType: feedbackTypeType[] = ['Bug report', 'Feature request', 'General feedback'];

const message = `Are you sure you want to delete this feedback? The feedback will be permanently
removed. This action cannot be undone.`;

export const FeedbackPageComponent = ({ feedback }: { feedback: feedbackType }) => {
  const { data: session } = useSession();
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [loadingDelete, setloadingDelete] = useState(false);
  const [open, setopen] = useState(false);
  const [selectedState, setSelectedState] = useState(feedback.state);
  const [selectedType, setSelectedType] = useState(feedback.type);
  const [selectedStatus, setSelectedStatus] = useState(feedback.status);

  const handleUpdateStateFeedback = async () => {
    setloadingUpdate(true);
    try {
      await updateFeedback(
        { ...feedback, state: selectedState, status: selectedStatus, type: selectedType },
        session.jwt,
      );
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

  return (
    <div>
      <HeaderWrapper>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 items-center">
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
              <div className="space-y-2">
                <div className="mx-auto w-full h-32 overflow-hidden cursor-pointer">
                  <Image src={img} alt="Screenshot for the feedback" layout="responsive" />
                </div>
              </div>
              <div className="py-4 text-sm border-b border-3Background space-y-2">
                <h3 className="text-mainText">Description</h3>
                <p className="text-muted">{feedback.description}</p>
              </div>

              <div className="flex">
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

                <div className="text-muted text-sm py-4 space-y-4 mx-auto">
                  <h3 className=" text-mainText">Device/System details</h3>
                  <p>
                    OS: <span className="text-secondaryText pl-2">Windows 10</span>
                  </p>
                  <p>
                    Browser: <span className="text-secondaryText pl-2">Firefox Firefox 108.0</span>
                  </p>
                  <p>
                    Resolution: <span className="text-secondaryText pl-2">1536 x 864</span>
                  </p>
                  <p>
                    Viewport: <span className="text-secondaryText pl-2">1536 x 711</span>
                  </p>
                </div>
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
          <div className="py-5">
            <Card>
              <div className="flex items-center space-x-1 text-secondaryText">
                <ChatBubbleBottomCenterTextIcon className="h-5 w-5" aria-hidden="true" />
                <h3 className="text-base ">Comments</h3>
              </div>
              <CommentZone />
            </Card>
          </div>
        </div>
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

export default FeedbackPageComponent;
