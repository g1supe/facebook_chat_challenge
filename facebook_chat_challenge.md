# Facebook-style Chat Component - React JS Lead Coding Challenge

## 🎯 Challenge Overview

Build a comprehensive chat component similar to Facebook's comment system with advanced features including threaded replies, file attachments, user tagging, and emoji support. This challenge tests your ability to create complex UI interactions, manage nested data structures, and implement real-world social media features.

**Time Allocation: 4-6 hours**

## 📋 Requirements

### Core Features
1. **Comment System**
   - Add new comments
   - Display comments in chronological order
   - Character limit with counter
   - Rich text formatting support

2. **Threaded Replies**
   - Reply to any comment
   - Nested thread visualization
   - Collapsible/expandable threads
   - "Show more replies" functionality

3. **File Attachments**
   - Image upload with preview
   - File upload (documents, videos)
   - Multiple file support
   - File size validation
   - Drag & drop interface

4. **User Tagging**
   - @mention functionality
   - User search/autocomplete
   - Tagged user highlighting
   - Notification system for tagged users

5. **Emoji Support**
   - Emoji picker integration
   - React to comments with emojis
   - Emoji counter and list of reactors
   - Custom emoji categories

6. **Data Persistence**
   - JSON file storage structure
   - Organized folder hierarchy
   - Real-time data updates
   - Data validation

### Advanced Features (Bonus Points)
- Real-time typing indicators
- Comment editing and deletion
- Comment reporting/moderation
- Keyboard shortcuts
- Accessibility (ARIA labels, keyboard navigation)
- Mobile responsive design
- Infinite scroll for large comment threads

## 🏗️ Technical Requirements

### Technology Stack
- **Framework**: React 18+ with TypeScript
- **State Management**: Choose between Context API, Zustand, or Redux Toolkit
- **Styling**: Tailwind CSS or Styled Components
- **File Handling**: File upload and management
- **Emoji**: emoji-picker-react or similar
- **Rich Text**: @mentions/react-mentions or draft-js
- **Icons**: Lucide React or React Icons

### Data Structure Requirements

```json
// data/comments.json
{
  "comments": {
    "comment_123": {
      "id": "comment_123",
      "parentId": null,
      "authorId": "user_456",
      "content": "This is a root comment with @john_doe tagged!",
      "timestamp": "2024-01-15T10:30:00Z",
      "attachments": ["file_789"],
      "reactions": {
        "👍": ["user_456", "user_789"],
        "❤️": ["user_123"]
      },
      "mentions": ["user_john"],
      "isEdited": false,
      "editedAt": null,
      "replies": ["comment_124", "comment_125"]
    }
  },
  "metadata": {
    "totalComments": 15,
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}

// data/users.json
{
  "users": {
    "user_456": {
      "id": "user_456",
      "username": "jane_smith",
      "displayName": "Jane Smith",
      "avatar": "avatars/jane_smith.jpg",
      "isOnline": true,
      "lastSeen": "2024-01-15T10:29:00Z"
    }
  }
}

// data/attachments.json
{
  "attachments": {
    "file_789": {
      "id": "file_789",
      "filename": "screenshot.png",
      "originalName": "Screenshot 2024-01-15.png",
      "path": "uploads/images/screenshot.png",
      "type": "image/png",
      "size": 245760,
      "uploadedBy": "user_456",
      "uploadedAt": "2024-01-15T10:30:00Z",
      "metadata": {
        "width": 1920,
        "height": 1080,
        "thumbnail": "uploads/thumbnails/screenshot_thumb.png"
      }
    }
  }
}
```

### Folder Structure
```
src/
├── components/
│   ├── Chat/
│   │   ├── ChatContainer.tsx
│   │   ├── CommentList.tsx
│   │   ├── Comment.tsx
│   │   ├── CommentForm.tsx
│   │   ├── ReplyThread.tsx
│   │   ├── FileUpload.tsx
│   │   ├── EmojiPicker.tsx
│   │   ├── UserMention.tsx
│   │   └── index.ts
│   └── UI/
│       ├── Avatar.tsx
│       ├── Button.tsx
│       ├── Modal.tsx
│       └── Tooltip.tsx
├── hooks/
│   ├── useComments.ts
│   ├── useFileUpload.ts
│   ├── useUserMentions.ts
│   └── useEmojiReactions.ts
├── services/
│   ├── commentService.ts
│   ├── fileService.ts
│   ├── userService.ts
│   └── storageService.ts
├── types/
│   ├── comment.types.ts
│   ├── user.types.ts
│   └── attachment.types.ts
├── utils/
│   ├── dateUtils.ts
│   ├── fileUtils.ts
│   └── textUtils.ts
└── data/
    ├── comments.json
    ├── users.json
    ├── attachments.json
    └── uploads/
        ├── images/
        ├── documents/
        └── thumbnails/
```

## 🎨 UI/UX Requirements

### Design Specifications
1. **Modern Facebook-style Design**
   - Clean, minimalist interface
   - Consistent spacing and typography
   - Subtle shadows and borders
   - Smooth animations and transitions

2. **Responsive Design**
   - Mobile-first approach
   - Tablet and desktop optimizations
   - Touch-friendly interface elements

3. **Interactive Elements**
   - Hover states for all interactive elements
   - Loading states for async operations
   - Error handling with user-friendly messages
   - Success feedback for user actions

