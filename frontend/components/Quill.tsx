'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface QuillProps {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
}

const Quill: React.FC<QuillProps> = ({ value, setValue, placeholder = 'Write your blog post here...' }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);

  // Toolbar and formats configuration
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ font: [] }],
      [{ color: [] }, { background: [] }],
      [{ align: ['right', 'center', 'justify', ''] }],
      ['clean'],
      ['link', 'image', 'video'],
    ],
  };

  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'header',
    'list',
    'bullet',
    'script',
    'indent',
    'direction',
    'size',
    'font',
    'color',
    'background',
    'align',
    'link',
    'image',
    'video',
  ];

  // Sync value with ReactQuill
  useEffect(() => {
    setIsEditorReady(true); // Set ready once ReactQuill is loaded
  }, []);

  const handleChange = (content: string) => {
    console.log('Quill content:', content); // Debug
    setValue(content);
  };

  if (!isEditorReady) {
    return (
      <div className="bg-white text-gray-800 p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        className="min-h-[300px]"
      />
    </div>
  );
};

export default Quill;