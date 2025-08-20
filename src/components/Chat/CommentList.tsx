// Renders all root comments and defers nested rendering to ReplyThread.
// @ts-nocheck
import React from 'react';
import ReplyThread from './ReplyThread';
import Comment from './Comment';
import { useComments } from '../../hooks/useComments';

const CommentList: React.FC = () => {
  const { rootComments } = useComments();

  return (
    <div>
      {rootComments.length === 0 && <p>No comments yet.</p>}
      {rootComments.map((comment: CommentType) => (
        <div key={comment.id}>
          <Comment
            comment={comment}
            level={0}
            onReply={() => {}}
            onReact={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
          />
          {/* Render replies recursively */}
          <ReplyThread parentId={comment.id} level={1} />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
