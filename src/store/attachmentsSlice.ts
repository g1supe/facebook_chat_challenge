// Store slice for attachments. Seeded locally for demo, no upload backend.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Attachment } from '../types/attachment.types';
import attachmentsSeedJson from '../data/attachments.json';

interface AttachmentsState {
  attachments: Record<string, Attachment>;
}

type AttachmentsSeed = { attachments?: Record<string, Attachment> };
const seed = attachmentsSeedJson as unknown as AttachmentsSeed;

const initialState: AttachmentsState = {
  attachments: seed.attachments ?? {},
};

const attachmentsSlice = createSlice({
  name: 'attachments',
  initialState,
  reducers: {
    addAttachment: (state, action: PayloadAction<Attachment>) => {
      state.attachments[action.payload.id] = action.payload;
    },
    removeAttachment: (state, action: PayloadAction<string>) => {
      delete state.attachments[action.payload];
    },
  },
});

export const { addAttachment, removeAttachment } = attachmentsSlice.actions;
export default attachmentsSlice.reducer;
