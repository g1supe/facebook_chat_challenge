// Small wrapper around emoji-picker-react to keep props consistent in our UI.
// @ts-nocheck
import React from 'react';
import Picker from 'emoji-picker-react';

interface EmojiPickerProps {
  onPick: (emoji: string) => void;
}

const EmojiPickerWrapper: React.FC<EmojiPickerProps> = ({ onPick }) => {
  return (
    <Picker
      onEmojiClick={(emojiData: any) => onPick(emojiData.emoji)}
      height={350}
      width={300}
    />
  );
};

export default EmojiPickerWrapper;


