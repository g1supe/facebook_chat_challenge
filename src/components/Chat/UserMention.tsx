import React from 'react';

interface UserMentionProps {
  text: string;
}

const UserMention: React.FC<UserMentionProps> = ({ text }) => {
  return <span className="text-blue-600 font-semibold">{text}</span>;
};

export default UserMention;


