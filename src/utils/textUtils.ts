// Mention highlighter used by the comment item.
// Kept in a util to keep components focused on layout.
import React from 'react';

export const highlightMentions = (content: string): React.ReactNode[] => {
  return content.split(/(@\w+)/g).map((part, index) =>
    part.startsWith('@')
      ? React.createElement('span', { key: index, className: 'text-blue-600 font-semibold' }, part)
      : part
  );
};


