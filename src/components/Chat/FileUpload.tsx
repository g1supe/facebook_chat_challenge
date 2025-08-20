// Minimal file input wrapper so we can swap implementations later if needed.
// @ts-nocheck
import React from 'react';

interface FileUploadProps {
  multiple?: boolean;
  onChange: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ multiple = true, onChange }) => {
  return (
    <input
      type="file"
      multiple={multiple}
      onChange={(e) => {
        if (e.target.files) onChange(Array.from(e.target.files));
      }}
    />
  );
};

export default FileUpload;


