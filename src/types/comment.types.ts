export interface Comment {
  id: string;
  parentId: string | null;
  authorId: string;
  content: string;
  timestamp: string;
  attachments: string[];
  reactions: Record<string, string[]>;
  mentions: string[];
  isEdited: boolean;
  editedAt: string | null;
  replies: string[];
}

export interface CommentMetadata {
  totalComments: number;
  lastUpdated: string;
}

export interface CreateCommentData {
  parentId?: string;
  content: string;
  attachments?: string[];
  mentions?: string[];
}
