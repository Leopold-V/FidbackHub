import { ButtonOutline } from 'components/common/Button';
import React from 'react';
import { createComment } from '../../../services/comment.service';
import { commentType } from 'types/index';
import { formatDateToDisplay } from '../../../utils/formatDate';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

export const CommentZone = ({ comments, projectId }: { comments: commentType[], projectId: number }) => {
  const { data: session } = useSession();

  const handleClick = async () => {
    const fakeComment = {
      content: 'hello new comment test',
      author: 'leopold12d12@gmail.com'
    }
    try {
      await createComment(fakeComment, projectId, session.jwt);
      toast.success('New comment added!');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="text-sm py-2">
      <ul>
        {comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
      </ul>
      <ButtonOutline onClick={handleClick}>New comment</ButtonOutline>
    </div>
  );
};

const CommentItem = ({ comment }: { comment: commentType }) => {
  return (
    <li>
      <div>{comment.content}</div>
      <div>{comment.author}</div> 
      <div>{formatDateToDisplay(comment.createdAt)}</div> 
    </li>
  )
}
