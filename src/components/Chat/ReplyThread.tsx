// Recursively renders replies for a given parent comment id.
// @ts-nocheck
import React from 'react';
import Comment from './Comment';
import { useComments } from '../../hooks/useComments';

interface ReplyThreadProps {
  parentId: string;
  level: number;
}

const ReplyThread: React.FC<ReplyThreadProps> = ({ parentId, level }) => {
  const { commentsById, getReplies } = useComments();
  const parent = commentsById[parentId];
  if (!parent) return null;
  const replies = getReplies(parentId);

  return (
    <div className="ml-4 border-l pl-2">
      {replies.map((reply) => (
        <div key={reply.id}>
          <Comment
            comment={reply}
            level={level}
            onReply={() => {}}
            onReact={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
          />
          <ReplyThread parentId={reply.id} level={level + 1} />
        </div>
      ))}
    </div>
  );
};

export default ReplyThread;


