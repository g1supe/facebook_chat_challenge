import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './commentsSlice';
import usersReducer from './usersSlice';
import attachmentsReducer from './attachmentsSlice';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    users: usersReducer,
    attachments: attachmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
