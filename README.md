# Facebook Chat App

A simple Facebook-style chat/comments demo built with React and Redux Toolkit. It showcases threaded comments with replies, @mentions, emoji picking, and basic attachment handling on the client.

## Project overview and features

- **Threaded comments**: Root comments with nested replies.
- **Mentions**: Type `@` to trigger suggestions via `react-mentions`.
- **Emoji picker**: Insert emojis using `emoji-picker-react`.
- **Attachments (demo)**: Choose files; filenames are stored in state (no upload backend yet).
- **State management**: `@reduxjs/toolkit` with slices for comments, users, and attachments.
- **Styling**: Tailwind CSS utility classes.
- **TypeScript**: Strongly-typed domain models for comments, users, and attachments.

## Setup and installation instructions

Prerequisites: Node 18+ recommended.

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
2. Start the dev server:
   ```bash
   npm start
   ```
   App runs at `http://localhost:3000` with hot reload.
3. Run tests:
   ```bash
   npm test
   ```
4. Build for production:
   ```bash
   npm run build
   ```

Scripts are provided by Create React App (`react-scripts`).

## Technology choices and reasoning

- **React 18 + CRA**: Quick bootstrap and familiar dev experience.
- **TypeScript**: Safer refactors and clear contracts for domain entities.
- **Redux Toolkit**: Opinionated, minimal boilerplate state management; easy to extend.
- **react-redux**: Provider wiring and hooks for store access.
- **Tailwind CSS**: Rapid, consistent styling via utility classes.
- **react-mentions**: Accessible mentions input with highlighter/suggestions.
- **emoji-picker-react**: Lightweight emoji picker.
- **uuid** (via `uuid` import usage): Generates stable ids for comments and replies.

## Architecture decisions

- **Entry point**: `src/index.tsx` wraps `App` in Redux `Provider` with `store`.
- **App shell**: `src/App.tsx` renders the chat container and sets base page styles.
- **UI composition** (in `src/components/Chat/`):
  - `ChatContainer.tsx`: Page card; handles creating top-level comments.
  - `CommentForm.tsx`: Input with mentions and emoji picker; optional file input.
  - `CommentList.tsx`: Selects comments from the store and renders roots + nested replies.
  - `Comment.tsx`: Displays a single comment, attachments, and toggles a reply form.
- **State slices** (in `src/store/`):
  - `commentsSlice.ts`: `addComment`, `addReply`; tracks `metadata` (total, lastUpdated).
  - `usersSlice.ts`: `addUser`, `updateUser` (not yet wired in UI).
  - `attachmentsSlice.ts`: `addAttachment`, `removeAttachment` (demo only).
- **Types** (in `src/types/`):
  - `comment.types.ts`: `Comment`, `CommentMetadata`, `CreateCommentData`.
  - `user.types.ts`: `User`.
  - `attachment.types.ts`: `Attachment` and `AttachmentMetadata`.
- **Styling**: Tailwind via `src/index.css` (`@tailwind base/components/utilities`), utility classes applied directly in components.

### Data model (high level)

- `Comment`: `{ id, parentId, authorId, content, timestamp, attachments[], reactions{}, mentions[], isEdited, editedAt, replies[] }`
- Comments are stored in a dictionary by id; root comments have `parentId: null` and list child ids in `replies`.

## Known limitations and future improvements

- **No backend**: State is in-memory only; refresh clears data.
- **Attachments are not uploaded**: Only filenames are captured; no previews or storage.
- **Static mentions source**: Suggestion list is hard-coded.
- **Reactions not implemented**: Field exists in the type but there is no UI/logic yet.
- **Editing/deleting**: Actions are stubbed in UI; reducers not implemented for these flows.
- **Accessibility**: Basic, could be improved (focus management, ARIA for suggestions/emoji picker).
- **Validation**: Minimal content/size validation.

Planned enhancements:

- Add API + persistence (and optimistic updates).
- Real-time updates (WebSocket) and typing indicators.
- Full reactions feature with aggregation.
- Rich attachments: upload, thumbnails, previews.
- User management and authentication; dynamic mentions source.
- Pagination/virtualization for long threads.
- Comprehensive tests and accessibility improvements.

## Demo screenshots or GIFs

Add screenshots/GIFs to `public/` or link them here:

```
![Chat list](public/demo-chat.png)
![Reply with mentions](public/demo-mentions.gif)
```

## Project structure (selected)

```
src/
  components/Chat/
    ChatContainer.tsx
    CommentForm.tsx
    CommentList.tsx
    Comment.tsx
  store/
    index.ts
    commentsSlice.ts
    usersSlice.ts
    attachmentsSlice.ts
  types/
    comment.types.ts
    user.types.ts
    attachment.types.ts
  index.tsx
  App.tsx
  index.css
```

---

This project was bootstrapped with Create React App. See CRA docs for advanced configuration and deployment.
