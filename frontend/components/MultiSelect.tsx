'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export default function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Add a custom tag',
  className = '',
}: MultiSelectProps) {
  const [customTag, setCustomTag] = useState('');

  const toggleTag = (tag: string) => {
    const newSelected = selected.includes(tag)
      ? selected.filter((item) => item !== tag)
      : [...selected, tag];
    onChange(newSelected);
  };

  const addCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTag = customTag.trim();
    if (trimmedTag && !selected.includes(trimmedTag) && trimmedTag.length <= 50) {
      onChange([...selected, trimmedTag]);
      setCustomTag('');
    }
  };

  const removeTag = (tag: string) => {
    onChange(selected.filter((item) => item !== tag));
  };

  return (
    <div className={`bg-white/90 border border-gray-200/50 rounded-lg p-4 ${className}`}>
      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2 mb-4 min-h-[2.5rem]">
        <AnimatePresence>
          {selected.length > 0 ? (
            selected.map((tag) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm border border-blue-300/50 shadow-sm"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="text-white hover:text-gray-200 focus:outline-none"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-600 text-sm"
            >
              No tags selected
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Custom Tag Input */}
      <form onSubmit={addCustomTag} className="mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            placeholder={placeholder}
            className="flex-1 p-3 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={50}
          />
          <motion.button
            type="submit"
            disabled={!customTag.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg border border-gray-200/50 shadow-sm hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Add
          </motion.button>
        </div>
      </form>

      {/* Predefined Tags */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {options.map((option) => (
          <motion.button
            key={option}
            onClick={() => toggleTag(option)}
            whileHover={{ scale: 1.05, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-lg text-sm border border-gray-200/50 shadow-sm transition text-center ${
              selected.includes(option)
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-800 hover:bg-blue-500/10'
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
};