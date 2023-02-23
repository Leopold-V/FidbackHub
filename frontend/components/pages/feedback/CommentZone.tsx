import React, { useState, memo } from 'react';
import { createComment } from '../../../services/comment.service';
import { commentType } from 'types/index';
import { formatDateToDisplay } from '../../../utils/formatDate';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

export const CommentZone = ({ _comments, feedbackId, projectId }: { _comments: commentType[], feedbackId: number, projectId: number }) => {
  const [comments, setcomments] = useState(_comments)
  
  return (
    <div className="text-sm pt-4">
      <ul className="p-1 rounded space-y-4 flex flex-col h-[16rem] overflow-y-auto">
        {comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
      </ul>
      <CommentInput feedbackId={feedbackId} projectId={projectId} setcomments={setcomments} />
    </div>
  );
};

const CommentItem = ({ comment }: { comment: commentType }) => {
  return (
    <li className="space-y-1">
      <div className=""><span className="text-muted">{comment.author}</span>, <span className="text-muted">{formatDateToDisplay(comment.createdAt)}</span></div>
      <div className="flex space-x-4 items-center">
          <img
            className="h-10 w-10 rounded-full"
            src={comment.user_avatar}
            alt="user avatar"
          />
        <pre 
          className=" whitespace-pre-wrap bg-secondaryBackground border border-secondaryBackground hover:border-4Background duration-200 text-gray-200 rounded-lg p-3">
            {comment.content}
        </pre>
      </div>
    </li>
  )
}

const CommentInput = memo<{ feedbackId: number, projectId: number, setcomments }>(({
    feedbackId,
    projectId,
    setcomments
}) => {
  const { data: session } = useSession();
  
  const [input, setinput] = useState('');

  const handleChange = (e) => {
    setinput(e.target.value);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const commentData = {
      content: input,
      author: session.user.name,
      user_avatar: session.user.image,
      feedback: feedbackId
    }
    try {
      await createComment(commentData, projectId, session.jwt);
      setcomments((comments) => [...comments, commentData]);
      setinput('');
      toast.success('New comment added!');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex items-start space-x-4 mt-8">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={session.user.image}
          alt="user avatar"
        />
      </div>
      <div className="min-w-0 flex-1">
        <form onSubmit={handleClick} className="relative">
          <div className="overflow-hidden shadow-sm rounded">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block w-full resize-none flex-grow text-secondaryText focus:text-mainText rounded-md border duration-200 focus:ring-2 focus:ring-indigo-500 border-3Background bg-3Background bg-opacity-25 py-2 leading-5 text-secondaryPrimary placeholder-gray-500 focus:placeholder-gray-600 outline-none text-sm"
              placeholder="Add your comment..."
              defaultValue={''}
              onChange={handleChange}
              value={input}
            />
            <div className="py-2" aria-hidden="true">
              <div className="px-py">
                <div className="h-8" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-end pl-3 pr-2 rounded-b">
  
              <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Post
              </button>
            
          </div>
        </form>
      </div>
    </div>
  )
})
