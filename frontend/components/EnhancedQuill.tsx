// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// interface EnhancedQuillProps {
//   value: string;
//   setValue: (value: string) => void;
// }

// interface CursorPosition {
//   top: number;
//   left: number;
// }

// const commonPhrases = [
//   "In conclusion",
//   "Furthermore",
//   "However",
//   "Therefore",
//   "Moreover",
//   "For example",
//   "In addition",
//   "Consequently",
//   "As a result",
//   "In other words",
//   "To illustrate",
//   "Specifically",
//   "Nevertheless",
//   "In contrast",
//   "Similarly",
// ];

// const EnhancedQuill: React.FC<EnhancedQuillProps> = ({ value, setValue }) => {
//   const [suggestions, setSuggestions] = useState<string[]>([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ top: 0, left: 0 });

//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [{ align: ["right", "center", "justify"] }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link", "image", "video"],
//       ["clean"],
//     ],
//   };

//   const handleTextChange = (content: string) => {
//     setValue(content);
//     const quillEditor = document.querySelector('.ql-editor');

//     if (quillEditor && quillEditor instanceof HTMLElement) {
//       const selection = window.getSelection();
//       if (selection && selection.rangeCount > 0) {
//         const range = selection.getRangeAt(0);
//         const rect = range.getBoundingClientRect();

//         const text = quillEditor.textContent || '';
//         const words = text.split(/\s+/);
//         const lastWord = words[words.length - 1].toLowerCase();

//         if (lastWord.length >= 2) {
//           const matchingSuggestions = commonPhrases.filter((phrase) =>
//             phrase.toLowerCase().startsWith(lastWord)
//           );

//           if (matchingSuggestions.length > 0) {
//             const quillContainer = quillEditor.getBoundingClientRect(); // Get editor's position
//             setCursorPosition({
//               top: rect.bottom - quillContainer.top, // Relative to editor
//               left: rect.left - quillContainer.left, // Relative to editor
//             });
//             setSuggestions(matchingSuggestions);
//             setShowSuggestions(true);
//           } else {
//             setShowSuggestions(false);
//           }
//         } else {
//           setShowSuggestions(false);
//         }
//       }
//     }
//   };

//   const handleSuggestionClick = (suggestion: string) => {
//     const quillEditor = document.querySelector('.ql-editor');
//     if (quillEditor && quillEditor instanceof HTMLElement) {
//       const text = quillEditor.textContent || '';
//       const words = text.split(/\s+/);
//       words.pop();
//       words.push(suggestion);

//       setValue(words.join(' ') + ' ');
//       setShowSuggestions(false);
//     }
//   };

//   return (
//     <div className="relative">
//       <ReactQuill
//         modules={modules}
//         value={value}
//         onChange={handleTextChange}
//         placeholder="Enter the content..."
//         className="custom-quill rounded-md"
//       />
//       {showSuggestions && (
//         <div
//           className="absolute z-50 shadow-lg rounded-md border border-gray-200 ml-4 bg-readreblack-2"
//           style={{
//             top: `${cursorPosition.top}px`,
//             left: `${cursorPosition.left}px`,
//           }}
//         >
//           <ul className="py-1">
//             {suggestions.map((suggestion, index) => (
//               <li
//                 key={index}
//                 className="px-2 hover:bg-readreblack-4 cursor-pointer"
//                 onClick={() => handleSuggestionClick(suggestion)}
//               >
//                 {suggestion}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EnhancedQuill;
