import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { ArrowPathIcon, CalendarIcon, ChatBubbleBottomCenterTextIcon, LockClosedIcon, LockOpenIcon, PaperClipIcon } from '@heroicons/react/20/solid';
import { feedbackStateType, feedbackStatusType, feedbackType, feedbackTypeType } from 'types/index';
import img from 'public/images/screenshot_example.png';
import { formatDateToDisplay } from '../../../utils/formatDate';
import { SelectState } from 'components/common/SelectState';
import { Button, ButtonDelete } from 'components/common/Button';
import { updateFeedback, deleteFeedback } from '../../../services/feedback.service';
import { Modal } from 'components/common/Modal';
import { HeaderWrapper } from 'components/common/HeaderWrapper';
import { Card } from 'components/common/Card';

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
				{ ...feedback, state: selectedState, status: selectedStatus, type: selectedType, },
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
					<h2 className="text-secondary">Feedback #{feedback.id}</h2>
					<ButtonDelete type="submit" onClick={handleClickToClose} disabled={loadingDelete}>
						Delete
					</ButtonDelete>
				</div>
			</HeaderWrapper>

			<div className="flex flex-col lg:flex-row lg:space-x-5 px-5">
			<div className="lg:w-1/2 flex flex-col">
				<div className="py-5">
					<Card>
						<div className="border-b border-3Background space-y-4 pb-4">
							<h3 className="font-semibold text-lg text-indigo-400">{feedback.title}</h3>
							<div className="text-muted text-sm">
								#{feedback.id} Open by <span className="text-secondaryText">{feedback.author_email}</span> in category <span className="text-secondaryText">{feedback.type}</span>
							</div>
						</div>
						<div className="py-4 text-sm border-b border-3Background space-y-2">
							<h3 className="text-lg text-mainText">Description</h3>
							<p className="text-secondaryText">{feedback.description}</p>
						</div>
						<div className="text-muted py-4 text-sm space-y-2">
							<h3 className="text-lg text-mainText">Metadata</h3>
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
					</Card>
				</div>
				<Card>

				<div className=" border-b border-3Background text-mainText pb-4 flex space-x-2 items-center">
				<ChatBubbleBottomCenterTextIcon className="h-5 w-5" aria-hidden="true" />
				<h3 className="text-lg">Comments</h3>
				</div>
				</Card>
			</div>

			<div className="lg:w-1/2 flex flex-col">
			<div className="py-5">
				<Card>
					<div className="space-y-5 text-sm pb-4 border-b border-3Background">
						{feedback.status === 'Open' ? (<div className="flex items-center space-x-2">
							<LockOpenIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
							<span className="font-medium text-green-400">Open - {feedback.state}</span>
						</div>) : (
							<div className="flex items-center space-x-2">
								<LockClosedIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
								<span className="font-medium text-red-500">Closed - {feedback.state}</span>
							</div>
						)}
						<div className="flex items-center space-x-2">
							<CalendarIcon className="h-5 w-5 text-secondaryText" aria-hidden="true" />
							<span className=" text-secondaryText">
								Created on <time dateTime="2020-12-02">{formatDateToDisplay(feedback.createdAt)}</time>
							</span>
						</div>
					</div>
					<div className="flex flex-col space-y-4 text-sm pt-4">
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
						<div className="mx-auto">
						<Button disabled={loadingUpdate} className="space-x-1" onClick={handleUpdateStateFeedback}>
							<ArrowPathIcon className="h-5 w-5" aria-hidden="true" />
							<span>Update</span>
						</Button>
						</div>
					</div>
				</Card>
			</div>
			<Card>
				<div className=" border-b border-3Background text-mainText pb-4 flex space-x-2 items-center">
				<PaperClipIcon className="h-5 w-5" aria-hidden="true" />
				<h3 className="text-lg">Screen capture</h3>
				</div>
				<div className="mx-auto w-1/2 py-4">
					<Image src={img} alt="Screenshot for the feedback" layout="intrinsic" />
				</div>
			</Card>
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

/*
<div className="col-span-1 w-7/12 mx-auto">
	<Image src={img} alt="Screenshot for the feedback" layout="intrinsic" />
</div>
*/

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