### Component Behavior Specifications

```typescript
// Example component interfaces
interface CommentProps {
  comment: Comment;
  level: number;
  onReply: (commentId: string) => void;
  onReact: (commentId: string, emoji: string) => void;
  onEdit: (commentId: string, newContent: string) => void;
  onDelete: (commentId: string) => void;
}

interface CommentFormProps {
  parentId?: string;
  placeholder?: string;
  onSubmit: (data: CreateCommentData) => Promise<void>;
  onCancel?: () => void;
  maxLength?: number;
  allowAttachments?: boolean;
}
```

## 🧪 Testing Requirements

### Unit Tests
- Component rendering and props
- User interaction handling
- Data transformation logic
- File upload validation
- Emoji reaction functionality

### Integration Tests
- Comment submission flow
- Reply thread expansion/collapse
- File attachment process
- User mention detection
- Data persistence validation

### Example Test Structure
```typescript
describe('CommentForm', () => {
  it('should submit comment with attachments and mentions', async () => {
    // Test implementation
  });

  it('should validate file size and type restrictions', () => {
    // Test implementation
  });

  it('should detect and highlight user mentions', () => {
    // Test implementation
  });
});
```

## 🚀 Implementation Guide

### Phase 1: Basic Structure (1-2 hours)
1. Set up project structure and dependencies
2. Create basic comment display and form
3. Implement JSON data storage
4. Add basic styling

### Phase 2: Advanced Features (2-3 hours)
1. Implement threaded replies
2. Add file upload functionality
3. Integrate emoji picker
4. Implement user mentions

### Phase 3: Polish & Testing (1-2 hours)
1. Add animations and micro-interactions
2. Implement error handling
3. Add loading states
4. Write comprehensive tests

## 🔧 Recommended Libraries

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.0.0",
    "emoji-picker-react": "^4.0.0",
    "react-mentions": "^4.4.0",
    "react-dropzone": "^14.0.0",
    "date-fns": "^2.29.0",
    "react-intersection-observer": "^9.4.0",
    "react-spring": "^9.6.0",
    "zustand": "^4.3.0"
  },
  "devDependencies": {
    "@testing-library/react": "^13.0.0",
    "@testing-library/jest-dom": "^5.16.0",
    "@testing-library/user-event": "^14.0.0",
    "msw": "^1.0.0"
  }
}
```

## 📝 Evaluation Criteria

### Code Quality (25%)
- **TypeScript usage**: Proper typing and interfaces
- **Component architecture**: Clean, reusable components
- **Code organization**: Logical folder structure and naming
- **Performance**: Optimized re-renders and memory usage

### Feature Completeness (30%)
- **Core functionality**: All required features working
- **Edge cases**: Proper error handling and validation
- **User experience**: Intuitive and responsive interface
- **Data management**: Proper JSON structure and persistence

### Technical Implementation (25%)
- **State management**: Efficient and scalable approach
- **File handling**: Secure and validated uploads
- **Real-time features**: Smooth user interactions
- **Accessibility**: WCAG compliance and keyboard navigation

### Innovation & Polish (20%)
- **Additional features**: Creative enhancements
- **Animation/UX**: Smooth transitions and feedback
- **Mobile experience**: Responsive and touch-friendly
- **Code documentation**: Clear comments and README

## 🏆 Bonus Challenges

### Advanced Features (Choose 1-2)
1. **Real-time Collaboration**
   - WebSocket integration for live updates
   - Typing indicators
   - Online user presence

2. **Advanced Text Editor**
   - Rich text formatting (bold, italic, links)
   - Code syntax highlighting
   - Markdown support

3. **Comment Moderation**
   - Report inappropriate content
   - Admin moderation interface
   - Automated content filtering

4. **Performance Optimization**
   - Virtual scrolling for large threads
   - Image lazy loading
   - Bundle size optimization

## 📋 Submission Guidelines

### Deliverables
1. **Source Code**: Complete React application
2. **Documentation**: README with setup instructions
3. **Demo**: Live deployed version or video walkthrough
4. **Test Coverage**: Unit and integration tests
5. **Data Examples**: Sample JSON files with realistic data

### Folder Structure for Submission
```
facebook-chat-challenge/
├── src/
├── public/
├── data/
│   ├── comments.json
│   ├── users.json
│   ├── attachments.json
│   └── uploads/
├── tests/
├── docs/
│   ├── SETUP.md
│   ├── FEATURES.md
│   └── API.md
├── package.json
├── README.md
└── IMPLEMENTATION_NOTES.md
```

### README Requirements
- Project overview and features
- Setup and installation instructions
- Technology choices and reasoning
- Architecture decisions
- Known limitations and future improvements
- Demo screenshots or GIFs

## 🎯 Success Metrics

A successful implementation should demonstrate:

1. **Scalable Architecture**: Can handle hundreds of comments and replies
2. **Smooth User Experience**: Responsive interactions without lag
3. **Robust Error Handling**: Graceful failures and user feedback
4. **Clean Code**: Maintainable and well-documented codebase
5. **Production Ready**: Proper validation, security, and performance
6. **Code sharing**: Share Github link for the code repository
7. **Demo**: Use any of online tools like codesandbox to demonstrate 

---

**Good luck! This challenge will showcase your ability to build complex, production-ready React applications with modern patterns and best practices.**