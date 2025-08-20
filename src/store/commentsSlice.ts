// Store slice for comments, with optional JSON seeding for demo purposes.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentMetadata } from '../types/comment.types';
import commentsSeedJson from '../data/comments.json';

interface CommentsState {
  comments: Record<string, Comment>;
  metadata: CommentMetadata;
}

const seed = commentsSeedJson as unknown as {
  comments?: Record<string, Comment>;
  metadata?: CommentMetadata;
};

const initialState: CommentsState = {
  comments: seed.comments ?? {},
  metadata: seed.metadata ?? {
    totalComments: 0,
    lastUpdated: '',
  },
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments[action.payload.id] = action.payload;
      state.metadata.totalComments += 1;
      state.metadata.lastUpdated = new Date().toISOString();
    },
    addReply: (state, action: PayloadAction<{ parentId: string; reply: Comment }>) => {
      const { parentId, reply } = action.payload;
      state.comments[reply.id] = reply;
      if (state.comments[parentId]) {
        state.comments[parentId].replies.push(reply.id);
      }
      state.metadata.totalComments += 1;
      state.metadata.lastUpdated = new Date().toISOString();
    },
    // More actions (edit, delete, etc.) can be added here
  },
});

export const { addComment, addReply } = commentsSlice.actions;
export default commentsSlice.reducer;
