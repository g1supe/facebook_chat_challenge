// Top-level chat card: form + list. Business logic lives in useComments.
// @ts-nocheck
import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { useComments } from '../../hooks/useComments';

const ChatContainer: React.FC = () => {
  const { postComment } = useComments();

  const handleAddComment = ({ content, attachments }: { content: string; attachments?: File[] }) => {
    postComment({ content, attachments, parentId: null });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded shadow p-4">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <CommentForm onSubmit={handleAddComment} />
      <div className="mt-6">
        <CommentList />
      </div>
    </div>
  );
};

export default ChatContainer;
