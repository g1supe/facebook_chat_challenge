// @ts-nocheck
import React, { useState } from 'react';
import EmojiPicker from './EmojiPicker';
import FileUpload from './FileUpload';
import { MentionsInput, Mention } from 'react-mentions';
import useUserMentions from '../../hooks/useUserMentions';

interface CommentFormProps {
  parentId?: string;
  placeholder?: string;
  onSubmit: (data: { content: string; attachments?: File[]; mentions?: string[] }) => void;
  onCancel?: () => void;
  maxLength?: number;
  allowAttachments?: boolean;
}

// Lightweight, focused form for posting comments/replies.
// Mentions and emoji are handled inline for simplicity.

function CommentForm({
  parentId,
  placeholder = 'Write a comment...',
  onSubmit,
  onCancel,
  maxLength = 500,
  allowAttachments = true,
}: CommentFormProps): React.ReactElement {
  const [content, setContent] = useState<string>('');
  const usersList = useUserMentions();
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showEmoji, setShowEmoji] = useState(false);

  const handleEmojiPick = (emoji: string) => {
    setContent((prev) => prev + emoji);
  };

  // Keep submission tiny: gather mentions with a simple regex and reset.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Extract mentions from content (simple regex for @display)
    const mentionMatches = content.match(/@\w+/g) || [];
    const mentions = mentionMatches.map(m => m.replace('@', ''));
    onSubmit({ content, attachments, mentions });
    setContent('');
    setAttachments([]);
    setShowEmoji(false);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="relative">
        <MentionsInput
          value={content || ''}
          onChange={(_event: unknown, newValue: string) => setContent(newValue)}
          className="border border-gray-600 rounded p-3 resize-none w-full min-h-[60px] cls-textarea"
          placeholder={placeholder}
          maxLength={maxLength}
        >
          <Mention
            trigger="@"
            data={usersList}
            markup="@__display__"
            displayTransform={(id: string, display: string) => `@${display || id}`}
          />
        </MentionsInput>
        <button type="button" className="absolute right-2 top-2" onClick={() => setShowEmoji(v => !v)}>
          😊
        </button>
        {showEmoji && (
          <div className="absolute z-10 top-10 right-0">
            <EmojiPicker onPick={handleEmojiPick} />
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {allowAttachments && (
          <FileUpload multiple onChange={(files: File[]) => setAttachments(files)} />
        )}
        <span className="text-sm text-gray-500 ml-auto">{content.length}/{maxLength}</span>
      </div>
      <div className="flex gap-2 justify-end">
        {onCancel && (
          <button type="button" className="px-3 py-1 rounded bg-gray-200" onClick={onCancel}>Cancel</button>
        )}
        <button type="submit" className="px-3 py-1 rounded bg-blue-500 text-white">Post</button>
      </div>
    </form>
  );
}

export default CommentForm;
