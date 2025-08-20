// Centralized comments logic for the UI layer.
// Exposes derived data (roots/replies) and write helpers (post comment/reply)
// so components stay small and focused on rendering.
import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store';
import { Comment as CommentType } from '../types/comment.types';
import { addComment as addCommentAction, addReply as addReplyAction } from '../store/commentsSlice';

type PostParams = {
  content: string;
  attachments?: File[] | string[];
  parentId?: string | null;
};

export const useComments = () => {
  const dispatch = useDispatch();
  const commentsById = useSelector((s: RootState) => s.comments.comments);
  const metadata = useSelector((s: RootState) => s.comments.metadata);
  const users = useSelector((s: RootState) => s.users.users);

  // Pick a sensible default author from the store so the demo works without auth.
  const defaultAuthorId = useMemo(() => Object.keys(users)[0] ?? 'user_1', [users]);

  const rootComments: CommentType[] = useMemo(
    () => Object.values(commentsById).filter((c) => c && c.parentId === null) as CommentType[],
    [commentsById]
  );

  // Child comments are stored by id; resolve safely and filter out any missing ids.
  const getReplies = useCallback(
    (parentId: string): CommentType[] => {
      const parent = commentsById[parentId];
      if (!parent || !Array.isArray(parent.replies)) return [];
      return parent.replies.map((id) => commentsById[id]).filter(Boolean) as CommentType[];
    },
    [commentsById]
  );

  // In UI we keep attachments as filenames only to avoid backend complexity.
  const normalizeAttachments = (attachments?: File[] | string[]): string[] => {
    if (!attachments) return [];
    if (attachments.length === 0) return [];
    const first = attachments[0] as any;
    if (first && typeof first.name === 'string') {
      return (attachments as File[]).map((f) => f.name);
    }
    return attachments as string[];
  };

  // Single entry-point to create either a root comment or a reply.
  const postComment = useCallback(
    ({ content, attachments, parentId = null }: PostParams) => {
      const newItem: CommentType = {
        id: uuidv4(),
        parentId: parentId ?? null,
        authorId: defaultAuthorId,
        content,
        timestamp: new Date().toISOString(),
        attachments: normalizeAttachments(attachments),
        reactions: {},
        mentions: [],
        isEdited: false,
        editedAt: null,
        replies: [],
      };
      if (parentId) {
        dispatch(addReplyAction({ parentId, reply: newItem }));
      } else {
        dispatch(addCommentAction(newItem));
      }
      return newItem;
    },
    [defaultAuthorId, dispatch]
  );

  const addComment = useCallback((comment: CommentType) => dispatch(addCommentAction(comment)), [dispatch]);
  const addReply = useCallback(
    (parentId: string, reply: CommentType) => dispatch(addReplyAction({ parentId, reply })),
    [dispatch]
  );

  return {
    commentsById,
    metadata,
    rootComments,
    getReplies,
    postComment,
    addComment,
    addReply,
  };
};

export default useComments;


