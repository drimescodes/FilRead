import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillProps {
  value: string;
  setValue: (value: string) => void;
}

export default function Quill({ value, setValue }: QuillProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ['clean'],
      
    ],
  };

  return (
    <ReactQuill
      modules={modules}
      value={value}
      onChange={setValue}
      placeholder="Enter the content..."
      className='custom-quill'
    />
  );
}
