// One comment item: shows author, content, attachments, and a quick reply form.
// Uses the comments hook for posting replies to keep logic out of the component.
// @ts-nocheck
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useComments } from '../../hooks/useComments';
import { RootState } from '../../store';
import { Comment as CommentType } from '../../types/comment.types';
import CommentForm from './CommentForm';
import { highlightMentions } from '../../utils/textUtils';
import { formatTimestamp } from '../../utils/dateUtils';

interface CommentProps {
  comment: CommentType;
  level: number;
  onReply: (commentId: string) => void;
  onReact: (commentId: string, emoji: string) => void;
  onEdit: (commentId: string, newContent: string) => void;
  onDelete: (commentId: string) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, level, onReply, onReact, onEdit, onDelete }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  // Resolve the display name from store; fall back to id for safety.
  const users = useSelector((state: RootState) => state.users.users);
  const authorName = useMemo(() => users[comment.authorId]?.displayName ?? comment.authorId, [users, comment.authorId]);
  const { postComment } = useComments();

  const handleReplySubmit = ({ content, attachments }: { content: string; attachments?: File[] }) => {
    postComment({ content, attachments, parentId: comment.id });
    setShowReplyForm(false);
  };

  return (
    <div className={`pl-${level * 4} py-2 border-b`}>
      <div className="flex items-center gap-2">
        <span className="font-semibold">{authorName}</span>
        <span className="text-xs text-gray-400">{formatTimestamp(comment.timestamp)}</span>
      </div>
      <div className="my-1 text-left">{highlightMentions(comment.content)}</div>
      {comment.attachments && comment.attachments.length > 0 && (
        <div className="mt-1 text-xs text-gray-600">
          Attachments: {comment.attachments.map((file, idx) => (
            <span key={idx} className="underline mr-2">{file}</span>
          ))}
        </div>
      )}
      <div className="flex gap-2 text-xs text-blue-500 cursor-pointer">
        <span onClick={() => setShowReplyForm(v => !v)}>Reply</span>
        <span onClick={() => onEdit(comment.id, comment.content)}>Edit</span>
        <span onClick={() => onDelete(comment.id)}>Delete</span>
      </div>
      {showReplyForm && (
        <CommentForm
          parentId={comment.id}
          onSubmit={handleReplySubmit}
          onCancel={() => setShowReplyForm(false)}
        />
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-4 border-l pl-2">
          {comment.replies.map(replyId => (
            null
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
