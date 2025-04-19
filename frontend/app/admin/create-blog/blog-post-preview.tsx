'use client';
import Image from 'next/image';
import React from 'react';

interface BlogPostPreviewProps {
  title: string;
  content: string;
  tags: string[];
  visibility: number;
  imageCid: string | null;
}

const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({
  title,
  content,
  tags,
  visibility,
  imageCid,
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const visibilityLabel = ['Public', 'Private', 'Draft'][visibility] || 'Unknown';

  return (
    <div className="bg-white text-gray-800 min-h-screen p-4 sm:p-6">
      <header className="text-center py-8 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50">
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-500/50 text-gray-800 text-sm uppercase px-3 py-1 rounded-full border border-blue-300/50"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold my-4 text-gray-900">{title}</h1>
        <p className="text-gray-600">
          {currentDate} | {Math.ceil(content.split(' ').length / 200)} min read | {visibilityLabel}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mt-8">
        <div className="col-span-1 lg:col-span-3 my-6">
          {imageCid ? (
            <div className="relative w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden shadow-lg border border-gray-200/50">
              <Image
                src={`https://gateway.lighthouse.storage/ipfs/${imageCid}`}
                alt={title}
                fill
                className="object-cover"
                onError={(e) => console.error('Failed to load image:', imageCid, e)} // Debug
                placeholder="blur"
                blurDataURL="/placeholder.png" // Optional: Add a placeholder image
              />
            </div>
          ) : (
            <div className="w-full h-[300px] sm:h-[400px] rounded-lg bg-gray-200 flex items-center justify-center border border-gray-200/50">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
        </div>

        <div className="col-span-1 lg:col-span-2">
          <div
            className="prose max-w-none text-gray-800 bg-white/90 backdrop-blur-md p-6 rounded-lg border border-gray-200/50"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        <aside className="col-span-1">
          <section className="bg-white/90 backdrop-blur-md p-6 rounded-lg border border-gray-200/50">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Stay Updated</h2>
            <p className="text-gray-600">
              Connect your wallet to receive updates and exclusive content on-chain!
            </p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition">
              Connect Wallet
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default BlogPostPreview;